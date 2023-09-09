import React, { useRef, useState, useEffect, useCallback } from "react";
import Webcam from "react-webcam";
import { FilesetResolver, GestureRecognizer } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { HAND_CONNECTIONS } from "@mediapipe/hands";
import './HandTracking.css';

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
  const [displayedLetters, setDisplayedLetters] = useState([]);


  const predictWebcam = useCallback(() => {
    let nowInMs = Date.now();
    const results = gestureRecognizer.recognizeForVideo(webcamRef.current.video, nowInMs);
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //console.log(results);
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // Set video width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // Set canvas height and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    if (results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 5 });
        drawLandmarks(canvasCtx, landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }

    if (results.gestures.length > 0) {
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
  }, [webcamActive, gestureRecognizer, setDetectedLetter]);

  const animate = useCallback(() => {
    requestRef.current = requestAnimationFrame(animate);
    predictWebcam();
  }, [predictWebcam]);

  const enableCam = () => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (webcamActive == true) {
      setWebcamActive(false);
      cancelAnimationFrame(requestRef.current);
      

      // Remove empty values
      const nonEmptyData = detectedData.filter(
        (data) => data.SignDetected !== "" && data.DetectedScore !== ""
      );

      //to filter continous same signs in an array
      const resultArray = [];
      let current = nonEmptyData[0];

      for (let i = 1; i < nonEmptyData.length; i++) {
        if (nonEmptyData[i].SignDetected !== current.SignDetected) {
          resultArray.push(current);
          current = nonEmptyData[i];
        }
      }

      resultArray.push(current);

      //calculate count for each repeated sign
      const countMap = new Map();

      for (const item of resultArray) {
        const count = countMap.get(item.SignDetected) || 0;
        countMap.set(item.SignDetected, count + 1);
      }

      const sortedArray = Array.from(countMap.entries()).sort(
        (a, b) => b[1] - a[1]
      );

      const outputArray = sortedArray
        .slice(0, 5)
        .map(([sign, count]) => ({ SignDetected: sign, count }));
      console.log(outputArray);
      setDisplayedLetters(prevLetters => [...prevLetters, ...outputArray.map(item => item.SignDetected)]);


    } else {
      setWebcamActive(true);
      requestRef.current = requestAnimationFrame(animate);
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
    <div className="hand-tracking-container">
      <div style={{position : "relative"}}>
        <Webcam ref={webcamRef} className = "hand-tracking-webcam"/>
        <canvas ref={canvasRef} className = "hand-tracking-canvas"/>
        <div className="hand-tracking-info">Detected Letter: {detectedLetter}</div>
        {progress ? <div className="hand-tracking-info">Confidence: {progress}%</div> : null}
        <div className="hand-tracking-info">Detected Letters: {displayedLetters.join('')}</div>
        <button onClick={enableCam}>
          {webcamActive ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default WebcamPage;
