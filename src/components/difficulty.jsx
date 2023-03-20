import './difficulty.css';
import React, { useState } from 'react';
import { getNoteRange } from '../services/guitar';
import { shiftOct } from '../services/notes';
import { GAME_LABELS } from '../constants/games';

export default function Difficulty({ onSubmit }) {
  const [formData, setFormData] = useState({
    games: Object.keys(GAME_LABELS),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: +e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    const games = checked ? [...formData.games, name] : formData.games.filter((value) => value !== name);
    setFormData({
      ...formData,
      games,
    });
  };

  const handleSubmit = () => {
    const [lowestNote, highestNote] = getNoteRange(formData.lowestFret, formData.highestFret);
    const lowestStaveNote = shiftOct(lowestNote, 1);
    const highestStaveNote = shiftOct(highestNote, 1);
    onSubmit({ ...formData, lowestStaveNote, highestStaveNote });
    return false;
  };

  // TODO choose games
  return (
    <form onSubmit={handleSubmit} className="difficulty">
      <input
        type="number"
        min={0}
        max={10}
        name="difficulty"
        value={formData.difficulty || ''}
        onChange={handleChange}
        placeholder="Difficulty"
      />
      <input
        type="number"
        min={0}
        max={20}
        name="lowestFret"
        value={formData.lowestFret || ''}
        onChange={handleChange}
        placeholder="Lowest fret"
      />
      <input
        type="number"
        min={(formData.lowestFret || 0) + 4}
        max={24}
        name="highestFret"
        value={formData.highestFret || ''}
        onChange={handleChange}
        placeholder="Highest fret"
      />

      <label>Games:</label>
      {Object.entries(GAME_LABELS).map(([name, label]) => (
        <label key={name}>
          <input type="checkbox" name={name} onChange={handleCheckboxChange} checked={formData.games.includes(name)} />
          {label}
        </label>
      ))}
      <button>submit</button>
    </form>
  );
}
