const jwt = require('jsonwebtoken');
const {errorHandler} = ('./error.js');
const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; //cookie parser initialize in index.js
    if(!token) {
        return next(errorHandler(401, 'unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return next(errorHandler(401, 'unauthorized'));
        }
        req.user = user;
        next();
    });
};

module.exports = {verifyToken};