import './metronome.scss';
import React, { useEffect, useState } from 'react';

const ONE_MIN = 60 * 1000;

const makeBeep = (duration) => {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = 600;
  oscillator.connect(context.destination);
  oscillator.start();
  setTimeout(() => oscillator.stop(), duration);
};

// tempo is BPM
export default function Metronome({
  beats = 4,
  tempo = 100,
  countDown = false,
  loop = false,
  finishMessage = '',
  beep,
}) {
  const [count, setCount] = useState(countDown ? beats : 1);
  useEffect(() => {
    const interval = ONE_MIN / tempo;
    const beepDuration = Math.min(interval - 100, Math.max(interval / 10, 100));
    const myInterval = setInterval(() => {
      if (beep) makeBeep(beepDuration);
      setCount((value) => {
        if (countDown) {
          if (value > 1) return value - 1;
          if (!loop) {
            clearInterval(myInterval);
            return null;
          }
          return beats;
        }

        if (value < beats) return value + 1;
        if (!loop) {
          clearInterval(myInterval);
          return null;
        }
        return 1;
      });
    }, ONE_MIN / tempo);

    return () => clearInterval(myInterval);
  }, [beats, tempo, countDown, loop]);

  return <h2 className="metronome">{count || finishMessage}</h2>;
}
