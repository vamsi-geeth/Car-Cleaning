import React,{useState} from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import heroBg from '../assets/contactbg1.jpg';
import { FaCheck } from "react-icons/fa";
import { useAddLeadMutation } from "../services/apiService"; // ✅ import mutation
import { toast } from "react-toastify";
function Contact  ()  {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
   const [addLead, { isLoading }] = useAddLeadMutation(); // ✅ mutation hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addLead(formData).unwrap(); // send data to backend
      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast.error("Failed to send your message");
    }
  };

  return (
    <div className="bg-[#070707] text-white font-sans">
      {/* Hero Section */}
      <section className="py-24 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="text-gray-300 mt-4 text-lg">Feel free to reach out to us anytime</p>
        </div>
      </section>

      {/* Contact Info Section */}
     <section className="py-20 px-6 md:px-10 bg-[#0b0b0b] text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
        {/* Location */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-[#1e1e1e] p-8 rounded-lg text-center hover:shadow-xl transition"
        >
          <FaMapMarkerAlt className="text-3xl mx-auto text-yellow-400" />
          <h3 className="text-xl mt-4 mb-2 font-semibold">Location</h3>
          <p className="text-yellow-400">123 Main Street, Tech City, India</p>
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-[#1e1e1e] p-8 rounded-lg text-center hover:shadow-xl transition"
        >
          <FaPhoneAlt className="text-3xl mx-auto text-yellow-400" />
          <h3 className="text-xl mt-4 mb-2 font-semibold">Call Us Anytime</h3>
          <p className="text-yellow-400">+91 9339913399</p>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-[#1e1e1e] p-8 rounded-lg text-center hover:shadow-xl transition"
        >
          <FaEnvelope className="text-3xl mx-auto text-yellow-400" />
          <h3 className="text-xl mt-4 mb-2 font-semibold">Send Us Email</h3>
          <p className="text-yellow-400">carbuddy@.co</p>
        </motion.div>
      </div>
    </section>
  

      {/* Contact Form Section */}
     <section className="bg-[#111111] py-20 px-6 md:px-10 text-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        
        {/* Right: Text Info - Comes first on mobile */}
        <div className="order-1 md:order-none">
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <span className="text-yellow-400">Talk to Us</span> – Because Your Car Deserves the Best!
          </motion.h2>

          <p className="text-gray-300 mb-6">
            Have a question about our car Cleaning services? Need expert advice on how to keep your vehicle looking its best?
            We’re here to assist you! Whether you want to book an appointment, get a quote, or simply learn more about our
            services, don’t hesitate to reach out.
          </p>

          <h3 className="text-xl font-semibold mb-3">Why Contact Us?</h3>

          <p className="text-gray-300 mb-4">
            Our expert car care keeps your vehicle spotless, gleaming, and fully protected, boosting both its appearance and performance.
          </p>

          <ul className="space-y-2 mb-6">
            {[
              "Professional Cleaning",
              "Experienced Team",
              "Easy & Fast Booking",
              "Customer First",
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <FaCheck className="text-yellow-400 w-4 h-4 mr-2" />
                {item}
              </li>
            ))}
          </ul>

          {/* Social Media Icons */}
          <div>
            <h4 className="font-semibold mb-2 flex gap-4">Follow Our Social Media :</h4>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, link: "https://www.facebook.com/" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/" },
                { icon: <FaXTwitter />, link: "https://twitter.com/" },
                { icon: <FaWhatsapp />, link: "https://wa.me/919876543210" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-[#1e1e1e] rounded flex items-center justify-center border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Left: Contact Form - Comes last on mobile */}
        <form onSubmit={handleSubmit} className="space-y-6 order-last md:order-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
             
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name here"
                  className="w-full p-4 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email here"
                  className="w-full p-4 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your number here"
                  className="w-full p-4 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Your subject here"
                  className="w-full p-4 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="9"
                placeholder="Tell us anything about your lovely car"
                className="w-full p-4 rounded bg-[#1e1e1e] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
            >
              Submit Now
            </button>
          </form>
      </div>
    </section>



      {/* Map Section */}
      <section className="w-full h-96">
        <iframe
          className="w-full h-full"
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.389664134884!2d73.91534917506523!3d18.555330582557347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c10d0d8d3c0f%3A0x71e18571c68cd55!2sPune%20University!5e0!3m2!1sen!2sin!4v1690900347051!5m2!1sen!2sin"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </section>
    </div>
  );
};

export default Contact;



