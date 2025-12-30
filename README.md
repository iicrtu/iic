# IIC Website - React Application

A modern React application for the Innovation & Incubation Cell (IIC) website, built to match the Figma design exactly.

## Features

- **React 18** - Latest React with hooks and modern patterns
- **Component-Based Architecture** - Modular, reusable components
- **Exact Figma Match** - Colors, fonts, spacing, and layouts match the design precisely
- **Responsive Design** - Works on desktop, tablet, and mobile devices
- **Smooth Animations** - Scroll animations and hover effects
- **Form Handling** - Contact form with React state management
- **Modern CSS** - CSS variables, flexbox, and grid layouts

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.js
│   │   └── Header.css
│   ├── Hero/
│   │   ├── Hero.js
│   │   └── Hero.css
│   ├── WhatWeOffer/
│   │   ├── WhatWeOffer.js
│   │   └── WhatWeOffer.css
│   ├── Events/
│   │   ├── Events.js
│   │   └── Events.css
│   ├── Startups/
│   │   ├── Startups.js
│   │   └── Startups.css
│   ├── Contact/
│   │   ├── Contact.js
│   │   └── Contact.css
│   └── Footer/
│       ├── Footer.js
│       └── Footer.css
├── images/              # All images from Figma
├── App.js              # Main app component
├── App.css             # App-level styles
├── index.js            # React entry point
└── index.css           # Global styles
```

## 🛠️ Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   The app will open at [http://localhost:3000](http://localhost:3000)

3. **Build for Production**
   ```bash
   npm run build
   ```

## 📦 Dependencies

- **react** (^18.2.0) - React library
- **react-dom** (^18.2.0) - React DOM rendering
- **react-scripts** (^5.0.1) - Create React App scripts

## 🎨 Design System

### Colors
- Primary Gradient: `linear-gradient(243deg, rgba(60, 135, 255, 1) 0%, rgba(242, 105, 222, 1) 100%)`
- Hero Gradients: Multiple gradient circles for visual effect
- Text Colors: Various shades of black and gray

### Fonts
- **Inter** - Logo and headings
- **Roboto** - Primary body text
- **Anek Latin** - Buttons and contact info
- **Rubik** - Some headings
- **Secular One** - Specific text elements
- **Roboto Flex** - Hero description

### Components

1. **Header** - Navigation with logo and menu
2. **Hero** - Welcome section with gradient background
3. **WhatWeOffer** - 6 service cards with icons
4. **Events** - Event cards with details
5. **Startups** - Startup showcase cards
6. **Contact** - Contact form and information
7. **Footer** - Links, contact info, and legal pages

## 🔧 Customization

### Adding New Components
1. Create a new folder in `src/components/`
2. Add `ComponentName.js` and `ComponentName.css`
3. Import and use in `App.js`

### Modifying Styles
- Global styles: `src/index.css`
- App-level styles: `src/App.css`
- Component styles: Each component has its own CSS file

### Adding Images
Place images in `src/images/` and import them in components:
```javascript
import imageName from '../images/image-name.png';
```

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Deploy to Netlify/Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy!

## 📝 Notes

- All measurements and spacing match Figma design specifications
- The design is pixel-perfect to the Figma mockup
- Images are optimized and loaded from the `src/images/` directory
- Form validation is implemented in the Contact component
- Smooth scrolling is handled via React event handlers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for Innovation & Incubation Cell
