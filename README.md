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
*   **Backend:** Node.js & Express.js (managing serverless routing and an in-memory database).
*   **Frontend:** HTML5 & JavaScript (communicating asynchronously via standard HTTP `GET`, `POST`, and `DELETE` requests).
*   **Testing:** Jest & Supertest (simulating user API requests to validate response data and status codes).

### 2. The Automated CI/CD Pipeline
Every time a code change is pushed to the `main` branch, the following automated pipeline triggers simultaneously:

```text
               ┌──► GitHub Actions (CI) ──► Spins up Ubuntu VM ──► Installs Node ──► Runs Jest Tests (Pass/Fail)
[ Code Push ] ─┤
               └──► Vercel (CD) ──────────► Captures Commit ─────► Builds Serverless Assets ──► Updates Live URL
```

*   **Continuous Integration Engine:** Driven by **GitHub Actions** (`ci.yml`). It isolates the environment using clean Linux containers, installs exact dependency trees (`npm ci`), and runs automated regressions.
*   **Continuous Delivery Engine:** Driven by **Vercel** (`vercel.json`). It converts the entire Express web app into highly scalable, instant-on **Serverless Functions** that power the live public website.

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
