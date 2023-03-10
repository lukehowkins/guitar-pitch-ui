import React from 'react';
import { getFretboardPositions } from '../../services/guitar';
import { getStaveChord, getNoteAbove, areChordsSame } from '../../services/notes';
import { GuitarFretboard } from '../guitarFredboard';
import SingleStave from '../singleStave';

export default function DoubleTrouble({ keySignature, note, interval, answer, onDone }) {
  const notes = [note, getNoteAbove(note, interval)];
  const staveChord = getStaveChord(notes, keySignature);
  const isCorrect = areChordsSame(notes, answer);

  return (
    <div>
      <h2>Double Trouble</h2>
      <p>Play this double stop on any 2 adjacent strings</p>
      <SingleStave keySignature={keySignature} notes={[staveChord]} />
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>{notes.join(' ')}</p>
          <GuitarFretboard notes={getFretboardPositions(notes)} />
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
