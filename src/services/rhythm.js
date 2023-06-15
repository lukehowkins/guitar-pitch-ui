import { ERROR_INVALID_DURATION, ERROR_TOO_FEW_BEATS, ERROR_TOO_MANY_BEATS } from '../constants/errors';
import { DURATION_LABELS, DURATION_TO_BEATS_MAP } from '../constants/theory';

export const isRest = (beats) => !!beats?.endsWith?.('r');

export const getBeats = (beats) => beats && Math.abs(isRest(beats) ? beats.replace?.('r', '') : beats);

export const getTotalBeats = (timeSignature) => {
  const [numerator, denominator] = timeSignature.split('/');
  return numerator * DURATION_TO_BEATS_MAP[denominator];
};

const getRhythmsPerBeat = (rhythmBeats, beatsPerGroup, numbOfGroups) => {
  let group = 0;
  let groupedBeats = Array.from({ length: numbOfGroups }, () => []);

  for (let i = 0; i < rhythmBeats.length; i++) {
    const currentBeats = getBeats(rhythmBeats[i]);
    const makeBeat = (beats) => (isRest(rhythmBeats[i]) ? `${Math.abs(beats)}r` : beats);
    const getCurrentGroupTotal = () => groupedBeats[group].reduce((acc, beats) => acc + getBeats(beats), 0);

    const avaliableBeats = beatsPerGroup - getCurrentGroupTotal();
    // can fit into current group
    if (currentBeats <= avaliableBeats) {
      groupedBeats[group].push(rhythmBeats[i]);
      if (getCurrentGroupTotal() >= beatsPerGroup) group++;
    } else {
      // use up avaliable beats first, then fill next groups with remaining
      if (avaliableBeats) {
        groupedBeats[group].push(makeBeat(avaliableBeats));
        group++;
        if (groupedBeats[group]) {
          const helper = (beats) => {
            if (Math.abs(beats) <= beatsPerGroup) {
              groupedBeats[group].push(makeBeat(beats));
            } else {
              groupedBeats[group].push(makeBeat(beatsPerGroup * -1));
              group++;
              helper(beats + beatsPerGroup);
            }
          };
          helper(avaliableBeats - currentBeats);
        }
        // current group full, put current beats into next groups
      } else {
        const helper = (beats, multiplier = 1) => {
          group++;
          if (beats <= beatsPerGroup) {
            groupedBeats[group].push(makeBeat(beats * multiplier));
          } else {
            groupedBeats[group].push(makeBeat(beatsPerGroup * multiplier));
            helper(beats - beatsPerGroup, -1);
          }
        };
        helper(currentBeats);
      }
    }
  }

  return groupedBeats;
};

export const groupRhythmPerBeat = (rhythmBeats, timeSignature) => {
  if (!rhythmBeats || !timeSignature) return;
  const totalBeats = getTotalBeats(timeSignature);
  const [numerator, denominator] = timeSignature.split('/');
  // TODO can this be worked out better?
  const beatsPerGroup = denominator === '8' && numerator % 3 === 0 ? 6 : 4;
  const numbOfGroups = totalBeats / beatsPerGroup;

  const totalRhythmBeats = rhythmBeats.reduce((acc, beats) => acc + +beats, 0);
  if (totalRhythmBeats > totalBeats) throw ERROR_TOO_MANY_BEATS;
  if (totalRhythmBeats < totalBeats) throw ERROR_TOO_FEW_BEATS;

  return getRhythmsPerBeat(rhythmBeats, beatsPerGroup, numbOfGroups);
};

export const getDurationLabel = (duration) => {
  const durationLabel = DURATION_LABELS[getBeats(duration)];
  if (!durationLabel) throw ERROR_INVALID_DURATION;
  if (isRest(duration)) return `${durationLabel} rest`;
  return `${duration < 0 ? 'tied ' : ''}${durationLabel}`;
};
