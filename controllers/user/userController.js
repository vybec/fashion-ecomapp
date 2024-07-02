const loadSignup =async (req,res)=>{
    try {
        return res.render('signup');

    } catch (error) {
        console.log('HOME IS NOT LOADING:',error);
        res.status(500).send('Server Error');
        
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







const loadHomepage =async(req,res)=>{
    try {

        return res.render('home')

        
    } catch (error) {
        console.log('home is not loading',error);
        res.status(500).send('server error')
        
    }
}

module.exports ={loadHomepage,loadSignup,loadShopping};