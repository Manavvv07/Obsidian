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

  return (
    <div className="app-container">
      <div className="app-overlay"></div>
      
      <div ref={containerRef} className="main-content">
        
        {/* --- 1. SEARCH BAR (Moved to Top Center) --- */}
        <div className="search-container">
          <SearchBar />
        </div>

        {/* --- 2. DASHBOARD GRID (Columns) --- */}
        <div className="dashboard-grid">
          
          {/* Left Column: Weather & AI */}
          <div className="panel-column">
            <div className="hud-panel weather-panel">
              <div className="panel-header">ATMOSPHERE</div>
              <Weather />
            </div>
            
            <div className="hud-panel ai-panel">
              <div className="panel-header">AI TOOLS</div>
              <AiHub />
            </div>
          </div>

          {/* Center Column: Clock Only */}
          <div className="center-column">
            <div className="hud-panel clock-panel">
              <Clock />
            </div>
          </div>

          {/* Right Column: Tasks */}
          <div className="panel-column">
            <div className="hud-panel task-panel">
              <div className="panel-header">TASKS</div>
              <TodoList />
            </div>
          </div>

        </div>
        
        {/* Footers */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
          <div className="footer-text">
            github.com/Manavvv07 © 2025
          </div>
          <div className="footer-text">
            "Sometimes you gotta run before you can walk"
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;