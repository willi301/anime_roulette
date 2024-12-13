import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './view/App.tsx';

// Safely get the root element from the DOM
const rootElement = document.getElementById('root');

// Ensure the root element exists before rendering
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Root element not found. Make sure the element with id "root" exists in your index.html.');
}