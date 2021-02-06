const Magasin = require("../../schema/magasinSchema.js");

async function getAllMagasin(req, res) {
    try {
    const listeMagasins = await Magasin.find({});

      return res.status(200).json(listeMagasins);
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }

exports.getAllMagasin = getAllMagasin;