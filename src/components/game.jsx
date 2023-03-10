import React, { useEffect, useState } from 'react';
import { getRandomInterval, getRandomKey, getRandomNote, getRandomTriad } from '../services/mock';
import { DoubleTrouble, IntervalBoss, NotationStation, TriadMaster } from './games';

const GAMES = [NotationStation, DoubleTrouble, TriadMaster, IntervalBoss];

export default function Game({ answer, onNext }) {
  const [turnCount, setTurnCount] = useState(0);
  const [score, setScore] = useState(0);
  const [gameSetup, setGameSetup] = useState(null);
  const CurrentGame = GAMES[turnCount % 4];

  const handleNext = (isCorrect) => {
    setTurnCount(turnCount + 1);
    if (isCorrect) setScore(score + 1);
    onNext();
  };

  useEffect(() => {
    setGameSetup({
      keySignature: getRandomKey(),
      note: getRandomNote('Bb/2', 'Bb/5'),
      triad: getRandomTriad(),
      interval: getRandomInterval(3, 8),
      isAbove: Math.random() > 0.5,
    });
  }, [turnCount]);

  if (!gameSetup) return <div>Loading...</div>;

  return (
    <div>
      <div>
        Turn {turnCount + 1}. Score {score}
      </div>
      <CurrentGame {...gameSetup} answer={answer} onDone={handleNext} />
    </div>
  );
}
