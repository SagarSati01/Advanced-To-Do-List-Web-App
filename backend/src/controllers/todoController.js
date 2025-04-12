import Todo from "../models/Todo.js";

export const getTodos=async (req,res)=>{
    try{
        const todo=await Todo.find().sort({createdAt:-1});
        res.status(200).json(todo);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

export const createTodo=async (req,res)=>{
    const {text,completed,category}=req.body;
    if(!text || !category) return res.status(400).json({message:"Text and Category are required"});
    try{
        const newTodo= new Todo({text,
            category,
         });
        const savedTodo=await newTodo.save();
        res.status(201).json(savedTodo);
    } catch(error){
        res.status(500).json({message:"Server Error"});
    }
}
export const updateTodo=async (req,res)=>{
    const {id}=req.params;
    const {text,completed}=req.body;
    try{
        const todo=await Todo.findByIdAndUpdate(id,
            {text,completed},
            {new:true}
        );
        if(!todo) return res.status(404).json({message:"Todo not found"});
        
        // todo.completed=!todo.completed;
        const updated= await todo.save();
        res.status(200).json(updated);
    } catch(error){
        res.status(500).json({message:"Server Error"});
    }
}

export const deleteTodo=async(req,res)=>{
    const {id}=req.params;
    try{
        const todo=await Todo.findByIdAndDelete(id);
        if(!todo) return res.status(404).json({message:"Todo not found"});

        res.status(200).json({message:"Todo deleted"});
    } catch(error){
        res.status(500).json({message:"Server Error"});
    }
}