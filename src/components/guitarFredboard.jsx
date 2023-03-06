import React, { useEffect, useRef } from 'react';

const STANDARD = ['e', 'B', 'G', 'D', 'A', 'E'];

const WIDTH = 180;
const HEIGHT = 270;
const NUMBER_OF_FRETS = 5;
const FONT_SIZE = 12;
const PADDING = 2;

export const GuitarFretboard = ({ tuning = STANDARD, notes }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${FONT_SIZE}px serif`;

    const startStringY = PADDING + FONT_SIZE;
    const fretHeight = (HEIGHT - startStringY - PADDING) / NUMBER_OF_FRETS;

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

    // string lines
    tuning.forEach((name, index) => {
      const x = getX(index);
      context.lineWidth = (index + 1) / 2;
      context.fillText(name, x - FONT_SIZE / 4, PADDING + FONT_SIZE / 2);
      drawVerticalLine(x);
    });

    context.lineWidth = 1;

    // double horizontal line
    drawHorizontalLine(startStringY);
    drawHorizontalLine(startStringY + 3);

    // fret lines
    for (let i = 1; i <= NUMBER_OF_FRETS; i++) {
      const y = getY(i);
      drawHorizontalLine(y);
    }

    // notes
    Object.entries(notes).forEach(([string, fret]) => {
      const x = getX(string - 1);
      const y = getY(fret);
      context.beginPath();
      context.arc(x, y - fretHeight / 2, fretHeight / 4, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    });
  }, [tuning, notes]);

  return <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />;
};
