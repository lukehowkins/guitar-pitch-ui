import React, { useState } from 'react';

export default function MetronomeForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    tempo: 100,
    beats: 4,
    increase: 0,
    increaseBar: 0,
    targetTempo: 100,
  });

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === '' ? '' : +value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tempo:{' '}
        <input type="number" min={0} max={300} name="tempo" value={formData.tempo} onChange={handleNumberChange} />
      </label>{' '}
      <label>
        Beats:{' '}
        <input type="number" min={0} max={10} name="beats" value={formData.beats} onChange={handleNumberChange} />
      </label>{' '}
      <label>
        Tempo increase:{' '}
        <input
          type="number"
          min={-10}
          max={10}
          name="increase"
          value={formData.increase}
          onChange={handleNumberChange}
        />
      </label>{' '}
      <label>
        Increase every{' '}
        <input
          type="number"
          min={0}
          max={100}
          name="increaseBar"
          value={formData.increaseBar}
          onChange={handleNumberChange}
        />{' '}
        Bars.
      </label>{' '}
      <label>
        Target Tempo:{' '}
        <input
          type="number"
          min={0}
          max={300}
          name="targetTempo"
          value={formData.targetTempo}
          onChange={handleNumberChange}
        />
      </label>{' '}
      <button>submit</button>
    </form>
  );
}
