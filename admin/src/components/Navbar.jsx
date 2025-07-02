import React from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext'; // Adjust path as needed
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext';
const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext);
    const {dToken, setDToken} = useContext(DoctorContext);

    const navigate = useNavigate();

    const logout = () =>{
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        navigate('/')
    }
    const doclogout = () =>{
      dToken && setDToken('')
      dToken && localStorage.removeItem('dToken')
      navigate('/')
  }

  return (
    <div className='flex justify-between items-center sm:px-4 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.logo2} alt="logo" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        {aToken 
        ? <button onClick={logout} className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full'>Logout</button>
      :<button onClick={doclogout} className='bg-[#5F6FFF] text-white text-sm px-10 py-2 rounded-full'>Logout</button>}
        
    </div>
  )
}

export default Navbar