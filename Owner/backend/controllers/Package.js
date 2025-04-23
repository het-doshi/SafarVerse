import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import Package from '../models/Package.js'
import fs from "fs";
dotenv.config();

// Configure multer
const upload = multer({ dest: 'uploads/' });

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET 
});


// create package 
export const createPackage = async (req, res) => {
    upload.single('image')(req, res, async function (err) {
        if (err) {
            console.error("Error uploading file:", err);
            return res.status(400).json({ error: "Error uploading file" });
        }
        try {
            const { ownerId, name, place, price, description, startDay, days } = req.body;

            if (!ownerId || !name || !place || !price || !description || !days || !startDay) {
                return res.status(400).json({ error: "Missing required fields" });
            }

            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }

            const result = await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);

            const newPackage = await Package.create({
                owner: ownerId,
                name,
                place,
                image: result.secure_url,
                price,
                days,
                startDay,
                description,
                person: null,
                destinations: [],
            });

            res.status(201).json({ message: "Package created successfully", newPackage });

        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
};


//get packages
export const getPackage = async (req, res) => {
    try {
        const PackageList = await Package.find({ owner: req.query.owner });

        const PackageResponse = PackageList.map(Package => ({
            id: Package._id,  
            owner: Package.owner, 
            description: Package.description,
            name :Package.name,
            place : Package.place,
            price : Package.price,
            image: Package.image,
            startDay : Package.startDay,
            days : Package.days,
        }));

        res.status(200).json(PackageResponse);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


// delete Package
export const deletePackage = async (req, res) => {
  try {
      const selectedItem = await Package.findOne({ _id: req.query.id });
      
      if (selectedItem) {

          await Package.deleteOne({ _id: req.query.id }); 
          res.status(200).json({ message: "Package deleted successfully" });
      } else {
          res.status(404).json({ message: "Package not found" });
      }

  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};



// add destination
export const AddDestination = async (req, res) => {
    upload.single("image")(req, res, async function (err) {
      try {
        const existPackage = await Package.findById(req.query.packageId);
  
        if (!existPackage) {
          return res.status(404).json({ message: "Package not found" });
        }
  
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(400).json({ error: "Error uploading file" });
        }
  
        if (!req.file) {
          return res.status(400).json({ error: "No file uploaded" });
        }
  
        const result = await cloudinary.uploader.upload(req.file.path);
  

        existPackage.destinations.push({
          name: req.body.name,
          address: req.body.address,
          room_image: result.secure_url,
        });
  
        await existPackage.save(); 
  
        res.status(200).json({ message: "Destination added successfully" });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
};



//get Destinations
export const getDestinations = async (req, res) => {
  try {
    const existPackage = await Package.findById(req.query.id);

    if (!existPackage) {
      return res.status(404).json({ error: "Package not found" });
    }

    const DestResponse = existPackage.destinations.map((Dest) => ({
      name: Dest.name,
      address: Dest.address,
      image: Dest.room_image,
    }));

    res.status(200).json(DestResponse);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

  
// delete destination
export const deleteDestination = async (req, res) => {
  try {
    const selectedPackage = await Package.findById(req.query.id);

    if (!selectedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    
    selectedPackage.destinations = selectedPackage.destinations.filter(
      (destination) =>
        destination.name !== req.query.name || destination.address !== req.query.address
    );

    await selectedPackage.save();
    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


  
