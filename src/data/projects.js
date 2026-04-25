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
    tagline: 'A public safety data API for Canadian developers, centralizing alerts, recalls, and incidents from official government sources behind a single REST interface.',
    problem:
      'Public safety information in Canada is scattered across multiple federal and provincial agencies: Environment Canada, Health Canada, CFIA, CCCS, WSIB - each with its own data format and access pattern. Developers building civic apps or dashboards have to scrape, normalize, and stitch these sources together themselves.',
    solution:
      'Built a REST API that centralizes Canadian public safety data behind a single consistent interface with standardized schemas, pagination, and filtering. The weather alerts pipeline is live and serves as the reference implementation for the remaining content types.',
    impact:
      'Demonstrates backend API design, scheduled data pipelines, deduplication strategy, rate limiting, and a clean separation of concerns across a Node/Express/MongoDB stack - applied to a real public-sector data problem.',
    techStack: ['Node.js', 'Express', 'MongoDB', 'node-cron', 'express-rate-limit'],
    category: 'Backend',
    githubUrl: 'https://github.com/seniork7/safepoint',
    backendUrl: 'https://api.safepoint.kevonsenior.com/api/v1',
    imageUrl: '',
    featured: false,

    // Case study
    overview:
      'Safepoint is a public safety data API for Canadian developers. Public safety information in Canada is fragmented across agencies - each with different formats, update schedules, and access patterns. Safepoint normalizes this behind one REST API with consistent schemas, pagination, and filtering. The weather alerts pipeline is fully operational, pulling from Environment Canada on an hourly cron schedule and persisting to MongoDB with deduplication. It serves as the reference implementation for the remaining seven content type pipelines still in progress.',

    audiences: [
      {
        role: 'API Consumers',
        description:
          'Developers building civic apps, safety dashboards, community tools, or content platforms who need structured access to Canadian public safety data without scraping and normalizing government sources themselves.',
      },
    ],

    architectureOverview:
      'Single-layer REST API: Express routes -> middleware (rate limiter, paginate) -> controllers -> MongoDB. Data is populated by a separate pipeline layer - cron-scheduled fetchers pull from government APIs, transform the response, and upsert into MongoDB. The API layer reads from the database and returns a standardized pagination envelope. These two responsibilities are intentionally decoupled: the pipeline writes data on a schedule, the API reads and serves it on demand.',

    keyFeatures: [
      {
        title: 'Weather Alerts Pipeline',
        description:
          'Fetches real-time weather data from Environment Canada (api.weather.gc.ca) for all Ontario cities using a wildcard filter. Transforms raw API responses into a normalized Mongoose schema - including current conditions, active warnings, and forecast summaries - then upserts into MongoDB. An Ontario cities map is cached in memory after the first fetch to avoid redundant upstream calls.',
      },
      {
        title: 'Hourly Cron Scheduling + Startup Fetch',
        description:
          'node-cron runs the weather pipeline every hour (0 * * * *). An additional fetch fires on server startup so the database is never stale on a fresh boot or redeployment. The cron and startup logic share the same saveWeatherAlerts() function with a mode flag to distinguish context in logs.',
      },
      {
        title: 'bulkWrite Upsert for Deduplication',
        description:
          'Each incoming record is matched by its sourceID. If it already exists in MongoDB, the document is updated in place; if not, it is inserted. This means the pipeline is fully idempotent - running it multiple times never creates duplicate records, and stale records are updated rather than re-inserted.',
      },
      {
        title: 'Paginate Middleware',
        description:
          'A shared paginate middleware normalizes limit, offset, and location query parameters before they reach any controller. Controllers read from req.limit, req.offset, and req.location rather than parsing req.query directly. Every response returns the same envelope: previous, next, total, category, data, and a source disclaimer.',
      },
      {
        title: 'Rate Limiting',
        description:
          '100 requests per 15-minute window enforced globally via express-rate-limit. Applied once at the app level so all routes inherit it automatically.',
      },
    ],

    architectureDecisions: [
      {
        decision: 'Endpoints organized by content type with category as a query parameter',
        reason:
          'The URL space stays flat and predictable (/v1/alerts, /v1/recalls, /v1/tips) while category-level filtering is handled via query string (?category=weather). This avoids deeply nested routes and makes it easy to add new categories under an existing content type without touching the routing layer.',
      },
      {
        decision: 'Decoupled pipeline layer from API layer',
        reason:
          'The cron fetchers and the API controllers have no runtime dependency on each other. The pipeline writes to MongoDB on a schedule; the API reads from MongoDB on demand. This means either layer can be changed, paused, or replaced independently - and if an upstream government API goes down, the API keeps serving the last successful dataset without any failure cascading to consumers.',
      },
      {
        decision: 'bulkWrite upsert over insert-or-update per document',
        reason:
          'A single bulkWrite with updateOne operations processes the entire batch in one database round trip, regardless of set size. Doing individual upserts in a loop would issue one query per record - acceptable at small scale, but a design choice that would not survive a large dataset. bulkWrite is also atomic at the operation level, which is sufficient for this use case.',
      },
      {
        decision: 'In-memory caching for the Ontario cities map',
        reason:
          'The cities reference list is fetched once from Environment Canada and stored in module scope. Subsequent pipeline runs skip the upstream call entirely. The data changes infrequently enough that a server restart is an acceptable cache invalidation strategy at this stage.',
      },
    ],

    tradeoffs: [
      {
        issue: 'Weather pipeline is Ontario-only',
        detail:
          'The current implementation filters for Ontario regions using the on* wildcard identifier. Other provinces require their own identifier patterns and are not yet handled.',
        fix: 'Add a province configuration layer that maps province codes to their Environment Canada identifier patterns and runs fetches per province.',
      },
      {
        issue: 'No API authentication',
        detail:
          'The API is publicly accessible with no key or token requirement. Rate limiting provides some abuse protection, but there is no way to attribute usage per consumer or revoke access.',
        fix: 'Add API key issuance and a middleware that validates the key on each request. Store keys in MongoDB with usage metadata.',
      },
      {
        issue: 'Remaining content types are stubs',
        detail:
          'Routes exist for tips, resources, and recalls, but their pipelines are not yet built. Requests to those endpoints return empty or placeholder responses.',
        fix: 'Follow the weather alerts pattern to build out each pipeline: fetcher -> transformer -> schema -> upsert -> cron. The architecture is already in place.',
      },
    ],

    demonstrates: [
      'REST API design with a flat, content-type-based URL structure',
      'Scheduled data pipelines with node-cron (cron + startup fetch pattern)',
      'MongoDB bulkWrite upsert for idempotent, deduplication-safe writes',
      'Middleware chain design (rate limiter -> paginate -> controller)',
      'Standardized pagination envelope across all endpoints',
      'Decoupled pipeline and API layers for independent operation',
      'In-memory caching for upstream reference data',
      'Graceful error handling and null filtering across async pipeline stages',
    ],

    whyItMatters:
      'Most API portfolio projects wrap an existing public API and call it a day. Safepoint inverts that - it is the API, built to solve a real gap: Canadian public safety data has no unified access layer. The technical decisions here reflect production thinking: idempotent writes, decoupled pipeline, rate limiting, and a middleware chain that keeps controllers clean. The weather pipeline is live and running. The architecture is designed so the remaining content types follow the same pattern without restructuring anything.',
  },
]

export default projects
