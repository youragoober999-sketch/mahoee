'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Download, Monitor, Code, Palette, Zap, Shield, Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui';
import { Card, CardContent } from '@/components/ui';

const features = [
  {
    icon: Palette,
    title: 'Sophisticated Design',
    description: 'A meticulously crafted desktop environment with macOS-inspired aesthetics, refined typography, and thoughtful micro-interactions.',
  },
  {
    icon: Code,
    title: 'Deep Customization',
    description: 'Built on KDE Plasma — customize every aspect: window management, theming, widgets, shortcuts, and workflows.',
  },
  {
    icon: Zap,
    title: 'Performance First',
    description: 'Optimized for responsiveness with minimal resource overhead. Fast boot, snappy applications, smooth animations.',
  },
  {
    icon: Shield,
    title: 'Rock-Solid Foundation',
    description: 'Based on Kubuntu 26.04 LTS with 5 years of security updates. Stable, secure, and enterprise-ready.',
  },
  {
    icon: Globe,
    title: 'Application Ecosystem',
    description: 'Access thousands of Linux applications plus Flatpak, Snap, and AppImage support out of the box.',
  },
  {
    icon: Monitor,
    title: 'Modern Tech Stack',
    description: 'Wayland-first, PipeWire audio, modern graphics stack. Ready for today\'s hardware and tomorrow\'s innovations.',
  },
];

const philosophyPoints = [
  'Linux distributions often force a choice: beautiful but rigid, or flexible but fragmented. Mahoe refuses this false dichotomy.',
  'We believe a desktop environment should be opinionated by default — beautiful, coherent, and usable out of the box — while remaining infinitely customizable for those who want to go deeper.',
  'Every pixel, animation, and interaction in Mahoe is intentional. We sweat the details so you don\'t have to, but we never lock you out of changing them.',
  'Built on Kubuntu 26.04 LTS, Mahoe inherits Ubuntu\'s vast software repositories, hardware support, and security track record — then elevates the experience with a hand-crafted Plasma desktop.',
];

const stats = [
  { value: '26.04', label: 'Kubuntu LTS Base' },
  { value: '5 Years', label: 'Security Updates' },
  { value: 'Plasma 6', label: 'Desktop Environment' },
  { value: 'Wayland', label: 'Display Protocol' },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-accent-light)] border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-sm font-medium mb-8 animate-in fade-in duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
              </span>
              Mahoe 29 Alpha — Now Available for Testing
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-100">
              The Linux Desktop,{' '}
              <span className="text-[var(--color-accent)]">Elevated</span>
            </h1>

            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 animate-in slide-in-from-bottom-4 duration-500 delay-200">
              A premium operating system built on Kubuntu 26.04 LTS, featuring a hand-crafted KDE Plasma desktop
              with macOS-inspired design philosophy. Beautiful by default, infinitely customizable by design.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-4 duration-500 delay-300">
              <Link href="/explore">
                <Button size="lg" icon={<ArrowRight className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                  Explore Mahoe
                </Button>
              </Link>
              <Link href="/downloads">
                <Button size="lg" variant="outline" icon={<Download className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                  Download Alpha
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Preview */}
          <div className="mt-16 relative animate-in zoom-in-95 duration-700 delay-400">
            <DesktopPreview />
          </div>
        </div>

        {/* Background accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Stats Bar */}
      <section className="py-16 border-y border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-[var(--color-accent)] tracking-tight">
                  {stat.value}
                </div>
                <div className="mt-2 text-[var(--color-text-secondary)] text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Why Choose Mahoe?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Six pillars that make Mahoe a distinctive choice for your daily driver.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} variant="interactive" className="group animate-in fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">{feature.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
                Our Philosophy
              </h2>
              <div className="space-y-6">
                {philosophyPoints.map((point, index) => (
                  <div key={index} className="flex gap-4 animate-in slide-in-from-left duration-500" style={{ animationDelay: `${index * 150}ms` }}>
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center mt-0.5">
                      <Check className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl bg-gradient-to-br from-[var(--color-surface-primary)] to-[var(--color-surface-secondary)] border border-[var(--color-border-primary)] overflow-hidden shadow-[var(--shadow-xl)]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <Code className="h-16 w-16 text-[var(--color-accent)]/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Designed for Developers</h3>
                    <p className="text-[var(--color-text-secondary)] max-w-sm mx-auto">
                      Full development toolchain pre-configured. VS Code, Git, Docker, Node.js, Python, Rust — ready to code from first boot.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Preview Section */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Try Before You Install
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Experience the Mahoe desktop right in your browser. No download, no installation, no commitment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl">
                <div className="h-12 w-12 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                  <Monitor className="h-6 w-6 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">Interactive Desktop Simulation</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Open apps, manage windows, explore the taskbar — all in your browser</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl">
                <div className="h-12 w-12 rounded-lg bg-[var(--color-success)]/15 flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-[var(--color-success)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">Real Applications, Real Interactions</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Notes, File Manager, Settings, Calculator, Terminal, and more — fully functional</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl">
                <div className="h-12 w-12 rounded-lg bg-[var(--color-warning)]/15 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-[var(--color-warning)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-text-primary)]">Zero Risk, Zero Persistence</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">Nothing saves to your device. Refresh to reset. Complete isolation.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <Link href="/explore" className="block">
                <div className="aspect-video rounded-2xl bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] overflow-hidden shadow-[var(--shadow-xl)] hover:shadow-[var(--shadow-glow)] transition-shadow duration-300 group">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center">
                      <Monitor className="h-16 w-16 text-[var(--color-accent)]/30 mx-auto mb-4 group-hover:text-[var(--color-accent)]/50 transition-colors" />
                      <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Launch Desktop Demo</h3>
                      <p className="text-[var(--color-text-secondary)] max-w-sm mx-auto mb-6">Click to enter the interactive Mahoe desktop environment</p>
                      <Button variant="primary" icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                        Enter Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements & Version Info */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
                System Requirements
              </h2>
              <div className="space-y-4">
                {[
                  { spec: 'Processor', min: 'x86_64 CPU (2+ cores)', rec: 'x86_64 CPU (4+ cores, AVX2)' },
                  { spec: 'Memory', min: '4 GB RAM', rec: '8 GB RAM or more' },
                  { spec: 'Storage', min: '25 GB available space', rec: '50 GB SSD (NVMe recommended)' },
                  { spec: 'Graphics', min: 'OpenGL 3.3+ / Vulkan 1.1+', rec: 'Dedicated GPU with Vulkan 1.3+' },
                  { spec: 'Display', min: '1366×768', rec: '1920×1080 or higher' },
                  { spec: 'Internet', min: 'Required for installation', rec: 'Broadband for updates & Flatpaks' },
                ].map((req) => (
                  <div key={req.spec} className="flex items-start gap-4 p-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl">
                    <div className="flex-shrink-0 w-32 font-medium text-[var(--color-text-primary)]">{req.spec}</div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--color-text-secondary)]">
                        <span className="font-medium text-[var(--color-text-tertiary)]">Minimum:</span> {req.min}
                      </div>
                      <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                        <span className="font-medium text-[var(--color-accent)]">Recommended:</span> {req.rec}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
                Current Release
              </h2>
              <Card variant="elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-[var(--color-warning)]/15 text-[var(--color-warning)] rounded-full">
                      Alpha Release
                    </span>
                    <span className="text-sm text-[var(--color-text-tertiary)]">v0.1.0-alpha</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Mahoe 29 Alpha</h3>
                  <p className="text-[var(--color-text-secondary)] mb-6">
                    Early preview for testing and feedback. Not recommended for production use.
                    Expect bugs, incomplete features, and frequent updates.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      'Kubuntu 26.04 LTS base (Noble Numbat)',
                      'KDE Plasma 6.1 with Mahoe customizations',
                      'Linux Kernel 6.8 with hardware enablement',
                      'Wayland session by default, X11 fallback',
                      'PipeWire audio, modern graphics stack',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                        <Check className="h-4 w-4 text-[var(--color-success)] flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link href="/downloads">
                    <Button fullWidth icon={<Download className="h-4 w-4" />} iconPosition="left" size="lg">
                      Download Alpha ISO
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/10 via-transparent to-[var(--color-accent)]/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Ready to Experience Mahoe?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Join the early adopters shaping the future of the Linux desktop. Download the alpha, try the demo, or contribute on GitHub.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/downloads">
                <Button size="lg" icon={<Download className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                  Download Alpha
                </Button>
              </Link>
              <Link href="/explore">
                <Button size="lg" variant="outline" icon={<Monitor className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                  Try Desktop Demo
                </Button>
              </Link>
              <a href="https://github.com/mahoe-os/mahoe-29" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="ghost" className="min-w-[200px]">
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DesktopPreview() {
  return (
    <div className="relative aspect-video max-w-5xl mx-auto">
      <div className="absolute inset-0 bg-[var(--color-bg-primary)] rounded-2xl border border-[var(--color-border-primary)] shadow-[var(--shadow-xl)] overflow-hidden">
        {/* Simulated desktop background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b2a] via-[#1b2a3a] to-[#0d1b2a] relative">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />

          {/* Accent lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] border border-[var(--color-accent)]/20 rounded-xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] border border-[var(--color-accent)]/10 rounded-xl" />

          {/* Floating window previews */}
          <div className="absolute top-16 left-16">
            <SimulatedWindow title="Terminal" width={400} height={280} />
          </div>
          <div className="absolute top-16 right-16">
            <SimulatedWindow title="File Manager" width={400} height={280} />
          </div>
          <div className="absolute bottom-16 left-16">
            <SimulatedWindow title="Settings" width={400} height={280} />
          </div>
          <div className="absolute bottom-16 right-16">
            <SimulatedWindow title="Notes" width={400} height={280} />
          </div>

          {/* Center logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <svg className="h-20 w-20 text-[var(--color-accent)]/30 mx-auto mb-4" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="text-[var(--color-text-tertiary)] font-medium">Mahoe 29 Desktop</p>
          </div>
        </div>

        {/* Simulated taskbar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-[var(--color-surface-primary)]/90 backdrop-blur-md border-t border-[var(--color-border-primary)] flex items-center px-4 gap-2">
          <div className="h-8 w-8 rounded-lg bg-[var(--color-accent)] flex items-center justify-center">
            <svg className="h-5 w-5 text-white" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex gap-1">
            {['Terminal', 'Files', 'Browser', 'Settings'].map((app) => (
              <div key={app} className="h-8 px-3 rounded-lg bg-[var(--color-surface-hover)] flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                <div className="h-4 w-4 rounded bg-[var(--color-accent)]/30" />
                <span>{app}</span>
              </div>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-4 text-sm text-[var(--color-text-tertiary)]">
            <span>14:32</span>
            <div className="h-6 w-6 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-[var(--color-accent)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimulatedWindow({ title, width, height }: { title: string; width: number; height: number }) {
  return (
    <div className="bg-[var(--color-surface-primary)]/95 backdrop-blur-md border border-[var(--color-border-primary)] rounded-xl shadow-[var(--shadow-lg)] overflow-hidden" style={{ width, height }}>
      <div className="h-10 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-primary)] flex items-center px-3 gap-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[var(--color-error)]" />
          <div className="h-3 w-3 rounded-full bg-[var(--color-warning)]" />
          <div className="h-3 w-3 rounded-full bg-[var(--color-success)]" />
        </div>
        <div className="flex-1 text-center text-xs text-[var(--color-text-tertiary)] font-medium">{title}</div>
      </div>
      <div className="p-4 h-[calc(100%-40px)] bg-[var(--color-bg-primary)]/50">
        <div className="h-full bg-gradient-to-br from-transparent via-[var(--color-accent)]/5 to-transparent rounded-lg" />
      </div>
    </div>
  );
}