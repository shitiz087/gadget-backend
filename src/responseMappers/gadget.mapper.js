const { decrypt } = require("../utils/crypto.util");

function mapGadget(gadget) {
  const { id, name, price, category, secretInfo, createdAt, updatedAt } =
    gadget.dataValues;

  return {
    id,
    name,
    price,
    category,
    secretInfo: secretInfo ? decrypt(secretInfo) : undefined,
    createdAt,
    updatedAt,
  };
}

module.exports = {
  mapGadget,
};
