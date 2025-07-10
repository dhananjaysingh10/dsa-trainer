const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const jwt = require('jsonwebtoken');

const signup = async (req, res, next) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password || username === '' || email === '' || password === '') {
        next(errorHandler(400, "All fields are required"))
        // return res.status(400).json({message: "All fields are required"});
    }
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.json({message: 'signup sucessfull'});
    } catch (error) {
        // res.status(500).json({message: error.message});
        next(error);
    }
    
};

const signin = async(req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password || email === '' || password === '') {
        return next(errorHandler(400, "All fields are required"));
    }
    try {
        const vaildUser = await User.findOne({email});
        if(!vaildUser){
            return next(errorHandler(404, 'Email or Password incorrect'));
        }
        const vailPassword = bcryptjs.compareSync(password, vaildUser.password);

        if(!vailPassword){
            return next(errorHandler(404, 'Email or Password incorrect'));
        }
        const token = jwt.sign(
            {
                id: vaildUser._id,
                isAdmin: vaildUser.isAdmin,
                isWriter: vaildUser.isWriter
            },
            process.env.JWT_SECRET,
            // {
            //     expiresIn: '1d'
            // }
        );

        const {password: pass, ...rest} = vaildUser._doc;

        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production',
            // secure: true, same same
            maxAge: 7 * 24 * 60 * 60 * 1000,
            // sameSite: 'Strict'
            // sameSite: 'LAX'
            // sameSite: 'LAX'
        }).json(rest);

    } catch (error) {
        next(error);
    }
}

const google = async (req, res, next) => {
    const {email, name, googlePhotoUrl} = req.body;
    try {
        const user = await User.findOne({email});
        if(user) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;
            console.log(token);
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }).json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') +
                Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            })
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest} = newUser._doc;
            console.log(token);
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            }).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

const checkSession = async (req, res, next) => {
    try {
        // console.log(req);
        // console.log(req.cookies);
        const token = req.cookies.access_token; // Get the token from the cookie
        // console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { password, ...userData } = user._doc;
        res.status(200).json(userData);
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    signup,
    signin,
    google,
    checkSession
}