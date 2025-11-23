# Pizzaro

Single-page pizza ordering app built with React Router data APIs, Redux Toolkit, and Tailwind CSS 4. Fetches a live menu, lets you build a cart, collects delivery details (with optional geolocation), and tracks or prioritizes any order.

## Features
- Menu powered by a React Router loader (`/menu`) that fetches from the React Fast Pizza API.
- Cart with add/update/remove/clear actions, price and quantity totals, and a live preview bar.
- Checkout form with phone validation, optional priority surcharge, and “Locate me” geolocation that reverse-geocodes an address.
- Order tracker by ID (`/order/:orderId`) with loader-driven fetch, priority upgrade action, and automatic cart cleanup when returning from checkout.
- Error boundaries per route plus a loader overlay to cover navigation states.

## Tech Stack
- React 19 + Vite.
- React Router 7 data APIs (loaders, actions, errorElement, useFetcher).
- Redux Toolkit for cart and user state.
- Tailwind CSS 4 with tailwind-merge for component variants.
- External APIs: `react-fast-pizza-api.jonas.io` (menu, orders) and BigDataCloud Reverse Geocoding.

## Getting Started
1) Install dependencies: `npm install`  
2) Run dev server: `npm run dev` and open the shown local URL.  
3) Production build: `npm run build` then `npm run preview` to verify the output.

## App Map
- `/` Home: capture user name or jump to the menu.
- `/menu` Menu: fetch menu, add items to cart, handle sold-out states.
- `/cart` Cart: adjust quantities, clear cart, proceed to checkout.
- `/order/new` Checkout: submit order with validation, optional priority, and geolocation-assisted address.
- `/order/:orderId` Order details: track status/ETA, see line items, and upgrade to priority.

## Tailwind CSS: what I practiced here
- Layout and responsiveness: grid shell (`grid-rows-[auto_1fr_auto]`), `flow-root` content wrapper, `divide-*` and `space-*` utilities, responsive `sm`/`md` tweaks for inputs, nav, and layout.
- Tokens and global styles: custom pizza palette via CSS variables, `@theme` font override, consistent background/text colors, and a reusable `.input` class with base-layer overrides for form controls.
- Components and variants: `Button` composed with tailwind-merge for size/variant/shape options, reused across links, forms, and icon buttons without class conflicts.
- Interaction polish: focus and disabled states baked into utilities (`focus:ring`, `disabled:*`), accent color on checkboxes, hover/active emphasis on calls to action.
- Motion and visual cues: custom keyframes for the loader bars and a pulsing cart preview gradient to signal app state.

## Tailwind gaps and next steps
- Promote the pizza color tokens into Tailwind theme variables to avoid hard-coded hex values in utilities and to prep for light/dark theming.
- Extract recurring UI patterns (`card`, `section`, `label/input` rows) into `@layer components` or a small `cva` helper instead of repeating class stacks.
- Add a documented spacing/typography scale and optionally use `container`/`prose` utilities for richer content sections.
- Explore Tailwind’s form/typography plugins (or v4 presets) to reduce custom CSS for inputs and text defaults.
- Add state-driven variants (loading, error) to common components with tailwind-merge to keep class lists predictable.
