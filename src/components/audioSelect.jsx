import './audioSelect.css';
import React, { useEffect, useState } from 'react';
import { getAudioInputs } from '../services/audioInput';

export default function AudioSelect({ onSelect }) {
  const [inputs, setInputs] = useState();
  useEffect(() => {
    getAudioInputs().then(setInputs, () => setInputs([]));
  }, []);

  if (!inputs) return <p>Loading...</p>;

  if (!inputs.length) return <p>Could not find any audio inputs </p>;

  return (
    <div>
      <h3>Select your preferred audio input</h3>
      {inputs.map((input) => {
        return (
          <label key={input.deviceId} className="audio-select__radio">
            <input value={input.deviceId} type="radio" onClick={() => onSelect(input.deviceId)} />
            {input.label}
          </label>
        );
      })}
    </div>
  );
}
