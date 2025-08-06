"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("name");

    if (token && storedName) {
      setIsLoggedIn(true);
      setName(storedName);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    setIsLoggedIn(false);
    setName("");

    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex justify-center flex-shrink-0">
            <div className="text-xl">Messenger</div>
          </div>
          <div className="hidden lg:flex ml-14 space-x-12">
            <div className="mx-7">About</div>
            <div className="mx-7">Features</div>
            <div className="mx-7">Pricing</div>
          </div>
          <div className="flex justify-center items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="text-lg font-medium">{name}</div>
                <button
                  onClick={handleSignOut}
                  className="bg-gradient-to-r from-orange-400 to-orange-800 text-md px-3 py-2 rounded-md"
                >
                  Sign Out
                </button>

              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="text-md px-3 py-2 rounded-md border">
                    Sign In
                  </button>
                </Link>

                <Link href="/signup">
                  <button className="bg-gradient-to-r from-orange-400 to-orange-800 text-md px-3 py-2 rounded-md">
                    Create an account
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}