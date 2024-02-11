const {addVlogOpts , getVlogOpts,updateVlogOpts, getSingleVlogOpts, deleteVlogOpts} = require('../../controllers/vlog.controller');

function vlogRoutes (app, opts , next){
    app.post('/addVlog' , {onRequest:[app.auth], ...addVlogOpts});
    app.post('/updateVlog', {onRequest:[app.auth], ...updateVlogOpts});

    app.get('/getVlog', getVlogOpts)
    app.get('/getVlog/:id', getSingleVlogOpts)
    app.post('/deleteVlog', {onRequest:[app.auth], ...deleteVlogOpts})

    next();
}

module.exports = vlogRoutes