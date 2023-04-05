import './header.css';
import React from 'react';
import { login } from '../services/user';
import { useUserStore } from '../store/user';

export default function Header() {
  const userName = useUserStore((state) => state.name);

  return (
    <div className="header">
      <h1>Guitar training</h1>
      {userName ? <div>{userName}</div> : <button onClick={login}>Fake login</button>}
    </div>
  );
}
