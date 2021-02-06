const mongoose = require("mongoose");

const magasinSchema = mongoose.Schema(
  {
    localisation:{
        type: String,
        unique: true,
        required: true
    },
    stock:{
        Orange : Number,
        Banane : Number,
        Pomme : Number,
        Fraise : Number,
        Cerise : Number
    }
} 
);

magasinSchema.methods = {
};

module.exports = mongoose.model("Magasin", magasinSchema);