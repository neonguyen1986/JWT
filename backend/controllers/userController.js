const User = require('../models/User')

const userController = {
    //GET ALL USERS
    getAllUsers: async (req, res) => {
        //console.log('getAllUser=====',req)
        try {
            //if user is NOT admin, display All users but Admin
            const curUser = await User.findOne({ username: req.body.username })

            const allUsers = curUser?.admin === false
                ? await User.find({ admin: false })
                : await User.find()
            res.status(200).json(allUsers)
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //DELETE USER
    deleteUser: async (req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('Delete successfully')
        } catch (error) {
            res.status(500).json(error)
        }
    },
}
module.exports = userController;