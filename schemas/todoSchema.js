const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:String,
    status:{
        type:String,
        enum:["active","inactive"],
    },
    date:{
        type:Date,
        default: Date.now()
    }
})

todoSchema.methods= {
    findActive: function(){
        return mongoose.model("Todo").find({status:"active"})
    }
    
},


// static method

todoSchema.statics={
    findByjs :function(){
        return this.find({title: /learn/i})
    }
}


// query helper

todoSchema.query={
    byLnguage : function(language){
        return this.find({title: new RegExp(language,"i")})
    }
}

module.exports = todoSchema