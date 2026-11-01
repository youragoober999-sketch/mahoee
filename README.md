# Mahoe 29 Official Website

The official website for Mahoe 29 — a premium Linux-based operating system built on Kubuntu 26.04 LTS, featuring a sophisticated macOS-inspired desktop environment.

## 🌟 Features

- **Interactive Desktop Demo** — Try Mahoe 29 in your browser with a fully functional desktop simulation
- **Beautiful Design** — macOS-inspired aesthetics with dark/light themes, accent colors, and smooth animations
- **GitHub Integration** — Downloads page fetches releases directly from GitHub Releases API
- **Responsive** — Works beautifully on desktop, tablet, and mobile
- **Accessible** — WCAG 2.1 AA compliant with reduced motion support
- **Performant** — Next.js 15, Tailwind CSS 4, optimized for speed

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/mahoe-os/mahoe-29-website.git
cd mahoe-29-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the website.

### Environment Variables

Create a `.env.local` file for local development:

```env
# Optional: GitHub token for higher API rate limits
GITHUB_TOKEN=your_github_token

# Optional: Custom repository (defaults to mahoe-os/mahoe-29)
GITHUB_REPO=your-org/your-repo
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── explore/           # Interactive desktop demo
│   ├── downloads/         # Downloads page with GitHub integration
│   ├── features/          # Features overview
│   ├── documentation/     # Documentation hub
│   ├── about/             # About page
│   ├── news/              # News & changelog
│   ├── requirements/      # System requirements
│   └── settings/          # Website settings
├── components/
│   ├── ui/                # Reusable UI components (Button, Card, Modal, etc.)
│   ├── layout/            # Layout components (Navigation, Footer, Layout)
│   ├── desktop/           # Desktop simulation components
│   │   ├── Window.tsx     # Window management
│   │   ├── DesktopSimulation.tsx  # Main desktop
│   │   └── apps/          # Desktop applications
│   └── setup/             # First-time setup experience
├── context/
│   └── ThemeContext.tsx   # Theme, accent, motion state
├── lib/
│   ├── design-system.ts   # Colors, typography, spacing, etc.
│   ├── github.ts          # GitHub API integration
│   └── utils.ts           # Utility functions
└── hooks/                 # Custom React hooks
```

## 🎨 Design System

The website uses a centralized design system in `src/lib/design-system.ts`:

- **Colors** — Semantic color tokens for dark/light themes
- **Typography** — Inter font with consistent type scale
- **Spacing** — 4px base unit scale
- **Border Radius** — Consistent rounded corners
- **Shadows** — Layered elevation system
- **Transitions** — Standardized easing and durations
- **Z-Index** — Organized stacking context

All components use CSS custom properties for theming, enabling instant theme switching without re-renders.

## 🖥️ Desktop Simulation

The interactive demo (`/explore`) is a fully client-side simulation:

- **Window Management** — Open, close, minimize, maximize, resize, drag
- **Working Apps** — Notes, File Manager, Settings, Calculator, Terminal, Calendar, System Monitor, App Store
- **Taskbar** — Start menu, pinned/running apps, system tray, clock
- **Application Launcher** — Searchable, categorized apps
- **Zero Persistence** — All state in memory, refresh to reset
- **Desktop-Only Apps** — Graceful messaging for OS-exclusive features

## 📦 GitHub Integration

The downloads page (`/downloads`) integrates with GitHub:

- Fetches releases from GitHub Releases API
- Categorizes: Stable, Beta, Experimental
- Displays assets with type detection (ISO, Installer, Checksum)
- Direct download links to GitHub assets
- SHA-256 verification with browser-based checker
- Cached for 5 minutes to respect rate limits

### Configuration

Set these in your GitHub repository settings:

1. **Repository**: `mahoe-os/mahoe-29` (or configure `GITHUB_REPO`)
2. **Releases**: Create releases with assets named:
   - `mahoe-29-<version>-<arch>.iso` — Bootable ISO
   - `mahoe-29-<version>-installer.*` — Installer package
   - `SHA256SUMS` or `*.sha256` — Checksums
3. **Tags**: Use semantic versioning (`v0.1.0-alpha`, `v1.0.0`, etc.)

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Configure environment variables:
   ```
   GITHUB_TOKEN=your_token (optional, for higher rate limits)
   GITHUB_REPO=mahoe-os/mahoe-29 (optional)
   ```
4. Deploy!

Vercel will automatically build and deploy on push to main.

### Manual Build

```bash
npm run build
npm start
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Development

```bash
# Run development server with Turbopack
npm run dev

# Run linting
npm run lint

# Type check
npx tsc --noEmit

# Build for production
npm run build
```

## 📝 Customization

### Adding New Pages

1. Create `src/app/your-page/page.tsx`
2. Add to navigation in `src/components/layout/Navigation.tsx`
3. Add to footer in `src/components/layout/Footer.tsx`

### Adding Desktop Apps

1. Create component in `src/components/desktop/apps/YourApp.tsx`
2. Add to `DESKTOP_APPS` in `src/components/desktop/Window.tsx`
3. Add icon to `APP_ICONS` if needed
4. Import and render in `DesktopSimulation.tsx`

### Modifying Themes

Edit `src/lib/design-system.ts`:
- Add accent colors to `mahoeColors.accents`
- Modify semantic colors in `mahoeColors.dark/light`
- Update CSS variables in `globals.css`

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and type checks
5. Submit a pull request

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## 📄 License

- **Website Code**: MIT License
- **Mahoe OS**: GPL-3.0 License

## 🔗 Links

- **Website**: https://mahoeos.org
- **GitHub**: https://github.com/mahoe-os/mahoe-29
- **Discord**: https://discord.gg/mahoe
- **Twitter**: https://twitter.com/mahoeos
- **Downloads**: https://github.com/mahoe-os/mahoe-29/releases

---

Built with ❤️ by the Mahoe team. "Absolute potato" — Ship it.