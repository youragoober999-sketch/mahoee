'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronRight, Sun, Moon, Monitor, Palette, MousePointerClick, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { useTheme } from '@/context/ThemeContext';
import { mahoeColors } from '@/lib/design-system';

const accentOptions = [
  { id: 'default', name: 'Mahoe Blue', color: mahoeColors.accents.default.DEFAULT },
  { id: 'emerald', name: 'Emerald', color: mahoeColors.accents.emerald.DEFAULT },
  { id: 'amber', name: 'Amber', color: mahoeColors.accents.amber.DEFAULT },
  { id: 'rose', name: 'Rose', color: mahoeColors.accents.rose.DEFAULT },
  { id: 'violet', name: 'Violet', color: mahoeColors.accents.violet.DEFAULT },
  { id: 'cyan', name: 'Cyan', color: mahoeColors.accents.cyan.DEFAULT },
];

const themeOptions = [
  { id: 'dark', name: 'Dark', icon: Moon, preview: 'bg-[#0d0d0f] border-[#2a2a33]' },
  { id: 'light', name: 'Light', icon: Sun, preview: 'bg-[#fafafa] border-[#e4e4e7]' },
  { id: 'system', name: 'System', icon: Monitor, preview: 'bg-gradient-to-r from-[#0d0d0f] to-[#fafafa] border-[#2a2a33]' },
];

const motionOptions = [
  { id: false, name: 'Full Animations', icon: MousePointerClick, desc: 'Smooth transitions and motion effects' },
  { id: true, name: 'Reduced Motion', icon: MousePointerClick, desc: 'Minimal animations for accessibility' },
];

export function SetupExperience({ onComplete }: { onComplete: () => void }) {
  const { theme, setMode, setAccent, setReducedMotion } = useTheme();
  const [step, setStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const completed = localStorage.getItem('mahoe-setup-complete');
    if (completed) {
      onComplete();
    }
  }, [onComplete]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 z-[800] flex items-center justify-center bg-[var(--color-bg-primary)]">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-[var(--color-accent)] border-t-transparent" />
      </div>
    );
  }

  const steps = [
    {
      title: 'Welcome to Mahoe 29',
      description: 'A premium Linux-based operating system with a sophisticated macOS-inspired desktop environment. Let\'s personalize your experience.',
      icon: (
        <svg className="h-16 w-16 text-[var(--color-accent)]" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="currentColor"/>
          <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Choose Your Theme',
      description: 'Select your preferred color scheme. You can change this anytime in Settings.',
      icon: null,
      content: (
        <div className="grid grid-cols-3 gap-4">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setMode(option.id as 'dark' | 'light' | 'system')}
              className={cn(
                'relative p-4 rounded-xl border-2 transition-all duration-200',
                'hover:shadow-[var(--shadow-lg)] hover:scale-[1.02]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                theme.mode === option.id
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-light)] shadow-[var(--shadow-glow)]'
                  : 'border-[var(--color-border-primary)] bg-[var(--color-surface-primary)]'
              )}
            >
              <div className={cn('h-24 w-full rounded-lg mb-3', option.preview)} />
              <div className="flex items-center justify-center gap-2">
                <option.icon className="h-5 w-5" />
                <span className="font-medium text-[var(--color-text-primary)]">{option.name}</span>
              </div>
              {theme.mode === option.id && (
                <Check className="absolute top-3 right-3 h-5 w-5 text-[var(--color-accent)]" />
              )}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'Choose Accent Color',
      description: 'Pick an accent color for buttons, links, and highlights. This applies across the entire website.',
      icon: null,
      content: (
        <div className="grid grid-cols-3 gap-4">
          {accentOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setAccent(option.id as any)}
              className={cn(
                'relative p-4 rounded-xl border-2 transition-all duration-200',
                'hover:shadow-[var(--shadow-lg)] hover:scale-[1.02]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                theme.accent === option.id
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-light)] shadow-[var(--shadow-glow)]'
                  : 'border-[var(--color-border-primary)] bg-[var(--color-surface-primary)]'
              )}
              style={{ '--accent-color': option.color } as React.CSSProperties}
            >
              <div className="h-20 w-full rounded-lg mb-3 flex items-center justify-center" style={{ backgroundColor: option.color }}>
                <span className="text-white font-semibold text-lg">{option.name.charAt(0)}</span>
              </div>
              <span className="font-medium text-[var(--color-text-primary)]">{option.name}</span>
              {theme.accent === option.id && (
                <Check className="absolute top-3 right-3 h-5 w-5 text-[var(--color-accent)]" />
              )}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'Motion Preferences',
      description: 'Choose your preferred level of animation. Reduced motion minimizes transitions for accessibility.',
      icon: null,
      content: (
        <div className="grid grid-cols-2 gap-4">
          {motionOptions.map((option) => (
            <button
              key={String(option.id)}
              type="button"
              onClick={() => setReducedMotion(option.id)}
              className={cn(
                'relative p-4 rounded-xl border-2 transition-all duration-200',
                'hover:shadow-[var(--shadow-lg)] hover:scale-[1.02]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                theme.reducedMotion === option.id
                  ? 'border-[var(--color-accent)] bg-[var(--color-accent-light)] shadow-[var(--shadow-glow)]'
                  : 'border-[var(--color-border-primary)] bg-[var(--color-surface-primary)]'
              )}
            >
              <div className="flex items-center gap-3">
                <option.icon className="h-6 w-6 text-[var(--color-accent)] flex-shrink-0" />
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">{option.name}</p>
                  <p className="text-sm text-[var(--color-text-tertiary)]">{option.desc}</p>
                </div>
              </div>
              {theme.reducedMotion === option.id && (
                <Check className="absolute top-3 right-3 h-5 w-5 text-[var(--color-accent)]" />
              )}
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'You\'re All Set!',
      description: 'Your preferences have been saved. You can always adjust them in Settings. Enjoy exploring Mahoe 29.',
      icon: (
        <div className="h-16 w-16 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
          <Check className="h-8 w-8 text-[var(--color-accent)]" />
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const isLastStep = step === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      localStorage.setItem('mahoe-setup-complete', 'true');
      onComplete();
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(prev => prev - 1);
    }
  };

  if (typeof window === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 z-[800] flex items-center justify-center p-4 bg-[var(--color-bg-overlay)] backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-2xl shadow-[var(--shadow-xl)] overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
        <div className="p-8">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={cn(
                    'h-2 w-2 rounded-full transition-colors',
                    index < step ? 'bg-[var(--color-accent)]' : index === step ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-primary)]'
                  )} />
                  {index < steps.length - 1 && (
                    <div className={cn(
                      'h-0.5 flex-1 max-w-16 transition-colors',
                      index < step ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-border-primary)]'
                    )} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-[var(--color-text-tertiary)] text-center">
              Step {step + 1} of {steps.length}
            </p>
          </div>

          {/* Step content */}
          <div className="text-center mb-8">
            {currentStep.icon && (
              <div className="mx-auto mb-6">{currentStep.icon}</div>
            )}
            <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] mb-3">
              {currentStep.title}
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              {currentStep.description}
            </p>
          </div>

          {currentStep.content && (
            <div className="mb-8">
              {currentStep.content}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border-primary)]">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 0}
              className="opacity-0 pointer-events-none"
            >
              Back
            </Button>
            <div className="flex-1 flex justify-center" />
            <Button
              onClick={handleNext}
              icon={isLastStep ? null : <ChevronRight className="h-4 w-4" />}
              iconPosition="right"
            >
              {isLastStep ? 'Enter Mahoe' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}