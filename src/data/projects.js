const projects = [
  {
    id: 1,
    slug: 'public-safety',
    title: 'Public Safety',
    tagline: 'A full-stack web application for a community public safety organization with protected admin dashboard.',
    problem:
      'Before this application, volunteer intake ran on emails and spreadsheets. There was no central place for the public to discover programs, no digital application flow, and no way for staff to track applicants or manage statuses without manual effort.',
    solution:
      'Built a full-stack web application with two distinct sides: a public single-page site where community members can browse safety programs and submit volunteer applications, and a protected admin dashboard where staff review applications, update statuses, and view analytics.',
    impact:
      'Demonstrates end-to-end product thinking, authentication, role-based access, data flow, and a real user workflow across a complete React + Node + MongoDB stack.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT', 'bcrypt', 'Recharts'],
    category: 'Full-Stack',
    liveUrl: 'https://public-safety.kevonsenior.com/',
    githubUrl: 'https://github.com/seniork7/public_safety',
    backendUrl: 'https://public-safety.onrender.com/',
    imageUrl: '/images/public_safety.png',
    youtubeEmbed: 'https://www.youtube.com/embed/8eL3vdAlNCA',
    featured: true,

    // Case study
    overview:
      'Public Safety is a full-stack volunteer management application built for a public safety non-profit. It serves two completely different audiences from one codebase: the general public, who can learn about the organization and submit volunteer applications; and internal administrators, who manage those applications through a protected dashboard. I built everything end-to-end; architecture, REST API, database schema, auth system, analytics, and UI.',

    audiences: [
      {
        role: 'Community Members',
        description:
          'Visitors who want to learn about the organization\'s safety programs or apply to volunteer. They interact with a public single-page site by scrolling through Home, About, Services, Join Us, and Contact sections. The volunteer application form captures user info and stores the submission in MongoDB.',
      },
      {
        role: 'Organization Admins',
        description:
          'Staff who log into a protected dashboard at /admin/dashboard. They can view all volunteer applications, click into any one for full details, approve or reject applicants, and view analytics charts. A Demo_Admin role is available for portfolio access; it can see everything but cannot mutate data.',
      },
    ],

    architectureOverview:
      'Three-tier architecture: React frontend → Node/Express REST API → MongoDB. The frontend and API are deployed on separate subdomains, requiring precise CORS configuration. All admin routes run through a verifyAdmin middleware that reads a JWT from an httpOnly cookie, verifies it, and attaches the decoded user to the request so every controller can trust req.admin without re-verifying anything.',

    keyFeatures: [
      {
        title: 'Volunteer Application Form',
        description:
          'An 11-field public form with client-side validation, province/city dropdowns (Canadian regions), and a required terms checkbox. Invalid fields are flagged by name in an array and marked with a red ring. Submissions POST to /api/volunteers and are stored in MongoDB with a default status of "pending".',
      },
      {
        title: 'Cookie-Based JWT Authentication',
        description:
          'Admin login verifies credentials with bcrypt.compare(), creates a JWT signed with a secret, and stores it in an httpOnly cookie. JavaScript cannot read httpOnly cookies, which protects the token from XSS attacks. On page reload, AuthContext calls /api/admin/check-auth which verifies the cookie and restores the session without prompting the user to log in again.',
      },
      {
        title: 'Application Status Management',
        description:
          'Admins can approve or reject any application. Authorization is checked twice: the frontend checks user.role and shows a popup if the demo account tries to take action; the backend controller independently checks req.admin.role. The frontend state updates immutably after a successful PATCH, so the card reflects the new status instantly without re-fetching.',
      },
      {
        title: 'Analytics Dashboard (Reports)',
        description:
          'Four Recharts v3 charts, status donut, applications over time, role distribution, and province breakdown with status filters and date range inputs. All filtering runs client-side using a useMemo chain: raw data → filtered array → four chart datasets. Changing a filter recomputes only what depends on it, not all charts at once.',
      },
      {
        title: 'Admin Settings with Role Restrictions',
        description:
          'Real admins can edit their display name and change their password. Demo_Admin accounts are fully read-only; inputs are disabled and a notice explains why. When a name change is saved, the parent component calls login({ ...user, ...newData }) to merge the update into React Context, so the dashboard header reflects the new name instantly without a page reload.',
      },
      {
        title: 'Dynamic Safety Tip Pages',
        description:
          'Shareable standalone pages at /safety-tip/:id with article content, a sticky sidebar, and copy/share functionality. Built as separate React Router routes so each alert has its own URL.',
      },
    ],

    authHighlight: {
      summary:
        'The JWT is stored in an httpOnly cookie, not localStorage. This means JavaScript on the page cannot read the token. A successful XSS injection cannot steal it because the cookie is invisible to scripts. The browser sends it automatically on every request to the same domain.',
      steps: [
        'Admin submits email + password → POST /api/admin/login',
        'Server finds admin by email, runs bcrypt.compare() to verify the password hash',
        'On success, signs a JWT with { id, role, fName, lName }, expiry',
        'JWT is set as an httpOnly cookie',
        'Response body returns { role, fName, lName, email, createdAt } — no token in JSON',
        'Frontend calls login(response) to populate AuthContext with the user object',
        'On page reload, AuthContext fires GET /api/admin/check-auth, the cookie is sent automatically and session is restored',
        'Every protected request uses credentials: "include" — the cookie travels with it',
        'verifyAdmin middleware reads req.cookies.admin_token, calls jwt.verify(), attaches req.admin',
        'If the JWT is invalid or expired → 401 → adminFetch throws "Unauthorized!" → redirect to /admin/login',
      ],
      twoLayerAuth:
        'For state-changing actions (approve/reject), authorization is checked at two levels. The frontend checks user.role before even making the API call — if the demo account tries, it gets a friendly popup and the request never fires. But the frontend check can be bypassed by hitting the API directly. The backend\'s updateApplication controller checks req.admin.role independently. That\'s the real enforcement. Hiding buttons is UX; verifying on the server is security.',
    },

    architectureDecisions: [
      {
        decision: 'httpOnly cookies for JWT storage instead of localStorage',
        reason:
          'LocalStorage is accessible to any JavaScript on the page. If an XSS vulnerability exists, an attacker\'s injected script can read the token from localStorage and exfiltrate it. httpOnly cookies are invisible to JavaScript — the browser holds them and sends them automatically, but no script can read them. The tradeoff is that CORS must be precisely configured: credentials: true requires a specific origin, not a wildcard, and the cookie must have the correct domain and sameSite settings for cross-origin use.',
      },
      {
        decision: 'Two-layer authorization (frontend UX + backend enforcement)',
        reason:
          'The frontend checks the user role before making a state-changing API call — this provides a good user experience by showing a clear popup instead of a silent failure. The backend\'s updateApplication controller checks req.admin.role independently. These are two separate concerns on purpose: the frontend check is about experience, the backend check is about security.',
      },
      {
        decision: 'React Context API for auth state instead of Redux',
        reason:
          'The app has exactly one piece of truly global state: who is logged in. Everything else — dashboard data, form state, filter values — is local to the component that owns it. Adding Redux for this would create significant boilerplate for no real benefit. If the app grew to where multiple disconnected parts needed shared state, Zustand will be add.',
      },
      {
        decision: 'Nested routes with React Router Outlet for the admin dashboard',
        reason:
          'The dashboard sidebar and header render once and stay fixed. Only the center content changes between Dashboard, Reports, Settings, and Safety Alerts. The Outlet pattern in React Router v6 lets AdminDashboard.jsx define the layout shell once and render the active child route in the center slot. This is cleaner than conditionally rendering sections based on a state variable.',
      },
      {
        decision: 'useMemo for all derived chart data in Reports',
        reason:
          'The Reports section derives four different datasets from the same filtered array. Without memoization, every re-render — even ones triggered by an unrelated UI state change — would recompute all four datasets on every pass. useMemo ensures each dataset only recomputes when its specific dependencies change, which in practice means only when the filters or the underlying application data actually changes.',
      },
      {
        decision: 'Decoupled frontend and backend on separate subdomains',
        reason:
          'Frontend and backend are deployed independently — the API is not coupled to serving the React build. This means either side can be redeployed without touching the other, and they can scale independently. The tradeoff is the cross-origin cookie configuration: the CORS origin must be set to the frontend\'s exact domain, and the cookie must be configured to work across subdomains.',
      },
    ],

    tradeoffs: [
      {
        issue: 'No server-side input validation',
        detail:
          'The public form endpoints call Model.create(req.body) directly. The only server-side protection is Mongoose schema required flags. Malformed data, injection attempts, or oversized payloads can reach the database.',
        fix: 'Add express-validator middleware to each route — check field types, max lengths, and email format before the document is created.',
      },
      {
        issue: 'API URL is hardcoded',
        detail:
          'The backend URL lives in api_url.js as a plain string. Switching environments requires a code change rather than an environment variable swap.',
        fix: 'Use import.meta.env.VITE_API_URL defined in .env.local for development and .env.production for deployment.',
      },
      {
        issue: 'Admin Notes are UI-only — not persisted',
        detail:
          'The application detail panel has an Admin Notes textarea with a Save button. There is no API call behind it and no database field for it. Admins clicking Save are silently doing nothing.',
        fix: 'Add a notes field to the volunteer schema, a PATCH endpoint to update it, and wire the button to that endpoint.',
      },
      {
        issue: 'Dashboard stats are computed in-memory',
        detail:
          'getDashboardData fetches every application document, then counts statuses using JavaScript filter() on the server. This gets slow as the collection grows.',
        fix: 'Use MongoDB aggregation ($group, $count) to compute stats in the database. Add pagination (skip/limit) to the applications list. Index the status and createdAt fields.',
      },
      {
        issue: 'Artificial 3-second delay on form submission',
        detail:
          'JoinUs.jsx has an await new Promise(resolve => setTimeout(resolve, 3000)) before the API call — a development artifact that was never removed. On a fast connection it adds 3 seconds of unnecessary wait.',
        fix: 'Remove it. The real loading state from the fetch call provides sufficient feedback.',
      },
    ],

    demonstrates: [
      'Full-stack architecture with decoupled frontend and backend',
      'httpOnly cookie JWT auth — XSS-resistant alternative to localStorage',
      'Two-layer role-based authorization (UX + enforcement)',
      'React Context API for global session state without Redux',
      'Nested routes with Outlet pattern (React Router v6)',
      'useMemo for derived computations — chart filtering without re-fetching',
      'REST API design with Express middleware chain (route → middleware → controller)',
      'MongoDB schema design and Mongoose ODM',
      'Recharts v3 integration with per-entry color pattern',
      'Responsive, accessible UI with Tailwind CSS v4',
    ],

    whyItMatters:
      "Most civic tools look like they were built in 2010 and feel like it too. I wanted to prove that a public-sector application can be well-designed, accessible, and engineered properly. More importantly, this project demonstrates something a portfolio of landing pages can't: the ability to think through a complete user workflow from both sides — the person submitting an application and the person reviewing it — and build a working, deployed system that handles auth, permissions, data, and UI correctly.",
  },
  {
    id: 2,
    slug: 'allmart',
    title: 'AllMart',
    tagline: 'Accessible grocery shopping with voice search.',
    problem:
      'Standard e-commerce demos are built for sighted, mouse-first users. Voice search and accessibility are often afterthoughts.',
    solution:
      'Built a demo grocery web app with a custom REST API and voice search powered by the Web Speech API, making the product browsable hands-free.',
    impact:
      'Shows API design thinking, accessibility awareness, and the ability to integrate native browser APIs for real UX value.',
    techStack: ['Node.js', 'JavaScript', 'Tailwind CSS', 'REST API', 'Web Speech API'],
    category: 'Full-Stack',
    liveUrl: 'https://seniork7.github.io/allmart/',
    githubUrl: 'https://github.com/seniork7/allmart',
    backendUrl: 'https://allmart-groceries-api.onrender.com/',
    imageUrl: '/images/allmart.png',
    youtubeEmbed: 'https://www.youtube.com/embed/CNSlpsemssg',
    featured: false,

    // Case study content
    overview:
      'AllMart is a full-stack demo grocery store application I built to explore two things: custom API design and accessible UI patterns. Most e-commerce demos pull from a public API (Fake Store, etc.) and call it a day. I wanted to design my own data layer, then build a frontend that could serve a wider range of users — including those who prefer or require voice interaction.',
    whyItMatters:
      "Accessibility is often treated as a checklist item — add alt text, done. I wanted to push further and ask: what does it actually feel like to use this if you're not relying on a mouse? The voice search feature forced me to think about user states (listening, processing, no results, error), feedback design, and fallback behavior.",
    keyFeatures: [
      {
        title: 'Custom Built REST API',
        description:
          'Product data is served from a Node.js/Express API I designed myself. Endpoints support filtering by category, search queries, and individual product lookups.',
      },
      {
        title: 'Voice Search',
        description:
          "Integrated the browser's native Web Speech API to let users search products by speaking. No third-party service — zero cost, zero data sent off-device. Handles listening states, transcription, and error fallback.",
      },
      {
        title: 'Dynamic Product Rendering',
        description:
          'Products render from a local JSON data source with no page reloads. Filtering and searching update the UI in real time without a framework — built with vanilla JavaScript DOM manipulation.',
      },
      {
        title: 'Wishlist',
        description:
          'Users can save up to 5 products to a wishlist persisted in localStorage. Items survive page refreshes, can be removed individually, and trigger browser notifications on add or remove.',
      },
    ],
    architectureDecisions: [
      {
        decision: 'Vanilla JavaScript over a framework',
        reason:
          "I intentionally didn't use React here. I wanted to demonstrate that I understand DOM manipulation, event delegation, and state management concepts from first principles — not just through a framework's abstractions. Any team that sees this knows I can work outside the React bubble.",
      },
      {
        decision: 'Web Speech API over a third-party voice service',
        reason:
          "Browser-native voice recognition is free, doesn't require an API key, and doesn't send audio to an external server. For a grocery app, that's the right call — and it was an interesting technical constraint to design around (browser support, HTTPS requirement, permission handling).",
      },
      {
        decision: 'Separation of data layer from presentation',
        reason:
          'The backend serves product data through a dedicated REST API, and the frontend is architected to consume it through a configurable endpoint (config.js). In the current deployment, the frontend fetches from a bundled local JSON file. The backend could change completely (switch to a database, add auth, add pagination) without touching the frontend logic.',
      },
    ],
  },
  {
    id: 3,
    slug: 'pokehub',
    title: 'PokéHub',
    tagline: 'A Pokemon mnagement app.',
    problem:
      'Capstone project: needed to demonstrate core frontend fundamentals — authentication, external API integration, and dynamic UI state — in a single cohesive application.',
    solution:
      'Built a Pokémon team manager where users sign up, log in, pull data from the PokéAPI, and build and manage their team roster with a responsive, interactive UI.',
    impact:
      'Proves foundational frontend skills: state management, API consumption, user auth, event handling, and responsive design — all working together.',
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Flowbite', 'Font Awesome', 'PokéAPI'],
    category: 'Frontend',
    liveUrl: 'https://seniork7.github.io/pokehub/',
    githubUrl: 'https://github.com/seniork7/pokehub',
    imageUrl: '/images/pokehub.png',
    youtubeEmbed: 'https://www.youtube-nocookie.com/embed/u_7KDlBKgQg?si=McN1PKOnr-srT6Fr',
    featured: false,

    // Case study content
    overview:
      'PokéHub was my Interactive Media Design capstone at Algonquin College. The brief was open-ended: build a frontend application that demonstrates your command of the core skills — auth, API consumption, dynamic UI, and responsive design. I chose to build a Pokémon team builder because it gave me a rich dataset to work with (PokéAPI), a clear user flow to design around, and enough complexity to stretch my skills without the project scope being vague.',
    whyItMatters:
      "The PokéAPI is used in a lot of learning projects — but most stop at fetching and displaying data. I pushed further: users have persistent accounts, they build a team that's saved to their profile, the UI updates reactively as they add and remove Pokémon, and the whole thing works across screen sizes. For a capstone built without React or a backend, that scope required careful state management and clean event handling.",
    keyFeatures: [
      {
        title: 'User Authentication',
        description:
          'Custom sign-up and login flow with localStorage persistence. Credentials and Pokémon collection are stored in the browser so sessions survive page refreshes.',
      },
      {
        title: 'PokéAPI Integration',
        description:
          'Fetches Pokémon data including name, types, sprites, height, weight, and moves from the public PokéAPI. Supports paginated browsing through 1025+ Pokémon with a "Load More" pattern. Handles loading states and fetch errors.',
      },
      {
        title: 'Collection Management',
        description:
          'Users browse a paginated Pokédex, catch Pokémon (no size cap), and manage their collection from a dedicated Pokéland page. Duplicates are prevented. Caught Pokémon can be trained or released, with state persisted across sessions.',
      },
      {
        title: 'Interactive Carousel UI',
        description:
          'Caught Pokémon are displayed in a carousel (powered by Flowbite) with left/right navigation. Each card surfaces the sprite, stats, and action buttons for train, release, and view details.',
      },
      {
        title: 'Fully Responsive',
        description:
          'Designed and tested across mobile, tablet, and desktop using Tailwind responsive classes. Layout and carousel dimensions adapt at the md breakpoint.',
      },
    ],
    architectureDecisions: [
      {
        decision: 'localStorage for auth and data persistence',
        reason:
          "Without a backend, localStorage was the right scope for this project. User credentials, caught Pokémon, and training state are each stored under separate keys (userLogin, troop, trainingTroop) and loaded on every page init. It demonstrates the offline-first pattern without overengineering a capstone project.",
      },
      {
        decision: 'Flowbite for UI components, vanilla JS for logic',
        reason:
          "I used Flowbite (built on Tailwind) for the carousel and dropdown components — the parts where reinventing the wheel would have added complexity with no learning payoff. All application logic (auth, API calls, state, rendering) is written in vanilla JS. That split kept the focus on demonstrating JS fundamentals while still shipping a polished UI.",
      },
      {
        decision: 'Single script file over premature modularization',
        reason:
          "All frontend logic lives in one script.js. For a capstone with one page of core logic, splitting into auth.js, api.js, and ui.js would have been structure for structure's sake. The file is organized by concern within it — init, auth, fetch, render, state — which is enough at this scale.",
      },
    ],
  },
]

export default projects
