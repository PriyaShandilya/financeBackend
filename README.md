This project is a backend API for managing financial records like income and expenses, along with generating useful dashboard insights. It supports role-based access and provides endpoints for authentication, record management, and analytics.

Features:-
User Authentication (Register/Login)
Role-Based Access Control (Viewer, Analyst, Admin)
Create and manage financial records
Dashboard summary with:
Total Income
Total Expenses
Net Balance
Category-wise totals
Recent transactions
Monthly trends
Input validation using Joi
Secure API with JWT authentication

Tech Stack:-
Node.js
Express.js
MongoDB (Atlas)
Mongoose
JWT Authentication
Joi Validation

User Roles:
Viewer
Can view dashboard summary only
Analyst
Can view records and analytics
Admin
Full access (create, update, delete records and manage users)

API Endpoints
Auth:
POST /api/auth/register → Register user

POST /api/auth/login → Login user

Records:

POST /api/records → Create record (Admin)

GET /api/records → Get records (Analyst/Admin)

PUT /api/records/:id → Update record (Admin)

DELETE /api/records/:id → Delete record (Admin)

Dashboard:

GET /api/dashboard/summary

Returns:
totalIncome
totalExpense
netBalance
categoryTotals
recent activity
monthly trends

Live API: https://financebackend-z57e.onrender.com

Ex: 

POST https://financebackend-z57e.onrender.com/api/auth/register

GET https://financebackend-z57e.onrender.com/api/dashboard/summary

LOCAL SETUP:-

Clone the repo

git clone <https://github.com/PriyaShandilya/financeBackend.git>


cd project-folder

Install dependencies

npm install

Create .env file

MONGO_URI=your_mongodb_url

JWT_SECRET=your_secret

PORT=5000


Run server

nodemon server
