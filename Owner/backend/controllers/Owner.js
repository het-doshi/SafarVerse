import bcrypt from "bcrypt";
import Owner from "../models/Owner.js"; 

const saltRounds = 10; 

// registeration
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        
        const existingUser = await Owner.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ error: "Email already exists" });
            }
            return res.status(400).json({ error: "Username already exists" });
        }

        
        const hashpass = await bcrypt.hash(password, 10);

        
        const newUser = await Owner.create({
            username,
            email,
            password: hashpass,
            image : null
        });

        res.status(200).json({ message: "Registration successful", data: newUser });

    } catch (error) {
        if (error.code === 11000) { 
            const key = Object.keys(error.keyValue)[0]; 
            return res.status(400).json({ error: `${key} already exists` });
        }
        res.status(500).json({ error: error.message });
    }
};


//Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, owner.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.status(200).json({ 
            message: "Login successful", 
            owner: { id: owner._id, username: owner.username, email: owner.email }
        });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
