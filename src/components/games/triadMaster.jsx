import React from 'react';
import { getStaveChord } from '../../services/notes';
import SingleStave from '../singleStave';

export default function TriadMaster({ keySignature, triad }) {
  const chord = getStaveChord(triad, keySignature);

  return (
    <div>
      <h2>Triad Master</h2>
      <p>Play this triad on any 3 adjacent strings</p>
      <SingleStave keySignature={keySignature} notes={[chord]} />
    </div>
  );
}
