import {useState} from 'react';
import {useSocketContext} from '../components/socketContext';
import {useRouter} from 'next/router';

export default function Game() {
  const {joinRoom} = useSocketContext();
  const router = useRouter();
  const [roomCode, setRoomCode] = useState('');

  const handleInput = e => {
    setRoomCode(e.target.value);
  };

  const handleCodeSubmit = e => {
    e.preventDefault();
    joinRoom(roomCode);
    router.push('/game');
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
