import { useState, useEffect, useRef } from "react";
//import Toolbar from "./components/Toolbar.jsx";
import "./App.css";
import EmailButton from "./components/EmailButton.jsx";
import UserTag from "./components/ui/UserTag";
import { Box } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/Accordian.jsx";

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
    overflowX: "hidden",
  };

  const groupStyle = {
    transformStyle: "preserve-3d",
    position: "relative",
    height: window.innerWidth < 768 ? "100vh" : "100vh",
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
        className="fixed inset-0 z-[-1000]"
        style={{
          backgroundImage: "url('./ignite_bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div style={{ ...containerStyle }} className="w-full min-h-screen">
        {/*top paralax*/}
        <div style={groupStyle}>
          {layers.map((l, i) => (
            <div
              key={i}
              style={{
                ...layerBase,
                transform: `translateZ(-500px) translateY(${
                  (500 / 800) * 2 - 450
                }px) scale(${1.7})`,
                zIndex: 10 + i,
                opacity: activeLayer === i ? l.opacity : 0,
                transition: "opacity 3s ease-in-out",
              }}
            >
              <img
                src={l.src}
                alt={`layer-${i}`}
                style={imgStyle}
                className=" transform scale-250 sm:scale-200 md:scale-125 lg:scale-150"
              />
            </div>
          ))}
          <img
            src="./white_border.png"
            className="absolute top-0 left-0 w-full z-[-100]"
          />
          <span className="fixed opacity-20 top-0 right-0 scale-200 z-[-750] opacity animate-[spin_40s_linear_infinite] translate-x-[-500px] translate-y-[-500px]">
            <img
              src="./flame_circle.png"
              className="w-full h-full object-contain"
            />
          </span>
          <div className="absolute overflow-hidden h-[200vh] mt-[-200px] left-0 w-full z-[-300] opacity-70 backdrop-blur-md" />
        </div>

        {/* middle paralax */}
        <section className="relative w-full h-[140vh]">
          <div className="absolute top-[700px] left-0 w-full -z-20 pointer-events-none">
            {layers.map((l, i) => (
              <img
                key={i}
                src={l.src}
                alt={`layer-middle-${i}`}
                className="absolute left-1/2 -translate-x-1/2 scale-200 opacity-50"
              />
            ))}
          </div>
          <div className="absolute inset-0 z-0 bottom-[-545px] backdrop-blur-md opacity-70 pointer-events-none" />

          <img
            src="./blob.png"
            alt="blobby"
            className="absolute bottom-[58vh] left-1/2 -translate-x-1/2 scale-x-[300]  z-0 pointer-events-none"
          />
        </section>

        <div className="relative w-full"></div>
        {/* Top */}
        <div className="w-full flex flex-col md:flex-row items-center justify-center px-4 fixed top-[100px] md:top-[140px] left-0 z-50">
          {/* Title + Email */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="./ignite_no_outline.png"
              alt="title"
              className="w-2/3 sm:w-2/3 md:w-[600px] mx-auto md:mx-0"
            />
            <h1 className="w-3/4 text-xl sm:text-2xl md:text-3xl font-extrabold text-white text-center md:text-left mt-4">
              Code for 10 hours, earn your own personal computer!
            </h1>
            <div className="mt-8 w-3/4">
              <a
                href="https://hackclub.enterprise.slack.com/archives/C09SGKRQGA0"
                className="pointer-events-auto p-4 mt-4 rounded-lg bg-blue-900/30 text-white text-lg border border-white/50 hover:bg-white/20 transition"
              >
                Interested? Join the Slack
              </a>
            </div>
          </div>

          {/* Computer */}
          <img
            src="./computer.png"
            alt="computer"
            className={`computer-hover object-contain transform transition-opacity duration-[100000ms] ease-in-out ${
              showComputer
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } w-3/4 sm:w-2/3 md:w-[600px] mt-6 md:mt-0 md:ml-[-250px]`}
            style={{ height: "auto" }}
          />
        </div>
        <div className="w-full relative flex flex-col items-center justify-center gap-4 px-4 mt-[-850px] md:mt-[-990px]">
          {/* Instructions */}
          <div
            className="max-w-7xl relative w-full p-8 flex flex-col items-center gap-6 text-center
                 backdrop-blur-sm border border-white/20 rounded-xl"
          >
            <div className="text-center">
              <p className="text-xl md:text-3xl font-semibold">
                Want to code but don't have easy access to a computer?
              </p>

              <p className="mt-4 text-sm md:text-base opacity-90">
                ➤ No personal computer?
                <br />
                ➤ Only have access to a school or library computer?
                <br />➤ Wish you had more time to code?
              </p>

              <p className="mt-2 text-base md:text-lg font-semibold">
                This event is for you!
              </p>
            </div>
          </div>

          <section className="max-w-7xl  py-4 items-center justify-center">
            <div
              className="relative w-full p-8 flex flex-col items-center gap-6 text-center
                  bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl"
            >
              <p className="text-xl md:text-3xl font-semibold">
                Let's get started!
              </p>
              <div className="max-w-7xl py-4 flex flex-col md:flex-row gap-4 mx-5">
                <div className="bg-white/30 border border-white/10 text-center rounded-xl p-5 w-full mx-auto">
                  <p className="text-sm md:text-base">
                    1. Follow this {""}
                    <Link
                      to="/codespaces"
                      className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                    >
                      guide
                    </Link>{" "}
                    {""}
                    to create a new GitHub repository and open it up in
                    Codespaces, then set it up with Hackatime. Hackatime will
                    track the time you spend on your project so that we can
                    verify your hours.
                  </p>
                </div>

                <div className="bg-white/30 border border-white/10 p-5 max-w-lg w-full text-center rounded-xl mx-auto">
                  <p className="text-sm md:text-base">
                    2. Code your project on{" "}
                    <a
                      href="https://github.com/features/codespaces"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                    >
                      Codespaces
                    </a>
                    . You could create a personal website (
                    <a
                      href="https://workshops.hackclub.com/personal_website/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                    >
                      tutorial
                    </a>
                    ), a game in JavaScript (
                    <a
                      href="https://www.youtube.com/watch?v=r9I4DuGmJ2Y"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                    >
                      video guide
                    </a>
                    ), or whatever original project you can think of. It should
                    be an original project, not a school assignment or a copy of
                    a tutorial.
                  </p>
                </div>

                <div className="bg-white/30 border border-white/10 p-5 max-w-lg w-full text-center rounded-xl mx-auto">
                  <p className="text-sm md:text-base">
                    3. After 10 hours,{" "}
                    <a
                      href="https://submit.hackclub.com/ignite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                    >
                      submit
                    </a>{" "}
                    your project! We'll review it and then ship you a personal
                    computer!
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-sm ">
                Have a question or need help? Please let us know in{" "}
                <a
                  href="https://hackclub.enterprise.slack.com/archives/C09SGKRQGA0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                >
                  #ignite-ysws
                </a>
              </p>
            </div>
          </section>

          {/*FAQ */}
          <section
            id="faq"
            aria-labelledby="faqHeading"
            className="mx-auto w-full max-w-none sm:max-w-4xl scroll-mt-24 py-12 max-[500px]:py-[10px]"
          >
            <h2
              id="faqHeading"
              className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center max-[500px]:text-[24px]"
            >
              FAQ
            </h2>

            <Accordion
              type="single"
              collapsible
              className="mt-6 w-full bg-white/[0.04] backdrop-blur rounded-none sm:rounded-xl border-y border-y-white/10 sm:border sm:border-white/10 max-[500px]:mt-[16px]"
            >
              <AccordionItem value="q0" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  Who is eligible?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 max-[500px]:text-[16px]">
                  Student ages 13-18 who do not already own a personal computer
                  are eligible to participate. For example, students who can
                  only access a computer at school or at a public library, which
                  makes it more difficult for them to code for long periods of
                  time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q1" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  What do I need to submit?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 max-[500px]:text-[16px]">
                  You will need to submit a link to a working build of your
                  project and its public GitHub repository. The repository needs
                  a{" "}
                  <a
                    href="https://www.makeareadme.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    REAME file
                  </a>{" "}
                  briefly explaining what your project is and how to use it.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  What skill level do I need to participate?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 max-[500px]:text-[16px]">
                  You can have any level of skill to participate! This is open
                  to beginners, in fact, we encourage beginners to participate!
                  The goal is to make coding accessible to everyone, regardless
                  of their current skill level.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q6" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  Is participation free?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 space-y-2 max-[500px]:text-[16px]">
                  Yes, participation is completely free!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
        {/* HC on top */}
      </div>

      <div className="fixed top-0 left-0 w-full z-10 flex items-start justify-between px-6 pointer-events-none">
        <a
          href="https://hackclub.com"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto"
        >
          <img
            src="https://assets.hackclub.com/flag-orpheus-top.svg"
            alt="Hack Club"
            className="computer-hover w-[100px] md:w-[200px]"
          />
        </a>

        <a
          href="https://submit.hackclub.com/ignite"
          className="pointer-events-auto p-2 mt-4 rounded-lg bg-blue-900/30 text-white text-base md:text-3xl border border-white/50 hover:bg-white/20 transition"
        >
          Submit
        </a>
      </div>
    </>
  );
}
