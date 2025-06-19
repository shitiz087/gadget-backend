const {
  gadgetSchema,
  gadgetUpdateSchema,
  bulkUpdateSchema,
  idListSchema,
} = require("../validations/gadget.validation");

const { encrypt, decrypt } = require("../utils/crypto.util");

class GadgetService {
  constructor(gadgetRepository) {
    this.gadgetRepository = gadgetRepository;
  }

  async getAllGadgets() {
    const gadgets = await this.gadgetRepository.findAll();
    return gadgets.map((g) => ({
      ...g,
      secretInfo: g.secretInfo ? decrypt(g.secretInfo) : undefined,
    }));
  }

  async getGadgetById(id) {
    if (!id || isNaN(id)) throw new Error("Invalid ID");

    const gadget = await this.gadgetRepository.findById(id);
    if (!gadget) throw new Error("Gadget not found");

    if (gadget.secretInfo) {
      gadget.secretInfo = decrypt(gadget.secretInfo);
    }

    return gadget;
  }

  async createGadget(data) {
    const { error } = gadgetSchema.validate(data);
    if (error) throw new Error(`Validation failed: ${error.details[0].message}`);

    const gadgetData = {
      ...data,
      secretInfo: data.secretInfo ? encrypt(data.secretInfo) : null,
    };

    return await this.gadgetRepository.create(gadgetData);
  }

  async createGadgetsBulk(gadgetList) {
    if (!Array.isArray(gadgetList) || gadgetList.length === 0) {
      throw new Error("Gadget list must be a non-empty array");
    }

    const results = [];

    for (const gadget of gadgetList) {
      const { error } = gadgetSchema.validate(gadget);
      if (error) throw new Error(`Validation failed: ${error.details[0].message}`);

      const encrypted = {
        ...gadget,
        secretInfo: gadget.secretInfo ? encrypt(gadget.secretInfo) : null,
      };

      const created = await this.gadgetRepository.create(encrypted);
      results.push(created);
    }

    return results;
  }

  async updateGadgetById(id, data) {
    if (!id || isNaN(id)) throw new Error("Invalid ID");

    const { error } = gadgetUpdateSchema.validate(data);
    if (error) throw new Error(`Validation failed: ${error.details[0].message}`);

    const updateData = {
      ...data,
      ...(data.secretInfo ? { secretInfo: encrypt(data.secretInfo) } : {}),
    };

    const updated = await this.gadgetRepository.updateById(id, updateData);
    if (!updated) throw new Error("Update failed or gadget not found");

    return updated;
  }

  async updateGadgetsBulk(gadgets) {
    const { error } = bulkUpdateSchema.validate(gadgets);
    if (error) throw new Error(`Bulk validation failed: ${error.details[0].message}`);

    const results = await Promise.all(
      gadgets.map((g) =>
        this.updateGadgetById(g.id, {
          ...g,
          ...(g.secretInfo ? { secretInfo: g.secretInfo } : {}),
        })
      )
    );

    return results;
  }

  async deleteGadgetById(id) {
    if (!id || isNaN(id)) throw new Error("Invalid ID");

    const deleted = await this.gadgetRepository.deleteById(id);
    if (!deleted) throw new Error("Gadget not found or delete failed");

    return deleted;
  }

  async deleteGadgetsBulk(idList) {
    const { error } = idListSchema.validate(idList);
    if (error) throw new Error(`Invalid ID list: ${error.details[0].message}`);

    const results = await Promise.all(idList.map((id) => this.deleteGadgetById(id)));
    return results;
  }
}

module.exports = GadgetService;
