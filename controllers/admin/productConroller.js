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

const addProducts =async(req,res)=>{
    try {
        const product=req.body;
        const productExists=await Product.findOne({
            productName:products.productName,

        });

        if(!productExists){
            const images =[];

            if(req.files && req.files.length>0){
                for(let i=0;i<req.files.length;i++){
                    const originalImagePath =req.files[i].path;

                    const resizedImagePath= path.join('public','uploads','product-images',req.files[i].fileName);
                    await sharp(originalImagePath).resize({width:440,height:440}).toFile(resizedImagePath);
                    images.push(req.files[i].fileName);

                }
            }

            const categoryId =await Category.findOne({name:products.category});

            if(!categoryId){
                return res.status(400).json('Invalid category name')

            }

            const newProduct = new  Product({
                productName:products.productName,
                description:products.description,
                brand:products.brand,
                category:categoryId._id,
                regularPrice:products.regularPrice,
                salePrice:products.salePrice,
                createdOn:new Data(),
                quantity:products.quantity,
                size:products.size,
                color:products.color,
                ProductImage:images,
                status:'Available',

            });

            await newProduct.save();
            return res.redirect('/admin/addProducts');
        }else{
            return res.status(400).json('Product already exists')
        }
    } catch (error) {

        console.error('Error saving product',error);
        return res.redirect('/admin/pageerror')
        
    }
}

module.exports={getProductAddPage,addProducts,}