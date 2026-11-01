'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, Code, Zap, Shield, Globe, Monitor, 
  Layers, CpuIcon, HardDrive, Network, Terminal, 
  Settings, Eye, MousePointer, Keyboard, 
  ChevronDown, ChevronUp, Check, X, Download,
  CpuIcon as CpuIconIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';

const featureCategories = [
  {
    id: 'desktop',
    name: 'Desktop Environment',
    icon: Monitor,
    description: 'A sophisticated, macOS-inspired desktop built on KDE Plasma 6',
    features: [
      { title: 'Custom Plasma Theme', desc: 'Hand-crafted theme with rounded corners, subtle shadows, and refined color palette', icon: Palette },
      { title: 'Advanced Window Management', desc: 'Tiling, snapping, virtual desktops, activities, and keyboard-driven workflows', icon: Layers },
      { title: 'Global Menu & Mac-style Titlebars', desc: 'Unified menu bar, traffic-light window controls, and consistent app menus', icon: Eye },
      { title: 'Dock & Panel System', desc: 'Configurable panels with intelligent auto-hide, widgets, and app launchers', icon: MousePointer },
      { title: 'System-wide Animations', desc: 'Smooth 60fps transitions for windows, workspaces, and UI elements', icon: Zap },
      { title: 'Fractional Scaling', desc: 'Perfect HiDPI support with per-monitor fractional scaling on Wayland', icon: Monitor },
    ]
  },
  {
    id: 'customization',
    name: 'Deep Customization',
    icon: Settings,
    description: 'Every aspect of the desktop can be tailored to your workflow',
    features: [
      { title: 'Theme Engine', desc: 'Complete theming with accent colors, wallpapers, and GTK/Qt consistency', icon: Palette },
      { title: 'Keyboard Shortcuts', desc: 'Fully rebindable shortcuts with conflict detection and presets', icon: Keyboard },
      { title: 'Window Rules', desc: 'Per-application rules for placement, size, desktop, and behavior', icon: Layers },
      { title: 'KWin Scripts', desc: 'Extend window manager with JavaScript scripts for custom behaviors', icon: Code },
      { title: 'Plasma Widgets', desc: 'Rich widget ecosystem with custom widget support', icon: CPU },
      { title: 'Service Menus', desc: 'Custom right-click actions in Dolphin for workflows', icon: MousePointer },
    ]
  },
  {
    id: 'performance',
    name: 'Performance & Technology',
    icon: Zap,
    description: 'Modern Linux stack optimized for responsiveness and efficiency',
    features: [
      { title: 'Wayland-First', desc: 'Native Wayland session with XWayland compatibility layer', icon: Monitor },
      { title: 'PipeWire Audio', desc: 'Low-latency audio with professional-grade routing and Bluetooth', icon: Network },
      { title: 'Systemd + Btrfs', desc: 'Modern init with snapshots, rollbacks, and compression', icon: HardDrive },
      { title: 'Kernel 6.8+', desc: 'Latest hardware support, sched_ext, and performance patches', icon: CPU },
      { title: 'ZRAM + systemd-oomd', desc: 'Intelligent memory management for smooth multitasking', icon: HardDrive },
      { title: 'Flatpak & Snap', desc: 'Sandboxed applications with automatic updates', icon: Shield },
    ]
  },
  {
    id: 'developer',
    name: 'Developer Experience',
    icon: Terminal,
    description: 'Pre-configured development environment ready to code',
    features: [
      { title: 'VS Code Pre-installed', desc: 'With Mahoe theme, extensions, and settings synced', icon: Code },
      { title: 'Git & GitHub CLI', desc: 'Configured with useful aliases and credential helper', icon: Terminal },
      { title: 'Container Tools', desc: 'Docker, Podman, Buildah, and Distrobox ready to use', icon: CPU },
      { title: 'Language Runtimes', desc: 'Node.js, Python, Rust, Go, Zig with version managers', icon: Code },
      { title: 'Database Servers', desc: 'PostgreSQL, MySQL, Redis, SQLite with systemd services', icon: HardDrive },
      { title: 'Debugging Tools', desc: 'GDB, LLDB, Valgrind, perf, bpftrace pre-installed', icon: Terminal },
    ]
  },
];

const philosophyPoints = [
  {
    title: 'Opinionated Defaults, Infinite Customization',
    desc: 'Mahoe ships with carefully chosen defaults that look beautiful and work well immediately. But unlike other "opinionated" distros, every single decision can be changed — from the window decorations to the kernel parameters.',
    icon: Palette,
  },
  {
    title: 'macOS Aesthetics, Linux Freedom',
    desc: 'We studied what makes macOS feel polished — consistent spacing, purposeful animations, typographic hierarchy, cohesive iconography — and brought those principles to KDE Plasma without sacrificing the freedom that makes Linux powerful.',
    icon: Eye,
  },
  {
    title: 'No Compromise on Standards',
    desc: 'Mahoe follows freedesktop.org standards, uses systemd, PipeWire, Wayland, Flatpak, and contributes upstream to KDE. We don\'t fork — we enhance. Your customizations and skills transfer directly to upstream Plasma.',
    icon: Code,
  },
  {
    title: 'Built for the Long Term',
    desc: 'Based on Kubuntu 26.04 LTS with 5 years of security updates. The Mahoe customizations are maintained as a Plasma theme and configuration layer, not a fragile fork. Upgrades are safe and predictable.',
    icon: Shield,
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-accent-light)] border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-sm font-medium mb-8 animate-in fade-in duration-500">
              <Code className="h-4 w-4" />
              Built on Kubuntu 26.04 LTS · KDE Plasma 6.1
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-100">
              Features & Capabilities
            </h1>

            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-200">
              Mahoe 29 combines the elegance of macOS with the power and freedom of Linux. 
              Every feature is designed to enhance your workflow without getting in your way.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Design Philosophy
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Four principles that guide every decision in Mahoe
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophyPoints.map((point, index) => (
              <Card key={point.title} variant="interactive" className="h-full animate-in fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                    <point.icon className="h-6 w-6 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">{point.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">{point.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, catIndex) => (
        <section key={category.id} className="py-24 lg:py-32" style={{ backgroundColor: catIndex % 2 === 0 ? 'var(--color-bg-primary)' : 'var(--color-bg-secondary)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <category.icon className="h-8 w-8 text-[var(--color-accent)]" />
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">{category.name}</h2>
              </div>
              <p className="text-lg text-[var(--color-text-secondary)]">{category.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.features.map((feature, featIndex) => (
                <Card key={feature.title} variant="outlined" className="animate-in fade-in duration-500" style={{ animationDelay: `${catIndex * 100 + featIndex * 50}ms` }}>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                      <feature.icon className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[var(--color-text-secondary)]">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Technical Specs */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Technical Specifications
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { category: 'Base System', items: ['Kubuntu 26.04 LTS', 'Linux Kernel 6.8', 'systemd 255', 'glibc 2.39'] },
              { category: 'Desktop', items: ['KDE Plasma 6.1', 'KDE Frameworks 6.3', 'Qt 6.7', 'KWin Wayland'] },
              { category: 'Graphics', items: ['Mesa 24.1', 'Vulkan 1.3', 'OpenGL 4.6', 'DRM/KMS'] },
              { category: 'Audio', items: ['PipeWire 1.0', 'WirePlumber', 'PulseAudio compat', 'JACK support'] },
              { category: 'Container', items: ['Docker 26', 'Podman 5', 'Distrobox', 'Toolbox'] },
              { category: 'Languages', items: ['GCC 13.2', 'Clang 17', 'Rust 1.79', 'Go 1.22', 'Node.js 20 LTS'] },
              { category: 'Filesystem', items: ['Btrfs (default)', 'ext4', 'ZFS support', 'f2fs', 'LUKS2'] },
              { category: 'Boot', items: ['systemd-boot', 'GRUB 2.12', 'Secure Boot', 'UKI support'] },
            ].map((spec, index) => (
              <Card key={spec.category} variant="outlined" className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-3">{spec.category}</h3>
                  <ul className="space-y-2">
                    {spec.items.map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                        <Check className="h-4 w-4 text-[var(--color-success)] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Why Mahoe Over Others?
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse" role="table">
              <thead>
                <tr className="border-b border-[var(--color-border-primary)]">
                  <th className="p-4 text-left text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Feature</th>
                  <th className="p-4 text-center text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Mahoe 29</th>
                  <th className="p-4 text-center text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Standard Kubuntu</th>
                  <th className="p-4 text-center text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Other Plasma Distros</th>
                  <th className="p-4 text-center text-sm font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">macOS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'macOS-inspired Theme', mahoe: true, kubuntu: false, other: false, macos: true },
                  { feature: 'Global Menu Bar', mahoe: true, kubuntu: false, other: 'partial', macos: true },
                  { feature: 'Traffic-light Buttons', mahoe: true, kubuntu: false, other: false, macos: true },
                  { feature: 'Fractional Scaling (Wayland)', mahoe: true, kubuntu: true, other: true, macos: true },
                  { feature: 'Pre-configured Dev Tools', mahoe: true, kubuntu: false, other: 'partial', macos: false },
                  { feature: 'Btrfs + Snapshots Default', mahoe: true, kubuntu: false, other: false, macos: false },
                  { feature: '5 Years LTS Updates', mahoe: true, kubuntu: true, other: 'varies', macos: 'N/A' },
                  { feature: 'Flatpak + Snap OOTB', mahoe: true, kubuntu: 'Flatpak only', other: 'varies', macos: false },
                  { feature: 'PipeWire + WirePlumber', mahoe: true, kubuntu: true, other: true, macos: false },
                  { feature: 'Custom Kernel Tuning', mahoe: true, kubuntu: false, other: 'varies', macos: false },
                  { feature: 'Deep Plasma Customization', mahoe: true, kubuntu: 'basic', other: 'varies', macos: false },
                  { feature: 'Upstream Contribution', mahoe: true, kubuntu: true, other: 'varies', macos: false },
                ].map((row, index) => (
                  <tr key={row.feature} className={cn('border-b border-[var(--color-border-primary)]/50', index % 2 === 0 && 'bg-[var(--color-bg-secondary)]')}>
                    <td className="p-4 text-sm text-[var(--color-text-primary)]">{row.feature}</td>
                    <td className="p-4 text-center"><Badge variant={row.mahoe === true ? 'success' : row.mahoe === 'partial' ? 'warning' : 'outline'} size="sm">{row.mahoe === true ? 'Yes' : row.mahoe === 'partial' ? 'Partial' : 'No'}</Badge></td>
                    <td className="p-4 text-center"><Badge variant={row.kubuntu === true ? 'success' : row.kubuntu === 'partial' ? 'warning' : 'outline'} size="sm">{row.kubuntu === true ? 'Yes' : row.kubuntu === 'partial' ? 'Partial' : 'No'}</Badge></td>
                    <td className="p-4 text-center"><Badge variant={row.other === true ? 'success' : row.other === 'partial' ? 'warning' : 'outline'} size="sm">{row.other === true ? 'Yes' : row.other === 'partial' ? 'Partial' : 'Varies'}</Badge></td>
                    <td className="p-4 text-center"><Badge variant={row.macos === true ? 'success' : 'outline'} size="sm">{row.macos === true ? 'Yes' : 'N/A'}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/10 via-transparent to-[var(--color-accent)]/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Experience It Yourself
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Try the interactive desktop demo, download the alpha ISO, or read the documentation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/explore">
                <Button size="lg" icon={<Monitor className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                  Try Desktop Demo
                </Button>
              </a>
              <a href="/downloads">
                <Button size="lg" variant="outline" icon={<Download className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                  Download Alpha
                </Button>
              </a>
              <a href="/documentation">
                <Button size="lg" variant="ghost" className="min-w-[200px]">
                  Read Documentation
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}