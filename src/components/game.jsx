import React, { memo, useEffect, useState } from 'react';
import { GAME_LABELS } from '../constants/games';
import { areChordsSame } from '../services/notes';
import { getNextGame } from '../services/test';
import { useGameStore } from '../store/game';
import Difficulty from './difficulty';
import GAMES from './games';
import Loading from './loading';

function Game({ answer, onNext }) {
  const difficultySetup = useGameStore();
  const [turnCount, setTurnCount] = useState(0);
  const [score, setScore] = useState(0);
  const [{ game, ...gameSetup }, setGameSetup] = useState({});
  const CurrentGame = GAMES[game];

  const handleNext = (isCorrect) => {
    setTurnCount(turnCount + 1);
    if (isCorrect) setScore(score + 1);
    onNext();
  };

  useEffect(() => {
    if (difficultySetup?.games?.length) {
      const setup = getNextGame(difficultySetup, turnCount);
      setGameSetup(setup);
    }
  }, [turnCount, difficultySetup]);

  if (!difficultySetup?.games?.length) return <Difficulty />;

  if (!CurrentGame) return <Loading />;

  return (
    <div>
      <div>
        Turn {turnCount + 1}. Score {score}
        <br />
        Difficulty {difficultySetup.difficulty} / 10
        <br />
        Play between frets {difficultySetup.lowestFret} and {difficultySetup.highestFret}
      </div>
      <h2>{GAME_LABELS[game]}</h2>
      <CurrentGame {...gameSetup} {...difficultySetup} answer={answer} onDone={handleNext} />
    </div>
  );
}

function propsAreEqual(oldProps, newProps) {
  return oldProps.onNext === newProps.onNext && areChordsSame(oldProps.answer, newProps.answer);
}

export default memo(Game, propsAreEqual);
