import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      {/* Logos Section */}
      <div className="flex gap-6">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-24 w-24" alt="React logo" />
        </a>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mt-6">Vite + React</h1>

      {/* Counter Section */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-all"
        >
          Count is {count}
        </button>
        <p className="mt-2 text-gray-400">
          Edit <code className="text-green-400">src/App.tsx</code> and save to
          test HMR
        </p>
      </div>

      {/* Footer */}
      <p className="mt-6 text-gray-400 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
