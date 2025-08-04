"use client"

import axios, { AxiosError } from "axios";
import { useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function login(event: FormEvent) {
    event.preventDefault();

    try {
      localStorage.removeItem("token");
      const response = await axios.post("http://localhost:3001/signin", {
        name: usernameRef.current?.value,
        password: passwordRef.current?.value,
      });
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        router.push("/");
      } else {
        alert("Login failed: No token received.");
      }

    } catch (err) {
      console.error("Login failed:", err);
      
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          alert("Login failed: Invalid username or password.");
        } else {
          alert(`Login failed: Server responded with status ${error.response.status}.`);
        }
      } else if (error.request) {
        alert("Login failed: No response from server. Is it running?");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative flex justify-center items-center h-111 w-71 rounded-xl bg-white bg-gradient-to-r from-orange-500 to-red-800">
        <form onSubmit={login} className="flex flex-col items-center rounded-xl h-110 w-70 bg-black">
          <div className="text-3xl text-neutral-300 mt-13 mb-17 font-medium">
            Log In
          </div>
          
          <input 
            ref={usernameRef}
            type="text" 
            placeholder="name" 
            className="py-2 border rounded-md px-2 my-2 bg-neutral-800"
            required 
          />
          <input 
            ref={passwordRef}
            type="password" 
            placeholder="password" 
            className="py-2 border rounded-md px-2 my-2 bg-neutral-800"
            required
          />

          <button type="submit" className="mt-17 px-21 rounded-md py-2 bg-gradient-to-r from-orange-500 to-red-800">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}