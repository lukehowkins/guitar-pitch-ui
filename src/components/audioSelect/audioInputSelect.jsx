import './audioSelect.css';
import React, { useEffect, useState } from 'react';
import { getAudioInputs } from '../../services/audioInput';
import Error from '../error';
import Loading from '../loading';

export default function AudioInputSelect({ onSelect }) {
  const [inputs, setInputs] = useState();

  useEffect(() => {
    getAudioInputs().then(setInputs, () => setInputs([]));
  }, []);

  if (!inputs) return <Loading />;

  if (!inputs.length) {
    return <Error message="Could not find any audio inputs. Please make sure you give permission to use microphone" />;
  }

  return (
    <div>
      <h3>Select your preferred audio input</h3>
      {inputs.map((input, index) => {
        return (
          <label key={input.deviceId} className="audio-select__radio">
            <input value={input.deviceId} type="radio" onClick={() => onSelect(input.deviceId)} />
            {input.label || `Mic ${index + 1}`}
          </label>
        );
      })}
    </div>
  );
}
