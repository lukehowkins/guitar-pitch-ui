import React, { useEffect, useState } from 'react';
import { MIC, MIDI } from '../constants/inputTypes';
import { startRecording, stopRecording } from '../services/audioInput';
import { setMidiConnection } from '../services/midi';
import SingleStave from './singleStave';

export default function AudioVisualiser({ inputType, preferredDeviceId }) {
  const [chord, setChord] = useState();
  const [audio, setAudio] = useState();

  useEffect(() => {
    if (inputType === MIDI) {
      setMidiConnection(setChord);
    } else if (inputType === MIC) {
      const onMicData = (blob) => {
        setAudio(window.URL.createObjectURL(blob));
      };
      startRecording(preferredDeviceId, onMicData);
    }
  }, [inputType]);

  return (
    <div>
      <h3>Audio visualiser</h3>
      <p>{inputType} input selected</p>
      {chord && (
        <p>
          Note: {chord}
          <SingleStave notes={chord} />
        </p>
      )}
      {audio && <audio src={audio} controls />}

      {inputType === MIC && (
        <button type="button" onClick={stopRecording}>
          Stop recording
        </button>
      )}
    </div>
  );
}
