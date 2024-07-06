# StartDevLink

StartDevLink is a platform designed to bridge the gap between startup founders looking for technical expertise and developers eager to build innovative products. Founders can post their requirements for a Minimum Viable Product (MVP), and developers can browse these opportunities to find exciting projects to collaborate on.

**Note:** This is a side project, and the demo site may not always be available. Everything on the site is mainly using trial settings.

Demo Site: [https://start-dev-link.vercel.app](https://start-dev-link.vercel.app)

## For Founders

Simply key in your details with the Google Forms URL in the description. 
For image for the project, key in the imgtitle field to generate images.

## For Developers

Browse through the projects and contact the founder if you're interested in collaborating.

## Current Features

- Founders can create, read, update, and delete (CRUD) a project post.
- Search functionality on the main page.
- Landing page.
- Google login.

## Technology Used

- **tRPC**: For end-to-end type safety and easy API creation.
- **Next.js**: As the React framework for server-side rendering and static site generation.
- **Firebase**: For authentication, database, and hosting.
- **SuperTokens**: For secure session management.
- **Unsplash**: For generating images (demo purposes).
- **Formik**: For form management.
- **react-hot-toast**: For toast notifications.
- **react-feather**: For icons.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js
- Yarn

### Installation

1. Clone the repo
   ```
   git clone https://github.com/your_username/start-dev-link.git
   ```
2. Install Yarn packages
 ``` 
 yarn install
 ```
3. Set up environment variables

Refer to the .env.example file in the root directory and add your own values.

### Usage
1. Run the development server
 ``` 
 yarn dev 
 ```
2. Open http://localhost:3000 with your browser to see the result.

### License
Distributed under the MIT License. See `LICENSE`