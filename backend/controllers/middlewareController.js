const jwt = require('jsonwebtoken')

const middlewareController = {

    //Verify Token
    verifyToken: (req, res, next) => {
        // console.log('req.user in Mid before========', req.user)//undefined
        const token = req.headers.token; //get token from user
        if (token) {
            const accessToken = token.split(" ")[1] //we must take [1] because token= bearer yourtokenkeyhere
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    res.status(403).json("Your token is not valid")//403:forbidden
                } else {
                    req.user = user;
                    // console.log('req.user in Mid after========', req.user)//has id, admin, iat, exp
                    next();
                }
            })
        } else {
            res.status(401).json("You're not authenticated")
        }
    },

    //VERIFY TOKEN FOR ADMIN AUTH
    verifyTokenAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.admin === true) {
                //req.user.id;.admin: id, admin from token;  req.params.id: id from params in delete URL
                next()
            } else {
                res.status(403).json("You're not allowed to delete user")
            }
        })
    }
}

module.exports = middlewareController;