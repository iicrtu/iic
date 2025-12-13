# Quick Start Guide

## 🚀 Getting Started

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

### Step 3: Build for Production
```bash
npm run build
```

## 📁 File Structure Overview

```
cursor/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # React components
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── WhatWeOffer/
│   │   ├── Events/
│   │   ├── Startups/
│   │   ├── Contact/
│   │   └── Footer/
│   ├── images/             # All images
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies
└── README.md              # Full documentation
```

## 🎯 Key Features

✅ **React 18** - Modern React with hooks  
✅ **Component-Based** - Modular, reusable components  
✅ **Responsive** - Works on all devices  
✅ **Figma Match** - Exact design implementation  
✅ **Form Handling** - Contact form with validation  
✅ **Smooth Animations** - Scroll and hover effects  

## 🔧 Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

## 📝 Notes

- All images are in `src/images/`
- Each component has its own CSS file
- Global styles are in `src/index.css`
- The design matches Figma exactly

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Windows
set PORT=3001 && npm start

# Mac/Linux
PORT=3001 npm start
```

**Module not found errors?**
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

**Build errors?**
```bash
# Clear cache and rebuild
npm run build -- --reset-cache
```

## 📞 Need Help?

Check the main README.md for detailed documentation.

