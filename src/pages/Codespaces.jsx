import { useState, useEffect, useRef } from "react";
import "../App.css";

const layers = [
  { src: "./ignite_1.webp", z: -1000, opacity: 0.5 },
  { src: "./ignite_2.webp", z: -500, opacity: 0.5 },
];

export default function App() {
  const lastRef = useRef(0);
  const [activeLayer, setActiveLayer] = useState(0);

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

  const groupStyle = {
    transformStyle: "preserve-3d",
    position: "relative",
    height: "100vh",
  };

  const layerBase = {
    position: "absolute",
    inset: 0,
    transformOrigin: "center center",
    WebkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
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

      <div className="fixed w-full bottom-0 min-h-screen">
        <div style={groupStyle}>
          {layers.map((l, i) => (
            <div
              key={i}
              style={{
                ...layerBase,
                transform: `translateZ(-100px)  scale(${2})`,
                opacity: activeLayer === i ? l.opacity : 0,
                transition: "opacity 3s ease-in-out",
              }}
            >
              <img src={l.src} alt={`layer-${i}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="fixed z-100 min-h-screen">
        <div className="fixed inset-0 z-[-200] pointer-events-none backdrop-blur-[3px]" />
        <span className="fixed opacity-20 top-0 right-0 scale-200 opacity animate-[spin_40s_linear_infinite] translate-x-[-500px]">
          <img
            src="./flame_circle.png"
            className="w-full h-full object-contain"
          />
        </span>
      </div>

      {/*scrollable*/}
      <div className="w-full relative flex flex-col items-center justify-center gap-4 py-16">
        <section className="items-center justify-center">
          <div
            className="relative w-full p-8 flex flex-col items-center gap-6 text-center
                  bg-white/20 backdrop-blur-md border border-white/20 rounded-xl"
          >
            <a
              href="/"
              className="self-start  px-4 py-2 rounded-lg bg-white/10 text-white text-base border border-white/50 hover:bg-white/20 transition"
            >
              Back
            </a>
            <p className="text-xl md:text-3xl font-semibold">
              How to set up Codespaces with Hackatime
            </p>
            <div className="max-w-7xl py-4 flex flex-col gap-4 overflow-hidden">
              <div className="border border-white/10 text-center rounded-xl w-full mx-auto">
                <p className="text-sm md:text-base py-4">
                  1. Create a new{" "}
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                  >
                    Github
                  </a>{" "}
                  repository and open it in{" "}
                  <a
                    href="https://github.com/features/codespaces"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                  >
                    Codespaces
                  </a>{" "}
                  by clicking "Create a codespace."
                </p>
                <div className="flex flex-row gap-4 px-4">
                  <img
                    className="w-[200px] md:w-[500px] md:h-[300px] object-cover overflow-hidden justify-center rounded-md"
                    src="./new_repo.png"
                    alt="new_repo"
                  />
                  <img
                    className="w-[200px] md:w-[500px] md:h-[300px] object-cover overflow-hidden justify-center rounded-md"
                    src="./create_repo.png"
                    alt="create_repo"
                  />
                  <img
                    className="w-[200px] md:w-[500px] md:h-[300px] object-cover overflow-hidden justify-center rounded-md"
                    src="./create_cs.png"
                    alt="create_cs"
                  />
                </div>
              </div>

              <div className="border border-white/10 p-5 w-full text-center rounded-xl mx-auto">
                <p className="text-sm md:text-base mb-4">
                  2. We need to validate the time you spend on your project! If
                  you haven't already, create a{" "}
                  <a
                    href="https://hackatime.hackclub.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                  >
                    Hackatime
                  </a>{" "}
                  account. On setup page, copy the command in blue, paste it in
                  the terminal of the Codespace you just created, and hit
                  return. You should recieve a "Success" message is it works!
                </p>
                <div className="flex flex-row gap-4 justify-center">
                  <img
                    className="w-[200px] md:w-[500px] md:h-[340px] object-cover overflow-hidden justify-center rounded-md"
                    src="./new_hackatime.png"
                    alt="new_hackatime"
                  />
                  <img
                    className="w-[200px] md:w-[500px] md:h-[340px] object-cover overflow-hidden justify-center rounded-md"
                    src="./paste_command.png"
                    alt="paste_command"
                  />
                </div>
              </div>

              <div className="border border-white/10 p-5 w-full text-center rounded-xl">
                <p className="text-sm md:text-base mb-4">
                  3. Next, you'll have to install the Wakatime extension in your
                  Codespace. Click on the extensions icon on the left then
                  search for Wakatime and install it. Next, open the Command
                  Palette (Ctrl+Shift+P on Linux, Cmd+Shift+P on macOS) and type
                  in "Wakatime API Key." Enter your Wakatime API key, which you
                  can find {""}
                  <a
                    href="https://wakatime.com/api-key"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                  >
                    here
                  </a>
                </p>
                <div className="flex flex-row gap-4 justify-center">
                  <img
                    className="w-[200px] md:w-[500px] md:h-[340px] object-cover overflow-hidden justify-center rounded-md"
                    src="./install_wakatime.png"
                    alt="install_wakatime"
                  />
                  <img
                    className="w-[200px] md:w-[500px] md:h-[340px] object-cover overflow-hidden justify-center rounded-md"
                    src="./wakatime_key.png"
                    alt="wakatime_key"
                  />
                </div>
              </div>

              <div className="border border-white/10 p-5 w-full text-center rounded-xl">
                <p className="text-sm md:text-base mb-4">
                  4. Open the Command Palette again and look up "Wakatime Open
                  Configure Fire." Open up the configure file and replace it
                  with the configure file from your{" "}
                  <a
                    href="https://wakatime.com/api-key"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lightGreen underline decoration-dotted underline-offset-4 hover:text-white/80 transition"
                  >
                    Hackatime settings page.
                  </a>
                </p>
                <div className="flex flex-row gap-4 justify-center">
                  <img
                    className="w-[200px] md:w-[500px] md:h-[300px] object-cover overflow-hidden justify-center rounded-md"
                    src="./open_config.png"
                    alt="install_wakatime"
                  />
                  <img
                    className="w-[200px] md:w-[500px] md:h-[300px] object-cover overflow-hidden justify-center rounded-md"
                    src="./hackatime_config.png"
                    alt="wakatime_key"
                  />
                  <img
                    className="w-[200px] md:w-[500px] md:h-[300px] object-cover overflow-hidden justify-center rounded-md"
                    src="./replace_config.png"
                    alt="wakatime_key"
                  />
                </div>
              </div>
            </div>

            <div className="justify-center  border border-white/10 p-5 w-full text-center rounded-xl">
              <p className="text-sm md:text-base mb-4">
                You should be all set up now! You can start coding and, after a
                few minutes, check Hackatime to see if it has tracked the time
                for your project.
              </p>
               <img
                    className="w-[200px] md:w-[500px] md:h-[300px] object-cover overflow-hidden self-center rounded-md"
                    src="./track_time.png"
                    alt="wakatime_key"
                  />
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
      </div>
    </>
  );
}
