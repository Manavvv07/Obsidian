import React, { useEffect, useRef, useState } from "react";
import { createTimeline } from "animejs";

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    if (containerRef.current) {
      const ringAnimation = createTimeline({ loop: true });
      ringAnimation.add('.ticker', {
        rotate: "1turn",
        duration: 12000,
        ease: 'linear'
      });
    }

    return () => clearInterval(timer);
  }, []);

  // Updated dimensions
  const containerSize = "350px"; 

  return (
    <div ref={containerRef} style={{
      position: "relative",
      width: containerSize,
      height: containerSize,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      // Round background styles
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(0, 20, 30, 0.6) 0%, rgba(0, 0, 0, 0.9) 100%)",
      boxShadow: "0 0 30px rgba(0, 243, 255, 0.15), inset 0 0 20px rgba(0, 243, 255, 0.05)",
      border: "1px solid rgba(0, 243, 255, 0.2)",
      backdropFilter: "blur(5px)"
    }}>
      
      {/* Rotating Ring */}
      <div className="ticker" style={{
        position: "absolute",
        width: "310px",
        height: "310px",
        border: "2px dashed rgba(0, 243, 255, 0.4)",
        borderRadius: "50%",
        zIndex: 1
      }}></div>

      {/* Static Outer Highlight */}
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
      
      {/* Static Inner Ring */}
      <div style={{
        position: "absolute",
        width: "280px",
        height: "280px",
        border: "1px solid rgba(0, 243, 255, 0.3)",
        borderRadius: "50%",
        zIndex: 2
      }} />

      {/* Time Display */}
      <div style={{
        zIndex: 10,
        fontSize: "4rem",
        fontWeight: "bold",
        textShadow: "0 0 25px var(--primary-cyan)",
        fontFamily: "var(--font-main)"
      }}>
        {time.toLocaleTimeString([], { hour12: false })}
      </div>
    </div>
  );
};

export default Clock;