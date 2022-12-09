import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/dash/*" element={<Dashboard />} />
      </Switch>
    </Router>
  );
};

export default Routes;
