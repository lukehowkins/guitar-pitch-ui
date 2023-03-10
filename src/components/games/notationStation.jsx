import React, { useState } from 'react';
import { getFretboardPosition } from '../../services/guitar';
import { getStaveNote } from '../../services/notes';
import { GuitarFretboard } from '../guitarFredboard';
import SingleStave from '../singleStave';

export default function NotationStation({ keySignature, note, answer, onDone }) {
  const staveNote = getStaveNote(note, keySignature);
  const isCorrect = answer === note;

  return (
    <div>
      <h2>Notation Station</h2>
      <p>Play this note on any string</p>
      <SingleStave keySignature={keySignature} notes={[staveNote]} />
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>{note}</p>
          <GuitarFretboard notes={[getFretboardPosition(note)]} />
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}