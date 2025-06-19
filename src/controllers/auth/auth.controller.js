class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res) => {
    try {
      const user = await this.authService.registerUser(req.body);
      res.status(201).json({ success: true, user });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  login = async (req, res) => {
    try {
      const result = await this.authService.loginUser(req.body);
      res.status(200).json({ success: true, token: result.token });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  };
}

module.exports = AuthController;
