
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAddLeadMutation } from "../services/apiService"; // ✅ same mutation as Contact form
import logo from "../assets/1.jpg"; 

const PopupForm = ({ delay = 10000 }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [addLead, { isLoading }] = useAddLeadMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addLead(formData).unwrap();
      toast.success("Your details have been submitted!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setShow(false); // close popup after submission
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit details");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="relative bg-white rounded-lg w-[90%] max-w-md p-8 shadow-lg animate-fadeIn">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
          onClick={() => setShow(false)}
        >
          <FaTimes />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center">
            <img src={logo} alt="Logo" className="rounded-full" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-yellow-400 mb-2">
          Don’t miss the chance!
        </h2>

        {/* Subtext */}
        <p className="text-center text-gray-700 mb-6">
          Join our mailing list to get 15% off your next purchase.
        </p>

        {/* Form */}
        <form className="space-y-3 text-black" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E Mail Address"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us anything about your lovely car"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          ></textarea>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-yellow-400 hover:bg-black text-white font-semibold py-2 rounded"
          >
            {isLoading ? "Submitting..." : "Get the chance"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
