import React, { useState } from "react";
import { useCheckoutPremiumMutation } from "../services/apiService";
const CheckoutPremium = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    timeSlot: "",
    service: "Platinum",
    price: 499,
    gst: 89.82,
    total: 588.82,
  });
   const [checkoutPremium] = useCheckoutPremiumMutation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         await checkoutPremium(formData).unwrap();
      alert("Order placed successfully! (Premium)");
       setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          timeSlot: "",
          service: "Premium Car Wash",
          price: 499,
          gst: 89.82,
          total: 588.82,
        });
     
       } catch (err) {
  console.error("CheckoutPremium error:", err);
  alert(err?.data?.message || err?.error || "Something went wrong");
}

  };

  return (
    <div className="bg-gray-800 min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        
        {/* Billing Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-6">Billing Details</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="john@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                rows="3"
                placeholder="Street, City, Pincode"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Time Slot</label>
              <select
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              >
                <option value="">Select a time slot</option>
                <option value="9-11am">9:00 AM - 11:00 AM</option>
                <option value="11-1pm">11:00 AM - 1:00 PM</option>
                <option value="2-4pm">2:00 PM - 4:00 PM</option>
                <option value="4-6pm">4:00 PM - 6:00 PM</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-8 w-full bg-yellow-400 hover:bg-yellow-500 transition-colors duration-200 text-black font-semibold py-3 rounded-md shadow-sm"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>

          <div className="space-y-4 text-sm text-gray-800">
            <div className="flex justify-between border-b pb-2">
              <span>Service:</span>
              <span className="font-bold">{formData.service}</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span>₹{formData.price}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%):</span>
              <span>₹{formData.gst}</span>
            </div>
            <div className="flex justify-between font-semibold text-black border-t pt-2">
              <span>Total:</span>
              <span>₹{formData.total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPremium;
