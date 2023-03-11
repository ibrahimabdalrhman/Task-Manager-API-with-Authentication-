const jwt = require('jsonwebtoken');
const User=require('../models/userModel')

const auth =async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decodedToken = jwt.verify(token, "secret");
            // req.user = await User.findById(decodedToken.id);
            req.userId = decodedToken.id
            next();
        
        } catch (err) {
            console.log(err.message);
                return res.status(400).json({
                    msg: 'login failed'
                });
        }
        
    } else {
        res.status(400).json({
            msg:"you must login "
        })
    }
    
}

module.exports = { auth };