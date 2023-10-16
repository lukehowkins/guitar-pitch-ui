import React, { useState } from 'react';
import Metronome from '../components/metronome';
import MetronomeForm from '../components/metronomeForm';

const ONE_MIN = 60 * 1000;

export default function User() {
  const [beats, setBeats] = useState();
  const [tempo, setTempo] = useState();

  const handleSubmit = (data) => {
    setBeats(data.beats);
    setTempo(data.tempo);
    if (data.increase) {
      const interval = (ONE_MIN / data.tempo) * data.beats * data.increaseBar;
      const myInterval = setInterval(() => {
        setTempo((t) => {
          if (t >= data.targetTempo) {
            clearInterval(myInterval);
            return data.targetTempo;
          }
          return t + data.increase;
        });
      }, interval);
    }
  };

  return (
    <>
      <MetronomeForm onSubmit={handleSubmit} />
      {tempo && `Current tempo: ${tempo}`}
      {beats && <Metronome beats={beats} tempo={tempo} loop beep />}
    </>
  );
}
