const mongoose = require('mongoose');
const init= async()=>{
    const db = await mongoose.connect(process.env.MONGO_URI);
    if(db.connection){
        console.log("Database connected");
    }
    else{
        console.error("Database connection failed");
    }
}

init();