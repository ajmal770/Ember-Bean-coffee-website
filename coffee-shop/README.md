# EMBER & BEAN | Specialty Coffee & Kitchen

An award-winning, editorial-grade, fully responsive web application for an international specialty coffee roastery and restaurant. Built with **React.js**, **Vite**, **Tailwind CSS**, **Node.js**, **Express.js**, and browser **Local Storage** for state persistence.

---

## 🌟 Live Demo & Preview
- **Frontend URL**: [http://localhost:5174](http://localhost:5174)
- **Backend API URL**: [http://localhost:5000](http://localhost:5000)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🎨 Branding & Visual Identity System

| Brand Token | Description |
| :--- | :--- |
| **Official Name** | **EMBER & BEAN** |
| **Subtitle** | **SPECIALTY COFFEE & KITCHEN** |
| **Tagline** | **Good Coffee. Great Food. Better Moments.** |

| Color Token | Hex Code | Usage |
| :--- | :--- | :--- |
| **Primary Black** | `#171717` | Navigation, hero canvas, footer, dark luxury sections |
| **Secondary Black** | `#242424` | Card containers, drawer backgrounds, input fields |
| **Dark Charcoal** | `#303030` | Structural borders, dividers, subtle hover states |
| **Sand Beige** | `#D8C3A5` | Main content accents, category labels, editorial details |
| **Warm Sand** | `#E8D8C3` | Secondary typography, softer highlights |
| **Cream White** | `#F7F3EC` | Primary editorial headings, high-contrast text |
| **Golden Yellow** | `#E9B949` | Call-to-actions, badges, rating stars, active indicators |
| **White** | `#FFFFFF` | Readability highlights and contrasts |
| **Muted Text** | `#888078` | Subtext, ingredient descriptions, timestamps |

### 🖋️ Typography Hierarchy
- **Editorial Headings**: `Playfair Display` (Oversized, serif, luxury editorial presence)
- **Body Prose**: `Inter` (Precision readability, crisp metrics, high legibility)
- **Buttons & Navigation**: `DM Sans` (Uppercase tracking, geometric modern aesthetic)

---

## 🚀 Key Features

### 1. Landing Page (Home)
- **Full-Screen Editorial Hero**: "Good Coffee. Great Food. Better Moments." with extracted coffee cup splash, waffle crisps, animated steam, and floating beans.
- **Featured Categories**: 6 artisanal culinary pillars (Salads, Burgers, Coffee, Sandwiches, Starters, Fried Chicken) with hover zoom and stagger reveal.
- **Patron Best Sellers**: 4-column grid of dishes with instant add-to-cart, wishlist toggle, and quick-view detail modal.
- **Heritage Story Preview**: Split-layout photography featuring micro-batch roastery history.
- **The Ember & Bean Standard (Why Choose Us)**: 4 value cards highlighting fresh ingredients, specialty coffee, haute comfort food, and hospitality.
- **Special Offers**: Twilight tasting duo banner with interactive promo codes.
- **Customer Testimonials**: Interactive review carousel featuring culinary critics and patrons.
- **Curated Instagram Gallery**: Grid showing culinary moments, microfoam art, and interior ambience.
- **Final Call to Action**: Reservation and menu navigation portal.
- **Comprehensive Footer**: Quick links, opening hours, address, phone, and back-to-top button.

### 2. Full Artisanal Menu (36 Food Products across 6 Categories)
- **Category 1 – Salads (6 items)**: Classic Caesar Salad, Greek Garden Salad, Fresh Avocado Salad, Grilled Chicken Salad, Mediterranean Salad, Corn & Veggie Salad.
- **Category 2 – Burgers (6 items)**: Classic Beef Burger, Crispy Chicken Burger, Double Cheese Burger, Spicy Zinger Burger, BBQ Chicken Burger, Veggie Delight Burger.
- **Category 3 – Coffee (6 items)**: Espresso, Cappuccino, Café Latte, Americano, Mocha, Caramel Macchiato.
- **Category 4 – Sandwiches (6 items)**: Grilled Chicken Sandwich, Club Sandwich, Classic Veg Sandwich, Cheese Sandwich, BBQ Chicken Sandwich, Crispy Paneer Sandwich.
- **Category 5 – Starters (6 items)**: French Fries, Cheesy Garlic Bread, Chicken Nuggets, Mozzarella Sticks, Onion Rings, Crispy Chicken Wings.
- **Category 6 – Fried Chicken (6 items)**: Classic Fried Chicken, Crispy Chicken Strips, Spicy Fried Chicken, Chicken Popcorn, Hot & Crispy Wings, Chicken Drumsticks.
- **Features**: Live search debouncing, price sorting, rating sorting, category tab switching with animated indicators, and responsive grid layouts.

### 3. Shopping Cart (Local Storage Persistence)
- **Storage Key**: `coffee_shop_cart`
- **Capabilities**:
  - Quantity increment, decrement, and item removal.
  - Automatic subtotal, estimated GST (5%), and grand total calculations.
  - Live animated badge count on navbar cart button.
  - Slide-over drawer with backdrop blur.
  - Interactive demonstration checkout flow.
  - Persistent across page navigation, browser reload, and browser closing.

### 4. Wishlist & Favourites (Local Storage Persistence)
- **Storage Key**: `coffee_shop_wishlist`
- **Capabilities**:
  - Quick toggle heart button on all product cards and product modals.
  - Real-time counter badge on navbar.
  - Dedicated wishlist drawer with "Move to Cart" and "Add All to Cart" actions.
  - Persistent across browser sessions.

### 5. Product Detail Modal
- High-resolution photography, calories, preparation time, and dietary tags.
- Dynamic quantity selector (+ / -) with instant price calculation.
- Direct Add-to-Order button and Wishlist toggle.

### 6. Interactive Contact & Table Reservations
- React Hook Form paired with Zod schema validation.
- Validates Full Name, Email, Phone, Subject, and Message.
- Real-time error notifications and loading spinner.
- Transmits data to Node.js / Express backend (`POST /api/contact`).
- Embedded stylized Google Maps section, address, phone, and operating hours.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js 18 (Vite)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Motion & Interactions**: Framer Motion
- **Scroll Engine**: Lenis Smooth Scroll + GSAP ScrollTrigger
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form, Zod, `@hookform/resolvers`

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js
- **Middleware**: CORS, express.json(), express.urlencoded()
- **Configuration**: dotenv

---

## 📁 Project Structure

```
coffee-shop/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── contactController.js   # Contact form session handler & validator
│   │   │   └── menuController.js      # Menu query and filter controller
│   │   ├── data/
│   │   │   └── menuData.js            # 36 menu items & 6 category definitions
│   │   ├── routes/
│   │   │   ├── contactRoutes.js       # /api/contact endpoints
│   │   │   └── menuRoutes.js          # /api/menu endpoints
│   │   └── server.js                  # Express initialization & middleware
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── animations/
│   │   │   └── gsapConfig.js          # Lenis & GSAP ScrollTrigger configuration
│   │   ├── components/
│   │   │   ├── AnimatedSection.jsx    # Scroll reveal wrapper
│   │   │   ├── CartDrawer.jsx         # Slide-over cart with subtotal & checkout
│   │   │   ├── CategoryCard.jsx       # Category showcase cards
│   │   │   ├── Footer.jsx             # Comprehensive brand footer
│   │   │   ├── LoadingScreen.jsx      # Preloader with progress bar
│   │   │   ├── Navbar.jsx             # Transparent-to-dark sticky nav
│   │   │   ├── ProductCard.jsx        # Reusable product card with badges
│   │   │   ├── ProductModal.jsx       # Quick view modal with quantity selector
│   │   │   ├── ScrollToTop.jsx        # Route scroll reset & floating jump button
│   │   │   └── WishlistDrawer.jsx     # Slide-over saved favourites
│   │   ├── context/
│   │   │   ├── CartContext.jsx        # Cart state, quantities & local storage sync
│   │   │   └── WishlistContext.jsx    # Wishlist state & local storage sync
│   │   ├── data/
│   │   │   └── menuData.js            # 36 menu products & categories (INR ₹)
│   │   ├── pages/
│   │   │   ├── About.jsx              # Brand story, philosophy & coffee process
│   │   │   ├── Contact.jsx            # Form with Zod validation & Google Maps
│   │   │   ├── Home.jsx               # Landing page orchestrator
│   │   │   └── Menu.jsx               # 36-item menu with live search & filters
│   │   ├── sections/
│   │   │   ├── AboutPreview.jsx       # Split-layout story teaser
│   │   │   ├── BestSellers.jsx        # 6 featured items
│   │   │   ├── FeaturedCategories.jsx # 6 category cards
│   │   │   ├── FinalCTA.jsx           # Editorial booking CTA
│   │   │   ├── Gallery.jsx            # Instagram photography grid
│   │   │   ├── Hero.jsx               # Oversized editorial landing hero
│   │   │   ├── SpecialOffers.jsx      # Promo tasting duo section
│   │   │   ├── Testimonials.jsx       # Review carousel
│   │   │   └── WhyChooseUs.jsx        # 4 core philosophy pillars
│   │   ├── styles/
│   │   │   └── global.css             # Tailwind & CSS custom variables
│   │   ├── utils/
│   │   │   └── storage.js             # LocalStorage helpers
│   │   ├── App.jsx                    # Root layout, providers & routes
│   │   └── main.jsx                   # React DOM entry point
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Running the Application

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 1. Backend Setup
Open a terminal in the project directory:
```bash
cd "coffee-shop/backend"
npm install
npm run dev
```
*The Express server will start on port `5000` (`http://localhost:5000`).*

### 2. Frontend Setup
Open a second terminal window:
```bash
cd "coffee-shop/frontend"
npm install
npm run dev
```
*The Vite dev server will start on port `5173` (`http://localhost:5173`).*

---

## 📡 Backend API Reference

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Response**:
```json
{
  "status": "ok",
  "service": "Premium Coffee Shop & Restaurant API",
  "version": "1.0.0",
  "uptime": 54,
  "timestamp": "2026-11-11T11:06:31.193Z"
}
```

### 2. Get All Menu Items
- **Endpoint**: `GET /api/menu`
- **Query Params (Optional)**: `?search=espresso&bestseller=true`
- **Response**: Returns JSON containing `categories` and `data` (all 36 items).

### 3. Get Items by Category
- **Endpoint**: `GET /api/menu/:category`
- **Example**: `GET /api/menu/coffee` or `GET /api/menu/burgers`
- **Response**:
```json
{
  "success": true,
  "category": "coffee",
  "count": 6,
  "data": [ ... ]
}
```

### 4. Submit Contact / Reservation Form
- **Endpoint**: `POST /api/contact`
- **Request Body**:
```json
{
  "name": "Alistair Sterling",
  "email": "alistair@example.com",
  "phone": "+91 98200 44321",
  "subject": "Table Reservation for 4",
  "message": "Requesting a terrace booth for our anniversary dinner."
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Your message has been received successfully for this active demonstration session! Our barista team will attend to your inquiry.",
  "note": "Demonstration Notice: Submissions are held in server memory for the current running session only. No permanent database or live SMTP mailer is connected.",
  "data": {
    "id": "DEMO-SUB-1762859191000",
    "name": "Alistair Sterling",
    "email": "alistair@example.com",
    "phone": "+91 98200 44321",
    "subject": "Table Reservation for 4",
    "message": "Requesting a terrace booth for our anniversary dinner.",
    "receivedAt": "2026-11-11T11:06:31.000Z",
    "sessionOnly": true
  }
}
```

---

## 💾 Local Storage Architecture

The application utilizes browser `window.localStorage` for instantaneous, zero-latency persistence without external databases:

1. **`coffee_shop_cart`**:
   - Stores array of items in cart with individual quantities: `[{ id: 14, name: "Cappuccino", price: 210, quantity: 2, ... }]`.
   - Updated dynamically on item addition, quantity modification, and item removal.
   - Preserves state across browser refresh, route changes, and new tab sessions.

2. **`coffee_shop_wishlist`**:
   - Stores array of saved favourite items: `[{ id: 7, name: "Classic Beef Burger", ... }]`.
   - Persists wishlist items and powers the live heart badge count in the header.

---

## 💎 Design System & UX Highlights
- **60 FPS Smooth Scrolling**: Powered by **Lenis** integrated with the GSAP ticker for a fluid, natural feel.
- **Editorial Micro-interactions**: Hover zoom on food photos, golden glow backdrops, tactile button depressions, and modal reveals.
- **Accessible & Semantic**: ARIA attributes, semantic headings (`h1` through `h4`), alt text on imagery, keyboard navigation.
- **Mobile First**: Fully responsive across ultra-wide monitors, laptops, tablets, and smartphones.

