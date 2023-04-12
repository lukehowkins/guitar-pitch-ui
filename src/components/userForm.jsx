import React, { useState } from 'react';
import { updateUser } from '../services/user';
import { useUserStore } from '../store/user';

export default function UserForm() {
  const user = useUserStore();
  const [formData, setFormData] = useState(user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.type === 'checkbox' ? target.checked : target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await updateUser(formData);
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={submit}>
      <h2>Update your details</h2>
      <label>
        Name
        <input name="name" value={formData.name} onChange={handleChange} disabled={isSubmitting} />
      </label>
      <label>
        Tablature
        <input
          type="checkbox"
          name="showTab"
          onChange={handleChange}
          checked={formData.showTab}
          disabled={isSubmitting}
        />
      </label>
      <label>
        Chord
        <input
          type="checkbox"
          name="showGuitarFretboard"
          onChange={handleChange}
          checked={formData.showGuitarFretboard}
          disabled={isSubmitting}
        />
      </label>
      <button>Update</button>
    </form>
  );
}
