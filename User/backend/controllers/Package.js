import Package from '../models/Package.js'

// get packages
export const getPackage = async (req, res) => {
    try {
        const PackageList = await Package.find({  });

        const PackageResponse = PackageList.map(Package => ({
            id: Package._id,  
            owner: Package.owner, 
            description: Package.description,
            name :Package.name,
            place : Package.place,
            price : Package.price,
            image: Package.image,
            days : Package.days,
            startDay : Package.startDay
        }));

        res.status(200).json(PackageResponse);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// get destinations
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
  