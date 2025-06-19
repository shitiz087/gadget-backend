const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  registerSchema,
  loginSchema,
} = require("../../validations/auth.validation");

class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async registerUser({ username, password }) {
    const { error } = registerSchema.validate({ username, password });
    if (error) throw new Error(error.details[0].message);

    const existing = await this.userRepository.findByUsername(username);
    if (existing) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.createUser({
      username,
      password: hashedPassword,
    });
  }

  async loginUser({ username, password }) {
    const { error } = loginSchema.validate({ username, password });
    if (error) throw new Error(error.details[0].message);

    const user = await this.userRepository.findByUsername(username);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { token };
  }
}

module.exports = AuthService;
