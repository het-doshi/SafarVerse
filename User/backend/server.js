import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config();


const app = express()
const port = process.env.PORT || 4000;

const corsOptions = {
    origin:true,
    credentials:true
}


mongoose.set("strictQuery", false);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI ,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Is connected successfully');
    } catch (err) {
        console.log(err);
    }
};



//middleware
app.use(express.json());
app.use(cors());


//import controllers
import { register, login } from './controllers/User.js';
import { uploadPicture, getPicture, deletePicture } from './controllers/Gallery.js';
import{createTip, getTips, deleteTip} from './controllers/Tips.js'
import{ getPackage,  getDestinations} from './controllers/Package.js'
import { CreateOrder } from './controllers/order.js';

// user Routes
app.post("/api/register", register);
app.post("/api/login", login)


//Gallery Routes
app.post("/api/upload", uploadPicture)
app.post("/api/getPhotos", getPicture)
app.delete("/api/deletePhoto", deletePicture)


//tip Routes
app.post("/api/createTip", createTip)
app.get("/api/getTips", getTips)
app.delete("/api/deleteTip", deleteTip)


//package Routes
app.get("/api/getPackage", getPackage)
app.get("/api/getDestinations", getDestinations)


//order routes
app.post("/api/createOrder", CreateOrder)


app.listen(port, () => {
    connect();
    console.log('Server listening on Port', port);
})