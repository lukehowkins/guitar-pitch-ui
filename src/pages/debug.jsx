import React from 'react';
import GuitarFretboard from '../components/guitarFredboard';
import GuitarTab from '../components/guitarTab';
import ImportXML from '../components/importXML';
import SingleStave from '../components/singleStave';
import { getFretboardPositions } from '../services/guitar';
import { getStaveChord, getStaveNote } from '../services/staveNotes';
import { getTabChord, getTabNote } from '../services/tabNote';

export default function Debug() {
  return (
    <>
      {/* <AudioVisualiser inputType={type} preferredDeviceId={preferredDeviceId} /> */}
      <ImportXML />
      <SingleStave
        staveNotes={[getStaveNote('C/4'), getStaveChord(['D/4', 'G/4', 'Bb/4']), getStaveChord(['E/5', 'Ab/5'])]}
        secondVoice={[
          getStaveNote('F#/4', 'C', 'red'),
          getStaveChord(['F/4', 'G#/4', 'A/4'], 'C', 'red'),
          getStaveChord(['E#/5', 'A/5'], 'C', 'blue'),
        ]}
      />
      <SingleStave
        notes={['Bb/4', ['Eb/4', 'F/4', 'A/4'], ['Ab/4', 'Ab/5']]}
        secondVoice={['Db/5', ['Eb/5', 'G#/4', 'A/4'], ['G#/4', 'Bb/5']]}
        keySignature="D"
        secondVoiceColor="red"
      />
      <GuitarTab notes={['C/4', ['D/4', 'G/4', 'Bb/4'], ['F/5', 'Ab/5']]} />
      <GuitarTab tabNotes={[getTabNote('C/5'), getTabChord(['D/5', 'G/5', 'Bb/5']), getTabChord(['F/6', 'Ab/6'])]} />
      <GuitarTab
        positions={[
          { str: 3, fret: 5 },
          [
            { str: 2, fret: 6 },
            { str: 1, fret: 7 },
          ],
        ]}
      />

      <GuitarFretboard notes={getFretboardPositions(['Eb/7'])} />
      <GuitarFretboard notes={getFretboardPositions(['F/3', 'C/4'])} />
      <GuitarFretboard notes={getFretboardPositions(['E/5', 'G/5', 'C/6'])} />
      <GuitarFretboard notes={getFretboardPositions(['G/5', 'D/6', 'A/6'])} />
    </>
  );
}
