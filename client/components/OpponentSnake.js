import {useEffect} from 'react';
import {useSocketContext} from './socketContext';

export const OpponentSnake = () => {
  const {trail} = useSocketContext();
  useEffect(() => {
    console.log(trail);
  }, [trail]);
  return (
    <canvas />
  )
}

