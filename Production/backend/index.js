const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
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


app.use(cors({
    origin: process.env.URL_REACT,
    credentials: true,
}));
app.use(cookieParser())
app.use(express.json())//transfer all req to JSON
app.get('/', (req, res) => {
    res.send('hello from backend')
})
//ROUTES
app.use('/v1/auth', authRoute)
app.use('/v1/user', userRoute)

app.listen(process.env.PORT, () => {
    console.log('Server is running')
})