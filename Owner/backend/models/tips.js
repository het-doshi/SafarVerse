import mongoose from "mongoose";

const tipsSchema = new mongoose.Schema({
    email: String,
    image: String,
    title: String,
    description: String,
    
}) 

export default mongoose.model('Tips',tipsSchema);
