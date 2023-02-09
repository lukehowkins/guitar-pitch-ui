import { NOTES } from '../constants/theory';

const MIDDLE_C_MIDI = 60;
const MIDDLE_C_OCT = 4;
const MIN_VELOCITY = 10;

export const getNote = (midiNumber) => {
  const diff = midiNumber - MIDDLE_C_MIDI;
  const octDiff = Math.floor(diff / 12);
  let noteDiff = diff % 12;
  if (noteDiff < 0) noteDiff += 12;
  const note = NOTES[noteDiff];
  const oct = MIDDLE_C_OCT + octDiff;

  return `${note}/${oct}`;
};

export const setMidiConnection = async (onMessage) => {
  const { inputs } = await navigator.requestMIDIAccess();

  const onMIDIMessage = (event) => {
    const [channel, midiNumber, velocity] = event.data[1];
    if (velocity > MIN_VELOCITY) onMessage(getNote(midiNumber));
  };

  inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage;
  });
};
