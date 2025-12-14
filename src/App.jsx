import { useState, useEffect, useRef } from "react";
//import Toolbar from "./components/Toolbar.jsx";
import "./App.css";
import EmailButton from "./components/EmailButton.jsx";
import UserTag from "./components/ui/UserTag";
import { Box } from "@radix-ui/themes";
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
            className="absolute bottom-[-20vh] left-1/2 -translate-x-1/2 w-[160%] max-w-none z-0 pointer-events-none"
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
              <EmailButton />
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
        <div className="w-full relative flex flex-col items-center justify-center gap-4 mt-32 md:mt-[-990px]">
          {/* Instructions */}
          <div
            className="relative w-full p-8 flex flex-col items-center gap-6 text-center
                  bg-salmon/40 backdrop-blur-md border border-white/20 rounded-xl"
          >
            <p className="text-xl md:text-3xl font-semibold">
                Want to code but don't have easy access to a computer?
              </p>
          </div>

          <section className="items-center justify-center">
            <div
              className="relative w-full p-8 flex flex-col items-center gap-6 text-center
                  bg-salmon/40 backdrop-blur-md border border-white/20 rounded-xl"
            >
              <p className="text-xl md:text-3xl font-semibold">
                Let's get started!
              </p>
              <div className="max-w-7xl py-4 flex flex-row gap-4 mx-5 overflow-hidden">
                <div className="bg-darkYellow border border-white/10 text-center rounded-xl p-5 w-full mx-auto">
                  <p className="text-sm md:text-base">
                    1. Create a new {" "}
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition">
                      Github
                    </a>{" "}
                    repository and open it in{" "}
                    <a href="https://github.com/features/codespaces" target="_blank" rel="noopener noreferrer" className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition">
                      Codespaces
                    </a>{" "}
                    Never used GitHub before? Follow this{" "}
                    <a href="https://www.canva.com/design/DAGr1zQLfE4/eqe5sSP6hE9-4SZez72QFA/view?utm_content=DAGr1zQLfE4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h25bb5bce98#40 " target="_blank" rel="noopener noreferrer" className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition">
                      tutorial
                    </a>{" "}
                    on how to create a simple website in Codespaces! 
                  </p>
                  <img
                    className="w-[200px] md:w-[1000px] object-cover"
                    src="./computer.png"
                    alt="computer"
                  />
                </div>

                <div className="bg-darkYellow border border-white/10 p-5 max-w-lg w-full text-center rounded-xl mx-auto">
                  <p className="text-sm md:text-base">
                    2. We need to validate the time you spend on your project! Create a{" "}
                    <a href="https://www.canva.com/design/DAGr1zQLfE4/eqe5sSP6hE9-4SZez72QFA/view?utm_content=DAGr1zQLfE4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h25bb5bce98#40 " target="_blank" rel="noopener noreferrer" className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition">
                      Hackatime
                    </a>{" "}
                    account and follow the VSCode instructions to set it up. You'll have to install the Wakatime extension.
                  </p>
                </div>

                <div className="bg-darkYellow border border-white/10 p-5 max-w-lg w-full text-center rounded-xl mx-auto">
                  <p className="text-sm md:text-base">
                    3. After 10 hours, submit your project! We'll review it and
                    then ship you a personal computer!
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
            className="mx-auto w-full max-w-none sm:max-w-4xl scroll-mt-24 py-12 max-[500px]:py-[20px]"
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
                  What type of projects should I make?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 max-[500px]:text-[16px]">
                  Your project should help someone in your fandom. It shouldn't
                  be a basic website with a bunch of PNGs, but something
                  interactive or useful.
                  <br />
                  <br />
                  Examples:
                  <br />
                  <ul>
                    <li>
                      - Trivia game about your fandom (ex.{" "}
                      <a
                        className="underline decoration-dotted"
                        href="https://gearoid.me/pokemon/"
                      >
                        Who's That Pokemon?
                      </a>
                      )
                    </li>
                    <li>
                      - Interactive maps/trees (ex.{" "}
                      <a
                        className="underline decoration-dotted"
                        href="https://github.com/lukephelan/web-of-westeros"
                      >
                        Game of Thrones family tree
                      </a>
                      )
                    </li>
                    <li>
                      - Star Wars api (ex.{" "}
                      <a
                        className="underline decoration-dotted"
                        href="https://swapi.dev/"
                      >
                        swapi.dev
                      </a>
                      )
                    </li>
                  </ul>
                  (This isn't a definitive list, just examples! Go wild with
                  what you build, and be creative!)
                  <br />
                  <br />
                  Avoid:
                  <ul>
                    <li>- Simple static sites</li>
                    <li>
                      - Wikis or forums, those are everywhere and likely already
                      exist for your fandom
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q1" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  What counts as “finished”?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 max-[500px]:text-[16px]">
                  A working build + public repo + README with setup and usage +
                  live demo link. Interactive projects should be tryable without
                  digging.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q2" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  How do I set up Hackatime?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 max-[500px]:text-[16px]">
                  Create an account, install a WakaTime plugin for your editor,
                  and sign in. Hackatime reads heartbeats to show your coding
                  time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q3" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  Can I use AI tools?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 max-[500px]:text-[16px]">
                  Yes, but avoid heavy reliance on it. Not AI only. Keep
                  meaningful personal work and attribute any generated assets
                  when relevant. Less than 30 percent of your project should be
                  AI.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q4" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  What links must I submit?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 space-y-2 max-[500px]:text-[16px]">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Working demo link, site, video, or app</li>
                    <li>Public GitHub repo</li>
                    <li>Your hackatime project</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q5" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  Are there content restrictions?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 max-[500px]:text-[16px]">
                  Keep it respectful and within Hack Club's COC. Attribute third
                  party assets or code.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q6" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  Do I have to use Hackatime?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 space-y-2 max-[500px]:text-[16px]">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Yes, it is crucial you use hackatime.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q7" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  Can I connect with others?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 space-y-2 max-[500px]:text-[16px]">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Join the Hackclub Slack to connect.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q8" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  When does this launch?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 space-y-2 max-[500px]:text-[16px]">
                  <ul className="list-disc list-inside space-y-1">
                    <li>October second</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="q9" className="px-4 max-[500px]:px-[12px]">
                <AccordionTrigger className="text-left max-[500px]:text-[18px] max-[500px]:py-[14px]">
                  I decided on my idea, now what?
                </AccordionTrigger>
                <AccordionContent className="text-gray-200/90 space-y-2 max-[500px]:text-[16px]">
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Share your idea with{" "}
                      <UserTag href="https://hackclub.slack.com/team/U07UKLZT9N1">
                        @Nirvaan
                      </UserTag>
                      ,{" "}
                      <UserTag href="https://hackclub.slack.com/team/U04QD71QWS0">
                        @manitej
                      </UserTag>
                      , or post it in the{" "}
                      <UserTag href="https://hackclub.slack.com/archives/C09A37XECJV">
                        #fanpage
                      </UserTag>{" "}
                      channel on Hack Club Slack for approval.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
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
          className="flex flex-col items-center justify-center text-center px-4"
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
