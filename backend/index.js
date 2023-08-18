const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const nodemon = require('nodemon');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user')

dotenv.config();


const app = express();

//===========call back method is doesn't work===========
// mongoose.connect(process.env.MONGODB_URL, () => {
//     console.log('CONNECTED TO MONGO DB')
// })

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('CONNECTED TO MONGO DB');
    } catch (error) {
        console.error('Mongoose connection error:', error);
    }
})();


app.use(cors()); //prevent corss-origin error
app.use(cookieParser())
app.use(express.json())//transfer all req to JSON

//ROUTES
app.use('/v1/auth', authRoute)
app.use('/v1/user', userRoute)

app.listen(8000, () => {
    console.log('Server is running')
})