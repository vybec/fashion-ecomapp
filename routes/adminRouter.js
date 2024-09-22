const express =require('express');
const router =express.Router();

const adminControlller =require ('../controllers/admin/adminController');

const {userAuth,adminAuth} =require('../middlewares/auth');

const customerController =require('../controllers/admin/customerController');

const categoryController =require('../controllers/admin/categoryController');

const multer =require('multer');
const storage=require('../helpers/multer');
const uploads=multer({storage:storage});
const brandController=require('../controllers/admin/brandController');

const productController=require('../controllers/admin/productConroller');




router.get('/pageerror',adminControlller.pageerror);
router.get('/login',adminControlller.loadLogin);
router.post('/login',adminControlller.login);//post reqquest for login
router.get('/',adminAuth,adminControlller.loadDashboard);

router.get('/logout',adminControlller.logout);//logout setted

router.get('/user',adminAuth,customerController.customerInfo);//customer management
router.get('/blockCustomer',adminAuth,customerController.customerBlocked);
router.get('/unblockCustomer',adminAuth,customerController.customerunBlocked);

router.get('/category',adminAuth,categoryController.categoryInfo);//category management
router.post('/addCategory',adminAuth,categoryController.addCategory);
router.post('/addCategoryOffer',adminAuth,categoryController.addCategoryOffer);
router.post('/removeCategoryOffer',adminAuth,categoryController.removeCategoryOffer);
router.get('/listCategory',adminAuth,categoryController.getListCategory);
router.get('/unlistCategory',adminAuth,categoryController.getUnlistCategory);
router.get('/editCategory',adminAuth,categoryController.getEditCategory);
router.post('/editCategory/:id',adminAuth,categoryController.editCategory);

router.get('/brands',adminAuth,brandController.getBrandPage);//brand management
router.post('/addBrand/',adminAuth,uploads.single('image'),brandController.addBrand);
router.get('/blockBrand/:id',adminAuth,brandController.blockBrand);
router.get('/unBlockBrand/:id',adminAuth,brandController.unBlockBrand);
router.get('/deleteBrand/:id',adminAuth,brandController.deleteBrand);

router.get('/addProducts',adminAuth,productController.getProductAddPage);//product managment
router.post('/addProducts',adminAuth,uploads.array('images',4),productController.addProducts);
router.get('/products',adminAuth,productController.getAllProducts);
router.post('/addProductOffer',adminAuth,productController.addProductOffer);
router.post('/removeProductOffer',adminAuth,productController.removeProductOffer);
router.get('/blockProduct',adminAuth,productController.blockProduct);
router.get('/unblockProduct',adminAuth,productController.unblockProduct);
router.get('/editProduct',adminAuth,productController.getEditProduct);
router.get('/editProduct/:id',adminAuth,uploads.array('images',4),productController.editProduct);
router.get('/deletImage',adminAuth,productController.deleteSingleImage);






module.exports =router;



////arrange the code shift+Alt+f