# Routing Guide

## 📍 Page Routes

The application uses React Router for navigation. All pages maintain the same design style and structure as the Figma design.

### Available Routes

1. **`/` (Home)** - Main landing page
   - Hero section
   - What We Offer
   - Events preview
   - Startups preview
   - Contact section

2. **`/about`** - About Us page
   - Our Story section
   - Vision and Mission cards
   - Team section with Core Team and Alumni

3. **`/team`** - Team page (redirects to About page with team section)

4. **`/events`** - Events page
   - Full list of events
   - Detailed event cards
   - Event descriptions and locations

5. **`/startups`** - Startups/Portfolio page
   - Portfolio statistics
   - Detailed startup cards
   - Startup information and achievements

6. **`/internships`** - Internships page
   - Internship statistics
   - Action buttons (Download Brochure, Resume Template, etc.)
   - Internship listings with details

7. **`/announcements`** - Announcements page
   - Category cards
   - Announcement listings
   - Posted and deadline dates

## 🔗 Navigation Links

### Header Navigation
- **HOME** → `/`
- **TEAM** → `/team`
- **ABOUT US** → `/about`
- **STARTUPS** → `/startups`
- **EVENTS** → `/events`

### Footer Links
- All footer links use React Router Links
- Quick Links section navigates to respective pages

### Home Page Buttons
- **"View All Events"** button → `/events`
- **"View All Startups"** button → `/startups`

## 🎨 Design Consistency

All pages follow the same design principles:
- Same color scheme and gradients
- Consistent typography (Inter, Roboto, Anek Latin, etc.)
- Matching spacing and layout patterns
- Same component styles and effects

## 🚀 Usage

Navigation is handled automatically through React Router. Simply click any navigation link or button to navigate between pages.

The main landing page (`/`) remains completely intact and unchanged - all new pages are separate routes.

