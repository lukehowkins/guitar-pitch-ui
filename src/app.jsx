import React from 'react';
import NotationStation from './components/games/notationStation';
import DoubleTrouble from './components/games/doubleTrouble';

export default function App() {
  return (
    <div>
      <h1>Guitar training</h1>

      <NotationStation />
      <DoubleTrouble />
    </div>
  );
}
