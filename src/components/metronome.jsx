import './metronome.scss';
import React, { useEffect, useState } from 'react';

const ONE_MIN = 60 * 1000;

// tempo is BPM
export default function Metronome({ beats = 4, tempo = 100, countDown = false, loop = false, finishMessage = '' }) {
  const [count, setCount] = useState(countDown ? beats : 1);
  useEffect(() => {
    const myInterval = setInterval(() => {
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
