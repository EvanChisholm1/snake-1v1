import {ClientSnake} from '../components/ClientSnake';
import {useSocketContext} from '../components/socketContext';
import {OpponentSnake} from '../components/OpponentSnake';

export default function JoinGame() {
  const {user} = useSocketContext();
  return (
    <div>
      <h1>Game</h1>
      {user.roomId && <h2>share this code with a friend: {user.roomId}</h2>}
      <ClientSnake />
      <OpponentSnake />
    </div>
  );
}
