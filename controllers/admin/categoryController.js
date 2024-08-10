const Category = require('../../Models/category');

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

module.exports = { categoryInfo, addCategory };
