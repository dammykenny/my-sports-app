import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 text-white p-4">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">My Sports App</h1>
          <ul className="flex gap-4">
            <li><Link to="/">Overview</Link></li>
            <li><Link to="/stats">Stats</Link></li>
            <li><Link to="/trophies">Trophies</Link></li>
          </ul>
        </nav>
      </header>

      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
