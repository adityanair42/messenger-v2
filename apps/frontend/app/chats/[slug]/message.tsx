interface MessageProps {
  message: String
  name?: String
}

export const Message = ({ message, name }: MessageProps) => {
  return(
    <div className="border bg-red-500 px-10">
      { message } {name}
    </div>
  )
}