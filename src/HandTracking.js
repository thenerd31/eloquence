import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";

const WebcamPage = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [detectedLetter, setDetectedLetter] = useState("");
  const requestRef = useRef();
  const [runningMode, setRunningMode] = useState("VIDEO");
  const [detectedData, setDetectedData] = useState([]);
  const [progress, setProgress] = useState(0);

  const predictWebcam = useCallback(() => {
    let nowInMs = Date.now();
    const results = gestureRecognizer.recognizeForVideo(webcamRef.current.video, nowInMs);
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    console.log(results);
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    if (results.landmarks && results.landmarks.length > 0) {
      for (const landmarks of results.landmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 5 });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }

    if (results.gestures && results.gestures.length > 0) {
      setDetectedData((prevData) => [
        ...prevData,
        {
          SignDetected: results.gestures[0][0].categoryName,
        },
      ]);
      setDetectedLetter(results.gestures[0][0].categoryName);
      setProgress(Math.round(parseFloat(results.gestures[0][0].score) * 100));
    } else {
      setDetectedLetter("");
      setProgress(0);
    }

    if (webcamActive) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [webcamActive, gestureRecognizer]);

  const enableCam = () => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (webcamActive) {
      setWebcamActive(false);
      cancelAnimationFrame(requestRef.current);
    } else {
      setWebcamActive(true);
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  };

  useEffect(() => {
    async function loadGestureRecognizer() {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.4/wasm"
      );
      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://handtrackingmodel31.s3.us-west-1.amazonaws.com/sign_language_recognizer_25-04-2023.task"
        },
        numHands: 2,
        runningMode: runningMode
      });
      setGestureRecognizer(recognizer);
    }
    loadGestureRecognizer();
  }, []);

  return (
    <div className="App">
      <h1>ASL Translation</h1>
      <Webcam ref={webcamRef} />
      <canvas ref={canvasRef} />
      <div>Detected Letter: {detectedLetter}</div>
      {progress ? <div>Confidence: {progress}%</div> : null}
      <button onClick={enableCam}>
        {webcamActive ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default WebcamPage;
