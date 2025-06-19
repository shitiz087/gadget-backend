const router = require("express").Router();
const GadgetRepository = require("../repositories/gadget.repository");
const GadgetService = require("../services/gadget.service");
const GadgetController = require("../controllers/gadget.controller");

const repo = new GadgetRepository();
const service = new GadgetService(repo);
const controller = new GadgetController(service);

router.get("/", controller.getAllGadgets);
router.get("/:id", controller.getGadgetById);
router.put("/:id", controller.updateGadgetById);
router.put("/", controller.updateGadgetsBulk);
router.delete("/:id", controller.deleteGadgetById);
router.delete("/", controller.deleteGadgetsBulk);

module.exports = router;
