# SME & Big Industry Matching Platform

Welcome to the SME & Big Industry Matching Platform, a web application designed to connect Small and Medium-sized Enterprises (SMEs) with large industry players based on complementary products. This platform aims to increase the visibility of SMEs in the market by pairing them with established brands, facilitating collaborative opportunities, and boosting their market reach.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
5. [Usage](#usage)
    - [Running the Development Server](#running-the-development-server)
    - [Building for Production](#building-for-production)
6. [Project Structure](#project-structure)
7. [Core Functionality](#core-functionality)
    - [Matching Algorithm](#matching-algorithm)
    - [User Authentication & Authorization](#user-authentication--authorization)
8. [Advanced Features](#advanced-features)
9. [Testing](#testing)
10. [Deployment](#deployment)
11. [Contributing](#contributing)
12. [License](#license)

## Project Overview

The SME & Big Industry Matching Platform is a web-based solution built using Next.js that facilitates the matching of complementary products between SMEs and larger industry players. For instance, an SME producing cheese can be matched with a large bread manufacturer, allowing the cheese to be marketed as part of the bread brand's product line.

## Features

- **User Authentication & Authorization**: Secure login and role-based access control.
- **Profile Management**: Users can manage their profiles, including company details.
- **Product Management**: SMEs can list their products and specify matching criteria.
- **Matching Algorithm**: A core algorithm that identifies complementary products between SMEs and large industry players.
- **Notification System**: Email and in-app notifications to inform users about new matches and updates.
- **Analytics Dashboard**: Visual reports and insights into matching activities.
- **Two-Factor Authentication (2FA)**: Enhanced security with optional 2FA during login.
- **Responsive Design**: A mobile-friendly user interface.

## Technology Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://reactjs.org/)
- **Backend**: [Node.js](https://nodejs.org/), [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Authentication**: [JWT](https://jwt.io/), [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Email Notifications**: [Nodemailer](https://nodemailer.com/)
- **2FA**: [Speakeasy](https://github.com/speakeasyjs/speakeasy)
- **Deployment**: [Vercel](https://vercel.com/), [Heroku](https://www.heroku.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (Local or cloud instance)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fahadkabali/sme-matching.git
   cd sme-matching

2. **Install dependencies:**

    npm install
3. **Set up the environment variables:**

    Create a .env.local file in the root directory and add the required environment variables as outlined below.

    Environment Variables
    Add the following variables to your .env.local file:

    "
    # App
        NEXT_PUBLIC_APP_URL=http://localhost:3000

    # JWT Secret
        JWT_SECRET=your_jwt_secret

    # MongoDB
        MONGODB_URI=<mongourl>

    # Nodemailer (Email Service)
        EMAIL_HOST=smtp.yourservice.com
        EMAIL_PORT=587
        EMAIL_USER=your-email@domain.com
        EMAIL_PASS=your-email-password

    # 2FA Secret (Optional)
        TWO_FA_SECRET=your_2fa_secret

    "

    **Usage**
        Running the Development Server
        Start the development server:

        npm run dev
        Open http://localhost:3000 with your browser to see the application.

    **Building for Production**
        To build the application for production:

        npm run build
    **To start the production server:**
        npm run start

        sme-matching/
    ├── components/          # Reusable UI components
    ├── pages/               # Next.js pages
    │   ├── api/             # API routes
    │   ├── auth/            # Authentication pages
    │   ├── dashboard/       # Dashboard pages
    │   ├── index.js         # Landing page
    │   └── profile.js       # User profile page
    ├── public/              # Static assets
    ├── styles/              # Global styles
    ├── utils/               # Utility functions (e.g., email, authentication)
    ├── .env.local           # Environment variables
    └── README.md            # Project documentation

    # Core Functionality
        **Matching Algorithm**
            The matching algorithm is the core of this platform, responsible for pairing SMEs with large industry players based on complementary products.

        **Logic:**
            The algorithm analyzes the product listings of SMEs and matches them with suitable products from large industry players based on predefined criteria (e.g., category, market demand).
        **Implementation:**
            The algorithm is implemented in the backend as a service that runs periodically or can be triggered by user actions.
        **User Authentication & Authorization**
            User authentication is implemented using JWT, with role-based access control to differentiate between Admins, SMEs, and Industry Players. Two-Factor Authentication (2FA) is also implemented for added security.

        **Registration & Login:** Users can sign up and log in using their email and password.
            2FA: Optional 2FA can be enabled for extra security.
            Profile Management: Users can update their profiles and manage their account details.
            Two-Factor Authentication (2FA)
            Two-Factor Authentication adds an extra layer of security by requiring users to provide a second form of authentication in addition to their password.

    # Advanced Features
        **Notifications:** The platform sends email notifications to users about important events, such as new matches or updates.
        **Analytics Dashboard:** Users can view detailed analytics about their matching activities, including visual reports.
        **Customizable Matching Criteria:** Advanced users can customize the criteria used by the matching algorithm.

    # Testing
        To run tests for the platform:
        npm run test
    **Deployment**
        The platform can be deployed to a cloud service like Vercel or Heroku.

    # Contributing
        Contributions are welcome! Please open an issue or submit a pull request if you'd like to contribute to this project.

    **Steps to Contribute**
        -Fork the repository.
        -Create a new branch: git checkout -b feature-branch-name.
        -Make your changes and commit them: git commit -m 'Add some feature'.
        -Push to the branch: git push origin feature-branch-name.
        -Submit a pull request.
    # License
        This project is licensed under the MIT License - see the LICENSE file for details.

            This comprehensive `README.md` file covers all aspects of the project, including setup, core functionality, advanced features, and deployment instructions. It should serve as a helpful guide for developers working on the project or for those interested in contributing.


