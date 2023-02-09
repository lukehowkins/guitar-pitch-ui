import React, { useEffect, useRef, useState } from 'react';
import { startRecording, stopRecording } from '../services/audioInput';
import { getRandomInterval, getRandomKey, getRandomNote, getRandomTriad } from '../services/mock';
import Audio from './audioSelect';

import { DoubleTrouble, IntervalBoss, NotationStation, TriadMaster } from './games';

const GAMES = [NotationStation, DoubleTrouble, TriadMaster, IntervalBoss];

export default function Game() {
  const [preferredDeviceId, setPreferredDeviceId] = useState();
  const [turnCount, setTurnCount] = useState(0);
  const [gameSetup, setGameSetup] = useState(null);
  const [audios, setAudios] = useState([]);
  const [error, setError] = useState('');
  const CurrentGame = GAMES[turnCount % 4];

  useEffect(() => {
    const onData = (blob) => {
      setAudios([...audios, window.URL.createObjectURL(blob)]);
    };

    try {
      startRecording(onData);

      setGameSetup({
        keySignature: getRandomKey(),
        note: getRandomNote(),
        triad: getRandomTriad(),
        interval: getRandomInterval(3, 8),
        isAbove: Math.random() > 0.5,
      });
    } catch ({ message }) {
      setError(message);
    }
  }, [turnCount]);

  if (error)
    return (
      <div>
        <h3>Something went wrong</h3>
        <p>Please refresh and try again</p>
        <p>{error}</p>
      </div>
    );

  if (!gameSetup) return <div>Loading...</div>;

  if (!preferredDeviceId) return <Audio onSelect={setPreferredDeviceId} />;

  const onComplete = () => {
    stopRecording();
    setTurnCount(turnCount + 1);
  };

  return (
    <div>
      <div>Turn {turnCount + 1}</div>
      <CurrentGame {...gameSetup} />
      <button onClick={onComplete}>Next</button>

      {audios.map((url) => (
        <audio key={url} src={url} controls />
      ))}
    </div>
  );
}
