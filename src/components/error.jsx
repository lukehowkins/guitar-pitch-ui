import React from 'react';

export default function Error({ message }) {
  return (
    <div>
      <h3>Something went wrong</h3>
      <p>Please refresh and try again</p>
      <p>{message}</p>
    </div>
  );
}
