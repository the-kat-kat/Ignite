"use client"
import { useState } from "react"

export default function Home() {
  const [open, setOpen]= useState(false);
  return (
    <div className="flex w-full items-center justify-center"
    style={{
		backgroundImage: "url(/Ignite1.png)",
		backgroundSize: "cover",
		backgroundPosition: "top center",
		backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll",
    minHeight: "150vh"
	}}
  >
      <main className="flex justify-center w-full">
        <div className = "max-w-5 mx-auto py-20 px--6 space-y-20">
          <h1 className="text-4xl font-bold text-white">
            Welcome to Ignite!
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white/70 p-6 rounded-xl shadow-lg"></div>

          </div>
          <button onClick={() => setOpen(!open)} 
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
            Submit Project
          </button>

          {open && (
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                </div>
            </div>
            )}
        </div>
      </main>
    </div>
  );
}
