import { useEffect, useRef, useState } from 'react';

const gridSize = 25;

// the current players game
export const ClientSnake = () => {
  const [score, setScore] = useState(3);
  const trail = useRef([]);
  const canvas = useRef(null);
  const headCoords = useRef({ x: 0, y: 0 });
  const dir = useRef({ x: 0, y: 0 });
  const appleCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const appleX = Math.floor(Math.random() * gridSize);
    const appleY = Math.floor(Math.random() * gridSize);
    appleCoords.current = { x: appleX, y: appleY };
  }, []);

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    const { width, height } = canvas.current;
    const tileSize = width / gridSize;

    const gameInterval = setInterval(() => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#ff0000';
      ctx.fillRect(
        appleCoords.current.x * tileSize,
        appleCoords.current.y * tileSize,
        tileSize,
        tileSize
      );
      ctx.fillStyle = '#00ff00';
      ctx.fillRect(
        headCoords.current.x * tileSize,
        headCoords.current.y * tileSize,
        tileSize,
        tileSize
      );

      while (trail.current.length > score) trail.current.pop();

      const { x, y } = headCoords.current;

      for (let i = 0; i < trail.current.length; i++) {
        ctx.fillStyle = '#00ff00';
        const cell = trail.current[i];
        if (cell.x === x && cell.y === y) {
          setScore(3);
        }
        ctx.fillRect(cell.x * tileSize, cell.y * tileSize, tileSize, tileSize);
      }

      if (x > gridSize - 1) {
        headCoords.current.x = 0;
      }
      if (y > gridSize - 1) {
        headCoords.current.y = 0;
      }
      if (x < 0) {
        headCoords.current.x = gridSize - 1;
      }
      if (y < 0) {
        headCoords.current.y = gridSize - 1;
      }

      trail.current.unshift(headCoords.current);

      headCoords.current = {
        x: headCoords.current.x + dir.current.x,
        y: headCoords.current.y + dir.current.y,
      };

      if (x === appleCoords.current.x && y === appleCoords.current.y) {
        setScore(score + 1);
        const appleX = Math.floor(Math.random() * gridSize);
        const appleY = Math.floor(Math.random() * gridSize);
        appleCoords.current = { x: appleX, y: appleY };
      }
    }, 1000 / 15);

    const keyHandler = e => {
      // console.log(e.key);
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
  }, [score]);

  return <canvas ref={canvas} width={500} height={500} />;
};
