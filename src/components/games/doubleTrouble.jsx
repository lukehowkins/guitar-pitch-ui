import React from 'react';
import { getStaveChord, getNoteAbove } from '../../services/notes';
import SingleStave from '../singleStave';

export default function DoubleTrouble({ keySignature, note, interval }) {
  const staveChord = getStaveChord([note, getNoteAbove(note, interval)], keySignature);
  return (
    <div>
      <h2>Double Trouble</h2>
      <p>Play this double stop on any 2 adjacent strings</p>
      <SingleStave keySignature={keySignature} notes={[staveChord]} />
    </div>
  );
}
