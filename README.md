# 🍎 AI Vision Dashboard

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python Version](https://img.shields.io/badge/python-3.9%2B-blue)
![Framework](https://img.shields.io/badge/framework-Flask-lightgrey)

A beautiful, modern web dashboard for interacting with **Vision-Enabled AI Models**. This project allows users to seamlessly drag and drop images and ask AI questions about what it sees. It acts as a bridge between a sleek web frontend and the powerful GitHub Models AI API.

This project was originally inspired by the Microsoft Learn "Develop a Vision-Enabled Chat App" exercise, but has been completely upgraded into a fully interactive web application with premium aesthetics.

---

## ✨ Features

- **🖼️ Drag-and-Drop Interface**: Easily upload images for analysis.
- **💬 Real-Time AI Chat**: Ask questions about the uploaded image and get instant AI responses.
- **🌌 Premium Dark-Mode UI**: Designed with glassmorphism (frosted glass) effects, vibrant gradients, and smooth micro-animations.
- **🔒 Secure Authentication**: Communicates directly with the GitHub Models API using your own Personal Access Token.

## 🛠️ Tech Stack

- **Backend**: Python, Flask, OpenAI SDK (configured for GitHub Models)
- **Frontend**: HTML5, CSS3 (Vanilla, custom design system), JavaScript
- **AI Model**: Support for `gpt-4o` and `gpt-4o-mini` (via GitHub Models Inference API)

---

## 🚀 Setup & Installation

To run this dashboard locally on your own machine, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Rsk200/ai-vision-dashboard.git
cd ai-vision-dashboard
```

### 2. Set up a Virtual Environment
```bash
python -m venv .venv

# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
pip install flask flask-cors
```

### 4. Configure Environment Variables
Create a file named `.env` in the root of the project folder. You will need a GitHub Personal Access Token (PAT) with the `models:read` permission enabled.
```env
ENDPOINT="https://models.github.ai/inference"
MODEL_DEPLOYMENT="gpt-4o"
GITHUB_TOKEN="your_github_personal_access_token_here"
```

### 5. Run the Application
```bash
python app.py
```
Open your web browser and navigate to `http://127.0.0.1:5000` to start using the dashboard!

---

## 📸 Usage

1. Open the dashboard.
2. Drag and drop any image (e.g., the provided `mystery-fruit.jpeg`) into the upload area.
3. Type a question like *"What fruit is in this image?"* into the chat box.
4. Watch the AI accurately identify and describe the contents of your image!
