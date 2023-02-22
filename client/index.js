import React from 'react'
import  {createRoot} from 'react-dom/client';
import './index.css'
import App from './components/App'

const domeNode = document.getElementById('root')
const root = createRoot(domeNode);

root.render(
   <App />
);