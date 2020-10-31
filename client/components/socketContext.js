import {createContext, useContext, useEffect, useState} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');
export const SocketContext = createContext();

export const SocketProvider = ({children}) => {
  const [user, setUser] = useState({
    name: 'SnakeBoi',
    roomId: null,
  });
  const [opponentTrail, setOpponentTrail] = useState([]);

  const [isGameRunning, setGameRunning] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to socket');
    });

    socket.on('roomid', roomId => {
      setUser({
        ...user,
        roomId: roomId,
      });
    });

    socket.on('gamestart', () => {
      setGameRunning(true);
    })

    socket.on('gameend', () => {
      setGameRunning(false);
    })

    socket.on('pos', (pos) => {
      console.log(pos)
      setOpponentTrail(pos);
    });

    return () => {
      socket.off('roomid');
      socket.off('connect');
      socket.off('gamestart');
    };
  }, [user]);

  const joinRoom = roomId => {
    socket.emit('join room', roomId);
  };

  const createRoom = () => {
    socket.emit('new room');
  };

  const emitPos = (trail) => {
    socket.emit('pos', trail);
  }

  return (
    <SocketContext.Provider value={{opponentTrail, joinRoom, createRoom, user, emitPos, isGameRunning}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  return context;
};
