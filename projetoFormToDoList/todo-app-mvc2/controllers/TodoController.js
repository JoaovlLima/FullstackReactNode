import Todo from "@/models/Todo";

import connectMongo from "@/utils/dbConnect";
import closeConnectionMongo from "@/utils/dbCloseConnection";

//CRUD

export const getTodos = async()=>{
    await connectMongo;
    return await Todo.find({}) &&
    await closeConnectionMongo();
}
export const createTodo = async(data)=>{
    await connectMongo;
    return await Todo.create(data) &&
    await closeConnectionMongo();
}
export const updateTodo = async (id, data) => {
    await connectMongo();
    return await Todo.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }) && await closeConnectionMongo();
  };
  export const deleteTodo = async (id) => {
    await connectMongo();
    return await Todo.deleteOne({ _id: id });
  };