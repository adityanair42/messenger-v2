import axios from "axios";
import { Message } from "./message";

export default async function chats({ params }: { params: { slug: string } }) {
  const response = await axios.get(`http://localhost:3001/room/${params.slug}`);
  const roomId = response.data.room?.id;

  const chatsResponse = await axios.get(`http://localhost:3001/chats/3`);
  const chats = chatsResponse.data.messages;

  return (
    <div className="flex-col border px-5 py-5">
      <Message message={`Room ID: ${roomId}`} />
      <div>
        {chats.map((chat: any, index: number) => (
          <Message key={index} message={chat.message} />
        ))}
      </div>
    </div>
  );
}