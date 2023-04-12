import './audioSelect.scss';
import React, { useEffect, useState } from 'react';
import { MIC, MIDI } from '../../constants/inputTypes';
import { hasMidiInputs } from '../../services/midi';
import AudioInputSelect from './audioInputSelect';
import Error from '../error';
import Loading from '../loading';

export default function AudioSelect({ onSelect }) {
  const [showMIDI, setShowMidi] = useState();
  const [selectedType, setSelectedType] = useState();
  const [error, setError] = useState('');

  useEffect(() => {
    hasMidiInputs().then((value) => {
      setShowMidi(value);
      if (!value) setSelectedType(MIC);
    }, setError);
  }, []);

  if (error) return <Error message={error.toString()} />;
  if (showMIDI === undefined) return <Loading />;

  return (
    <div>
      {showMIDI && (
        <label className="audio-select__radio">
          <input value={MIDI} checked={selectedType === MIDI} type="radio" onChange={() => onSelect({ type: MIDI })} />
          MIDI
        </label>
      )}
      <label className="audio-select__radio">
        <input value={MIC} checked={selectedType === MIC} type="radio" onChange={() => setSelectedType(MIC)} />
        Mic or other input
      </label>

      {selectedType === MIC && (
        <AudioInputSelect onSelect={(preferredDeviceId) => onSelect({ type: MIC, preferredDeviceId })} />
      )}
    </div>
  );
}
