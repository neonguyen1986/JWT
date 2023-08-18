const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken')

require('dotenv').config();

let refreshTokenArr = [];

const authController = {
    //REGISTER USER
    registerUser: async (req, res) => {
        // console.log('register======', req.body)
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            //Create new user
            const newUser = await new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
            });

            //save user to DB
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //GENERATE ACCESS TOKEN
    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
            process.env.JWT_ACCESS_KEY,//secret key to add to token
            { expiresIn: '30s' },//after 5 minutes, the token will be expired, user have to login again
        );
    },
    //GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
            process.env.JWT_REFRESH_KEY,//secret key to add to token
            { expiresIn: '1d' },//after 5 minutes, the token will be expired, user have to login again
        );
    },
    //LOGIN
    loginUser: async (req, res) => {
        // console.log('login========', req.body)
        try {
            const user = await User.findOne({ username: req.body.username })
            if (!user) {
                return res.status(401).json('Wrong username!');
            }
            const validPass = await bcrypt.compare(req.body.password, user.password)
            if (!validPass) {
                return res.status(401).json('Wrong password!');
            }
            if (user && validPass) {
                //==========JWT=========
                //JWT TOKEN
                const accessToken = authController.generateAccessToken(user);
                const refreshToken = authController.generateRefreshToken(user);
                refreshTokenArr.push(refreshToken)
                console.log('justLogin Arr======', refreshTokenArr)
                //save refreshToken in cookies
                res.cookie('refreshTokenCookie', refreshToken, {
                    httpOnly: true,
                    secure: false,   //when deploy change it to true
                    path: '/',
                    sameSite: 'strict',
                })

                const { password, ...others } = user._doc;//others is remain data after remove password
                res.status(200).json({
                    errMessage: 'Login success!',
                    ...others,
                    accessToken,
                })
                //==========JWT=========
            }
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //REQUEST A FRESH TOKEN
    requestRefreshToken: async (req, res) => {
        //Take curren refresh token from user then creat a new accesstoken
        const refreshToken = req.cookies.refreshTokenCookie
        // console.log('refreshTokenCookie======', refreshToken)
        if (!refreshToken) return res.status(401).json("You're not authenticated")
        if (!refreshTokenArr.includes(refreshToken)) {
            return res.status(403).json("Refresh Token is not valid")
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
            if (err) {
                console.log(err)
            }
            else {
                refreshTokenArr = refreshTokenArr.filter((token) => token !== refreshToken);
                console.log('removed old reToken Arr======', refreshTokenArr)

                //create new refreshToken, accessToken
                const newAccessToken = authController.generateAccessToken(user);
                const newRefreshToken = authController.generateRefreshToken(user);
                refreshTokenArr.push(newRefreshToken)
                console.log('added new reToken Arr======', refreshTokenArr)

                //save newRefreshToken in cookies
                res.cookie('refreshTokenCookie', newRefreshToken, {
                    httpOnly: true,
                    secure: false,   //when deploy change it to true
                    path: '/',
                    sameSite: 'strict',
                })
                res.status(200).json({ accessToken: newAccessToken, })

            }
        })
    },

    //LOGOUT
    userLogout: async (req, res) => {
        res.clearCookie('refreshToken');
        //accessToken will be clear in frontend
        refreshTokenArr = refreshTokenArr.filter((token) => token !== req.cookies.refreshToken)
        res.status(200).json('Logged out!')
    }
}

module.exports = authController;