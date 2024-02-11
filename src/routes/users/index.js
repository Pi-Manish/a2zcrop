const {createUser, userAuthenticate, userAuthenticateOpts }= require('../../controllers/user.controller');

function userRoutes(app , opts , next){
    app.post('/newUser', createUser);
    app.post('/userLogin' ,  userAuthenticateOpts)
    next();
}

module.exports= userRoutes