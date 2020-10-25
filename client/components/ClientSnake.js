import { useEffect, useRef, useState } from 'react';

// the current players game
export const ClientSnake = () => {
  const canvas = useRef(null);
  const headCoords = useRef({ x: 0, y: 0 });
  const dir = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    const { width, height } = canvas.current;
    const gridSize = 20;
    const tileSize = width / gridSize;

    ctx.fillRect(0, 0, width, height);
    const gameInterval = setInterval(() => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00ff00';
      ctx.fillRect(
        headCoords.current.x * tileSize,
        headCoords.current.y * tileSize,
        tileSize,
        tileSize
      );

      const { x, y } = headCoords.current;

      headCoords.current = { x: x + dir.current.x, y: y + dir.current.y };
      console.log('hello world');
    }, 1000 / 15);

    const keyHandler = e => {
      console.log(e.key);
      switch (e.key) {
        case 'ArrowRight':
          dir.current = { x: 1, y: 0 };
          break;
        case 'ArrowLeft':
          dir.current = { x: -1, y: 0 };
          break;
        case 'ArrowUp':
          dir.current = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
          dir.current = { x: 0, y: 1 };
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', keyHandler);

    return () => {
      clearInterval(gameInterval);
      window.removeEventListener('keydown', keyHandler);
    };
  }, [dir, headCoords]);

  return <canvas ref={canvas} width={500} height={500} />;
};
