# Flag Explorer App

A web application to explore country flags with a React frontend and Spring Boot backend.

## Setup Instructions

### Prerequisites
- Node.js 18+
- Java 17+
- Maven
- Git

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Tyson2265/flag-explorer-app

#### Backend Setup
- Navigate to the `backend` directory:
  ```bash
  cd backend
  mvn install
  mvn test
  mvn spring-boot:run

Verify the API is running at http://localhost:8080/countries

#### Frontend Setup
- Navigate to the `frontend` directory: Use cypress to test front end
  ```bash
  cd frontend
  npm install
  npm start
  npx cypress open --component