import './difficulty.scss';
import React, { useState } from 'react';
import { GAME_LABELS } from '../constants/games';
import { useGameStore } from '../store/game';

export default function Difficulty() {
  const setGames = useGameStore((state) => state.setGames);
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const setRange = useGameStore((state) => state.setRange);
  const [formData, setFormData] = useState({
    games: Object.keys(GAME_LABELS),
    difficulty: 0,
    lowestFret: 0,
    highestFret: 24,
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: value === '' ? '' : +value,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setGames(formData.games);
    setDifficulty(formData.difficulty);
    setRange(formData.lowestFret, formData.highestFret);
  };

  return (
    <form onSubmit={handleSubmit} className="difficulty">
      <label>
        Difficulty
        <input type="number" min={0} max={10} name="difficulty" value={formData.difficulty} onChange={handleChange} />
      </label>
      <label>
        Lowest fret
        <input type="number" min={0} max={20} name="lowestFret" value={formData.lowestFret} onChange={handleChange} />
      </label>
      <label>
        Highest fret
        <input
          type="number"
          min={(formData.lowestFret || 0) + 4}
          max={24}
          name="highestFret"
          value={formData.highestFret}
          onChange={handleChange}
        />
      </label>

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
