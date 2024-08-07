import './header.scss';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { login } from '../services/user';
import { useUserStore } from '../store/user';
import { DEBUG_PATH, HOME_PATH, METRONOME_PATH, TAB_PATH, USER_PATH } from '../pages';

const getClassName = ({ isActive }) => `header__link${isActive ? ' header__link--active' : ''}`;

export default function Header() {
  const userName = useUserStore((state) => state.name);

  return (
    <div className="header">
      <h1 className="header__title">Guitar training</h1>
      <nav className="header__nav">
        <NavLink className={getClassName} to={HOME_PATH}>
          Home
        </NavLink>
        <NavLink className={getClassName} to={TAB_PATH}>
          Create Tab
        </NavLink>
        <NavLink className={getClassName} to={METRONOME_PATH}>
          Metronome
        </NavLink>
        <NavLink className={getClassName} to={DEBUG_PATH}>
          Debug
        </NavLink>
        {userName ? (
          <NavLink className={getClassName} to={USER_PATH}>
            My profile - {userName}
          </NavLink>
        ) : (
          <button onClick={login}>Fake login</button>
        )}
      </nav>
    </div>
  );
}
