# TaxComply AI

TaxComply AI is an intelligent, AI-powered platform designed to simplify tax compliance for individuals and businesses in Nigeria. It provides instant tax calculations, personalized financial insights, and tools for document management, all powered by the latest tax laws and generative AI.

## Key Features

- **Automated Tax Calculation:** Instantly calculate PAYE based on your income, deductions, and allowances.
- **AI-Powered Advisor:** Get personalized strategies to optimize your tax position and discover potential savings.
- **Document Analysis:** Upload financial documents and ask questions in natural language to get a quick analysis.
- **Formula Sandbox:** Test and create custom financial calculations using natural language or an Excel-like syntax.
- **Tax Constitution Browser:** Explore the underlying tax rules and judicial precedents that power the platform's calculations.
- **Responsive Dashboard:** A clean, modern interface to view your financial overview at a glance.

## Technology Stack

This project is a modern web application built with a focus on performance, developer experience, and AI integration.

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **AI Integration:** [Genkit (Firebase AI)](https://firebase.google.com/docs/genkit)
- **State Management:** React Hooks & Context API
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20 or later recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### 1. Set Up Environment Variables

This project uses Google's Gemini models for its AI capabilities, which requires an API key.

1.  Create a new file named `.env` in the root of the project.
2.  Obtain an API key for the Gemini API from [Google AI Studio](https://aistudio.google.com/app/apikey).
3.  Add the following line to your `.env` file, replacing `YOUR_API_KEY` with your actual key:

    ```bash
    GEMINI_API_KEY=YOUR_API_KEY
    ```

### 2. Install Dependencies

Open your terminal, navigate to the project's root directory, and run the following command to install the necessary packages:

```bash
npm install
```

### 3. Run the Development Server

Once the installation is complete, you can start the development server:

```bash
npm run dev
```

This will start the Next.js application, typically on `http://localhost:9002`. Open this URL in your browser to see the application running.
