import '../constants/colors.scss';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import ErrorBoundary from '../components/errorBoundary';

export default function Layout() {
  return (
    <ErrorBoundary>
      <Header />
      <Outlet />
    </ErrorBoundary>
  );
}
