# 📝 Task Manager: Automated CI/CD Setup

A simple Node.js & Express application featuring a live user dashboard and a fully automated Continuous Integration and Continuous Delivery (CI/CD) pipeline. 

This project demonstrates how to eliminate manual testing and deployment risks by automating the software release lifecycle.

---

## 🌐 Live Application
👉 **[View the Live Deployment on Vercel](https://task-manager-ci-cd-eight.vercel.app/)**

---

## 💡 What is CI/CD?

*   **Continuous Integration (CI):** The practice of automating the building and testing of code. Every time a developer pushes code, automated scripts instantly run tests to catch bugs early and protect the production branch from breaking.
*   **Continuous Delivery (CD):** The practice of automatically deploying the verified code to cloud hosting environments so users can access updates instantly without manual server configuration.

---

## 🛠️ Project Implementation Details

This project is built using a hybrid serverless architecture that bridges a standard web framework with modern cloud platforms:

### 1. The Application Stack
*   **Backend:** Node.js & Express.js (managing serverless routing, custom input validation, and full CRUD utilities).
*   **Frontend:** HTML5 & JavaScript (asynchronous UI supporting task addition, editing, checkbox toggling, and item deletion).
*   **Database:** Persistent JSON file engine configured to save data safely within both local environments and Vercel's ephemeral `/tmp` directory.
*   **Testing Automation:** Jest & Supertest executing automatic regression evaluations inside the CI pipeline on every single push.


### 2. The Automated CI/CD Pipeline
Every time a code change is pushed to the `main` branch, the following automated pipeline triggers simultaneously:

``text
               ┌──► GitHub Actions (CI) ──► Spins up Ubuntu VM ──► Installs Node ──► Runs Jest Tests (Pass/Fail)
[ Code Push ] ─┤
               └──► Vercel (CD) ──────────► Captures Commit ─────► Builds Serverless Assets ──► Updates Live URL
                                                                       │
                                      [ Local Containerization ] ◄─────┴──► Enforced via Multi-Stage Dockerfile
``

---

## 🐳 Docker Architecture

This application includes a production-grade, highly optimized **Multi-Stage Dockerfile** designed according to industry best practices. 

### Why this Docker setup is production-ready:
1.  **Ultra-Lightweight Footprint:** Built on **Alpine Linux** (`node:20-alpine`), reducing the final image size from ~1GB to under **150MB** for rapid deployment scaling.
2.  **Multi-Stage Build Pipeline:** 
    *   **Stage 1 (Builder):** Acts as an isolated construction site. It installs all dependencies (including heavy testing engines like Jest and Supertest), copies the codebase, and runs tests.
    *   **Stage 2 (Runner):** Acts as the clean, final deployment. It discards Stage 1 entirely and copies *only* the production assets and the bare-minimum modules (Express). Dev tools are completely stripped out to minimize security vulnerability surfaces.
3.  **Build-Time Quality Gate:** The container building process includes an explicit `RUN npm test` step. If any automated test fails, Docker will **abort the build**, preventing broken code from ever being containerized.

---

## ⚙️ Running Locally

To run and experiment with this system on your own computer:

1. Clone the repository and navigate into the folder:
   ```bash
   git clone https://github.com/Nivedha3106/Task_Manager_CI-CD.git
   ```
2. Install the required development packages:
   ```bash
   npm install
   ```
3. Start the local server:
   ```bash
   npm start
   ```
   *Open `http://localhost:3000` in your web browser.*
4. Run the automated testing suite:
   ```bash
   npm test
   ```
### Option B: Isolated Docker Setup (Recommended)
Ensure you have Docker Desktop installed, then execute these commands in your project root:

1. **Build the lightweight production image:**
   ```bash
   docker build -t task-manager-app .
   ```
2. **Launch the containerized application:**
   ```bash
   docker run -d -p 3000:3000 --name running-task-app task-manager-app
   ```
   *Access the app securely running inside your isolated container environment at `http://localhost:3000`.*
