import React, {useState} from "react";
import {Loading} from "./Loading";
import Spline from "@splinetool/react-spline";

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
