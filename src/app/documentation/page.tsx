'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Download, Settings, Terminal, 
  HelpCircle, Search, ChevronRight, Check, 
  AlertCircle, Info, ExternalLink, ArrowRight,
  Code, Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge, Separator } from '@/components/ui';

const docSections = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: BookOpen,
    description: 'Installation, first boot, and initial configuration',
    articles: [
      { title: 'Installation Guide', desc: 'Step-by-step installation on hardware and VMs', slug: 'installation', estimatedTime: '10 min' },
      { title: 'Creating Boot Media', desc: 'USB flashing with BalenaEtcher, Rufus, dd, and Ventoy', slug: 'boot-media', estimatedTime: '5 min' },
      { title: 'First Boot Setup', desc: 'Initial configuration wizard and user creation', slug: 'first-boot', estimatedTime: '5 min' },
      { title: 'Post-Install Checklist', desc: 'Drivers, updates, codecs, and essential packages', slug: 'post-install', estimatedTime: '15 min' },
      { title: 'Dual Boot with Windows', desc: 'Safe dual-boot configuration with GRUB', slug: 'dual-boot', estimatedTime: '15 min' },
    ]
  },
  {
    id: 'desktop',
    name: 'Desktop Environment',
    icon: Settings,
    description: 'Mastering the Mahoe Plasma desktop',
    articles: [
      { title: 'Desktop Tour', desc: 'Overview of panels, widgets, launcher, and notifications', slug: 'desktop-tour', estimatedTime: '5 min' },
      { title: 'Window Management', desc: 'Tiling, snapping, virtual desktops, and activities', slug: 'window-management', estimatedTime: '10 min' },
      { title: 'Customizing Appearance', desc: 'Themes, colors, fonts, icons, and cursors', slug: 'appearance', estimatedTime: '10 min' },
      { title: 'Keyboard Shortcuts', desc: 'Default shortcuts, customization, and power tips', slug: 'shortcuts', estimatedTime: '5 min' },
      { title: 'Widgets & Plasmoids', desc: 'Adding, configuring, and creating widgets', slug: 'widgets', estimatedTime: '10 min' },
      { title: 'KWin Scripts', desc: 'Automating window behavior with JavaScript', slug: 'kwin-scripts', estimatedTime: '15 min' },
    ]
  },
  {
    id: 'system',
    name: 'System Administration',
    icon: Terminal,
    description: 'Package management, services, and maintenance',
    articles: [
      { title: 'Package Management (APT)', desc: 'Installing, updating, and removing software', slug: 'apt', estimatedTime: '10 min' },
      { title: 'Flatpak & Snap', desc: 'Using sandboxed applications and managing permissions', slug: 'flatpak-snap', estimatedTime: '10 min' },
      { title: 'Systemd Services', desc: 'Managing services, timers, and boot process', slug: 'systemd', estimatedTime: '15 min' },
      { title: 'Btrfs Snapshots', desc: 'Automatic snapshots, rollbacks, and Snapper', slug: 'btrfs-snapshots', estimatedTime: '10 min' },
      { title: 'Kernel Management', desc: 'Installing kernels, UKI, and boot parameters', slug: 'kernel', estimatedTime: '10 min' },
      { title: 'Backup & Restore', desc: 'Timeshift, Borg, Restic, and rsync strategies', slug: 'backup', estimatedTime: '15 min' },
    ]
  },
  {
    id: 'development',
    name: 'Development Setup',
    icon: Code,
    description: 'Configuring your development environment',
    articles: [
      { title: 'VS Code Configuration', desc: 'Mahoe theme, extensions, settings sync, and debugging', slug: 'vscode', estimatedTime: '10 min' },
      { title: 'Container Development', desc: 'Docker, Podman, Distrobox, and Toolbox workflows', slug: 'containers', estimatedTime: '15 min' },
      { title: 'Language Runtimes', desc: 'Node.js, Python, Rust, Go, Zig with version managers', slug: 'runtimes', estimatedTime: '10 min' },
      { title: 'Database Servers', desc: 'PostgreSQL, MySQL, Redis setup and management', slug: 'databases', estimatedTime: '10 min' },
      { title: 'GPU Compute', desc: 'ROCm, CUDA, OpenCL for ML and compute workloads', slug: 'gpu-compute', estimatedTime: '15 min' },
    ]
  },
  {
    id: 'troubleshooting',
    name: 'Troubleshooting',
    icon: AlertCircle,
    description: 'Common issues and solutions',
    articles: [
      { title: 'Boot Issues', desc: 'GRUB problems, kernel panic, initramfs errors', slug: 'boot-issues', estimatedTime: '10 min' },
      { title: 'Display & Graphics', desc: 'Wayland/X11, NVIDIA, HiDPI, multi-monitor', slug: 'display-issues', estimatedTime: '10 min' },
      { title: 'Audio Problems', desc: 'PipeWire, Bluetooth, microphone, latency', slug: 'audio-issues', estimatedTime: '10 min' },
      { title: 'Network & WiFi', desc: 'Connection drops, DNS, VPN, firewall', slug: 'network-issues', estimatedTime: '10 min' },
      { title: 'Performance Tuning', desc: 'CPU governor, I/O scheduler, ZRAM, swappiness', slug: 'performance', estimatedTime: '15 min' },
    ]
  },
];

const faqs = [
  {
    q: 'Is Mahoe 29 based on Ubuntu or Debian?',
    a: 'Mahoe 29 is based on Kubuntu 26.04 LTS (Noble Numbat), which is itself based on Ubuntu 26.04 LTS. Ubuntu is based on Debian. So the lineage is: Debian → Ubuntu → Kubuntu → Mahoe.'
  },
  {
    q: 'Can I install Mahoe alongside Windows?',
    a: 'Yes, the Calamares installer supports dual-boot detection and configuration. We recommend installing Windows first, then Mahoe. The installer will automatically add Windows to the GRUB boot menu.'
  },
  {
    q: 'Does Mahoe support NVIDIA GPUs?',
    a: 'Yes. The ISO includes the proprietary NVIDIA drivers (550+ series) and the open-source Nouveau driver. During installation, you can choose which driver to install. Wayland works with NVIDIA 550+.'
  },
  {
    q: 'How often are updates released?',
    a: 'Mahoe follows the Kubuntu LTS schedule. You\'ll receive security updates for 5 years (until 2029). Feature updates for the Mahoe customizations (theme, configs, default apps) are released periodically as point releases (e.g., 29.1, 29.2).'
  },
  {
    q: 'Can I use Mahoe on a Mac?',
    a: 'Mahoe supports Apple Silicon (M1/M2/M3) through the Asahi Linux project, but support is experimental. Intel Macs are fully supported. For Apple Silicon, we recommend using the Asahi installer first, then installing Mahoe packages on top.'
  },
  {
    q: 'Is Mahoe completely free and open source?',
    a: 'The Mahoe customizations (theme, configs, scripts, documentation) are licensed under GPL-3.0. The base system (Kubuntu/Ubuntu) includes some non-free firmware and drivers. You can choose a fully free installation by selecting only free software during install.'
  },
  {
    q: 'How do I report a bug?',
    a: 'Please report bugs on our GitHub Issues page. Include: Mahoe version, hardware specs, steps to reproduce, expected vs actual behavior, and relevant logs (journalctl, dmesg). For security issues, email security@mahoeos.org.'
  },
  {
    q: 'Can I contribute to Mahoe?',
    a: 'Absolutely! We welcome contributions: theme improvements, documentation, translations, packaging, testing, and code. Check our GitHub for contribution guidelines. Join our Discord for discussion.'
  },
];

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredSections = docSections.map(section => ({
    ...section,
    articles: section.articles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.articles.length > 0);

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
              Documentation
            </h1>
            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-100">
              Comprehensive guides for installing, configuring, and mastering Mahoe 29. 
              From first boot to advanced development workflows.
            </p>
            
            <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500 delay-200">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-text-tertiary)]" />
                <Input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search documentation..."
                  className="h-12 pl-12 text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Installation', desc: 'Get Mahoe running', icon: Download, href: '#getting-started' },
              { title: 'Desktop Guide', desc: 'Master the interface', icon: Settings, href: '#desktop' },
              { title: 'System Admin', desc: 'Manage your system', icon: Terminal, href: '#system' },
              { title: 'Development', desc: 'Code on Mahoe', icon: Code, href: '#development' },
            ].map(item => (
              <Card key={item.title} variant="interactive" className="h-full">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
                      <p className="text-sm text-[var(--color-text-tertiary)]">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <nav className="space-y-6" aria-label="Documentation navigation">
                {docSections.map(section => (
                  <div key={section.id} className="space-y-2">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                      <section.icon className="h-4 w-4" />
                      {section.name}
                    </h3>
                    <ul className="space-y-1 ml-6 border-l border-[var(--color-border-primary)] pl-3">
                      {section.articles.map(article => (
                        <li key={article.slug}>
                          <a href={`/documentation/${article.slug}`} className="block text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors py-1">
                            {article.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {searchQuery ? (
                <div>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">Search Results</h2>
                  <div className="space-y-4">
                    {filteredSections.flatMap(section => section.articles.map(article => (
                      <Card key={article.slug} variant="outlined" className="group">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                                {article.title}
                              </h3>
                              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{article.desc}</p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-[var(--color-text-tertiary)]">
                                <span>{section.name}</span>
                                <span>·</span>
                                <span>{article.estimatedTime}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )))}
                  </div>
                </div>
              ) : (
                <>
                  {docSections.map((section, index) => (
                    <div key={section.id} id={section.id} className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="h-10 w-10 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
                          <section.icon className="h-5 w-5 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{section.name}</h2>
                          <p className="text-[var(--color-text-secondary)]">{section.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-12">
                        {section.articles.map((article, articleIndex) => (
                          <Card key={article.slug} variant="interactive" className="group h-full animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${articleIndex * 50}ms` }}>
                            <CardContent className="pt-6">
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                                    {article.title}
                                  </h3>
                                  <p className="text-sm text-[var(--color-text-secondary)] mt-1">{article.desc}</p>
                                  <div className="flex items-center gap-3 mt-3 text-xs text-[var(--color-text-tertiary)]">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" />
                                      {article.estimatedTime}
                                    </span>
                                    <Badge variant="outline" size="sm">Read Guide</Badge>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {index < docSections.length - 1 && <Separator className="my-8" />}
                    </div>
                  ))}
                  
                  {/* FAQ Section */}
                  <div id="faq" className="mt-16 animate-in fade-in duration-500">
                    <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                      {faqs.map((faq, index) => (
                        <Card key={index} variant="outlined">
                          <CardContent className="pt-0">
                            <button
                              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                              className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface-primary)]"
                            >
                              <span className="font-medium text-[var(--color-text-primary)] pr-4">{faq.q}</span>
                              <ChevronRight className={cn('h-5 w-5 text-[var(--color-text-tertiary)] flex-shrink-0 transition-transform', expandedFaq === index && 'rotate-90')} />
                            </button>
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: expandedFaq === index ? 'auto' : 0, opacity: expandedFaq === index ? 1 : 0 }}
                              transition={{ duration: 0.2, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-4 border-t border-[var(--color-border-primary)]">
                                <p className="text-[var(--color-text-secondary)]">{faq.a}</p>
                              </div>
                            </motion.div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contribute Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <Card variant="elevated">
            <CardContent className="pt-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
                  Help Improve the Docs
                </h2>
                <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                  Found an error? Want to add a guide? Documentation lives in our GitHub repository and accepts pull requests.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="https://github.com/mahoe-os/mahoe-29/tree/main/docs" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" icon={<ExternalLink className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                      View on GitHub
                    </Button>
                  </a>
                  <a href="https://github.com/mahoe-os/mahoe-29/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" variant="outline" className="min-w-[200px]">
                      Contribution Guide
                    </Button>
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