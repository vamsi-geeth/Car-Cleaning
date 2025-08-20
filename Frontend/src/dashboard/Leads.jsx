// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AdminSidebar from "./AdminSidebar";

// const Leads = () => {
//   const [leads, setLeads] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: ""
//   });

//   // Fetch Leads
//   useEffect(() => {
//     fetchLeads();
//   }, []);

//   const fetchLeads = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/leads");
//       setLeads(res.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Delete Lead
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this lead?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/leads/${id}`);
//       setLeads(leads.filter((lead) => lead._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Edit Lead
//   const handleEdit = (lead) => {
//     setEditingId(lead._id);
//     setFormData({
//       name: lead.name,
//       email: lead.email,
//       phone: lead.phone,
//       subject: lead.subject,
//       message: lead.message
//     });
//   };

//   // Update Lead
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/leads/${editingId}`, formData);
//       setEditingId(null);
//       setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
//       fetchLeads();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-black text-white">
//       <AdminSidebar />

//       {/* Main content */}
//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-6"><span className="text-[#FFD700]">Leads</span></h1>
//         {/* <h1 className="text-2xl font-bold mb-6 text-yellow-400">Leads</h1> */}

//         {/* Edit Form */}
//         {editingId && (
//           <form
//             onSubmit={handleUpdate}
//             className="bg-[#1a1a1a] p-4 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
//           >
//             <input
//               type="text"
//               placeholder="Name"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="p-2 rounded bg-gray-800 text-white"
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//               className="p-2 rounded bg-gray-800 text-white"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Phone"
//               value={formData.phone}
//               onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//               className="p-2 rounded bg-gray-800 text-white"
//             />
//             <input
//               type="text"
//               placeholder="Subject"
//               value={formData.subject}
//               onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
//               className="p-2 rounded bg-gray-800 text-white"
//             />
//             <textarea
//               placeholder="Message"
//               value={formData.message}
//               onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//               className="p-2 rounded bg-gray-800 text-white md:col-span-2"
//             ></textarea>
//             <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white">
//               Update Lead
//             </button>
//           </form>
//         )}

//         {/* Leads Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-[#1a1a1a] rounded">
//             <thead className="bg-gray-800 text-gray-400">
//               <tr>
//                 <th className="px-4 py-2 text-left">Name</th>
//                 <th className="px-4 py-2 text-left">Email</th>
//                 <th className="px-4 py-2 text-left">Phone</th>
//                 <th className="px-4 py-2 text-left">Subject</th>
//                 <th className="px-4 py-2 text-left">Message</th>
//                 <th className="px-4 py-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {leads.map((lead) => (
//                 <tr key={lead._id} className="border-b border-gray-700">
//                   <td className="px-4 py-2">{lead.name}</td>
//                   <td className="px-4 py-2">{lead.email}</td>
//                   <td className="px-4 py-2">{lead.phone}</td>
//                   <td className="px-4 py-2">{lead.subject}</td>
//                   <td className="px-4 py-2">{lead.message}</td>
//                   <td className="px-4 py-2 space-x-2">
//                     <button
//                       className="bg-yellow-500 px-3 py-1 rounded text-black"
//                       onClick={() => handleEdit(lead)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-600 px-3 py-1 rounded text-white"
//                       onClick={() => handleDelete(lead._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {leads.length === 0 && (
//                 <tr>
//                   <td colSpan="6" className="text-center text-gray-400 py-4">
//                     No leads found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Leads;






import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import {
  useGetLeadsQuery,
  useDeleteLeadMutation,
  useUpdateLeadMutation,
} from "../services/apiService";

const Leads = () => {
  const { data: leads = [], isLoading, isError, refetch } = useGetLeadsQuery();
  const [deleteLead] = useDeleteLeadMutation();
  const [updateLead] = useUpdateLeadMutation();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // Delete Lead
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead?")) return;
    try {
      await deleteLead(id).unwrap();
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  // Edit Lead
  const handleEdit = (lead) => {
    setEditingId(lead._id);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      subject: lead.subject,
      message: lead.message,
    });
  };

  // Update Lead
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateLead({ id: editingId, ...formData }).unwrap();
      setEditingId(null);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error updating lead:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-black text-white">
        <AdminSidebar />
        <main className="flex-1 p-8">Loading leads...</main>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen bg-black text-white">
        <AdminSidebar />
        <main className="flex-1 p-8">Error loading leads.</main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />

      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-[#FFD700]">Leads</span>
        </h1>

        {/* Edit Form */}
        {editingId && (
          <form
            onSubmit={handleUpdate}
            className="bg-[#1a1a1a] p-4 rounded mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
              required
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white"
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="p-2 rounded bg-gray-800 text-white md:col-span-2"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 px-4 py-2 rounded text-white"
            >
              Update Lead
            </button>
          </form>
        )}

        {/* Leads Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1a1a1a] rounded">
            <thead className="bg-gray-800 text-gray-400">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-gray-700">
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.email}</td>
                  <td className="px-4 py-2">{lead.phone}</td>
                  <td className="px-4 py-2">{lead.subject}</td>
                  <td className="px-4 py-2">{lead.message}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      className="bg-yellow-500 px-3 py-1 rounded text-black"
                      onClick={() => handleEdit(lead)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 px-3 py-1 rounded text-white"
                      onClick={() => handleDelete(lead._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-400 py-4">
                    No leads found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Leads;
