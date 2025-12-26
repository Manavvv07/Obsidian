import React, { useEffect, useRef, useState } from "react";
import { createTimeline, stagger } from "animejs";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const containerRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const now = new Date();
    const currentSeconds = now.getSeconds();
    const currentMillis = now.getMilliseconds();
    const currentMinutes = now.getMinutes();
    const currentHours = now.getHours() % 12;

    const startSecondRotation = (currentSeconds * 6) + (currentMillis * 0.006);
    const startMinuteRotation = (currentMinutes * 6) + (currentSeconds * 0.1);
    const startHourRotation = (currentHours * 30) + (currentMinutes * 0.5);
    const waveStartDelay = currentSeconds * (1000 / 60);

    // Anime.js v4 Timeline
    const tl = createTimeline({
      loop: true,
      autoplay: true
    });

    // 1. Ticks Animation
    // v4 uses `keyframes` for multi-stage properties
    tl.add('.tick', {
      keyframes: [
        { translateY: '-10px', duration: 150, ease: 'outQuad' },
        { translateY: '0px', duration: 400, ease: 'outElastic(1, .5)' }
      ],
      delay: stagger(1000 / 60, { start: waveStartDelay })
    }, 0);

    // 2. Seconds Hand
    tl.add('.ticker-seconds', {
      rotate: [startSecondRotation + 'deg', (startSecondRotation + 360) + 'deg'],
      duration: 60000,
      ease: 'linear'
    }, 0);

    // 3. Minutes Hand
    tl.add('.ticker-minutes', {
      rotate: [startMinuteRotation + 'deg', (startMinuteRotation + 360) + 'deg'],
      duration: 3600000,
      ease: 'linear'
    }, 0);

    // 4. Hours Hand
    tl.add('.ticker-hours', {
      rotate: [startHourRotation + 'deg', (startHourRotation + 360) + 'deg'],
      duration: 43200000,
      ease: 'linear'
    }, 0);

    animationRef.current = tl;

    return () => {
      if (animationRef.current) animationRef.current.pause();
    };
  }, []);

  const containerSize = "350px"; 

  const ticks = Array.from({ length: 60 }).map((_, i) => {
    const rotation = i * 6;
    return (
      <div
        key={i}
        className="tick"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "2px",
          height: "10px",
          background: "rgba(0, 243, 255, 0.4)",
          transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-160px)`, 
          transformOrigin: "center center",
          zIndex: 3,
          willChange: "transform"
        }}
      />
    );
  });

  return (
    <div ref={containerRef} style={{
      position: "relative",
      width: containerSize,
      height: containerSize,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(0, 20, 30, 0.6) 0%, rgba(0, 0, 0, 0.9) 100%)",
      boxShadow: "0 0 30px rgba(0, 243, 255, 0.15), inset 0 0 20px rgba(0, 243, 255, 0.05)",
      border: "1px solid rgba(0, 243, 255, 0.2)",
      backdropFilter: "blur(5px)"
    }}>
      
      {ticks}

      {/* --- Seconds Ticker (Outer) --- */}
      <div className="ticker-seconds" style={{
        position: "absolute",
        inset: 0, 
        margin: "auto", 
        width: "310px",
        height: "310px",
        border: "1px dashed rgba(0, 243, 255, 0.3)",
        borderRadius: "50%",
        zIndex: 1,
        pointerEvents: "none"
      }}>
        <div style={{
             position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
             width: '2px', height: '15px', background: 'var(--primary-cyan)', 
             boxShadow: '0 0 10px var(--primary-cyan)'
        }}/>
      </div>

      {/* Static Decoration Rings */}
      <div style={{
        position: "absolute",
        width: "330px",
        height: "330px",
        border: "1px solid rgba(0, 243, 255, 0.6)",
        borderRadius: "50%",
        opacity: 0.8,
        zIndex: 2,
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        width: "280px",
        height: "280px",
        border: "1px solid rgba(0, 243, 255, 0.3)",
        borderRadius: "50%",
        zIndex: 2,
        pointerEvents: "none"
      }} />

      {/* Time Display */}
      <div style={{
        zIndex: 10,
        fontSize: "4rem",
        fontWeight: "bold",
        fontFamily: "var(--font-main)"
      }}>
        {time.toLocaleTimeString([], { hour12: false })}
      </div>
    </div>
  );
};

export default Clock;