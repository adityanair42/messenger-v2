export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative flex justify-center items-center h-111 w-71 rounded-xl bg-white bg-gradient-to-r from-orange-500 to-red-800">
        <div className="flex flex-col items-center rounded-xl h-110 w-70 bg-black">
        <div className="text-3xl text-neutral-300 mt-13 mb-10 font-medium">
          Sign Up
        </div>
        <input type="text" placeholder="email"        className="py-2 border rounded-md px-2 my-2 bg-neutral-800"/>
        <input type="text" placeholder="name"         className="py-2 border rounded-md px-2 my-2 bg-neutral-800" />
        <input type="password" placeholder="password" className="py-2 border rounded-md px-2 my-2 bg-neutral-800" />

        <button className="mt-10 px-20 rounded-md py-2 bg-gradient-to-r from-orange-500 to-red-800">
          Sign Up
        </button>
      </div>
      </div>
    </div>
  )
}