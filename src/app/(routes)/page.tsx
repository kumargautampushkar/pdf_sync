'use client';
import { useState } from 'react';
import { generateRoomId } from '@/utils/generateRoomId';
import { useRouter } from 'next/navigation';
export default function Home() {
  const [roomId, setRoomId] = useState('');
  const router = useRouter();
  const handleJoinRoom = () => {
    if (roomId) {
      router.push(`/room/${roomId}`);
    } else {
      alert('Please enter a Room ID');
    }
  };
  const handleGenerateRoomId = () => {
    const newRoomId = generateRoomId();
    setRoomId(newRoomId);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">PDF Co-Viewer</h1>
      <input 
        type="text" 
        placeholder="Enter Room ID" 
        value={roomId} 
        onChange={(e) => setRoomId(e.target.value)} 
        className="mt-4 p-2 border rounded"
      />
      <button onClick={handleJoinRoom} className="mt-2 p-2 bg-blue-500 text-white rounded">
        Join Room
      </button>
      <button onClick={handleGenerateRoomId} className="mt-2 p-2 bg-green-500 text-white rounded">
        Generate Random Room ID
      </button>
    </div>
  );
}