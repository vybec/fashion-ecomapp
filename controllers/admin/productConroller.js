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

const addProducts = async (req, res) => {
    try {
        const products = req.body;
        const productExists = await Product.findOne({
            productName: products.productName,
        });

        if (!productExists) {
            const images = [];

            if (req.files && req.files.length > 0) {
                for (let i = 0; i < req.files.length; i++) {
                    const originalImagePath = req.files[i].path;

                    // Create a unique filename for the resized image
                    const resizedImageFilename = `resized-${Date.now()}-${req.files[i].filename}`;
                    const resizedImagePath = path.join('public', 'uploads', 're-image', resizedImageFilename);

                    // Check if the directory exists and create it if it doesn't
                    const dir = path.dirname(resizedImagePath);
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }

                    // Resize and save the image to a different file
                    await sharp(originalImagePath)
                        .resize({ width: 440, height: 440 })
                        .toFile(resizedImagePath);

                    images.push(resizedImageFilename);
                }
            }

            const categoryId = await Category.findOne({ name: products.category });

            if (!categoryId) {
                return res.status(400).json('Invalid category name');
            }

            const newProduct = new Product({
                productName: products.productName,
                description: products.description,
                brand: products.brand,
                category: categoryId._id,
                regularPrice: products.regularPrice,
                salePrice: products.salePrice,
                createdOn: new Date(),
                quantity: products.quantity,
                size: products.size,
                color: products.color,
                ProductImage: images,
                status: 'Available',
            });

            await newProduct.save();
            return res.redirect('/admin/addProducts');
        } else {
            return res.status(400).json('Product already exists');
        }
    } catch (error) {
        console.error('Error saving product', error);
        return res.redirect('/admin/pageerror');
    }
};



const getAllProducts =async(req,res)=>{
    try {
        const search =req.query.search || '';
        const page = req.query.page ||  1;
        const limit =4;
        
        const productData = await Product.find({
            $or:[
                {productName:{$regex:new RegExp('.*'+search+'.*','i')}},
                {brand:{$regex:new RegExp('.*'+search+'.*',"i")}},
            ],
        }).limit(limit*1).skip((page-1)*limit).populate('category').exec();

        const count = await Product.find({
            $or:[
                {productName:{$regex:new RegExp('.*'+search+'.*','i')}},
                {brand:{$regex:new RegExp('.*'+search+'.*',"i")}},
            ],
        }).countDocuments();

        const category =await Category.find({isListed:true});
        const brand = await Brand.find({isBlocked:false});

        if(category && brand){
            res.render('products',{
                data:productData,
                currentPage:page,
                totalPages:Math.ceil(count/limit),
                cat:category,
                brand:brand,

            })
        }else{
            res.render('page-404');
        }


    } catch (error) {

        res.redirect('/pageerror');
        
    }
}

const addProductOffer =async(req,res)=>{
    try {
        const {productId,percentage} =req.body;
        const findproduct = await Product.findOne({_id:productId});
        const findCategory =await Category.findOne({_id:findproduct.category});

        if(findCategory.categoryOffer>percentage){
            return res.json({status:false,message:'This product category already has category offer'})
        }

        findProduct.salePrice =findProduct.salePrice.Math.floor(findProduct.regularPrice*(percentage/100));

        findProduct.productOffer = parseInt(percentage);
        await findProduct.save();
        findCategory.categoryOffer=0;
        await findCategory.save();
        res.json({status:true});

        
    } catch (error) {

        res.redirect('/pageerror');
        res.status(500).json({status:false,message:'Internal Serveer Error'})
        
    }
}

const removeProductOffer =async(req,res)=>{
    try {
        const {productId}=req.body
        const findProduct = await Product.findOne({_id:productId})
        const percentage=findProduct.productOffer;
        findProduct.salePrice=findProduct.salePrice+Math.floor(findProduct.regularPrice*(percentage/100));
        findProduct.productOffer =0;
        await findProduct.save();
        res.json({status:true})
    } catch (error) {
        res.redirect('/pageerror')
    }
}

const blockProduct=async(req,res)=>{
    try {
        let id =req.query.id;
        await Product.updateOne({_id:id},{$set:{isBlocked:true}});
        res.redirect('/admin/products');

    } catch (error) {
        res.redirect('/pageerror')
    }
}

const unblockProduct=async(req,res)=>{
    try {
        let id =req.query.id;
        await Product.updateOne({_id:id},{$set:{isBlocked:false}});
        res.redirect('/admin/products');

    } catch (error) {
        res.redirect('/pageerror')
    }
}

module.exports={getProductAddPage,addProducts,getAllProducts,addProductOffer,removeProductOffer,blockProduct,unblockProduct,}