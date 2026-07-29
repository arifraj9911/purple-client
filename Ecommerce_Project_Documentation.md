# 🛒 E-Commerce Website & Admin Dashboard — Complete Project Documentation

---

> **Document Version:** 1.0  
> **Date:** 29 July, 2026  
> **Purpose:** UI/UX Design & Development Reference  
> **Target Audience:** UI/UX Developer, Frontend Developer, Backend Developer  
> **Reference Websites:** [ArtLabBD](https://artlabbd.com/) | [Purple Handicrafts](https://www.facebook.com/PurpleHandicrafts.BD) | [Enlight BD](https://www.facebook.com/enlightbd25)

---

## 📑 Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack Recommendation](#2-technology-stack-recommendation)
3. [Reference Website Analysis](#3-reference-website-analysis)
4. [Website — Customer Facing Pages](#4-website--customer-facing-pages)
   - [4.1 Home Page](#41-home-page)
   - [4.2 Shop Page](#42-shop-page)
   - [4.3 Product Detail Page](#43-product-detail-page)
   - [4.4 Wishlist Page](#44-wishlist-page)
   - [4.5 Cart Drawer & Cart Page](#45-cart-drawer--cart-page)
   - [4.6 Checkout Page](#46-checkout-page)
   - [4.7 Payment Integration](#47-payment-integration)
   - [4.8 Login / Register Page](#48-login--register-page)
   - [4.9 OTP Verification](#49-otp-verification)
   - [4.10 Compare Page](#410-compare-page)
   - [4.11 User Dashboard](#411-user-dashboard)
   - [4.12 About Us Page](#412-about-us-page)
   - [4.13 Contact Us Page](#413-contact-us-page)
   - [4.14 Blog & Blog Details Page](#414-blog--blog-details-page)
5. [Admin Dashboard](#5-admin-dashboard)
   - [5.1 Layout Structure](#51-layout-structure)
   - [5.2 Analytics Dashboard](#52-analytics-dashboard)
   - [5.3 Category Management](#53-category-management)
   - [5.4 Product Management](#54-product-management)
   - [5.5 Blog Management](#55-blog-management)
   - [5.6 Inventory Management](#56-inventory-management)
   - [5.7 Shipping Policy Management](#57-shipping-policy-management)
   - [5.8 Order Management](#58-order-management)
6. [Responsive Design Guidelines](#6-responsive-design-guidelines)
7. [Color Palette & Typography](#7-color-palette--typography)
8. [UI Component Library](#8-ui-component-library)
9. [Database Schema Overview](#9-database-schema-overview)
10. [API Endpoints Overview](#10-api-endpoints-overview)

---

## 1. Project Overview

### 1.1 Project Description
A full-featured, responsive e-commerce platform built for the Bangladesh market. The system consists of:
- **Customer-facing Website** — for browsing products, placing orders, and managing accounts
- **Admin Dashboard** — for managing products, orders, categories, blogs, inventory, and analytics

### 1.2 Key Features at a Glance
| Feature | Description |
|---------|-------------|
| Multi-layer Categories | Category → Sub-category → Sub-sub-category → ... → N levels |
| Product Management | CRUD with variants, pricing, stock, images, SEO metadata |
| Shopping Cart | Drawer (quick view) + Full Page |
| Wishlist | Save products for later |
| Product Compare | Compare 2–3 products side by side |
| Payment Gateway | bKash + SSL Commerz |
| OTP Verification | Signup, Forgot Password, Reset Password |
| Order Management | Web orders + Manual order creation |
| User Dashboard | Order tracking, history, address, password management |
| Blog System | Blog listing + Blog details |
| Analytics | Sales, orders, revenue, top products dashboard |

---

## 2. Technology Stack Recommendation

### 2.1 Frontend (Customer Website)
| Technology | Purpose |
|------------|---------|
| **Next.js 14+** (App Router) | React framework — SSR/SSG for SEO |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Shadcn/ui** or **Ant Design** | UI component library |
| **Redux Toolkit** / **Zustand** | State management |
| **React Hook Form + Zod** | Form handling & validation |
| **Swiper.js** | Carousel / Slider for banners & products |
| **Framer Motion** | Animations & transitions |
| **React Query (TanStack)** | Server state & caching |

### 2.2 Admin Dashboard
| Technology | Purpose |
|------------|---------|
| **Next.js** (same project, separate route group) | Unified codebase |
| **Ant Design** or **Shadcn/ui** | Admin UI components |
| **Recharts** / **Chart.js** | Analytics charts |
| **React Table (TanStack)** | Data tables with sorting/filtering |
| **React Dropzone** | Image upload |
| **Rich Text Editor** (TipTap / Quill) | Blog editor, product description |

### 2.3 Backend
| Technology | Purpose |
|------------|---------|
| **Node.js + Express** or **Next.js API Routes** | REST API |
| **Prisma ORM** | Database ORM |
| **PostgreSQL** / **MySQL** | Database |
| **Redis** | Caching & sessions |
| **JWT** | Authentication |
| **Cloudinary** / **S3** | Image storage |
| **Nodemailer** / **SendGrid** | Email (OTP, order confirmation) |

---

## 3. Reference Website Analysis

### 3.1 ArtLabBD.com — Design Analysis

**URL:** [https://artlabbd.com/](https://artlabbd.com/)

**Key Observations:**

| Element | Description |
|---------|-------------|
| **Header** | 3-tier header: Top bar (contact, social), Middle (logo, search, icons), Bottom (category mega menu) |
| **Category Menu** | Multi-level dropdown mega menu with all categories listed |
| **Banner** | Full-width image carousel/slider with promotional banners |
| **Product Cards** | Image + Name + Price (Original & Discounted) + Add to Cart + Wishlist icon |
| **Product Sections** | "New Arrival", "Best Sellers", "Flash Sale", "Artist's Combo Packs" |
| **Pricing** | Shows both `Original price` (strikethrough) and `Current price` in BDT (৳) |
| **Stock Status** | "In stock" / "Out of stock" badge |
| **Wishlist** | Heart icon on each product card |
| **Cart** | Cart icon with counter in header |
| **Compare** | Compare icon/button |
| **Footer** | Delivery policy, Return & Refund, Contact info, Social links, Newsletter |
| **Currency** | Bangladeshi Taka (৳) |
| **Search** | Search bar in middle header |

**Color Scheme (ArtLabBD):**
- Primary: Warm orange/coral tones
- Background: White & light gray
- Accent: Red for sale badges
- Text: Dark gray/black

### 3.2 Purple Handicrafts (Facebook) — Brand Analysis
- Handicraft & handmade products focus
- Vibrant, colorful product photography
- Strong social media presence
- Community-driven brand identity

### 3.3 Enlight BD (Facebook) — Brand Analysis
- Lifestyle & home decor products
- Clean, minimal aesthetic
- Professional product staging

---

## 4. Website — Customer Facing Pages

---

### 4.1 Home Page

The home page is the most critical landing page. It must be visually engaging and drive conversions.

#### 4.1.1 Header (3-Tier Structure)

```
┌─────────────────────────────────────────────────────────┐
│ TOP HEADER BAR                                           │
│ [Welcome Message]    [Contact] [Email]    [Language/BDT] │
├─────────────────────────────────────────────────────────┤
│ MIDDLE HEADER                                            │
│ [LOGO]    [─────── SEARCH BAR ───────]  [👤] [❤️] [🛒] │
│                                     User  Wish  Cart     │
│                                     Icon  list  Count    │
├─────────────────────────────────────────────────────────┤
│ BOTTOM HEADER (STICKY ON SCROLL)                         │
│ [☰ ALL CATEGORIES ▼] [Home] [Shop] [Blog] [About] [..]  │
│  └─ Mega Menu Dropdown                                  │
└─────────────────────────────────────────────────────────┘
```

**Top Header Bar:**
- Welcome text / promotional message (e.g., "Welcome to Our Store!")
- Contact number (e.g., 📞 017XX-XXXXXX)
- Email address
- Language selector (EN/BN) — optional
- Currency display (৳ BDT)

**Middle Header:**
- **Logo** (left-aligned) — clickable, navigates to home
- **Search Bar** (center) — with autocomplete suggestions, category filter dropdown inside search
- **User Icon** 👤 — dropdown: Login / Register / My Account / Logout
- **Wishlist Icon** ❤️ — with count badge
- **Cart Icon** 🛒 — with item count badge, click opens **Cart Drawer**

**Bottom Header (Sticky):**
- **"All Categories" button** — opens mega menu dropdown on hover/click
- **Navigation Links:** Home | Shop | Blog | About Us | Contact Us | Offers
- **Sticky behavior:** Fixes to top on scroll with smooth transition

#### 4.1.2 Category Mega Menu (Multi-Layer)

```
┌─ ALL CATEGORIES (Click/Hover) ─────────────────────────┐
│                                                         │
│  🎨 Paints          🖌️ Brushes       📄 Pads & Paper   │
│   ├─ Acrylic         ├─ Flat          ├─ Sketch Pad      │
│   │  ├─ Set Pack     ├─ Round         ├─ Watercolor Pad  │
│   │  └─ Single Tube  └─ Detail        └─ Canvas Paper    │
│   ├─ Watercolor                                              │
│   ├─ Gouache          ...more...                            │
│   └─ Oil                                                   │
│                                                         │
│  🖼️ Canvas          📐 Drawing       🎁 Combo Packs     │
│   ├─ Canvas Panel     ├─ Pencils       ├─ Acrylic Combo   │
│   └─ Stretched        ├─ Erasers       └─ Starter Kit     │
│                       └─ Sharpeners                      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Key Requirements:**
- Supports **N-level nesting** (Category → Sub-category → Sub-sub-category → ... → N)
- Each category/sub-category shows product count
- Mega menu displays in a grid layout (3-4 columns)
- Icons for each parent category
- "View All" link at bottom of each category column
- Hover to expand, click to navigate
- Mobile: Accordion/collapsible menu

#### 4.1.3 Banner / Hero Slider (Carousel)

```
┌─────────────────────────────────────────────────────────┐
│  ◄    [  BANNER IMAGE 1 — Full Width — 1920×600px  ]    ► │
│       • Headline Text                                    │
│       • Sub-headline                                     │
│       • [Shop Now] CTA Button                            │
│       ○ ○ ○ ●  (Dot Indicators / Pagination)             │
└─────────────────────────────────────────────────────────┘
```

**Requirements:**
- Full-width responsive image slider/carousel
- 3–5 banner slides
- Auto-play with pause on hover
- Each slide has: background image, headline, sub-headline, CTA button
- Dot indicators at bottom + Prev/Next arrows
- Swipe gesture support on mobile
- Lazy loading for images
- Admin can manage banners (upload image, set URL, set text)

#### 4.1.4 CTA / Service Feature Section (4 Cards)

```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  🚚          │  │  🔄          │  │  💰          │  │  ⭐          │
│  Fast        │  │  Shipping    │  │  Refund      │  │  Service     │
│  Delivery    │  │  Policy      │  │  Benefit     │  │  Appreciation│
│              │  │              │  │              │  │              │
│  Free delivery│ │  Know our    │  │  Easy 7-day  │  │  5000+ Happy │
│  on orders    │  │  shipping    │  │  refund      │  │  Customers   │
│  above ৳2000 │  │  process     │  │  policy      │  │              │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

**Requirements:**
- 4 icon-based cards in a row (2x2 on mobile)
- Each card: Icon + Title + Short description
- Icons should be simple, recognizable SVG icons
- Subtle hover animation (lift/shadow effect)
- Light background with border or shadow

#### 4.1.5 Product Sections

##### A. Flash Sale / Offer Section

```
┌─────────────────────────────────────────────────────────┐
│  ⚡ FLASH SALE                    ⏱️ Ends in: 02:15:30  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│
│  │ Product│ │ Product│ │ Product│ │ Product│ │ Product││
│  │ Card 1 │ │ Card 2 │ │ Card 3 │ │ Card 4 │ │ Card 5 ││
│  │ -30%   │ │ -25%   │ │ -40%   │ │ -20%   │ │ -35%   ││
│  └────────┘ └────────┘ └────────┘ └────────┘ └────────┘│
│                              ◄          ►               │
└─────────────────────────────────────────────────────────┘
```

**Requirements:**
- Section title with countdown timer
- Horizontal scrollable product carousel (5-10 products)
- Each product shows discount percentage badge
- Original price with strikethrough, discounted price in red
- "Add to Cart" button on hover
- Timer counts down in real-time (Days:Hours:Minutes:Seconds)
- "View All Flash Sale" link

##### B. New Arrivals Section

```
┌─────────────────────────────────────────────────────────┐
│  🆕 NEW ARRIVALS                          [View All →]  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │ Product│ │ Product│ │ Product│ │ Product│ ...scroll  │
│  │ Card   │ │ Card   │ │ Card   │ │ Card   │           │
│  └────────┘ └────────┘ └────────┘ └────────┘           │
└─────────────────────────────────────────────────────────┘
```

##### C. Best Sellers / Popular Products

```
┌─────────────────────────────────────────────────────────┐
│  🏆 BEST SELLERS                          [View All →]  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │ ⭐4.9  │ │ ⭐4.8  │ │ ⭐4.7  │ │ ⭐5.0  │           │
│  │ Product│ │ Product│ │ Product│ │ Product│ ...scroll  │
│  │ Card   │ │ Card   │ │ Card   │ │ Card   │           │
│  └────────┘ └────────┘ └────────┘ └────────┘           │
└─────────────────────────────────────────────────────────┘
```

#### Product Card Component (Standard)

```
┌──────────────────────┐
│  [Discount Badge]    │  ← e.g., "-30%" red badge
│                      │
│  ┌────────────────┐  │
│  │                │  │
│  │  PRODUCT       │  │  ← Image (hover: zoom effect)
│  │  IMAGE         │  │
│  │  (300×300)     │  │
│  │                │  │
│  └────────────────┘  │
│  [❤️ Wishlist Icon]   │  ← Top-right corner
│                      │
│  Product Name        │  ← 2 lines max, ellipsis
│  ⭐⭐⭐⭐⭐ (4.5)   │  ← Rating & review count
│                      │
│  ৳1,200  ৳̶1̶,̶5̶0̶0̶    │  ← Current price + Original (strikethrough)
│                      │
│  [🛒 Add to Cart]    │  ← Button (visible on hover)
└──────────────────────┘
```

**Product Card Requirements:**
- Consistent card size (min 250px width)
- Product image with hover zoom effect
- Discount badge (top-left) if on sale
- Wishlist heart icon (top-right)
- Product name (max 2 lines)
- Star rating with review count
- Price: current (bold, colored) + original (strikethrough, gray) if discounted
- "Add to Cart" button — visible on hover (desktop) / always visible (mobile)
- "Out of Stock" overlay if stock = 0
- Click navigates to product detail page

#### 4.1.6 Offer Banner Section

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   [  FULL WIDTH PROMOTIONAL IMAGE BANNER  ]             │
│   [  e.g., "Summer Sale - Up to 50% Off"  ]             │
│   [                        [Shop Now →]  ]              │
│                                                         │
└─────────────────────────────────────────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐
│  [BANNER IMAGE 1]    │  │  [BANNER IMAGE 2]    │
│  [LEFT SIDE]         │  │  [RIGHT SIDE]        │
│  "Category Special"  │  │  "Brand Offer"       │
└──────────────────────┘  └──────────────────────┘
```

**Requirements:**
- 1 full-width banner (can alternate with 2 half-width side-by-side)
- Clickable, navigates to specific category/product
- Admin-configurable (upload image + set link URL)
- Responsive: stack vertically on mobile

#### 4.1.7 Testimonial Section

```
┌─────────────────────────────────────────────────────────┐
│  💬 WHAT OUR CUSTOMERS SAY                              │
│                                                         │
│  ┌──────────────────┐  ┌──────────────────┐            │
│  │  "Great product!  │  │  "Fast delivery   │            │
│  │   Loved it!"      │  │   and quality!"   │            │
│  │  ⭐⭐⭐⭐⭐          │  │  ⭐⭐⭐⭐⭐          │            │
│  │  — John Doe       │  │  — Jane Smith     │            │
│  │  📍 Dhaka         │  │  📍 Chittagong    │            │
│  └──────────────────┘  └──────────────────┘            │
│                          ◄         ►                    │
└─────────────────────────────────────────────────────────┘
```

**Requirements:**
- Carousel/slider of customer testimonials
- Each card: Quote, Star rating, Customer name, Location, Optional avatar
- Admin can add/edit/delete testimonials
- Auto-rotate with pause on hover

#### 4.1.8 Blog Section

```
┌─────────────────────────────────────────────────────────┐
│  📝 FROM OUR BLOG                        [View All →]   │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ [Blog Image] │  │ [Blog Image] │  │ [Blog Image] │  │
│  │              │  │              │  │              │  │
│  │ Blog Title   │  │ Blog Title   │  │ Blog Title   │  │
│  │ 📅 12 Jul    │  │ 📅 10 Jul    │  │ 📅 08 Jul    │  │
│  │ ✍️ Author    │  │ ✍️ Author    │  │ ✍️ Author    │  │
│  │ [Read More]  │  │ [Read More]  │  │ [Read More]  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Requirements:**
- 3 latest blog posts in a grid
- Each card: Featured image, Title, Date, Author, Short excerpt (1-2 lines), "Read More" link
- "View All" link navigates to blog listing page

#### 4.1.9 Footer

```
┌─────────────────────────────────────────────────────────┐
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐│
│  │ ABOUT US │  │ QUICK     │  │ CUSTOMER  │  │ CONTACT  ││
│  │          │  │ LINKS     │  │ SERVICE   │  │ INFO     ││
│  │ About    │  │ Home      │  │ My Account│  │ 📍 Addr  ││
│  │ Our Story│  │ Shop      │  │ Orders    │  │ 📞 Phone ││
│  │ Careers  │  │ Blog      │  │ Wishlist  │  │ ✉️ Email ││
│  │ Privacy  │  │ Contact   │  │ Returns   │  │          ││
│  │ Terms    │  │ Offers    │  │ Shipping  │  │ [Social  ││
│  │          │  │           │  │ FAQ       │  │  Icons]  ││
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘│
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  📧 NEWSLETTER SIGNUP                             │   │
│  │  [Enter your email...]  [Subscribe]               │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│  © 2026 Your Store Name. All Rights Reserved.           │
│  Payment Icons: [bKash] [Visa] [MasterCard] [SSL]       │
└─────────────────────────────────────────────────────────┘
```

**Footer Requirements:**
- 4-column grid layout (stacks on mobile: 2 columns → 1 column)
- **Column 1:** About Us — brief company description, logo
- **Column 2:** Quick Links — navigation links
- **Column 3:** Customer Service — account links, policies
- **Column 4:** Contact Info — address, phone, email, social media icons
- **Newsletter:** Email input + Subscribe button (full-width below columns)
- **Bottom Bar:** Copyright text + Payment method icons
- Social icons: Facebook, Instagram, YouTube, WhatsApp

---

### 4.2 Shop Page

```
┌─────────────────────────────────────────────────────────┐
│  HEADER (same as home)                                   │
├─────────────────────────────────────────────────────────┤
│  Breadcrumb: Home > Shop  [or Home > Category > Sub..]   │
├──────────────┬──────────────────────────────────────────┤
│  FILTER      │  TOP BAR                                  │
│  SIDEBAR     │  ┌──────────────────────────────────┐    │
│  (Left)      │  │ Showing 1-20 of 150 results       │    │
│              │  │                          [Sort By ▼]│   │
│  ┌────────┐  │  └──────────────────────────────────┘    │
│  │CATEGORY│  │                                          │
│  │ □ Cat1 │  │  PRODUCT GRID (3-4 columns)              │
│  │ □ Cat2 │  │  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ □ Cat3 │  │  │Product │ │Product │ │Product │       │
│  └────────┘  │  │ Card   │ │ Card   │ │ Card   │       │
│  ┌────────┐  │  └────────┘ └────────┘ └────────┘       │
│  │PRICE   │  │  ┌────────┐ ┌────────┐ ┌────────┐       │
│  │ RANGE  │  │  │Product │ │Product │ │Product │       │
│  │ ৳0-৳M  │  │  │ Card   │ │ Card   │ │ Card   │       │
│  └────────┘  │  └────────┘ └────────┘ └────────┘       │
│  ┌────────┐  │                                          │
│  │BRAND   │  │  ───────────────────────────────         │
│  │ □ Br1  │  │  [< 1] [2] [3] ... [10] [>]   (Pagination)│
│  │ □ Br2  │  │                                          │
│  └────────┘  │                                          │
│  ┌────────┐  │                                          │
│  │RATING  │  │                                          │
│  │ ⭐+    │  │                                          │
│  └────────┘  │                                          │
│  ┌────────┐  │                                          │
│  │STOCK   │  │                                          │
│  │ □ In   │  │                                          │
│  └────────┘  │                                          │
│ [CLEAR ALL]  │                                          │
└──────────────┴──────────────────────────────────────────┘
```

**Shop Page Requirements:**

**Left Sidebar — Filters:**
1. **Category Filter:** Checkbox list with sub-category indentation, collapsible groups
2. **Price Range Filter:** Dual range slider (min-max) with manual input, currency: ৳
3. **Brand Filter:** Checkbox list, searchable if many brands
4. **Rating Filter:** Star rating checkboxes (4★ & above, 3★ & above, etc.)
5. **Availability Filter:** "In Stock" toggle/checkbox
6. **"Clear All Filters"** button — resets all filters
7. **Mobile:** Filters open in a slide-out drawer triggered by "Filter" button

**Top Bar:**
- Breadcrumb navigation
- "Showing X–Y of Z results" text
- Grid/List view toggle icons
- Sort dropdown: Default | Price: Low to High | Price: High to Low | Newest | Best Selling | Rating

**Product Grid:**
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Standard product cards (same as home page)
- Lazy loading / infinite scroll OR numbered pagination

---

### 4.3 Product Detail Page

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Category > Sub-Category > Product    │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌────────────────────────────┐   │
│  │                  │  │  Product Name (H1)          │   │
│  │   MAIN IMAGE     │  │  ⭐⭐⭐⭐⭐ (42 Reviews)      │   │
│  │   (Zoom on       │  │                              │   │
│  │    hover/click)  │  │  ৳1,200  ৳̶1̶,̶5̶0̶0̶  (-20%)  │   │
│  │                  │  │                              │   │
│  │ [Thumb1][Thumb2] │  │  Short Description           │   │
│  │ [Thumb3][Thumb4] │  │  Lorem ipsum dolor sit...    │   │
│  │                  │  │                              │   │
│  └──────────────────┘  │  ┌──────────────────────┐    │   │
│                        │  │ Color/Size/Variant    │    │   │
│                        │  │ [🔴] [🔵] [⚫]        │    │   │
│                        │  │ [S]  [M]  [L]  [XL]  │    │   │
│                        │  └──────────────────────┘    │   │
│                        │                              │   │
│                        │  Quantity: [-] [1] [+]       │   │
│                        │                              │   │
│                        │  [🛒 ADD TO CART]            │   │
│                        │  [❤️ Add to Wishlist]        │   │
│                        │  [📊 Add to Compare]         │   │
│                        │                              │   │
│                        │  SKU: PROD-00123             │   │
│                        │  Category: Acrylic Paints    │   │
│                        │  Tags: paint, art, acrylic   │   │
│                        │  Share: [FB] [TW] [WA] [LI] │   │
│  └──────────────────┘  └────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  ┌─ PRODUCT TABS ───────────────────────────────────┐   │
│  │ [Description] [Specifications] [Reviews (42)]     │   │
│  │ [Shipping Info] [Return Policy]                   │   │
│  ├──────────────────────────────────────────────────┤   │
│  │  Full product description with rich text...       │   │
│  │  Images, videos, text formatting...               │   │
│  └──────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  🎯 RELATED PRODUCTS                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │ Card   │ │ Card   │ │ Card   │ │ Card   │           │
│  └────────┘ └────────┘ └────────┘ └────────┘           │
└─────────────────────────────────────────────────────────┘
```

**Product Detail Page Requirements:**
- **Image Gallery:** Main image with zoom (click to open lightbox), thumbnail strip below
- **Product Info:** Name, Rating, Price (current + original + discount %), Short description
- **Variants:** Color swatches, size buttons, or dropdown selectors
- **Quantity selector:** +/- buttons with input
- **Action Buttons:** Add to Cart (primary), Wishlist, Compare
- **Meta Info:** SKU, Category, Tags, Share buttons
- **Product Tabs:** Description | Specifications/Additional Info | Reviews (with rating breakdown) | Shipping Info
- **Related Products:** Carousel at bottom

---

### 4.4 Wishlist Page

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Wishlist                             │
├─────────────────────────────────────────────────────────┤
│  ❤️ My Wishlist (5 items)                                │
│                                                         │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │Product │ │Product │ │Product │ │Product │           │
│  │ Card   │ │ Card   │ │ Card   │ │ Card   │           │
│  │  ❤️    │ │  ❤️    │ │  ❤️    │ │  ❤️    │           │
│  └────────┘ └────────┘ └────────┘ └────────┘           │
│  ┌────────┐                                            │
│  │Product │                                            │
│  │ Card   │                                            │
│  └────────┘                                            │
│                                                         │
│  [Empty State: "Your wishlist is empty. Start shopping!"]│
└─────────────────────────────────────────────────────────┘
```

**Requirements:**
- Grid of product cards (same as standard product card)
- Heart icon filled (active state)
- Click heart to remove from wishlist
- "Add to Cart" button on each card
- Empty state with illustration and "Browse Products" CTA
- Pagination if > 20 items

---

### 4.5 Cart Drawer & Cart Page

#### 4.5.1 Cart Drawer (Slide-out from Right)

```
┌──────────────────────────────────┐
│  🛒 Shopping Cart (3 items)  [✕] │
├──────────────────────────────────┤
│  ┌────────┐                      │
│  │ Image  │ Product Name         │
│  │ 80×80  │ 1 × ৳1,200          │
│  │        │ [−] [1] [+]  [🗑️]   │
│  └────────┘                      │
│  ─────────────────────────────── │
│  ┌────────┐                      │
│  │ Image  │ Product Name 2       │
│  │ 80×80  │ 2 × ৳850            │
│  │        │ [−] [2] [+]  [🗑️]   │
│  └────────┘                      │
│  ─────────────────────────────── │
│                                  │
│  Subtotal:        ৳2,900        │
│  Shipping:        Calculated     │
│  ─────────────────────────────── │
│  Total:           ৳2,900        │
│                                  │
│  [🛒 VIEW CART]   (outline btn)  │
│  [💳 CHECKOUT]    (filled btn)   │
└──────────────────────────────────┘
```

**Cart Drawer Requirements:**
- Slides in from right side (overlay)
- Semi-transparent backdrop
- Product list with: small image, name, variant info, quantity controls, remove button
- Subtotal calculation
- "View Cart" → navigates to full cart page
- "Checkout" → navigates to checkout page
- Empty state when no items
- Opens when "Add to Cart" clicked or cart icon clicked

#### 4.5.2 Cart Page (Full Page)

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Cart                                 │
├──────────────────────────────────┬──────────────────────┤
│  🛒 Shopping Cart (3 items)      │  CART SUMMARY        │
│                                  │                      │
│  ┌───┬──────────────────────┐    │  Subtotal:  ৳2,900  │
│  │   │ Product Name         │    │  Discount:   −৳500  │
│  │IMG│ Color: Red, Size: M  │    │  Shipping:   ৳60    │
│  │   │ ৳1,200               │    │  ────────────────   │
│  │   │ [−] 1 [+]  [🗑️]     │    │  EST. TOTAL: ৳2,460 │
│  └───┴──────────────────────┘    │                      │
│  ───────────────────────────     │  [PROCEED TO         │
│  ┌───┬──────────────────────┐    │   CHECKOUT →]        │
│  │   │ Product Name 2       │    │                      │
│  │IMG│ Color: Blue, Size: L │    │  [🔄 Continue        │
│  │   │ ৳850 × 2 = ৳1,700   │    │   Shopping]          │
│  │   │ [−] 2 [+]  [🗑️]     │    │                      │
│  └───┴──────────────────────┘    │  💳 We Accept:       │
│  ───────────────────────────     │  [bKash][Visa][MC]   │
│                                  │  [SSL Commerz]       │
│  [🔄 Update Cart]                │                      │
│  [🎫 Apply Coupon: _______ ]     │                      │
└──────────────────────────────────┴──────────────────────┘
```

**Cart Page Requirements:**
- **Left (70%):** Product list with detailed info — image, name, variant, unit price, quantity controls, line total, remove button
- **Right (30%):** Cart summary sidebar — Subtotal, Discount (if coupon applied), Shipping estimate, Total, "Proceed to Checkout" button, Payment icons, Coupon code input
- Quantity updates via +/- or direct input
- Remove item with confirmation
- "Continue Shopping" link
- Coupon code input with "Apply" button

---

### 4.6 Checkout Page

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Cart > Checkout                      │
├──────────────────────────────────┬──────────────────────┤
│  📋 CHECKOUT                     │  ORDER SUMMARY       │
│                                  │                      │
│  ┌─ 1. SHIPPING ADDRESS ──────┐  │  Product 1 × 1       │
│  │ [Use Saved Address ▼]      │  │  ৳1,200             │
│  │ OR                         │  │                      │
│  │ Full Name: [_________]     │  │  Product 2 × 2       │
│  │ Phone:     [_________]     │  │  ৳1,700             │
│  │ Email:     [_________]     │  │                      │
│  │ City:      [___▼ Select]   │  │  ────────────────   │
│  │ Zone/Area: [___▼ Select]   │  │  Subtotal:  ৳2,900  │
│  │ Address:   [_________]     │  │  Shipping:   ৳60    │
│  │                            │  │  Discount:  −৳0     │
│  └────────────────────────────┘  │  ────────────────   │
│                                  │  TOTAL:     ৳2,960  │
│  ┌─ 2. DELIVERY OPTION ──────┐  │                      │
│  │ ○ Inside Dhaka — ৳60      │  │                      │
│  │ ○ Outside Dhaka — ৳120    │  │                      │
│  └────────────────────────────┘  │                      │
│                                  │                      │
│  ┌─ 3. PAYMENT METHOD ───────┐  │                      │
│  │ ○ Cash on Delivery         │  │                      │
│  │ ● bKash                    │  │                      │
│  │ ○ SSL Commerz (Card/Bank)  │  │                      │
│  └────────────────────────────┘  │                      │
│                                  │                      │
│  ┌─ 4. ADDITIONAL INFO ──────┐  │                      │
│  │ Order Notes: [_________]   │  │                      │
│  └────────────────────────────┘  │                      │
│                                  │                      │
│  [🔄 Back to Cart] [✅ PLACE ORDER]                      │
└──────────────────────────────────┴──────────────────────┘
```

**Checkout Requirements:**
- **Multi-step form** (all on one page, with clear sections):
  1. **Shipping Address** — name, phone, email, city (dropdown), zone/area (depends on city), full address
  2. **Delivery Option** — radio buttons for shipping methods with prices
  3. **Payment Method** — radio buttons: Cash on Delivery, bKash, SSL Commerz
  4. **Additional Info** — order notes textarea
- **Right Sidebar:** Order summary (sticky on scroll)
- Form validation on all fields
- "Place Order" button triggers payment (if online) or direct order creation (if COD)
- Guest checkout allowed (no login required, but email needed)

---

### 4.7 Payment Integration

#### 4.7.1 bKash Payment Flow

```
User selects bKash → Redirect to bKash gateway →
Enter bKash account number → Receive OTP on phone →
Enter OTP → Enter PIN → Payment confirmed →
Redirect back to website → Order confirmation page
```

**bKash Integration Requirements:**
- bKash Merchant API integration
- Sandbox mode for testing
- Transaction ID storage
- Payment status webhook handling
- Error handling for failed/cancelled payments
- Refund capability from admin panel

#### 4.7.2 SSL Commerz Payment Flow

```
User selects SSL Commerz → Redirect to SSL gateway →
Choose payment method (Card/Mobile Banking/Internet Banking) →
Enter payment details → Complete payment →
Redirect back to success/fail URL → Order confirmation
```

**SSL Commerz Requirements:**
- SSL Commerz Sandbox/Production credentials
- IPN (Instant Payment Notification) listener
- Success/Fail/Cancel callback pages
- Transaction validation
- Refund API integration

---

### 4.8 Login / Register Page

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         ┌─────────────────────────────┐                 │
│         │                             │                 │
│         │  [Logo]                     │                 │
│         │                             │                 │
│         │  LOGIN / REGISTER (Tabs)    │                 │
│         │  ───────────────────────    │                 │
│         │                             │                 │
│         │  Phone Number: [______]     │                 │
│         │  Password:      [______]    │  (Login)        │
│         │  [👁️ Show/Hide]             │                 │
│         │                             │                 │
│         │  [Forgot Password?]         │                 │
│         │                             │                 │
│         │  [🔘 LOGIN]                 │                 │
│         │                             │                 │
│         │  ─── OR Continue With ───   │                 │
│         │  [Google]  [Facebook]       │                 │
│         │                             │                 │
│         │  Don't have an account?     │                 │
│         │  [Register →]               │                 │
│         │                             │                 │
│         └─────────────────────────────┘                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Login/Register Requirements:**
- **Tab toggle** between Login and Register forms
- **Login form:**
  - Phone number input (Bangladesh format: 01XXXXXXXXX)
  - Password with show/hide toggle
  - "Forgot Password" link
  - "Remember Me" checkbox
  - Submit button
- **Register form:**
  - Full Name
  - Phone Number
  - Email (optional)
  - Password + Confirm Password
  - "I agree to Terms & Conditions" checkbox
  - Submit → triggers OTP verification
- **Social login:** Google, Facebook (optional but recommended)
- Redirect after login to previous page or dashboard
- Error messages for invalid credentials

---

### 4.9 OTP Verification

#### 4.9.1 OTP Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  User enters │────▶│  OTP sent   │────▶│  User enters │
│  phone number│     │  via SMS    │     │  OTP code    │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                      ┌────────▼────────┐
                                      │  OTP Valid?      │
                                      │  Yes → Proceed   │
                                      │  No → Show Error │
                                      └─────────────────┘
```

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         ┌─────────────────────────────┐                 │
│         │                             │                 │
│         │  📱 OTP VERIFICATION        │                 │
│         │                             │                 │
│         │  We have sent a 6-digit     │                 │
│         │  verification code to:      │                 │
│         │  +880 1XXX-XXXXXX           │                 │
│         │                             │                 │
│         │  ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐ ┌─┐  │                 │
│         │  │_│ │_│ │_│ │_│ │_│ │_│  │                 │
│         │  └─┘ └─┘ └─┘ └─┘ └─┘ └─┘  │                 │
│         │                             │                 │
│         │  ⏱️ Resend code in: 0:45    │                 │
│         │  [Resend OTP] (after timer) │                 │
│         │                             │                 │
│         │  [🔘 VERIFY]                │                 │
│         │  [✏️ Change Phone Number]   │                 │
│         │                             │                 │
│         └─────────────────────────────┘                 │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**OTP Requirements:**
- Used for: **Signup verification**, **Forgot Password**, **Reset Password**
- 6-digit numeric OTP
- 6 individual input boxes (auto-focus to next on input)
- 60-second countdown timer before resend allowed
- "Resend OTP" button (enabled after timer)
- API call to verify OTP
- Error state with shake animation for wrong OTP
- Success → redirect accordingly (login/dashboard/new password form)

---

### 4.10 Compare Page

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Compare                              │
├─────────────────────────────────────────────────────────┤
│  📊 Compare Products (Max 3)                             │
│                                                         │
│  ┌──────────────┬──────────────┬──────────────┐         │
│  │              │              │              │         │
│  │  [Product 1] │  [Product 2] │  [Product 3] │         │
│  │   Image      │   Image      │   Image      │         │
│  │              │              │              │         │
│  ├──────────────┼──────────────┼──────────────┤         │
│  │ Price        │  ৳1,200     │  ৳1,500     │  ৳950   │
│  ├──────────────┼──────────────┼──────────────┤         │
│  │ Brand        │  Brand A     │  Brand B     │  Brand C│
│  ├──────────────┼──────────────┼──────────────┤         │
│  │ Rating       │  ⭐4.5       │  ⭐4.0       │  ⭐4.8  │
│  ├──────────────┼──────────────┼──────────────┤         │
│  │ Availability │  In Stock    │  Out of Stock│ In Stock│
│  ├──────────────┼──────────────┼──────────────┤         │
│  │ Color        │  Red, Blue   │  Green       │  Black  │
│  ├──────────────┼──────────────┼──────────────┤         │
│  │ Size         │  M, L, XL    │  S, M, L     │  M, L   │
│  ├──────────────┼──────────────┼──────────────┤         │
│  │ Weight       │  500g        │  750g        │  300g   │
│  ├──────────────┼──────────────┼──────────────┤         │
│  │ Material     │  Cotton      │  Polyester   │  Silk   │
│  ├──────────────┼──────────────┼──────────────┤         │
│  │              │ [Add to Cart]│              │[Add Cart]│
│  │              │              │              │         │
│  └──────────────┴──────────────┴──────────────┘         │
│                                                         │
│  [Add Another Product] [+ Select from dropdown/search]   │
└─────────────────────────────────────────────────────────┘
```

**Compare Requirements:**
- Maximum **3 products** at a time
- Table-style comparison with rows for each attribute
- First column = attribute names (sticky)
- Row highlighting for differing values
- "Add to Cart" button below each product
- "Remove" (✕) button on each product column
- Empty slot shows "Add Product" with search dropdown
- Horizontal scroll for mobile (first column stays sticky)
- "Clear All" button

---

### 4.11 User Dashboard

```
┌─────────────────────────────────────────────────────────┐
│  HEADER (simplified)                                     │
├──────────┬──────────────────────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT AREA                            │
│ (Left)   │                                              │
│          │  ┌─ DASHBOARD OVERVIEW ──────────────────┐   │
│ 👤 Profile│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ │   │
│ 📦 Orders│  │  │Active│ │Total │ │Pending│ │Cancel│ │   │
│          │  │  │Orders│ │Orders│ │Orders │ │Orders│ │   │
│ ❤️ Wishlist│ │  │  2   │ │  15  │ │  3   │ │  1   │ │   │
│          │  │  └──────┘ └──────┘ └──────┘ └──────┘ │   │
│ 📍 Address│  └──────────────────────────────────────┘   │
│ 🔒 Password│                                              │
│ 📋 Order  │  ┌─ RECENT ORDERS ─────────────────────┐    │
│    History│  │  Order#  Date    Status    Total     │    │
│          │  │  #12345  12 Jul  Delivered ৳1,200   │    │
│ 🚪 Logout │  │  #12346  10 Jul  Processing ৳850   │    │
│          │  │  #12347  08 Jul  Cancelled ৳500    │    │
│          │  │  [View All Orders →]                 │    │
│          │  └──────────────────────────────────────┘    │
└──────────┴──────────────────────────────────────────────┘
```

**User Dashboard Requirements:**

**Sidebar Menu:**
- Profile (name, avatar, edit)
- My Orders (with status badges)
- Wishlist
- Manage Addresses
- Change Password
- Order History (detailed list)
- Logout button

**Dashboard Overview:**
- Stats cards: Active Orders, Total Orders, Pending, Cancelled
- Recent orders table (last 5)

**Order Status Page:**
- Visual order progress tracker:
  ```
  [Ordered] ──▶ [Confirmed] ──▶ [Processing] ──▶ [Shipped] ──▶ [Delivered]
  ```
- Order details: items, quantities, prices, shipping address, payment method
- Cancel order button (if status allows)

**Order History Page:**
- Table with columns: Order ID, Date, Items, Total, Status, Action
- Filter by date range, status
- Pagination
- Click row to view order details

**Change Password:**
- Current password
- New password + Confirm new password
- Submit button

**Address Management:**
- List of saved addresses
- Add new address / Edit existing / Delete
- Set default address
- Form: Name, Phone, City, Zone, Full Address

---

### 4.12 About Us Page

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > About Us                             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │              [HERO BANNER IMAGE]                 │    │
│  │           "Our Story / About Us"                 │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  ┌──────────────────────┐ ┌────────────────────────┐    │
│  │  WHO WE ARE          │ │  [IMAGE]               │    │
│  │                      │ │                        │    │
│  │  Company story,      │ │  About us photo/       │    │
│  │  mission, vision,    │ │  team photo            │    │
│  │  values...           │ │                        │    │
│  └──────────────────────┘ └────────────────────────┘    │
│                                                         │
│  ┌─ OUR VALUES ────────────────────────────────────┐    │
│  │  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐            │    │
│  │  │Icon1│  │Icon2│  │Icon3│  │Icon4│            │    │
│  │  │Value│  │Value│  │Value│  │Value│            │    │
│  │  └─────┘  └─────┘  └─────┘  └─────┘            │    │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─ OUR TEAM (Optional) ───────────────────────────┐    │
│  │  [Member 1]  [Member 2]  [Member 3]  [Member 4]│    │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─ ACHIEVEMENTS / STATS ──────────────────────────┐    │
│  │  5000+      15000+      50+        98%          │    │
│  │  Happy      Products    Brands     Satisfied     │    │
│  │  Customers  Available   Partners   Customers     │    │
│  └──────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

### 4.13 Contact Us Page

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Contact Us                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐  ┌────────────────────────────┐   │
│  │  GET IN TOUCH    │  │  CONTACT FORM               │   │
│  │                  │  │                              │   │
│  │  📍 Address      │  │  Name:    [___________]     │   │
│  │  123 Store Road  │  │  Email:   [___________]     │   │
│  │  Dhaka, Bangladesh│  │  Phone:   [___________]     │   │
│  │                  │  │  Subject: [___▼________]     │   │
│  │  📞 Phone         │  │  Message: [___________]     │   │
│  │  +880 1XXX-XXXXXX│  │           [___________]     │   │
│  │                  │  │                              │   │
│  │  ✉️ Email         │  │  [📤 SEND MESSAGE]          │   │
│  │  info@store.com  │  │                              │   │
│  │                  │  └────────────────────────────┘   │
│  │  🕐 Hours         │                                   │
│  │  Sat-Thu: 10AM-8PM│                                   │
│  │  Friday: Closed   │                                   │
│  └──────────────────┘                                    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │              [GOOGLE MAP EMBED]                  │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

### 4.14 Blog & Blog Details Page

#### Blog Listing Page

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Blog                                 │
├─────────────────────────────────────────────────────────┤
│  📝 OUR BLOG                                             │
│                                                         │
│  ┌────────────────┐ ┌────────────────┐                  │
│  │ [Blog Image]   │ │ [Blog Image]   │                  │
│  │                │ │                │                  │
│  │ 📅 12 Jul 2026 │ │ 📅 10 Jul 2026 │                  │
│  │ ✍️ Author      │ │ ✍️ Author      │                  │
│  │ 📂 Category    │ │ 📂 Category    │                  │
│  │                │ │                │                  │
│  │ Blog Title     │ │ Blog Title     │                  │
│  │ Short excerpt..│ │ Short excerpt..│                  │
│  │ [Read More →]  │ │ [Read More →]  │                  │
│  └────────────────┘ └────────────────┘                  │
│  ...more blog cards (2-column grid)...                   │
│                                                         │
│  [< 1] [2] [3] ... [10] [>]  (Pagination)               │
└─────────────────────────────────────────────────────────┘
```

#### Blog Details Page

```
┌─────────────────────────────────────────────────────────┐
│  Breadcrumb: Home > Blog > Blog Title                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────┐    │
│  │           [FEATURED IMAGE - Full Width]          │    │
│  └─────────────────────────────────────────────────┘    │
│                                                         │
│  📅 12 July, 2026  |  ✍️ By Author  |  📂 Category      │
│                                                         │
│  # BLOG TITLE (H1)                                      │
│                                                         │
│  Full blog content with rich text formatting...          │
│  (Headings, paragraphs, images, lists, quotes, etc.)    │
│                                                         │
│  ───────────────────────────────────────────────        │
│  🏷️ Tags: [ecommerce] [shopping] [tips]                 │
│  🔗 Share: [FB] [TW] [WA] [LI] [Copy Link]              │
│                                                         │
│  ┌─ RELATED POSTS ─────────────────────────────────┐    │
│  │  [Post 1]  [Post 2]  [Post 3]                   │    │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─ COMMENTS SECTION ──────────────────────────────┐    │
│  │  💬 5 Comments                                   │    │
│  │  ┌──────────────────────────────────────────┐    │    │
│  │  │ User Name  •  2 days ago                  │    │    │
│  │  │ Great article! Very helpful.              │    │    │
│  │  │ [👍 Like] [↩️ Reply]                      │    │    │
│  │  └──────────────────────────────────────────┘    │    │
│  │  ...more comments...                             │    │
│  │                                                  │    │
│  │  ┌─ LEAVE A COMMENT ────────────────────────┐    │    │
│  │  │ Name:    [___________]                    │    │    │
│  │  │ Email:   [___________]                    │    │    │
│  │  │ Comment: [___________]                    │    │    │
│  │  │          [___________]                    │    │    │
│  │  │ [📤 POST COMMENT]                         │    │    │
│  │  └──────────────────────────────────────────┘    │    │
│  └──────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

---

## 5. Admin Dashboard

---

### 5.1 Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  ADMIN HEADER                                            │
│  [☰ Toggle] [Logo]              [🔔] [💬] [👤 Admin ▼]  │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│ SIDEBAR  │  MAIN CONTENT AREA                           │
│ (Left)   │  (Scrollable)                                │
│          │                                              │
│ 📊 Dashboard│  ┌────────────────────────────────────┐  │
│ 🗂️ Categories│  │                                    │  │
│ 📦 Products  │  │       PAGE CONTENT                 │  │
│ 📝 Blogs     │  │       (changes per route)          │  │
│ 📋 Inventory │  │                                    │  │
│ 🚚 Shipping  │  │                                    │  │
│ 📑 Orders    │  │                                    │  │
│   ├─ Web Orders│  │                                    │  │
│   └─ Manual Order│ │                                    │  │
│ 👥 Customers │  │                                    │  │
│ ⚙️ Settings  │  │                                    │  │
│          │  └────────────────────────────────────┘  │
│          │                                              │
│ [Collapse] │                                              │
└──────────┴──────────────────────────────────────────────┘
```

**Admin Layout Requirements:**

**Header:**
- Sidebar toggle button (☰ hamburger)
- Logo / Brand name
- Notification bell icon with unread count badge
- Messages icon
- Admin profile dropdown (Profile, Settings, Logout)
- Fixed position at top

**Sidebar:**
- Fixed left sidebar, collapsible (icon-only mode)
- Menu items with icons
- Active state highlighting
- Sub-menu expand/collapse for nested items (e.g., Orders → Web Orders, Manual Order)
- Scrollable if menu is long
- Collapse button at bottom
- On mobile: overlay drawer triggered by hamburger

**Main Content:**
- Page title + breadcrumb at top of each page
- Scrollable content area
- Consistent padding (24px)

---

### 5.2 Analytics Dashboard

```
┌─────────────────────────────────────────────────────────┐
│  📊 DASHBOARD                    Date Range: [Last 30 Days ▼]│
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ Total    │ │ Total    │ │ Total    │ │ New       │   │
│  │ Revenue  │ │ Orders   │ │ Products │ │ Customers │   │
│  │ ৳2,50,000│ │ 1,234    │ │ 567      │ │ 89        │   │
│  │ ↑ 12.5%  │ │ ↑ 8.3%   │ │ +23 new  │ │ ↑ 15.2%   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                                                         │
│  ┌─────────────────────────┐ ┌──────────────────────┐   │
│  │ REVENUE OVER TIME        │ │ ORDER STATUS DIST.   │   │
│  │ [Line/Area Chart]        │ │ [Pie/Donut Chart]    │   │
│  │                         │ │ 🟢 Completed  45%    │   │
│  │     ╱╲    ╱╲            │ │ 🔵 Processing 30%    │   │
│  │    ╱  ╲╱╱  ╲╱╲         │ │ 🟡 Pending    15%    │   │
│  │  ╱            ╲        │ │ 🔴 Cancelled  10%    │   │
│  │ Jan Feb Mar Apr May Jun │ │                      │   │
│  └─────────────────────────┘ └──────────────────────┘   │
│                                                         │
│  ┌─────────────────────────┐ ┌──────────────────────┐   │
│  │ TOP SELLING PRODUCTS     │ │ RECENT ORDERS        │   │
│  │ 1. Product A — ৳45,000  │ │ #12345 — ৳1,200     │   │
│  │ 2. Product B — ৳38,000  │ │ #12346 — ৳850       │   │
│  │ 3. Product C — ৳32,000  │ │ #12347 — ৳2,100     │   │
│  │ 4. Product D — ৳28,000  │ │ #12348 — ৳650       │   │
│  │ 5. Product E — ৳22,000  │ │ #12349 — ৳3,400     │   │
│  └─────────────────────────┘ └──────────────────────┘   │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ REVENUE BY CATEGORY                               │   │
│  │ [Horizontal Bar Chart]                           │   │
│  │ Paints       ████████████████  35%               │   │
│  │ Brushes      ██████████        20%               │   │
│  │ Canvas       ████████          15%               │   │
│  │ Drawing      ██████            12%               │   │
│  │ Others       ██████████████    18%               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Analytics Requirements:**
- **Summary Cards:** Total Revenue, Total Orders, Total Products, New Customers — with percentage change indicator (up/down arrow, green/red)
- **Revenue Chart:** Line or area chart, selectable time range (7 days, 30 days, 3 months, 6 months, 1 year, custom)
- **Order Status Distribution:** Pie or donut chart
- **Top Selling Products:** Ranked list with revenue
- **Recent Orders:** Table showing last 5-10 orders
- **Revenue by Category:** Horizontal bar chart
- **Export:** Download report as PDF/CSV
- **Real-time:** Auto-refresh or manual refresh button

---

### 5.3 Category Management (CRUD)

```
┌─────────────────────────────────────────────────────────┐
│  🗂️ CATEGORIES                                           │
├─────────────────────────────────────────────────────────┤
│  [+ Add New Category]   [🔍 Search Categories...]        │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  TREE VIEW / TABLE VIEW                           │   │
│  │                                                  │   │
│  │  ▼ 🎨 Paints (15 products)     [✏️ Edit] [🗑️]    │   │
│  │    ▼ Acrylic Paints (8)        [✏️ Edit] [🗑️]    │   │
│  │      ▪ Set Packs (5)           [✏️ Edit] [🗑️]    │   │
│  │      ▪ Single Tubes (3)        [✏️ Edit] [🗑️]    │   │
│  │    ▶ Watercolor Paints (4)     [✏️ Edit] [🗑️]    │   │
│  │    ▶ Gouache Paints (3)        [✏️ Edit] [🗑️]    │   │
│  │  ▶ 🖌️ Brushes (20 products)    [✏️ Edit] [🗑️]    │   │
│  │  ▶ 📄 Pads & Paper (12)        [✏️ Edit] [🗑️]    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Category Form (Add/Edit Modal or Page):**
```
┌──────────────────────────────────────┐
│  ADD / EDIT CATEGORY                 │
│                                      │
│  Category Name: [______________]     │
│                                      │
│  Slug:          [auto-generated]     │
│                                      │
│  Parent Category: [None ▼]           │
│    (Shows all categories as tree)    │
│                                      │
│  Description:    [______________]    │
│                                      │
│  Icon / Image:   [📷 Upload]         │
│                  [Preview]            │
│                                      │
│  Status:         ● Active  ○ Inactive│
│                                      │
│  SEO Meta Title: [______________]    │
│  SEO Meta Desc:  [______________]    │
│                                      │
│  Display Order:  [0]                 │
│                                      │
│  [💾 Save]  [❌ Cancel]              │
└──────────────────────────────────────┘
```

**Category CRUD Requirements:**
- **Tree view** showing parent-child hierarchy with expand/collapse
- Each row shows: category name, product count, edit/delete buttons
- **Add:** Form with name, slug (auto-generated from name), parent category dropdown (tree select), description, image/icon upload, status (active/inactive), SEO meta fields, display order
- **Edit:** Pre-filled form, change parent category validation (cannot set self or descendant as parent)
- **Delete:** Confirmation modal, check if category has products (warn/prevent)
- **Search:** Filter tree by name
- **Drag & Drop:** Reorder categories (optional but nice-to-have)
- **Bulk actions:** Delete multiple, change status

---

### 5.4 Product Management

```
┌─────────────────────────────────────────────────────────┐
│  📦 PRODUCTS                                             │
├─────────────────────────────────────────────────────────┤
│  [+ Add New Product]  [🔍 Search...]  [Filter ▼] [Export]│
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  TABLE VIEW                                       │   │
│  │  ┌────┬──────────┬──────────┬───────┬──────┬────┐│   │
│  │  │Img │ Name     │ Category │ Price │Stock │Act ││   │
│  │  ├────┼──────────┼──────────┼───────┼──────┼────┤│   │
│  │  │🖼️ │Product 1 │ Acrylic  │৳1,200│  45  │ ✏️🗑️││   │
│  │  │🖼️ │Product 2 │ Brushes  │৳850  │  12  │ ✏️🗑️││   │
│  │  │🖼️ │Product 3 │ Canvas   │৳350  │   0  │ ✏️🗑️││   │
│  │  └────┴──────────┴──────────┴───────┴──────┴────┘│   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  [< 1] [2] [3] ... [25] [>]   Showing 1-20 of 500       │
└─────────────────────────────────────────────────────────┘
```

**Product Add/Edit Form:**
```
┌─────────────────────────────────────────────────────────┐
│  ADD / EDIT PRODUCT                                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  BASIC INFORMATION                                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Product Name: [________________________]          │   │
│  │ Slug:         [auto-generated____________]        │   │
│  │ Category:     [Select Category ▼]  (Tree Select)  │   │
│  │ Brand:        [Select Brand ▼]                     │   │
│  │ Short Desc:   [________________________]          │   │
│  │               [________________________]          │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  PRICING                                                 │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Regular Price: [৳______]  Sale Price: [৳______]   │   │
│  │ Cost Price:    [৳______]  (for profit calculation) │   │
│  │ Tax Type:      [None ▼]    Tax Rate: [0]%         │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  INVENTORY                                               │
│  ┌──────────────────────────────────────────────────┐   │
│  │ SKU:          [PROD-_____]                        │   │
│  │ Stock Qty:    [______]                            │   │
│  │ Low Stock     [10]      (alert threshold)         │   │
│  │ □ Track Inventory                                 │   │
│  │ □ Allow Backorders                                │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  IMAGES                                                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [📷 Upload Images]  (Drag & Drop / Click)         │   │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐                     │   │
│  │  │Img1│ │Img2│ │Img3│ │Img4│  (Reorder by drag)  │   │
│  │  │ 🌟 │ │    │ │    │ │    │  (🌟 = primary)      │   │
│  │  └────┘ └────┘ └────┘ └────┘                     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  VARIANTS (if applicable)                                │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Variant Type 1: [Color ▼]                         │   │
│  │   Values: [Red] [Blue] [Green] [+ Add Value]      │   │
│  │ Variant Type 2: [Size ▼]                          │   │
│  │   Values: [S] [M] [L] [XL] [+ Add Value]          │   │
│  │                                                   │   │
│  │ ┌─ VARIANT COMBINATIONS ──────────────────────┐   │   │
│  │ │ Color  │ Size  │ SKU      │ Price │ Stock   │   │   │
│  │ │ Red    │ S     │ VAR-001  │ ৳1200 │ 10      │   │   │
│  │ │ Red    │ M     │ VAR-002  │ ৳1200 │ 15      │   │   │
│  │ │ Blue   │ S     │ VAR-003  │ ৳1200 │ 8       │   │   │
│  │ │ ...    │ ...   │ ...      │ ...   │ ...     │   │   │
│  │ └──────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  DESCRIPTION (Rich Text Editor)                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [B] [I] [U] [H1] [H2] [•] [1.] [🔗] [🖼️] [📹]    │   │
│  │ ──────────────────────────────────────────────── │   │
│  │                                                   │   │
│  │  Full product description with rich formatting... │   │
│  │                                                   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  SPECIFICATIONS                                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [+ Add Row]                                       │   │
│  │ ┌──────────────────┬─────────────────────────┐    │   │
│  │ │ Attribute Name   │ Attribute Value         │ ✕  │   │
│  │ │ Weight           │ 500g                    │    │   │
│  │ │ Dimensions       │ 10 × 5 × 2 cm          │    │   │
│  │ │ Material         │ Cotton                  │    │   │
│  │ └──────────────────┴─────────────────────────┘    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  SEO                                                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Meta Title:       [________________________]      │   │
│  │ Meta Description: [________________________]      │   │
│  │ Meta Keywords:    [________________________]      │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  STATUS           [● Published] [○ Draft] [○ Archived]  │
│                                                         │
│  [💾 Save Product]  [💾 Save & Add Another]  [❌ Cancel]│
└─────────────────────────────────────────────────────────┘
```

**Product Management Requirements:**
- **Product Table:** Image thumbnail, Name, Category, Price, Stock, Status, Actions (Edit/Delete)
- **Search/Filter:** By name, category, brand, status, stock level, date range
- **Bulk Actions:** Delete, change status, assign category
- **Product Form:** All fields as shown above
- **Image Upload:** Multiple images, drag & drop reorder, set primary image, crop/resize preview
- **Variants:** Dynamic variant generation with individual SKU, price, stock per combination
- **Rich Text Editor:** For product description (TipTap, Quill, or TinyMCE)
- **Specifications:** Dynamic key-value pairs
- **SEO Fields:** Meta title, description, keywords
- **Duplicate Product:** Copy existing product as new draft

---

### 5.5 Blog Management

```
┌─────────────────────────────────────────────────────────┐
│  📝 BLOGS                                                │
├─────────────────────────────────────────────────────────┤
│  [+ Create New Blog]   [🔍 Search...]                     │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  TABLE                                            │   │
│  │  ┌────────┬──────────────────┬─────────┬──────┐  │   │
│  │  │ Image  │ Title            │ Date    │ Act  │  │   │
│  │  ├────────┼──────────────────┼─────────┼──────┤  │   │
│  │  │ 🖼️    │ Blog Post Title  │12/07/26│✏️🗑️  │  │   │
│  │  │ 🖼️    │ Another Post     │10/07/26│✏️🗑️  │  │   │
│  │  └────────┴──────────────────┴─────────┴──────┘  │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Blog Editor Form:**
```
┌─────────────────────────────────────────────────────────┐
│  CREATE / EDIT BLOG POST                                 │
├─────────────────────────────────────────────────────────┤
│  Title:           [_______________________________]      │
│  Slug:            [auto-generated________________]       │
│  Category:        [Select Blog Category ▼]               │
│  Featured Image:  [📷 Upload] [Preview]                  │
│  Author:          [Select Author ▼]                      │
│  Tags:            [tag1] [tag2] [tag3] [+ Add]           │
│                                                         │
│  Excerpt:         [_______________________________]      │
│                                                         │
│  Content:                                                │
│  ┌──────────────────────────────────────────────────┐   │
│  │ [B] [I] [U] [H1] [H2] [•] [1.] [🔗] [🖼️] [📹]    │   │
│  │ ──────────────────────────────────────────────── │   │
│  │                                                   │   │
│  │  Full blog content with rich text editing...      │   │
│  │                                                   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  SEO Meta Title:       [______________________________]  │
│  SEO Meta Description: [______________________________]  │
│                                                         │
│  Status:  ● Published  ○ Draft  ○ Scheduled             │
│  Publish Date: [📅 Select Date/Time]                     │
│                                                         │
│  [💾 Save]  [👁️ Preview]  [❌ Cancel]                    │
└─────────────────────────────────────────────────────────┘
```

**Blog Management Requirements:**
- **Blog Table:** Thumbnail, Title, Category, Author, Date, Status, Actions
- **Blog Editor:** Rich text editor, featured image upload, category selection, tags (auto-suggest), author selection, excerpt, SEO fields
- **Status:** Published / Draft / Scheduled (with publish date picker)
- **Preview:** Open preview in new tab
- **Comments:** Moderate comments (approve/reject/delete)

---

### 5.6 Inventory Management (Stock History)

```
┌─────────────────────────────────────────────────────────┐
│  📋 INVENTORY — STOCK HISTORY                            │
├─────────────────────────────────────────────────────────┤
│  [🔍 Search Product...]  [Filter by Type ▼] [Date Range] │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  TABLE: STOCK TRANSACTIONS                        │   │
│  │  ┌────────┬──────────┬──────┬────────┬──────┬───┐│   │
│  │  │ Date   │ Product  │ Type │ Qty    │Ref   │By ││   │
│  │  ├────────┼──────────┼──────┼────────┼──────┼───┤│   │
│  │  │12/07/26│Product A │ Sale │ −2     │#12345│Cust│   │
│  │  │11/07/26│Product B │Return│ +1     │#12344│Adm││   │
│  │  │10/07/26│Product C │Add   │ +50    │Manual│Adm││   │
│  │  │09/07/26│Product A │Adj   │ −5     │Damage│Adm││   │
│  │  │08/07/26│Product D │ Sale │ −3     │#12340│Cust│   │
│  │  └────────┴──────────┴──────┴────────┴──────┴───┘│   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  Transaction Types:                                      │
│  🟢 Addition (Manual stock add, Purchase/Import)         │
│  🔴 Deduction (Sale, Manual adjustment, Damage/Loss)     │
│  🔵 Return (Customer return, restock)                    │
│                                                         │
│  Filter by: Product | Date Range | Transaction Type      │
│  Export to CSV/PDF                                       │
└─────────────────────────────────────────────────────────┘
```

**Inventory Requirements:**
- **Stock History Table:** Date, Product name, Transaction type, Quantity change (±), New stock level, Reference (Order ID or "Manual"), Performed by
- **Transaction Types:**
  - **Sale:** Auto-deducted when order is placed
  - **Return/Restock:** Auto-added when order is returned/cancelled
  - **Manual Addition:** Admin manually adds stock
  - **Manual Adjustment:** Admin adjusts (e.g., damaged goods, stock count correction)
  - **Initial Stock:** Set when product is created
- **Filters:** Product search, date range, transaction type
- **Export:** CSV or PDF download
- **Product-wise Stock Report:** View stock history for a specific product
- **Low Stock Alerts:** Highlight products below threshold

---

### 5.7 Shipping Policy Management

```
┌─────────────────────────────────────────────────────────┐
│  🚚 SHIPPING POLICY                                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─ SHIPPING ZONES ────────────────────────────────┐    │
│  │  [+ Add Zone]                                    │    │
│  │                                                  │    │
│  │  Zone 1: Inside Dhaka       — ৳60   ✏️ 🗑️      │    │
│  │  Zone 2: Dhaka Suburb       — ৳100  ✏️ 🗑️      │    │
│  │  Zone 3: Outside Dhaka      — ৳120  ✏️ 🗑️      │    │
│  │  Zone 4: Remote Areas       — ৳150  ✏️ 🗑️      │    │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─ FREE SHIPPING THRESHOLD ────────────────────────┐   │
│  │  Free shipping on orders above: ৳[2000]          │   │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─ SHIPPING POLICY TEXT ───────────────────────────┐   │
│  │  Rich text editor for shipping policy page        │   │
│  │  (displayed on website)                           │   │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
│  ┌─ DELIVERY TIME ESTIMATES ────────────────────────┐   │
│  │  Inside Dhaka:    [2-3] business days            │   │
│  │  Outside Dhaka:   [3-5] business days            │   │
│  └──────────────────────────────────────────────────┘    │
│                                                         │
│  [💾 Save Settings]                                     │
└─────────────────────────────────────────────────────────┘
```

**Shipping Policy Requirements:**
- **Zone Management:** CRUD for delivery zones with associated cities/areas
- **Shipping Rates:** Fixed rate per zone or weight-based
- **Free Shipping Threshold:** Configurable minimum order amount
- **COD Availability:** Enable/disable per zone
- **Policy Page Content:** Rich text editor for shipping policy page content
- **Delivery Time Estimates:** Configurable per zone

---

### 5.8 Order Management

#### 5.8.1 Web Order Management

```
┌─────────────────────────────────────────────────────────┐
│  📑 ORDERS — WEB ORDERS                                  │
├─────────────────────────────────────────────────────────┤
│  [🔍 Search Order ID/Phone]  [Status ▼] [Date Range]     │
│                                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │  ORDERS TABLE                                     │   │
│  │  ┌────────┬──────────┬───────┬────────┬──────┬──┐│   │
│  │  │Order ID│ Customer │ Items │ Total  │Status│  ││   │
│  │  ├────────┼──────────┼───────┼────────┼──────┼──┤│   │
│  │  │#12345  │John Doe  │   3   │৳2,500 │Deliv │👁️││   │
│  │  │#12346  │Jane S.   │   1   │৳850   │Proc  │👁️││   │
│  │  │#12347  │Rahim U.  │   5   │৳5,200 │Pend  │👁️││   │
│  │  │#12348  │Karim H.  │   2   │৳1,400 │Canc  │👁️││   │
│  │  └────────┴──────────┴───────┴────────┴──────┴──┘│   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Order Detail View (Click row to expand or open page):**
```
┌─────────────────────────────────────────────────────────┐
│  ORDER #12345 — DETAILS                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─ ORDER INFO ─────────────────────────────────────┐   │
│  │ Order Date: 12 July, 2026  |  Time: 3:45 PM      │   │
│  │ Payment: bKash  |  Transaction: TXN-789012        │   │
│  │ Status: [▼ Change Status]                         │   │
│  │   Pending → Confirmed → Processing → Shipped →    │   │
│  │   Delivered → [Cancelled/Returned]                │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ CUSTOMER INFO ───┐  ┌─ SHIPPING ADDRESS ────────┐   │
│  │ Name: John Doe     │  │ 123 Main Road,            │   │
│  │ Phone: 017XX-XXXX  │  │ Mohammadpur,              │   │
│  │ Email: j@email.com │  │ Dhaka-1207                │   │
│  └────────────────────┘  └───────────────────────────┘   │
│                                                         │
│  ┌─ ORDER ITEMS ────────────────────────────────────┐   │
│  │ ┌────────┬──────────┬──────┬───────┬──────────┐  │   │
│  │ │ Image  │ Product  │ Qty  │ Price │ Subtotal │  │   │
│  │ ├────────┼──────────┼──────┼───────┼──────────┤  │   │
│  │ │ 🖼️    │Product A │  2   │৳1,200│ ৳2,400   │  │   │
│  │ │ 🖼️    │Product B │  1   │৳850  │ ৳850     │  │   │
│  │ │ 🖼️    │Product C │  1   │৳350  │ ৳350     │  │   │
│  │ └────────┴──────────┴──────┴───────┴──────────┘  │   │
│  │                       Subtotal:      ৳3,600     │   │
│  │                       Shipping:      ৳60        │   │
│  │                       Discount:     −৳500       │   │
│  │                       ─────────────────────     │   │
│  │                       TOTAL:         ৳3,160     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ ORDER TIMELINE ─────────────────────────────────┐   │
│  │ ● Order Placed      — 12 Jul 2026, 3:45 PM       │   │
│  │ ● Payment Confirmed — 12 Jul 2026, 3:47 PM       │   │
│  │ ● Order Confirmed   — 12 Jul 2026, 4:00 PM       │   │
│  │ ● Processing        — 13 Jul 2026, 9:00 AM       │   │
│  │ ○ Shipped           — Pending                    │   │
│  │ ○ Delivered         — Pending                    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ ACTIONS ────────────────────────────────────────┐   │
│  │ [🖨️ Print Invoice]  [📧 Email Customer]           │   │
│  │ [📋 Download PDF]   [🔄 Update Status]            │   │
│  │ [❌ Cancel Order] (if status allows)              │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Web Order Management Requirements:**
- **Orders Table:** Order ID, Customer name & phone, Item count, Total amount, Payment method, Status badge (color-coded), Date, Action (view details)
- **Filters:** Search by order ID/phone, Status dropdown (Pending, Confirmed, Processing, Shipped, Delivered, Cancelled, Returned), Date range, Payment method
- **Order Detail:** Complete order info as shown above
- **Status Management:** Dropdown to change order status with confirmation
- **Order Timeline:** Visual log of all status changes with timestamps
- **Bulk Actions:** Change status for multiple orders, export selected
- **Invoice:** Generate and print invoice PDF
- **Export:** Export orders to CSV
- **Notifications:** Automatic email/SMS to customer on status change

#### 5.8.2 Manual Order Creation

```
┌─────────────────────────────────────────────────────────┐
│  📝 CREATE MANUAL ORDER                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─ CUSTOMER INFORMATION ───────────────────────────┐   │
│  │ ○ Existing Customer: [Search by phone/name ▼]     │   │
│  │ ● New Customer:                                   │   │
│  │   Name:  [_______________]                        │   │
│  │   Phone: [_______________]                        │   │
│  │   Email: [_______________] (optional)              │   │
│  │   City:  [Select City ▼]                          │   │
│  │   Zone:  [Select Zone ▼]                          │   │
│  │   Address: [____________________________]         │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ PRODUCTS ───────────────────────────────────────┐   │
│  │ [+ Add Product]                                   │   │
│  │                                                   │   │
│  │ ┌─────────────────────────────────────────────┐   │   │
│  │ │ [🔍 Search & Select Product...]              │   │   │
│  │ │ ┌────────┬──────────┬──────┬───────┬──────┐ │   │   │
│  │ │ │ Image  │ Product  │ Qty  │ Price │Total │ │   │   │
│  │ │ ├────────┼──────────┼──────┼───────┼──────┤ │   │   │
│  │ │ │ 🖼️    │Product A │ [2]  │৳1,200│৳2,400│ │   │   │
│  │ │ │ 🖼️    │Product B │ [1]  │৳850  │৳850 │ │   │   │
│  │ │ └────────┴──────────┴──────┴───────┴──────┘ │   │   │
│  │ │                              [+ Add More]   │   │   │
│  │ └─────────────────────────────────────────────┘   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ ORDER SUMMARY ──────────────────────────────────┐   │
│  │  Subtotal:      ৳3,250                           │   │
│  │  Shipping:      [৳___] (editable)                 │   │
│  │  Discount:      [৳___] (editable)                 │   │
│  │  ───────────────────────────                      │   │
│  │  TOTAL:         ৳3,310                            │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─ PAYMENT ────────────────────────────────────────┐   │
│  │ Payment Method: [Cash on Delivery ▼]              │   │
│  │ Payment Status: [Paid ▼] / [Unpaid ▼]             │   │
│  │ Order Notes:    [____________________________]    │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  [✅ CREATE ORDER]  [❌ Cancel]                          │
└─────────────────────────────────────────────────────────┘
```

**Manual Order Creation Requirements:**
- **Customer Selection:** Search existing customer OR create new customer on-the-fly
- **Product Selection:** Searchable product dropdown with stock availability indicator
- **Product List:** Add multiple products with configurable quantity and price override
- **Order Summary:** Auto-calculated totals with editable shipping and discount fields
- **Payment:** Select payment method (COD/bKash/Card) and payment status
- **Order Notes:** Internal notes field
- **Validation:** Phone number required, at least one product required
- **Success:** Show confirmation with order ID, option to print invoice
- This is for phone orders, social media orders, or walk-in customers

---

## 6. Responsive Design Guidelines

### 6.1 Breakpoints

| Device | Min Width | Max Width | Columns | Key Changes |
|--------|-----------|-----------|---------|-------------|
| **Mobile S** | 320px | 480px | 1 col | Hamburger menu, stacked layout |
| **Mobile L** | 481px | 767px | 1 col | Larger touch targets |
| **Tablet** | 768px | 1023px | 2 cols | Sidebar becomes drawer |
| **Desktop** | 1024px | 1279px | 3-4 cols | Full sidebar visible |
| **Desktop L** | 1280px | 1536px | 4-5 cols | Max-width container |
| **Desktop XL** | 1537px | + | 5-6 cols | Centered content |

### 6.2 Mobile-Specific Behaviors

| Component | Desktop | Mobile |
|-----------|---------|--------|
| **Header** | 3-tier full header | Simplified: Logo + Cart + Hamburger |
| **Navigation** | Horizontal mega menu | Slide-out drawer menu |
| **Category Menu** | Dropdown on hover | Accordion expand/collapse |
| **Search** | Full search bar | Search icon → expands or opens overlay |
| **Filters** | Left sidebar always visible | "Filter" button → bottom sheet / drawer |
| **Product Grid** | 3-4 columns | 1-2 columns |
| **Cart** | Drawer from right | Full-screen slide or page navigation |
| **Product Cards** | Hover effects | Tap effects, always-visible buttons |
| **Tables** | Full table | Card-style stacked layout |
| **Modals** | Centered popup | Bottom sheet or full-screen |
| **Footer** | 4 columns | 2 columns → 1 column stacked |

### 6.3 Touch & Gesture Support
- Swipe carousels (banners, products)
- Pull-to-refresh on product listings
- Swipe to delete (cart items, wishlist)
- Pinch to zoom (product images)
- Bottom navigation bar on mobile (Home, Shop, Cart, Wishlist, Account)
- Minimum touch target: 44×44px (Apple HIG) / 48×48px (Material Design)

---

## 7. Color Palette & Typography

### 7.1 Recommended Color Palette

```
PRIMARY COLORS (Brand Identity):
┌─────────────────────────────────────────────────────┐
│ Primary:       #E85D3F  (Warm Orange/Coral)         │
│ Primary Dark:  #C14A2F  (Darker shade for hover)    │
│ Primary Light: #FDE8E3  (Light tint for backgrounds) │
└─────────────────────────────────────────────────────┘

SECONDARY COLORS:
┌─────────────────────────────────────────────────────┐
│ Secondary:     #2D3436  (Dark Charcoal)             │
│ Accent:        #00B894  (Success/Teal Green)        │
│ Warning:       #FDCB6E  (Yellow)                    │
│ Danger:        #E17055  (Red/Coral for errors)      │
└─────────────────────────────────────────────────────┘

NEUTRAL COLORS:
┌─────────────────────────────────────────────────────┐
│ White:         #FFFFFF                              │
│ Gray-50:       #F8F9FA  (Page background)           │
│ Gray-100:      #F1F3F5  (Card background)           │
│ Gray-200:      #E9ECEF  (Borders)                   │
│ Gray-300:      #DEE2E6  (Disabled)                  │
│ Gray-500:      #ADB5BD  (Placeholder)               │
│ Gray-700:      #495057  (Body text)                 │
│ Gray-900:      #212529  (Headings)                  │
└─────────────────────────────────────────────────────┘

SALE/DISCOUNT:
┌─────────────────────────────────────────────────────┐
│ Sale Badge:    #FF4757  (Red)                       │
│ Sale Text:     #FF4757                              │
│ Old Price:     #ADB5BD + strikethrough              │
└─────────────────────────────────────────────────────┘

STATUS COLORS (Admin):
┌─────────────────────────────────────────────────────┐
│ Pending:       #FFA502  (Orange)                    │
│ Processing:    #3498DB  (Blue)                      │
│ Shipped:       #9B59B6  (Purple)                    │
│ Delivered:     #27AE60  (Green)                     │
│ Cancelled:     #E74C3C  (Red)                       │
└─────────────────────────────────────────────────────┘
```

### 7.2 Typography

```
FONT FAMILY:
┌─────────────────────────────────────────────────────┐
│ Headings:  'Poppins', sans-serif  (or 'Inter')      │
│ Body:      'Inter', sans-serif    (or 'Roboto')     │
│ Bengali:   'Hind Siliguri', sans-serif              │
│           (for Bangla language support)             │
└─────────────────────────────────────────────────────┘

FONT SIZES:
┌─────────────────────────────────────────────────────┐
│ H1:  2.5rem  (40px)  —  Bold (700)                  │
│ H2:  2rem    (32px)  —  Bold (700)                  │
│ H3:  1.5rem  (24px)  —  SemiBold (600)              │
│ H4:  1.25rem (20px)  —  SemiBold (600)              │
│ H5:  1.125rem(18px)  —  Medium (500)                │
│ H6:  1rem    (16px)  —  Medium (500)                │
│ Body: 0.875rem (14px) — Regular (400)               │
│ Small: 0.75rem (12px) — Regular (400)               │
│ Price (current): 1.125rem (18px) — Bold (700)       │
│ Price (old): 0.875rem (14px) — Regular + Line-through│
└─────────────────────────────────────────────────────┘

LINE HEIGHT:
┌─────────────────────────────────────────────────────┐
│ Headings: 1.2    Body: 1.6    Tight: 1.0            │
└─────────────────────────────────────────────────────┘
```

---

## 8. UI Component Library

### 8.1 Common Reusable Components

| Component | Description | States |
|-----------|-------------|--------|
| **Button** | Primary, Secondary, Outline, Ghost, Danger, Link | Default, Hover, Active, Disabled, Loading |
| **Input** | Text, Number, Email, Phone, Password, Textarea | Default, Focus, Error, Disabled, Read-only |
| **Select/Dropdown** | Single select, Multi select, Searchable | Default, Open, Selected, Disabled |
| **Checkbox/Radio** | Standard, Card-style | Checked, Unchecked, Disabled |
| **Toggle/Switch** | On/Off toggle | On, Off, Disabled |
| **Badge** | Status indicators, Count badges | Various colors |
| **Modal** | Confirmation, Form, Info | Open/Closed |
| **Drawer** | Slide from right/left/bottom | Open/Closed |
| **Toast/Notification** | Success, Error, Warning, Info | Auto-dismiss |
| **Tooltip** | Top, Bottom, Left, Right | Show/Hide |
| **Card** | Product card, Blog card, Info card | Default, Hover |
| **Table** | Data table with sorting, filtering, pagination | Loading, Empty, Error |
| **Skeleton** | Loading placeholder | Various shapes |
| **Pagination** | Numbered, Previous/Next | Active page |
| **Breadcrumb** | Path navigation | Clickable segments |
| **Tabs** | Horizontal tabs | Active, Disabled |
| **Accordion** | Expandable sections | Open, Closed |
| **Carousel/Slider** | Image/product carousel | Auto-play, Manual |
| **Rating Stars** | Display & Interactive | 0-5 stars |
| **File Upload** | Drag & drop, Click to browse | Default, Uploading, Done, Error |
| **Rich Text Editor** | WYSIWYG editor | Toolbar, Preview |
| **Date Picker** | Single date, Date range | Calendar view |
| **Dropdown Menu** | Context menu, Options menu | Open/Closed |
| **Avatar** | Image, Initials, Icon | Various sizes |
| **Empty State** | Illustration + Message + CTA | — |
| **Error State** | Error message + Retry button | — |
| **Loading Spinner** | Full page, Inline, Button | — |
| **Progress Bar** | Linear, Circular | Percentage |

### 8.2 Admin-Specific Components

| Component | Description |
|-----------|-------------|
| **Stats Card** | Icon + Value + Label + Trend indicator |
| **Chart Container** | Card with chart + title + date range selector |
| **Data Table Pro** | Sort, Filter, Search, Pagination, Row selection, Bulk actions |
| **Form Layout** | 1-col, 2-col, 3-col responsive form sections |
| **Tree Select** | Hierarchical category/product selection |
| **Media Library** | Browse, upload, select images |
| **Activity Timeline** | Vertical timeline for order status, logs |
| **Kanban Board** | (Optional) For order management by status |

---

## 9. Database Schema Overview

### 9.1 Core Tables

```
┌─────────────────────────────────────────────────────────┐
│  USERS                    │  CATEGORIES                 │
│  ─────────────────────    │  ─────────────────────      │
│  id (PK)                  │  id (PK)                    │
│  name                     │  name                       │
│  phone (unique)           │  slug (unique)              │
│  email (unique, nullable) │  parent_id (FK → self, null)│
│  password_hash            │  description                │
│  avatar                   │  image                      │
│  role (customer/admin)    │  icon                       │
│  is_verified              │  display_order              │
│  created_at               │  is_active                  │
│                           │  meta_title, meta_desc      │
│                           │  created_at, updated_at     │
├───────────────────────────┼─────────────────────────────┤
│  PRODUCTS                 │  PRODUCT_IMAGES             │
│  ─────────────────────    │  ─────────────────────      │
│  id (PK)                  │  id (PK)                    │
│  name                     │  product_id (FK)            │
│  slug (unique)            │  image_url                  │
│  category_id (FK)         │  is_primary                 │
│  brand_id (FK, nullable)  │  display_order              │
│  short_description        │                             │
│  description (rich text)  │                             │
│  regular_price            │                             │
│  sale_price (nullable)    │                             │
│  cost_price (nullable)    │                             │
│  sku (unique)             │                             │
│  stock_quantity           │                             │
│  low_stock_threshold      │                             │
│  is_active                │                             │
│  has_variants             │                             │
│  meta_title, meta_desc    │                             │
│  created_at, updated_at   │                             │
├───────────────────────────┼─────────────────────────────┤
│  PRODUCT_VARIANTS         │  PRODUCT_SPECIFICATIONS     │
│  ─────────────────────    │  ─────────────────────      │
│  id (PK)                  │  id (PK)                    │
│  product_id (FK)          │  product_id (FK)            │
│  sku (unique)             │  attribute_name             │
│  variant_combination (JSON)│  attribute_value            │
│  price_override (nullable) │  display_order              │
│  stock_quantity           │                             │
│  image (nullable)         │                             │
│  is_active                │                             │
├───────────────────────────┼─────────────────────────────┤
│  ORDERS                   │  ORDER_ITEMS                │
│  ─────────────────────    │  ─────────────────────      │
│  id (PK)                  │  id (PK)                    │
│  order_number (unique)    │  order_id (FK)              │
│  user_id (FK, nullable)   │  product_id (FK)            │
│  customer_name            │  variant_id (FK, nullable)   │
│  customer_phone           │  product_name (snapshot)    │
│  customer_email           │  quantity                   │
│  shipping_address (JSON)  │  unit_price                 │
│  shipping_method          │  subtotal                   │
│  shipping_cost            │                             │
│  subtotal                 │                             │
│  discount                 │                             │
│  total                    │                             │
│  payment_method           │                             │
│  payment_status           │                             │
│  transaction_id           │                             │
│  order_status             │                             │
│  order_notes              │                             │
│  is_manual_order          │                             │
│  created_by_admin_id      │                             │
│  created_at, updated_at   │                             │
├───────────────────────────┼─────────────────────────────┤
│  ORDER_STATUS_HISTORY     │  STOCK_TRANSACTIONS         │
│  ─────────────────────    │  ─────────────────────      │
│  id (PK)                  │  id (PK)                    │
│  order_id (FK)            │  product_id (FK)            │
│  status                   │  variant_id (FK, nullable)   │
│  note                     │  transaction_type           │
│  changed_by               │  quantity_change            │
│  created_at               │  new_stock_level            │
│                           │  reference (order_id, etc)  │
│                           │  performed_by               │
│                           │  note                       │
│                           │  created_at                 │
├───────────────────────────┼─────────────────────────────┤
│  BLOGS                    │  BLOG_CATEGORIES            │
│  ─────────────────────    │  ─────────────────────      │
│  id (PK)                  │  id (PK)                    │
│  title                    │  name                       │
│  slug (unique)            │  slug (unique)              │
│  category_id (FK)         │                             │
│  author_id (FK)           │                             │
│  featured_image           │                             │
│  excerpt                  │                             │
│  content (rich text)      │                             │
│  tags (JSON array)        │                             │
│  status (published/draft) │                             │
│  published_at             │                             │
│  meta_title, meta_desc    │                             │
│  created_at, updated_at   │                             │
├───────────────────────────┼─────────────────────────────┤
│  WISHLIST                 │  COMPARE                    │
│  ─────────────────────    │  ─────────────────────      │
│  id (PK)                  │  id (PK)                    │
│  user_id (FK)             │  user_id / session_id       │
│  product_id (FK)          │  product_ids (JSON)         │
│  created_at               │                             │
├───────────────────────────┼─────────────────────────────┤
│  REVIEWS                  │  COUPONS                    │
│  ─────────────────────    │  ─────────────────────      │
│  id (PK)                  │  id (PK)                    │
│  product_id (FK)          │  code (unique)              │
│  user_id (FK)             │  type (fixed/percentage)    │
│  rating (1-5)             │  value                      │
│  review_text              │  min_order_amount           │
│  is_approved              │  max_uses                   │
│  created_at               │  used_count                 │
│                           │  start_date, end_date       │
│                           │  is_active                  │
└───────────────────────────┴─────────────────────────────┘
```

---

## 10. API Endpoints Overview

### 10.1 Public (Customer) API Endpoints

```
METHOD   ENDPOINT                          DESCRIPTION
────────────────────────────────────────────────────────────
GET      /api/products                     List products (with filters, pagination)
GET      /api/products/:slug               Get single product details
GET      /api/products/featured            Get featured products
GET      /api/products/flash-sale          Get flash sale products
GET      /api/products/new-arrivals        Get new arrivals
GET      /api/products/best-sellers        Get best selling products
GET      /api/products/related/:id         Get related products
GET      /api/products/search?q=           Search products

GET      /api/categories                   List all categories (tree)
GET      /api/categories/:slug             Get category with subcategories
GET      /api/categories/:slug/products    Get products by category

GET      /api/blogs                        List published blogs
GET      /api/blogs/:slug                  Get single blog with comments
POST     /api/blogs/:id/comments           Add comment to blog

POST     /api/auth/register                Register new user
POST     /api/auth/login                   Login user
POST     /api/auth/send-otp                Send OTP to phone
POST     /api/auth/verify-otp              Verify OTP
POST     /api/auth/forgot-password         Request password reset
POST     /api/auth/reset-password          Reset password with OTP

GET      /api/user/profile                 Get user profile
PUT      /api/user/profile                 Update user profile
PUT      /api/user/password                Change password
GET      /api/user/addresses               List saved addresses
POST     /api/user/addresses               Add new address
PUT      /api/user/addresses/:id           Update address
DELETE   /api/user/addresses/:id           Delete address

GET      /api/user/orders                  List user orders
GET      /api/user/orders/:id              Get order details
POST     /api/user/orders/:id/cancel       Cancel order

GET      /api/user/wishlist                Get wishlist
POST     /api/user/wishlist                Add to wishlist
DELETE   /api/user/wishlist/:productId     Remove from wishlist

GET      /api/cart                         Get cart
POST     /api/cart/add                     Add item to cart
PUT      /api/cart/update                  Update item quantity
DELETE   /api/cart/remove/:productId       Remove item from cart
DELETE   /api/cart/clear                   Clear cart
POST     /api/cart/apply-coupon            Apply coupon code

POST     /api/checkout                     Create order
POST     /api/payment/bkash/initiate       Initiate bKash payment
POST     /api/payment/bkash/execute        Execute bKash payment
POST     /api/payment/ssl/initiate         Initiate SSL Commerz payment
POST     /api/payment/ssl/ipn              SSL Commerz IPN listener
GET      /api/payment/success              Payment success callback
GET      /api/payment/fail                 Payment failure callback

POST     /api/newsletter/subscribe         Subscribe to newsletter
POST     /api/contact                      Submit contact form
```

### 10.2 Admin API Endpoints

```
METHOD   ENDPOINT                          DESCRIPTION
────────────────────────────────────────────────────────────
GET      /api/admin/dashboard/summary      Get dashboard summary stats
GET      /api/admin/dashboard/revenue      Get revenue chart data
GET      /api/admin/dashboard/top-products Get top selling products

GET      /api/admin/categories             List all categories
POST     /api/admin/categories             Create category
GET      /api/admin/categories/:id         Get category details
PUT      /api/admin/categories/:id         Update category
DELETE   /api/admin/categories/:id         Delete category
PUT      /api/admin/categories/reorder     Reorder categories

GET      /api/admin/products               List products (with filters, pagination)
POST     /api/admin/products               Create product
GET      /api/admin/products/:id           Get product details
PUT      /api/admin/products/:id           Update product
DELETE   /api/admin/products/:id           Delete product
POST     /api/admin/products/:id/duplicate  Duplicate product
PUT      /api/admin/products/bulk-status    Bulk update status
DELETE   /api/admin/products/bulk-delete    Bulk delete

POST     /api/admin/products/:id/images     Upload product images
DELETE   /api/admin/products/images/:id     Delete product image
PUT      /api/admin/products/images/reorder Reorder product images

GET      /api/admin/blogs                  List all blogs
POST     /api/admin/blogs                  Create blog
GET      /api/admin/blogs/:id              Get blog details
PUT      /api/admin/blogs/:id              Update blog
DELETE   /api/admin/blogs/:id              Delete blog
GET      /api/admin/blogs/categories       List blog categories
POST     /api/admin/blogs/categories       Create blog category
PUT      /api/admin/blogs/categories/:id    Update blog category
DELETE   /api/admin/blogs/categories/:id    Delete blog category
GET      /api/admin/blogs/comments         List all comments
PUT      /api/admin/blogs/comments/:id/approve Approve comment
DELETE   /api/admin/blogs/comments/:id     Delete comment

GET      /api/admin/inventory              List stock transactions
GET      /api/admin/inventory/:productId   Product stock history
POST     /api/admin/inventory/adjust       Manual stock adjustment
GET      /api/admin/inventory/low-stock    Low stock products

GET      /api/admin/shipping/zones         List shipping zones
POST     /api/admin/shipping/zones         Create zone
PUT      /api/admin/shipping/zones/:id     Update zone
DELETE   /api/admin/shipping/zones/:id     Delete zone
GET      /api/admin/shipping/settings      Get shipping settings
PUT      /api/admin/shipping/settings      Update shipping settings

GET      /api/admin/orders                 List all orders (with filters)
GET      /api/admin/orders/:id             Get order details
PUT      /api/admin/orders/:id/status      Update order status
POST     /api/admin/orders/manual          Create manual order
GET      /api/admin/orders/:id/invoice     Generate invoice PDF
GET      /api/admin/orders/export          Export orders to CSV
PUT      /api/admin/orders/bulk-status      Bulk update order status

GET      /api/admin/customers              List customers
GET      /api/admin/customers/:id          Get customer details

GET      /api/admin/reviews                List all reviews
PUT      /api/admin/reviews/:id/approve    Approve review
DELETE   /api/admin/reviews/:id            Delete review

GET      /api/admin/coupons                List coupons
POST     /api/admin/coupons                Create coupon
PUT      /api/admin/coupons/:id            Update coupon
DELETE   /api/admin/coupons/:id            Delete coupon

GET      /api/admin/settings               Get site settings
PUT      /api/admin/settings               Update site settings
POST     /api/admin/settings/banners       Upload banner image
DELETE   /api/admin/settings/banners/:id   Delete banner image
```

---

## 📎 Appendix

### A. Reference Links

| Resource | URL |
|----------|-----|
| Art Lab BD (Main Reference) | [https://artlabbd.com/](https://artlabbd.com/) |
| Purple Handicrafts (Facebook) | [https://www.facebook.com/PurpleHandicrafts.BD](https://www.facebook.com/PurpleHandicrafts.BD) |
| Enlight BD (Facebook) | [https://www.facebook.com/enlightbd25](https://www.facebook.com/enlightbd25) |

### B. Key Design Takeaways from References

1. **ArtLabBD**: Multi-tier header, mega menu, product sections (New Arrival, Best Sellers, Flash Sale), clear pricing with strikethrough original prices, wishlist + compare + cart functionality, responsive product grids, category-based navigation

2. **Purple Handicrafts**: Strong branding, vibrant product photography, social-media-driven traffic, handmade product focus

3. **Enlight BD**: Clean layout, professional product staging, minimal aesthetic

### C. Development Phases (Recommended)

| Phase | Duration | Deliverables |
|-------|----------|-------------|
| **Phase 1** | 4-6 weeks | Project setup, Auth (Login/Register/OTP), Home Page, Shop Page, Product Detail, Cart |
| **Phase 2** | 3-4 weeks | Checkout, Payment (bKash + SSL), User Dashboard, Wishlist, Compare |
| **Phase 3** | 3-4 weeks | Admin Dashboard, Category CRUD, Product CRUD, Inventory |
| **Phase 4** | 2-3 weeks | Blog, About Us, Contact Us, Order Management (Web + Manual) |
| **Phase 5** | 2-3 weeks | Analytics, Shipping Policy, Coupons, Testing & Bug Fixing |
| **Phase 6** | 1-2 weeks | Performance optimization, SEO, Deployment, Documentation |

---

> **📄 End of Documentation**

---

*This document serves as the complete reference for UI/UX design and development of the e-commerce platform. For any clarifications, please contact the project manager.*
