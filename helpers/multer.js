const multer =require('multer');
const path =require('path');


const storage =multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,path,join(__dirname,"../public/uploads/re-image"));

    },
    filename:(req,res,cb)=>{
        cb(null,Date.now()+'-'+file.originalname);
    }
})

module.exports=storage;