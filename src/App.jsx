import { useState, useEffect, useRef } from "react";
//import Toolbar from "./components/Toolbar.jsx";
import "./App.css";
import EmailButton from "./components/EmailButton.jsx";

import { Outlet, Link } from "react-router-dom";

const layers = [
  { src: "./ignite_1.webp", z: -1000, opacity: 0.5 },
  { src: "./ignite_2.webp", z: -500, opacity: 0.5 },
];

export default function App() {
  const lastRef = useRef(0);
  const [showComputer, setShowComputer] = useState(false);
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setShowComputer(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLayer((prev) => (prev === 0 ? 1 : 0));
    }, 3400);

    return () => clearInterval(interval);
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
    backgroundImage: "url('./ignite_bg.webp')",
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
                opacity: activeLayer === i ? l.opacity : 0,
                transition: "opacity 3s ease-in-out",
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
          <img
            src="./purple_blobby.png"
            className="z-[-500] translate-y-[700px]"
          />
          <span className="fixed opacity-10 top-0 right-0 w-[1000px] h-[1000px] z-[-750] opacity animate-[spin_40s_linear_infinite] translate-x-[-500px] translate-y-[-500px]">
            <img
              src="./flame_circle.png"
              className="w-full h-full object-contain"
            />
          </span>
        </div>

        {/* Title */}
        <div
          className="flex flex-row items-start"
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "100px",
            zIndex: 500,
          }}
        >
          <div className="flex flex-col">
            <img
              src="./ignite_no_outline.png"
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
                style={{ width: "100px", height: "auto" }}
                className="justify-center items-center text-center mt-10 bounce"
              />
            </div>

            <div className=" justify-center items-center text-center mt-24 computer-hover">
              <EmailButton />
            </div>
          </div>

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
        <div className="absolute bottom-[-900px] left-1/2 [transform:translateZ(200px)_translateX(-50%)] z-[500] flex flex-col items-center justify-center text-center gap-10">
          <div className="absolute -inset-10 bg-[salmon]/40 rounded-[10px] -z-10" />

          <div className="w-full max-w-7xl py-10 flex flex-col gap-4 mx-5 overflow-hidden">
            <p className="text-3xl font-semibold">Let's get started!</p>

            <div className="bg-blue-200 text-center rounded-xl p-5 max-w-lg w-full mx-auto">
              <p className="text-lg">1. Set up a coding app with your phone or use a code editor on a public computer.</p>
            </div>

            <div className="bg-blue-200 p-5 max-w-lg w-full text-center rounded-xl mx-auto">
              <p className="text-lg">2. Code a project of your choice (website, game, app, etc.). Track your time with Hackatime while doing so.</p>
            </div>

            <div className="bg-blue-200 p-5 max-w-lg w-full text-center rounded-xl mx-auto">
              <p className="text-lg">
                3. After 10 hours, submit your project! We'll review it and then ship you a personal computer!
              </p>
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
      </div>
    </>
  );
}
