# React, TS and Shadcn/ui Starter

Starter template to kickstart your next project. Built with Vite, React, Tailwind CSS, and Shadcn/ui.

## Getting Started

Follow these steps to get your local development environment up and running.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18.x or higher)
- `npm`, `yarn`, or `pnpm` package manager

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/niokagi/react-shadcn-starter.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd your-repo-name
    ```

3.  **Install dependencies:**

    ```bash
    # Using npm
    npm install

    # Or using yarn
    yarn

    # Or using pnpm
    pnpm install
    ```

### Running the Development Server

To start the local development server, run the following command. The application will be available at `http://localhost:5173`.

```bash
npm run dev
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Bundles the application for production.
  -- `npm run lint`: Lints the code using ESLint.
- `npm run preview`: Serves the production build locally for preview.

## How to Use shadcn/ui

This starter is already configured to use shadcn/ui. To add new components, use the official `shadcn-ui` CLI.

**Example: Adding a new Button component**

Run this command in your terminal:

```bash
npx shadcn-ui@latest add [element-name (e.g button)]
```

The CLI will automatically add the `button.jsx` file to `src/components/ui`. You can then import and use it in your application components.
