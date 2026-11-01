'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Tag, Calendar, GitBranch, ExternalLink, 
  ChevronDown, ChevronUp, Search, Filter,
  Star, Bug, Sparkles, TrendingUp, 
  Download, AlertTriangle, Info,
  Code, ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, Badge, Input, Select } from '@/components/ui';

const newsItems = [
  {
    id: '1',
    title: 'Mahoe 29 Alpha Released — Interactive Desktop Demo Now Live',
    slug: 'mahoe-29-alpha-released',
    date: '2026-11-01',
    type: 'release',
    tags: ['Alpha', 'Major Release'],
    excerpt: 'We\'re thrilled to announce the first alpha release of Mahoe 29, built on Kubuntu 26.04 LTS with KDE Plasma 6.1. The highlight is our new interactive browser-based desktop demo — try Mahoe without installing anything.',
    content: `
      ## What's New in Mahoe 29 Alpha

      ### 🎉 Interactive Desktop Demo
      For the first time, you can experience the Mahoe desktop directly in your browser. The demo includes:
      - Full window management (open, close, minimize, maximize, resize, move)
      - Working applications: Notes, File Manager, Settings, Calculator, Terminal, Calendar, System Monitor, App Store
      - Theme switching (Dark/Light/System) with live preview
      - Accent color selection
      - Zero persistence — refresh to reset

      ### 🎨 Visual Overhaul
      - New Mahoe Dark theme with refined color palette
      - Rounded corners throughout (12px default)
      - Subtle shadows and glow effects
      - Improved typography with Inter font
      - New wallpaper collection (6 options)

      ### ⚙️ Under the Hood
      - Kubuntu 26.04 LTS base (Noble Numbat)
      - KDE Plasma 6.1 with Mahoe customizations
      - Linux Kernel 6.8 with hardware enablement
      - Wayland-first session (X11 fallback)
      - PipeWire 1.0 audio with WirePlumber
      - systemd 255 with Btrfs snapshot integration

      ### 🛠️ Developer Experience
      - VS Code pre-installed with Mahoe theme
      - Docker, Podman, Distrobox, Toolbox ready
      - Node.js 20 LTS, Python 3.12, Rust 1.79, Go 1.22
      - PostgreSQL, MySQL, Redis as systemd services
      - GitHub CLI with authentication helper

      ## Known Issues
      - NVIDIA Wayland: Some flickering on 550 driver (workaround: use X11 session)
      - Fractional scaling: 125%/150% may show artifacts on some GTK apps
      - Installer: Calamares may not detect all NVMe drives (manual partitioning works)
      - Bluetooth: Initial pairing may require restart of bluetooth service

      ## Download
      Available on our [Downloads page](/downloads) and [GitHub Releases](https://github.com/mahoe-os/mahoe-29/releases).

      ## Feedback
      Please report issues on [GitHub Issues](https://github.com/mahoe-os/mahoe-29/issues) or join our [Discord](https://discord.gg/mahoe) for discussion.
    `,
  },
  {
    id: '2',
    title: 'Mahoe 28.2 Point Release — Bug Fixes and Hardware Support',
    slug: 'mahoe-28.2-released',
    date: '2026-09-15',
    type: 'release',
    tags: ['Stable', 'Point Release'],
    excerpt: 'Mahoe 28.2 is now available with important bug fixes, updated hardware support, and security patches. This release focuses on stability and compatibility improvements.',
    content: `
      ## Changes in 28.2

      ### 🐛 Bug Fixes
      - Fixed panel crash when adding certain widgets
      - Resolved memory leak in KWin compositor
      - Fixed Flatpak permission dialogs not appearing
      - Corrected fractional scaling on secondary monitors
      - Fixed audio crackling on some Bluetooth headsets

      ### 🔧 Hardware Support
      - Added support for AMD Ryzen 9000 series
      - Intel Core Ultra (Meteor Lake) graphics improvements
      - Newer WiFi 7 (802.11be) driver support
      - Updated firmware bundle (linux-firmware 20260801)

      ### 🔒 Security Updates
      - Linux kernel 6.8.0-45 (CVE-2026-XXXX)
      - systemd 255.4 (CVE-2026-XXXX)
      - Mesa 24.1.3 (graphics stack security)
      - OpenSSL 3.0.13

      ### 📦 Package Updates
      - KDE Plasma 6.0.5 → 6.0.5.2
      - Firefox 128.0 → 129.0
      - LibreOffice 24.2.5 → 24.2.6
      - VS Code 1.91 → 1.92

      ## Upgrade Instructions
      Run \`sudo apt update && sudo apt full-upgrade\` or use the Software Updater.
    `,
  },
  {
    id: '3',
    title: 'New Website Launch — Interactive Demo, Better Downloads, GitHub Integration',
    slug: 'new-website-launch',
    date: '2026-11-01',
    type: 'announcement',
    tags: ['Website', 'Features'],
    excerpt: 'We\'ve completely rebuilt the Mahoe website with a new interactive desktop demo, GitHub-powered downloads, and a beautiful design that matches the OS itself.',
    content: `
      ## Website Highlights

      ### 🖥️ Interactive Desktop Demo
      The centerpiece of the new site is a fully functional browser-based simulation of the Mahoe desktop. Try Notes, File Manager, Terminal, Settings, and more — all without installing anything.

      ### 📥 GitHub-Powered Downloads
      The downloads page now fetches releases directly from GitHub Releases API:
      - Real-time release information
      - Verified SHA-256 checksums
      - Automatic categorization (Stable/Beta/Experimental)
      - Direct asset links — no redirects through our servers

      ### 🎨 Design Consistency
      The website uses the exact same design system as the OS:
      - Same color palette, typography, spacing
      - Same component library (buttons, cards, modals)
      - Same theme switching (Dark/Light/System)
      - Same accent colors

      ### ♿ Accessibility
      - WCAG 2.1 AA compliant
      - Reduced motion support
      - Keyboard navigation
      - Screen reader friendly
      - High contrast ratios

      ### 🚀 Performance
      - Next.js 15 with App Router
      - Static generation where possible
      - Optimized images and fonts
      - Minimal JavaScript bundle
      - Vercel Edge deployment
    `,
  },
  {
    id: '4',
    title: 'Mahoe 29 Beta 1 — Feature Freeze, Testing Focus',
    slug: 'mahoe-29-beta1',
    date: '2026-10-15',
    type: 'release',
    tags: ['Beta', 'Testing'],
    excerpt: 'First beta release of Mahoe 29. Feature complete, now focusing on bug fixes and stability. We need your help testing!',
    content: `
      ## Beta 1 Highlights

      ### ✅ Feature Complete
      All planned features for 29.0 are implemented:
      - Complete theme engine with 6 accent colors
      - Window management enhancements
      - System settings modules
      - Developer tooling preset
      - Container integration
      - Btrfs snapshot automation

      ### 🧪 Testing Priorities
      We need testers to focus on:
      1. **Installation** — Hardware, VMs, dual-boot, encrypted installs
      2. **Graphics** — Wayland/X11, NVIDIA/AMD/Intel, HiDPI, multi-monitor
      3. **Audio** — PipeWire, Bluetooth, professional audio, latency
      4. **Networking** — WiFi, Ethernet, VPN, firewall
      5. **Developer Tools** — VS Code, containers, language runtimes, databases

      ### 🐛 How to Report Bugs
      1. Check [existing issues](https://github.com/mahoe-os/mahoe-29/issues)
      2. Create new issue with template
      3. Include: hardware, steps to reproduce, logs
      4. Tag with appropriate labels

      ### 📅 Timeline
      - Beta 1: Oct 15 (today)
      - Beta 2: Nov 1 (with Alpha feedback)
      - RC 1: Nov 15
      - Stable 29.0: Target Dec 1

      Join the testing effort on [Discord #testing](https://discord.gg/mahoe)!
    `,
  },
  {
    id: '5',
    title: 'Mahoe 28.1 — Security Updates and Plasma 6.0.4',
    slug: 'mahoe-28.1-released',
    date: '2026-07-01',
    type: 'release',
    tags: ['Stable', 'Security'],
    excerpt: 'Maintenance release with Plasma 6.0.4, kernel security patches, and several bug fixes reported by the community.',
    content: `
      ## Mahoe 28.1 Changes

      ### 🔒 Security
      - Linux kernel 6.8.0-38 (multiple CVEs)
      - systemd 255.2
      - OpenSSL 3.0.12
      - curl 8.7.1
      - sudo 1.9.15p5

      ### 🐛 Bug Fixes
      - Fixed crash in System Settings > Display
      - Resolved Dolphin freeze on network shares
      - Fixed KRunner not finding Flatpak apps
      - Corrected timezone detection in installer
      - Improved battery reporting on laptops

      ### 📦 Updated Packages
      - KDE Plasma 6.0.3 → 6.0.4
      - Firefox 126.0 → 127.0
      - Mesa 24.0.5 → 24.0.7
      - PipeWire 1.0.5 → 1.0.6
    `,
  },
];

const categories = ['all', 'release', 'announcement', 'security', 'development'];
const tags = ['Alpha', 'Beta', 'Stable', 'Release', 'Security', 'Features', 'Bug Fixes', 'Testing'];

export default function NewsPage() {
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const filteredNews = newsItems.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.type === filterCategory;
    const matchesTag = !filterTag || item.tags.includes(filterTag);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesTag && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'release': return Tag;
      case 'announcement': return Sparkles;
      case 'security': return AlertTriangle;
      case 'development': return Code;
      default: return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'release': return 'text-[var(--color-accent)]';
      case 'announcement': return 'text-[var(--color-warning)]';
      case 'security': return 'text-[var(--color-error)]';
      case 'development': return 'text-[var(--color-success)]';
      default: return 'text-[var(--color-text-tertiary)]';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 animate-in slide-in-from-bottom-4 duration-500">
              News & Changelog
            </h1>
            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-100">
              Stay up to date with Mahoe releases, announcements, and development updates.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Badge
                  key={cat}
                  variant={filterCategory === cat ? 'primary' : 'outline'}
                  onClick={() => setFilterCategory(cat)}
                  className="cursor-pointer"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-tertiary)]" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  className="h-10 pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {filteredNews.length === 0 ? (
            <Card variant="outlined" className="text-center py-16">
              <CardContent>
                <Search className="h-12 w-12 mx-auto mb-4 text-[var(--color-text-tertiary)]/30" />
                <h3 className="text-lg font-medium text-[var(--color-text-secondary)] mb-2">No articles found</h3>
                <p className="text-[var(--color-text-tertiary)]">Try adjusting your filters or search terms</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredNews.map((item, index) => (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card variant="outlined" className="group overflow-hidden">
                    <CardContent className="pt-0">
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <Badge 
                                variant={item.type === 'release' ? 'primary' : item.type === 'security' ? 'error' : 'outline'}
                                className={getTypeColor(item.type)}
                              >
                                {(() => { const Icon = getTypeIcon(item.type); return <Icon className="h-3 w-3 mr-1" />; })()}
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </Badge>
                              {item.tags.map(tag => (
                                <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                              ))}
                            </div>
                            <h2 className="text-2xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-2">
                              {item.title}
                            </h2>
                            <p className="text-[var(--color-text-secondary)]">{item.excerpt}</p>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-[var(--color-text-tertiary)] flex-shrink-0">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                          </div>
                        </div>

                        <div className="border-t border-[var(--color-border-primary)] pt-4">
                          <button
                            onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                            className="w-full flex items-center justify-between text-left focus:outline-none"
                          >
                            <span className="font-medium text-[var(--color-text-primary)] flex items-center gap-2">
                              {expandedItem === item.id ? 'Hide details' : 'Read more'}
                              <ChevronDown className={cn('h-4 w-4 transition-transform', expandedItem === item.id && 'rotate-180')} />
                            </span>
                            <a href={`/news/${item.slug}`} className="text-sm text-[var(--color-accent)] hover:underline flex items-center gap-1">
                              Permalink <ExternalLink className="h-3 w-3" />
                            </a>
                          </button>
                        </div>
                      </div>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: expandedItem === item.id ? 'auto' : 0, opacity: expandedItem === item.id ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-[var(--color-border-primary)] prose prose-invert max-w-none" style={{ '--tw-prose-body': 'var(--color-text-secondary)' }}>
                          <div className="whitespace-pre-wrap">{item.content}</div>
                        </div>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Subscribe */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <Card variant="elevated">
            <CardContent className="pt-8 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
                  Stay Updated
                </h2>
                <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                  Get notified about new releases, security updates, and important announcements.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1"
                  />
                  <Button type="submit" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                    Subscribe
                  </Button>
                </form>
                <p className="text-sm text-[var(--color-text-tertiary)] mt-4">
                  No spam, unsubscribe anytime. Privacy policy applies.
                </p>
                <div className="flex items-center justify-center gap-6 mt-6 text-sm text-[var(--color-text-tertiary)]">
                  <a href="https://github.com/mahoe-os/mahoe-29/releases.atom" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--color-accent)]">
                    <ExternalLink className="h-4 w-4" /> RSS Feed
                  </a>
                  <a href="https://github.com/mahoe-os/mahoe-29/watchers" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--color-accent)]">
                    <Star className="h-4 w-4" /> Watch Repo
                  </a>
                  <a href="https://discord.gg/mahoe" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[var(--color-accent)]">
                    <MessageCircle className="h-4 w-4" /> Discord
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

// Missing import
import { MessageCircle } from 'lucide-react';