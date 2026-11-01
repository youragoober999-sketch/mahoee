'use client';

import React, { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn('min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]', className)}>
      <Navigation />
      <main id="main-content" className="pt-16 min-h-[calc(100vh-4rem)]" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}