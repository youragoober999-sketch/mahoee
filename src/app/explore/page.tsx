'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Maximize2, Minimize, Monitor, Download, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Modal, Badge } from '@/components/ui';
import { DesktopSimulation } from '@/components/desktop/DesktopSimulation';

const features = [
  { icon: Monitor, title: 'Full Desktop Environment', desc: 'Experience the complete Mahoe desktop with taskbar, launcher, and window management' },
  { icon: Maximize2, title: 'Window Management', desc: 'Open, close, minimize, maximize, resize, and move windows just like a real OS' },
  { icon: HelpCircle, title: 'Working Applications', desc: 'Interact with Notes, File Manager, Settings, Calculator, Terminal, and more' },
  { icon: Download, title: 'Zero Installation', desc: 'Runs entirely in your browser — no download, no VM, no risk' },
];

const keyboardShortcuts = [
  { keys: ['Meta', 'Space'], action: 'Open application launcher' },
  { keys: ['Meta', 'Tab'], action: 'Switch between windows' },
  { keys: ['Meta', 'D'], action: 'Show desktop' },
  { keys: ['Ctrl', 'Alt', 'T'], action: 'Open terminal' },
  { keys: ['Meta', 'E'], action: 'Open file manager' },
  { keys: ['Meta', 'S'], action: 'Open settings' },
  { keys: ['Meta', '1-9'], action: 'Launch pinned apps' },
  { keys: ['F11'], action: 'Toggle fullscreen' },
];

export default function ExplorePage() {
  const [showDemo, setShowDemo] = useState(false);
  const [demoFullscreen, setDemoFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault();
        if (showDemo) setDemoFullscreen(!demoFullscreen);
      }
      if (e.key === 'Escape' && demoFullscreen) {
        setDemoFullscreen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDemo, demoFullscreen]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[var(--color-bg-primary)]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--color-accent-light)] border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-sm font-medium mb-8 animate-in fade-in duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]"></span>
              </span>
              Interactive Desktop Demo — Try Mahoe 29 in your browser
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-100">
              Explore Mahoe 29
            </h1>

            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-10 animate-in slide-in-from-bottom-4 duration-500 delay-200">
              Experience the Mahoe desktop environment right here in your browser. 
              Open applications, manage windows, customize settings — all without installing anything.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-4 duration-500 delay-300">
              <Button size="xl" onClick={() => setShowDemo(true)} icon={<Monitor className="h-5 w-5" />} iconPosition="left" className="min-w-[280px]">
                Launch Desktop Demo
              </Button>
              <Button size="xl" variant="outline" onClick={() => setShowShortcuts(true)} icon={<HelpCircle className="h-5 w-5" />} iconPosition="left" className="min-w-[200px]">
                Keyboard Shortcuts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              What You Can Do in the Demo
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              The demo includes a fully functional desktop simulation with working applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={feature.title} variant="interactive" className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">{feature.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Included Apps */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Included Applications
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              A selection of core apps that demonstrate the Mahoe desktop experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Notes', desc: 'Create, edit, organize notes with full text editing', icon: '📝' },
              { name: 'File Manager', desc: 'Browse a simulated filesystem with folders and files', icon: '📁' },
              { name: 'Settings', desc: 'Explore appearance, display, network, and system settings', icon: '⚙️' },
              { name: 'Calculator', desc: 'Fully functional calculator with history', icon: '🔢' },
              { name: 'Terminal', desc: 'Simulated terminal with 20+ demo commands', icon: '💻' },
              { name: 'Calendar', desc: 'Month/week/day views with demo events', icon: '📅' },
              { name: 'System Monitor', desc: 'Real-time CPU, memory, disk, and network graphs', icon: '📊' },
              { name: 'App Store', desc: 'Browse and discover applications (demo)', icon: '🏪' },
            ].map((app, index) => (
              <Card key={app.name} variant="interactive" className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{app.icon}</div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">{app.name}</h3>
                  <p className="text-[var(--color-text-secondary)]">{app.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop-only notice */}
          <Card variant="outlined" className="mt-12 max-w-3xl mx-auto">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-[var(--color-warning)]/15 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-[var(--color-warning)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)] mb-1">Some Apps Are Desktop-Only</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Applications like Music, Images, Code Editor, and advanced system tools require the full Mahoe 29 installation.
                    Clicking them in the demo will show a message with a link to download the OS.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Keyboard Shortcuts */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
                Keyboard Shortcuts
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8">
                Navigate the demo efficiently with these keyboard shortcuts. 
                Most mirror the actual Mahoe 29 desktop shortcuts.
              </p>
              <div className="space-y-3">
                {keyboardShortcuts.map((shortcut, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg">
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, i) => (
                        <React.Fragment key={i}>
                          <kbd className="px-2 py-1 text-xs font-mono bg-[var(--color-surface-tertiary)] rounded border border-[var(--color-border-primary)]">{key}</kbd>
                          {i < shortcut.keys.length - 1 && <span className="text-[var(--color-text-tertiary)] px-1">+</span>}
                        </React.Fragment>
                      ))}
                    </div>
                    <span className="text-sm text-[var(--color-text-secondary)]">{shortcut.action}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] overflow-hidden shadow-[var(--shadow-xl)]">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <Keyboard className="h-16 w-16 text-[var(--color-accent)]/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Try It Yourself</h3>
                    <p className="text-[var(--color-text-secondary)] max-w-sm mx-auto mb-6">Launch the demo and use these shortcuts to navigate like a pro</p>
                    <Button onClick={() => setShowDemo(true)} icon={<ArrowRight className="h-4 w-4" />} iconPosition="right">
                      Launch Demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/10 via-transparent to-[var(--color-accent)]/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Ready for the Full Experience?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              The browser demo is just a taste. Install Mahoe 29 Alpha to get the complete desktop environment with all applications, 
              hardware acceleration, and deep system integration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/downloads">
                <Button size="lg" icon={<Download className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                  Download Alpha
                </Button>
              </a>
              <Button size="lg" variant="outline" onClick={() => setShowDemo(true)} className="min-w-[200px]">
                Try Demo First
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop Demo Modal */}
      <Modal
        isOpen={showDemo}
        onClose={() => { setShowDemo(false); setDemoFullscreen(false); }}
        title="Mahoe 29 Desktop Demo"
        description="Interactive simulation of the Mahoe desktop environment. Press F11 for fullscreen."
        size="full"
        showCloseButton={!demoFullscreen}
      >
        <div className={cn('h-[calc(100vh-200px)] min-h-[500px]', demoFullscreen && 'h-[calc(100vh-80px)]')}>
          <div className="h-full w-full">
            <DesktopSimulation onClose={() => { setShowDemo(false); setDemoFullscreen(false); }} />
          </div>
        </div>
      </Modal>

      {/* Shortcuts Modal */}
      <Modal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        title="Keyboard Shortcuts"
        size="lg"
      >
        <div className="space-y-3 max-h-[500px] overflow-y-auto">
          {keyboardShortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg">
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, i) => (
                  <React.Fragment key={i}>
                    <kbd className="px-2 py-1 text-xs font-mono bg-[var(--color-surface-tertiary)] rounded border border-[var(--color-border-primary)]">{key}</kbd>
                    {i < shortcut.keys.length - 1 && <span className="text-[var(--color-text-tertiary)] px-1">+</span>}
                  </React.Fragment>
                ))}
              </div>
              <span className="text-sm text-[var(--color-text-secondary)]">{shortcut.action}</span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
}

function Keyboard({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M6 16h.01M10 16h.01M14 16h.01M18 16h.01" />
    </svg>
  );
}