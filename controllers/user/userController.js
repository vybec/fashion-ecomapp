const loadHomepage =async(req,res)=>{
    try {

        return res.render('home')

        
    } catch (error) {
        console.log('home is not loading',error);
        res.status(500).send('server error')
        
    }
}

module.exports ={loadHomepage}