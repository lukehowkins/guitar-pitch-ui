import React from 'react';
import { getFretboardPosition } from '../../services/guitar';
import { getStaveNote } from '../../services/staveNotes';
import { GuitarFretboard } from '../guitarFredboard';
import SingleStave from '../singleStave';

export default function NotationStation({ keySignature, note, lowestFret, highestFret, answer, onDone }) {
  const staveNote = getStaveNote(note, keySignature);
  const isCorrect = answer === note;
  const staveAnswer = answer && !isCorrect && [getStaveNote(answer, keySignature, 'red')];

  return (
    <div>
      <p>Play this note on any string</p>
      <SingleStave keySignature={keySignature} notes={[staveNote]} secondVoice={staveAnswer} />
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>{note}</p>
          <GuitarFretboard notes={[getFretboardPosition(note, lowestFret, highestFret)]} />
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
