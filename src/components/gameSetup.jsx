import './difficulty.scss';
import React, { useState } from 'react';
import { GAME_LABELS } from '../constants/games';
import { useGameStore } from '../store/game';

export default function GameSetup() {
  const setType = useGameStore((state) => state.setType);
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const setRange = useGameStore((state) => state.setRange);
  const setTotal = useGameStore((state) => state.setTotal);
  const [formData, setFormData] = useState({
    game: Object.keys(GAME_LABELS)[0],
    difficulty: 0,
    lowestFret: 0,
    highestFret: 24,
    total: 10,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === '' ? '' : +value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setType(formData.game);
    setTotal(formData.total);
    setDifficulty(formData.difficulty);
    setRange(formData.lowestFret, formData.highestFret);
  };

  return (
    <form onSubmit={handleSubmit} className="difficulty">
      <label>
        Total questions:
        <input type="number" min={0} max={50} name="total" value={formData.total} onChange={handleNumberChange} />
      </label>
      <label>
        Difficulty
        <input
          type="number"
          min={0}
          max={10}
          name="difficulty"
          value={formData.difficulty}
          onChange={handleNumberChange}
        />
      </label>
      <label>
        Lowest fret
        <input
          type="number"
          min={0}
          max={20}
          name="lowestFret"
          value={formData.lowestFret}
          onChange={handleNumberChange}
        />
      </label>
      <label>
        Highest fret
        <input
          type="number"
          min={(formData.lowestFret || 0) + 4}
          max={24}
          name="highestFret"
          value={formData.highestFret}
          onChange={handleNumberChange}
        />
      </label>

      <label>Game:</label>
      {Object.entries(GAME_LABELS).map(([name, label]) => (
        <label key={name}>
          <input type="radio" name="game" value={name} onChange={handleChange} checked={formData.game === name} />
          {label}
        </label>
      ))}
      <button>submit</button>
    </form>
  );
}
