import React from 'react';
import './App.css';
import Spline from "@splinetool/react-spline";

function App() {
  return (
    <div className="App">
      <Spline
        style={{
          width: "100vw",
          height: "100vh"
        }}
        scene={"https://prod.spline.design/cyaFi9uSHDHBGYVv/scene.splinecode"}
      />
    </div>
  );
}

export default App;
