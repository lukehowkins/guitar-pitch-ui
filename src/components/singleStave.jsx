import React, { useEffect, useRef } from 'react';
import { generateStaveWithNotes } from '../services/stave';

export default function SingleStave({ notes = [], keySignature = 'C' }) {
  const divRef = useRef();

  useEffect(() => {
    generateStaveWithNotes(divRef.current, notes, keySignature);
  }, [keySignature, notes]);

  return <div ref={divRef} />;
}
