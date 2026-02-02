'use client';

import React from 'react';

const AutomationBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-slate-950 pointer-events-none w-full h-full overflow-hidden">
      
      {/* 1. Katman: Koyu Zemin */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black" />

      {/* 2. Katman: Hareketli 3D KÜP (Logonuza atıfta bulunur) */}
      <div className="cube-wrapper">
        <div className="cube">
          <div className="cube-face front"></div>
          <div className="cube-face back"></div>
          <div className="cube-face right"></div>
          <div className="cube-face left"></div>
          <div className="cube-face top"></div>
          <div className="cube-face bottom"></div>
        </div>
      </div>

      {/* 3. Katman: Hareketli Izgara (Noktalar) */}
      <div className="absolute inset-0 network-grid-bg opacity-30" />
      
      {/* 4. Katman: Hareketli Çizgiler */}
      <div className="absolute inset-0 network-grid-lines opacity-20" />
      
      {/* 5. Katman: Işık Efekti */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-blue-900/20 pulse-glow" />
      
    </div>
  );
};

export default AutomationBackground;
