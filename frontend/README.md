# Cern Chat UI - Frontend

This directory contains the source code for the frontend of the Cern Chat application, built with React. It provides the user interface for interacting with the Cern AI product specialist.

## Getting Started

To get the frontend running locally, follow these steps.

### Prerequisites

-   Node.js (v14 or later recommended)
-   npm (comes with Node.js)

### Installation & Running

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install the necessary dependencies:**
    This command will download all the required libraries listed in `package.json`.
    ```sh
    npm install
    ```

3.  **Run the application in development mode:**
    This will start the development server and open the application in your default browser. The page will automatically reload if you make edits.
    ```sh
    npm start
    ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.\
This is used to run the unit tests for the components, such as those found in `App.test.js`.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Technology Stack

-   **React**: A JavaScript library for building user interfaces.
-   **Create React App**: Used to bootstrap the project setup and scripts.
-   **Jest**: A JavaScript testing framework used for writing unit tests.
-   **React Testing Library**: A library for testing React components in a user-centric way.

### `src/App.js`

This is the main component for the application. It manages the chat history, handles user input, and communicates with the backend API. It also contains the logic for displaying the AI's "thought process" and handling API errors gracefully.

### `src/App.test.js`

This file contains the unit tests for the `<App />` component. The tests ensure that:

-   The initial welcome message renders correctly.
-   Users can send a message and receive a successful response (the "happy path").
-   Specific, user-friendly error messages are displayed when the server returns a 500 error.
