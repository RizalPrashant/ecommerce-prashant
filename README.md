# **Assignment: Full-Stack CRUD Application Development with DevOps Practices**

## Link to EC2 Hosted web app

http://16.176.4.221/

## **Objective**

You have been provided with a starter project that includes user authentication using **Node.js, React.js, and MongoDB**. Your task is to extend this application by implementing **CRUD (Create, Read, Update, Delete) operations** for a real-world application of your choice, while following industry best practices such as:

- **Project Management with JIRA**
- **Requirement Diagram using SysML**
- **Version Control using GitHub**
- **CI/CD Integration for Automated Deployment**

## **How to Setup**

1. Clone the repository
2. npm run install-all to install all the dependencies.
3. npm run dev to run both the front-end and backend. It should take you to localhost and open up the web application automatically.

## **Requirements**

### **1. Choose a Real-World Application**

Select a meaningful use case for your CRUD operations. We will provide the list, you have to select it.

My use case is an online shopping system that can potentially have features such as managing users, payment, products, orders etc.

### **2. Project Management with JIRA and SysML**

- Create a **JIRA project** and define:

  - **Epic**
  - **User Stories** (features required in your app)
  - **Child issues & Subtasks** (breaking down development work)
  - **Sprint Planning** (organizing work into milestones)

- Here is the link to my JIRA Board : https://prashantqutsdlc.atlassian.net/jira/software/projects/ECAP/boards/3?atlOrigin=eyJpIjoiZDYyZDQ2MDFhM2Y2NDk0MDllNGMxYjUxMTYwMjA1MTIiLCJwIjoiaiJ9

- Draw a requirements diagram

### **3. Backend Development (Node.js + Express + MongoDB)**

- Create a user-friendly interface to interact with your API (Some portion developed, follow task manager app)).
- Implement **forms** for adding and updating records.
- Display data using **tables, cards, or lists (Follow how we showed data in task manager app)**

Link to Backend : https://github.com/RizalPrashant/ecommerce-prashant/tree/main/backend

I have used forms and list for my backend implementation.

### **4. Frontend Development (React.js)**

- Create a user-friendly interface to interact with your API (**Some portion developed, follow task manager app)**.
- Implement **forms** for adding, showing, deleting and updating records (CRUD).
- Display data using **tables, cards, or lists (Follow how we showed data in task manager app)**

Link to Frontend : https://github.com/RizalPrashant/ecommerce-prashant/tree/main/frontend

### **5. Authentication & Authorization**

- Ensure **only authenticated users** can access and perform CRUD operations. (Already developed in your project)
- Use **JWT (JSON Web Tokens)** for user authentication (Use the task manager one from .env file).

### **6. GitHub Version Control & Branching Strategy**

- Use **GitHub for version control** and maintain:
  - `main` branch (stable production-ready code)
  - Feature branches (`feature/xyz`) for each new functionality
- Follow proper **commit messages** and **pull request (PR) reviews** .

### **7. CI/CD Pipeline Setup**

- Implement a **CI/CD pipeline using GitHub Actions** to:
  - Automatically **run tests** on every commit/pull request (Optional).
  - Deploy the **backend** to **AWS** .
  - Deploy the **frontend** to **AWS**.
- Document your **CI/CD workflow in the README** .

Here is the CI/CD workflow steps that I have implemented which is working fully:

- Set up job

- Checkout Code

- Setup Node.js

- Print Env Secret

- Run pm2 stop all

- Install Backend Dependencies

- Install Frontend Dependencies

- Run Backend Tests

- Run npm ci

- Run cd ./backend

- Run pm2 start all

- Run pm2 restart all

- Post Setup Node.js

- Post Checkout Code

- Complete job

## **Submission Requirements**

- **JIRA Project Board URL** (user stories ).
- **Requirment diagram** (Using project features)
- **GitHub Repository** (`backend/` and `frontend/`).
- **README.md** with:

  - Project setup instructions.
  - CI/CD pipeline details.
