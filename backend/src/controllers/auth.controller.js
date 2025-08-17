import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { upsertStreamUser } from "../lib/stream.js";
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

    try {
      upsertStreamUser({
      id: newUser._id.toString(),
      name: newUser.fullName,
      image: newUser.avatar || ""
    })
    console.log(`Stream user upserted for ${newUser.fullName}`);
    } catch (error) {
      console.error("Error upserting Stream user:", error);
    }


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
  const { email, password } = req.body;

  try {
    if(!email || !password){
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
      return res.status(400).json({ message: "Invalid email format" });
    }


    const user = await User.findOne({ email });
    const isCorrectPassword = await user.matchPassword(password);

    if(!isCorrectPassword){
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if(!user){
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});

    res.cookie("jwt", token, { 
      httpOnly: true, //prevent client-side JavaScript from accessing the cookie
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict", //prevent CSRF attacks
      secure: process.env.NODE_ENV === "production" //use secure cookies in production
    });

    res.status(201).json({
      success: true,
      message: "Login successful",
      user: user
    })
  } catch (error) {
    console.log("Error in login function:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logout successful" });
};

export const onBoard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, bio, nativeLanguage, learningLanguage, location} = req.body;
    if(!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({ 
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location"
        ].filter(Boolean)
      });
    }


    // Update user information
    const updatedUser = await User.findByIdAndUpdate(userId, {
      ...req.body,
      isOnBoarded: true
    }, { new: true });

    if(!updatedUser)return res.status(404).json({ message: "User not found" });
    try{
      await upsertStreamUser({
      id: updatedUser._id.toString(),
      name: updatedUser.fullName,
      image: updatedUser.avatar || ""
    });

    console.log(`User information for ${updatedUser.fullName} updated in Stream`);
    } catch (streamError){
      console.log("Error updating user information in Stream:", streamError.message);
    }
    

    res.status(200).json({
      success: true,
      user: updatedUser
    });
  } catch (error) {
    console.log("Error in onBoard function:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};