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
  const [jumpTime, setjumpTime] = useState(player.jumpTimeCounter);
  const [airborne, setairborne] = useState(player.isAirborne);
  const [direction, setDirection] = useState(player.facing);
  const [keysHeld, setKeysHeld] = useState(player.keysHeld)
  useEffect(() => {
    const interval = setInterval(() => {
      setvelX(player.vel.x);
      setvelY(player.vel.y);
      setjumpTime(player.jumpTimeCounter);
      setairborne(player.isAirborne);
      setDirection(player.facing);
      setKeysHeld(player.keysHeld)
    }, 50);
    return () => clearInterval(interval);
  });

  return (
    <div className="debug">
      <p>Horizontal Velocity: {velX}</p>
      <p>Vertical Velocity: {velY}</p>
      <p>Jump time: {jumpTime}</p>
      <p>Is Airborne: {airborne ? "Yes" : "No"}</p>
      <p>Facing: {direction}</p>
      <p>Keys Held: {keysHeld.toString()}</p>
    </div>
  );
}

export default DebugScreen;
