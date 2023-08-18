const authController = require('../controllers/authControllers');
const middlewareController = require('../controllers/middlewareController')
const { route } = require('./user');
const router = require('express').Router();

//REGISTER
router.post('/register', authController.registerUser);

//LOGIN
router.post('/login', authController.loginUser);

//REFRESH TOKEN
router.post('/refresh', authController.requestRefreshToken);

//LOGOUT TOKEN
router.post('/logout', middlewareController.verifyToken, authController.userLogout);

module.exports = router;