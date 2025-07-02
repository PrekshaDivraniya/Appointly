import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/get-profile', authUser,getProfile)

userRouter.post('/update-profile', authUser, upload.single('image'), (req, res, next) => {
    console.log("Middleware Debugging:", req.body);
    console.log("File Uploaded:", req.file);
    next()
} ,updateProfile)

userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments', authUser ,listAppointment)
userRouter.post('/cancel-appointment',authUser, cancelAppointment)
export default userRouter