const User = require('../../Models/userSchema');
const bcrypt = require('bcrypt');

const pageerror = async (req, res) => {
    res.render('admin.error');
};

const loadLogin = (req, res) => {
    if (req.session.admin) {
        return res.redirect('/admin'); // Redirect to the dashboard if already logged in
    }
    res.render('admin-login', { message: null });
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Assuming you are using 'username' instead of 'email'
        const admin = await User.findOne({ email: email, isAdmin: true }); // Find admin by email (username)

        if (admin) {
            const passwordMatch = await bcrypt.compare(password, admin.password); // Compare passwords
            if (passwordMatch) {
                req.session.admin = true; // Set session variable
                return res.redirect('/admin'); // Redirect to dashboard
            } else {
                return res.render('admin-login', { message: 'Incorrect password' }); // Show error message
            }
        } else {
            return res.render('admin-login', { message: 'Admin not found' }); // Show error message
        }
    } catch (error) {
        console.log('Login error:', error);
        return res.redirect('/admin/pageerror');
    }
};

const loadDashboard = async (req, res) => {
    if (req.session.admin) {
        try {
            res.render('dashboard'); // Render the dashboard page
        } catch (error) {
            res.redirect('/admin/pageerror');
        }
    } else {
        res.redirect('/admin/login'); // Redirect to login if not authenticated
    }
};

const logout = async(req,res)=>{
    try {
        req.session.destroy(err =>{
            if(err){
                console.log('Error destoryed session',err);
                return res.redirect('/pageerror')
                
            }
            res.redirect('/admin/login')
        })
    } catch (error) {

        console.log(('unexpected error ',error));
        res.redirect('/pageerror')
        
    }
};

module.exports = { loadLogin, login, loadDashboard, pageerror , logout,};
