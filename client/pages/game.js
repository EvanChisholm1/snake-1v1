import { useState } from 'react';
import { useSocketContext } from '../components/socketContext';

export default function Game() {
  const { joinRoom } = useSocketContext();
  const [roomCode, setRoomCode] = useState('');

  const handleInput = e => {
    setRoomCode(e.target.value);
  };

  const handleCodeSubmit = e => {
    e.preventDefault();
    joinRoom(roomCode);
  };
  return (
    <div>
      <form onSubmit={handleCodeSubmit}>
        <label htmlFor="roomid">enter room code: </label>
        <input
          name="roomid"
          type="text"
          onChange={handleInput}
          value={roomCode}
        />
        <button>submit</button>
      </form>
    </div>
  );
}
