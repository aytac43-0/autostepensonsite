'use client';

import React from 'react';

const AutomationBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950 pointer-events-none">
      {/* 1. Katman: Koyu Degrade Zemin */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a1a] to-slate-950"></div>
      
      {/* 2. Katman: Hareketli Noktalar ve Ağ */}
      <div className="network-grid absolute inset-0 opacity-20"></div>
      
      {/* 3. Katman: Hafif Mor Işık Efekti */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-blue-500/5 animate-pulse-slow"></div>
      
      {/* CSS Animasyon Kuralları */}
      <style jsx global>{`
        .network-grid {
          background-image: 
            radial-gradient(circle, #4f46e5 1px, transparent 1px),
            radial-gradient(circle, #4f46e5 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
          animation: moveBackground 60s linear infinite;
        }

        /* Çizgiler */
        .network-grid::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
                linear-gradient(to right, rgba(79, 70, 229, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(79, 70, 229, 0.05) 1px, transparent 1px);
            background-size: 80px 80px;
            animation: moveLines 40s linear infinite;
        }

        @keyframes moveBackground {
          from { background-position: 0 0, 20px 20px; }
          to { background-position: 40px 40px, 60px 60px; }
        }

        @keyframes moveLines {
            from { transform: translateY(0); }
            to { transform: translateY(40px); }
        }

        .animate-pulse-slow {
            animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default AutomationBackground;
