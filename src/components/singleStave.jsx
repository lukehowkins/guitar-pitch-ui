import './stave.scss';
import React, { useEffect, useRef } from 'react';
import { generateStaveWithNotes, generateStaveWithStaveNotes } from '../services/stave';

function SingleStave({
  staveNotes,
  notes,
  keySignature = 'C',
  timeSignature = '4/4',
  secondVoice,
  secondVoiceColor,
  ties,
}) {
  const divRef = useRef();

  useEffect(() => {
    if (staveNotes) {
      generateStaveWithStaveNotes(divRef.current, staveNotes, keySignature, timeSignature, secondVoice, ties);
    } else if (notes) {
      generateStaveWithNotes(divRef.current, notes, keySignature, timeSignature, secondVoice, secondVoiceColor);
    }
  }, [staveNotes, notes, keySignature, timeSignature, secondVoice, secondVoiceColor, ties]);

  return <div className="stave" ref={divRef} />;
}

export default SingleStave;
