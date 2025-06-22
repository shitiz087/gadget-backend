const BaseRepository = require('./base.repository');
const { User } = require('../../db/models');

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  /**
   * Find user by username
   * @param {string} username
   * @returns {User|null}
   */
  async findByUsername(username) {
    return this.model.findOne({ where: { username } });
  }

  /**
   * Check if a user exists by username
   * @param {string} username
   * @returns {boolean}
   */
  async existsByUsername(username) {
    const user = await this.findByUsername(username);
    return !!user;
  }

  /**
   * Create a new user
   * @param {Object} userData
   * @returns {User}
   */
  async createUser(userData) {
    return this.model.create(userData);
  }
}

module.exports = UserRepository;
