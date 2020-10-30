import {useRouter} from 'next/router';
import {useSocketContext} from '../components/socketContext';

export default function Createroom() {
  const router = useRouter();
  const {user, createRoom} = useSocketContext();

  const onCreateRoom = () => {
    createRoom();
    router.push('/game');
  };

  return (
    <div>
      <button onClick={onCreateRoom}>Create new Game</button>
      {user.roomId && <h1>your room id is: {user.roomId}</h1>}
    </div>
  );
}
