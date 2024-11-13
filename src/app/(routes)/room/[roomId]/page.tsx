'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { socket } from '@/lib/socket';
import { PDFViewer } from '@/components/pdf/PDFViewer';
import { RoomHeader } from '@/components/room/RoomHeader';
import { ParticipantList } from '@/components/room/ParticipantList';
import { useRoomStore } from '@/store/roomStore';
export default function RoomPage() {
  const { roomId } = useParams();
  const { setRoomState } = useRoomStore();
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    // Socket connection logic
    socket.emit('join_room', { 
      roomId, 
      userName: `User_${Math.random().toString(36).substr(2, 9)}` 
    });
    socket.on('user_assigned', (user) => {
      setCurrentUser(user);
    });
    socket.on('room_updated', (roomState) => {
      setRoomState(roomState);
    });
    return () => {
      socket.off('user_assigned');
      socket.off('room_updated');
    };
  }, [roomId]);
  return (
    <div className="container mx-auto p-4">
      <RoomHeader roomId={roomId} />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <PDFViewer />
        </div>
        <ParticipantList />
      </div>
    </div>
  );
}