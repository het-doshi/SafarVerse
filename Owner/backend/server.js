import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config();


const app = express()
const port = process.env.PORT || 5000;

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
import {login, register} from './controllers/Owner.js'
import{createTip, getTips, deleteTip} from './controllers/Tips.js'
import{createPackage, getPackage, AddDestination, getDestinations, deleteDestination, deletePackage} from './controllers/Package.js'

// Owner Routes
app.post("/api/register", register);
app.post("/api/login", login)

//tip Routes
app.post("/api/createTip", createTip)
app.get("/api/getTips", getTips)
app.delete("/api/deleteTip", deleteTip)

//package Routes
app.post("/api/createPackage", createPackage)
app.get("/api/getPackage", getPackage)
app.post("/api/addDest", AddDestination)
app.get("/api/getDestinations", getDestinations)
app.delete("/api/deletePackage", deletePackage)
app.post("/api/deleteDest", deleteDestination)


app.listen(port, () => {
    connect();
    console.log('Server listening on Port', port);
})