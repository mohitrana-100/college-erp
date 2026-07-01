import { useEffect, useState } from "react";
import API from "../api";

import DashboardCards from "../components/DashboardCards";
import DashboardCharts from "../components/DashboardCharts";
import DashboardHeader from "../components/DashboardHeader";
import LiveClock from "../components/LiveClock";
import RecentFiles from "../components/RecentFiles";
import RecentNotifications from "../components/RecentNotifications";
import WeatherWidget from "../components/WeatherWidget";
function Home({ user }) {

  const [notifications, setNotifications] = useState(0);

  const [data, setData] = useState({
    students: 0,
    teachers: 0,
    notices: 0,
    files: 0
  });

  const getStatistics = async () => {
    try {
      const res = await API.get("/statistics");

      setData({
        students: res.data.students || 0,
        teachers: res.data.teachers || 0,
        notices: res.data.notices || 0,
        files: res.data.files || 0
      });

    } catch (err) {
      console.log(err);
    }
  };

  const getNotificationCount = async () => {
    try {
      const res = await API.get("/notifications");

      setNotifications(res.data.length);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStatistics();
    getNotificationCount();
  }, []);

  const today = new Date();

  const greeting =
    today.getHours() < 12
      ? "Good Morning"
      : today.getHours() < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div className="home-page">
        

<LiveClock/>

      {/* Header */}
      <div className="dashboard-header">

        <h1>
          👋 {greeting}, {user.name}
        </h1>

        <p>
          📅 {today.toDateString()}
        </p>

        <p>
          🎓 Role : {user.role}
        </p>

        <p>
          🔔 Notifications : {notifications}
        </p>

      </div>

      {/* Charts Section */}
      <DashboardCharts data={data} />

      <br />

      {/* Statistics Cards */}
      <DashboardCards data={data} />

      <br />
      <div className="dashboard-widgets">



<WeatherWidget/>

</div>

      {/* Recent Upload Summary */}
      <div className="dashboard-section">

        <h2>📁 File Management Summary</h2>

        <div className="summary-grid">

          <div className="summary-card">
            <h3>🎓 Student Data</h3>
            <p>Uploaded & Managed</p>
          </div>

          <div className="summary-card">
            <h3>📝 Marks Files</h3>
            <p>Available</p>
          </div>

          <div className="summary-card">
            <h3>📋 Attendance Files</h3>
            <p>Available</p>
          </div>

          <div className="summary-card">
            <h3>📅 Timetable Files</h3>
            <p>Available</p>
          </div>

          <div className="summary-card">
            <h3>🏫 College Calendar</h3>
            <p>Available</p>
          </div>

        </div>

      </div>

      <br />

      {/* Quick Actions */}
      <div className="dashboard-section">

        <h2>⚡ Quick Actions</h2>

        <div className="quick-actions">

          <button className="action-btn">
            📁 Upload File
          </button>

          <button className="action-btn">
            🎓 Students
          </button>

          <button className="action-btn">
            📢 Notices
          </button>

          <button className="action-btn">
            📊 Reports
          </button>

        </div>

      </div>

    </div>
  );
}

export default Home;