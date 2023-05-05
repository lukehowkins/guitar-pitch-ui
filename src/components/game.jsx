import React, { memo, useEffect, useState } from 'react';
import { getNextQuestion } from '../services/api';
import { areChordsSame } from '../services/notes';
import { useGameStore } from '../store/game';
import GameSetup from './gameSetup';
import Loading from './loading';
import Metronome from './metronome';

function Game({ answer, onNext }) {
  const { Component, total, label, reset: clearGame, ...game } = useGameStore();
  const [isLoading, setIsLoading] = useState(true);
  const [turnCount, setTurnCount] = useState(1);
  const [score, setScore] = useState(0);
  const [gameSetup, setGameSetup] = useState({});

  const handleNext = (isCorrect) => {
    setTurnCount(turnCount + 1);
    if (isCorrect) setScore(score + 1);
    onNext();
  };

  useEffect(() => {
    if (total && turnCount <= total) {
      getNextQuestion('TODO, game id', game)
        .then(setGameSetup)
        .finally(() => setIsLoading(false));
    }
  }, [turnCount, total]);

  if (!Component) return <GameSetup />;

  if (isLoading) return <Loading />;

  if (turnCount > total) {
    return (
      <p>
        Score: {score} / {total}
        <button onClick={clearGame}>Pick new game</button>
      </p>
    );
  }

  return (
    <div>
      <div>
        Turn {turnCount} of {total}. Score {score}
        <br />
        Difficulty {game.difficulty} / 10
        <br />
        Play between frets {game.lowestFret} and {game.highestFret}
      </div>
      <h2>{label}</h2>
      <Component {...gameSetup} {...game} answer={answer} onDone={handleNext} />
      {!answer && <Metronome finishMessage="Play now" tempo={60 + game.difficulty * 10} countDown />}
    </div>
  );
}

function propsAreEqual(oldProps, newProps) {
  return oldProps.onNext === newProps.onNext && areChordsSame(oldProps.answer, newProps.answer);
}

export default memo(Game, propsAreEqual);
