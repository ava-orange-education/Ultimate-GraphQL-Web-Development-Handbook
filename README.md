# Ultimate GraphQL Web Development Handbook

[![Book Cover](assets/book-cover.jpg)](https://ava.orange.com)

## About the Book

The **Ultimate GraphQL Web Development Handbook** is a comprehensive guide to building modern web applications using GraphQL. Published by Orange, AVA®, this book takes you through a step-by-step journey of GraphQL development from basics to advanced concepts.

## Repository Structure

This repository contains the complete code examples for all chapters of the book. Each chapter has its own folder with the corresponding code:

```text
/chapter-1/  - Introduction to GraphQL
/chapter-2/  - Installing GraphQL - Backend
...
/chapter-10/ - Ensuring Scalability - Backend Strategies
```

Each chapter folder contains both frontend and backend code, showing the progression of development throughout the book.

## Prerequisites

Before running the code examples, ensure you have the following installed:

- **Node.js** (v14 or later)
- **MongoDB** (v4.4 or later)
- **Google Developer Account** (for OAuth authentication)

## Common Setup Instructions

### Backend Setup

1. Navigate to the backend directory of any chapter:

   ```bash
   cd "chapter X/backend"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on the provided `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in the `.env` file:
   - Set up MongoDB connection string
   - Add your Google OAuth credentials
   - Configure admin email

5. Start the backend server:

   ```bash
   npm start
   ```

   The GraphQL server will be available at [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Frontend Setup

1. Navigate to the frontend directory of any chapter:

   ```bash
   cd "chapter X/frontend"
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

   The React application will be available at [http://localhost:3000](http://localhost:3000)

## Environment Configuration

The backend requires the following environment variables in the `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/mydb
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
ADMIN_EMAIL=admin@example.com
```

### Getting Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Create an OAuth 2.0 Client ID
5. Configure the consent screen and add the necessary scopes
6. Add authorized JavaScript origins and redirect URIs for your application
7. Copy the Client ID and Client Secret to your `.env` file

## Code Evolution

As you progress through the chapters, you'll notice the code evolves and improves. Later chapters include:

- Enhanced authentication mechanisms
- More sophisticated GraphQL schema designs
- Advanced frontend components and state management

## Troubleshooting

- **MongoDB Connection Issues**: Ensure MongoDB is running on your system
- **Authentication Errors**: Verify your Google OAuth credentials are correctly set up

---

© Ultimate GraphQL Web Development Handbook, published by Orange, AVA®
