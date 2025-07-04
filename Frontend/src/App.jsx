
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Contact from './pages/Contact'
import Login from './pages/Login'
import About from './pages/About'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import {ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/doctors' element = {<Doctors />} />
        <Route path='/doctors/:speciality' element = {<Doctors />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/about' element = {<About />} />
        <Route path='/my-profile' element = {<MyProfile />} />
        <Route path='/my-appointments' element = {<MyAppointments />} />
        <Route path='/appointment/:docId' element = {<Appointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App