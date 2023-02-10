import React, { useState } from 'react';
import AudioSelect from './components/audioSelect/audioSelect';
import AudioVisualiser from './components/audioVisualiser';
import Game from './components/game';

export default function App() {
  const [{ type, preferredDeviceId }, setData] = useState({});

  return (
    <div>
      <h1>Guitar training</h1>
      {type ? (
        <>
          <Game />
          <p>Sound not linked to game yet!</p>
          <AudioVisualiser inputType={type} preferredDeviceId={preferredDeviceId} />
        </>
      ) : (
        <AudioSelect onSelect={setData} />
      )}
    </div>
  );
}
