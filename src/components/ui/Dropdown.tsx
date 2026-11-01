'use client';

import React, { useState, useRef, useEffect, Fragment } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  shortcut?: string;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  onSelect: (value: string) => void;
  selectedValue?: string;
  placement?: 'bottom' | 'top' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
  width?: 'trigger' | 'auto' | number;
  className?: string;
  disabled?: boolean;
}

export function Dropdown({
  trigger,
  items,
  onSelect,
  selectedValue,
  placement = 'bottom',
  align = 'start',
  width = 'trigger',
  className,
  disabled,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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

  const placementStyles = {
    bottom: 'top-full mt-1',
    top: 'bottom-full mb-1',
    left: 'right-full mr-1',
    right: 'left-full ml-1',
  };

  const alignStyles = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  const menuContent = (
    <Fragment>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="w-full"
      >
        {trigger}
      </button>

      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className={cn(
            'fixed z-[600]',
            placementStyles[placement],
            alignStyles[align],
            className
          )}
          style={{
            minWidth: width === 'trigger' ? undefined : width === 'auto' ? undefined : `${width}px`,
          }}
          role="menu"
        >
          <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg shadow-[var(--shadow-lg)] py-1 min-w-[160px] animate-in fade-in-0 zoom-in-95 duration-150">
            {items.map((item, index) => (
              <button
                key={item.value}
                type="button"
                role="menuitem"
                tabIndex={-1}
                onClick={() => {
                  if (!item.disabled) {
                    onSelect(item.value);
                    setIsOpen(false);
                  }
                }}
                disabled={item.disabled}
                className={cn(
                  'w-full px-3 py-2 text-left flex items-center gap-3',
                  'text-sm text-[var(--color-text-primary)]',
                  'hover:bg-[var(--color-surface-hover)]',
                  'focus:outline-none focus:bg-[var(--color-surface-hover)]',
                  'transition-colors duration-150',
                  item.disabled && 'opacity-50 cursor-not-allowed',
                  item.danger && 'text-[var(--color-error)]',
                  selectedValue === item.value && 'bg-[var(--color-accent-light)]'
                )}
              >
                {item.icon && <span className="flex-shrink-0 h-4 w-4">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
                {selectedValue === item.value && <Check className="h-4 w-4 text-[var(--color-accent)] flex-shrink-0" />}
                {item.shortcut && (
                  <kbd className="px-1.5 py-0.5 text-xs text-[var(--color-text-tertiary)] bg-[var(--color-surface-tertiary)] rounded">
                    {item.shortcut}
                  </kbd>
                )}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </Fragment>
  );

  return <>{menuContent}</>;
}

interface SelectDropdownProps {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  'aria-label'?: string;
}

export function SelectDropdown({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  className,
  'aria-label': ariaLabel,
}: SelectDropdownProps) {
  const selectedOption = options.find(o => o.value === value);

  return (
    <Dropdown
      trigger={
        <Button
          variant="outline"
          className={cn('w-full justify-between', className)}
          disabled={disabled}
          aria-label={ariaLabel}
        >
          <span className={cn('truncate', !selectedOption && 'text-[var(--color-text-tertiary)]')}>
            {selectedOption?.label || placeholder || 'Select...'}
          </span>
          <ChevronDown className="h-4 w-4 flex-shrink-0 text-[var(--color-text-tertiary)]" />
        </Button>
      }
      items={options.map(opt => ({
        label: opt.label,
        value: opt.value,
        icon: opt.icon,
      }))}
      onSelect={onChange}
      selectedValue={value}
      disabled={disabled}
    />
  );
}