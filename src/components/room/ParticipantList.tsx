import { useRoomStore } from '@/store/roomStore';
export function ParticipantList() {
  const { users } = useRoomStore();
  return (
    <aside className="bg-gray-100 p-4 rounded">
      <h2 className="font-bold">Participants</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.role})
          </li>
        ))}
      </ul>
    </aside>
  );
}