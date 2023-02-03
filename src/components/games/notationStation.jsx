import React from 'react';
import { getRandomKey, getRandomNote } from '../../services/mock';
import { getNote } from '../../services/notes';
import SingleStave from '../singleStave';

export default function NotationStation() {
  const key = getRandomKey();
  const note = getNote(getRandomNote(), 4, key);

  return (
    <div>
      <h2>Notation Station</h2>
      <p>Play this note on any string</p>
      <SingleStave keySignature={key} notes={[note]} />
    </div>
  );
}
