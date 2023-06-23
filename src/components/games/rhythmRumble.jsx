import React from 'react';
import SingleStave from '../singleStave';
import { getStaveNote, getStaveTie } from '../../services/staveNotes';
import { getDurationLabel, groupRhythmPerBeat } from '../../services/rhythm';

const RHYTHM_NOTE = 'D/4';
const ANSWER_NOTE = 'G/5';

const getTies = (groupedBeats, staveNotes) => {
  if (!groupedBeats?.length || !staveNotes?.length) return [];
  const staveNotesFlat = staveNotes.flat();

  return groupedBeats
    .flat()
    .map((beat, index) => {
      if (beat < 0) return getStaveTie(staveNotesFlat[index - 1], staveNotesFlat[index]);
    })
    .filter(Boolean);
};

export default function RhythmRumble({ timeSignature, rhythm, answer, onDone }) {
  const isCorrect = rhythm?.length === answer?.length && rhythm.every((beats, index) => beats == answer[index]);

  const groupedRhythmBeats = groupRhythmPerBeat(rhythm, timeSignature);
  const groupedRhythmBeatsFlat = groupedRhythmBeats.flat();
  const groupedAnswerBeats = groupRhythmPerBeat(answer, timeSignature);

  const staveNotes = groupedRhythmBeats.map((group) => group.map((beats) => getStaveNote(RHYTHM_NOTE, beats)));
  const staveAnswer = groupedAnswerBeats?.map((group) =>
    group.map((beats) => getStaveNote(ANSWER_NOTE, beats, 'C', 'red')),
  );

  const ties = getTies(groupedRhythmBeats, staveNotes);
  const tiesAnswer = isCorrect ? [] : getTies(groupedAnswerBeats, staveAnswer);

  return (
    <div>
      <p>Play this rhythm</p>
      <SingleStave
        timeSignature={timeSignature}
        staveNotes={staveNotes}
        secondVoice={!isCorrect && staveAnswer}
        secondVoiceColor="red"
        ties={[...ties, ...tiesAnswer]}
      />
      {answer && (
        <>
          <h2>{isCorrect ? 'Correct' : 'Incorrect'}</h2>
          <p>Correct beats: {rhythm.join(' ')}</p>
          {!isCorrect && <p>Your beats: {answer.join(' ')}</p>}
          <p>
            Note names:
            {groupedAnswerBeats.flat().map(getDurationLabel).join(' ')}
          </p>
          {!isCorrect && (
            <p>
              Your note names:
              {groupedRhythmBeatsFlat.map(getDurationLabel).join(' ')}
            </p>
          )}
          <button type="button" onClick={() => onDone(isCorrect)}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
