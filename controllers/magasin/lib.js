const { json } = require("body-parser");
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

async function transferFruit(req, res) {
  const { magasinDepart, magasinArrrivee, fruit, quantite } = req.body;
  //On check si le corps de la requete est valide
  if (!magasinDepart || !magasinArrrivee || !fruit || !quantite) {
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  // On check en base si on peut faire le transfert
  try {
    const findMagasinDepart = await Magasin.findOne({
      localisation: magasinDepart
    }).exec()
    const findMagasinArrrivee = await Magasin.findOne({
      localisation: magasinArrrivee
    }).exec()

    if (!findMagasinDepart || !findMagasinArrrivee) {
      return res.status(400).json({
        text: "Le magasin n'existe pas"
      });
    }
    else {
      console.log("ELSE")
      let findFruitDep;
      let findFruitArr;
      
      stockDepArray = Object.entries(findMagasinDepart.stock);
      stockDepArray.forEach(element => {
        if(element[0]=== fruit){
          findFruitDep=element
        }
      });
      console.log(findFruitDep)
      stockArrArray = Object.entries(findMagasinArrrivee.stock);
      stockArrArray.forEach(element => {
        if(element[0]=== fruit){
          findFruitArr=element
        }
      });
      console.log(findFruitArr)

      if ((findFruitDep[1] < quantite)) {
        return res.status(400).json({
          text: `il n'y a pas assez de "${fruit}"  au stock  de ${magasinDepart}`
        });
      }
      const filterDepart = { "localisation": magasinDepart }
      const updateDepart = JSON.parse(`{"stock.${fruit}" : ${findFruitDep[1] - quantite}}`);
      const filterArrivee = { "localisation": magasinArrrivee }
      const updateArrivee = JSON.parse(`{"stock.${fruit}" : ${findFruitArr[1] + quantite}}`);
      console.log(updateDepart)
      console.log(updateArrivee)

      // Mise à jour de la base de donnée
      await Magasin.updateOne(filterDepart, updateDepart);
      await Magasin.updateOne(filterArrivee, updateArrivee);
      const newStockState= await Magasin.find({});
      return res.status(200).json(newStockState);
    }

  } catch (error) {
    return res.status(500).json({ error });
  }
}


exports.getAllMagasin = getAllMagasin;
exports.transferFruit = transferFruit;