import {
  useEffect,
  useState,
} from 'react';

import { Player } from '../modules/Player';

interface DebugScreenProps {
  player: Player;
}

function DebugScreen({ player }: DebugScreenProps) {
  const [velX, setvelX] = useState(player.vel.x);
  const [velY, setvelY] = useState(player.vel.y);
  useEffect(() => {
    const interval = setInterval(() => {
      setvelX(player.vel.x);
      setvelY(player.vel.y);
    }, 50);
    return () => clearInterval(interval);
  }, [player.vel.x, player.vel.y]);

  return (
    <div className="debug">
      <p>Horizontal Velocity: {velX}</p>
      <p>Vertical Velocity: {velY}</p>
    </div>
  );
}

export default DebugScreen;
