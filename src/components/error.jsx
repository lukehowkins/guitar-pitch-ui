import React from 'react';

export default function Error({ message = 'Please refresh and try again', onConfirm }) {
  return (
    <div>
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onConfirm && <button onClick={onConfirm}>Okay</button>}
    </div>
  );
}
