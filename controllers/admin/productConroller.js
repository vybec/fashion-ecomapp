const Product =require('../../Models/productSchema');
const Category=require('../../Models/category');
const Brand =require('../../Models/brandSchema');
const path=require('path');
const fs=require('fs');
const User=require('../../Models/userSchema');
const sharp=require('sharp');//used to resize img


const getProductAddPage =async(req,res)=>{
    try {
        const category=await Category.find({isListed:true});
        const brand=await Brand.find({isBlocked:false});
        res.render('product-add',{
            cat:category,
            brand:brand
        });

    } catch (error) {

        res.redirect('/pageerror')
        
    }
}

module.exports={getProductAddPage,}