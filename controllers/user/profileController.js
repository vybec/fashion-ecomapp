const User = require('../../Models/userSchema');
const nodemailer = require('nodemailer');//to get otp
const bcrypt = require('bcrypt');
const env = require('dotenv').config();
const session = require('express-session');

function generateOtp(){
    const  digits = '12345678980';
    let otp = '';
    for(let i=0;i<6;i++){
        otp+=digits[Math.floor(Math.random()*10)];
    }

    return otp;
}

const sendVerificationEmail = async (email, otp) => {  // Updated to accept both email and otp
    try {
        const transporter = nodemailer.createTransport({
            service: 'vybex9@gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD,
            }
        });
        

        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,  // Now using the correct email argument
            subject: 'Your OTP for Password reset',
            text: `Your OTP is ${otp}`,
            html: `<b><h4>Your OTP: ${otp}</h4><br></b>`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        return true;

    } catch (error) {
        console.error('Error sending email ', error);
        return false;
    }
};



const getFrogotPassPage = async (req,res)=>{
    try {
        const user = req.session.user || null;
        res.render('forgot-password',{ user });

    } catch (error) {
        
        res.redirect('/pageNotFound');

    }
}

const forgotEmailValid = async (req, res) => {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email: email });
        if (findUser) {
            const otp = generateOtp();
            const emailSent = await sendVerificationEmail(email, otp);  // Fix here

            if (emailSent) {
                req.session.userOtp = otp;
                req.session.email = email;
                res.render('forgotPass-otp');
                console.log('OTP:', otp);
            } else {
                res.json({ success: false, message: 'Failed to send OTP' });
            }
        } else {
            res.render('forgot-password', {
                message: 'User with email does not exist',
            });
        }
    } catch (error) {
        res.redirect('/pageNotFound');
    }
};


module.exports={getFrogotPassPage,forgotEmailValid,}