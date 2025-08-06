"use client";

import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useParams } from 'next/navigation';
import { Message } from "./message";

interface Chat {
  id: number | string;
  message: string;
  username?: string;
}

interface Room {
  id: number;
  slug: string;
}

export default function ChatPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [messages, setMessages] = useState<Chat[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("Room slug not found in URL.");
      return;
    }

    const initializeChat = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Authentication token not found. Please sign in again.");
        setLoading(false);
        return;
      }

      try {
        const roomResponse = await axios.get<{ room: Room | null }>(`http://localhost:3001/room/${slug}`);
        const currentRoom = roomResponse.data.room;

        if (!currentRoom) {
          setError("Room not found.");
          setLoading(false);
          return;
        }
        setRoom(currentRoom);

        const chatResponse = await axios.get<{ messages: Chat[] }>(`http://localhost:3001/chats/${currentRoom.id}`);
        setMessages(chatResponse.data.messages.reverse() || []);
        
        ws.current = new WebSocket(`ws://localhost:8080?token=${token}`);

        ws.current.onopen = () => {
          ws.current?.send(JSON.stringify({
            type: 'join_room',
            roomId: currentRoom.id.toString()
          }));
        };

        ws.current.onmessage = (event) => {
          const receivedMessage = JSON.parse(event.data);
          if (receivedMessage.type === 'chat') {
            setMessages(prevMessages => [...prevMessages, receivedMessage]);
          }
        };

        ws.current.onerror = (err) => {
          console.error("WebSocket error:", err);
          setError("Connection error. Please refresh the page.");
        };
        
        ws.current.onclose = () => {};

      } catch (err) {
        console.error("Failed to initialize chat:", err);
        setError("Failed to load chat room.");
      } finally {
        setLoading(false);
      }
    };

    initializeChat();


    return () => {
      ws.current?.close();
    };
  }, [slug]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && ws.current?.readyState === WebSocket.OPEN && room) {
      ws.current.send(JSON.stringify({
        type: 'chat',
        message: newMessage,
        roomId: room.id.toString(),
      }));
      setNewMessage("");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading chat...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="flex flex-col h-screen p-4">
      <h1 className="text-2xl font-bold border-b pb-2 mb-4">{slug}</h1>
      
      <div ref={chatContainerRef} className="flex-grow overflow-y-auto mb-4 pr-2">
        {messages.length > 0 ? (
          messages.map((chat, index) => (
            <Message key={chat.id || `msg-${index}`} message={`${chat.username || 'User'}: ${chat.message}`} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet. Be the first to say something!</p>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="flex-shrink-0">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message and press Enter..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
}