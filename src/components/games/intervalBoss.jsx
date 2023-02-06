import React, { useState } from 'react';
import { getNoteAboveBelow, getStaveNote } from '../../services/notes';
import SingleStave from '../singleStave';

export default function TriadMaster({ keySignature, note, interval, isAbove }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const dir = isAbove ? 'above' : 'below';
  const baseNote = getStaveNote(note, keySignature);
  const intervalNote = showAnswer && getStaveNote(getNoteAboveBelow(isAbove, note, interval));
  const notes = [baseNote, intervalNote].filter(Boolean);

  return (
    <div>
      <h2>Interval Boss</h2>
      <p>Play the note and the note intervalled {dir}</p>
      {note && <SingleStave keySignature={keySignature} notes={notes} />}
      {interval} {dir}
      {!showAnswer && (
        <button type="button" onClick={() => setShowAnswer(true)}>
          Show answer
        </button>
      )}
    </div>
  );
}
