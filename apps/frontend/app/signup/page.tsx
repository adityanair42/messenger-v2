"use client";

import { useRef, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

export default function SignUp() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/signup", {
        email: emailRef.current?.value,
        name: nameRef.current?.value,
        password: passwordRef.current?.value,
      });

      if (response.data.userId) {
        router.push("/login"); 
      } else {
        alert(response.data.message || "Sign up failed. Please check your inputs.");
      }
    } catch (err) {
      console.error("Sign up failed:", err);
      const error = err as AxiosError;
      if (error.response?.status === 411) {
        alert("Sign up failed: A user with this email already exists.");
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative flex justify-center items-center h-111 w-71 rounded-xl bg-white bg-gradient-to-r from-orange-500 to-red-800">
        <form onSubmit={handleSignUp} className="flex flex-col items-center rounded-xl h-110 w-70 bg-black">
          <div className="text-3xl text-neutral-300 mt-13 mb-10 font-medium">
            Sign Up
          </div>
          <input
            ref={emailRef}
            type="email"
            placeholder="email"
            className="py-2 border rounded-md px-2 my-2 bg-neutral-800"
            required
          />
          <input
            ref={nameRef}
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

          <button type="submit" className="mt-10 px-20 rounded-md py-2 bg-gradient-to-r from-orange-500 to-red-800">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}