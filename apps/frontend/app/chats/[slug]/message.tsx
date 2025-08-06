interface Chat {
  message: string;
  username?: string;
}

interface MessageProps {
  chat: Chat;
  currentUser: string | null;
}

export const Message = ({ chat, currentUser }: MessageProps) => {
  const isCurrentUser = currentUser && chat.username === currentUser;

  const wrapperClasses = `flex w-full ${isCurrentUser ? 'justify-end' : 'justify-start'}`;
  
  const bubbleClasses = 'max-w-[50%] min-w-[15%] rounded-lg py-1 px-3 border text-white break-words';

  return (
    <div className={wrapperClasses}>
      <div className={bubbleClasses}>
        {!isCurrentUser && (
            <p className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text text-xs font-bold">{chat.username || 'User'}</p>
        )}
        {isCurrentUser && (
          <p className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text text-xs font-bold">Me</p>
        )}
        <p className="text-sm">{chat.message}</p>
      </div>
    </div>
  );
};