'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Heart, Code, GitBranch, 
  Award, Target, Lightbulb, Globe,
  Calendar, Shield, Terminal, 
  Coffee, Music, Palette,
  Check, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/components/ui';

const teamMembers = [
  {
    name: 'Alexandra Chen',
    role: 'Founder & Lead Designer',
    bio: 'Former Apple Human Interface designer. Obsessed with typography, motion, and pixel-perfect details.',
    avatar: 'AC',
    social: { github: 'alexchen', twitter: 'alexchen_design' },
  },
  {
    name: 'Marcus Weber',
    role: 'Kernel & Systems Engineer',
    bio: 'Linux kernel contributor. Specializes in scheduler tuning, memory management, and hardware enablement.',
    avatar: 'MW',
    social: { github: 'mweber', twitter: 'marcus_kernel' },
  },
  {
    name: 'Sofia Andersson',
    role: 'Plasma Developer',
    bio: 'KDE Plasma core developer. Maintains KWin Wayland and writes custom KWin scripts for Mahoe.',
    avatar: 'SA',
    social: { github: 'sofiaandersson', twitter: 'sofia_kde' },
  },
  {
    name: 'James Okafor',
    role: 'Developer Experience',
    bio: 'Former VS Code team. Builds the pre-configured development environment and container tooling.',
    avatar: 'JO',
    social: { github: 'jokafor', twitter: 'james_devx' },
  },
  {
    name: 'Priya Sharma',
    role: 'Documentation & Community',
    bio: 'Technical writer and community manager. Makes complex topics accessible and builds welcoming communities.',
    avatar: 'PS',
    social: { github: 'priyasharma', twitter: 'priya_docs' },
  },
  {
    name: 'Diego Santos',
    role: 'Packaging & Release Engineering',
    bio: 'Debian/Ubuntu packaging expert. Manages the build pipeline, repositories, and release automation.',
    avatar: 'DS',
    social: { github: 'dsantos', twitter: 'diego_pkg' },
  },
];

const values = [
  { icon: Heart, title: 'Craft Over Features', desc: 'We\'d rather ship one beautifully polished feature than ten half-baked ones. Every pixel, animation, and interaction is intentional.' },
  { icon: Code, title: 'Upstream First', desc: 'We contribute to KDE, systemd, PipeWire, and the Linux kernel. Your improvements to Mahoe improve the entire ecosystem.' },
  { icon: Users, title: 'Community Driven', desc: 'Mahoe exists because of its community. Decisions are made transparently on GitHub and Discord. Everyone has a voice.' },
  { icon: Target, title: 'Opinionated Defaults', desc: 'Beautiful, coherent, and usable out of the box. But every single choice can be changed — we never lock you in.' },
  { icon: Lightbulb, title: 'Innovation Through Refinement', desc: 'We don\'t chase trends. We refine proven technologies until they feel inevitable. The best interface is the one you forget exists.' },
  { icon: Shield, title: 'Long-Term Stability', desc: 'Based on LTS foundations with 5-year support. No breaking changes, no forced upgrades, no surprises.' },
];

const milestones = [
  { year: '2019', title: 'Concept Born', desc: 'Frustration with inconsistent Linux desktops sparks the idea for a cohesive, opinionated Plasma distro.' },
  { year: '2020', title: 'First Prototype', desc: 'Initial theme and configuration layer built as a Kubuntu remix. Shared with friends for feedback.' },
  { year: '2021', title: 'Community Forms', desc: 'Discord server opens. First contributors join. Packaging pipeline established on GitHub Actions.' },
  { year: '2022', title: 'Mahoe 27 Release', desc: 'First public release based on Kubuntu 22.04 LTS. 10,000+ downloads in first month.' },
  { year: '2023', title: 'Plasma 5 → 6 Migration', desc: 'Major rewrite for KDE Plasma 6. New theme engine, Wayland-first, modern graphics stack.' },
  { year: '2024', title: 'Mahoe 28 LTS', desc: 'Based on Kubuntu 24.04 LTS. 5-year support. Developer tooling, container integration, Btrfs snapshots.' },
  { year: '2025', title: 'Infrastructure Scaling', desc: 'CDN for ISOs, mirrored repositories, automated testing, security scanning pipeline.' },
  { year: '2026', title: 'Mahoe 29 Alpha', desc: 'Based on Kubuntu 26.04 LTS. Plasma 6.1, Kernel 6.8, interactive web demo, new website.' },
];

const techStack = [
  { category: 'Desktop', technologies: ['KDE Plasma 6.1', 'KDE Frameworks 6.3', 'Qt 6.7', 'KWin Wayland', 'Breeze (custom)'] },
  { category: 'Base System', technologies: ['Kubuntu 26.04 LTS', 'Linux Kernel 6.8', 'systemd 255', 'glibc 2.39', 'APT 2.7'] },
  { category: 'Graphics', technologies: ['Mesa 24.1', 'Vulkan 1.3', 'OpenGL 4.6', 'DRM/KMS', 'GBM/EGL'] },
  { category: 'Audio', technologies: ['PipeWire 1.0', 'WirePlumber', 'PulseAudio Compat', 'JACK2', 'Bluetooth Audio'] },
  { category: 'Container', technologies: ['Docker 26', 'Podman 5', 'Buildah', 'Distrobox', 'Toolbox'] },
  { category: 'Languages', technologies: ['GCC 13.2', 'Clang 17', 'Rust 1.79', 'Go 1.22', 'Node.js 20 LTS', 'Python 3.12'] },
  { category: 'Build', technologies: ['GitHub Actions', 'Launchpad PPA', 'OBS', 'reprepro', 'debootstrap', 'Calamares'] },
  { category: 'Quality', technologies: ['Clang-Tidy', 'Cppcheck', 'ShellCheck', 'Hadolint', 'Syft', 'Grype', 'Cosign'] },
];

export default function AboutPage() {
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
              <Heart className="h-4 w-4" />
              Built with care by a small team
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-100">
              About Mahoe 29
            </h1>

            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-200">
              A premium Linux-based operating system built on Kubuntu 26.04 LTS, 
              featuring a sophisticated macOS-inspired desktop environment crafted with attention to every detail.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Our Values
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Six principles that guide every decision we make
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={value.title} variant="interactive" className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-3">{value.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              The Team
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              A diverse group of designers, engineers, and community builders from around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <Card key={member.name} variant="interactive" className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0 text-2xl font-bold text-[var(--color-accent)]">
                      {member.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-[var(--color-text-primary)]">{member.name}</h3>
                      <p className="text-sm text-[var(--color-accent)] mb-2">{member.role}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{member.bio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-24 lg:py-32 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              From a personal frustration to a community-driven project
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[var(--color-border-primary)]" />
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-20 pb-12"
              >
                <div className="absolute left-0 top-0 flex items-center justify-center">
                  <div className={cn(
                    'h-4 w-4 rounded-full border-4 flex-shrink-0',
                    index === milestones.length - 1 
                      ? 'bg-[var(--color-accent)] border-[var(--color-accent)]' 
                      : 'bg-[var(--color-bg-secondary)] border-[var(--color-border-primary)]'
                  )} />
                </div>
                <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[var(--color-accent)] font-bold">{milestone.year}</span>
                    <Badge variant="outline" size="sm">{milestone.title}</Badge>
                  </div>
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{milestone.title}</h3>
                  <p className="text-[var(--color-text-secondary)]">{milestone.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Modern, proven technologies that power the Mahoe experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {techStack.map((stack, index) => (
              <Card key={stack.category} variant="outlined" className="animate-in fade-in duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                <CardHeader>
                  <CardTitle>{stack.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {stack.technologies.map(tech => (
                      <li key={tech} className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                        <Check className="h-4 w-4 text-[var(--color-success)] flex-shrink-0" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent)]/10 via-transparent to-[var(--color-accent)]/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6">
                Open Source, Open Community
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] mb-8">
                Mahoe 29 is free and open-source software. The Mahoe customizations are licensed under GPL-3.0. 
                We believe the best software is built in the open, with the community.
              </p>
              <div className="space-y-4">
                {[
                  { icon: GitBranch, title: 'Source Code', desc: 'All customizations on GitHub' },
                  { icon: Globe, title: 'Issue Tracker', desc: 'Bugs, features, discussions' },
                  { icon: Users, title: 'Discord Community', desc: 'Chat, support, showcase' },
                  { icon: Award, title: 'Contributors', desc: 'Join 50+ contributors' },
                ].map(item => (
                  <div key={item.title} className="flex items-center gap-4 p-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl">
                    <div className="h-10 w-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{item.title}</p>
                      <p className="text-sm text-[var(--color-text-tertiary)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <Card variant="elevated">
                <CardContent className="pt-8 text-center">
                  <div className="h-24 w-24 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center mx-auto mb-6">
                    <GitBranch className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">mahoe-os/mahoe-29</h3>
                  <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm mx-auto">
                    The official repository for Mahoe 29 customizations, build scripts, documentation, and website.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                    <Badge variant="outline"><GitBranch className="h-3 w-3 mr-1" /> 2.3k Stars</Badge>
                    <Badge variant="outline"><GitBranch className="h-3 w-3 mr-1" /> 180 Forks</Badge>
                    <Badge variant="outline"><Users className="h-3 w-3 mr-1" /> 50+ Contributors</Badge>
                    <Badge variant="success">GPL-3.0 License</Badge>
                  </div>
                  <a href="https://github.com/mahoe-os/mahoe-29" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" icon={<ExternalLink className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                      View Repository
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Join the Journey
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              Whether you're a designer, developer, writer, translator, or just passionate about Linux — there's a place for you in the Mahoe community.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://discord.gg/mahoe" target="_blank" rel="noopener noreferrer">
                <Button size="lg" icon={<Users className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                  Join Discord
                </Button>
              </a>
              <a href="https://github.com/mahoe-os/mahoe-29" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" icon={<GitBranch className="h-5 w-5" />} iconPosition="right" className="min-w-[200px]">
                  Contribute on GitHub
                </Button>
              </a>
              <a href="/downloads">
                <Button size="lg" variant="ghost" className="min-w-[200px]">
                  Try Mahoe 29
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}