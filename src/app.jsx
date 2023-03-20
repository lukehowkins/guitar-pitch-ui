import React from 'react';
// import AudioVisualiser from './components/audioVisualiser';
import { GuitarFretboard } from './components/guitarFredboard';
import { KeyboardFlow } from './components/keyboardFlow';
import SingleStave from './components/singleStave';
import { getFretboardPositions } from './services/guitar';
import { getStaveChord, getStaveNote } from './services/staveNotes';

const MOCK_FLOW = true;

export default function App() {
  return (
    <div>
      <h1>Guitar training</h1>
      {MOCK_FLOW && <KeyboardFlow />}
      <>
        <br />
        <h4>Testing area</h4>
        <p>Sound not linked to game yet!</p>
        {/* <AudioVisualiser inputType={type} preferredDeviceId={preferredDeviceId} /> */}
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
