import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/common/config';
import { prismaClient } from '@repo/db/client';

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users = new Map<WebSocket, User>();

function checkUser(token: string): { userId: string; username: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded || !decoded.userId || !decoded.username) {
      return null;
    }
    return { userId: decoded.userId, username: decoded.username };
  } catch (e) {
    return null;
  }
}

async function handleMessage(ws: WebSocket, userInfo: { userId: string, username: string }, data: Buffer | string) {
    let parsedData;
    try {
      if (typeof data !== 'string') {
          parsedData = JSON.parse(data.toString());
      } else {
          parsedData = JSON.parse(data);
      }
    } catch(e) {
        console.error("Failed to parse incoming message:", e);
        return;
    }

    const currentUser = users.get(ws);
    if (!currentUser) return;

    if (parsedData.type === 'join_room') {
      if (!currentUser.rooms.includes(parsedData.roomId)) {
        currentUser.rooms.push(parsedData.roomId);
      }
    }

    if (parsedData.type === 'leave_room') {
        currentUser.rooms = currentUser.rooms.filter(x => x !== parsedData.room);
    }

    if (parsedData.type === 'chat') {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      const newDbMessage = await prismaClient.chat.create({
        data: {
          roomId: Number(roomId),
          message,
          userId: userInfo.userId,
          username: userInfo.username
        }
      });

      const payload = JSON.stringify({
          type: 'chat',
          message: newDbMessage.message,
          roomId,
          username: newDbMessage.username,
          id: newDbMessage.id
      });
      
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(payload);
        }
      });
    }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) { return; }

  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || '';
  
  const userInfo = checkUser(token);
  if (userInfo === null) {
    ws.close();
    return;
  }

  users.set(ws, {
    userId: userInfo.userId,
    rooms: [],
    ws
  });


  const messageHandler = (data: Buffer | string) => handleMessage(ws, userInfo, data);
  
  ws.on('message', messageHandler);
  
  ws.on('close', () => {
    ws.off('message', messageHandler);
    users.delete(ws);
    console.log('Client disconnected, user removed.');
  });
});