import React, { useState } from 'react';
import AudioSelect from './components/audioSelect/audioSelect';
import AudioVisualiser from './components/audioVisualiser';
import Game from './components/game';
import { GuitarFretboard } from './components/guitarFredboard';
import { KeyboardFlow } from './components/keyboardFlow';
import { getFretboardPositions } from './services/guitar';

const MOCK_FLOW = true;

export default function App() {
  const [{ type, preferredDeviceId }, setData] = useState({});

  if (MOCK_FLOW) return <KeyboardFlow />;

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
        <GuitarFretboard notes={getFretboardPositions(['Eb/6'])} />
        <GuitarFretboard notes={getFretboardPositions(['F/2', 'C/3'])} />
        <GuitarFretboard notes={getFretboardPositions(['E/4', 'G/4', 'C/5'])} />
        <GuitarFretboard notes={getFretboardPositions(['G/4', 'D/5', 'A/5'])} />
      </>
    </div>
  );
}
