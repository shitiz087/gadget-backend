const {
  gadgetUpdateSchema,
  bulkUpdateSchema,
  idListSchema,
} = require("../validations/gadget.validation");

class GadgetService {
  constructor(gadgetRepository) {
    this.gadgetRepository = gadgetRepository;
  }

  async getAllGadgets() {
    return await this.gadgetRepository.findAll();
  }

  async getGadgetById(id) {
    if (!id || isNaN(id)) throw new Error("Invalid ID");

    const gadget = await this.gadgetRepository.findById(id);

    return gadget;
  }

  async updateGadgetById(id, data) {
    if (!id || isNaN(id)) throw new Error("Invalid ID");

    const { error } = gadgetUpdateSchema.validate(data);
    if (error)
      throw new Error(`Validation failed: ${error.details[0].message}`);

    const updated = await this.gadgetRepository.updateById(id, data);

    return updated;
  }

  async updateGadgetsBulk(gadgets) {
    const { error } = bulkUpdateSchema.validate(gadgets);
    if (error)
      throw new Error(`Bulk validation failed: ${error.details[0].message}`);

    const results = await Promise.all(
      gadgets.map((g) => this.updateGadgetById(g.id, g))
    );
    return results;
  }

  async deleteGadgetById(id) {
    if (!id || isNaN(id)) throw new Error("Invalid ID");

    const deleted = await this.gadgetRepository.deleteById(id);

    return deleted;
  }

  async deleteGadgetsBulk(idList) {
    const { error } = idListSchema.validate(idList);
    if (error) throw new Error(`Invalid ID list: ${error.details[0].message}`);

    const results = await Promise.all(
      idList.map((id) => this.deleteGadgetById(id))
    );
    return results;
  }
}

module.exports = GadgetService;
