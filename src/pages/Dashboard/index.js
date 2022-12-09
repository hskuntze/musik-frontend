import { Route, Routes } from "react-router-dom";
import Spotify from "./Spotify";
import YouTube from "./YouTube";
import "./styles.css";
import Sidebar from "../../components/Sidebar";

const Dashboard = () => {
  return (
    <main className="dashboard-main">
      <Sidebar />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/spotify" element={<Spotify />} />
        <Route path="/youtube" element={<YouTube />} />
      </Routes>
    </main>
  );
};

export default Dashboard;
