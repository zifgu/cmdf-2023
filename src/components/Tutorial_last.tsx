import React from "react";
import "./Tutorial_last.css";
import {useNavigate} from "react-router-dom";

export function Tutorial_last(){
  const navigate = useNavigate();

  return (
    <div className='last-page'>
      <div style={{display: "flex", justifyContent: "center"}}>
        <img src="onboarding2.png" />
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
      }}>
        <div id="reminder">
          <h2>Reminder!</h2>
          This is not a substitute for professional mental health care, or crisis care. If you are experiencing a mental health crisis, please call emergency services or seek help from a qualified healthcare provider.
        </div>
        <button id="play-button" onClick={() => navigate("/game")}>PLAY!</button>
      </div>
    </div>
  );
}