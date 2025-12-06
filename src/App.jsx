import { useState } from "react";
//import Toolbar from "./components/Toolbar.jsx";
import "./App.css";
//import EmailButton from "./components/EmailButton.jsx";

//import { Outlet, Link } from "react-router-dom";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="h-screen flex flex-col justify-center items-center">
                <img
                    src="/watercolorbg.png"
                    className="absolute top-0 w-full opacity-80"
                />
                <a
                    href="https://hackclub.com"
                    target="_blank"
                    rel="noopenner noreferrer"
                >
                    <img
                        src="https://assets.hackclub.com/flag-orpheus-top.svg"
                        className="absolute top-0 left-2"
                    />
                </a>
                <div className="absolute top-0 right-4">
                </div>
                <div className="flex flex-col justify-center items-center text-center text-[#FFFFFF] mb-20 z-10">
                    <img
                        src="/logo.svg"
                        className="w-full px-6 md:h-44 lg:h-64 xl:h-72"
                    />
                    <p className="mx-8 text-2xl text-darkPink md:mt-4 mt-8 retro">
                        Ignite
                    </p>
                    {/*<button href="#" className="px-8 py-2 bg-slate mt-4 text-xl rounded-sm retro">coming VERY soon !!!</button>*/}
                    <img
                        src="/arrows.svg"
                        className="w-16 mt-16 lg:mt-8 bobble"
                    />
                </div>
            </div>
        </>


    );
}

export default App;