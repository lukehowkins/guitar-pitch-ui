import React from 'react';
import GuitarFretboard from '../components/guitarFredboard';
import GuitarTab from '../components/guitarTab';
import ImportXML from '../components/importXML';
import SingleStave from '../components/singleStave';
import { getFretboardPositions } from '../services/guitar';
import { getStaveChord, getStaveNote } from '../services/staveNotes';
import { getTabChord, getTabNote } from '../services/tabNote';
import Metronome from '../components/metronome';

export default function Debug() {
  return (
    <>
      <Metronome loop />
      {/* <AudioVisualiser inputType={type} preferredDeviceId={preferredDeviceId} /> */}
      <ImportXML />

      <h4>Accidentals</h4>
      <SingleStave
        notes={[
          'Db/5',
          'D/5',
          ['D/4', 'F/4'],
          ['D/4', 'F#/4'],
          'D#/5',
          ['D#/5', 'F#/5'],
          ['D/5', 'F/5'],
          'D/5',
          'Db/4',
          'Db/4',
        ]}
      />

      <h4>Auto stem up and down</h4>
      <SingleStave
        keySignature="D"
        notes={['C#/6', ['C/6', 'E/6', 'G#/5'], ['Eb/5', 'G/6'], ['Eb/4', 'Gb/4 ']]}
        secondVoice={['C#/5', ['C/4', 'E/4', 'G#/4'], ['Eb/4', 'G/4'], ['Eb/5', 'Gb/5']]}
        secondVoiceColor="grey"
      />

      <h4>Same notes are drawn together, even if they have different accidentals (TODO fix somehow)</h4>
      <SingleStave
        keySignature="Dm"
        notes={['C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'Ab/4', 'B/4', ['C/4', 'E/4', 'G/4', 'B/4']]}
        secondVoice={['C#/4', 'D/4', 'Eb/4', 'F#/4', 'G/4', 'A/4', 'Bb/4', ['C#/4', 'Eb/4', 'G/4', 'Bb/4']]}
        secondVoiceColor="steelblue"
      />

      <h4>Stave notes can be passed in directly with different colour notes</h4>
      <SingleStave
        staveNotes={[
          getStaveNote('C/4', 'C', 'blue'),
          getStaveChord(['D/4', 'G/4', 'Bb/4']),
          getStaveChord(['E/5', 'Ab/5']),
          getStaveChord(['C/5', 'G/4', 'C/4']),
          getStaveChord(['C/5', 'G/4', 'C/4']),
        ]}
        secondVoice={[
          getStaveNote('F#/4', 'C', 'red'),
          getStaveChord(['F/4', 'G#/4', 'A/4'], 'C', 'red'),
          getStaveChord(['E#/5', 'A/5'], 'C', 'blue'),
          getStaveChord(['C/3', 'G/3', 'E/4'], 'C', 'orange'),
          getStaveChord(['C/5', 'G/4', 'E/4'], 'C', 'orange'),
        ]}
      />
      <h4>
        Notes over / under a certain note will always have stems down / up, and clashing chords both having stem in same
        direction
      </h4>
      <SingleStave
        notes={['Bb/4', ['Eb/4', 'F/4', 'A/4'], ['Ab/4', 'Ab/5'], ['F/2', 'A/2'], ['G/2', 'C#/3'], ['C#/7', 'E/7']]}
        secondVoice={[
          'Db/5',
          ['Eb/5', 'G#/4', 'A/4'],
          ['G#/4', 'Bb/5'],
          ['E/7', 'C/7'],
          ['Bb/2', 'D/3'],
          ['Bb/6', 'E/7'],
        ]}
        keySignature="D"
        secondVoiceColor="red"
      />

      <h4>When using stave notes you need to pass in current accidentals for it work out next accidentals</h4>
      <SingleStave
        keySignature="Fm"
        staveNotes={[
          getStaveChord(['Db/4', 'G#/4', 'Bb/4'], 'Fm'),
          getStaveChord(['Eb/5', 'Ab/5'], 'Fm', 'orange'),
          getStaveNote('G/4', 'Fm', 'red'),
          getStaveNote('G/4', 'Fm', 'green', ['G#']),
        ]}
      />

      <h4>Guitar tabs</h4>
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

      <h4>Guitar fretboards</h4>
      <GuitarFretboard notes={getFretboardPositions(['E/3', 'E/4', 'E/5'])} />
      <GuitarFretboard notes={getFretboardPositions(['Eb/7'])} />
      <GuitarFretboard notes={getFretboardPositions(['F/3', 'C/4'])} />
      <GuitarFretboard notes={getFretboardPositions(['E/5', 'G/5', 'C/6'])} />
      <GuitarFretboard notes={getFretboardPositions(['G/5', 'D/6', 'A/6'])} />
    </>
  );
}
