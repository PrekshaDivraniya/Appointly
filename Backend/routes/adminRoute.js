import express from 'express'
import  {addDoctor, allDoctors, loginAdmin,appointmentsAdmin,appointmentCancel, adminDashboard}  from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAddmin.js'
import { changeAvailibility } from '../controllers/doctorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image') ,addDoctor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-doctor', authAdmin ,allDoctors)
adminRouter.post('/change-availability', authAdmin ,changeAvailibility)
adminRouter.get('/appointments',authAdmin, appointmentsAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
export default adminRouter