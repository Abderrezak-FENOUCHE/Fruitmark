//Définition des modules
const express = require("express"); 
const mongoose = require("mongoose"); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require("path")

//Connexion à la base de donnée
mongoose
  .connect("mongodb+srv://root:root@fruitmark.qddcz.mongodb.net/fruitmark?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

//On définit notre objet express nommé app
const app = express();
app.use(morgan('dev'));

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Définition du routeur
const router = express.Router();
app.use("/user", router);
app.use("/magasins", router);
require(__dirname + "/controllers/userController")(router);
require(__dirname + "/controllers/magasinController")(router);

//On définit la route info
app.get('/info',function(req,res){
    res.json("Fruitmark 1.0.0")
})

app.use(express.static(path.join(__dirname, 'client/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build'))
})

//Définition et mise en place du port d'écoute
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Ecoute sur le port: ${port}`));

