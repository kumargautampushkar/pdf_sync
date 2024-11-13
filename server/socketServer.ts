import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
interface Room {
  id: string;
  currentPage: number;
  pdfUrl: string;
  users: User[];
}
interface User {
  id: string;
  name: string;
  role: 'admin' | 'viewer';
}
const rooms = new Map<string, Room>();
export function setupSocketServer(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });
  io.on('connection', (socket) => {
    socket.on('join_room', ({ roomId, userName }) => {
      // Room creation/joining logic
      const room = rooms.get(roomId) || {
        id: roomId,
        currentPage: 1,
        pdfUrl: '',
        users: []
      };
      const isAdmin = room.users.length === 0;
      const newUser = {
        id: socket.id,
        name: userName || `User ${room.users.length + 1}`,
        role: isAdmin ? 'admin' : 'viewer'
      };
      room.users.push(newUser);
      rooms.set(roomId, room);
      socket.join(roomId);
      socket.emit('user_assigned', newUser);
      io.to(roomId).emit('room_updated', room);
    });
    socket.on('update_pdf', ({ roomId, pdfUrl }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.pdfUrl = pdfUrl;
        io.to(roomId).emit('room_updated', room);
      }
    });
    socket.on('change_page', ({ roomId, page }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.currentPage = page;
        io.to(roomId).emit('room_updated', room);
      }
    });
  });
}