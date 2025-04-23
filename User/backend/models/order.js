import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    username: String,
    packageName: String,
    packageId: Number,
    ammount: Number,
    razorpayOrder: String,
    status: String
}) 

export default mongoose.model('Order',orderSchema);
