const app = require('fastify')({
    logger: true
})
const path= require('path')
const autoLoad = require('@fastify/autoload');
const cors = require('@fastify/cors');
require('dotenv').config({path:path.resolve(__dirname , '../.env') });
app.register(require('@fastify/jwt'), {
    secret : process.env.JWT_SECRET_KEY
})
app.register(autoLoad , {
    dir : path.join(__dirname , 'routes'),
    dirNameRoutePrefix:true
})

app.get('/', async(request , reply)=>{
    reply.send({
        msg :"This is live server"
    })
})

app.decorate('auth', async function(request, reply){
    try{
        await request.jwtVerify();
    }
    catch(err){
        reply.send(err);
    }
})

require('./db')

const start =async()=>{
    try{
        app.listen({port: process.env.PORT});
        app.log.info(`Server is Running on port ${port}`);
    }
    catch(err)
    {
        app.log.info(err);
    }
    await app.ready();
}

start();