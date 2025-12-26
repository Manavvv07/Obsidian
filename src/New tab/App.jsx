import { useEffect, useRef } from 'react';
import { animate } from "animejs";
import Clock from '../Components/Clock';
import Weather from '../Components/Weather';
import TodoList from '../Components/TodoList';
import AiHub from '../Components/AiTools';
import SearchBar from '../Components/SearchBar';
import '../assets/css/hud.css';

const App = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      animate(containerRef.current, {
        opacity: [0, 1],
        scale: [0.98, 1],
        duration: 1200,
        ease: 'outExpo'
      });
    }
  }, []);

  const strokeColor = "rgba(0, 243, 255, 0.3)";
  const dotColor = "#00f3ff";

  return (
    <div className="app-container">
      <div className="app-overlay"></div>
      
      <div ref={containerRef} className="main-content">
        
        <div className="search-container">
          <SearchBar />
        </div>

        <div className="dashboard-grid">
          
          <div className="panel-column">
            
            <div className="panel-wrapper">
              <div className="hud-panel weather-panel">
                <div className="panel-header">ATMOSPHERE</div>
                <Weather />
              </div>
              <svg className="circuit-overlay weather-connector" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d="M0,2 L170,2 L250,100" 
                  fill="none" 
                  stroke={strokeColor} 
                  strokeWidth="2" 
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
            
            <div className="panel-wrapper">
              <div className="hud-panel ai-panel">
                <div className="panel-header">AI TOOLS</div>
                <AiHub />
              </div>
              <svg className="circuit-overlay ai-connector" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path 
                  d="M0,98 L170,98 L250,0" 
                  fill="none" 
                  stroke={strokeColor} 
                  strokeWidth="2" 
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

          </div>

          <div className="center-column">
            <div className="hud-panel clock-panel">
              <Clock className="clock-component"/>
            </div>
          </div>

          <div className="panel-column">
            
            <div className="panel-wrapper">
              <div className="hud-panel task-panel">
                <div className="panel-header">TASKS</div>
                <TodoList />
              </div>
              <svg className="circuit-overlay tasks-connector" width="120%" height="100%">
                <line 
                  x1="100%" y1="50%" 
                  x2="-190%" y2="50%" 
                  stroke={strokeColor} 
                  strokeWidth="2" 
                />
              </svg>
            </div>

          </div>

        </div>
        
        <div className="footer-container" style={{ position: 'fixed', bottom: '10px', width: '100%', textAlign: 'center', pointerEvents: 'none', zIndex: 0 }}>
          <div className="footer-text">github.com/Manavvv07 © 2025</div>
          <div className="footer-text">"Sometimes you gotta run before you can walk"</div>
        </div>

      </div>
    </div>
  );
};

export default App;