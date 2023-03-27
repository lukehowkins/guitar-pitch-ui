import React from 'react';
import { getFretboardPositions } from '../../services/guitar';
import { getNoteAboveBelow } from '../../services/notes';
import { getStaveNote } from '../../services/staveNotes';
import { GuitarFretboard } from '../guitarFredboard';
import GuitarTab from '../guitarTab';
import SingleStave from '../singleStave';

export default function IntervalBoss({
  keySignature,
  note,
  interval,
  isAbove,
  lowestFret,
  highestFret,
  answer,
  onDone,
}) {
  const dir = isAbove ? 'above' : 'below';
  const intervalNote = getNoteAboveBelow(isAbove, note, interval);
  const isCorrect = answer?.[0] === note && answer?.[1] === intervalNote;
  const notes = [note, answer && intervalNote].filter(Boolean);

  return (
    <div>
      <p>Play the note and the note intervalled {dir}</p>
      {note && (
        <SingleStave
          keySignature={keySignature}
          notes={notes}
          secondVoice={!isCorrect && answer}
          secondVoiceColor="red"
        />
      )}
      {interval} {dir}
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>
            {intervalNote} is {interval} {dir} {note}
          </p>
          <GuitarFretboard notes={getFretboardPositions(notes, lowestFret, highestFret)} />
          <GuitarTab notes={notes} />
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
