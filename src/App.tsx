import "./styles/index.css";
import Navbar from "./components/navbar";
import Home from "./components/home";
import Info from "./components/info";
import Work from "./components/work";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Home />
      <Info />
      <Work />
    </div>
  );
}

export default App;
