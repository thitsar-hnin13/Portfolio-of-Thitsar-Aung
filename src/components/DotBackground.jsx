import React, { useEffect, useRef } from 'react';

const DotBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = '';

    // Main dots (3px - 12px)
    const dotCount = 150;
    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      const size = Math.floor(Math.random() * 10) + 3;
      dot.style.width = size + 'px';
      dot.style.height = size + 'px';
      dot.style.left = Math.random() * 100 + '%';
      dot.style.top = Math.random() * 100 + '%';
      const duration = Math.random() * 25 + 20;
      dot.style.animationDuration = duration + 's';
      dot.style.animationDelay = Math.random() * 20 + 's';
      dot.style.opacity = Math.random() * 0.3 + 0.1;
      container.appendChild(dot);
    }

    // Tiny dots (1px - 5px)
    const tinyCount = 120;
    for (let i = 0; i < tinyCount; i++) {
      const tinyDot = document.createElement('div');
      tinyDot.classList.add('dot-tiny');
      const size = Math.floor(Math.random() * 5) + 1;
      tinyDot.style.width = size + 'px';
      tinyDot.style.height = size + 'px';
      tinyDot.style.left = Math.random() * 100 + '%';
      tinyDot.style.top = Math.random() * 100 + '%';
      const duration = Math.random() * 35 + 30;
      tinyDot.style.animationDuration = duration + 's';
      tinyDot.style.animationDelay = Math.random() * 25 + 's';
      tinyDot.style.opacity = Math.random() * 0.2 + 0.05;
      container.appendChild(tinyDot);
    }
  }, []);

  return <div className="dot-bg" ref={containerRef} />;
};

export default DotBackground;