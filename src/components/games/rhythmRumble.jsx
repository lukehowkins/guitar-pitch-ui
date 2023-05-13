import React from 'react';
import SingleStave from '../singleStave';
import { getStaveNote } from '../../services/staveNotes';
import { DURATION_LABELS } from '../../constants/theory';

// TODO answer should always be array
export default function RhythmRumble({ timeSignature, rhythm, preferredNote = 'E/4', answer, onDone }) {
  const isCorrect =
    rhythm?.length === answer?.length && rhythm.every((duration1, index) => duration1 === answer[index]);

  const staveNotes = rhythm.map((duration) => getStaveNote(preferredNote, duration));
  const staveAnswer = answer?.map((duration) => getStaveNote(preferredNote, duration, 'C', 'red'));

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
          <p>{rhythm.map((duration) => DURATION_LABELS[duration]).join(' ')}</p>
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
