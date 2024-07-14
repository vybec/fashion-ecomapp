const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    email:{

        type:String,
        required:true,
        unique:true

    },
    phone :{

        type:String,
        required: false,
        unique: true,
        sparse:true,//to give null phone number
        default: null,
       

    },
    googleId :{

        type:String,
        unique:true,


    },
    password:{

        type:String,
        required:false,
        

    },
    isBlocked :{
        type: Boolean,
        default:false
    },
    isAdmin:{

        type: Boolean,
        default:false

    },
    cart:[{
        type:Schema.Types.ObjectId,
        ref:"Cart"
    }],
    wallet:{
        type:Schema.Types.ObjectId,
        
    },
    wishlist:[{

        type:Schema.Types.ObjectId,
        ref:'Wishlist'

    }],
    orderHistory:[{
        type:Schema.Types.ObjectId,
        ref:'Order'
    }],
    createOn:{
        type: Date,
        default: Date.now
    },
    referalCode:{
        type:String,
        
    },
    redeemed:{
        type:Boolean,
        
    },
    redeemedUsers:[{
        type:Schema.Types.ObjectId,
        ref:'User'
       

    }],
    serachHistory:[{
        category:{
            type:Schema.Types.ObjectId,
            ref:'Category'
        },
        band:{
            type:String,
        },
        searchedOn:{
            type:Date,
            default:Date.now
        }
    }]
});

const User =mongoose.model('User',userSchema);
module.exports= User;