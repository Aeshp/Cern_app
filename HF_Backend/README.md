# Cern Chat API - Backend

This directory contains the backend service for the Cern Chat application. It is a Python-based API built with FastAPI, designed to serve a fine-tuned language model that powers the Cern persona. The backend is optimized for deployment on Hugging Face Spaces using Docker.

## How It Works

The core of the backend is a single FastAPI application (`main.py`) that performs the following key functions:

1.  **Model Loading**: On startup, the server loads the `Aeshp/deepseekR1tunedchat` model from Hugging Face. It uses the `bitsandbytes` library to apply 4-bit quantization, significantly reducing the memory footprint and allowing it to run on more accessible hardware.
2.  **System Prompt Injection**: A detailed system prompt is used to give the model its persona as "Cern," a human customer service specialist. This prompt contains the model's entire knowledge base, personality traits, and strict operational rules.
3.  **API Endpoint**: It exposes a single endpoint, `/api/chat`, that accepts the user's prompt and conversation history.
4.  **Response Processing**: The model's raw output, which includes an internal "thought process" within `<think>` tags, is parsed. The thought and the final user-facing response are separated and returned as a structured JSON object.
5.  **Guardrails**: A simple guardrail is in place to catch and override responses containing specific banned words, ensuring the model stays in character.

---

## Technology Stack

-   **[FastAPI](https://fastapi.tiangolo.com/)**: A modern, high-performance web framework for building APIs with Python.
-   **[Uvicorn](https://www.uvicorn.org/)**: An ASGI server used to run the FastAPI application.
-   **[PyTorch](https://pytorch.org/)**: The core machine learning framework.
-   **[Hugging Face Transformers](https://huggingface.co/docs/transformers/index)**: For loading and running the language model.
-   **[BitsAndBytes](https://github.com/TimDettmers/bitsandbytes)** & **[Accelerate](https://huggingface.co/docs/accelerate/index)**: For model quantization and efficient hardware utilization.
-   **[Docker](https://www.docker.com/)**: For containerizing the application for deployment on Hugging Face Spaces.

---

## API Endpoint

### `POST /api/chat`

This is the main endpoint for interacting with Cern.

-   **Request Body**:

    ```json
    {
      "history": [
        {"role": "user", "content": "Hello, who are you?"},
        {"role": "cern", "content": "I'm Cern, a product specialist..."}
      ],
      "user_prompt": "What's the battery life on the Phantom headphones?"
    }
    ```

-   **Success Response (200 OK)**:

    ```json
    {
      "cern_response": "The Phantom model offers a total of 25 hours of battery life.",
      "thought_process": "The user is asking about the Phantom's battery. I will check Section 2.2 of my knowledge base to find this information."
    }
    ```

---

## Local Setup & Running

To run this server on your local machine, you will need a powerful **NVIDIA GPU** with CUDA support.

1.  **Prerequisites**:
    -   Python 3.9+
    -   NVIDIA drivers and CUDA toolkit installed.

2.  **Navigate to the backend directory**:
    ```sh
    cd backend
    ```

3.  **Install dependencies**:
    ```sh
    pip install -r requirements.txt
    ```

4.  **Run the server**:
    The model will be downloaded on the first run, which may take some time.
    ```sh
    uvicorn main:app --host 0.0.0.0 --port 7860
    ```
    The API will be available at `http://localhost:7860`.

## Deployment on Hugging Face Spaces

This application is designed to be deployed as a **Docker Space** on Hugging Face.

-   The `Dockerfile` sets up the Python environment, installs dependencies, and defines the command to start the Uvicorn server.
-   Hugging Face Spaces automatically reads the `Dockerfile` to build and run the container.
-   The Space must be configured with appropriate GPU hardware (e.g., T4 small) to run the model effectively.
