import { NOTATION_STATION, DOUBLE_TROUBLE, TRIAD_MASTER, INTERVAL_BOSS } from '../../constants/games';

import NotationStation from './notationStation';
import DoubleTrouble from './doubleTrouble';
import TriadMaster from './triadMaster';
import IntervalBoss from './intervalBoss';

export default {
  [NOTATION_STATION]: NotationStation,
  [DOUBLE_TROUBLE]: DoubleTrouble,
  [TRIAD_MASTER]: TriadMaster,
  [INTERVAL_BOSS]: IntervalBoss,
};
