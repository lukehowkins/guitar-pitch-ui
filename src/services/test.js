import { NOTATION_STATION, DOUBLE_TROUBLE, TRIAD_MASTER, INTERVAL_BOSS, RHYTHM_RUMBLE } from '../constants/games';
import { INTERVALS } from '../constants/theory';
import {
  getRandomInterval,
  getRandomKey,
  getRandomNote,
  getRandomRhythm,
  getRandomTimeSignature,
  getRandomTriad,
} from './mock';
import { getNoteAbove, getNoteBelow } from './notes';

const GAME_SETUPS = {
  [NOTATION_STATION]: (game) => {
    if (!game) return {};
    return {
      keySignature: getRandomKey(game.difficulty),
      note: getRandomNote(game.lowestStaveNote, game.highestStaveNote),
    };
  },
  [DOUBLE_TROUBLE]: (game) => {
    if (!game) return {};
    const minInterval = game.difficulty > 6 ? 'm2' : 'M3';
    const maxInterval = game.difficulty > 5 ? 'P8' : 'P5';
    return {
      keySignature: getRandomKey(game.difficulty),
      note: getRandomNote(
        getNoteAbove(game.lowestStaveNote, maxInterval),
        getNoteBelow(game.highestStaveNote, maxInterval)
      ),
      interval: getRandomInterval(minInterval, maxInterval),
      isAbove: Math.random() > 0.5,
    };
  },
  [TRIAD_MASTER]: (game) => {
    if (!game) return {};
    return {
      keySignature: getRandomKey(game.difficulty),
      triad: getRandomTriad(game.lowestStaveNote, game.highestStaveNote),
    };
  },
  [INTERVAL_BOSS]: (game) => {
    if (!game) return {};
    const minInterval = 'm2';
    const [maxInterval] = Object.entries(INTERVALS).find(([, val]) => val === 4 + game.difficulty * 2);
    return {
      keySignature: getRandomKey(game.difficulty),
      note: getRandomNote(
        getNoteAbove(game.lowestStaveNote, minInterval),
        getNoteBelow(game.highestStaveNote, maxInterval)
      ),
      interval: getRandomInterval(minInterval, maxInterval),
      isAbove: Math.random() > 0.5,
    };
  },
  [RHYTHM_RUMBLE]: ({ difficulty } = {}) => {
    if (difficulty === undefined || difficulty === null) return {};
    const timeSignature = getRandomTimeSignature(difficulty);

    return {
      rhythm: getRandomRhythm(timeSignature, difficulty),
      timeSignature,
    };
  },
};

export const getNextGame = (game) => {
  const setup = GAME_SETUPS[game.type];
  return setup(game);
};
