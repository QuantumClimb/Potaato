# POTAATO - Restaurant Ordering App

A modern, responsive restaurant ordering web application built with React and TypeScript. POTAATO specializes in weekly special dishes with seamless WhatsApp integration for easy ordering.

## 🍽️ Features

- **Weekly Menu System**: Rotating weekly special dishes
- **WhatsApp Integration**: Direct ordering via WhatsApp
- **Responsive Design**: Mobile-first approach with modern UI
- **Order Management**: Quantity selection and customer details
- **Configuration**: Easy menu updates via JSON configuration

## 🚀 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM
- **State Management**: React Query
- **Icons**: Lucide React

## 🛠️ Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd potaato

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Configuration

The app is configured via `public/config.json`:

```json
{
  "appName": "POTAATO",
  "maxOrdersPerWeek": 20,
  "whatsappNumber": "919884050857",
  "checkoutMessageTemplate": "Hi I would like {{quantity}} plate(s) of {{dishName}}.",
  "currentWeek": 1,
  "weeklyDishes": [...]
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push to main branch
3. Custom domain support available

### Manual Deployment

```bash
# Build the project
npm run build

# The dist folder contains the production build
# Deploy the contents to your hosting provider
```

## 🎨 Design System

POTAATO features a unique potato-inspired design system:

- **Colors**: Warm, earthy palette (cream, deep red, gold, yellow)
- **Typography**: Baloo 2 (headings) + Nunito (body)
- **Components**: Custom potato-themed UI components
- **Animations**: Smooth transitions and hover effects

## 📄 License

This project is private and proprietary to Quantum Climb.
