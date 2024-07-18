const express =require('express');
const router =express.Router();

const adminControlller =require ('../controllers/admin/adminController');



router.get('/login',adminControlller.loadLogin);



module.exports =router;