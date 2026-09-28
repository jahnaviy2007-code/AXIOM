'use client';

import { useEffect, useRef } from 'react';

export default function Starfield() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stars: HTMLDivElement[] = [];
    for (let i = 0; i < 120; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);
      star.style.setProperty('--delay', `${Math.random() * 4}s`);
      star.style.width = `${1 + Math.random() * 2}px`;
      star.style.height = star.style.width;
      container.appendChild(star);
      stars.push(star);
    }

    return () => {
      stars.forEach((s) => s.remove());
    };
  }, []);

  return <div ref={containerRef} className="starfield" aria-hidden="true" />;
}
