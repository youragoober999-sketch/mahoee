'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Monitor, Download, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { useTheme } from '@/context/ThemeContext';
import { mahoeColors } from '@/lib/design-system';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Explore Mahoe', href: '/explore' },
  { name: 'Downloads', href: '/downloads' },
  { name: 'Documentation', href: '/documentation' },
  { name: 'About', href: '/about' },
  { name: 'News', href: '/news' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, resolvedMode, toggleMode, setMode } = useTheme();
  const pathname = usePathname();
  const navRef = useRef<HTMLNavElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const themeIcons = {
    dark: Moon,
    light: Sun,
    system: Monitor,
  };

  const themeLabels = {
    dark: 'Dark',
    light: 'Light',
    system: 'System',
  };

  const ThemeIcon = themeIcons[theme.mode];

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-[300] transition-all duration-300',
        scrolled
          ? 'bg-[var(--color-bg-primary)]/90 backdrop-blur-md border-b border-[var(--color-border-primary)] shadow-[var(--shadow-sm)]'
          : 'bg-transparent'
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--color-text-primary)] hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] rounded-lg px-2 py-1"
            aria-label="Mahoe 29 Home"
          >
            <svg
              className="h-8 w-8 text-[var(--color-accent)]"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-semibold text-xl tracking-tight hidden sm:block">Mahoe 29</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'hover:bg-[var(--color-surface-hover)]',
                  pathname === item.href
                    ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMode}
                aria-label={`Current theme: ${themeLabels[theme.mode]}. Click to cycle.`}
                className="relative"
              >
                <ThemeIcon className="h-5 w-5" />
                <span className="sr-only">{themeLabels[theme.mode]}</span>
              </Button>

              {/* Theme Dropdown */}
              <Dropdown
                trigger={<span className="sr-only">Theme options</span>}
                items={[
                  { label: 'Dark', value: 'dark', icon: <Moon className="h-4 w-4" /> },
                  { label: 'Light', value: 'light', icon: <Sun className="h-4 w-4" /> },
                  { label: 'System', value: 'system', icon: <Monitor className="h-4 w-4" /> },
                ]}
                onSelect={setMode}
                selectedValue={theme.mode}
                placement="bottom"
                align="end"
              >
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <ThemeIcon className="h-5 w-5" />
                </Button>
              </Dropdown>
            </div>

            {/* Settings Link */}
            <Link
              href="/settings"
              className="p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </Link>

            {/* Download Button */}
            <Link href="/downloads">
              <Button size="sm" icon={<Download className="h-4 w-4" />}>
                Download
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-[var(--color-border-primary)] animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-3 py-2.5 rounded-lg text-base font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[var(--color-border-primary)] flex items-center gap-3">
                <Link href="/downloads">
                  <Button fullWidth icon={<Download className="h-4 w-4" />} iconPosition="left">
                    Download Mahoe 29
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Simple Dropdown for theme (reusing the concept but inline for simplicity)
function Dropdown({ trigger, items, onSelect, selectedValue, placement = 'bottom', align = 'start' }: {
  trigger: React.ReactElement;
  items: { label: string; value: string; icon?: React.ReactNode }[];
  onSelect: (value: string) => void;
  selectedValue: string;
  placement?: 'bottom' | 'top';
  align?: 'start' | 'end';
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (typeof window === 'undefined') return <>{trigger}</>;

  return (
    <>
      {React.cloneElement(trigger as React.ReactElement<any>, {
        ref: triggerRef,
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        },
      })}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            'fixed z-[600] mt-1',
            placement === 'bottom' ? 'top-full' : 'bottom-full',
            align === 'end' ? 'right-0' : 'left-0'
          )}
        >
          <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg shadow-[var(--shadow-lg)] py-1 min-w-[140px] animate-in fade-in-0 zoom-in-95 duration-150">
            {items.map((item) => (
              <button
                key={item.value}
                type="button"
                role="menuitem"
                tabIndex={-1}
                onClick={() => {
                  onSelect(item.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'w-full px-3 py-2 text-left flex items-center gap-3',
                  'text-sm text-[var(--color-text-primary)]',
                  'hover:bg-[var(--color-surface-hover)]',
                  'focus:outline-none focus:bg-[var(--color-surface-hover)]',
                  selectedValue === item.value && 'bg-[var(--color-accent-light)] text-[var(--color-accent)]'
                )}
              >
                {item.icon && <span className="flex-shrink-0 h-4 w-4">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}