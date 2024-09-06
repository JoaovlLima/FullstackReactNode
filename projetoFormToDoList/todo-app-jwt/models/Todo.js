import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title:{
        type:String,
        
    },
    status:{
        type: String,
        enum:["Pendente","Em Progresso", "Concluido"],
        default: "Pendente"
    }


})

const Todo = mongoose.models.Todo || mongoose.model("Todo",TodoSchema);

export default Todo;