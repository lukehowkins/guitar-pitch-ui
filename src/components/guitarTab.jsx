import React, { useEffect, useRef } from 'react';
import { generateTabWithNotes, generateTabWithPositions, generateTabWithTabNotes } from '../services/tab';

export default function GuitarTab({ tabNotes, notes, positions }) {
  const divRef = useRef();

  useEffect(() => {
    if (positions) generateTabWithPositions(divRef.current, positions);
    else if (tabNotes) generateTabWithTabNotes(divRef.current, tabNotes);
    else if (notes) generateTabWithNotes(divRef.current, notes);
  }, [tabNotes, notes]);

  return <div ref={divRef} />;
}
