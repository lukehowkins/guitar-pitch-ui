import React from 'react';
import { getFretboardPositions } from '../../services/guitar';
import { areChordsSame } from '../../services/notes';
import { getStaveChord } from '../../services/staveNotes';
import { GuitarFretboard } from '../guitarFredboard';
import SingleStave from '../singleStave';

export default function TriadMaster({ keySignature, triad, answer, onDone }) {
  const chord = getStaveChord(triad, keySignature);
  const isCorrect = areChordsSame(triad, answer);

  return (
    <div>
      <h2>Triad Master</h2>
      <p>Play this triad on any 3 adjacent strings</p>
      <SingleStave keySignature={keySignature} notes={[chord]} />
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>{triad.join(' ')}</p>
          <GuitarFretboard notes={getFretboardPositions(triad)} />
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
