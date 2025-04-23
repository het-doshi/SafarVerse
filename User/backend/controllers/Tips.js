import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import tip from '../models/tips.js';
import dotenv from 'dotenv';


dotenv.config();

// Configure multer
const upload = multer({ dest: 'uploads/' });

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});

// create Tip
export const createTip = async (req, res) => {
    upload.single('image')(req, res, async function (err) {
        try {
            if (err) {
                console.error("Error uploading file:", err);
                return res.status(400).json({ error: "Error uploading file" });
            }

            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const result = await cloudinary.uploader.upload(req.file.path);
        

            const newTip = await tip.create({
                email: req.body.email,
                image: result.secure_url,
                title: req.body.title,
                description: req.body.description 
            });

            res.status(200).json({ message: "Tip shared successfully", newTip });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
};

// get the tips
export const getTips = async (req, res) => {
    try {
        const tipList = await tip.find({  });

        const tipResponse = tipList.map(tip => ({
            id : tip.id,
            email: tip.email,
            title: tip.title,
            description:tip.description,
            image: tip.image
        }));

        res.status(200).json(tipResponse);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// delete tips
export const deleteTip = async (req, res) => {
    try {
        const selectedItem = await tip.findOne({ _id: req.query.id });
        
        if (selectedItem) {
            await tip.deleteOne({ _id: req.query.id }); 
            res.status(200).json({ message: "Tip deleted successfully" });
        } else {
            res.status(404).json({ message: "Tip not found" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};