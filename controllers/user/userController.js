const User = require('../../Models/userSchema')

const loadSignup =async (req,res)=>{
    try {
        return res.render('signup');

    } catch (error) {
        console.log('HOME IS NOT LOADING:',error);
        res.status(500).send('Server Error');
        
    }
}
const signup =async(req,res)=>{

    const {name,email,phone,password} =req.body;
    


    try {

        const newUser =new User({name,email,phone,password});
        console.log(newUser);

        await newUser.save();

        return res.redirect('/signup')
        
    } catch (error) {

        console.error('Error for Save user',error);
        res.status(500).send('Internal server error');
        
    }
}

const loadShopping=async (req,res)=>{
    try {
        return res.render('shop');

    } catch (error) {
        console.log('SHOPPING PAGE IS NOT LOADING:',error);
        res.status(500).send('Server Error');
        
    }
}

const loadlogin=async (req,res)=>{
    try {
        return res.render('login');

    } catch (error) {
        console.log('login  PAGE IS NOT LOADING:',error);
        res.status(500).send('Server Error');

    }
}        



const loadHomepage =async(req,res)=>{
    try {

        return res.render('home')

        
    } catch (error) {
        console.log('home is not loading',error);
        res.status(500).send('server error')
        
    }
}

module.exports ={loadHomepage,loadSignup,loadShopping,loadlogin,signup};