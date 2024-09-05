import mongoose from "mongoose";

const databaseUrl = process.env.DATABASE_URL;

const closeConnectionMongo = async() =>{
    if (mongoose.connection.readyState>0){
        mongoose.disconnect(databaseUrl)
        
    }

    }
    export default closeConnectionMongo;