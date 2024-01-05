const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

// database connection



function erroHandaler(err,req,res,next){
    if(res.headersSent){
        return next (err)

    }
    res.status(500).join({error:err})
}
app.get('/',(req,res)=>{
    res.send("test")
})

app.listen(5000,()=>{
    console.log(("server is running 5000"));
})