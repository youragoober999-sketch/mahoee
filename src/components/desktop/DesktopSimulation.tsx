'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronUp, ChevronDown, Search, Settings, 
  FolderOpen, Terminal, Monitor, HardDrive, Database, 
  Calendar, Calculator, Code2, Image, Music, HelpCircle,
  Maximize2, Minimize, Circle, Square, LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { Window, DESKTOP_APPS, APP_ICONS } from './Window';
import { NotesApp } from './apps/NotesApp';
import { FileManagerApp } from './apps/FileManagerApp';
import { SettingsApp } from './apps/SettingsApp';
import { CalculatorApp } from './apps/CalculatorApp';
import { TerminalApp } from './apps/TerminalApp';
import { CalendarApp } from './apps/CalendarApp';
import { SystemMonitorApp } from './apps/SystemMonitorApp';
import { AppStoreApp } from './apps/AppStoreApp';

const DESKTOP_ONLY_APPS = ['music', 'images', 'code'];

export function DesktopSimulation({ onClose }: { onClose: () => void }) {
  const [openWindows, setOpenWindows] = useState<Map<string, { 
    id: string; 
    title: string; 
    icon: React.ReactNode;
    component: React.ReactNode;
    minimized: boolean;
    maximized: boolean;
    zIndex: number;
    desktopOnly?: boolean;
  }>>(new Map());
  
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [launcherSearch, setLauncherSearch] = useState('');
  const [showDesktop, setShowDesktop] = useState(false);
  const [wallpaper, setWallpaper] = useState('default');
  const [time, setTime] = useState(new Date());
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: 'desktop' | 'taskbar' } | null>(null);
  const launcherRef = useRef<HTMLDivElement>(null);
  const taskbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (launcherRef.current && !launcherRef.current.contains(e.target as Node)) {
        setLauncherOpen(false);
        setLauncherSearch('');
      }
      setContextMenu(null);
      setShowSidebar(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setLauncherOpen(false);
        setLauncherSearch('');
        setContextMenu(null);
        setShowSidebar(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === ' ') {
        e.preventDefault();
        setLauncherOpen(!launcherOpen);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [launcherOpen]);

  const wallpapers: Record<string, string> = {
    default: 'bg-gradient-to-br from-[#0d1b2a] via-[#1b2a3a] to-[#0d1b2a]',
    dark: 'bg-[#0a0a0f]',
    blue: 'bg-gradient-to-br from-[#0c1a3a] to-[#1a3a5c]',
    green: 'bg-gradient-to-br from-[#0a2a1a] to-[#1a4a2c]',
    purple: 'bg-gradient-to-br from-[#1a0a2a] to-[#3a1a4c]',
    gradient: 'bg-gradient-to-br from-[#0a1a2a] via-[#1a0a2a] to-[#2a1a0a]',
  };

  const getAppComponent = (appId: string) => {
    switch (appId) {
      case 'notes': return <NotesApp onClose={() => closeWindow(appId)} />;
      case 'files': return <FileManagerApp onClose={() => closeWindow(appId)} />;
      case 'settings': return <SettingsApp onClose={() => closeWindow(appId)} />;
      case 'calculator': return <CalculatorApp onClose={() => closeWindow(appId)} />;
      case 'terminal': return <TerminalApp onClose={() => closeWindow(appId)} />;
      case 'calendar': return <CalendarApp onClose={() => closeWindow(appId)} />;
      case 'monitor': return <SystemMonitorApp onClose={() => closeWindow(appId)} />;
      case 'store': return <AppStoreApp onClose={() => closeWindow(appId)} />;
      default: return <div className="p-8 text-center text-[var(--color-text-tertiary)]">App not implemented</div>;
    }
  };

  const openWindow = useCallback((appId: string) => {
    const app = DESKTOP_APPS.find(a => a.id === appId);
    if (!app) return;

    // Check if already open
    if (openWindows.has(appId)) {
      const win = openWindows.get(appId)!;
      if (win.minimized) {
        setOpenWindows(prev => {
          const next = new Map(prev);
          next.set(appId, { ...win, minimized: false, zIndex: Date.now() });
          return next;
        });
      } else {
        setOpenWindows(prev => {
          const next = new Map(prev);
          next.set(appId, { ...win, zIndex: Date.now() });
          return next;
        });
      }
      return;
    }

    // Check if desktop-only app
    if (DESKTOP_ONLY_APPS.includes(appId)) {
      // Show modal for desktop-only apps
      // This would be handled by the parent
      return;
    }

    const newWindow = {
      id: appId,
      title: app.title,
      icon: app.icon,
      component: getAppComponent(appId),
      minimized: false,
      maximized: false,
      zIndex: Date.now(),
      desktopOnly: DESKTOP_ONLY_APPS.includes(appId),
    };

    setOpenWindows(prev => new Map(prev).set(appId, newWindow));
    setLauncherOpen(false);
    setLauncherSearch('');
  }, [openWindows]);

  const closeWindow = useCallback((appId: string) => {
    setOpenWindows(prev => {
      const next = new Map(prev);
      next.delete(appId);
      return next;
    });
  }, []);

  const minimizeWindow = useCallback((appId: string) => {
    setOpenWindows(prev => {
      const next = new Map(prev);
      const win = next.get(appId);
      if (win) next.set(appId, { ...win, minimized: true });
      return next;
    });
  }, []);

  const maximizeWindow = useCallback((appId: string) => {
    setOpenWindows(prev => {
      const next = new Map(prev);
      const win = next.get(appId);
      if (win) next.set(appId, { ...win, maximized: !win.maximized });
      return next;
    });
  }, []);

  const focusWindow = useCallback((appId: string) => {
    setOpenWindows(prev => {
      const next = new Map(prev);
      const win = next.get(appId);
      if (win) next.set(appId, { ...win, zIndex: Date.now() });
      return next;
    });
  }, []);

  const toggleShowDesktop = () => {
    setShowDesktop(prev => !prev);
    if (!showDesktop) {
      setOpenWindows(prev => {
        const next = new Map(prev);
        next.forEach((win, key) => {
          if (!win.minimized) next.set(key, { ...win, minimized: true });
        });
        return next;
      });
    }
  };

  const pinnedApps = ['files', 'terminal', 'browser', 'settings', 'store'];
  const runningApps = Array.from(openWindows.values()).filter(w => !w.minimized).map(w => w.id);

  const taskbarApps = [
    ...pinnedApps.filter(id => !runningApps.includes(id)),
    ...runningApps,
  ].filter((id, index, arr) => arr.indexOf(id) === index);

  const filteredApps = DESKTOP_APPS.filter(app => 
    app.title.toLowerCase().includes(launcherSearch.toLowerCase()) ||
    app.category.toLowerCase().includes(launcherSearch.toLowerCase())
  );

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, type: 'desktop' });
  };

  return (
    <div className="fixed inset-0 z-[200] bg-[var(--color-bg-primary)] flex flex-col" onContextMenu={handleDesktopContextMenu}>
      {/* Desktop Background */}
      <div className={cn('fixed inset-0 relative', wallpapers[wallpaper])}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
        
        {/* Desktop Icons */}
        <div className="absolute top-16 left-16 z-10 flex flex-col gap-4 pointer-events-none">
          {[
            { id: 'home', name: 'Home', icon: FolderOpen },
            { id: 'computer', name: 'Computer', icon: HardDrive },
            { id: 'network', name: 'Network', icon: Database },
            { id: 'trash', name: 'Trash', icon: X },
          ].map(icon => (
            <div 
              key={icon.id} 
              className="pointer-events-auto flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95"
              onDoubleClick={() => { if (icon.id === 'home') openWindow('files'); }}
            >
              <div className="h-14 w-14 rounded-xl bg-[var(--color-surface-primary)]/80 backdrop-blur-sm border border-[var(--color-border-primary)] flex items-center justify-center shadow-lg">
                <icon.icon className="h-7 w-7 text-[var(--color-text-primary)]" />
              </div>
              <span className="text-sm text-white drop-shadow-lg text-center max-w-[80px]">{icon.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Open Windows */}
      <div className="flex-1 relative overflow-hidden pointer-events-none">
        <AnimatePresence mode="popLayout">
          {Array.from(openWindows.values())
            .sort((a, b) => a.zIndex - b.zIndex)
            .map((win) => (
              win.minimized ? null : (
                <motion.div
                  key={win.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="pointer-events-auto"
                  style={{ zIndex: win.zIndex }}
                >
                  <Window
                    id={win.id}
                    title={win.title}
                    icon={win.icon}
                    defaultSize={{ width: 900, height: 650 }}
                    onClose={() => closeWindow(win.id)}
                    onMinimize={() => minimizeWindow(win.id)}
                    onMaximize={() => maximizeWindow(win.id)}
                    isDesktopApp={true}
                  >
                    {win.component}
                  </Window>
                </motion.div>
              )
            ))}
        </AnimatePresence>
      </div>

      {/* Taskbar */}
      <motion.div
        ref={taskbarRef}
        className="fixed bottom-0 left-0 right-0 h-12 bg-[var(--color-surface-primary)]/90 backdrop-blur-md border-t border-[var(--color-border-primary)] z-[300] flex items-center"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="flex items-center justify-between w-full px-2 h-full">
          {/* Start Button */}
          <Button
            variant="ghost"
            size="sm"
            className="h-9 min-w-[48px] rounded-lg flex items-center justify-center gap-2"
            onClick={() => setLauncherOpen(!launcherOpen)}
          >
            <svg className="h-6 w-6 text-[var(--color-accent)]" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Button>

          {/* Pinned & Running Apps */}
          <div className="flex items-center gap-1 flex-1 max-w-3xl mx-4 overflow-x-auto" role="group" aria-label="Running applications">
            {taskbarApps.map(appId => {
              const app = DESKTOP_APPS.find(a => a.id === appId);
              const isRunning = openWindows.has(appId);
              const win = openWindows.get(appId);
              const isMinimized = win?.minimized;
              const isFocused = win && win.zIndex === Math.max(...Array.from(openWindows.values()).map(w => w.zIndex));
              
              if (!app) return null;

              return (
                <Button
                  key={appId}
                  variant={isRunning && !isMinimized ? (isFocused ? 'primary' : 'secondary') : 'ghost'}
                  size="sm"
                  className="h-9 min-w-[40px] max-w-[160px] rounded-lg flex items-center gap-2"
                  onClick={() => {
                    if (isRunning) {
                      if (isMinimized) {
                        setOpenWindows(prev => {
                          const next = new Map(prev);
                          next.set(appId, { ...win!, minimized: false, zIndex: Date.now() });
                          return next;
                        });
                      } else if (isFocused) {
                        minimizeWindow(appId);
                      } else {
                        focusWindow(appId);
                      }
                    } else {
                      openWindow(appId);
                    }
                  }}
                >
                  <app.icon className="h-4 w-4" />
                  {isRunning && !isMinimized && <span className="hidden sm:inline truncate">{app.title}</span>}
                  {isRunning && !isMinimized && <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />}
                </Button>
              );
            })}
          </div>

          {/* System Tray */}
          <div className="flex items-center gap-2 px-2">
            <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg" onClick={toggleShowDesktop} aria-label="Show Desktop">
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg" onClick={() => setShowSidebar(true)} aria-label="Sidebar">
              <ChevronUp className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-[var(--color-border-primary)] mx-1" />
            <div className="text-right text-sm text-[var(--color-text-secondary)]">
              <div className="font-mono tabular-nums">{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
              <div className="text-xs text-[var(--color-text-tertiary)]">{time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            </div>
            <div className="w-px h-6 bg-[var(--color-border-primary)] mx-1" />
            <Button variant="ghost" size="sm" className="h-9 w-9 rounded-lg" onClick={onClose} aria-label="Exit Demo">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Application Launcher */}
      <AnimatePresence>
        {launcherOpen && (
          <motion.div
            ref={launcherRef}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="fixed bottom-12 left-4 right-4 md:left-auto md:w-96 md:bottom-12 z-[400]"
          >
            <div className="bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-2xl shadow-[var(--shadow-xl)] overflow-hidden">
              {/* Search */}
              <div className="p-4 border-b border-[var(--color-border-primary)]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--color-text-tertiary)]" />
                  <input
                    type="text"
                    value={launcherSearch}
                    onChange={e => setLauncherSearch(e.target.value)}
                    placeholder="Search applications..."
                    className="w-full pl-10 pr-4 py-3 bg-[var(--color-surface-secondary)] border border-[var(--color-border-primary)] rounded-xl text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] text-base"
                    autoFocus
                  />
                </div>
              </div>

              {/* Apps Grid */}
              <div className="p-3 max-h-[400px] overflow-y-auto">
                <div className="grid grid-cols-4 gap-2">
                  {filteredApps.map(app => (
                    <button
                      key={app.id}
                      onClick={() => openWindow(app.id)}
                      className={cn(
                        'flex flex-col items-center gap-2 p-3 rounded-xl transition-colors',
                        'hover:bg-[var(--color-surface-hover)]',
                        DESKTOP_ONLY_APPS.includes(app.id) && 'opacity-60'
                      )}
                      disabled={DESKTOP_ONLY_APPS.includes(app.id)}
                    >
                      <div className="h-10 w-10 rounded-lg bg-[var(--color-surface-secondary)] flex items-center justify-center">
                        <app.icon className="h-5 w-5 text-[var(--color-text-primary)]" />
                      </div>
                      <span className="text-sm text-[var(--color-text-primary)] truncate max-w-[60px] text-center">{app.title}</span>
                      {DESKTOP_ONLY_APPS.includes(app.id) && (
                        <Badge variant="outline" size="sm" className="mt-1">Desktop Only</Badge>
                      )}
                    </button>
                  ))}
                  {filteredApps.length === 0 && (
                    <div className="col-span-4 flex flex-col items-center justify-center py-12 text-[var(--color-text-tertiary)]">
                      <Search className="h-8 w-8 mb-2 opacity-50" />
                      <p>No applications found</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 border-t border-[var(--color-border-primary)] flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => openWindow('settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="h-4 w-4 mr-1" />
                    Exit Demo
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Context Menus */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed z-[500] bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg shadow-[var(--shadow-lg)] py-1 min-w-[180px]"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            role="menu"
          >
            {contextMenu.type === 'desktop' && (
              <>
                <button className="w-full px-3 py-2 text-left flex items-center gap-3 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]" onClick={() => { openWindow('files'); setContextMenu(null); }}>
                  <FolderOpen className="h-4 w-4" />
                  Open File Manager
                </button>
                <button className="w-full px-3 py-2 text-left flex items-center gap-3 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]" onClick={() => { openWindow('terminal'); setContextMenu(null); }}>
                  <Terminal className="h-4 w-4" />
                  Open Terminal
                </button>
                <div className="h-px bg-[var(--color-border-primary)] my-1" />
                <button className="w-full px-3 py-2 text-left flex items-center gap-3 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]" onClick={() => { setShowSidebar(true); setContextMenu(null); }}>
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
                <button className="w-full px-3 py-2 text-left flex items-center gap-3 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]" onClick={() => { 
                  const ws = ['default', 'dark', 'blue', 'green', 'purple', 'gradient'];
                  const current = ws.indexOf(wallpaper);
                  setWallpaper(ws[(current + 1) % ws.length]);
                  setContextMenu(null);
                }}>
                  <Image className="h-4 w-4" />
                  Next Wallpaper
                </button>
              </>
            )}
            {contextMenu.type === 'taskbar' && (
              <>
                <button className="w-full px-3 py-2 text-left flex items-center gap-3 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]" onClick={() => { setContextMenu(null); }}>
                  <Settings className="h-4 w-4" />
                  Taskbar Settings
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-0 right-0 bottom-0 w-80 bg-[var(--color-surface-primary)] border-l border-[var(--color-border-primary)] z-[350] flex flex-col shadow-[var(--shadow-xl)]"
          >
            <div className="p-4 border-b border-[var(--color-border-primary)] flex items-center justify-between">
              <h3 className="font-semibold text-[var(--color-text-primary)]">Widgets</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowSidebar(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="p-4 bg-[var(--color-surface-secondary)] rounded-xl">
                <h4 className="font-medium text-[var(--color-text-primary)] mb-2">System Monitor</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-[var(--color-text-tertiary)]">CPU</span><span className="font-mono">42%</span></div>
                  <div className="h-1.5 bg-[var(--color-border-primary)] rounded-full overflow-hidden"><div className="h-full bg-[var(--color-accent)] rounded-full" style={{ width: '42%' }} /></div>
                  <div className="flex justify-between"><span className="text-[var(--color-text-tertiary)]">Memory</span><span className="font-mono">4.2/32 GB</span></div>
                  <div className="h-1.5 bg-[var(--color-border-primary)] rounded-full overflow-hidden"><div className="h-full bg-[var(--color-success)] rounded-full" style={{ width: '13%' }} /></div>
                </div>
              </div>
              <div className="p-4 bg-[var(--color-surface-secondary)] rounded-xl">
                <h4 className="font-medium text-[var(--color-text-primary)] mb-2">Quick Actions</h4>
                <div className="grid grid-cols-2 gap-2">
                  {['files', 'terminal', 'settings', 'calculator'].map(id => {
                    const app = DESKTOP_APPS.find(a => a.id === id);
                    return app ? (
                      <Button key={id} variant="outline" size="sm" className="h-20 flex flex-col gap-1" onClick={() => { openWindow(id); setShowSidebar(false); }}>
                        <app.icon className="h-5 w-5" />
                        <span className="text-xs">{app.title}</span>
                      </Button>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop-Only App Modal */}
      <DesktopOnlyModal apps={DESKTOP_ONLY_APPS} onClose={setShowDesktop} />
    </div>
  );
}

function DesktopOnlyModal({ apps, onClose }: { apps: string[]; onClose: () => void }) {
  // This would be triggered when clicking a desktop-only app
  // For now, we'll handle it inline in the taskbar/apps
  return null;
}

function DesktopOnlyAlert({ appId, onDownload, onCancel }: { appId: string; onDownload: () => void; onCancel: () => void }) {
  const app = DESKTOP_APPS.find(a => a.id === appId);
  if (!app) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-[var(--color-bg-overlay)] backdrop-blur-sm"
    >
      <div className="w-full max-w-md bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-2xl shadow-[var(--shadow-xl)] overflow-hidden">
        <div className="p-6 text-center">
          <div className="h-16 w-16 rounded-2xl bg-[var(--color-warning)]/15 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-[var(--color-warning)]" />
          </div>
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Desktop Exclusive</h3>
          <p className="text-[var(--color-text-secondary)] mb-6">
            <strong>{app.title}</strong> is only available in the full desktop version of Mahoe 29. 
            This application requires deep system integration that isn't possible in the browser demo.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={onCancel} className="min-w-[120px]">
              Stay in Demo
            </Button>
            <Button onClick={onDownload} className="min-w-[120px]">
              Download Mahoe
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}