export function HeroSection() {
  return(
    <div className="flex flex-col items-center mt-45">
      <h1  className="text-7xl text-center tracking-wide bg-gradient-to-r from-neutral-400 to-neutral-200 bg-clip-text text-transparent pb-2">
        Messenger
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}V2
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Secure, instant and reliable communication. <br /> Our scalable platform uses websockets and robust encryption to empower your connections.
      </p>
      <div className="mt-15">
        <button className="py-3 px-4 mx-3 rounded-md border">
          Create a room
        </button>
        <button className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md">
          Join a room
        </button>
      </div>
    </div>
  )
}