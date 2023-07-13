import { useState } from 'react';

import DebugScreen from './components/DebugScreen';
import GameComponent from './components/GameComponent';
import { Player } from './modules/Player';

function App() {
  const [showDebug, setshowDebug] = useState(true) //temp
  const player = new Player();
  return (
    <>
      <GameComponent player={player} />
      {showDebug && <DebugScreen player={player} />}
      <button onClick={() => setshowDebug(!showDebug)}>Toggle Debug Mode</button>
    </>
  );
}

export default App;
