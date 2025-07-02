import jwt from 'jsonwebtoken'

//Doctor authentication middleware

import doctorModel from '../models/doctorModel.js';

const authDoctor = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token

    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided. Please login again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.doctor = await doctorModel.findById(decoded.id).select("-password"); // Attach doctor to req

    if (!req.doctor) {
      return res.status(401).json({ success: false, message: "Doctor not found. Please login again." });
    }

    next(); // Move to next middleware/controller

  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Unauthorized. Please login again." });
  }
};
export default authDoctor