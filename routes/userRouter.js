const express  =require('express');
const router = express.Router();
const userController =require('../controllers/user/userController');
const passport = require('../config/passport');

const profileController=require('../controllers/user/profileController');


router.get('/pageNotFound',userController.pageNotFound);

router.get('/',userController.loadHomepage);
router.get('/signup',userController.loadSignup);
router.get('/shop',userController.loadShopping);
router.get('/login',userController.loadLogin);
router.post('/login',userController.login);
router.post('/signup',userController.signup);
router.post('/verify-otp',userController.verifyOtp);
router.post('/resend-link',userController.resend);
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/signup'}),(req,res)=>{
    res.redirect('/')
});
router.get('/logout',userController.logout);

//profile-managment

router.get('/forgot-password',profileController.getFrogotPassPage);
router.post('/forgot-email-valid',profileController.forgotEmailValid);
router.post('/forget-email-valid', profileController.forgotEmailValid);

module.exports =router;