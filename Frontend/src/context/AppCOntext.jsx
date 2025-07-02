import { createContext, useEffect } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const AppContext = createContext();

import { useState } from "react";
const AppContextProvider = (props) => {

    const [doctors, setDoctors] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [userData, setUserData] = useState(false);

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false);
    const currencySymbol = '$';

    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const loadUserProfileData = async () => {
        try {
            console.log("Loading user profile data...");
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } });
            console.log("User profile data:", data);
            if (data.success) {
                setUserData({
                    ...data.userData,
                    gender: data.userData.gender || "Not Selected",
                    dob: data.userData.dob || "Not Selected"
                });
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const value = {
        doctors, getDoctorsData ,currencySymbol,
        backendUrl, token, setToken,
        userData, setUserData, loadUserProfileData
    };

    useEffect(() => {
        getDoctorsData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false);
        }
    }, [token]);

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;