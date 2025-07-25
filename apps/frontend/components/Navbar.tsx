

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b  border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex justify-center flex-shrink-0">
            <div className="text-xl">
              Messenger-V2
            </div>
          </div>
          <div className="flex">
            <div className="mx-7">
              About
            </div>
            <div className="mx-7">
              Features
            </div>
          </div>
          <div className="flex justify-center items-center space-x-12">
            <button className="text-md px-4 py-2 rounded-md border">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-orange-400 to-orange-800 text-md px-4 py-2 mx-3 rounded-md">
              Create an account
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}