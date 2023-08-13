import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { drawRect } from "./utilities";
import { CSSTransition } from 'react-transition-group';
import './App.css';
import fetch from "node-fetch";
import { Helmet } from 'react-helmet';


const WebcamPage = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null); // Ref for canvas context
  const [webcamActive, setWebcamActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [detectedLetters, setDetectedLetters] = useState([])
  const [displayText, setDisplayText] = useState('');

  const startWebcam = () => {
    setWebcamActive(true);
  };

  const stopWebcam = () => {
    clearInterval(intervalId);
    setWebcamActive(false);

    // Clear the canvas when the webcam is stopped
    if (ctxRef.current) {
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    setDetectedLetters([]);
    setDisplayText('');
  };

  const fetchSegmentedWords = async (letters) => {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: letters.join(''),
    };

    try {
      const response = await fetch('http://localhost:3000/word-segmentation', options);
      const data = await response.json();
      setDisplayText(prevDisplayText => prevDisplayText + ' ' + data.result.segmentedString);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (detectedLetters.length && detectedLetters.length % 10 === 0) {
      fetchSegmentedWords(detectedLetters.slice(-10));
      setDetectedLetters([]);
    } else {
      setDisplayText(prevDisplayText => prevDisplayText + detectedLetters.join(''));
    }
  }, [detectedLetters]);

  useEffect(() => {
    let net = null; // Define the 'net' variable
    const runCoco = async () => {
      net = await tf.loadGraphModel(
        "https://tensorflowrealtimejsmodel31.s3.us-east.cloud-object-storage.appdomain.cloud/model.json"
      );

      const id = setInterval(() => {
        detect(net);
      }, 10000);
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

        const videoWidth = video.videoWidth;
        const videoHeight = video.videoHeight;

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

        const ctx = ctxRef.current;
        if (ctx) {
          const identifiedLetter = drawRect(boxes[0], classes[0], scores[0], 0.8, videoWidth, videoHeight, ctx);
          if (identifiedLetter) {
            setDetectedLetters(prevLetters => [...prevLetters, identifiedLetter]);
          }
        }

        tf.dispose(img);
        tf.dispose(resized);
        tf.dispose(casted);
        tf.dispose(expanded);
        tf.dispose(obj);
      }
    };

    if (webcamActive) {
      const ctx = canvasRef.current.getContext("2d");
      ctxRef.current = ctx; // Assign canvas context to the ref
      runCoco();
    } else {
      clearInterval(intervalId);
    }
  }, [webcamActive, intervalId]);

  return (
    <div className="App">
      <Helmet>
        <title>Our Solution - Eloquence</title>
        <meta name="description" content="Try out Eloquence's real-time letter detection system using machine learning to recognize and translate hand signs into segmented words." />
        <meta name="keywords" content="Eloquence, sign language, object detection, machine learning, real-time, AI" />
        <meta property="og:title" content="Our Solution - Eloquence" />
        <meta property="og:description" content="Try out Eloquence's real-time letter detection system using machine learning to recognize and translate hand signs into segmented words." />
        {/* Add the Open Graph image if available */}
      </Helmet>
      <h1 style={{
        backgroundColor: "black",
        color: "white",
        fontFamily: "'Montserrat', sans-serif",
        lineHeight: "1.5",
        fontSize: "2.5rem",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        Our Solution
      </h1>

      <div className="testing-details">
        <h2>Try out our machine learning model:</h2>
        <p>Follow the instructions to test our real-time letter detection system:</p>
        <ul>
          <li>Click "Activate Webcam" to start.</li>
          <li>Position your hand to sign letters within the view.</li>
          <li>The detected letters and segmented words will appear below.</li>
          <li>Click "Stop Webcam" to end the session.</li>
        </ul>
      </div>
      <header className={`App-header ${webcamActive ? "webcam-active-header" : ""}`}>
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
        <CSSTransition
          in={webcamActive}
          timeout={300}
          classNames="webcam"
          unmountOnExit
        >
          <Webcam
            ref={webcamRef}
            muted={true}
            className="webcam-active"
            width={640}
            height={480}
          />
        </CSSTransition>
        <CSSTransition
          in={webcamActive}
          timeout={300}
          classNames="canvas"
          unmountOnExit
        >
          <canvas
            ref={canvasRef}
            className={`webcam-active-canvas`}
          />
        </CSSTransition>
        <CSSTransition
          in={webcamActive}
          timeout={300}
          classNames="detected-letters"
          unmountOnExit
        >
          <div className={`segmented-words ${webcamActive ? "words-active" : ""}`}>
            <h2>Segmented Words:</h2>
            {displayText}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default WebcamPage;
