import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRouter.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json()) //whenever we make any request it will be passed to this method
app.use(cors()) //allow frontend to backend

//api endpoints
app.use('/api/admin', adminRouter)
//localhost:4000/api/admin

app.use('/api/doctor', doctorRouter)

app.use('/api/user',userRouter)

app.get('/', (req,res)=>{
    res.send('API Working Great')
})

app.listen(port, () => console.log("Server Started"))



//config = mongodb config, cloudnary config
//controlers = main logic for API
//middlewares = we will create custom middlewares to authenticate the users 
//models = mongoose model to store the data in structured manner
//routes = to create diferent routes for the diff apis
//.env = environment variables
