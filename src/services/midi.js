import { NOTES } from '../constants/theory';

const MIDDLE_C_MIDI = 60;
const LOWEST_NOTE = 36;
const HIGHEST_NOTE = 72;
const MIDDLE_C_OCT = 4;
const MIN_VELOCITY = 40; // 0 to 127

export const getNote = (midiNumber) => {
  const diff = midiNumber - MIDDLE_C_MIDI;
  const octDiff = Math.floor(diff / 12);
  let noteDiff = diff % 12;
  if (noteDiff < 0) noteDiff += 12;
  const note = NOTES[noteDiff];
  const oct = MIDDLE_C_OCT + octDiff;

  return `${note}/${oct}`;
};

export const hasMidiInputs = async () => {
  const { inputs } = await navigator.requestMIDIAccess();
  return !!inputs.size;
};

export const setMidiConnection = async (onMessage) => {
  const { inputs } = await navigator.requestMIDIAccess();

  const onMIDIMessage = (e) => {
    const [channel, midiNumber, velocity] = e.data;
    if (velocity > MIN_VELOCITY && LOWEST_NOTE <= midiNumber && midiNumber <= HIGHEST_NOTE) {
      const note = getNote(midiNumber);
      onMessage([note]);
    }
  };

  inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage;
  });
};
