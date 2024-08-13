const express =require('express');
const router =express.Router();

const adminControlller =require ('../controllers/admin/adminController');

const {userAuth,adminAuth} =require('../middlewares/auth');

const customerController =require('../controllers/admin/customerController');

const categoryController =require('../controllers/admin/categoryController');


router.get('/pageerror',adminControlller.pageerror);
router.get('/login',adminControlller.loadLogin);
router.post('/login',adminControlller.login);//post reqquest for login
router.get('/',adminAuth,adminControlller.loadDashboard);

router.get('/logout',adminControlller.logout);//logout setted

router.get('/user',adminAuth,customerController.customerInfo);//customer management
router.get('/blockCustomer',adminAuth,customerController.customerBlocked);
router.get('/unblockCustomer',adminAuth,customerController.customerunBlocked);

router.get('/category',adminAuth,categoryController.categoryInfo);//category mangement
router.post('/addCategory',adminAuth,categoryController.addCategory);
router.post('/addCategoryOffer',adminAuth,categoryController.addCategoryOffer);
router.post('/removeCategoryOffer',adminAuth,categoryController.removeCategoryOffer);
router.get('/listCategory',adminAuth,categoryController.getListCategory);
router.get('/unlistCategory',adminAuth,categoryController.getUnlistCategory);

module.exports =router;