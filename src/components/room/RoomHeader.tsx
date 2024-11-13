import { useRoomStore } from '@/store/roomStore';
export function RoomHeader({ roomId }) {
  const { pdfUrl } = useRoomStore();
  
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Room ID: {roomId}</h1>
      {pdfUrl && (
        <button 
          className="btn"
          onClick={() => window.open(pdfUrl, '_blank')}
        >
          Open PDF
        </button>
      )}
    </header>
  );
}