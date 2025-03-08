# Suupala Recipe App

A web application for generating and managing recipes using AI built with Next.js 13+ and Tailwind CSS.

## Features

- 🔐 User authentication
- 🤖 AI-powered recipe generation based on available ingredients
- 📝 Recipe management (read, delete)
- 🥗 Ingredient tracking
- 🎯 Responsive design

## Tech Stack

- Next.js 13+ (App Router)
- Tailwind CSS
- Axios for API calls
- js-cookie for token management

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/ahmedeleven/suupala-frontend.git
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with:

```
NEXT_PUBLIC_API_SERVER_URL=your_backend_url
```

4. Run the development server

```bash
npm run dev
```

### Project Structure

```
├── app/
│   ├── generate/     # Recipe generation
│   ├── items/        # Item management
│   ├── login/        # Authentication
│   └── recipes/      # Recipe management
├── components/
│   ├── Header.tsx    # Navigation header
│   └── Footer.tsx    # Footer component
├── hooks/
│   └── useCheckToken.ts # Authentication hook
└── public/
    └── images/       # Static assets
```

## Features

### Authentication

- Login/Logout functionality
- Token-based authentication
- Protected routes

### Recipe Management

- Generate new recipes using AI
- View all recipes
- View individual recipe details
- Delete recipes

### Item Management

- Add/Remove ingredients
- Track available ingredients
- Select ingredients for recipe generation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
