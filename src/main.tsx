import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'  // 이건 되고 js 가 안되는거 같음.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
