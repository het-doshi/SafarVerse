import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({ 
    owner : String,
    name: String,
    place: String,
    image: String,
    description: String,
    price: Number,
    person: Number,
    days: Number,
    startDay: String,
    destinations: [
      {
        name: String,
        address: String,
        room_image: String,
      },
    ],
  });

export default mongoose.model('Package',packageSchema);