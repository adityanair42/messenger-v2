interface MessageProps {
  message: String
  userId?: String
}

export const Message = ({ message, userId }: MessageProps) => {
  return(
    <div className="bg-red-500">
      { message } 
    </div>
  )
}