const express = require("express")
const { default: mongoose } = require("mongoose")
const userSchema = require("../schemas/userSchema")
const  router  = express.Router()
const bcrypt = require("bcrypt")
const User = new mongoose.model("User",userSchema)

const jwt = require("jsonwebtoken")




// sign up
router.post('/signup',async(req,res)=>{
    try{
        const hashpassword =await bcrypt.hash(req.body.password,10)
     const newUser = new User({
        name: req.body.name,
        username:req.body.username,
        password:hashpassword
     })
     await newUser.save()
     res.status(200).json({
        message:"sign up successful!"
     })
    }
    catch(err){

        res.status(500).json({
            error:"sign up failed"
        })

    }
})


// login 

router.post('/login',async(req,res)=>{
    const user = await User.find({username:req.body.username})
    if (user  && user.length >0){
        const isValidPassword = await bcrypt.compare(req.body.password,user[0].password)
        if(isValidPassword){
        //    token generate
          const token = jwt.sign({
            userName: user[0].usename,
            userId: user[0]._id
          },process.env.JWT_SECRET,{
            expiresIn:'1h'
          })
          res.status(200).json({
            "access_token":token,
            "mesage": "login successfully"
          })

        }
        else{
            res.status(401).json({
                "error":"Authentication failed"
            })
            
        }
        
    }
    else{
        res.status(401).json({
            "error":"Authentication failed"
        })
    }
})
     


module.exports =router

