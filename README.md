# Manasvi Sawant — Premium Developer & Freelance Portfolio

A production-ready personal portfolio, technical showcase, and client engagement website engineered for **Manasvi Sawant**, BCA (Hons.) student at Parul University specializing in web development, practical Python automation, and computer vision.

Built with React 19, TypeScript, Tailwind CSS, Express, and modern editorial design standards (WCAG AA compliant, zero-pill typography, dark/light theme switching, and live GitHub REST API integration).

---

## 🚀 Key Features

1. **Brand Identity & Hero Section**:
   - Distinctive typography hierarchy with subtle computational SVG visualization.
   - Genuine academic and technical positioning (BCA Hons., Parul University, Semester 5).
   - Configurable availability status indicator and clear CTAs.

2. **Featured Projects Gallery**:
   - Authentic project entries: *Smart Library Resource Management System*, *MedScribe (OCR prototype)*, *Developer Portfolio*, and *Python Automation Toolkit*.
   - Filter by category (Web, Python, AI/ML, Computer Vision, Automation) and search by keyword/technology.
   - Deep-dive accessible detail modals with context, solution architecture, and verified status tags.

3. **Live GitHub REST API Sync**:
   - Queries `https://api.github.com/users/{username}` and `/repos`.
   - Real repository cards, star metrics, forks, language badges, and direct links.
   - Built-in caching (5-minute TTL), search filter, and graceful rate-limit handling.

4. **Skills & Knowledge Profile**:
   - 7 curated categories (Programming, Frontend, Backend, AI/ML, Computer Vision, Cybersecurity, Tools).
   - Transparent proficiency levels (*Building Projects*, *Learning*, *Academic Exposure*, *Familiar*) with zero fabricated 95% skill bars.

5. **Freelance Services & Client Inquiry Flow**:
   - 6 practical service offerings (Landing Pages, Portfolio Sites, Informational Sites, Python Scripts, GitHub Presentation, Data Dashboards).
   - Pre-selects service in the project brief modal.
   - Dual-tier submission: Express backend endpoint (`/api/inquiry`) with persistent logging + client-side storage + pre-filled mailto fallback.
   - Anti-spam honeypot and client-side rate limiting.

6. **Education & Learning Journey**:
   - Undergraduate timeline at Parul University (expected 2028).
   - "How I Build" engineering workflow (*Understand → Plan → Build → Test → Improve*).
   - Developer journal with authored technical notes on OpenCV pre-processing, Git hygiene, and database schema normalization.

7. **Resume & Contact Hub**:
   - Structured modal resume preview with instant print/PDF and text download capability.
   - One-click email copy to clipboard with toast notification.
   - Direct mailto and verified social profile links.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons
- **Backend / API**: Express 4, Node.js (`server.ts`), TSX
- **APIs**: GitHub REST API v3
- **Tooling**: Vite 8, ESBuild

---

## 📁 Project Architecture

```
├── inquiries_store.json    # Local JSON storage for freelance briefs
├── metadata.json           # Application metadata & permissions
├── package.json            # Project dependencies & scripts
├── server.ts               # Express server entry point with Vite middleware
├── index.html              # HTML shell with Google Fonts & Schema.org JSON-LD
└── src/
    ├── types/              # TypeScript interfaces for projects, skills, services
    ├── data/
    │   ├── config.ts       # 🔑 Centralized personal profile & contact configuration
    │   ├── projects.ts     # Project catalogue with problem/solution specs
    │   ├── skills.ts       # 7 skill categories and honest learning tiers
    │   ├── services.ts     # 6 freelance offerings, deliverables, turnaround
    │   ├── education.ts    # Academic timeline & "How I Build" workflow
    │   └── journal.ts      # Authored technical logs and study notes
    ├── services/
    │   ├── githubService.ts   # Public GitHub API fetcher with caching
    │   └── inquiryService.ts  # Inquiry validation & API/mailto dispatcher
    ├── components/
    │   ├── Navbar.tsx         # Top Bar Contract (3 zones, single-line links)
    │   ├── MobileMenu.tsx     # Responsive mobile navigation drawer
    │   ├── Hero.tsx           # Hero section with computational vector art
    │   ├── About.tsx          # Background, pillars, and verified facts
    │   ├── ProjectCard.tsx    # Card with technical preview & unboxed metadata
    │   ├── ProjectGallery.tsx # Category tabs, keyword search & sort
    │   ├── ProjectModal.tsx   # Detailed specification dialog
    │   ├── GitHubSection.tsx  # GitHub profile & repository browser
    │   ├── Skills.tsx         # Clean cards with honest proficiency tags
    │   ├── Services.tsx       # Freelance offerings with inquiry trigger
    │   ├── InquiryModal.tsx   # Validated client brief submission modal
    │   ├── EducationTimeline.tsx # Timeline & engineering workflow
    │   ├── JournalSection.tsx # Technical article notes reader
    │   ├── ResumeModal.tsx    # Academic resume preview & download
    │   ├── Contact.tsx        # Clipboard copy, verified profiles, mailto
    │   ├── Footer.tsx         # Clean footer with dynamic copyright year
    │   ├── Toast.tsx          # Accessible notifications container
    │   └── ConfigGuideDrawer.tsx # Live configuration guide
    └── App.tsx                # Application root with modal state orchestration
```

---

## ⚙️ Configuration Checklist (Customizing for Manasvi)

To personalize the website, update the files in `src/data/`:

1. **`src/data/config.ts`**:
   - `email`: Set your primary contact email (defaults to `manasvisawant840@gmail.com`).
   - `githubUsername`: Set your GitHub username to automatically populate your repositories and avatar.
   - `linkedinUrl`: Add your personal LinkedIn URL.
   - `isAvailableForWork`: Set to `true` or `false` to toggle the availability badge in the hero.
   - `availabilityNote`: Customize your availability text.

2. **`src/data/projects.ts`**:
   - Add new projects or update repository URLs once public releases are published.

3. **`src/data/services.ts`**:
   - Adjust starting prices or delivery timelines once ready to quote clients.

---

## 💻 Local Development Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Runs Express and Vite dev server at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```
Generates optimized static assets in `/dist`.

### 4. Run Production Server
```bash
npm start
```

### 5. Type Check & Linting
```bash
npm run lint
```

---

## 🚢 Publishing to GitHub & Hosting

1. **Create a new GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete portfolio for Manasvi Sawant"
   git remote add origin https://github.com/manasvisawant/portfolio.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel / Netlify / Cloud Run**:
   - **Vercel / Netlify**: Connect the GitHub repository. Build command: `npm run build`, Output directory: `dist`.
   - **Node Server**: The provided `server.ts` is fully container-ready for platforms like Google Cloud Run or Render.
