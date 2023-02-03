import React, { useEffect, useState } from 'react';
import { getRandomKey, getRandomNote, getRandomInterval } from '../../services/mock';
import { getNoteAboveBelow, getStaveNote } from '../../services/notes';
import SingleStave from '../singleStave';

export default function TriadMaster() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [{ key, note, interval, isAbove }, setData] = useState({});
  const dir = isAbove ? 'above' : 'below';
  const baseNote = note && getStaveNote(note, key);
  const intervalNote = showAnswer && getStaveNote(getNoteAboveBelow(isAbove, note, interval));
  const notes = [baseNote, intervalNote].filter(Boolean);

  useEffect(() => {
    setData({
      key: getRandomKey(),
      note: getRandomNote(),
      interval: getRandomInterval(),
      isAbove: Math.random() > 0.5,
    });
  }, []);

  return (
    <div>
      <h2>Interval Boss</h2>
      <p>Play the note and the note intervalled {dir}</p>
      {note && <SingleStave keySignature={key} notes={notes} />}
      {interval} {dir}
      {!showAnswer && (
        <button type="button" onClick={() => setShowAnswer(true)}>
          Show answer
        </button>
      )}
    </div>
  );
}
