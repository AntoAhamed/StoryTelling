# Interactive Storytelling Platform with Branching Narratives.

## Overview
This project contains two main parts:
- **Frontend**: The user interface of the application.
- **Backend**: The server-side logic and API.

### Prerequisites
Make sure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (vX.X.X or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/AntoAhamed/Storytelling.git
cd Storytelling
```

### 2. Install Dependencies

#### Frontend
Navigate to the `frontend` folder and install the required packages:

```bash
cd frontend
npm install
```

#### Backend
Navigate to the `backend` folder and install the required packages:

```bash
cd ../backend
npm install
```

---

## Running the Application

### 1. Running the Frontend
After installing the dependencies, run the following command to start the frontend:

```bash
npm start
```

This will start the React development server. You can view the frontend by visiting `http://localhost:3000` in your browser.

### 2. Running the Backend
To start the backend server, run the following command in the `backend` folder:

```bash
node server.js
```

This will start the backend server on the configured port (e.g., `http://localhost:5000`).

---

## Additional Information
- Make sure that both the frontend and backend servers are running simultaneously for the application to work as expected.
- You can modify configuration settings such as API endpoints and ports in the respective folders' config files if needed.