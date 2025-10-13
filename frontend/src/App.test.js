import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

beforeEach(() => {
    global.fetch = jest.fn();
});

// first test
test('renders the initial welcome message from Cern', () => {
  render(<App />);

  const welcomeMessage = screen.getByText(/Hello! Welcome to Regime/i);

  expect(welcomeMessage).toBeInTheDocument();
});

// second test
test('allows user to send a message and receive a successful response', async () => {

    global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            cern_response: "This is a successful reply.",
            thought_process: "I have replied successfully."
        }),
    });

    render(<App />);

    const input = screen.getByPlaceholderText(/What do you want to ask CERN?/i);
    const submitButton = screen.getByTitle(/Send Message/i);


    fireEvent.change(input, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);


    expect(screen.getByText('Test message')).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText('This is a successful reply.')).toBeInTheDocument();
    });
});

// third test
test('displays a specific error message for a 500 server error', async () => {
    
    global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
    });

    render(<App />);
    const input = screen.getByPlaceholderText(/What do you want to ask CERN?/i);
    const submitButton = screen.getByTitle(/Send Message/i);
    fireEvent.change(input, { target: { value: 'Trigger 500 error' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
        expect(screen.getByText("Server error. Please try again later.")).toBeInTheDocument();
    });
});