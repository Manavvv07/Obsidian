import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './New tab/App'

if (navigator.userAgent.indexOf("Edg") > -1) {
  document.body.classList.add('is-edge');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)