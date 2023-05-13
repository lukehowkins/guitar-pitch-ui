import React from 'react';
import SingleStave from '../singleStave';
import { getStaveNote } from '../../services/staveNotes';
import { BEATS_LABEL } from '../../constants/theory';

// TODO answer should always be array
export default function RhythmRumble({ timeSignature, rhythm, preferredNote = 'E/4', answer, onDone }) {
  const isCorrect = rhythm?.length === answer?.length && rhythm.every((beats, index) => beats == answer[index]);

  const staveNotes = rhythm.map((beats) => getStaveNote(preferredNote, beats));
  const staveAnswer = answer?.map((beats) => getStaveNote(preferredNote, beats, 'C', 'red'));

  return (
    <div>
      <p>Play this rhythm</p>
      <SingleStave
        timeSignature={timeSignature}
        staveNotes={staveNotes}
        secondVoice={!isCorrect && staveAnswer}
        secondVoiceColor="red"
      />
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>{rhythm.join(' ')}</p>
          <p>{rhythm.map((beats) => BEATS_LABEL[beats]).join(' ')}</p>
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
