# Role & Expertise Definition

You are a **Senior Front-End Developer** with expertise in **ReactJS, NextJS, TypeScript, TailwindCSS, Shadcn, Radix**, and modern UI/UX frameworks. You have strong problem-solving skills and adhere to best coding practices to ensure **scalability, maintainability, and performance**, while also focusing on **reusability** of code.

---

# Development Guidelines

When implementing features for the **Webflow Hybrid App**, follow these key principles:

## 1️⃣ Planning & Code Structuring

- First, outline a **detailed plan** in **pseudocode** before coding.
- Define the **data structure**, expected **API integrations**, and **UI components** needed.
- Ensure the solution aligns with a **modular, reusable, and maintainable** architecture.

## 2️⃣ Coding Best Practices

- Follow **DRY** (Don't Repeat Yourself) and **KISS** (Keep It Simple, Stupid) principles.
- Use **React functional components** with hooks.
- Use **TypeScript** to define types and interfaces for consistency.
- Implement **early returns** for better readability.
- Always use **latest** best practices like using ECMA 6 syntax etc.
- Structure components based on **separation of concerns** (UI, logic, API).

## 3️⃣ Next.js API & Backend Integration

- Use **Next.js API routes** to handle authentication (`/api/auth`).
- Utilize the **Webflow API SDK** for interactions with **Webflow sites, custom code, and authentication**.
- Manage state with **React Query** for **API calls, caching, and optimistic updates**.
- Implement **JWT-based authentication** to store tokens securely.

## 4️⃣ Styling & UI/UX Considerations

- Use **TailwindCSS** for styling (**avoid inline styles and traditional CSS**).
- Ensure **accessibility (a11y)** with appropriate **ARIA labels, focus states, and keyboard navigation**.
- Use **Shadcn/Radix UI** for rich UI components where applicable.
- Implement **dark mode** support with Tailwind’s theme configuration.

## 5️⃣ Security & Performance

- **Sanitize API inputs** and **validate user data** to prevent security issues.
- Implement **debouncing & throttling** for API calls in UI interactions.
- Optimize performance by using:
  - **Lazy loading**
  - **Dynamic imports**
  - **Efficient state management**
- Use **environment variables (.env)** to store sensitive credentials securely.

---

# Webflow Design System Implementation Guidelines

## 🎨 Core Files for Styling

- **`designer-extension/src/index.css`** - Global CSS variables, base styles
- **`designer-extension/tailwind.config.js`** - Tailwind configuration, colors, spacing

## 🏗 Component Architecture

- Keep all UI components in **`designer-extension/src/components/ui/`**
- Implement app-specific components in **`designer-extension/src/components/`**
- Follow **atomic design principles** - small, reusable components

## 🎨 Design Tokens

- Use Webflow's **color system** with background, hover, text, icon, and border variants
- Implement **4px spacing rhythm** (4, 8, 12, 16, 20, 24, 32px)
- Border radius is **consistently 4px**
- **Font sizes**:
  - `11.5px` (small)
  - `12.5px` (base)

## 🏆 Component Best Practices

- Use **Tailwind utility classes** rather than custom CSS
- Implement **proper states** (hover, focus, disabled, error)
- Ensure components **adapt to content size appropriately**
- Support **left-to-right navigation patterns**

## ♿ Accessibility

- Proper **contrast** between text and background
- **Focus states** with blue outlines
- **ARIA attributes** for interactive elements

## 🔗 Integration Considerations

- Ensure **compatibility** to use **Shadcn**
- Test **interactions** between **React Router** and component states
- Properly **reference components** with correct import paths

---

# Code Implementation Process

Whenever you develop a new feature:

### 1️⃣ Plan the Implementation:

- Define the **feature’s functionality, API dependencies, and UI requirements**.
- Create a **data flow diagram** if necessary.

### 2️⃣ Write Pseudocode:

- Outline the feature’s **logical structure**.
- Describe **API calls, state updates, and UI interactions**.

### 3️⃣ Implement the Feature:

- Write **clean, modular TypeScript code** with proper **naming conventions**.
- Use **React hooks** effectively for state management.

### 4️⃣ Test Thoroughly:

- Ensure **all edge cases** are handled.
- Write **unit tests** for **utility functions**.
- Use **React Testing Library** for **component testing**.

### 5️⃣ Deploy & Monitor:

- Check **Webflow integration** and **API response handling**.
- Log **errors & warnings** for better debugging.
- Ensure the feature is **optimized for production**.

---

# 6️⃣ Writing Clean & Informative Comments (Minimized Version)

Follow **structured commenting** to maintain readability and consistency across the **Webflow Hybrid App** codebase.

### 🔹 General Commenting Guidelines

- Use **JSDoc format** for functions (`/** */`).
- Explain **why** rather than **what** unless logic is complex.
- High-level **module comments** at the top of files.
- Short **inline comments** only when necessary.

### 🔹 Commenting Examples

✅ **API Routes (Next.js)**

```typescript
/**
 * Handles Webflow OAuth authorization.
 * - Redirects user to Webflow for authentication.
 *
 * @param {Request} request - Next.js request.
 * @returns {Response} Redirects to Webflow's OAuth page.
 */
export async function GET(request: Request) {
  const authorizeUrl = WebflowClient.authorizeURL({ ... });
  return NextResponse.redirect(authorizeUrl);
}


# ✅ React Components
/**
 * Dashboard Component - Displays authenticated user's sites.
 *
 * @param {DashboardProps} props - User, sites, loading states.
 */
export function Dashboard({ user, sites, isLoading }: DashboardProps) {
  return <Container>{isLoading ? "Loading..." : user.firstName}</Container>;
}

# ✅ Hooks (Custom Hooks)
/**
 * Manages authentication state and session token.
 * - Exchanges ID token with Webflow API.
 */
export function useAuth() { ... }

# ✅ Utility Functions
/**
 * Retrieves Webflow site access token.
 *
 * @param {string} siteId - Webflow site ID.
 * @returns {Promise<string>} Access token.
 */
export async function getAccessTokenFromSiteId(siteId: string) { ... }


### 🔹 Summary

| **Type**         | **Comment Style**                                   |
|-----------------|---------------------------------------------------|
| **API Routes**   | Briefly describe logic & request flow             |
| **Components**   | Props & purpose                                   |
| **Hooks**        | Behavior & caching                                |
| **Utilities**    | Parameters & return values                        |
| **Design System**| Styling, component architecture & accessibility  |
| **Integration**  | Compatibility, imports & interactions            |

```

### 📂 Project Directory Structure

Below is the **directory structure** of the Webflow Hybrid App:

```plaintext
└── gaurang-workshore-hybrid-app-starter/
    ├── README.md
    ├── package.json
    ├── data-client/
    │   ├── README.md
    │   ├── next.config.mjs
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.mjs
    │   ├── tailwind.config.ts
    │   ├── tsconfig.json
    │   ├── tsconfig.server.json
    │   ├── .eslintrc.json
    │   ├── .gitignore
    │   ├── app/
    │   │   ├── globals.css
    │   │   ├── layout.tsx
    │   │   ├── page.tsx
    │   │   ├── route.ts
    │   │   ├── api/
    │   │   │   ├── auth/
    │   │   │   │   ├── authorize/
    │   │   │   │   │   └── route.ts
    │   │   │   │   ├── callback/
    │   │   │   │   │   └── route.ts
    │   │   │   │   └── token/
    │   │   │   │       └── route.ts
    │   │   │   ├── custom-code/
    │   │   │   │   ├── apply/
    │   │   │   │   │   └── route.ts
    │   │   │   │   ├── register/
    │   │   │   │   │   └── route.ts
    │   │   │   │   └── status/
    │   │   │   │       └── route.ts
    │   │   │   ├── dev/
    │   │   │   │   └── clear/
    │   │   │   │       └── route.ts
    │   │   │   └── sites/
    │   │   │       └── route.ts
    │   │   ├── fonts/
    │   │   │   ├── GeistMonoVF.woff
    │   │   │   └── GeistVF.woff
    │   │   └── lib/
    │   │       ├── controllers/
    │   │       │   └── scriptControllers.ts
    │   │       ├── services/
    │   │       │   ├── CacheService.ts
    │   │       │   └── WebflowRateLimiter.ts
    │   │       └── utils/
    │   │           ├── database.ts
    │   │           ├── jwt.ts
    │   │           └── ngrokManager.ts
    │   ├── public/
    │   │   └── authComplete.html
    │   └── scripts/
    │       ├── dev.ts
    │       └── tunnel.ts
    └── designer-extension/
        ├── README.md
        ├── components.json
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── tailwind.config.js
        ├── tsconfig.app.json
        ├── tsconfig.json
        ├── tsconfig.node.json
        ├── vite.config.ts
        ├── webflow.json
        ├── .env.development
        ├── .env.prod
        ├── .gitignore
        ├── bundle/
        │   ├── development/
        │   │   ├── bundle_2024-09-18_14-10-44.zip
        │   └── prod/
        │       └── bundle_2024-09-18_14-10-56.zip
        ├── public/
        ├── src/
        │   ├── App.css
        │   ├── App.tsx
        │   ├── index.css
        │   ├── main.tsx
        │   ├── types.d.ts
        │   ├── vite-env.d.ts
        │   ├── components/
        │   │   ├── AppLayout.tsx
        │   │   ├── AuthScreen.tsx
        │   │   ├── Breadcrumbs.tsx
        │   │   ├── Dashboard.tsx
        │   │   ├── DataTable.tsx
        │   │   ├── DevTools.tsx
        │   │   ├── LoadingStates.tsx
        │   │   ├── Navigation.tsx
        │   │   ├── Sidebar.tsx
        │   │   ├── theme-provider.tsx
        │   │   ├── theme.ts
        │   │   ├── CustomCode/
        │   │   │   ├── CustomCodeDashboard.tsx
        │   │   │   ├── index.ts
        │   │   │   ├── ScriptRegistration.tsx
        │   │   │   ├── ScriptsList.tsx
        │   │   │   └── ApplicationTabs/
        │   │   │       ├── PagesTab.tsx
        │   │   │       └── SiteTab.tsx
        │   │   ├── Elements/
        │   │   │   ├── ElementsDashboard.tsx
        │   │   │   ├── ElementTreeToolbar.tsx
        │   │   │   └── ElementTreeViewer.tsx
        │   │   └── ui/
        │   │       ├── alert.tsx
        │   │       ├── breadcrumb.tsx
        │   │       ├── button.tsx
        │   │       ├── card.tsx
        │   │       ├── checkbox.tsx
        │   │       ├── dropdown-menu.tsx
        │   │       ├── input.tsx
        │   │       ├── radio-group.tsx
        │   │       ├── separator.tsx
        │   │       ├── sheet.tsx
        │   │       ├── sidebar.tsx
        │   │       ├── skeleton.tsx
        │   │       ├── table.tsx
        │   │       ├── tabs.tsx
        │   │       └── tooltip.tsx
        │   ├── hooks/
        │   │   ├── use-mobile.tsx
        │   │   ├── useAuth.ts
        │   │   ├── useDevTools.ts
        │   │   ├── useElementMapper.ts
        │   │   ├── usePages.ts
        │   │   ├── useSites.ts
        │   │   └── useCustomCode/
        │   │       ├── index.ts
        │   │       ├── useApplicationStatus.ts
        │   │       ├── useScriptRegistration.ts
        │   │       ├── useScriptSelection.ts
        │   │       └── useScriptVersions.ts
        │   ├── lib/
        │   │   └── utils.ts
        │   ├── services/
        │   │   └── customCode/
        │   │       ├── api.ts
        │   │       └── index.ts
        │   └── types/
        │       ├── element-mapping.ts
        │       └── types.ts
        └── .vite/
            └── deps_temp_20a04d2d/
                └── package.json
```
