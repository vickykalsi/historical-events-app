# Historical events PERN stack CRUD app with selections on the basis of chosen date, JWT based authentication and bookmark functionality

## Features
- a clean and minimalistic UI
- JWT(Json Web Token) based authentication
- users can login and make selections
- users can bookmark events and can view them
- a simple and intuitive date selector
- users can also change their usernames
- appropriate notifications for user actions

## Tech stack
- Frontend : HTML,CSS,React,React Router,Vite
- Backend : Node.js/Express
- Database : PostgreSQL
- Authentication : JWT(Json Web Token) authentication,Bcrypt password  hashing
- External Api : https://freeapihub.com/apis/byabbe

## Installation and Setup
### Clone git repo
```
git clone https://github.com/vickykalsi/historical-events-app.git
cd "historical-events-app"
```
### In order to run both frontend and backend at local environment simultaneously, install concurrently dependency
```
npm install
```
### For database create an "emperors" postgreSQL database
```
psql
CREATE DATABASE emperors;
```
### Install Frontend dependencies
```
cd frontend
npm install
```
### env file for Frontend
create two .env files inside frontend folder .env.production and .env.development with field as VITE_API_URL
- .env.development
```
VITE_API_URL=http://localhost:3000
```
- .env.production
```
VITE_API_URL=path_to_your_backend_server
```
### Install Backend dependencies
```
cd backend
npm install
```
### env file for Backend
create a .env file inside backend folder with fields NODE_ENV,DB_CONNECTION_STRING,JWT_SECRET_KEY,CLIENT_URL
```
NODE_ENV="development"

DB_CONNECTION_STRING=postgres://postgres_user:postgres_password@localhost:5432/emperors

JWT_SECRET_KEY=your_secret_key_for_jwt_authentication

CLIENT_URL=http://localhost:5173
```
### Run application
- inside root folder run dev script
```
npm run dev
```
- visit http://localhost:5173 on your browser

## Notes
- Database must run before backend starts

