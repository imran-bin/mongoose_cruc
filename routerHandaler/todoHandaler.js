const express = require("express")
const { default: mongoose } = require("mongoose")
const todoSchema = require("../schemas/todoSchema")
const  router  = express.Router()

const Todo = new mongoose.model("Todo",todoSchema)
// Get all todos
router.get('/',async(req,res)=>{

    try{
        const data=await Todo.find({status:'active'})
        res.status(200).json({
            result:data,
            message:"All data show in display"
        })
    }
    catch(err){
        res.status(500).json({
            error:"server  side error"
        })
    }

})

// get a  todo by id

router.get('/:id',async(req,res)=>{

   try{
      const result= await Todo.find({_id:req.params.id})
      if(result.length==0){
        res.status(500).json({
             
            error:"data does not exist"
           })
      }
      else{
        res.status(200).json({
            data:result,
            message:"success"
           })
      }

      
   }
   catch(err){
       res.status(500).json({
        error: "server side error"
       })
   }
    
})
// Post todo
router.post('/',async(req,res)=>{
     const newTodo =new Todo(req.body)
     try{
        const result = await newTodo.save()
        res.status(200).json({
            message:"data save "
        })
      
     }
     catch(err){
           res.status(500).json({
            error:"Server side error"
           })
     }
})

// Post multiple todo
router.post('/all',async (req,res)=>{
     try{
        await Todo.insertMany(req.body) 
        res.status(200).json({
            message:"multiple data save successfully"
        })
     }
     catch(err){

        res.status(500).json({
            error:"server side error"
        })

     }
     
})
// Put todo


router.put('/:id',async(req,res)=>{

    try{

        await Todo.updateOne({_id:req.params.id},{
            $set:{
                status:'active'
            }
        })
        res.status(200).json({
            message:"update successfully"
        })
    }
    catch(err){

        res.status(500).json({
            error:"server side error"
        })


    }
    
})


// Delete todo
router.delete('/:id',async(req,res)=>{
  try{
    await Todo.deleteOne({_id:req.params.id})
    res.status(200).json({
        message:"successfully delete"
    })
  }
  catch(err){
    res.status(500).json({
        error:"server side error"
    })
  }


    
})


module.exports =router
