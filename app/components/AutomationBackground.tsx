'use client';

import React from 'react';

const AutomationBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-slate-950 pointer-events-none w-full h-full">
      
      {/* 1. Katman: Koyu Zemin (Gradient) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black" />

      {/* 2. Katman: Hareketli Izgara (Noktalar) - globals.css'den geliyor */}
      <div className="absolute inset-0 network-grid-bg opacity-40" />
      
      {/* 3. Katman: Hareketli Çizgiler - globals.css'den geliyor */}
      <div className="absolute inset-0 network-grid-lines opacity-30" />
      
      {/* 4. Katman: Renkli Işık Efekti */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20 pulse-glow" />
      
    </div>
  );
};

export default AutomationBackground;
