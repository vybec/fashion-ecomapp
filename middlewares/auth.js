const User=require('../Models/userSchema');
const userAuth = (req,res,next) =>{
    if(req.session.user){
        User.findById(req.session.user)
        .then(data=>{
            if(data && !data.isBlocked){
                next();
            }else{
                res.redirect('/login')
            }
        })
        .catch(error=>{
            console.log('Error in user auth midw');
            res.status(500).send('Internal Server error')
            
        })
    }else{
        res.redirect('/login')
    }
}

const adminAuth = (req,res,next) =>{
    
        User.findOne({isAdmin:true})
        .then(data=>{
            if(data){
                next();
            }else{
                res.redirect('/admin/login')
            }
        })
        .catch(error=>{
            console.log('Error in  adminauth midw',error);
            res.status(500).send('Internal Server error')
            
        })
    
}

module.exports={userAuth,adminAuth}

