'use client';

import React from 'react';
import Link from 'next/link';
import { GitBranch, Send, MessageSquare, Mail, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const footerLinks = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Explore Mahoe', href: '/explore' },
    { name: 'Downloads', href: '/downloads' },
    { name: 'System Requirements', href: '/requirements' },
    { name: 'Release Notes', href: '/news' },
  ],
  resources: [
    { name: 'Documentation', href: '/documentation' },
    { name: 'Installation Guide', href: '/documentation/installation' },
    { name: 'Customization', href: '/documentation/customization' },
    { name: 'Troubleshooting', href: '/documentation/troubleshooting' },
    { name: 'FAQ', href: '/documentation/faq' },
  ],
  community: [
    { name: 'GitHub', href: 'https://github.com/mahoe-os/mahoe-29', external: true },
    { name: 'Discord', href: 'https://discord.gg/mahoe', external: true },
    { name: 'Twitter', href: 'https://twitter.com/mahoeos', external: true },
    { name: 'Report Issue', href: 'https://github.com/mahoe-os/mahoe-29/issues', external: true },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Licenses', href: '/licenses' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/mahoe-os/mahoe-29', icon: GitBranch },
  { name: 'Twitter', href: 'https://twitter.com/mahoeos', icon: Send },
  { name: 'Discord', href: 'https://discord.gg/mahoe', icon: MessageSquare },
  { name: 'Email', href: 'mailto:hello@mahoeos.org', icon: Mail },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-[var(--color-text-primary)] hover:opacity-80 transition-opacity" aria-label="Mahoe 29 Home">
              <svg className="h-8 w-8 text-[var(--color-accent)]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="currentColor"/>
                <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold text-xl tracking-tight">Mahoe 29</span>
            </Link>
            <p className="mt-4 text-sm text-[var(--color-text-secondary)] max-w-xs">
              A premium Linux-based operating system built on Kubuntu 26.04, featuring a sophisticated macOS-inspired desktop environment.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={cn(
                    'p-2 rounded-lg text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]',
                    'hover:bg-[var(--color-surface-hover)] transition-colors',
                    social.external && 'cursor-pointer'
                  )}
                  aria-label={social.name}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                >
                  <social.icon className="h-5 w-5" />
                  {social.external && <ExternalLink className="h-3 w-3 ml-1 opacity-50" />}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <nav aria-label="Product links">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources links">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Community */}
          <nav aria-label="Community links">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Community</h3>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {link.name}
                    <ExternalLink className="h-3 w-3 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal links">
            <h3 className="font-semibold text-[var(--color-text-primary)] mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border-primary)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[var(--color-text-tertiary)]">
              © {new Date().getFullYear()} Mahoe OS. Built with care for the Linux community.
            </p>
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-tertiary)]">
              <span>v0.1.0-alpha</span>
              <span className="px-2 py-0.5 bg-[var(--color-accent-light)] text-[var(--color-accent)] rounded-full text-xs font-medium">
                Preview
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}