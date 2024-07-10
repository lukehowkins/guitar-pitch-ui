import { useState } from 'react';
import TabForm from '../components/tabForm';

export default function TabPage() {
  const [tabsCount, setTabsCount] = useState(1);

  return (
    <>
      <p>Enter comma separated notes (Name/Oct eg C/4) or guitar fret positions (string/fret eg 5/3)</p>
      {new Array(tabsCount).fill('').map((tabForm) => (
        <TabForm {...tabForm} />
      ))}
      <button onClick={() => setTabsCount(tabsCount + 1)}>Generate new tab</button>
    </>
  );
}
