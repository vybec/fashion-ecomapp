const express  =require('express');
const router = express.Router();
const userController =require('../controllers/user/userController')



router.get('/',userController.loadHomepage);
router.get('/signup',userController.loadSignup);
router.get('/shop',userController.loadShopping);
router.get('/login',userController.loadlogin);
router.post('/signup',userController.signup);

module.exports =router;