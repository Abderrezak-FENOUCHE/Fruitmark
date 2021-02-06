const magasin = require('./magasin/lib.js');

module.exports = (app) =>{
    app.get('/',magasin.getAllMagasin);
}    