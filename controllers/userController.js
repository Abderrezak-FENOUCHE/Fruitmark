const account = require('./account/lib.js');

module.exports = (app) =>{
    app.post('/login',account.login);
    app.post('/signup',account.signup);
}    