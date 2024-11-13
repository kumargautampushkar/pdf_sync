import { create } from 'zustand';
interface RoomState {
  roomId: string;
  currentPage: number;
  pdfUrl: string;
  users: User[];
  setRoomState: (state: Partial<RoomState>) => void;
}
export const useRoomStore = create<RoomState>((set) => ({
  roomId: '',
  currentPage: 1,
  pdfUrl: '',
  users: [],
  setRoomState: (newState) => set((state) => ({ ...state, ...newState }))
}));