import {
  useEffect,
  useRef,
} from 'react';

import { Input } from 'excalibur';

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
      void game.start();

      game.input.keyboard.on("hold", (event: Input.KeyEvent) => {
        const speed = 5;
        switch (event.key) {
          case Input.Keys.W:
            player.vel.y -= speed;
            break;
          case Input.Keys.S:
            player.vel.y += speed;
            break;
          case Input.Keys.A:
            player.vel.x -= speed;
            break;
          case Input.Keys.D:
            player.vel.x += speed;
            break;
        }
        player.vel.normalize();

      });
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
