import React, { useRef, useState } from 'react';
import Game from './game';

const convertToNotes = (s) => {
  const split = s.split(',');
  if (split.length > 1) return split.map((note) => note.trim().replace('"', ''));
  return s;
};

export const KeyboardFlow = () => {
  const input = useRef();
  const [notes, setNotes] = useState('');
  const [answer, setAnswer] = useState();

  const clear = () => {
    setAnswer();
    setNotes('');
    input.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswer(convertToNotes(notes));
  };

  return (
    <>
      <Game answer={answer} onNext={clear} />
      <form noValidate onSubmit={handleSubmit}>
        <input autoFocus ref={input} value={notes} onChange={(e) => setNotes(e.target.value)}></input>
        <button>submit</button>
      </form>
    </>
  );
};
