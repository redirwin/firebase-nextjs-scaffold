# Next.js Firebase Authentication Scaffold

A Firebase authentication scaffold built with Next.js 14, TypeScript, Firebase Auth, Firestore Database, Tailwind CSS, and Shadcn UI. This project provides a complete authentication system with protected routes, role-based access, and a clean UI. Use this as a starting point for your next project!

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
- Git

## Getting Started

1. Clone the repository:
	```bash
	git clone https://github.com/redirwin/firebase-nextjs-scaffold.git
	cd firebase-scaffold
	```

2. Install dependencies:
	```bash
	npm install
	# or
	yarn install
	```

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
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
    ```

5. Run the development server:
	```bash
	npm run dev
	# or
	yarn dev
	```
	Visit `http://localhost:3000` to see your application.

## Technology Stack

- Next.js 14
- TypeScript
- Firebase Authentication
- Firebase Firestore
- Shadcn UI
- Tailwind CSS
- React Hook Form
- Zod Validation
- React Query

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

## Development

### Code Style
This project uses:
- ESLint for code linting
- Prettier for code formatting
- TypeScript for static type checking

### Environment Setup
Make sure to:
- Enable TypeScript strict mode
- Configure ESLint
- Set up Prettier
- Configure your IDE/editor to format on save

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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)