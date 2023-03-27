import React, { useEffect, useRef } from 'react';
import { generateStaveWithNotes, generateStaveWithStaveNotes } from '../services/stave';

export default function SingleStave({ staveNotes, notes, keySignature = 'C', secondVoice, secondVoiceColor }) {
  const divRef = useRef();

  useEffect(() => {
    if (staveNotes) generateStaveWithStaveNotes(divRef.current, staveNotes, keySignature, secondVoice);
    else if (notes) generateStaveWithNotes(divRef.current, notes, keySignature, secondVoice, secondVoiceColor);
  }, [notes, keySignature, secondVoice, secondVoiceColor]);

  return <div ref={divRef} />;
}
