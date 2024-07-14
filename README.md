# Crypto Calculator

## Project Description

This project is a web application that allows users to use a crypto currency calculator.

## Technologies Used

- **Next.js**: React-based web framework.
- **TypeScript**: Provides type safety and enhanced editor support.
- **Wagmi**: Provides additional functionality for specific operations.
- **Tailwind CSS**: A utility-first CSS framework for rapid and customizable styling.
- **Zod**: TypeScript-first schema validation library providing type safety.
- **Zustand**: Simple and scalable state management for React applications.

## Features

- **Dynamic Data Assignment**: Dynamically assigns calculations based on user-input data.

- **Dark / Light Theme Options**: Enhances accessibility by providing dark and light theme options.

- **PDF Export of Calculation Results**: Allows users to export calculation results as PDF for a better user experience.

- **State Persistence with Zustand**: Uses Zustand to persist application state in the URL, preventing data loss.

## How to Start the Project

1. Download or clone the project.
2. Create a `.env` file and enter the following value:
   ```
   NEXT_PUBLIC_PROJECT_ID =
   ```
3. Open your terminal in the project directory and run the following commands:
   ```
   npm install
   npm run dev
   ```
4. Visit `http://localhost:3000` in your browser to view the application.

## Project Structure

The project adopts an architectural approach focused on shared components due to its relatively small scale. While component reusability is not a primary concern, an atomic design approach has not been adopted.