const User = require('../../Models/userSchema')
const nodemailer =require('nodemailer');
const env=require('dotenv').config();

const loadSignup =async (req,res)=>{
    try {
        return res.render('signup');

    } catch (error) {
        console.log('HOME IS NOT LOADING:',error);
        res.status(500).send('Server Error');
        
    }
}

function generateOtp(){
    return Math.floor(100000 + Math.random()+900000).toString();
}

async function sendVerificationEmail(email,otp){
    try {

        const transporter =nodemailer.createTransport({
            service:'gmail',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:process.env.NODEMAILER_EMAIL,
                password:process.env.NODEMAILER_PASSWORD
            }
        })

        const info =await transporter.sendMail({
            from:process.env.NODEMAILER_EMAIL,
            to:email,
            subject:'Verfiy your account',
            text:`Your OTP is ${otp}`,
            html:`<b>Your OTP : ${otp}</b>`,
        })
        return info.accepted.length >0
        
    } catch (error) {
        console.log('Error sending Email',error);
    }
}

const signup =async(req,res)=>{
    try {

        const{email,password,confirmpassword}=req.body;
        if(password !==confirmpassword) {
            return res.render('signup',{message:'Passwords do not matchs'})

        }

        const findUser =await User.findOne({email});
        if(findUser){
            return res.render('signup',{message:'User with this email already exists'});

        }

        const otp =generateOtp();

        const emailSent =await sendVerificationEmail(email,otp);

        if(!emailsent){
            return res.json('email.error')
        }

        req.session.userOtp =otp;
        req.session.userData ={email,password};
        //res.render('verfiy.otp');
        console.log('OTP Sented',otp);

    } catch (error) {

        console.error('signup error',error);
        res.redirect('/pageNotFound');
        
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