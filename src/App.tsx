import React, {useState} from 'react';
import './App.css';
import Spline from "@splinetool/react-spline";

export function Onboarding() {
  return (
    <div>Onboarding</div>
  );
}

export function Scene() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {
        loading && <Loading />
      }
      <Spline
        style={{
          width: "100vw",
          height: "100vh"
        }}
        scene={"https://prod.spline.design/cyaFi9uSHDHBGYVv/scene.splinecode"}
        onLoad={(e) => {
          if (e.data) {
            setLoading(false);
          }
        }}
      />
    </>
  );
}

function Loading() {
  return (
    <div>
      Loading...
    </div>
  );
}

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;
