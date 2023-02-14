import React from "react";
import "./App.css";
import GardenGrid from "./components/GardenGrid";
import Options from "./components/Options";
import { GardenProvider } from "./Context/GardenContext";

function App() {
  return (
    <GardenProvider>
      <div className="app">
        <Options />
        <div className="app__body">
          <GardenGrid />
        </div>
      </div>
    </GardenProvider>
  );
}

export default App;
