const User = require('../../Models/userSchema');
const nodemailer = require('nodemailer');
const env = require('dotenv').config();
const bcrypt = require('bcrypt');

const loadSignup = async (req, res) => {
    try {
        return res.render('signup');
    } catch (error) {
        console.log('HOME IS NOT LOADING:', error);
        res.status(500).send('Server Error');
    }
}

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendVerificationEmail(email, otp) {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.NODEMAILER_EMAIL,
                pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const info = await transporter.sendMail({
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: 'Verify your account',
            text: `Your OTP is ${otp}`,
            html: `<b>Your OTP : ${otp}</b>`
        });
        return info.accepted.length > 0;
    } catch (error) {
        console.log('Error sending Email', error);
        return false;
    }
}

const signup = async (req, res) => {
    try {
        const { name, phone, email, password, confirmpassword } = req.body;
        if (password !== confirmpassword) {
            return res.render('signup', { message: 'Passwords do not match' });
        }

        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.render('signup', { message: 'User with this email already exists' });
        }

        const otp = generateOtp();
        console.log('Generated OTP:', otp);
        const emailSent = await sendVerificationEmail(email, otp);

        if (!emailSent) {
            return res.json('Email error');
        }

        req.session.userOtp = otp;
        req.session.userData = { name, phone, email, password };

        console.log('OTP sent successfully:', otp);
        res.render('verify-otp', { email: email });  // Pass the email to the view

    } catch (error) {
        console.error('Signup error', error);
        res.redirect('/pageNotFound');
    }
};



const loadShopping = async (req, res) => {
    try {
        return res.render('shop');
    } catch (error) {
        console.log('SHOPPING PAGE IS NOT LOADING:', error);
        res.status(500).send('Server Error');
    }
}

const loadLogin = async (req, res) => {
    try {
        return res.render('login');
    } catch (error) {
        console.log('LOGIN PAGE IS NOT LOADING:', error);
        res.status(500).send('Server Error');
    }
}

const loadHomepage = async (req, res) => {
    try {
        return res.render('home');
    } catch (error) {
        console.log('HOME IS NOT LOADING', error);
        res.status(500).send('Server Error');
    }
}

const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.error('Error securing password', error);
    }
}

const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;
        console.log('Received OTP:', otp);
        console.log('Session OTP:', req.session.userOtp);

        if (otp == req.session.userOtp) {
            const user = req.session.userData;
            const passwordHash = await securePassword(user.password);
            const saveUserData = new User({
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: passwordHash
            });
            await saveUserData.save();
            req.session.user = saveUserData._id;

            console.log('User saved successfully:', saveUserData);
            res.json({ success: true, redirectUrl: '/' });
        } else {
            console.log('Invalid OTP');
            res.status(400).json({ success: false, message: 'Invalid OTP, Please try again' });
        }
    } catch (error) {
        console.error('Error Verifying OTP', error);
        res.status(500).json({ success: false, message: 'An Error occurred' });
    }
};


module.exports = { loadHomepage, loadSignup, loadShopping, loadLogin, signup, verifyOtp };
