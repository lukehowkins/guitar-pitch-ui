import React from 'react';
import { getFretboardPositions } from '../../services/guitar';
import { areChordsSame, getNoteAbove } from '../../services/notes';
import { getAccidentals, getStaveChord } from '../../services/staveNotes';
import { useUserStore } from '../../store/user';
import GuitarFretboard from '../guitarFredboard';
import GuitarTab from '../guitarTab';
import SingleStave from '../singleStave';

export default function DoubleTrouble({ keySignature, note, interval, lowestFret, highestFret, answer, onDone }) {
  const { showGuitarFretboard, showTab } = useUserStore();
  const doubleStop = [note, getNoteAbove(note, interval)];
  const staveDoubleStop = getStaveChord(doubleStop, keySignature);
  const isCorrect = areChordsSame(doubleStop, answer);
  const staveNotes = [
    staveDoubleStop,
    answer && !isCorrect && getStaveChord(answer, keySignature, 'red', getAccidentals(staveDoubleStop)),
  ].filter(Boolean);

  return (
    <div>
      <p>Play this double stop on any 2 adjacent strings</p>
      <SingleStave keySignature={keySignature} staveNotes={staveNotes} />
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>{doubleStop.join(' ')}</p>
          {showGuitarFretboard && (
            <GuitarFretboard notes={getFretboardPositions(doubleStop, lowestFret, highestFret)} />
          )}
          {showTab && <GuitarTab notes={[doubleStop]} lowestFret={lowestFret} highestFret={highestFret} />}
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
