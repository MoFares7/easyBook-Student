Easy Book Student Project
This project is a React application built with Vite, utilizing Clean Architecture principles, Redux Toolkit for state management, and Material-UI (MUI) for the user interface with animations.

Table of Contents
1- Installation
2- Running the Project
3- Project Structure
4- Technologies Used

 ***Installation***
To get started with the project, follow these steps:

Clone the repository:

bash
Copy code
git clone [https://github.com/yourusername/your-repo-name.git](https://github.com/MoFares7/easyBook-Student.git)

Install dependencies:
Ensure you have Node.js installed, then run:

npm install

***Running the Project***
To run the project locally, use the following command:

npm run dev
This will start the development server. Open your browser and navigate to http://localhost:5173 to see the application in action.

***Project Structure***
This project follows the Clean Architecture principles to ensure separation of concerns and scalability. Here is an overview of the project structure:

src/
├── assets/  
├── components/       # Presentational components
├── Items/            # Main comman Items Like Input and Dropdown
├── core/             # Redux slices and asynchronous logic
├── context/          # Custom context
├── Layout/           # all feature and layout pages
├── utils/            # Utility functions
├── App.js            # Main application component
├── index.js          # Application entry point
└── store.js          # Redux store configuration


Project Name
This project is a React application built with Vite, utilizing Clean Architecture principles, Redux Toolkit for state management, and Material-UI (MUI) for the user interface with animations.

Table of Contents
Installation
Running the Project
Project Structure
Technologies Used
Installation
To get started with the project, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
Install dependencies:
Ensure you have Node.js installed, then run:

bash
Copy code
npm install
Running the Project
To run the project locally, use the following command:

bash
Copy code
npm run dev
This will start the development server. Open your browser and navigate to http://localhost:3000 to see the application in action.

Project Structure
This project follows the Clean Architecture principles to ensure separation of concerns and scalability. Here is an overview of the project structure:

graphql
Copy code
src/
├── components/       # Presentational components
├── containers/       # Components that connect to Redux
├── features/         # Redux slices and asynchronous logic
├── hooks/            # Custom hooks
├── services/         # API calls and services
├── styles/           # Global styles and themes
├── utils/            # Utility functions
├── App.js            # Main application component
├── index.js          # Application entry point
└── store.js          # Redux store configuration

***Technologies Used***
Vite: A fast build tool that leverages native ES modules to provide a faster and leaner development experience.
React: A JavaScript library for building user interfaces.
Redux Toolkit: A library that provides standardized methods for managing and updating application state.
MUI (Material-UI): A popular React UI framework with pre-built components and customization options.
Framer Motion: A library for animations in React, providing simple but powerful tools for creating animations.

***Clean Architecture***
This project adheres to Clean Architecture principles, which emphasize separation of concerns, maintainability, and testability. The core concepts include:

Separation of Concerns: Dividing the application into distinct sections with specific responsibilities.
Independence: Components, modules, and layers can be developed, tested, and maintained independently.
Reusability: Encouraging reusable code to enhance scalability and efficiency.


link Project https://easy-book-student.vercel.app/signin
