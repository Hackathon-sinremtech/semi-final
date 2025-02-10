import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto"; // Manually manage chart instances
import { demoData } from "../../data/demoData";
import StatsCard from "../../components/admin/StatsCard";
import supabase from "../../config/supabase";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        return;
      }

      if (session.user.email === "admin123@gmail.com") {
        console.log("Hi")
      }else {
        navigate('/')
        alert("You are not authorised to see this page")
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: demoData.dashboard.chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [demoData.dashboard.chartData]);

  return (
    <div className=" flex flex-col p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {demoData.dashboard.stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg flex-grow">
        <h3 className="text-xl font-semibold mb-6">Appointments Trend</h3>
        <div className="h-[395px]"> {/* Increased Chart Height */}
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
