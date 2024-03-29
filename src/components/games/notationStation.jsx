import React from 'react';
import { getFretboardPosition } from '../../services/guitar';
import { useUserStore } from '../../store/user';
import GuitarFretboard from '../guitarFredboard';
import SingleStave from '../singleStave';
import GuitarTab from '../guitarTab';

export default function NotationStation({ keySignature, note, lowestFret, highestFret, answer, onDone }) {
  const { showGuitarFretboard, showTab } = useUserStore();
  const isCorrect = answer === note;

  return (
    <div>
      <p>Play this note on any string</p>
      <SingleStave
        keySignature={keySignature}
        notes={[note]}
        secondVoice={!isCorrect && answer && [answer]}
        secondVoiceColor="red"
      />
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>{note}</p>
          {showGuitarFretboard && <GuitarFretboard notes={[getFretboardPosition(note, lowestFret, highestFret)]} />}
          {showTab && <GuitarTab notes={[note]} lowestFret={lowestFret} highestFret={highestFret} />}
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
