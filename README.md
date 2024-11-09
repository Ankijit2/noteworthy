# Noteworthy

Noteworthy is a feature-rich notes application where users can create, edit, and delete personal notes. The app is built using Next.js, Tailwind CSS, and MongoDB, with Auth0 for user authentication, and React Hook Form and Zod for form validation.

## Features

- **User Authentication**: Secure authentication managed by Auth0.
- **CRUD Operations**: Users can easily create, read, update, and delete notes.
- **Form Validation**: Implemented using React Hook Form and Zod.
- **Responsive Design**: Built with Tailwind CSS.
- **State Management**: Efficient data handling with React Query and Tanstack Query.

## Technologies Used

- **Next.js**: Framework for server-rendered React applications.
- **Prisma**: ORM for interacting with MongoDB.
- **ShadCn**: A Component library 
- **Auth0**: Manages user authentication.
- **MongoDB**: Database for storing user notes.
- **React Query & Tanstack Query**: Efficient data fetching and caching.
- **React Hook Form**: Simplifies form handling.
- **Zod**: Schema validation for form inputs.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **Lucide-React**: Provides icons for UI elements.
- **TypeScript**: Static type-checking for safer code.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (for dependency management)
- [MongoDB Atlas](https://www.mongodb.com/atlas/database) or a local MongoDB instance
- [Auth0 account](https://auth0.com/) for authentication setup

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone 
    cd noteworthy
    ```

2. Install the dependencies:

    ```bash
    pnpm install
    ```

3. Set up the environment variables by creating a `.env` file in the root directory and adding the following:

    ```plaintext
    # Database connection
    DATABASE_URL="mongodb+srv://<username>:<password>@cluster0.mongodb.net/skillero?retryWrites=true&w=majority"

    # Auth0 configuration
    AUTH0_SECRET='your_auth0_secret'
    AUTH0_BASE_URL='http://localhost:3000'
    AUTH0_ISSUER_BASE_URL='https://your-auth0-domain.auth0.com'
    AUTH0_CLIENT_ID='your_auth0_client_id'
    AUTH0_CLIENT_SECRET='your_auth0_client_secret'
    ```

    Replace `<username>`, `<password>`, and other placeholder values with your actual MongoDB and Auth0 credentials.


### Running the App

To start the development server:

```bash
pnpm dev
