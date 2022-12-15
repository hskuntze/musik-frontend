import "./assets/styles/custom.scss";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";

function App() {

  return (
    <>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
