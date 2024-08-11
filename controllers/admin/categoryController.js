const Category = require('../../Models/category');

const Product = require('../../Models/productSchema');

// Controller to fetch paginated category information
const categoryInfo = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the current page from query params, default to 1 if not provided
        const limit = 4; // Number of categories per page
        const skip = (page - 1) * limit;

        // Fetch categories from the database, sorted by creation date in descending order
        const categoryData = await Category.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Calculate the total number of categories and pages
        const totalCategories = await Category.countDocuments();
        const totalPages = Math.ceil(totalCategories / limit);

        // Render the category page with the fetched data
        res.render('category', {
            cat: categoryData,
            currentPage: page,
            totalPages: totalPages,
            totalCategories: totalCategories,
        });

    } catch (error) {
        console.error(error);
        res.redirect('/pageerror'); // Redirect to an error page if something goes wrong
    }
}

// Controller to add a new category
const addCategory = async (req, res) => {
    const { name, description } = req.body;

    try {
        // Check if the category already exists
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({ error: 'Category already exists' });
        }

        // Create a new category and save it to the database
        const newCategory = new Category({
            name,
            description,
        });
        await newCategory.save();

        return res.json({ message: 'Category added successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const addCategoryOffer =async (req,res)=>{
    try {
        const percentage=parseInt(req.body.percentage);
        const categoryId =req.body.categoryId;
        const category =await Category.findById(categoryId);
        if(!category){
            return res.status(404).json({status:false,message:'Category not found'});
        }
        const products=await Product.find({
            category:category._id
        });
        const hasProductOffer =product.some((product)=>product.productOffer > percentage);//string ullaa method is some
        if(hasProductOffer){
            return res.json({status:false,message:'Product has within the category already'})
        }
        await Category.updateOne({_id:categoryId},{$set: {categoryOffer:percentage}});

        for(const product of products){
            product.productOffer = 0;
            product.salePrice =product.regularPrice;
            await product.save();
        }
        res.json({status:true});//frontendill status pass cheyan


    } catch (error) {

        res.status(500).json({status:false,message:'Internal Server error'})
        
    }
}

const removeCategoryOffer=async (req,res)=>{
    try {
        const categoryId =req.body.categoryId;
        const category =await Category.findById(categoryId);
        if(!category){
            return res.status(404).json({status:false,message:'Category not found'})
        }
        const percentage =category.categoryOffer;
        const products =await Product.find({category:category._id});

        if(products.length > 0){
            for(const product of products){
                product.salePrice +=Math.floor(product.regularPrice * (percentage/100));
                product.productOffer = 0;
                await product.save();
            }
        }
        category.categoryOffer =0;
        await category.save();
        res.json({status:true})
    } catch (error) {

        res.status(500).json({status:false,message:'Internal Server Error'})
        
    }
}


module.exports = { categoryInfo, addCategory ,addCategoryOffer,removeCategoryOffer };
