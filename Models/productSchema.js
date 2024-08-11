const mongoose = require('mongoose');
const{Schema} = mongoose;

const productSchema =new Schema({
    productName : {
        type:String,
        required:true
    },
    description:{
        type: String,
        required:true

    },
    brand:{
        type: String,
        required:true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required : true
    },
    regularPrice:{
        type:Number,
        salePrice: true
    },
    productOffer:{
        type: Number,
        default :0
    },
    quantity:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    productImage:{
        type:[String],
        required:true

    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    status:{
        type:String,
        required:false
    },
    createdOn:{
        type:Date,
        default:Date.now

    }

})

const Product =mongoose.model('Product',productSchema);
module.exports=Product;