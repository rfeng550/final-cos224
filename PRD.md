# Product Requirements Document (PRD)

## COS204 Final Project --- Simple E-Commerce Store

**Due: December 5, 2025**

## 1. Overview

This project is a React-based e-commerce web application simulating a
simple online store selling phones and computers. Customers can browse
products, view detailed information, manage a shopping cart, and
complete checkout. All pages share a consistent layout with a common
header, footer, and navigation bar.

## 2. Scope

### Included

-   Fully functional single-page React application.
-   Four navigable pages using React Router.
-   Client-side product fetching from provided API.
-   Shopping cart stored in localStorage.
-   Reusable components and responsive layout.

### Not Included

-   Backend/database development.
-   Real payment processing.
-   Authentication or user accounts.

## 3. User Personas

### Customer

A general user who browses product listings, views details, adds
products to cart, and completes checkout.

### Instructor / Evaluator

Reviews functionality, code quality, Git workflow, styling, and
presentation.

## 4. Functional Requirements

# 4.1 Home Page

**URI:** `/`

### 4.1.1 Data Fetching

-   Load two initial product batches:
    -   https://huitian.serv00.net/project/?type=list&batchNumber=1
    -   https://huitian.serv00.net/project/?type=list&batchNumber=2
-   Display each batch in rows (3 items per row).

### 4.1.2 Load More Products

-   "Load More Products" loads next batch numbers.
-   Hide button when moreProducts = false.

### 4.1.3 Product Card

-   Image, productId, price, Add to Cart button.
-   Clicking image → Product Details page.

------------------------------------------------------------------------

# 4.2 Product Details Page

**URI:** `/product/:productId`

### 4.2.1 Data Fetching

Fetch product details via: -
https://huitian.serv00.net/project/?productId=`<productId>`{=html}

### 4.2.2 Images

-   4 vertical thumbnails.
-   First thumbnail is default main image.
-   Clicking thumbnail updates main image.

### 4.2.3 Product Info

Includes ID, price, description, screen, weight, battery, etc.

### 4.2.4 Add to Cart

Multiple clicks increase quantity.

------------------------------------------------------------------------

# 4.3 Shopping Cart Page

**URI:** `/cart`

### 4.3.1 Storage

Use localStorage.

### 4.3.2 Cart Row

Image, productId, price, quantity selector, total per product.

### 4.3.3 Calculations

Update line total and cart total dynamically.

### 4.3.4 Checkout

Checkout button → /checkout.

------------------------------------------------------------------------

# 4.4 Checkout Page

**URI:** `/checkout`

### Required fields

-   Personal info: first name, last name, email, phone.
-   Billing address.
-   Delivery address (with "same as billing" checkbox).
-   Credit card info.
-   Terms & Conditions checkbox → enables Pay Now.

------------------------------------------------------------------------

## 5. Non-Functional Requirements

-   Must use React.
-   Shared header & footer.
-   CSS + Bootstrap or Tailwind.
-   Clean reusable components.

## 6. Data Structures

### Product Example

{ "productId": "IPHONE17", "price": 1699, "images":
\["img1","img2","img3","img4"\], "description": "...", "screen": "...",
"weight": "...", "battery": "..." }

### Cart Example

{ "IPHONE17": { "productId": "IPHONE17", "price": 1699, "quantity": 2,
"image": "thumbnail.jpg" } }

## 7. Git & Team Requirements

-   Feature branches.
-   Clear commit history.
-   Pull Requests required.
-   Final code deployed on GitHub.
-   Presentation: explain components, interactions, and demo.

## 8. Acceptance Criteria

-   All pages functional.
-   Styling follows layout drafts.
-   Cart persists.
-   Checkout fully validated.
-   Git + presentation requirements met.
