'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Maximize2, Minimize, ChevronDown, FolderOpen, Terminal, Settings, Calculator, Calendar, Monitor, Database, Music, Image, Code2, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

export interface WindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultSize?: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
  minWidth?: number;
  minHeight?: number;
  maximizable?: boolean;
  minimizable?: boolean;
  closable?: boolean;
  resizable?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isDesktopApp?: boolean;
}

interface WindowState {
  x: number;
  y: number;
  width: number;
  height: number;
  maximized: boolean;
  minimized: boolean;
  zIndex: number;
  focused: boolean;
}

export function Window({
  id,
  title,
  icon,
  children,
  defaultSize = { width: 800, height: 600 },
  defaultPosition,
  minWidth = 400,
  minHeight = 300,
  maximizable = true,
  minimizable = true,
  closable = true,
  resizable = true,
  onClose,
  onMinimize,
  onMaximize,
  isDesktopApp = false,
}: WindowProps) {
  const [state, setState] = useState<WindowState>({
    x: defaultPosition?.x ?? Math.random() * 200 + 100,
    y: defaultPosition?.y ?? Math.random() * 150 + 50,
    width: defaultSize.width,
    height: defaultSize.height,
    maximized: false,
    minimized: false,
    zIndex: 100,
    focused: false,
  });

  const windowRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; startX: number; startY: number } | null>(null);
  const resizeRef = useRef<{ startX: number; startY: number; startWidth: number; startHeight: number; direction: string } | null>(null);
  const prevSizeRef = useRef<{ width: number; height: number } | null>(null);
  const prevPosRef = useRef<{ x: number; y: number } | null>(null);

  const focusWindow = useCallback(() => {
    setState(prev => ({ ...prev, focused: true, zIndex: Date.now() }));
  }, []);

  const handleMouseDown = (e: React.MouseEvent, action: 'drag' | 'resize', direction?: string) => {
    e.stopPropagation();
    focusWindow();

    const rect = windowRef.current?.getBoundingClientRect();
    if (!rect) return;

    if (action === 'drag' && !state.maximized) {
      dragRef.current = {
        x: e.clientX,
        y: e.clientY,
        startX: state.x,
        startY: state.y,
      };
    } else if (action === 'resize' && resizable && !state.maximized) {
      resizeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startWidth: state.width,
        startHeight: state.height,
        direction: direction || 'se',
      };
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragRef.current) {
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      setState(prev => ({
        ...prev,
        x: Math.max(0, Math.min(window.innerWidth - 100, prev.startX + dx)),
        y: Math.max(0, Math.min(window.innerHeight - 40, prev.startY + dy)),
      }));
    } else if (resizeRef.current) {
      const dx = e.clientX - resizeRef.current.startX;
      const dy = e.clientY - resizeRef.current.startY;
      const { startWidth, startHeight, direction } = resizeRef.current;

      setState(prev => {
        let newWidth = startWidth;
        let newHeight = startHeight;

        if (direction.includes('e')) newWidth = Math.max(minWidth, startWidth + dx);
        if (direction.includes('w')) {
          newWidth = Math.max(minWidth, startWidth - dx);
          // Adjust x position when resizing from left
        }
        if (direction.includes('s')) newHeight = Math.max(minHeight, startHeight + dy);
        if (direction.includes('n')) {
          newHeight = Math.max(minHeight, startHeight - dy);
          // Adjust y position when resizing from top
        }

        return { ...prev, width: newWidth, height: newHeight };
      });
    }
  };

  const handleMouseUp = () => {
    dragRef.current = null;
    resizeRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTitleBarDoubleClick = () => {
    if (maximizable) handleMaximize();
  };

  const handleMaximize = () => {
    if (state.maximized) {
      setState(prev => ({
        ...prev,
        maximized: false,
        x: prevPosRef.current?.x ?? prev.x,
        y: prevPosRef.current?.y ?? prev.y,
        width: prevSizeRef.current?.width ?? prev.width,
        height: prevSizeRef.current?.height ?? prev.height,
      }));
    } else {
      prevSizeRef.current = { width: state.width, height: state.height };
      prevPosRef.current = { x: state.x, y: state.y };
      setState(prev => ({
        ...prev,
        maximized: true,
        x: 0,
        y: 0,
        width: window.innerWidth,
        height: window.innerHeight - 48, // Account for taskbar
      }));
      onMaximize?.();
    }
  };

  const handleMinimize = () => {
    setState(prev => ({ ...prev, minimized: true }));
    onMinimize?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  if (state.minimized) return null;

  const style: React.CSSProperties = {
    transform: `translate(${state.x}px, ${state.y}px)`,
    width: state.width,
    height: state.height,
    zIndex: state.zIndex,
  };

  return (
    <div
      ref={windowRef}
      className={cn(
        'fixed select-none transition-all duration-200 ease-out',
        'bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl shadow-[var(--shadow-lg)]',
        'overflow-hidden flex flex-col',
        state.focused ? 'ring-1 ring-[var(--color-border-focus)] shadow-[var(--shadow-glow)]' : '',
        state.maximized && 'rounded-none'
      )}
      style={style}
      onMouseDown={focusWindow}
      role="dialog"
      aria-label={title}
    >
      {/* Title Bar */}
      <div
        className={cn(
          'h-10 flex items-center px-3 gap-2 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-primary)]',
          'cursor-default select-none',
          state.maximized && 'rounded-t-none',
          !state.maximized && resizable && 'cursor-move'
        )}
        onMouseDown={(e) => handleMouseDown(e, 'drag')}
        onDoubleClick={handleTitleBarDoubleClick}
      >
        {/* Window Controls */}
        <div className="flex gap-1.5 mr-2">
          <button
            className="h-3 w-3 rounded-full bg-[var(--color-error)]/80 hover:bg-[var(--color-error)] transition-colors"
            onClick={(e) => { e.stopPropagation(); handleClose(); }}
            aria-label="Close"
            disabled={!closable}
          />
          <button
            className="h-3 w-3 rounded-full bg-[var(--color-warning)]/80 hover:bg-[var(--color-warning)] transition-colors"
            onClick={(e) => { e.stopPropagation(); handleMinimize(); }}
            aria-label="Minimize"
            disabled={!minimizable}
          />
          <button
            className="h-3 w-3 rounded-full bg-[var(--color-success)]/80 hover:bg-[var(--color-success)] transition-colors"
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            aria-label={state.maximized ? 'Restore' : 'Maximize'}
            disabled={!maximizable}
          >
            {state.maximized ? (
              <svg className="h-full w-full text-white" viewBox="0 0 12 12" fill="none">
                <path d="M3 3h6v6H3z" stroke="white" strokeWidth="1.5"/>
                <path d="M6 0h6v6H6z" stroke="white" strokeWidth="1.5" opacity="0.5"/>
                <path d="M0 6h6v6H0z" stroke="white" strokeWidth="1.5" opacity="0.5"/>
              </svg>
            ) : (
              <svg className="h-full w-full text-white" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="1" width="10" height="10" rx="1" stroke="white" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
        </div>

        {/* Icon & Title */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {icon && <span className="flex-shrink-0 h-4 w-4 text-[var(--color-text-secondary)]">{icon}</span>}
          <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">{title}</span>
        </div>

        {/* App Menu (for desktop apps) */}
        {isDesktopApp && (
          <DesktopAppMenu appId={id} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-[var(--color-bg-primary)]" style={{ minHeight: 0 }}>
        {children}
      </div>

      {/* Resize Handles */}
      {resizable && !state.maximized && (
        <>
          <ResizeHandle direction="n" onMouseDown={(e) => handleMouseDown(e, 'resize', 'n')} />
          <ResizeHandle direction="ne" onMouseDown={(e) => handleMouseDown(e, 'resize', 'ne')} />
          <ResizeHandle direction="e" onMouseDown={(e) => handleMouseDown(e, 'resize', 'e')} />
          <ResizeHandle direction="se" onMouseDown={(e) => handleMouseDown(e, 'resize', 'se')} />
          <ResizeHandle direction="s" onMouseDown={(e) => handleMouseDown(e, 'resize', 's')} />
          <ResizeHandle direction="sw" onMouseDown={(e) => handleMouseDown(e, 'resize', 'sw')} />
          <ResizeHandle direction="w" onMouseDown={(e) => handleMouseDown(e, 'resize', 'w')} />
          <ResizeHandle direction="nw" onMouseDown={(e) => handleMouseDown(e, 'resize', 'nw')} />
        </>
      )}
    </div>
  );
}

function ResizeHandle({ direction, onMouseDown }: { direction: string; onMouseDown: (e: React.MouseEvent) => void }) {
  const cursors: Record<string, string> = {
    n: 'ns-resize', s: 'ns-resize',
    e: 'ew-resize', w: 'ew-resize',
    ne: 'nesw-resize', sw: 'nesw-resize',
    nw: 'nwse-resize', se: 'nwse-resize',
  };

  const positions: Record<string, React.CSSProperties> = {
    n: { top: 0, left: 4, right: 4, height: 4, cursor: 'ns-resize' },
    s: { bottom: 0, left: 4, right: 4, height: 4, cursor: 'ns-resize' },
    e: { right: 0, top: 4, bottom: 4, width: 4, cursor: 'ew-resize' },
    w: { left: 0, top: 4, bottom: 4, width: 4, cursor: 'ew-resize' },
    ne: { top: 0, right: 0, width: 8, height: 8, cursor: 'nesw-resize' },
    nw: { top: 0, left: 0, width: 8, height: 8, cursor: 'nwse-resize' },
    se: { bottom: 0, right: 0, width: 8, height: 8, cursor: 'nwse-resize' },
    sw: { bottom: 0, left: 0, width: 8, height: 8, cursor: 'nesw-resize' },
  };

  return (
    <div
      className="absolute"
      style={positions[direction]}
      onMouseDown={onMouseDown}
    />
  );
}

// Desktop App Menu
function DesktopAppMenu({ appId }: { appId: string }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const menuItems = [
    { label: 'New Window', action: 'new-window', icon: <FolderOpen className="h-4 w-4" /> },
    { label: 'New Tab', action: 'new-tab', shortcut: 'Ctrl+T', icon: <FolderOpen className="h-4 w-4" /> },
    { type: 'separator' as const },
    { label: 'Preferences', action: 'preferences', shortcut: 'Ctrl+,', icon: <Settings className="h-4 w-4" /> },
    { type: 'separator' as const },
    { label: 'About', action: 'about', icon: <HelpCircle className="h-4 w-4" /> },
    { label: 'Quit', action: 'quit', shortcut: 'Ctrl+Q', icon: <X className="h-4 w-4" /> },
  ];

  return (
    <div className="relative">
      <button
        className="p-1 rounded-lg hover:bg-[var(--color-surface-hover)] transition-colors"
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <ChevronDown className="h-4 w-4 text-[var(--color-text-tertiary)]" />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="fixed z-[600] mt-1 min-w-[180px] bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg shadow-[var(--shadow-lg)] py-1 animate-in fade-in-0 zoom-in-95 duration-150"
        >
          {menuItems.map((item, index) => {
            if (item.type === 'separator') {
              return <div key={index} className="h-px bg-[var(--color-border-primary)] my-1" />;
            }
            return (
              <button
                key={item.action}
                className="w-full px-3 py-2 text-left flex items-center gap-3 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors"
                onClick={() => { setOpen(false); /* handle action */ }}
              >
                {item.icon && <span className="flex-shrink-0 text-[var(--color-text-tertiary)]">{item.icon}</span>}
                <span className="flex-1">{item.label}</span>
                {item.shortcut && <kbd className="px-1.5 py-0.5 text-xs text-[var(--color-text-tertiary)] bg-[var(--color-surface-tertiary)] rounded">{item.shortcut}</kbd>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// App Icons for Desktop
export const APP_ICONS: Record<string, React.ReactNode> = {
  notes: <FolderOpen className="h-5 w-5" />,
  files: <FolderOpen className="h-5 w-5" />,
  settings: <Settings className="h-5 w-5" />,
  calculator: <Calculator className="h-5 w-5" />,
  terminal: <Terminal className="h-5 w-5" />,
  calendar: <Calendar className="h-5 w-5" />,
  monitor: <Monitor className="h-5 w-5" />,
  store: <Database className="h-5 w-5" />,
  music: <Music className="h-5 w-5" />,
  images: <Image className="h-5 w-5" />,
  code: <Code2 className="h-5 w-5" />,
};

export const DESKTOP_APPS = [
  { id: 'notes', title: 'Notes', icon: APP_ICONS.notes, category: 'Productivity' },
  { id: 'files', title: 'Files', icon: APP_ICONS.files, category: 'System' },
  { id: 'settings', title: 'Settings', icon: APP_ICONS.settings, category: 'System' },
  { id: 'calculator', title: 'Calculator', icon: APP_ICONS.calculator, category: 'Utilities' },
  { id: 'terminal', title: 'Terminal', icon: APP_ICONS.terminal, category: 'Development' },
  { id: 'calendar', title: 'Calendar', icon: APP_ICONS.calendar, category: 'Productivity' },
  { id: 'monitor', title: 'System Monitor', icon: APP_ICONS.monitor, category: 'System' },
  { id: 'store', title: 'App Store', icon: APP_ICONS.store, category: 'System' },
  // Desktop-only apps
  { id: 'music', title: 'Music', icon: APP_ICONS.music, category: 'Media', desktopOnly: true },
  { id: 'images', title: 'Images', icon: APP_ICONS.images, category: 'Media', desktopOnly: true },
  { id: 'code', title: 'Code Editor', icon: APP_ICONS.code, category: 'Development', desktopOnly: true },
];