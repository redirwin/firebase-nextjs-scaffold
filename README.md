
# Next.js Firebase Authentication Scaffold

A production-ready authentication scaffold built with Next.js 14, TypeScript, Firebase Auth, and Shadcn UI. This project provides a complete authentication system with protected routes, role-based access, and a clean UI.

## Features

- 🔐 Complete authentication system (Email/Password & Google)
- 👤 User profile management
- 🛡️ Protected routes with role-based access
- 📧 Email verification
- 🔑 Password reset functionality
- 🎨 Clean UI with Shadcn components
- 📱 Fully responsive design
- ⚡ Server-side rendering support

## Prerequisites

- Node.js 18.17 or later
- npm or yarn
- A Firebase project

## Getting Started

1. Clone the repository:
	 - `git clone [your-repo-url]`
	 - `cd firebase-scaffold`

2. Install dependencies: `npm install` or `yarn install`

3. Set up Firebase:

   a. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   
   b. Enable Authentication methods:
      - Go to Authentication > Sign-in method
      - Enable Email/Password
      - Enable Google Sign-in
      - Add your domain to authorized domains

   c. Create a Firestore database:
      - Go to Firestore Database
      - Create Database
      - Start in production mode
      - Choose a location
      - Create the following collections:
        - `users` (will be auto-populated)

4. Configure environment variables:
	- Create a `.env.local` file in the root directory:
    ``` NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id ```

5. Run the development server: `npm run dev` or `yarn dev`
	- Visit `http://localhost:3000` to see your application.

## Project Structure
    src/
    ├── app/ # Next.js app directory
    ├── components/
    │ ├── auth/ # Authentication components
    │ ├── layout/ # Layout components
    │ ├── providers/ # Context providers
    │ └── ui/ # UI components
    ├── contexts/ # React contexts
    ├── hooks/ # Custom hooks
    ├── lib/ # Utility functions
    ├── services/ # Firebase services
    └── types/ # TypeScript types

## Authentication Flow

1. **Sign Up**:
   - User registers with email/password or Google
   - Email verification is sent
   - User profile is created in Firestore

2. **Sign In**:
   - User signs in with credentials
   - Auth state is managed globally
   - Protected routes become accessible

3. **Protected Routes**:
   - Routes under `/dashboard` require authentication
   - Admin routes check for admin role
   - Unauthorized access redirects to login

## Available Routes

- `/` - Home page
- `/login` - Sign in page
- `/register` - Sign up page
- `/forgot-password` - Password reset
- `/dashboard` - Protected user dashboard
- `/admin` - Protected admin panel
- `/unauthorized` - Access denied page

## Firebase Security Rules

Add these security rules to your Firestore: 

     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{userId} {
           allow read: if request.auth != null && request.auth.uid == userId;
           allow write: if request.auth != null && request.auth.uid == userId;
           
           // Allow admins to read/write all user documents
           allow read, write: if get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin";
         }
       }
     }

## Testing

Run the test suite: `npm test` or `yarn test`

## Deployment

1. Build the application: `npm run build` or `yarn build`

2. Deploy to Vercel:
   - Connect your repository to Vercel
   - Add environment variables
   - Deploy