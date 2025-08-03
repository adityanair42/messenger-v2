interface MessageProps {
  message: String
  userId?: String
}

export const Message = ({ message, userId }: MessageProps) => {
  return(
    <div className="border bg-red-500 px-10">
      { message } {userId}
    </div>
  )
}