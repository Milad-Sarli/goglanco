# Goglanco - Rug Restoration Website

A modern, responsive website for a rug restoration business built with Next.js, React, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Dark mode support
- Animated sections using GSAP
- Contact form with validation
- Google Maps integration
- SEO optimized

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/goglanco.git
cd goglanco
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Google Maps API Key Setup

To use the Google Maps component on the contact page, you need to:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Maps JavaScript API
4. Create an API key with appropriate restrictions
5. Add the API key to your `.env.local` file
6. Update the `GOOGLE_MAPS_API_KEY` constant in `src/components/sections/contact/contact-map-section.tsx` with your API key

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

- `src/app` - Next.js app router pages
- `src/components` - Reusable UI components
- `src/components/sections` - Page sections
- `src/lib` - Utility functions and shared code
- `src/types` - TypeScript type definitions

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [GSAP](https://greensock.com/gsap/) - Animation library
- [React Hook Form](https://react-hook-form.com/) - Form handling
- [Zod](https://zod.dev/) - Schema validation
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview) - Maps integration

## License

This project is licensed under the MIT License - see the LICENSE file for details.
