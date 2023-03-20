import { NOTATION_STATION, DOUBLE_TROUBLE, TRIAD_MASTER, INTERVAL_BOSS } from '../constants/games';
import { INTERVALS } from '../constants/theory';
import { getRandomInterval, getRandomKey, getRandomNote, getRandomTriad } from './mock';
import { getNoteAbove, getNoteBelow } from './notes';

const GAME_SETUPS = {
  [NOTATION_STATION]: (difficulty) => {
    if (!difficulty) return {};
    return {
      keySignature: getRandomKey(difficulty.difficulty),
      note: getRandomNote(difficulty.lowestStaveNote, difficulty.highestStaveNote),
    };
  },
  [DOUBLE_TROUBLE]: (difficulty) => {
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
  [TRIAD_MASTER]: (difficulty) => {
    if (!difficulty) return {};
    return {
      keySignature: getRandomKey(difficulty.difficulty),
      triad: getRandomTriad(difficulty.lowestStaveNote, difficulty.highestStaveNote),
    };
  },
  [INTERVAL_BOSS]: (difficulty) => {
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
};

export const getNextGame = (difficulty, turn) => {
  const game = difficulty.games[turn % difficulty.games.length];
  const setup = GAME_SETUPS[game];
  const props = setup(difficulty);

  return { game, ...props };
};
