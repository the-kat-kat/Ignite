import { useState, useEffect } from "react";
//import Toolbar from "./components/Toolbar.jsx";
import "./App.css";
//import EmailButton from "./components/EmailButton.jsx";

import { Outlet, Link } from "react-router-dom";

const layers = [
  { src: "./ignite_1.png", z: -1000, opacity: 1 },
  { src: "./ignite_2.png", z: 0, opacity: 1 },
];

export default function App() {
  const containerStyle = {
    perspective: "1000px",
    perspectiveOrigin: "50% 50%",
    height: "100vh",
    overflowY: "auto",
    overflowX: "hidden",
    backgroundImage: "url('./ignite_bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const groupStyle = {
    transformStyle: "preserve-3d",
    position: "relative",
    height: "250vh",
  };

  const layerBase = {
    position: "absolute",
    inset: 0,
    transformOrigin: "center center",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
  };

  const imgStyle = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "contain",
  };

  return (
    <div style={{ ...containerStyle }} className="w-full min-h-screen">
      <div style={groupStyle}>
        {layers.map((l, i) => (
          <div
            key={i}
            style={{
              ...layerBase,
              transform: `translateZ(${l.z}px) translateY(${
                -((l.z - Math.min(...layers.map((l) => l.z))) / 80) * 2 - 300
              }px) scale(${1.4 + Math.abs(l.z) / 800})`,
              zIndex: 10 + i,
              opacity: l.opacity,
            }}
          >
            <img
              src={l.src}
              alt={`layer-${i}`}
              style={imgStyle}
              className="transform scale-75 sm:scale-90 md:scale-100 lg:scale-110 xl:scale-125"
            />
          </div>
        ))}
        <div
          style={{
            ...layerBase,
            transform: "translateZ(0px) translateY(-100px) scale(2)",
            backgroundColor: "#24023F",
            top: "100%",
            height: "150vh",
            width: "100%",
            zIndex: 0,
          }}
        />
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          bottom: "100px",
          left: "220px",
          transform: `translateZ(200px)`,
          zIndex: 500,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: "-40px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <img
            src="./ignite_text.png"
            alt="title"
            style={{ width: "500px", height: "auto" }}
          />

          <h1 className="text-6xl font-extrabold text-white">
            Code for 10 hours, earn your own personal computer!
          </h1>
        </div>

        <img
          src="./computer.png"
          alt="computer"
          className="computer-hover"
          style={{ width: "500px", height: "auto" }}
        />
      </div>

      {/* Instructions */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          left: "250px",
          transform: `translateZ(200px)`,
          zIndex: 500,
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: "40px",
        }}
      >
        <div className="overflow-hidden w-full py-10 max-w-5xl">
          <div className="flex flex-wrap justify-center gap-8 mx-5">
            <div className="bg-blue-200 text-center rounded-xl">
              <p>1. draw and design your character + backgrounds!</p>
            </div>
            <div className="bg-blue-200 p-5 max-w-sm text-center rounded-xl">
              <p>2. code your game - make it playable on the device!</p>
            </div>
            <div className="bg-blue-200 p-5 max-w-sm text-center rounded-xl">
              <p>
                3. submit your game + wait for the console to arrive in mail!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: "50px",
          width: "100vw",
          height: "100vh",
          zIndex: 10,
        }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <a
          href="https://hackclub.com"
          target="_blank"
          rel="noopenner noreferrer"
        >
          <img
            src="https://assets.hackclub.com/flag-orpheus-top.svg"
            className="absolute top-0 left-2"
            alt="Hack Club"
          />
        </a>
      </div>
    </div>
  );
}
