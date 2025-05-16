# BFFLender - Mortgage Lending Landing Page

A modern, responsive landing page for BFFLender - "Your BFF in Home Financing" - built with Next.js and TailwindCSS.

## Project Overview

BFFLender is a fictional mortgage lending company focused on providing transparent, relationship-focused lending solutions. This landing page showcases their unique value proposition including the P&L Challenge, wide product set, and other benefits for mortgage professionals.

## Features

- Fully responsive design that works on mobile, tablet, and desktop
- Modern UI with gradients, cards, and other visual components
- Component-based architecture for easy maintenance and updates
- Fast loading times with Next.js
- Styled with TailwindCSS for consistent design

## Technologies Used

- Next.js 15.3.2
- React 19.0.0
- TailwindCSS 4.0
- Lucide React (for icons)
- TypeScript

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bfflender.git
cd bfflender
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
bfflender/
├── app/               # Next.js app directory
│   ├── components/    # React components
│   ├── globals.css    # Global styles
│   ├── layout.tsx     # Root layout
│   └── page.tsx       # Main landing page
├── public/            # Static assets
├── next.config.mjs    # Next.js configuration
├── package.json       # Project dependencies
└── tailwind.config.js # Tailwind configuration
```

## Components

The landing page is built with the following components:

- **Navigation** - Main navigation bar with links and CTA button
- **Hero** - Main hero section with headline and value proposition
- **TrustIndicators** - Key statistics to build trust
- **PLChallenge** - The P&L Challenge feature section
- **Benefits** - Cards displaying key benefits for mortgage professionals
- **Testimonials** - Customer testimonials
- **CallToAction** - Final CTA section
- **Footer** - Footer with links and contact information

## Customization

### Colors

The main color scheme can be customized in the `tailwind.config.js` file. The current theme uses:

- Indigo/Blue: For main branding elements and gradients
- Orange: For CTA buttons and accents
- Teal: For secondary accents
- Coral: For hover states

### Images

Replace the placeholder images in the components with your own brand assets.

## Deployment

This project can be deployed to any hosting provider that supports Next.js applications, such as Vercel, Netlify, or AWS.

```bash
# Build for production
npm run build

# Start production server
npm start
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Design inspired by modern mortgage lending websites
- Icons provided by Lucide React
