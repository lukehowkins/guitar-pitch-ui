import React from 'react';
import { getFretboardPositions } from '../../services/guitar';
import { getNoteAboveBelow, getStaveNote } from '../../services/notes';
import { GuitarFretboard } from '../guitarFredboard';
import SingleStave from '../singleStave';

export default function IntervalBoss({ keySignature, note, interval, isAbove, answer, onDone }) {
  const dir = isAbove ? 'above' : 'below';
  const baseStaveNote = getStaveNote(note, keySignature);
  const intervalNote = getNoteAboveBelow(isAbove, note, interval);
  const intervalStaveNote = answer && getStaveNote(intervalNote);
  const notes = [baseStaveNote, intervalStaveNote].filter(Boolean);

  const isCorrect = answer?.[0] === note && answer?.[1] === intervalNote;

  return (
    <div>
      <h2>Interval Boss</h2>
      <p>Play the note and the note intervalled {dir}</p>
      {note && <SingleStave keySignature={keySignature} notes={notes} />}
      {interval} {dir}
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>
            {intervalNote} is {interval} {dir} {note}
          </p>
          <GuitarFretboard notes={getFretboardPositions([note, intervalNote])} />
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
