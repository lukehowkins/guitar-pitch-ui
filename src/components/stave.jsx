import React, { useEffect, useRef } from 'react';
import { Accidental, Formatter, Renderer, Stave, StaveNote, Voice } from 'vexflow';

const generate = (ref, notes, key = 'C') => {
  const height = 200;
  const width = Math.max(ref.clientWidth, 250);
  const renderer = new Renderer(ref, Renderer.Backends.SVG);
  renderer.resize(width, height);
  const context = renderer.getContext();
  const stave = new Stave(10, 40, width - 100);
  stave.addClef('treble').addKeySignature(key);
  stave.setContext(context).draw();

  const voice = new Voice();
  voice.addTickables(notes);

  new Formatter().joinVoices([voice]).format([voice], width - 150);

  voice.draw(context, stave);
};

export default function MyStave() {
  const divRef = useRef();

  useEffect(() => {
    generate(
      divRef.current,
      [
        new StaveNote({ keys: ['b/4'], duration: 4 }),
        new StaveNote({ keys: ['g/3'], duration: 4 }),
        new StaveNote({ keys: ['e/4'], duration: 4 }).addModifier(new Accidental('b')),
        new StaveNote({ keys: ['d/4', 'f/4', 'a/4'], duration: 4 }).addModifier(new Accidental('#'), 1),
      ],
      'Dm'
    );
  }, []);

  return <div ref={divRef} />;
}
