import React from 'react';
import { StaveTie } from 'vexflow';
import GuitarFretboard from '../components/guitarFredboard';
import GuitarTab from '../components/guitarTab';
import ImportXML from '../components/importXML';
import SingleStave from '../components/singleStave';
import { getFretboardPositions } from '../services/guitar';
import { getStaveChord, getStaveNote, getStaveRest } from '../services/staveNotes';
import { getTabChord, getTabNote } from '../services/tabNote';
import Metronome from '../components/metronome';
import RhythmRumble from '../components/games/rhythmRumble';
import NotationStation from '../components/games/notationStation';
import DoubleTrouble from '../components/games/doubleTrouble';
import TriadMaster from '../components/games/triadMaster';
import IntervalBoss from '../components/games/intervalBoss';

const TiedNotesExample = () => {
  const notes = [
    getStaveNote('C/5', 4),
    getStaveNote('C/5', 1),

    getStaveNote('C/5', 4, 'C', 'red'),
    getStaveNote('C/5', 3, 'C', 'red'),

    getStaveNote('C/5', 8),
    getStaveNote('C/5', 1),

    getStaveNote('C/5', 8, 'C', 'blue'),
    getStaveNote('C/5', 2, 'C', 'blue'),

    getStaveNote('C/5', 8),
    getStaveNote('C/5', 3),

    getStaveNote('C/5', 12, 'C', 'blue'),
    getStaveNote('C/5', 1, 'C', 'red'),

    getStaveNote('C/5', 12),
    getStaveNote('C/5', 2),

    getStaveNote('C/5', 12, 'C', 'red'),
    getStaveNote('C/5', 3, 'C', 'blue'),
  ];

  const notes2 = [
    getStaveChord(['C/5', 'E/5', 'G/5'], 1),
    getStaveChord(['C/5', 'E/5', 'G/5'], 4),
    getStaveChord(['C/5', 'E/5', 'G/5'], 2),
  ];

  return (
    <>
      <p>tied notes</p>
      <SingleStave
        timeSignature="4/4"
        staveNotes={notes}
        ties={notes
          .map((_, index) => {
            if (index % 2 === 1) {
              return new StaveTie({
                first_note: notes[index - 1],
                last_note: notes[index],
                first_indices: [0],
                last_indices: [0],
              });
            }
          })
          .filter(Boolean)}
      />
      <p>tied chords</p>
      <SingleStave
        timeSignature="2/4"
        staveNotes={notes2}
        ties={[
          new StaveTie({
            first_note: notes2[0],
            last_note: notes2[1],
            first_indices: [2],
            last_indices: [2],
          }),
          new StaveTie({
            first_note: notes2[1],
            last_note: notes2[2],
            first_indices: [0, 1, 2],
            last_indices: [0, 1, 2],
          }),
        ]}
      />
    </>
  );
};

export default function Debug() {
  return (
    <>
      <Metronome loop />
      {/* <AudioVisualiser inputType={type} preferredDeviceId={preferredDeviceId} /> */}
      <ImportXML />

      <h3>Games</h3>
      <NotationStation keySignature="D" note="C/4" lowestFret={3} highestFret={19} answer="C/5" />
      <DoubleTrouble
        keySignature="D"
        interval="P4"
        note="D/4"
        lowestFret={3}
        highestFret={19}
        answer={['D/4', 'F/4']}
      />
      <TriadMaster
        keySignature="Bb"
        triad={['C/4', 'E/4', 'G/4']}
        lowestFret={3}
        highestFret={19}
        answer={['Bb/4', 'D/4', 'F#/4']}
      />
      <IntervalBoss
        keySignature="Dm"
        note="C/4"
        interval="m3"
        isAbove
        lowestFret={3}
        highestFret={19}
        answer={['D/4', 'E/4']}
      />
      <RhythmRumble timeSignature="5/4" rhythm={[4, 2, '3r', 5, 1, 1, 4]} answer={[4, '2r', 2, 4, 1, 1, 6]} />

      <h4>Accidentals</h4>
      <SingleStave
        timeSignature="10/4"
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
        timeSignature="8/4"
        notes={['C/4', 'D/4', 'E/4', 'F/4', 'G/4', 'Ab/4', 'B/4', ['C/4', 'E/4', 'G/4', 'B/4']]}
        secondVoice={['C#/4', 'D/4', 'Eb/4', 'F#/4', 'G/4', 'A/4', 'Bb/4', ['C#/4', 'Eb/4', 'G/4', 'Bb/4']]}
        secondVoiceColor="steelblue"
      />

      <h4>Stave notes can be passed in directly with different colour notes</h4>
      <SingleStave
        staveNotes={[
          getStaveNote('C/4', 2, 'C', 'blue'),
          getStaveChord(['D/4', 'G/4', 'Bb/4'], 2),
          getStaveChord(['E/5', 'Ab/5']),
          getStaveChord(['C/5', 'G/4', 'C/4']),
          getStaveChord(['C/5', 'G/4', 'C/4']),
        ]}
        secondVoice={[
          getStaveNote('F#/4', 2, 'C', 'red'),
          getStaveChord(['F/4', 'G#/4', 'A/4'], 2, 'C', 'red'),
          getStaveChord(['E#/5', 'A/5'], 4, 'C', 'blue'),
          getStaveChord(['C/3', 'G/3', 'E/4'], 4, 'C', 'orange'),
          getStaveChord(['C/5', 'G/4', 'E/4'], 4, 'C', 'orange'),
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
        timeSignature="6/4"
        secondVoiceColor="red"
      />

      <h4>When using stave notes you need to pass in current accidentals for it work out next accidentals</h4>
      <SingleStave
        keySignature="Fm"
        staveNotes={[
          getStaveChord(['Db/4', 'G#/4', 'Bb/4'], 2, 'Fm'),
          getStaveChord(['Eb/5', 'Ab/5'], 2, 'Fm', 'orange'),
          getStaveNote('G/4', 2, 'Fm', 'red'),
          getStaveNote('G/4', 2, 'Fm', 'green', ['G#']),
        ]}
      />
      <h4>Guitar tabs</h4>
      <GuitarTab notes={['C/4']} />
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

      <h3>Rhythm</h3>
      <p>Doesn't force correct beats in time signature, but num_beats can causes to cut off</p>
      <SingleStave
        timeSignature="4/4"
        staveNotes={[
          getStaveNote('C/5', 1),
          getStaveNote('C/5', 2),
          getStaveNote('C/5', 3, 'C', 'blue'),
          getStaveNote('C/5', 4),
          getStaveNote('C/5', 6, 'C', 'blue'),
          getStaveNote('C/5', 8),
          getStaveNote('C/5', 12),
          getStaveNote('C/5', 16),
        ]}
      />

      <SingleStave
        timeSignature="6/8"
        staveNotes={[
          getStaveNote('C/5', 1),
          getStaveNote('C/5', 2, 'C', 'blue'),
          getStaveNote('C/5', 3),
          getStaveNote('C/5', 4),
          getStaveNote('C/5', 6, 'C', 'blue'),
          getStaveNote('C/5', 8),
          getStaveNote('C/5', 12),
          getStaveNote('C/5', 16),
        ]}
      />

      <p>Rests</p>
      <SingleStave
        staveNotes={[
          getStaveRest(1),
          getStaveRest(2),
          getStaveRest(3, 'blue'),
          getStaveRest(4),
          getStaveRest(6, 'orange', 'D/5'),
          getStaveRest(8),
          getStaveRest(12, 'red'),
          getStaveRest(16),
        ]}
      />

      <TiedNotesExample />

      <p>notes placed proportionally</p>
      <SingleStave
        timeSignature="6/8"
        staveNotes={[
          getStaveNote('C/5', 8),
          getStaveNote('C/5', 1),
          getStaveNote('C/5', 1),
          getStaveNote('C/5', 1),
          getStaveNote('C/5', 1),
        ]}
        secondVoice={[
          getStaveNote('C/5', 8, 'C', 'blue'),
          getStaveNote('C/5', 3, 'C', 'blue'),
          getStaveNote('C/5', 1, 'C', 'blue'),
        ]}
      />

      <p>2 voices, stem direction based on first note comparison</p>
      <SingleStave
        timeSignature="5/4"
        staveNotes={[getStaveNote('C/4', 4), getStaveNote('E/4', 4), getStaveNote('G/4', 12)]}
        secondVoice={[getStaveNote('E/5', 8), getStaveNote('D/5', 4), getStaveNote('C/5', 8)]}
      />

      <SingleStave
        timeSignature="4/4"
        staveNotes={[getStaveChord(['C/4', 'G/3'], 8), getStaveNote('E/4', 4), getStaveNote('G/4', 6)]}
        secondVoice={[
          getStaveNote('E/5', 4, 'C', 'blue'),
          getStaveNote('D/5', 2, 'C', 'blue'),
          getStaveRest(2, 'blue', 'F/5'),
          getStaveNote('B/4', 2, 'C', 'blue'),
          getStaveNote('C/4', 2, 'C', 'blue'),
          getStaveChord(['C/4', 'C/5'], 6, 'C', 'blue'),
        ]}
      />

      <p>force high notes and low notes stem direction</p>
      <SingleStave
        timeSignature="5/4"
        staveNotes={[
          getStaveNote('C/7', 2),
          getStaveNote('C/6', 2),
          getStaveNote('C/5', 2),
          getStaveNote('C/4', 2),
          getStaveNote('C/3', 2),
          getStaveNote('C/5', 2),
          getStaveNote('C/7', 4),
          getStaveNote('C/3', 4),
        ]}
        secondVoice={[
          getStaveNote('D/3', 4, 'C', 'blue'),
          getStaveNote('D/5', 4, 'C', 'blue'),
          getStaveNote('D/7', 4, 'C', 'blue'),
          getStaveNote('D/7', 4, 'C', 'blue'),
          getStaveNote('D/3', 4, 'C', 'blue'),
        ]}
      />

      <p>beam notes </p>
      <SingleStave
        timeSignature="5/4"
        keySignature="D"
        staveNotes={[
          [getStaveNote('F#/5', 2, 'D'), getStaveNote('D/5', 1), getStaveNote('E/5', 1)],
          [getStaveNote('F#/5', 1, 'D'), getStaveNote('D/5', 2), getStaveNote('G/5', 1)],
          [getStaveNote('D/4', 1), getStaveNote('E/4', 1), getStaveNote('F#/4', 2, 'D')],
          [getStaveNote('G/4', 1), getStaveRest(1), getStaveNote('B/4', 1), getStaveNote('C#/5', 1, 'D')],
          [getStaveNote('C#/5', 1, 'D'), getStaveNote('B/4', 1), getStaveNote('A/4', 1), getStaveNote('B/3', 1)],
        ]}
      />

      <p>Beams with chords</p>
      <SingleStave
        timeSignature="5/4"
        staveNotes={[
          [getStaveChord(['D/4', 'G/3'], 4)],
          [getStaveChord(['D/4', 'G/3'], 2), getStaveNote('C#/4', 1), getStaveNote('B/3', 1)],
          [
            getStaveChord(['A/3', 'F#/4'], 3),
            getStaveChord(['D/4', 'G/3'], 1),
            getStaveNote('B/3', 1),
            getStaveNote('D/5', 2),
          ],
          [getStaveNote('F#/5', 2), getStaveChord(['E/5', 'G/5'], 2)],
        ]}
      />

      <p>Beams with 2 voices</p>
      <SingleStave
        timeSignature="9/8"
        staveNotes={[
          [getStaveNote('F#/5', 2), getStaveNote('D/5', 2)],
          [getStaveNote('G/3', 4)],
          [getStaveNote('D/4', 8)],
        ]}
        secondVoice={[
          [getStaveNote('D/4', 4, 'C', 'blue')],
          [
            getStaveNote('D/5', 2, 'C', 'blue'),
            getStaveNote('C#/3', 1, 'C', 'blue'),
            getStaveNote('B/3', 1, 'C', 'blue'),
          ],
          [getStaveNote('A/3', 3, 'C', 'blue'), getStaveNote('E/3', 1, 'C', 'blue')],
          [getStaveNote('D/4', 4, 'C', 'blue')],
        ]}
      />

      <p>Same note rhythms will preserve stem direction</p>
      <SingleStave
        timeSignature="9/8"
        staveNotes={[
          [getStaveNote('G/5', 2), getStaveNote('G/5', 4)],
          [getStaveNote('G/5', 1), getStaveNote('G/5', 2), getStaveNote('G/5', 1), getStaveNote('G/5', 2)],
          [getStaveRest(3, 'black', 'G/5'), getStaveNote('G/5', 3)],
        ]}
        secondVoice={[
          [getStaveNote('D/4', 2), getStaveNote('D/4', 4)],
          [
            getStaveNote('D/4', -1),
            getStaveNote('D/4', 1),
            getStaveNote('D/4', 1),
            getStaveNote('D/4', 2),
            getStaveNote('D/4', 1),
          ],
          [getStaveNote('D/4', 1), getStaveNote('D/4', 2), getStaveNote('D/4', 2), getStaveNote('D/4', 1)],
        ]}
      />
    </>
  );
}
