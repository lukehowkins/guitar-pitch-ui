import { useState } from 'react';
import GuitarTab from '../components/guitarTab';
import { getNoteInfo, shiftNote } from '../services/notes';
import { getNote } from '../services/guitar';
import TabForm from '../components/tabForm';

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

export default function TabPage() {
  const [tabsCount, setTabsCount] = useState(1);

  return (
    <>
      <p>Enter comma separated notes (Name/Oct eg C/4) or guitar fret positions (string/fret eg 5/3)</p>
      <button onClick={() => setTabsCount(tabsCount + 1)}>Generate new tab</button>
      {new Array(tabsCount).fill('').map((tabForm) => (
        <TabForm {...tabForm} />
      ))}
    </>
  );
}
