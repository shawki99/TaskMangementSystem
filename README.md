# Installation Guide for Task Management System

This guide will walk you through the steps required to set up and run the Task Management System on your local machine for development and testing purposes.

## Prerequisites
Before you begin, ensure you have the following installed on your system:
- **Node.js** (v12.x or later recommended)
- **npm** (usually comes with Node.js)
- **MongoDB** (v4.x or later)
- **Git**


## Clone the Repository
First, clone the repository to your local machine using Git:
```bash
git clone https://github.com/shawki99/TaskMangementSystem
cd TaskMangementSystem
```

## Install Dependencies
Navigate to the project directory (if you are not already there) and install the required npm packages:
```bash
npm install
```

## Environment Configuration
Create a `.env` file in the root of the project directory. This file will contain all the necessary environment variables:
```bash
CONNECTION_STRING=<your_mongodb_connection_string>
DATABASE_NAME=<your_database_name>
JWT_SECRET=<your_jwt_secret_key>
```

## Run Database Migrations
Before starting the application, you need to set up the database schema. Use the migrate-mongo tool to run the migration scripts in your terminal:
```bash
migrate-mongo up
```

## Start the Application
```bash
npm start
```
