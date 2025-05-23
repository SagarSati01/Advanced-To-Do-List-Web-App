import mongoose from 'mongoose';

const todoSchema=new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },

    completed:{
        type:Boolean,
        default:false,
    },
    category:{
        type:String,
        required:true
    },


},{
    timestamps:true,
})

const Todo=mongoose.model("Todo",todoSchema);
export default Todo;