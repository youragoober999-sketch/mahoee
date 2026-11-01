'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  position = 'top',
  delay = 200,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!React.isValidElement(children)) {
    throw new Error('Tooltip children must be a single React element');
  }

  const childWithEvents = React.cloneElement(children, {
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    onTouchStart: showTooltip,
    onTouchEnd: hideTooltip,
  });

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrows = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-[var(--color-surface-tertiary)]',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-[var(--color-surface-tertiary)]',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-[var(--color-surface-tertiary)]',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-[var(--color-surface-tertiary)]',
  };

  const tooltipContent = isVisible ? createPortal(
    <div
      ref={tooltipRef}
      className={cn(
        'fixed z-[700] pointer-events-none',
        positions[position],
        className
      )}
      role="tooltip"
    >
      <div className="bg-[var(--color-surface-tertiary)] text-[var(--color-text-primary)] text-sm px-3 py-1.5 rounded-lg shadow-[var(--shadow-lg)] whitespace-nowrap animate-in fade-in-0 zoom-in-95 duration-150">
        {content}
      </div>
      <div
        className={cn(
          'absolute w-0 h-0 border-4 border-transparent',
          arrows[position]
        )}
      />
    </div>,
    document.body
  ) : null;

  return <>{childWithEvents}{tooltipContent}</>;
}

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export function Separator({ className, orientation = 'horizontal', decorative = true, ...props }: SeparatorProps) {
  return (
    <div
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'bg-[var(--color-border-primary)]',
        orientation === 'horizontal' ? 'w-full h-px' : 'h-full w-px',
        className
      )}
      {...props}
    />
  );
}

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  const baseStyles = 'bg-[var(--color-surface-tertiary)] rounded overflow-hidden';

  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-[shimmer_1.5s_infinite]',
    none: '',
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        animationStyles[animation],
        className
      )}
      style={{
        width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
        height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
      }}
      {...props}
    />
  );
}

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio: number;
  children: React.ReactNode;
}

export function AspectRatio({ ratio, children, className, ...props }: AspectRatioProps) {
  return (
    <div
      className={cn('relative w-full', className)}
      style={{ paddingTop: `${100 / ratio}%` }}
      {...props}
    >
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
}

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {}

export function VisuallyHidden({ children, ...props }: VisuallyHiddenProps) {
  return (
    <span
      className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0"
      style={{
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: '0',
      }}
      {...props}
    >
      {children}
    </span>
  );
}