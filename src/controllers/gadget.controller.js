class GadgetController {
  constructor(gadgetService) {
    this.gadgetService = gadgetService;
  }

  getAllGadgets = async (req, res) => {
    try {
      const gadgets = await this.gadgetService.getAllGadgets();
      res.status(200).json({ success: true, data: gadgets });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  getGadgetById = async (req, res) => {
    try {
      const gadget = await this.gadgetService.getGadgetById(req.params.id);
      res.status(200).json({ success: true, data: gadget });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  };

  updateGadgetById = async (req, res) => {
    try {
      const updated = await this.gadgetService.updateGadgetById(
        req.params.id,
        req.body
      );
      res.status(200).json({ success: true, data: updated });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  updateGadgetsBulk = async (req, res) => {
    try {
      const results = await this.gadgetService.updateGadgetsBulk(req.body);
      res.status(200).json({ success: true, data: results });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

  deleteGadgetById = async (req, res) => {
    try {
      await this.gadgetService.deleteGadgetById(req.params.id);
      res.status(200).json({ success: true, message: "Gadget deleted" });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message });
    }
  };

  deleteGadgetsBulk = async (req, res) => {
    try {
      await this.gadgetService.deleteGadgetsBulk(req.body);
      res.status(200).json({ success: true, message: "Gadgets deleted" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };


  createGadget = async (req, res) => {
    try {
      await this.gadgetService.createGadget(req.body);
      res.status(200).json({ success: true, message: "Gadget Added" });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };

}

module.exports = GadgetController;
