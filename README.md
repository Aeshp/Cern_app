# Cern: A Customer Service AI Assistant

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/Aeshp/Cern_app)
[![Deployment](https://img.shields.io/badge/deployment-Hugging%20Face-blue)](https://huggingface.co/spaces)
[![Live Site](https://img.shields.io/badge/Live-Demo-brightgreen)](https://cernofregime.netlify.app/)
[![Training Code](https://img.shields.io/badge/Training%20Code-GitHub-yellow)](https://github.com/Aeshp/deepseekR1finetune)
[![Model Card](https://img.shields.io/badge/Model-Hugging%20Face-orange)](https://huggingface.co/Aeshp/deepseekR1tunedchat)


This repository contains the source code for **Cern**, a complete, full-stack AI assistant designed to simulate a human customer service specialist. The project integrates a custom-trained language model with a React frontend and a Python FastAPI backend to deliver a seamless, interactive user experience for the fictional company, **Regime Audio**.

---

## The AI Model: From Generalist to Specialist

The core of this project is a bespoke language model, fine-tuned to perform a specialized role. The training process involved two key stages:

1. **Base Model Training:** The model began as a powerful, general-purpose model, pre-trained on a vast and diverse dataset. This gave it a broad understanding of language, context, and reasoning.
2. **Specialized Fine-Tuning:** It was then meticulously fine-tuned using a custom dataset built for the **Regime Audio** company. This second stage imbued the model with the specific persona, detailed product knowledge, and conversational protocols of **Cern**.

While this application showcases its use as a customer service agent, the resulting tuned model is versatile and can be adapted for a wide range of AI assistance tasks.

* **Hugging Face Model Card:** [**Aeshp/deepseekR1tunedchat**](https://huggingface.co/Aeshp/deepseekR1tunedchat)
* **Fine-Tuning Repository:** The complete code for the fine-tuning process can be found at [**Aeshp/deepseekR1finetune**](https://github.com/Aeshp/deepseekR1finetune.git).

---
## Live Demo

Try the live, deployed version of **Cern** here:  
https://cernofregime.netlify.app/

> Note: This site is deployed on Netlify. If you run into issues with the demo (broken UI, missing features, etc.), please check that your local `.env` is configured to point to the correct backend URL, clear your browser cache, or open an issue on the repo: https://github.com/Aeshp/Cern_app/issues

## Project Structure

* `frontend/`: Contains the React application that provides the user interface. See the [frontend/README.md](./frontend/README.md) for more details.
* `backend/`: Contains the FastAPI server that loads the quantized AI model and serves the chat API. See the [backend/README.md](./backend/README.md) for more details.

---

## Running the Application Locally

To run the full application, you will need to start both the backend and frontend servers.

### Prerequisites

* Git
* Node.js (v14 or later) & npm
* Python 3.9+ & pip
* A powerful **NVIDIA GPU** with CUDA support is recommended for the backend (quantized CPU-only inference may be possible but will be slow).

---

### Step 1: Run the Backend Server

First, get the backend API server running.

```sh
# Navigate to the backend directory
cd backend

# (optional) create and activate a virtual environment
python -m venv .venv
# Linux / macOS
source .venv/bin/activate
# Windows (Powershell)
.venv\Scripts\Activate.ps1

# Install Python dependencies
pip install -r requirements.txt

# Run the Uvicorn server
# The model will be downloaded on the first run, which may take several minutes.
uvicorn main:app --host 0.0.0.0 --port 7860
```

The backend API will now be running at **[http://localhost:7860](http://localhost:7860)**. Keep this terminal open.

---

### Step 2: Run the Frontend Server

In a new terminal window, set up and run the React frontend.

```sh
# Navigate to the frontend directory
cd frontend

# Copy the example env file (if present) and update as needed
cp .env.example .env.local

# Install Node.js dependencies
npm install

# Run the React development server
npm start
```

Your browser will open to **[http://localhost:3000](http://localhost:3000)**, and the application will be fully connected and ready to use (assuming the backend is running at `http://localhost:7860` or as configured in `.env.local`).

---

## Deployment

**Backend:**
The backend is containerized with Docker and is suitable for deployment as a GPU-backed Docker Space (for example on Hugging Face) or on any GPU-enabled cloud instance. Ensure the target environment provides the required CUDA and GPU drivers for efficient inference.

**Frontend:**
The React frontend is a standard static application and can be deployed to platforms such as Vercel, Netlify, GitHub Pages, or served from an S3 bucket + CloudFront.

---

## Notes & Recommendations

* If you do not have a GPU, consider smaller/quantized models or a hosted inference option to avoid slow local CPU inference.
* Monitor logs for model download/progress during first startup — model files can be large.
* Keep sensitive keys and secrets out of the repository — use environment variables for configuration.

---

## License

Distributed under the **MIT License**. See `LICENSE` for more information.

## Thank you

Thank you for checking out **Cern** — contributions, feedback, and bug reports are very welcome.



