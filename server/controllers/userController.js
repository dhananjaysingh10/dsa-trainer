const { errorHandler } = require("../utils/error.js");
const User = require("../models/User.js");
const bcryptjs = require('bcryptjs');
// const fetch = require('node-fetch'); // If using fetch in Node.js, ensure this is installed

const test = (req, res) => {
    res.send("API");
};

const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username can only contain letters and numbers'));
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    organization: req.body.organization,
                    profilePicture: req.body.profilePicture,
                    password: req.body.password,
                    cf: req.body.cf,
                    cc: req.body.cc,
                    leetcode: req.body.leetcode,
                    atcoder: req.body.atcoder,
                    gfg: req.body.gfg,
                    linkedin: req.body.linkedin,
                    github: req.body.github,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'you are not allowed to delete this user'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been deleted');
    } catch (error) {
        next(error);
    }
};

const signOut = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('user has been signed out');
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'Unauthorized'));
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1;
        const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const usersWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return next(errorHandler(404, 'User not found'));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

// const getCfProfile = async (req, res, next) => {
//     try {
//         const user = req.params.username;
//         const cfResponse = await fetch(`https://codeforces.com/api/user.info?handles=${user}`);
//         const cfResult = await cfResponse.json();

//         if (cfResult.status === 'OK') {
//             const getRatingColor = (rating) => {
//                 if (rating < 1200) return '#808080'; // Gray
//                 if (rating < 1400) return '#008000'; // Green
//                 if (rating < 1600) return '#03A89E'; // Cyan
//                 if (rating < 1900) return '#0000ff'; // Blue
//                 if (rating < 2100) return '#a0a';    // Violet
//                 if (rating < 2300) return '#FF8C00'; // Orange
//                 if (rating < 2400) return '#FF8C00'; // Orange
//                 if (rating < 2600) return '#ff0000'; // Red
//                 if (rating < 3000) return '#ff0000'; // Red
//                 return '#ff0000';                   // Legendary Red
//             };

//             const userInfo = cfResult.result[0];
//             const color = getRatingColor(userInfo.rating || 0);
//             const response = { ...userInfo, color, status: 'ok' };
//             return res.status(200).json(response);
//         } else {
//             return res.status(400).json({ error: cfResult.comment, status: 'bad' });
//         }
//     } catch (error) {
//         return res.status(500).json({ error: 'An unexpected error occurred', status: 'bad' });
//     }
// };

// Export all controllers as named properties
module.exports = {
    test,
    updateUser,
    deleteUser,
    signOut,
    getUsers,
    getUser,
    getProfile
};
