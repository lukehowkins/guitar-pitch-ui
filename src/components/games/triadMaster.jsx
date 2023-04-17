import React from 'react';
import { getFretboardPositions } from '../../services/guitar';
import { areChordsSame } from '../../services/notes';
import { getAccidentals, getStaveChord } from '../../services/staveNotes';
import { useUserStore } from '../../store/user';
import GuitarFretboard from '../guitarFredboard';
import GuitarTab from '../guitarTab';
import SingleStave from '../singleStave';

export default function TriadMaster({ keySignature, triad, lowestFret, highestFret, answer, onDone }) {
  const { showGuitarFretboard, showTab } = useUserStore();
  const staveChord = getStaveChord(triad, keySignature);
  const isCorrect = areChordsSame(triad, answer);
  const staveNotes = [
    staveChord,
    answer && !isCorrect && getStaveChord(answer, keySignature, 'red', getAccidentals(staveChord)),
  ].filter(Boolean);

  return (
    <div>
      <p>Play this triad on any 3 adjacent strings</p>
      <SingleStave keySignature={keySignature} staveNotes={staveNotes} />
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>{triad.join(' ')}</p>
          {showGuitarFretboard && <GuitarFretboard notes={getFretboardPositions(triad, lowestFret, highestFret)} />}
          {showTab && <GuitarTab notes={[triad]} lowestFret={lowestFret} highestFret={highestFret} />}
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
