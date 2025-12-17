import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";

const PlatformStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/statistics", {
        withCredentials: true,
      });
      setStats(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching statistics:", err);
      setError("Failed to fetch statistics.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  const ordersData = [
    { name: "Pending", value: stats.ordersPending },
    { name: "Delivered", value: stats.ordersDelivered },
  ];

  const COLORS = ["#FFBB28", "#00C49F"];


  const paymentsData = [
    { name: "Total Payments", amount: stats.totalPayments },
    { name: "Total Users", amount: stats.totalUsers },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Platform Statistics</h2>

     
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", marginBottom: "40px" }}>
        <div style={{ flex: "1 0 200px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px", textAlign: "center", backgroundColor: "#f5f5f5" }}>
          <h3>Total Payments</h3>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>${stats.totalPayments}</p>
        </div>
        <div style={{ flex: "1 0 200px", padding: "15px", border: "1px solid #ccc", borderRadius: "8px", textAlign: "center", backgroundColor: "#f5f5f5" }}>
          <h3>Total Users</h3>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>{stats.totalUsers}</p>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "50px" }}>
      
        <div>
          <h3 style={{ textAlign: "center" }}>Orders</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={ordersData}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {ordersData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        
        <div>
          <h3 style={{ textAlign: "center" }}>Payments & Users</h3>
          <BarChart width={300} height={300} data={paymentsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default PlatformStatistics;
