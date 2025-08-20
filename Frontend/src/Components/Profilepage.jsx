import React, { useEffect, useState } from 'react';
import { useGetLoggedInUserQuery, useUpdateCustomerMutation } from '../services/apiService';
import { FaEdit } from 'react-icons/fa';
import userprofile from '../assets/default-user.jpg'; // Default profile picture

const ProfilePage = () => {
  const { data: user, isLoading } = useGetLoggedInUserQuery();
  const [updateCustomer] = useUpdateCustomerMutation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    profilePic: '', 
    carName: '',
    carModel: '',
    carColor: '',
    carNumber: '',
     address: '',
    parking: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
       profilePic: user.profilePic || '',

        carName: user.carDetails?.carName || '',
        carModel: user.carDetails?.carModel || '',
        carColor: user.carDetails?.carColor || '',
        carNumber: user.carDetails?.carNumber || '',
         address: user.carDetails?.address || '',
        parking: user.carDetails?.parking || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: user._id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
       profilePic: formData.profilePic, 
      carDetails: {
        carName: formData.carName,
        carModel: formData.carModel,
        carColor: formData.carColor,
        carNumber: formData.carNumber,
        address: formData.address,
        parking: formData.parking,
      },
    };

    try {
      await updateCustomer(payload).unwrap();
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed');
    }
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      <div className="bg-[#1f2937] rounded-xl p-8 w-full max-w-6xl">
        {/* Profile Picture */}
        {/* <div className="flex justify-center relative mb-10">
          <div className="w-28 h-28 rounded-full border-4 border-yellow-400 overflow-hidden relative">
            <img
              src={user.profilePic || '/default-profile.png'}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <label className="absolute bottom-0 right-[45%] bg-yellow-500 p-1 rounded-full cursor-pointer">
            <FaEdit />
            <input type="file" className="hidden" disabled />
          </label>
        </div> */}
        <div className="flex justify-center mb-6">
  <div className="relative w-32 h-32">
    <div className="w-full h-full rounded-full border-4 border-yellow-400 overflow-hidden">
      <img
        src={formData.profilePic || userprofile} 
        alt="Profile"
        className="w-full h-full object-cover"
      />
    </div>
    <label className="absolute bottom-0 right-0 bg-yellow-500 p-1 rounded-full cursor-pointer">
      <FaEdit />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormData((prev) => ({ ...prev, profilePic: reader.result }));
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </label>
  </div>
</div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* User Details */}
            <div className="bg-[#111827] p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-yellow-400 text-center mb-4"> {formData.name} </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm">Username</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
   {/* Profile Picture Centered at Top */}


                <div>
                  <label className="text-sm">Address</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
              </div>
            </div>

            {/* Car Details */}
            <div className="bg-[#111827] p-6 rounded-lg">
              <h2 className="text-2xl text-yellow-400 font-bold text-center mb-4">Car Details</h2>
              <div className="space-y-4">
                <div>
                   <label className="text-sm">Car Name</label>
                  <input
                    type="text"
                    name="carName"
                    placeholder="Car Name"
                    value={formData.carName}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div>
                   <label className="text-sm">car Model</label>
                  <input
                    type="text"
                    name="carModel"
                    placeholder="Car Model"
                    value={formData.carModel}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div>
                   <label className="text-sm">Car Color</label>
                  <input
                    type="text"
                    name="carColor"
                    placeholder="Car Color"
                    value={formData.carColor}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div>
                   <label className="text-sm">Car Number</label>
                  <input
                    type="text"
                    name="carNumber"
                    placeholder="Car Number"
                    value={formData.carNumber}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
                <div>
                   <label className="text-sm">Parking Slot * ( <span className="text-yellow-400">Basement No, Pillor No, Tower No</span> )</label>
                  <textarea
                    name="parking"
                    placeholder="Parking Slot"
                    value={formData.parking}
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-gray-800 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button type="submit" className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;