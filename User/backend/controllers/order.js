import Razorpay from "razorpay";
import order from "../models/order.js";

// Creating the Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Creating Order 
export const CreateOrder = async (req, res) => {
  try {
    const { amt, packageId, packageName, userid, userName } = req.body;

    if (!amt || !packageId || !packageName || !userid || !userName) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const today = new Date();
    const year = today.getFullYear();

    // Create the order in Razorpay
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: Math.round(amt * 100),
      currency: "INR",
      receipt: `${year}''${userid}`,
      notes: {
        packageName: packageName,
      },
    });

    // Store order in database
    const newOrder = await order.create({
      username: userName,
      packageName: packageName,
      packageId: packageId,
      amount: amt,  
      razorpayOrder: razorpayOrder.id,
      status: "pending",
    });

    res.status(201).json({ data: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
