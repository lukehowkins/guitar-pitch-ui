import React, { useEffect, useRef } from 'react';
import { generateStaveWithNotes, generateStaveWithStaveNotes } from '../services/stave';

export default function SingleStave({
  staveNotes,
  notes,
  keySignature = 'C',
  timeSignature = '4/4',
  secondVoice,
  secondVoiceColor,
}) {
  const divRef = useRef();

  useEffect(() => {
    if (staveNotes) generateStaveWithStaveNotes(divRef.current, staveNotes, keySignature, timeSignature, secondVoice);
    else if (notes) {
      generateStaveWithNotes(divRef.current, notes, keySignature, timeSignature, secondVoice, secondVoiceColor);
    }
  }, [staveNotes, notes, keySignature, timeSignature, secondVoice, secondVoiceColor]);

  return <div ref={divRef} />;
}
