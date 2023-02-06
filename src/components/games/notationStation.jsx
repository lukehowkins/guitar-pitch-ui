import React from 'react';
import { getStaveNote } from '../../services/notes';
import SingleStave from '../singleStave';

export default function NotationStation({ keySignature, note }) {
  const staveNote = getStaveNote(note, keySignature);

  return (
    <div>
      <h2>Notation Station</h2>
      <p>Play this note on any string</p>
      <SingleStave keySignature={keySignature} notes={[staveNote]} />
    </div>
  );
}
