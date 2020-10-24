import { useState } from 'react';
import { useSocketContext } from '../components/socketContext';

export default function Createroom() {
  const { user, createRoom } = useSocketContext();
  return (
    <div>
      <button onClick={createRoom}>Create new Game</button>
      {user.roomId && <h1>your room id is: {user.roomId}</h1>}
    </div>
  );
}
