import './audioSelect.css';
import React, { useEffect, useState } from 'react';
import { getAudioInputs } from '../../services/audioInput';
import Error from '../error';

export default function AudioInputSelect({ onSelect }) {
  const [inputs, setInputs] = useState();
  useEffect(() => {
    getAudioInputs().then(setInputs, () => setInputs([]));
  }, []);

  if (!inputs) return <p>Loading...</p>;

  if (!inputs.length) return <Error message="Could not find any audio inputs" />;

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
