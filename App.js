import React, { useEffect } from 'react';
import Routes from './src/navigation/routes';
import { initDB } from './src/database/database';

export default function App() {
  useEffect(() => {
    initDB();
  }, []);

  return <Routes />;
}