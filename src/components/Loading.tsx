import React from "react";
import "./Loading.css";

export function Loading() {
  return (
    <div id="loading-screen">
      <div id="spinners">
        <div className="spinner-grow"></div>
        <div className="spinner-grow"></div>
        <div className="spinner-grow"></div>
      </div>
    </div>
  );
}