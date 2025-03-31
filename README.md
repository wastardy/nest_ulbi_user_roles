# NestJS User Management API

This is a NestJS application that provides user authentication, role management, and authorization. The project is built with TypeScript and uses PostgreSQL with Sequelize ORM for data persistence.

## Features

- User authentication (login/registration)
- JWT token-based authorization
- Role-based access control
- User management
- Swagger API documentation

## Prerequisites

- Node.js (v20+)
- Docker and Docker Compose (for PostgreSQL)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the example environment file and modify it according to your needs:

```bash
cp .example.env .development.env
```

## Running the Application

### Using Docker Compose

The easiest way to run the application with its PostgreSQL database is using Docker Compose:

```bash
docker-compose up
```

This will start both the application and the database in Docker containers.

### Running Locally

1. Start PostgreSQL using Docker 🐳:

```bash
docker run --name postgres-ulbi -p 5433:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

2. Start the application in development mode:

```bash
npm run start:dev
```

## API Documentation

The API documentation is available via Swagger at:

```
http://localhost:3000/api/docs
```

## Project Structure

- `/src` - Source code
  - `/auth` - Authentication related modules
  - `/users` - User management modules
  - `/roles` - Role management modules
  - `/dtos` - Data Transfer Objects
  - `/enums` - Enumerations
  - `/middlewares` - Auth guards and middleware
  - `/constants` - Application constants

## Database Models

- `User` - User information with roles relationship
- `Role` - User roles and permissions
- `UserRoles` - Junction table for user-role relationships

## Environment Variables

The application uses the following environment variables:

- `HOST` - Host for the NestJS server
- `PORT` - Port for the NestJS server
- `POSTGRES_HOST` - PostgreSQL server host
- `POSTGRES_PORT` - PostgreSQL server port
- `POSTGRES_USERNAME` - PostgreSQL username
- `POSTGRES_PASSWORD` - PostgreSQL password
- `POSTGRES_NAME` - PostgreSQL database name
- `JWT_SECRET` - Secret key for JWT token generation
