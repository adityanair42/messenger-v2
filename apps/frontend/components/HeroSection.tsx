"use client"
import { useState } from "react";

export function HeroSection() {

  const [Input1, setInput1] = useState(false);
  const [Input2, setInput2] = useState(false);

  return (
    <div className="flex flex-col items-center mt-45">
      <h1 className="text-7xl text-center tracking-wide bg-gradient-to-r from-neutral-400 to-neutral-200 bg-clip-text text-transparent pb-2">
        Messenger
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}V2
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Secure, instant and reliable communication. <br /> Our scalable platform uses websockets and robust encryption to empower your connections.
      </p>
      <div className="mt-15 flex justify-center">
        {!Input1 && (
          <div>
            <button className="py-3 px-4 mx-3 rounded-md border" onClick={() => {
              setInput1(!Input1)
            }}>
              Create a room
            </button>
          </div>
        )}
        {Input1 && (
          <div>
            <input type="text" placeholder="Enter room number" className="py-3 px-4 mx-3 rounded-md border" />
          </div>
        )}
        {!Input2 && (
          <div>
            <button className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md" onClick={() => {
              setInput2(!Input2)
            }}>
              Join a room
            </button>
          </div>
        )}
        {Input2 && (
          <div>
            <input type="text" placeholder="Enter room number" className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md" />
          </div>
        )}
      </div>
    </div>
  )
}