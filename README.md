# Introduction

## What is the Email Summarizer?

This app is designed to assist users in quickly digesting the content of their emails by providing summarized versions. It simplifies the process of reading emails, especially when dealing with large volumes of messages. The application utilizes ReactJS for the frontend and NodeJS with Express for the backend.

# Technical Architecture

![Email Summarizer Technical Architecture](https://firebasestorage.googleapis.com/v0/b/email-sysgte.appspot.com/o/Screenshot%202024-05-06%20at%204.34.04%E2%80%AFPM.png?alt=media&token=abf6dd2f-6af8-48cf-84c7-de6d56b2422b)

- **Client** - Built with ReactJS (Typescript). Calls endpoints in the server for summarization and suggestions. CSS is written with Tailwind, and authentication is done in Firebase.
- **Server** - Written in NodeJS and Express. Uses OPENAI key to call custom ChatGPT agent (LLM API) and sends these responses back to frontend.
- **LLM API** - Custom ChatGPT agent that is configured to give summarization and suggestions. Receives requests from server and responds with JSON of GPT responses.
- **Firebase** - Firestore stores all data (emails). Firebase is used to implement authentication (Google + Email/Password). Runs serverless in the cloud making access easy unlike MongoDB, with no need to implement custom endpoints to store and receive data. 

# Developers

- **Saksham Gupta**: Worked on React frontend, wrote CSS in Tailwind, and enabled Firebase authentication with Google. Connected backend server to frontend by enabling CORS and integrated summarization button.
- **Juan Sanz**: Worked on server API and LLM. Configured ChatGPT LLM to create suggestions and summarize emails. Created endpoints in NodeJS server to allow frontend to connect.
- **Arnav Rawat**: Worked on React frontend and connected frontend to backend. Integrated suggestions to frontend by calling server endpoint.

# Environment Setup

## Initial Setup

Clone the repo:

```bash
git clone "https://github.com/CS222-UIUC-SP24/group-project-team-40.git"
```

Navigate to the root directory of the project and follow these steps:

1. In the root of the project, create a .env file and add this line
```bash
OPENAI_SECRET_KEY=your_openai_secret_key
```

2. For the frontend:
```bash
cd client
npm i
npm run start
```

3. For the backend:
```bash
cd server
npm i
npm run dev
```

Make sure you run two separate terminal instances, one for the frontend and one for the backend.
