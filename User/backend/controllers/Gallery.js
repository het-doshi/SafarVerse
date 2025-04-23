import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import gallery from '../models/gallary.js';
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

// Create picture
export const uploadPicture = async (req, res) => {
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
            const imageUrl = result.secure_url;
            const bemail = req.body.email;
            await gallery.create({
                email: bemail,
                image: imageUrl,
            });

            res.status(200).json({ message: "Picture uploaded successfully", imageUrl });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
};

// get pictures
export const getPicture = async (req, res) => {
    try {
        const email = req.body.email;

        
        const picturesList = await gallery.find({ email });

        const picturesResponse = picturesList.map(picture => ({
            image: picture.image,
            id : picture.id
        }));

        res.status(200).json(picturesResponse);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// delete picture
export const deletePicture = async (req, res) => {
    try {
        const selectedItem = await gallery.findOne({ _id: req.query.id });
        
        if (selectedItem) {
            await gallery.deleteOne({ _id: req.query.id }); 
            res.status(200).json({ message: "Photo deleted successfully" });
        } else {
            res.status(404).json({ message: "Photo not found" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
