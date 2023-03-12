import React, {useEffect, useRef, useState} from "react";
import {Loading} from "./Loading";
import Spline, {SPEObject} from "@splinetool/react-spline";
import * as THREE from 'three';
import "./Scene.css";

export function Scene() {
  const [loading, setLoading] = useState(true);
  const [playerSpeaking, setPlayerSpeaking] = useState(false);
  const [speechContent, setSpeechContent] = useState("What's worrying you?");
  const [speechPosition, setSpeechPosition] = useState([0, 0]);
  const [text, setText] = useState("");
  const player = useRef<SPEObject>();
  const ai = useRef<SPEObject>();
  const camera = useRef<any>();

  useEffect(() => {
    const object = playerSpeaking ? player.current : ai.current;
    if (object) {
      const objectPosition = new THREE.Vector3(object.position.x, object.position.y, object.position.z);

      const projectedPosition = objectPosition.project(camera.current).addScalar(1).divideScalar(2);

      const screenPositionX = projectedPosition.x * camera.current.width;
      const screenPositionY = projectedPosition.y * camera.current.height;

      setSpeechPosition([screenPositionX, screenPositionY]);
    }
  });

  const askAi = async () => {
    const belief = text;
    setPlayerSpeaking(true);
    setSpeechContent(belief);
    setText("");

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
    });
  };

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
          <div id="speech-input-container">
            <input
              type="text"
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
