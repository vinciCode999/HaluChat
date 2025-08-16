import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signup = async(req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if(!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if(password.length < 6){
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const idx = Math.floor(Math.random()*100) + 1; //generate random # between 1 & 100
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = await User.create({
      email,
      fullName,
      password,
      avatar: randomAvatar
    });

    //TODO: CREATE THE USER IN STREAM AS WELL

    const token = jwt.sign({userId: newUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

    res.cookie("jwt", token, { 
      httpOnly: true, //prevent client-side JavaScript from accessing the cookie
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict", //prevent CSRF attacks
      secure: process.env.NODE_ENV === "production" //use secure cookies in production
    });

    res.status(201).json({
      success: true,
      user: newUser,
    });

  } catch (error) {
    console.log("Error in signup function:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async(req, res) => {
  res.end("Login route");
};

export const logout = async(req, res) => {
  res.end("Logout route");
};
