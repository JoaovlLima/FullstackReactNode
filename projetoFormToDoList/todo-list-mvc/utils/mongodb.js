import mongoose from "mongoose";

const connectMongo = async () => {
      (await mongoose.connect(process.env.DATABASE_URL)).
      then(()=> console.log("Mongo Conectado"))
      .catch(err=>console.error(err));
}
export default connectMongo;