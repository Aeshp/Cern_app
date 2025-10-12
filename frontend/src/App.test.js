import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import App from './App';

// first test
test('renders the initial welcome message from Cern', () => {
  render(<App />); 
  
  const welcomeMessage = screen.getByText(/Hello! Welcome to Regime/i); 
  
  expect(welcomeMessage).toBeInTheDocument(); 
});

