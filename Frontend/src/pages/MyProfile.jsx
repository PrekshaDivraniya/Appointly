import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppCOntext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  
  const {userData, setUserData,token, backendUrl, loadUserProfileData} = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateProfilePhotoData = async () => {
    console.log("Update function called");
    try {
      const formData = new FormData();
      formData.append('name',userData.name);
      formData.append('phone',userData.phone);
      formData.append('gender',userData.gender);
      formData.append('dob',userData.dob);
      formData.append('address', userData.address ? JSON.stringify(userData.address) : '{}');

      if (image) {
        formData.append('image', image);
      }

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile', 
        formData, 
        { headers: { 
            token, 
            "Content-Type": "multipart/form-data" 
        }}
      );

      console.log("Response from server:", data);

      if(data.success){
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.message);
    }
  };

  return userData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {
        isEdit
        ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer">
            <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image ? '' : assets.upload_icon} alt="" />
          </div>
          <input onChange={(e)=> setImage(e.target.files[0])} type="file" id="image" hidden/>
        </label>
        :<img className="w-36 rounded" src={userData.image} alt="" />
      }

      {isEdit ? (
        <input className="bg-gray-50 text-3xl font-medium max-w-96 mt-4 pl-1"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          {isEdit ? (
            <input className=" bg-gray-100 max-w-72 pl-1"
              type="text"
              value={userData.email}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.email}</p>
          )}
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input className="pl-1 bg-gray-100 max-w-72"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-500">{userData.phone}</p>
          )}
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input className=" bg-gray-50 pl-1"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
              />
              <br />
              <input className=" bg-gray-50 pl-1"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
              />
            </p>
          ) : (
            <p className=" text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700">
          <p>Gender</p>
          {isEdit ?
            <select className="max-w-20 bg-gray-100" value={userData.gender} onChange={(e) => setUserData((prev) =>({...prev, gender:e.target.value}))}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          : (
            <p className="text-gray-400">{userData.gender ? userData.gender : "Not Selected"}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {
            isEdit ?
            <input className="max-w-28 bg-gray-100" value={userData.dob} onChange={(e) => setUserData((prev) => ({...prev,dob:e.target.value}))} type="date"/>
            : <p className="text-gray-400">{userData.dob ? userData.dob : "Not Selected"}</p>
          }
        </div>
      </div>

      <div className="mt-10">
        {
          isEdit ?
          <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={updateProfilePhotoData}>Save Information</button>
          : <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>
    </div>
  );
};

export default MyProfile;
