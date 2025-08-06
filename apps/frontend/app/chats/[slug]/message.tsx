interface Chat {
  message: string;
  username?: string;
}

interface MessageProps {
  chat: Chat;
  currentUser: string | null;
}

export const Message = ({ chat, currentUser }: MessageProps) => {
  // Check if the message is from the currently logged-in user
  const isCurrentUser = currentUser && chat.username === currentUser;

  // Define classes for alignment and the message bubble
  const wrapperClasses = `flex w-full ${isCurrentUser ? 'justify-end' : 'justify-start'}`;
  
  // Using max-w-[50%] for half-width screen and keeping your original color
  const bubbleClasses = 'max-w-[50%] min-w-[15%] rounded-lg p-3 bg-red-500 text-white break-words';

  return (
    <div className={wrapperClasses}>
      <div className={bubbleClasses}>
        {/* We only show the username for messages from other people */}
        {!isCurrentUser && (
            <p className="text-xs font-bold pb-1">{chat.username || 'User'}</p>
        )}
        <p className="text-sm">{chat.message}</p>
      </div>
    </div>
  );
};