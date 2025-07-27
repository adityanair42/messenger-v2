export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center border-2 rounded-xl h-100 w-70 ">
        <div className="text-3xl mt-15 mb-15">
          Sign Up
        </div>
        <input type="text" placeholder="email" />
        <input type="text" placeholder="name"/>
        <input type="password" placeholder="password"/>
      </div>
    </div>
  )
}