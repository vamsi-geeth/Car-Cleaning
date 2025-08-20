import AdminSidebar from "./AdminSidebar";
import { useGetAllOrdersQuery, useGetCustomersQuery, useGetLeadsQuery } from "../services/apiService";

const AdminDashboard = () => {
const { data: orders = [], ordersLoading, ordersError } = useGetAllOrdersQuery();
 const { data: customers = [], customersLoading ,customersError} = useGetCustomersQuery();
 const {data:leads=[],leadsLoading,leadsError}=useGetLeadsQuery();
  return (
    <div className="flex min-h-screen bg-[#0f0f0f] text-white font-sans">
      
    <AdminSidebar/>
      {/* Main content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          Admin <span className="text-[#FFD700]">Dashboard</span>
        </h1>
        

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         
           <div className="bg-[#1a1a1a] p-6 rounded-xl shadow text-center">
            <h4 className="text-gray-400">Total Orders</h4>
            <p className="text-2xl font-bold text-[#FFD700]">
              {ordersLoading ? "Loading..." : ordersError ? "Error" : orders.length}
            </p>
          </div>

          {/* The rest of the cards can be static or made dynamic */}
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow text-center">
            <h4 className="text-gray-400">Revenue</h4>
            <p className="text-2xl font-bold text-[#FFD700]">₹ 705</p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow text-center">
            <h4 className="text-gray-400">Customers</h4>
             <p className="text-2xl font-bold text-[#FFD700]">
              {customersLoading ? "Loading..." : customersError ? "Error" : customers.length}
            </p>
          </div>
          <div className="bg-[#1a1a1a] p-6 rounded-xl shadow text-center">
            <h4 className="text-gray-400">Leads</h4>
            <p className="text-2xl font-bold text-[#FFD700]">
              {leadsLoading ? "Loading..." : leadsError ? "Error" : leads.length}
            </p>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-[#1a1a1a] p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Latest Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-gray-400 border-b border-gray-600">
                <tr>
                  <th className="py-2 px-4">Purchase ID</th>
                  <th className="py-2 px-4">Buyer Name</th>
                  <th className="py-2 px-4">Invoice</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">Method</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "#TZ2540",
                    name: "Michael Miner",
                    invoice: "IN-4563",
                    date: "07 Jan, 2023",
                    amount: "$45,842",
                    method: "Mastercard",
                    status: "Completed",
                  },
                  {
                    id: "#TZ3924",
                    name: "Theresa Brose",
                    invoice: "IN-3728",
                    date: "03 Dec, 2023",
                    amount: "$78,483",
                    method: "Visa",
                    status: "Cancelled",
                  },
                ].map((tx, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="py-2 px-4">{tx.id}</td>
                    <td className="py-2 px-4">{tx.name}</td>
                    <td className="py-2 px-4">{tx.invoice}</td>
                    <td className="py-2 px-4">{tx.date}</td>
                    <td className="py-2 px-4">{tx.amount}</td>
                    <td className="py-2 px-4">{tx.method}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          tx.status === "Completed"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
