const User = require('../models/User')

const userController = {
    //GET ALL USERS
    getAllUsers: async (req, res) => {
        // console.log('getAllUser=====', req.user)
        //req here is the req from middleware
        //req.user:{
        //     id:........
        //     admin:.......
        //     iat:.......
        //     exp:.......
        // }
        try {
            //if user is NOT admin, display All users but Admin
            const allUsers = req.user.admin === false
                ? await User.find({ admin: false })
                : await User.find()
            res.status(200).json(allUsers)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //DELETE USER
    deleteUser: async (req, res) => {
        // console.log('deleteuser==============', req)
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('Delete successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    },
}
module.exports = userController;