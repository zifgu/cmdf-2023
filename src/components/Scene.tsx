import React, {useEffect, useRef, useState} from "react";
import {Loading} from "./Loading";
import Spline, {SPEObject} from "@splinetool/react-spline";
import * as THREE from 'three';
import "./Scene.css";

export function Scene() {
  const [loading, setLoading] = useState(true);
  const [playerSpeaking, setPlayerSpeaking] = useState(false);
  const [speechContent, setSpeechContent] = useState("What's worrying you?");
  const [aiPosition, setAiPosition] = useState([0, 0]);
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [awaitingAi, setAwaitingAi] = useState(false);
  const [text, setText] = useState("");
  const player = useRef<SPEObject>();
  const ai = useRef<SPEObject>();
  const camera = useRef<any>();

  const calculateScreenPosition = (object: SPEObject) => {
    const objectPosition = new THREE.Vector3(object.position.x, object.position.y, object.position.z);
    const projectedPosition = objectPosition.project(camera.current).addScalar(1).divideScalar(2);

    const screenPositionX = projectedPosition.x * camera.current.width;
    const screenPositionY = projectedPosition.y * camera.current.height;

    return [screenPositionX, screenPositionY];
  }

  useEffect(() => {
    if (player.current) {
      setPlayerPosition(calculateScreenPosition(player.current));
    }
    if (ai.current) {
      setAiPosition(calculateScreenPosition(ai.current));
    }
  });

  const askAi = async () => {
    const belief = text;
    setPlayerSpeaking(true);
    setSpeechContent(belief);
    setText("");
    setAwaitingAi(true);

    fetch("http://localhost:3001/reframe", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: belief,
      }),
    }).then((response) => {
      return response.json();
    }).then((result) => {
      console.log(result.result);
      setPlayerSpeaking(false);
      setSpeechContent(result.result);
      setAwaitingAi(false);
    });
  };

  const speechPosition = playerSpeaking ? playerPosition : aiPosition;

  const waitPosition = awaitingAi ? aiPosition : (text.length > 0 ? playerPosition : null);

  return (
    <>
      {
        loading && <Loading />
      }
      {
        !loading &&
        <>
          <div
            className="speech-bubble"
            style={{
              left: speechPosition[0],
              bottom: speechPosition[1],
            }}
          >
            {speechContent}
          </div>
          {
            waitPosition &&
            <div
              className="speech-bubble"
              style={{
                left: waitPosition[0],
                bottom: waitPosition[1],
              }}
            >
              <div id="spinners">
                <div className="spinner-grow sm"></div>
                <div className="spinner-grow sm"></div>
                <div className="spinner-grow sm"></div>
              </div>
            </div>
          }
          <div id="speech-input-container">
            <input
              type="text"
              placeholder="say what's on your mind..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              disabled={playerSpeaking}
              onClick={askAi}
            >
              Say
            </button>
          </div>
        </>
      }
      <Spline
        style={{
          width: "100vw",
          height: "100vh"
        }}
        scene={"https://prod.spline.design/NKosVjMViAhWyz-U/scene.splinecode"}
        onLoad={(spline) => {
          if (spline.data) {
            setLoading(false);

            player.current = spline.findObjectById("85dcef4e-2c5f-4631-a185-50ee22b065ce");
            ai.current = spline.findObjectById("b914fcb4-fedb-4dd2-9989-1ceb12f2ac30");

            // @ts-ignore
            camera.current = spline._scene.activeCamera;
          }
        }}
      />
    </>
  );
}
