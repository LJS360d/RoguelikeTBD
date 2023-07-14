import {
  useEffect,
  useRef,
} from 'react';

import Game from '../modules/Game';
import { Player } from '../modules/Player';

interface GameComponentProps {
  player: Player;
}
function GameComponent({ player }: GameComponentProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const game: Game = new Game(canvasRef.current);
      game.addPlayer(player);
      void game.initialize();

    
    }
  });

  return (
    <>
      <canvas ref={canvasRef} />
      <div className="debug">{/* TODO Debug screen */}</div>
    </>
  );
}

export default GameComponent;
