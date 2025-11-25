"use client"
import { useState } from "react"

export default function Home() {
  const [open, setOpen]= useState(false);
  return (
    <div className="flex min-h-screen items-center justify-center"
    style={{
		backgroundImage: "url(/Ignite1.png)",
		backgroundSize: "cover",
		backgroundPosition: "top center",
		backgroundRepeat: "no-repeat",
    backgroundAttachment: "scroll"
	}}
  >
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div>
          <button onClick={() => setOpen(!open)} 
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20">
            Open popup
          </button>

          {open && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                </div>
            </div>
            )}
        </div>
      </main>
    </div>
  );
}
