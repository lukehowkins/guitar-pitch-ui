import React from 'react';
import { getRandomInterval, getRandomKey, getRandomNote } from '../../services/mock';
import { getStaveChord, getNoteAbove } from '../../services/notes';
import SingleStave from '../singleStave';

export default function DoubleTrouble() {
  const key = getRandomKey();
  const baseNote = getRandomNote();
  const interval = getRandomInterval(3, 8);
  const chord = getStaveChord([baseNote, getNoteAbove(baseNote, interval)], key);
  return (
    <div>
      <h2>Double Trouble</h2>
      <p>Play this double stop on any 2 adjacent strings</p>
      <SingleStave keySignature={key} notes={[chord]} />
    </div>
  );
}
