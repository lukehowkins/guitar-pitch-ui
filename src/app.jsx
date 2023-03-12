import React, { useState } from 'react';
import AudioSelect from './components/audioSelect/audioSelect';
import AudioVisualiser from './components/audioVisualiser';
import Game from './components/game';
import { GuitarFretboard } from './components/guitarFredboard';
import { KeyboardFlow } from './components/keyboardFlow';
import SingleStave from './components/singleStave';
import { getFretboardPositions } from './services/guitar';
import { getStaveChord, getStaveNote } from './services/staveNotes';

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
        <SingleStave
          notes={[getStaveNote('C/4'), getStaveChord(['D/4', 'G/4', 'Bb/4']), getStaveChord(['E/5', 'Ab/5'])]}
          secondVoice={[
            getStaveNote('F#/4', 'C', 'red'),
            getStaveChord(['F/4', 'G#/4', 'A/4'], 'C', 'red'),
            getStaveChord(['E#/5', 'A/5'], 'C', 'blue'),
          ]}
        />
        <GuitarFretboard notes={getFretboardPositions(['Eb/7'])} />
        <GuitarFretboard notes={getFretboardPositions(['F/3', 'C/4'])} />
        <GuitarFretboard notes={getFretboardPositions(['E/5', 'G/5', 'C/6'])} />
        <GuitarFretboard notes={getFretboardPositions(['G/5', 'D/6', 'A/6'])} />
      </>
    </div>
  );
}
