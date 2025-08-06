"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { FormEvent } from "react";
import { BACKEND_URL } from "@repo/common/config";

export function HeroSection() {

  const [Input1, setInput1] = useState(false);
  const [Input2, setInput2] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [joinRoomName, setJoinRoomName] = useState(""); 
  const router = useRouter();

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to create a room.");
      router.push("/signin");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/room`, 
        { name: roomName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      router.push(`/chats/${roomName}`);
    } catch (err) {
      console.error("Failed to create room:", err);
      const error = err as AxiosError;
      if (error.response?.status === 409) {
        alert("A room with this name already exists.");
      } else {
        alert("Failed to create room. Please try again.");
      }
    }
  }
  

  function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (joinRoomName) {
      router.push(`/chats/${joinRoomName}`);
    }
  }

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
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Enter room name" 
              className="py-3 px-4 mx-3 rounded-md border"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value)
              }}
              required
            />
          </form>
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
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Enter room name" 
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md" 
              value={joinRoomName}
              onChange={(e) => setJoinRoomName(e.target.value)}
              required
            />
          </form>
        )}
      </div>
    </div>
  )
}