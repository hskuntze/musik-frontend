import { Route, Routes } from "react-router-dom";
import DashHome from "./DashHome";
import Spotify from "./Spotify";
import YouTube from "./YouTube";
import Sidebar from "../../components/Sidebar";
import "./styles.css";

const Dashboard = () => {
  return (
    <main className="dashboard-main">
      <Sidebar />
      <Routes>
        <Route path="/" element={<DashHome />} />
        <Route path="/spotify" element={<Spotify />} />
        <Route path="/youtube" element={<YouTube />} />
      </Routes>
    </main>
  );
};

export default Dashboard;
