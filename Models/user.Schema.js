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
        required:true,
        unique:true

    },
    password:{

        type:String,
        required:true,
        

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
        default:0
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
        required:true
    },
    redeemed:{
        type:Boolean,
        default:false
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