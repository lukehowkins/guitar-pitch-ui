import React from 'react';
import { getFretboardPositions } from '../../services/guitar';
import { areChordsSame } from '../../services/notes';
import { getStaveChord } from '../../services/staveNotes';
import { GuitarFretboard } from '../guitarFredboard';
import SingleStave from '../singleStave';

export default function TriadMaster({ keySignature, triad, lowestFret, highestFret, answer, onDone }) {
  const chord = getStaveChord(triad, keySignature);
  const isCorrect = areChordsSame(triad, answer);
  const notes = [chord, answer && !isCorrect && getStaveChord(answer, keySignature, 'red')].filter(Boolean);

  return (
    <div>
      <p>Play this triad on any 3 adjacent strings</p>
      <SingleStave keySignature={keySignature} notes={notes} />
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>{triad.join(' ')}</p>
          <GuitarFretboard notes={getFretboardPositions(triad, lowestFret, highestFret)} />
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
