const Brand = require('../../Models/brandSchema');
const Product = require('../../Models/productSchema');

const getBrandPage = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;  // Correctly parse the page number from the query
        const limit = 4;
        const skip = (page - 1) * limit;  // Correct skip calculation

        const brandData = await Brand.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalBrands = await Brand.countDocuments();
        const totalPages = Math.ceil(totalBrands / limit);

        const reverseBrand = brandData.length ? brandData.reverse() : [];  // Check if brandData is an array

        res.render('brands', {
            data: reverseBrand,
            currentPage: page,
            totalPages: totalPages,
            totalBrands: totalBrands,
        });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.redirect('/pageerror');
    }
}

module.exports = { getBrandPage };
