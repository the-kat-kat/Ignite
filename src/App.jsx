import { useState, useEffect, useRef } from "react";
//import Toolbar from "./components/Toolbar.jsx";
import "./App.css";
import EmailButton from "./components/EmailButton.jsx";

import { Outlet, Link } from "react-router-dom";

const layers = [
  { src: "./ignite_1.png", z: -1000, opacity: 1 },
  { src: "./ignite_2.png", z: -500, opacity: 0.8 },
];

export default function App() {
  const lastRef = useRef(0);

  const [showComputer, setShowComputer] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowComputer(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleMove = (e) => {
    const now = performance.now();
    if (now - lastRef.current < 30) return;
    lastRef.current = now;

    const trail = document.createElement("div");
    trail.className = "cursor-trail";
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";

    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 300);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

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
    <>
      <div
        style={{ ...containerStyle }}
        className="bg-black w-full min-h-screen"
      >
        <div style={groupStyle}>
          {layers.map((l, i) => (
            <div
              key={i}
              style={{
                ...layerBase,
                transform: `translateZ(${l.z}px) translateY(${
                  -((l.z - Math.min(...layers.map((l) => l.z))) / 800) * 2 - 100
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
              transform: "translateZ(0px) translateY(600px) scale(3)",
              backgroundColor: "#24023F",
              top: "100%",
              height: "150vh",
              width: "100%",
              zIndex: -500,
            }}
          />
        </div>

        {/* Title */}
        <div
          className="flex flex-row items-start"
          style={{
            position: "absolute",
            bottom: "-300px",
            left: "100px",
            zIndex: 500,
          }}
        >
          <div className="flex flex-col">
            <img
              src="./ignite_text.png"
              alt="title"
              style={{ width: "600px", height: "auto" }}
              className="computer-hover"
            />

            <h1 className="text-3xl font-extrabold text-white">
              Code for 10 hours, earn your own personal computer!
            </h1>

            <div className="flex justify-center mt-10">
              <img
                src="./down.png"
                alt="down"
                style={{ width: "200px", height: "auto" }}
                className="justify-center items-center text-center mt-10"
              />
            </div>

            <div className=" justify-center items-center text-center mt-24">
              <EmailButton />
            </div>
          </div>

          <span
            className="absolute w-4 h-4 rounded-full"
            style={{
              transformOrigin: "50% 50%",
              animation: "spin 10s linear infinite",
            }}
          >
            heloooo
          </span>

          <img
            src="./computer.png"
            alt="computer"
            className={`computer-hover object-contain transform transition-opacity duration-[100000ms] ease-in-out ${
              showComputer
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{ width: "700px", height: "auto" }}
          />
        </div>

        {/* Instructions */}
        <div
          style={{
            position: "absolute",
            bottom: "-900px",
            left: "267px",
            transform: `translateZ(200px)`,
            zIndex: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-left",
            gap: "40px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-40px",
              backgroundColor: "salmon",
              borderRadius: "10px",
              zIndex: -1,
            }}
          />
          <div className="overflow-hidden w-full py-10 max-w-5xl">
            <div className="flex flex-col gap-4 mx-5">
              <p>How it works</p>
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

        {/* HC on top */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: "50px",
            width: "50vw",
            height: "50vh",
            zIndex: 10,
            pointerEvents: "none",
          }}
          className="min-h-screen flex flex-col items-center justify-center text-center px-4"
        >
          <a
            href="https://hackclub.com"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 left-2"
          >
            <img
              src="https://assets.hackclub.com/flag-orpheus-top.svg"
              alt="Hack Club"
              style={{ pointerEvents: "auto" }}
              className="computer-hover w-48"
            />
          </a>
        </div>
        <div className="bg-lightBlue text-white p-10 text-4xl">
          Tailwind test
        </div>
      </div>
    </>
  );
}
