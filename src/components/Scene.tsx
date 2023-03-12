import React, {useEffect, useRef, useState} from "react";
import {Loading} from "./Loading";
import Spline, {SPEObject} from "@splinetool/react-spline";
import * as THREE from 'three';
import "./Scene.css";
import {GiExitDoor} from "react-icons/gi";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {RiSunFoggyFill} from "react-icons/ri";
import {BsFillCloudRainFill, BsArrowRightShort} from "react-icons/bs";

const MAX_SCORE = 4;

export function Scene() {
  const navigate = useNavigate();
  const [thoughts, setThoughts] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(true);
  const [playerSpeaking, setPlayerSpeaking] = useState(false);
  const [latestPlayerInput, setLatestPlayerInput] = useState("");
  const [aiSpeaking, setAiSpeaking] = useState(true);
  const [aiSpeechContent, setAiSpeechContent] = useState("What's worrying you?");
  const [playerSpeechContent, setPlayerSpeechContent] = useState("");
  const [aiPosition, setAiPosition] = useState([0, 0]);
  const [playerPosition, setPlayerPosition] = useState([0, 0]);
  const [awaitingAi, setAwaitingAi] = useState(false);
  const [text, setText] = useState("");
  const player = useRef<SPEObject>();
  const ai = useRef<SPEObject>();
  const camera = useRef<any>();

  const [overlayOpen, setOverlayOpen] = useState(false);
  const [overlayPageNum, setOverlayPageNum] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const cohereRequest = async (belief: string) => {
    return await fetch("http://localhost:3001/reframe", {
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
    });
  };

  const askAi = async (belief: string, regenerate: boolean) => {
    if (regenerate) {
      setPlayerSpeechContent("Hmm, that doesn't fit me...");
    } else {
      setPlayerSpeechContent(belief);
    }
    setPlayerSpeaking(true);
    setAiSpeaking(false);
    setAwaitingAi(true);
    setAiSpeechContent("");

    cohereRequest(belief).then((result: any) => {
      console.log(result);
      const reframedBelief = result.result;
      setPlayerSpeaking(false);
      setAiSpeaking(true);
      setAwaitingAi(false);
      setPlayerSpeechContent("");

      setAiSpeechContent(reframedBelief);
      setThoughts({...thoughts, [belief]: reframedBelief});
    });
  };

  const onExit = () => {
    // console.log('test')
    axios
    .post('http://localhost:3001/', {
      phone: phoneNumber,
    })
    .then((response => {
      // console.log(response)
      console.log('Text reminder sent!')
    }))
    .catch(err => {
      console.log(err);
    });

    navigate("/home");
  };

  const awaitingPlayer = text.length > 0;

  return (
    <>
      {
        loading && <Loading />
      }
      {
        !loading &&
        <>
          {
            playerSpeaking && <SpeechBubble pos={playerPosition} content={playerSpeechContent}/>
          }
          {
            aiSpeaking && <SpeechBubble pos={aiPosition} content={aiSpeechContent}/>
          }
          {
            awaitingAi && <WaitingSpeechBubble pos={aiPosition}/>
          }
          {
            awaitingPlayer && <WaitingSpeechBubble pos={playerPosition}/>
          }
          <div id="speech-input-container">
            <input
              type="text"
              placeholder="Say what's on your mind..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="button"
              disabled={awaitingAi}
              onClick={async () => {
                const belief = text;
                setLatestPlayerInput(belief);
                setText("");
                await askAi(belief, false);
              }}
            >
              Chat
            </button>
            <button
              className="button"
              disabled={awaitingAi}
              onClick={async () => {
                await askAi(latestPlayerInput, true);
              }}
            >
              Pick another
            </button>
          </div>
          <div id="score-container">
            {/*Score: {Object.keys(thoughts).length}*/}
            <div id="scores-container">
              {
                Array.from(Array(MAX_SCORE).keys()).map((i) => (
                  <div className="score-icon-container">
                    {
                      i < Object.keys(thoughts).length ?
                        <RiSunFoggyFill size={30} className="sun"/> :
                        <BsFillCloudRainFill size={30} className="rain"/>
                    }
                  </div>
                ))
              }
            </div>
          </div>
          <button
            id="exit-button"
            className="button"
            onClick={() => setOverlayOpen(!overlayOpen)}
          >
            <GiExitDoor aria-label="Exit" size={22}/>
          </button>
          {
            overlayOpen &&
            <div id="overlay-container">
              <div id="overlay">
                <h2 style={{margin: 0}}>Thank you for playing</h2>
                {
                  overlayPageNum == 0 &&
                  <>
                    <div>
                      Congratulations on reflecting on {Object.keys(thoughts).length} thoughts!
                    </div>
                    <div>
                      Review the thoughts you've reframed:
                    </div>
                    <div className="thoughts-grid">
                      {
                        Object.keys(thoughts).map((originalThought) => (
                          <>
                            <div>{originalThought}</div>
                            <div><BsArrowRightShort size={25}/></div>
                            <div>{thoughts[originalThought]}</div>
                          </>
                        ))
                      }
                    </div>
                  </>
                }
                {
                  overlayPageNum == 1 &&
                  <>
                    <div>
                      Enter your phone number if you would like to receive a daily text reminder to play again!
                    </div>
                    <input
                      type="text"
                      className="input"
                      placeholder="(Optional) xxx-xxx-xxxx"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </>
                }
                <div id="overlay-buttons-container">
                  {
                    overlayPageNum === 0 &&
                    <>
                      <button className="button" onClick={() => setOverlayOpen(false)}>Go back</button>
                      <button className="button" onClick={() => setOverlayPageNum(overlayPageNum + 1)}>Next</button>
                    </>
                  }
                  {
                    overlayPageNum === 1 &&
                    <>
                      <button className="button" onClick={() => setOverlayPageNum(overlayPageNum - 1)}>Go back</button>
                      <button className="button" onClick={() => onExit()}>See you soon</button>
                    </>
                  }
                </div>
              </div>
            </div>
          }
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

function WaitingSpeechBubble({pos} : {pos: number[]}) {
  return (
    <div
      className="speech-bubble"
      style={{
        left: pos[0],
        bottom: pos[1],
      }}
    >
      <div id="spinners">
        <div className="spinner-grow sm"></div>
        <div className="spinner-grow sm"></div>
        <div className="spinner-grow sm"></div>
      </div>
    </div>
  );
}

function SpeechBubble({pos, content} : {pos: number[], content: string}) {
  return (
    <div
      className="speech-bubble"
      style={{
        left: pos[0],
        bottom: pos[1],
      }}
    >
      {content}
    </div>
  );
}
