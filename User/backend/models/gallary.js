import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    email: String,
    image: String,
}); 

const gallery = mongoose.model('Gallery', gallerySchema);
export default gallery;