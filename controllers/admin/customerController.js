const User = require('../../Models/userSchema');

const customerInfo = async (req, res) => {
    try {
        let search = '';
        if (req.query.search) {
            search = req.query.search;
        }

        let page = 1;
        if (req.query.page) {
            page = req.query.page;
        }

        const limit = 3;
        const userData = await User.find({
            isAdmin: false,
            $or: [
                { name: { $regex: '.*' + search + '.*', $options: 'i' } }, // 'i' for case-insensitive
                { email: { $regex: '.*' + search + '.*', $options: 'i' } },
            ],
        })
            .limit(limit)
            .skip((page - 1) * limit)
            .exec();

        const count = await User.find({
            isAdmin: false,
            $or: [
                { name: { $regex: '.*' + search + '.*', $options: 'i' } },
                { email: { $regex: '.*' + search + '.*', $options: 'i' } },
            ],
        }).countDocuments();

        // Pass userData and other variables to the EJS template
        res.render('customers', {
            data: userData,
            currentPage: page,
            totalPages: Math.ceil(count / limit),
            searchQuery: search,
        });

    } catch (error) {
        console.error('Error fetching customer data:', error);
        res.status(500).send('Internal Server Error');
    }
};

const customerBlocked =async(req,res)=>{
    try {
        let id=req.query.id;
        await User.updateOne({_id:id},{$set:{isBlocked:true}});
        res.redirect('/admin/user')
    } catch (error) {
        res.redirect('/pageerror')
        
    }
};
const customerunBlocked =async(req,res)=>{
    try {
        let id =req.query.id;
        await User.updateOne({_id:id},{$set:{isBlocked:false}});
        res.redirect('/admin/user')
    } catch (error) {
        res.redirect('/pageerror');
    }
}

module.exports = { customerInfo,customerBlocked,customerunBlocked };
