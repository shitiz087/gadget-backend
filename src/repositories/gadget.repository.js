const BaseRepository = require('./base.repository');
const { Gadget } = require('../../db/models');

class GadgetRepository extends BaseRepository {
  constructor() {
    super(Gadget);
  }

  /**
   * Bulk update gadgets.
   * @param {Array} gadgets - List of gadgets with id and data to update.
   * @returns {Array} Updated gadgets
   */
  async updateBulk(gadgets) {
    const results = [];
    for (const g of gadgets) {
      const updated = await this.updateById(g.id, g);
      if (updated) results.push(updated);
    }
    return results;
  }

  /**
   * Bulk delete gadgets by IDs
   * @param {Array<number>} idList
   * @returns {Array<boolean>} Result per ID
   */
  async deleteBulk(idList) {
    const results = [];
    for (const id of idList) {
      const deleted = await this.deleteById(id);
      results.push(deleted);
    }
    return results;
  }

  /**
   * Create multiple gadgets in bulk
   * @param {Array} gadgets
   * @returns {Array} Created records
   */
  async createBulk(gadgets) {
    return this.model.bulkCreate(gadgets);
  }

  /**
   * Search by category (example of a custom finder)
   * @param {string} category
   * @returns {Array<Gadget>}
   */
  async findByCategory(category) {
    return this.model.findAll({ where: { category } });
  }

   async createGadget(gadget)
   {
    return this.model.create(gadget);

   }
}

module.exports = GadgetRepository;
