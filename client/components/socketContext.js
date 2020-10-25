import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');
export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'SnakeBoi',
    roomId: null,
  });

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

    return () => {
      socket.off('roomid');
      socket.off('connect');
    };
  }, [user]);

  const joinRoom = roomId => {
    socket.emit('join room', roomId);
  };

  const createRoom = () => {
    socket.emit('new room');
  };

  return (
    <SocketContext.Provider value={{ joinRoom, createRoom, user }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  return context;
};