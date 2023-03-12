import React from "react";
import "./Tutorial_last.css";

export function Tutorial_last(){
  return (
    <div className='last-page'>
      <div>
        <img src="onboarding.png" />
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
        <button id="play-button">PLAY!</button>
      </div>
    </div>
  );
}