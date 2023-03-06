import React, { useState } from 'react';
import AudioSelect from './components/audioSelect/audioSelect';
import AudioVisualiser from './components/audioVisualiser';
import Game from './components/game';
import { GuitarFretboard } from './components/guitarFredboard';
import { getStringFret } from './services/guitar';

export default function App() {
  const [{ type, preferredDeviceId }, setData] = useState({});

  return (
    <div>
      <h1>Guitar training</h1>
      {type ? (
        <>
          <Game />
        </>
      ) : (
        <AudioSelect onSelect={setData} />
      )}
      <>
        <br />
        <h4>Testing area</h4>
        <p>Sound not linked to game yet!</p>
        <AudioVisualiser inputType={type} preferredDeviceId={preferredDeviceId} />
        <p>Static Fretboard not linked</p>
        <GuitarFretboard notes={[getStringFret('E/3'), getStringFret('G/3'), getStringFret('C/4')]} />
      </>
    </div>
  );
}
