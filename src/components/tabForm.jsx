import { useState } from 'react';
import GuitarTab from '../components/guitarTab';
import { getNoteInfo, shiftNote } from '../services/notes';
import { getNote } from '../services/guitar';

const convertStringToNotes = (str) => {
  if (!str) return undefined;

  const arr = str.replaceAll(' ', '').split(',');

  const noteInfos = arr.map((s) => {
    try {
      if (getNoteInfo(s)) return s;
    } catch {
      // ignore
    }
    return '';
  });

  return noteInfos.filter(Boolean);
};

const convertStringToPositions = (str) => {
  if (!str) return undefined;

  const arr = str.replaceAll(' ', '').split(',');

  return arr
    .map((s) => {
      const [str = '', fret = ''] = s.split('/');
      if (!str || !fret) return null;
      return { str: +str, fret: +fret };
    })
    .filter(Boolean);
};

const convertPositionsToNotes = (positions) => {
  return positions
    .map(({ str, fret }) => {
      try {
        return shiftNote(getNote(fret, str), 12);
      } catch {
        return '';
      }
    })
    .filter(Boolean);
};

const REPOSITION = false;
const DEFAULT_VALUE = '';

export default function TabForm() {
  const [notesStr, setNotesStr] = useState('');
  const [positionsStr, setPositionsStr] = useState(DEFAULT_VALUE);
  const positions = convertStringToPositions(positionsStr);
  const notes = positions && REPOSITION ? convertPositionsToNotes(positions) : convertStringToNotes(notesStr);

  return (
    <>
      Notes: <input onInput={(e) => setNotesStr(e.target.value)} value={notesStr} disabled={positionsStr.length} />
      Positions:{' '}
      <input onInput={(e) => setPositionsStr(e.target.value)} value={positionsStr} disabled={notesStr.length} />
      <br />
      {!!(notes?.length || positions?.length) && <GuitarTab notes={notes} positions={!REPOSITION && positions} />}
    </>
  );
}
