module.exports= {
    
    _id:{
        type:Number
    },

    name:{
        type:String
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    
    designation:{
        type:String,
    },
    
    password:{
            type:String
    },

    projectId:{
        type:String
    }
}