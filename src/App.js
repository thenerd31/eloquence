import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";
import "./App.css";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [webcamActive, setWebcamActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startWebcam = () => {
    setWebcamActive(true);
  };

  const stopWebcam = () => {
    clearInterval(intervalId);
    setWebcamActive(false);

    // Clear the canvas when the webcam is stopped
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const runCoco = async () => {
    const net = await tf.loadGraphModel(
      "https://tensorflowrealtimejsmodel31.s3.us-east.cloud-object-storage.appdomain.cloud/model.json"
    );

    const id = setInterval(() => {
      detect(net);
    }, 16.7);
    setIntervalId(id);
  };

  const detect = async (net) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 &&
      canvasRef.current
    ) {
      const video = webcamRef.current.video;
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        webcamRef.current.video.width = 640;
        webcamRef.current.video.height = 480;
      }

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [640, 480]);
      const casted = resized.cast("int32");
      const expanded = casted.expandDims(0);
      const obj = await net.executeAsync(expanded);

      const boxes = await obj[2].array();
      const classes = await obj[1].array();
      const scores = await obj[7].array();

      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(() => {
        drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx);
      });

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
    }
  };

  useEffect(() => {
    if (webcamActive) {
      runCoco();
    } else {
      clearInterval(intervalId);
    }
  }, [webcamActive]);

  return (
    <div className="App">
      <header className={`App-header ${webcamActive ? "webcam-active-header" : ""}`}>
        <div className="app-name">
          <h1>
            Eloquent <span role="img" aria-label="sign-language">🤟</span>
          </h1>
        </div>
        {webcamActive ? (
          <button onClick={stopWebcam} className="activate-button">
            Stop Webcam
          </button>
        ) : (
          <button onClick={startWebcam} className="activate-button">
            Activate Webcam
          </button>
        )}
      </header>
      <div className="webcam-container">
        {webcamActive && (
          <Webcam
            ref={webcamRef}
            muted={true}
            className="webcam-active"
            width={640}
            height={480}
          />
        )}
      </div>
      {webcamActive && (
        <canvas ref={canvasRef} className={`webcam-active-canvas ${webcamActive ? "webcam-active" : ""}`} />
      )}
    </div>
  );
}

export default App;
