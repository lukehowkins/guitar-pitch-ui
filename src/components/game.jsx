import React, { useEffect, useState } from 'react';
import { getRandomInterval, getRandomKey, getRandomNote, getRandomTriad } from '../services/mock';
import { DoubleTrouble, IntervalBoss, NotationStation, TriadMaster } from './games';

const GAMES = [NotationStation, DoubleTrouble, TriadMaster, IntervalBoss];

export default function Game() {
  const [turnCount, setTurnCount] = useState(0);
  const [gameSetup, setGameSetup] = useState(null);
  const CurrentGame = GAMES[turnCount % 4];

  useEffect(() => {
    setGameSetup({
      keySignature: getRandomKey(),
      note: getRandomNote(),
      triad: getRandomTriad(),
      interval: getRandomInterval(3, 8),
      isAbove: Math.random() > 0.5,
    });
  }, [turnCount]);

  if (!gameSetup) return <div>Loading...</div>;

  const onComplete = () => {
    setTurnCount(turnCount + 1);
  };

  return (
    <div>
      <div>Turn {turnCount + 1}</div>
      <CurrentGame {...gameSetup} />
      <button onClick={onComplete}>Next</button>
    </div>
  );
}
