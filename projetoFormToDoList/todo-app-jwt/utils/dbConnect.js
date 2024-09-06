import mongoose, { mongo } from "mongoose";

const dataBaseUrl = process.env.DATABASE_URL;

if (!dataBaseUrl){
    throw new Error(".env.local não preenchido");
}

const connectMongo = async()=>{
    if(mongoose.connection.readyState>0){
        return;
    }else{
       return await mongoose.connect(dataBaseUrl)
        .then("MongoDB Connectado")
        .catch(err=>console.error(err));
    }
}

export default connectMongo;