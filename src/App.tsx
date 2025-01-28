import "./styles/index.css";
import Navbar from "./components/navbar"; // Import Navbar
import Home from "./components/home"; // Import Home component
import Info from "./components/info";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar /> {/* Always visible at the top */}
      <Home /> {/* Main Home section */}
      <Info /> {/* Info section */}
    </div>
  );
}

export default App;
