const {getAllSubscriberOpts, createSubscriberOpts} = require('../../controllers/subscriber.controller');

function subscriberRoutes(app , Opts , next){
    app.post('/createSubscriber' , createSubscriberOpts)
    app.get('/getAllSubscribers' , {onRequest:[app.auth], ...getAllSubscriberOpts})
    next();
    
}

module.exports = subscriberRoutes