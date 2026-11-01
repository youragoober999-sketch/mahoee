'use client';

import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot, children, ...props }, ref) => {
    const variants = {
      default: 'bg-[var(--color-accent-light)] text-[var(--color-accent)] border border-[var(--color-accent)]/30',
      success: 'bg-[var(--color-success)]/15 text-[var(--color-success)] border border-[var(--color-success)]/30',
      warning: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)] border border-[var(--color-warning)]/30',
      error: 'bg-[var(--color-error)]/15 text-[var(--color-error)] border border-[var(--color-error)]/30',
      info: 'bg-[var(--color-info)]/15 text-[var(--color-info)] border border-[var(--color-info)]/30',
      outline: 'bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border-primary)]',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-2.5 py-1 text-xs gap-1.5',
      lg: 'px-3 py-1.5 text-sm gap-2',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full border',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && (
          <span className={cn(
            'rounded-full',
            variant === 'default' && 'bg-[var(--color-accent)]',
            variant === 'success' && 'bg-[var(--color-success)]',
            variant === 'warning' && 'bg-[var(--color-warning)]',
            variant === 'error' && 'bg-[var(--color-error)]',
            variant === 'info' && 'bg-[var(--color-info)]',
            variant === 'outline' && 'bg-[var(--color-text-tertiary)]',
            size === 'sm' && 'w-1.5 h-1.5',
            size === 'md' && 'w-2 h-2',
            size === 'lg' && 'w-2.5 h-2.5',
          )} />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };

// Avatar component
export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
  fallback?: React.ReactNode;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const colors = [
  'bg-[var(--color-accent)]',
  'bg-[var(--color-success)]',
  'bg-[var(--color-warning)]',
  'bg-[var(--color-error)]',
  'bg-[var(--color-info)]',
  'bg-[var(--color-accent)]/80',
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = 'md', shape = 'circle', fallback, ...props }, ref) => {
    const sizes = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-24 h-24 text-2xl',
    };

    const shapeClasses = shape === 'circle' ? 'rounded-full' : 'rounded-lg';

    const [imageError, setImageError] = React.useState(false);

    if (src && !imageError) {
      return (
        <div
          ref={ref}
          className={cn('relative overflow-hidden flex-shrink-0', sizes[size], shapeClasses, className)}
          {...props}
        >
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      );
    }

    const fallbackContent = fallback || (name ? getInitials(name) : '?');
    const bgColor = name ? getColorFromName(name) : 'bg-[var(--color-surface-tertiary)]';
    const textColor = name ? 'text-white' : 'text-[var(--color-text-tertiary)]';

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center flex-shrink-0 font-medium select-none',
          sizes[size],
          shapeClasses,
          bgColor,
          textColor,
          className
        )}
        {...props}
      >
        {fallbackContent}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: AvatarProps['size'];
  children: React.ReactNode;
}

export function AvatarGroup({ className, max = 5, size = 'md', children, ...props }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children);
  const visibleChildren = childrenArray.slice(0, max);
  const remainingCount = childrenArray.length - max;

  return (
    <div className={cn('flex -space-x-2', className)} {...props}>
      {visibleChildren.map((child, index) =>
        React.isValidElement(child) ? (
          React.cloneElement(child as React.ReactElement<AvatarProps>, {
            key: child.key || index,
            size,
            className: cn('border-2 border-[var(--color-bg-primary)]', child.props.className),
          })
        ) : (
          <span key={index}>{child}</span>
        )
      )}
      {remainingCount > 0 && (
        <div
          className={cn(
            'flex items-center justify-center flex-shrink-0 font-medium select-none border-2 border-[var(--color-bg-primary)]',
            size === 'xs' && 'w-6 h-6 text-xs',
            size === 'sm' && 'w-8 h-8 text-sm',
            size === 'md' && 'w-10 h-10 text-base',
            size === 'lg' && 'w-12 h-12 text-lg',
            size === 'xl' && 'w-16 h-16 text-xl',
            size === '2xl' && 'w-24 h-24 text-2xl',
            'rounded-full bg-[var(--color-surface-tertiary)] text-[var(--color-text-secondary)]'
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}