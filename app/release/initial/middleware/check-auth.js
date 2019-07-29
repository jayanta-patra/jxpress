const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const jwtconf = req.app.get('_env');
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded = jwt.verify(token, jwtconf.JWT_KEY);
        req.userData = decoded;
        next();
    }catch(error){
        res.status(401).json({
            message : 'Auth Failed'
        });
    }
    
}