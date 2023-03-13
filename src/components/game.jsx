import React, { memo, useMemo, useState } from 'react';
import { INTERVALS } from '../constants/theory';
import { getRandomInterval, getRandomKey, getRandomNote, getRandomTriad } from '../services/mock';
import { areChordsSame, getNoteAbove, getNoteBelow } from '../services/notes';
import Difficulty from './difficulty';
import { DoubleTrouble, IntervalBoss, NotationStation, TriadMaster } from './games';

const GAMES = [
  {
    Component: NotationStation,
    setup: (difficulty) => {
      if (!difficulty) return {};
      return {
        keySignature: getRandomKey(difficulty.difficulty),
        note: getRandomNote(difficulty.lowestStaveNote, difficulty.highestStaveNote),
      };
    },
  },
  {
    Component: DoubleTrouble,
    setup: (difficulty) => {
      if (!difficulty) return {};
      const minInterval = difficulty > 6 ? 'm2' : 'm3';
      const maxInterval = difficulty > 5 ? 'M6' : 'P5';
      return {
        keySignature: getRandomKey(difficulty.difficulty),
        note: getRandomNote(
          getNoteAbove(difficulty.lowestStaveNote, maxInterval),
          getNoteBelow(difficulty.highestStaveNote, maxInterval)
        ),
        interval: getRandomInterval(minInterval, maxInterval),
        isAbove: Math.random() > 0.5,
      };
    },
  },
  {
    Component: TriadMaster,
    setup: (difficulty) => {
      if (!difficulty) return {};
      return {
        keySignature: getRandomKey(difficulty.difficulty),
        triad: getRandomTriad(difficulty.lowestStaveNote, difficulty.highestStaveNote),
      };
    },
  },
  {
    Component: IntervalBoss,
    setup: (difficulty) => {
      if (!difficulty) return {};
      const minInterval = 'm2';
      const [maxInterval] = Object.entries(INTERVALS).find(([, val]) => val === 4 + difficulty.difficulty * 2);
      return {
        keySignature: getRandomKey(difficulty.difficulty),
        note: getRandomNote(
          getNoteAbove(difficulty.lowestStaveNote, minInterval),
          getNoteBelow(difficulty.highestStaveNote, maxInterval)
        ),
        interval: getRandomInterval(minInterval, maxInterval),
        isAbove: Math.random() > 0.5,
      };
    },
  },
];

function Game({ answer, onNext }) {
  const [turnCount, setTurnCount] = useState(0);
  const [score, setScore] = useState(0);
  const [difficultySetup, setDifficultySetup] = useState();
  const { Component: CurrentGame, setup } = GAMES[turnCount % 4];
  const gameSetup = useMemo(() => setup(difficultySetup), [turnCount, difficultySetup]);

  const handleNext = (isCorrect) => {
    setTurnCount(turnCount + 1);
    if (isCorrect) setScore(score + 1);
    onNext();
  };

  if (!difficultySetup) return <Difficulty onSubmit={setDifficultySetup} />;

  return (
    <div>
      <div>
        Turn {turnCount + 1}. Score {score}
        <br />
        Difficulty {difficultySetup.difficulty} / 10
        <br />
        Play between frets {difficultySetup.lowestFret} and {difficultySetup.highestFret}
      </div>
      <CurrentGame {...gameSetup} {...difficultySetup} answer={answer} onDone={handleNext} />
    </div>
  );
}

function propsAreEqual(oldProps, newProps) {
  return oldProps.onNext === newProps.onNext && areChordsSame(oldProps.answer, newProps.answer);
}

export default memo(Game, propsAreEqual);
