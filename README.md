# Gizmos Backend API

**Gizmos Backend** is a Node.js/Express RESTful API for an e-commerce-like system.  
It provides user authentication, cart management, product/catalog operations, discounts, order lifecycle management, and payment link generation. Swagger is integrated for live API documentation.

## Features

- JWT-based authentication (signin, signup, refresh token)
- User profile retrieval & editing
- Product CRUD (create, read, update, delete)
- Discount management
- Cart retrieval and full replacement (edit)
- Order creation, subscription, cancellation, refunding
- Payment link generation (PhonePe integration)
- Swagger UI documentation
- Centralized error handling
- Rate limiting, security headers, CORS
- Structured logging with Winston
- MongoDB/Mongoose with pagination support

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Example Endpoints](#example-endpoints)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)

## Prerequisites

- Node.js >= 23.0.0
- npm (comes with Node.js)
- MongoDB instance (local or cloud)
- PhonePe credentials (for payment link generation) if using payment features

## Getting Started

```bash
git clone <repository-url>
cd gizmos-backend
npm install
cp sample-env .env
# edit .env to fill in real values
```

## Running the Application

For development -

```bash
npm run development
```

For production -

```bash
npm run production
```

## API Documentation

The API is documented using Swagger. You can access the live documentation at:

```bash
/docs
```

## Authentication

This API uses JWT for authentication. You can sign up and sign in to receive a token, which should be included in the `Authorization` header for protected routes.
Refresh tokens are sent in cookies for session management and access token are sent in the response given in the `Authorization` header.

## Payment Integration

This API integrates with PhonePe for payment processing. You will need to provide PhonePe credentials in the `.env` file to use the payment features.

## Example Endpoints

- **Sign Up**: `POST /api/v1/auth/signup`
- **Sign In**: `POST /api/v1/auth/signin`
- **Get User Profile**: `GET /api/v1/users/profile`
- **Update User Profile**: `PUT /api/v1/users/profile`
- **Create Product**: `POST /api/v1/products`
- **Get Products**: `GET /api/v1/products`
- **Create Cart**: `POST /api/v1/carts`
- **Get Cart**: `GET /api/v1/carts`
- **Create Order**: `POST /api/v1/orders`
- **Generate Payment Link**: `POST /api/v1/payments/link`

## Deployment

For deployment, this app uses Render. It is deployed as a web service.

## Folder Structure

```
├── controllers/       # Request handlers
├── middlewares/       # Auth, error, rate-limit, etc.
├── models/            # Mongoose schemas
├── routes/            # Express routers
├── services/          # Business logic, integrations
├── configs/           # Swagger, DB, etc.
├── constants/         # Reusable messages/responses
├── utils/             # Helpers
├── server.js          # Entry point
├── package.json
├── sample-env         # Example env file
└── README.md          # Documentation
```
