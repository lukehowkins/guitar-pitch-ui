import React, { useEffect, useRef } from 'react';

const STANDARD = ['e', 'B', 'G', 'D', 'A', 'E'];

const WIDTH = 180;
const HEIGHT = 270;
const FONT_SIZE = 12;
const PADDING = 16;

const GUITAR_FRETS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
const MAX_FRET = 24;

const getFretRange = (notes) => {
  const frets = notes.map((note) => note.fret);
  const minFret = Math.min(...frets);
  const maxFret = Math.max(...frets);

  let startFret = Math.max(minFret - 1, 0);
  let numberOfFrets = Math.max(maxFret - minFret + 2, 5);
  if (startFret + numberOfFrets > MAX_FRET) startFret = MAX_FRET - numberOfFrets;
  return { startFret, numberOfFrets };
};

export const GuitarFretboard = ({ tuning = STANDARD, notes }) => {
  const canvasRef = useRef();
  const { startFret, numberOfFrets } = getFretRange(notes);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${FONT_SIZE}px serif`;

    const startStringY = PADDING + 2 * FONT_SIZE;
    const fretHeight = (HEIGHT - startStringY - PADDING) / numberOfFrets;

    const getX = (i) => PADDING + (WIDTH / tuning.length) * (tuning.length - 1 - i);
    const getY = (i) => startStringY + i * fretHeight;

    const drawHorizontalLine = (y) => {
      const endX = getX(0);
      context.beginPath();
      context.moveTo(PADDING, y);
      context.lineTo(endX, y);
      context.closePath();
      context.stroke();
    };

    const drawVerticalLine = (x) => {
      context.beginPath();
      context.moveTo(x, startStringY);
      context.lineTo(x, HEIGHT - PADDING);
      context.closePath();
      context.stroke();
    };

    // string lines and names
    tuning.forEach((name, index) => {
      const x = getX(index);
      context.lineWidth = (index + 1) / 2;
      context.fillText(name, x - FONT_SIZE / 4, PADDING + FONT_SIZE);
      drawVerticalLine(x);
    });

    context.lineWidth = 1;

    // top horizontal line(s)
    drawHorizontalLine(startStringY);
    if (startFret === 0) drawHorizontalLine(startStringY + 3);

    // fret lines
    for (let i = 1; i <= numberOfFrets; i++) {
      const y = getY(i);
      drawHorizontalLine(y);
      const fret = startFret + i;
      if (GUITAR_FRETS.includes(fret)) {
        context.fillText(fret, 0, y - fretHeight / 2 + FONT_SIZE / 2);
      }
    }

    // notes
    tuning.forEach((name, index) => {
      const string = index + 1;
      const x = getX(index);
      const noteOnString = notes.find((note) => note.str === string);
      if (noteOnString) {
        if (noteOnString.fret === 0) {
          context.fillText('O', x - FONT_SIZE / 4, startStringY - 2);
        } else {
          const y = getY(noteOnString.fret - startFret);
          context.beginPath();
          context.arc(x, y - fretHeight / 2, fretHeight / 4, 0, Math.PI * 2);
          context.closePath();
          context.fill();
        }
      } else {
        context.fillText('X', x - FONT_SIZE / 4, startStringY - 2);
      }
    });
  }, [tuning, notes]);

  return <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />;
};
