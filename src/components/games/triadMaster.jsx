import React from 'react';
import { getRandomKey, getRandomTriad } from '../../services/mock';
import { getStaveChord } from '../../services/notes';
import SingleStave from '../singleStave';

export default function TriadMaster() {
  const key = getRandomKey();
  const chord = getStaveChord(getRandomTriad(), key);

  return (
    <div>
      <h2>Triad Master</h2>
      <p>Play this triad on any 3 adjacent strings</p>
      <SingleStave keySignature={key} notes={[chord]} />
    </div>
  );
}
