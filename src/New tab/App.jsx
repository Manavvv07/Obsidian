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
      <div ref={containerRef} className="main-content">
        
        <div className="search-container">
          <SearchBar />
        </div>

        <div className="dashboard-grid">
          
          {/* Left Column: Status */}
          <div className="panel-column">
            {/* Clock Panel: Rectangle styles removed via CSS class */}
            <div className="hud-panel clock-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock />
            </div>
            
            <div className="hud-panel" style={{ flex: 0.6 }}>
              <div className="panel-header">ATMOSPHERE</div>
              <Weather />
            </div>
          </div>

          <div className="hud-panel">
            <div className="panel-header">AI TOOLS</div>
            <AiHub />
          </div>

          <div className="hud-panel">
            <div className="panel-header">TASKS</div>
            <TodoList />
          </div>

        </div>
        
        <div className="footer-text">
          STARK INDUSTRIES © 2024
        </div>
      </div>
    </div>
  );
};

export default App;