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
    imageUrl2: '/images/public_safety2.png',
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
      'Three-tier architecture: React frontend -> Node/Express REST API -> MongoDB. The frontend and API are deployed on separate subdomains, requiring precise CORS configuration. All admin routes run through a verifyAdmin middleware that reads a JWT from an httpOnly cookie, verifies it, and attaches the decoded user to the request so every controller can trust req.admin without re-verifying anything.',

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
          'Four Recharts v3 charts, status donut, applications over time, role distribution, and province breakdown with status filters and date range inputs. All filtering runs client-side using a useMemo chain: raw data -> filtered array -> four chart datasets. Changing a filter recomputes only what depends on it, not all charts at once.',
      },
      {
        title: 'Admin Settings with Role Restrictions',
        description:
          'Real admins can edit their display name and change their password. Demo_Admin accounts are fully read-only; inputs are disabled and a notice explains why. When a name change is saved, the parent component calls login({ ...user, ...newData }) to merge the update into React Context, so the dashboard header reflects the new name instantly without a page reload.',
      },
      {
        title: 'Admin Notes',
        description:
          'Admins can attach persistent notes to any volunteer application directly from the side panel. Notes are stored as a subdocument array on the application document in MongoDB, each recording the note text, the author\'s name, and a timestamp. The panel loads all existing notes automatically when an application is opened and supports adding new notes, editing existing ones inline, and deleting them - with all three operations backed by API endpoints (POST, PATCH, DELETE) and reflected in the UI instantly without re-fetching the full application list.',
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
        'Admin submits email + password -> POST /api/admin/login',
        'Server finds admin by email, runs bcrypt.compare() to verify the password hash',
        'On success, signs a JWT with { id, role, fName, lName }, expiry',
        'JWT is set as an httpOnly cookie',
        'Response body returns { role, fName, lName, email, createdAt } - no token in JSON',
        'Frontend calls login(response) to populate AuthContext with the user object',
        'On page reload, AuthContext fires GET /api/admin/check-auth, the cookie is sent automatically and session is restored',
        'Every protected request uses credentials: "include" - the cookie travels with it',
        'verifyAdmin middleware reads req.cookies.admin_token, calls jwt.verify(), attaches req.admin',
        'If the JWT is invalid or expired -> 401 -> adminFetch throws "Unauthorized!" -> redirect to /admin/login',
      ],
      twoLayerAuth:
        'For state-changing actions (approve/reject), authorization is checked at two levels. The frontend checks user.role before even making the API call - if the demo account tries, it gets a friendly popup and the request never fires. But the frontend check can be bypassed by hitting the API directly. The backend\'s updateApplication controller checks req.admin.role independently. That\'s the real enforcement. Hiding buttons is UX; verifying on the server is security.',
    },

    architectureDecisions: [
      {
        decision: 'httpOnly cookies for JWT storage instead of localStorage',
        reason:
          'LocalStorage is accessible to any JavaScript on the page. If an XSS vulnerability exists, an attacker\'s injected script can read the token from localStorage and exfiltrate it. httpOnly cookies are invisible to JavaScript - the browser holds them and sends them automatically, but no script can read them. The tradeoff is that CORS must be precisely configured: credentials: true requires a specific origin, not a wildcard, and the cookie must have the correct domain and sameSite settings for cross-origin use.',
      },
      {
        decision: 'Two-layer authorization (frontend UX + backend enforcement)',
        reason:
          'The frontend checks the user role before making a state-changing API call - this provides a good user experience by showing a clear popup instead of a silent failure. The backend\'s updateApplication controller checks req.admin.role independently. These are two separate concerns on purpose: the frontend check is about experience, the backend check is about security.',
      },
      {
        decision: 'React Context API for auth state instead of Redux',
        reason:
          'The app has exactly one piece of truly global state: who is logged in. Everything else - dashboard data, form state, filter values - is local to the component that owns it. Adding Redux for this would create significant boilerplate for no real benefit. If the app grew to where multiple disconnected parts needed shared state, Zustand will be add.',
      },
      {
        decision: 'Nested routes with React Router Outlet for the admin dashboard',
        reason:
          'The dashboard sidebar and header render once and stay fixed. Only the center content changes between Dashboard, Reports, Settings, and Safety Alerts. The Outlet pattern in React Router v6 lets AdminDashboard.jsx define the layout shell once and render the active child route in the center slot. This is cleaner than conditionally rendering sections based on a state variable.',
      },
      {
        decision: 'useMemo for all derived chart data in Reports',
        reason:
          'The Reports section derives four different datasets from the same filtered array. Without memoization, every re-render - even ones triggered by an unrelated UI state change - would recompute all four datasets on every pass. useMemo ensures each dataset only recomputes when its specific dependencies change, which in practice means only when the filters or the underlying application data actually changes.',
      },
      {
        decision: 'Decoupled frontend and backend on separate subdomains',
        reason:
          'Frontend and backend are deployed independently - the API is not coupled to serving the React build. This means either side can be redeployed without touching the other, and they can scale independently. The tradeoff is the cross-origin cookie configuration: the CORS origin must be set to the frontend\'s exact domain, and the cookie must be configured to work across subdomains.',
      },
    ],

    tradeoffs: [
      {
        issue: 'No server-side input validation',
        detail:
          'The public form endpoints call Model.create(req.body) directly. The only server-side protection is Mongoose schema required flags. Malformed data, injection attempts, or oversized payloads can reach the database.',
        fix: 'Add express-validator middleware to each route - check field types, max lengths, and email format before the document is created.',
      },
      {
        issue: 'API URL is hardcoded',
        detail:
          'The backend URL lives in api_url.js as a plain string. Switching environments requires a code change rather than an environment variable swap.',
        fix: 'Use import.meta.env.VITE_API_URL defined in .env.local for development and .env.production for deployment.',
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
          'JoinUs.jsx has an await new Promise(resolve => setTimeout(resolve, 3000)) before the API call - a development artifact that was never removed. On a fast connection it adds 3 seconds of unnecessary wait.',
        fix: 'Remove it. The real loading state from the fetch call provides sufficient feedback.',
      },
    ],

    demonstrates: [
      'Full-stack architecture with decoupled frontend and backend',
      'httpOnly cookie JWT auth - XSS-resistant alternative to localStorage',
      'Two-layer role-based authorization (UX + enforcement)',
      'React Context API for global session state without Redux',
      'Nested routes with Outlet pattern (React Router v6)',
      'useMemo for derived computations - chart filtering without re-fetching',
      'REST API design with Express middleware chain (route -> middleware -> controller)',
      'MongoDB schema design and Mongoose ODM',
      'Recharts v3 integration with per-entry color pattern',
      'Responsive, accessible UI with Tailwind CSS v4',
    ],

    whyItMatters:
      "Most civic tools look like they were built in 2010 and feel like it too. I wanted to prove that a public-sector application can be well-designed, accessible, and engineered properly. More importantly, this project demonstrates something a portfolio of landing pages can't: the ability to think through a complete user workflow from both sides - the person submitting an application and the person reviewing it - and build a working, deployed system that handles auth, permissions, data, and UI correctly.",
  },
  {
    id: 2,
    slug: 'safepoint',
    title: 'SafePoint',
    tagline: 'A multi-tenant B2G platform that gives government agencies the tools to upload, manage, and expose structured public safety data through a unified REST API.',
    problem:
      'Public safety data exists, but it\'s scattered and unusable. In Canada it\'s siloed across federal and provincial agencies with no unified access layer. In Jamaica and across the Caribbean the problem is worse - agencies have no structured data infrastructure at all. Reports are handwritten, filed in spreadsheets, or buried in PDFs. Developers who want to build on this data have to scrape and normalize it themselves, and often there\'s nothing to scrape.',
    solution:
      'Built a B2G platform that solves the problem at the source. Instead of scraping data from the outside, SafePoint gives agencies the tools to upload their own data - CSV exports or manual dashboard entries - and normalizes everything into a consistent schema behind a single REST API. Agency auth, the incident pipeline, and manual input ingestion are live. CSV ingestion is in progress.',
    impact:
      'Demonstrates multi-tenant API design, JWT-based agency authentication, schema-driven validation, duplicate detection with type-aware time windows, and a clean separation between the ingestion layer and the public API - applied to a real public-sector data problem.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'Joi', 'JWT', 'Multer', 'csv-parse', 'node-cron', 'React', 'TypeScript', 'Tailwind CSS'],
    category: 'Full-Stack',
    githubUrl: 'https://github.com/seniork7/safepoint',
    backendUrl: 'https://api.safepoint.kevonsenior.com/api/v1',
    imageUrl: '',
    featured: false,

    // Case study
    overview:
      'SafePoint is a multi-tenant B2G (business-to-government) platform that lets government agencies upload their own public safety data and exposes it through a unified REST API. The problem it addresses isn\'t new: public safety data exists, but it\'s fragmented and impossible to work with programmatically. In Canada, data is siloed across agencies. In Jamaica and across the Caribbean, many agencies have no structured data infrastructure at all. SafePoint solves this at the source - giving agencies the tools to submit data in whatever format they have, normalizing it into a consistent schema, and serving it through a single public API that developers can actually build on. Agency auth, the incident pipeline, and manual input ingestion are live. CSV ingestion with a template system is in progress.',

    audiences: [
      {
        role: 'Agency Staff',
        description:
          'Government employees who log into a protected dashboard to submit safety data via manual input or CSV upload. Each agency operates in its own isolated data space - they can only view, update, or delete their own records.',
      },
      {
        role: 'Developers',
        description:
          'Any developer who wants structured access to public safety data. They query the public REST API with filters like country, incident type, severity, and status - without having to scrape or normalize government sources themselves.',
      },
      {
        role: 'Public',
        description:
          'Citizens who visit the public homepage to see live safety stats and situational awareness for their area.',
      },
    ],

    architectureOverview:
      'Three-layer platform: Agency dashboard (React/TypeScript) -> REST API (Express) -> MongoDB. The API has two distinct sides: a protected ingestion layer where agency staff submit data, and a public read layer where developers query it. All data lives in a shared multi-tenant MongoDB database. Every document is tagged with orgID and country at the point of ingestion - enforced server-side from the verified JWT - so agencies can only access their own records. The public API reads from the same database with no auth required.',

    keyFeatures: [
      {
        title: 'Multi-Tenant Organization Auth',
        description:
          'Organizations register and agency staff log in with credentials scoped to their org. On login, a JWT is issued containing the orgID and country, stored in an httpOnly cookie. The verifyStaff middleware validates the JWT on every protected request and attaches the decoded org context to req.staff - controllers never re-verify. All writes tag documents with orgID and country from the token, not from the request body.',
      },
      {
        title: 'Incident Schema with Duplicate Detection',
        description:
          'The incident schema enforces full enum validation on type, severity, and status fields, with compound indexes for query performance. Before any incident is saved, it\'s checked against a time window of existing records for the same type and location. The window varies by incident type - a hurricane has a 72-hour window, a robbery has 2 hours. If a potential duplicate is detected, the API returns a 409 with the existing record. Agency staff can review and force-submit if it\'s a genuine new incident.',
      },
      {
        title: 'Manual Input Pipeline',
        description:
          'Full CRUD for incidents via manual agency dashboard input: POST to create, GET list with filtering and pagination, GET single by ID, PATCH to update, DELETE to remove. All write operations are protected by verifyStaff middleware and Joi validation. Agencies can filter their own data by country, type, severity, and status.',
      },
      {
        title: 'Joi Validation Middleware',
        description:
          'Each content type has its own Joi validation middleware that runs before the controller. If the request body fails validation, the middleware returns a 400 with field-level error messages before any database operation is attempted. This keeps controllers clean and makes validation rules explicit and co-located with the route.',
      },
      {
        title: 'Pagination Middleware',
        description:
          'A shared paginate middleware normalizes limit and offset query parameters before they reach any controller. Every response returns a consistent envelope: previous, next, total, filters, data, and a source disclaimer attributing the data to the submitting agency.',
      },
      {
        title: 'CSV Ingestion Pipeline (in progress)',
        description:
          'Agencies upload CSV exports via Multer. On first upload, they map their column names to SafePoint\'s standard fields and define value mappings for enum fields (e.g. "KGN" -> Kingston). That template is saved and applied automatically to every future upload from the same agency. Unknown values that don\'t match a saved mapping are routed to an exception queue for the agency to resolve - resolutions are added to the template automatically.',
      },
    ],

    architectureDecisions: [
      {
        decision: 'B2G ingestion instead of scraping government sources',
        reason:
          'Scraping normalizes data from the outside and breaks when source formats change. SafePoint solves the problem at the source: agencies own their submissions. This makes the data more reliable, gives agencies visibility into what\'s published, and works for regions like the Caribbean where there\'s nothing structured to scrape in the first place.',
      },
      {
        decision: 'Shared multi-tenant database with server-enforced orgID tagging',
        reason:
          'All agencies share one MongoDB database. Every document is tagged with orgID and country from the JWT at write time. This means an agency cannot submit data under another org\'s ID even if they manipulate the request. Isolation is enforced at the server layer, not the database layer, which keeps the schema simple and queries fast.',
      },
      {
        decision: 'httpOnly cookie JWT for agency auth',
        reason:
          'httpOnly cookies are invisible to JavaScript, so a successful XSS injection cannot steal the session token. The JWT carries orgID and country so the server never has to look up the org context - it\'s already trusted in the verified token.',
      },
      {
        decision: 'Type-aware duplicate detection windows',
        reason:
          'A fixed time window for duplicate detection would produce false positives for long-running incidents (hurricanes, wildfires) and miss real duplicates for short events (robberies, accidents). The duplicateWindows config maps each incident type to an appropriate window. The 409 response with the existing record lets agency staff make the judgment call rather than blocking the submission outright.',
      },
      {
        decision: 'CSV template system per agency',
        reason:
          'Agencies have their own column naming conventions and enum values built up over years of internal reporting. Requiring them to reformat their exports to match SafePoint\'s schema creates adoption friction. The template system meets agencies where they are: map once, upload forever. Unknown values go to an exception queue rather than silently dropping rows.',
      },
    ],

    tradeoffs: [
      {
        issue: 'Only incidents are supported currently',
        detail:
          'The incident pipeline is the reference implementation. Other content types (fires, weather events, health alerts) are planned but their schemas and pipelines are not yet built.',
        fix: 'Follow the incident pattern to build out each content type: schema -> Joi validation -> CRUD controllers -> route. The middleware chain is already in place.',
      },
    ],

    demonstrates: [
      'Multi-tenant REST API design with shared database and server-enforced data isolation',
      'JWT auth via httpOnly cookies with org context embedded in the token',
      'Schema-driven Joi validation middleware per content type',
      'Duplicate detection with type-aware time windows and 409 conflict response',
      'Full CRUD pipeline with verifyStaff middleware protecting write operations',
      'Shared pagination middleware with consistent response envelope',
      'CSV ingestion architecture with per-agency column mapping templates',
      'B2G platform design - solving a data problem at the source rather than scraping',
    ],

    whyItMatters:
      'This project came from six years of working as a firefighter in Jamaica before transitioning to tech in Canada. On both sides I kept running into the same problem: public safety data exists but no one can use it programmatically. SafePoint is built around that real gap. The technical decisions - multi-tenancy, agency-side ingestion, duplicate detection, the CSV template system - all exist because the problem demanded them. The incident pipeline is live and the architecture is designed so every content type that follows uses the same pattern without restructuring anything.',
  },
]

export default projects
