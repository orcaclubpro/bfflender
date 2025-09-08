'use client';

import React from 'react';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-bold text-emerald-600">BFFLender.com</div>
        <div className="flex space-x-6">
          <a href="#" className="text-slate-700 hover:text-emerald-600 transition-colors">Home</a>
          <a href="#" className="text-slate-700 hover:text-emerald-600 transition-colors">About</a>
          <a href="#" className="text-slate-700 hover:text-emerald-600 transition-colors">Services</a>
          <a href="#" className="text-slate-700 hover:text-emerald-600 transition-colors">Contact</a>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 