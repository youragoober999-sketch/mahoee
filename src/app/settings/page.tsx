'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sun, Moon, Monitor, Palette, MousePointerClick, 
  Bell, Shield, Key, User, Database, 
  Trash2, Save, RotateCcw, ExternalLink,
  ChevronDown, ChevronUp, Check, X,
  Download, Upload, RefreshCw, Info,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Badge, Input, Select, Modal } from '@/components/ui';
import { useTheme } from '@/context/ThemeContext';
import { mahoeColors, AccentColor } from '@/lib/design-system';

const accentOptions: { id: AccentColor; name: string; color: string }[] = [
  { id: 'default', name: 'Mahoe Blue', color: mahoeColors.accents.default.DEFAULT },
  { id: 'emerald', name: 'Emerald', color: mahoeColors.accents.emerald.DEFAULT },
  { id: 'amber', name: 'Amber', color: mahoeColors.accents.amber.DEFAULT },
  { id: 'rose', name: 'Rose', color: mahoeColors.accents.rose.DEFAULT },
  { id: 'violet', name: 'Violet', color: mahoeColors.accents.violet.DEFAULT },
  { id: 'cyan', name: 'Cyan', color: mahoeColors.accents.cyan.DEFAULT },
];

const settingsCategories = [
  { id: 'appearance', name: 'Appearance', icon: Palette, description: 'Theme, colors, animations' },
  { id: 'notifications', name: 'Notifications', icon: Bell, description: 'Alerts, sounds, permissions' },
  { id: 'privacy', name: 'Privacy & Security', icon: Shield, description: 'Data, cookies, analytics' },
  { id: 'account', name: 'Account', icon: User, description: 'Profile, preferences, sync' },
  { id: 'advanced', name: 'Advanced', icon: Database, description: 'Developer options, reset' },
];

export default function SettingsPage() {
  const { theme, resolvedMode, setMode, setAccent, setReducedMotion } = useTheme();
  const [activeCategory, setActiveCategory] = useState('appearance');
  const [animationsEnabled, setAnimationsEnabled] = useState(!theme.reducedMotion);
  const [wallpaper, setWallpaper] = useState('default');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [autoUpdateCheck, setAutoUpdateCheck] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportData, setExportData] = useState('');

  const category = settingsCategories.find(c => c.id === activeCategory);

  const wallpapers = [
    { id: 'default', name: 'Mahoe Default', preview: 'bg-gradient-to-br from-[#0d1b2a] via-[#1b2a3a] to-[#0d1b2a]' },
    { id: 'dark', name: 'Midnight', preview: 'bg-[#0a0a0f]' },
    { id: 'blue', name: 'Ocean', preview: 'bg-gradient-to-br from-[#0c1a3a] to-[#1a3a5c]' },
    { id: 'green', name: 'Forest', preview: 'bg-gradient-to-br from-[#0a2a1a] to-[#1a4a2c]' },
    { id: 'purple', name: 'Twilight', preview: 'bg-gradient-to-br from-[#1a0a2a] to-[#3a1a4c]' },
    { id: 'gradient', name: 'Aurora', preview: 'bg-gradient-to-br from-[#0a1a2a] via-[#1a0a2a] to-[#2a1a0a]' },
  ];

  const handleExport = () => {
    const data = {
      theme: theme.mode,
      accent: theme.accent,
      reducedMotion: theme.reducedMotion,
      wallpaper,
      notificationsEnabled,
      analyticsEnabled,
      autoUpdateCheck,
      exportedAt: new Date().toISOString(),
    };
    const json = JSON.stringify(data, null, 2);
    setExportData(json);
    setShowExportModal(true);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        if (data.theme) setMode(data.theme);
        if (data.accent) setAccent(data.accent);
        if (data.reducedMotion !== undefined) setReducedMotion(data.reducedMotion);
        if (data.wallpaper) setWallpaper(data.wallpaper);
        if (data.notificationsEnabled !== undefined) setNotificationsEnabled(data.notificationsEnabled);
        if (data.analyticsEnabled !== undefined) setAnalyticsEnabled(data.analyticsEnabled);
        if (data.autoUpdateCheck !== undefined) setAutoUpdateCheck(data.autoUpdateCheck);
        alert('Settings imported successfully!');
      } catch {
        alert('Invalid settings file');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    setMode('system');
    setAccent('default');
    setReducedMotion(false);
    setWallpaper('default');
    setNotificationsEnabled(true);
    setAnalyticsEnabled(false);
    setAutoUpdateCheck(true);
    setShowResetConfirm(false);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 animate-in slide-in-from-bottom-4 duration-500">
              Settings
            </h1>
            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-100">
              Customize your Mahoe website experience. Theme, accent colors, animations, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Settings Layout */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-56 flex-shrink-0">
              <nav className="space-y-2" aria-label="Settings categories">
                {settingsCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors',
                      'hover:bg-[var(--color-surface-hover)]',
                      activeCategory === cat.id
                        ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    )}
                    role="menuitem"
                    aria-current={activeCategory === cat.id ? 'location' : undefined}
                  >
                    <cat.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </nav>

              {/* Import/Export */}
              <div className="mt-8 p-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl">
                <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Backup & Restore</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" fullWidth onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Settings
                  </Button>
                  <div className="relative">
                    <Button variant="outline" size="sm" fullWidth>
                      <Upload className="h-4 w-4 mr-2" />
                      Import Settings
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">{category?.name}</h2>
                <p className="text-[var(--color-text-secondary)]">{category?.description}</p>
              </div>

              {activeCategory === 'appearance' && (
                <AppearanceSettings 
                  theme={theme} 
                  resolvedMode={resolvedMode}
                  setMode={setMode}
                  setAccent={setAccent}
                  setReducedMotion={setReducedMotion}
                  animationsEnabled={animationsEnabled}
                  setAnimationsEnabled={setAnimationsEnabled}
                  wallpaper={wallpaper}
                  setWallpaper={setWallpaper}
                  accentOptions={accentOptions}
                  wallpapers={wallpapers}
                />
              )}

              {activeCategory === 'notifications' && (
                <NotificationSettings 
                  enabled={notificationsEnabled}
                  setEnabled={setNotificationsEnabled}
                />
              )}

              {activeCategory === 'privacy' && (
                <PrivacySettings 
                  analytics={analyticsEnabled}
                  setAnalytics={setAnalyticsEnabled}
                  autoUpdate={autoUpdateCheck}
                  setAutoUpdate={setAutoUpdateCheck}
                />
              )}

              {activeCategory === 'account' && (
                <AccountSettings />
              )}

              {activeCategory === 'advanced' && (
                <AdvancedSettings 
                  onReset={handleReset}
                  showResetConfirm={showResetConfirm}
                  setShowResetConfirm={setShowResetConfirm}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AppearanceSettings({ 
  theme, resolvedMode, setMode, setAccent, setReducedMotion,
  animationsEnabled, setAnimationsEnabled,
  wallpaper, setWallpaper,
  accentOptions, wallpapers
}: any) {
  return (
    <div className="space-y-8 max-w-4xl">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'dark', name: 'Dark', icon: Moon, preview: 'bg-[#0d0d0f] border-[#2a2a33]' },
              { id: 'light', name: 'Light', icon: Sun, preview: 'bg-[#fafafa] border-[#e4e4e7]' },
              { id: 'system', name: 'System', icon: Monitor, preview: 'bg-gradient-to-r from-[#0d0d0f] to-[#fafafa] border-[#2a2a33]' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setMode(option.id as 'dark' | 'light' | 'system')}
                className={cn(
                  'relative p-4 rounded-xl border-2 transition-all duration-200',
                  'hover:shadow-[var(--shadow-lg)]',
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
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Accent Color</CardTitle>
          <CardDescription>Customize the highlight color used throughout the website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {accentOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setAccent(option.id)}
                className={cn(
                  'relative p-4 rounded-xl border-2 transition-all duration-200',
                  'hover:shadow-[var(--shadow-lg)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                  theme.accent === option.id
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-light)] shadow-[var(--shadow-glow)]'
                    : 'border-[var(--color-border-primary)] bg-[var(--color-surface-primary)]'
                )}
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
        </CardContent>
        </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Desktop Wallpaper Preview</CardTitle>
          <CardDescription>Preview wallpapers available in the full OS</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {wallpapers.map((wp) => (
              <button
                key={wp.id}
                type="button"
                onClick={() => setWallpaper(wp.id)}
                className={cn(
                  'relative aspect-video rounded-xl border-2 transition-all duration-200 overflow-hidden',
                  'hover:shadow-[var(--shadow-lg)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                  wallpaper === wp.id
                    ? 'border-[var(--color-accent)] shadow-[var(--shadow-glow)]'
                    : 'border-[var(--color-border-primary)]'
                )}
              >
                <div className={cn('absolute inset-0', wp.preview)} />
                {wallpaper === wp.id && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Check className="h-8 w-8 text-white" />
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                  <span className="text-sm font-medium text-white truncate block">{wp.name}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Animations</CardTitle>
          <CardDescription>Control animation behavior across the website</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Enable Animations</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Smooth transitions and motion effects</p>
            </div>
            <Button
              variant={animationsEnabled ? 'primary' : 'outline'}
              onClick={() => { setAnimationsEnabled(!animationsEnabled); setReducedMotion(!animationsEnabled); }}
              className="min-w-[80px]"
            >
              {animationsEnabled ? 'On' : 'Off'}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Reduce Motion</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Minimize animations for accessibility</p>
            </div>
            <Button
              variant={theme.reducedMotion ? 'primary' : 'outline'}
              onClick={() => setReducedMotion(!theme.reducedMotion)}
              className="min-w-[80px]"
            >
              {theme.reducedMotion ? 'On' : 'Off'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NotificationSettings({ enabled, setEnabled }: { enabled: boolean; setEnabled: (e: boolean) => void }) {
  return (
    <div className="space-y-8 max-w-4xl">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Control how you receive updates and alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Enable Notifications</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Receive updates about new releases and features</p>
            </div>
            <Button variant={enabled ? 'primary' : 'outline'} onClick={() => setEnabled(!enabled)} className="min-w-[80px]">
              {enabled ? 'On' : 'Off'}
            </Button>
          </div>
          {enabled && (
            <div className="border-t border-[var(--color-border-primary)] pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">Release Announcements</p>
                  <p className="text-sm text-[var(--color-text-tertiary)]">New versions, betas, and security updates</p>
                </div>
                <Button variant="primary" className="min-w-[80px]">On</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">Newsletter</p>
                  <p className="text-sm text-[var(--color-text-tertiary)]">Monthly updates, tips, and community highlights</p>
                </div>
                <Button variant="outline" className="min-w-[80px]">Off</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">Desktop Notifications</p>
                  <p className="text-sm text-[var(--color-text-tertiary)]">Browser notifications for important updates</p>
                </div>
                <Button variant="outline" className="min-w-[80px]" disabled>Unavailable</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function PrivacySettings({ analytics, setAnalytics, autoUpdate, setAutoUpdate }: { 
  analytics: boolean; 
  setAnalytics: (e: boolean) => void;
  autoUpdate: boolean;
  setAutoUpdate: (e: boolean) => void;
}) {
  return (
    <div className="space-y-8 max-w-4xl">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Analytics & Data</CardTitle>
          <CardDescription>Control data collection and usage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Anonymous Usage Analytics</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Help us improve by sharing anonymous usage statistics (no personal data)</p>
            </div>
            <Button variant={analytics ? 'primary' : 'outline'} onClick={() => setAnalytics(!analytics)} className="min-w-[80px]">
              {analytics ? 'On' : 'Off'}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Auto Update Check</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Automatically check for website updates in background</p>
            </div>
            <Button variant={autoUpdate ? 'primary' : 'outline'} onClick={() => setAutoUpdate(!autoUpdate)} className="min-w-[80px]">
              {autoUpdate ? 'On' : 'Off'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Cookies & Storage</CardTitle>
          <CardDescription>Manage local data storage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Essential Cookies</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Required for theme, preferences, and session</p>
            </div>
            <Badge variant="success" size="sm">Always Active</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Preference Cookies</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Theme, accent, animation settings</p>
            </div>
            <Badge variant={analytics ? 'success' : 'outline'} size="sm">{analytics ? 'Active' : 'Inactive'}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Analytics Cookies</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Anonymous usage statistics</p>
            </div>
            <Badge variant={analytics ? 'success' : 'outline'} size="sm">{analytics ? 'Active' : 'Inactive'}</Badge>
          </div>
          <Button variant="outline" onClick={() => { localStorage.removeItem('mahoe-theme'); alert('Cookies cleared. Refresh to reset.'); }}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All Website Data
          </Button>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Legal & Compliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Mahoe website respects your privacy. We collect minimal data necessary for functionality.
            No personal information is collected without explicit consent.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" size="sm"><ExternalLink className="h-4 w-4 mr-1" />Privacy Policy</Button>
            <Button variant="ghost" size="sm"><ExternalLink className="h-4 w-4 mr-1" />Terms of Service</Button>
            <Button variant="ghost" size="sm"><ExternalLink className="h-4 w-4 mr-1" />Cookie Policy</Button>
            <Button variant="ghost" size="sm"><ExternalLink className="h-4 w-4 mr-1" />GDPR Rights</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AccountSettings() {
  return (
    <div className="space-y-8 max-w-4xl">
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Website account and synchronization (coming soon)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 bg-[var(--color-surface-primary)] rounded-xl">
            <div className="h-16 w-16 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
              <User className="h-8 w-8 text-[var(--color-accent)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[var(--color-text-primary)]">Guest User</h3>
              <p className="text-sm text-[var(--color-text-tertiary)]">Not signed in · Local preferences only</p>
            </div>
            <Button variant="outline" size="sm">Sign In</Button>
          </div>
          <p className="text-sm text-[var(--color-text-tertiary)] mt-4">
            Account synchronization, cloud preferences backup, and cross-device settings sync are planned for a future release.
          </p>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Local Preferences</CardTitle>
          <CardDescription>Data stored in your browser</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
              <p className="text-[var(--color-text-tertiary)]">Theme</p>
              <p className="font-mono text-[var(--color-text-primary)]">localStorage</p>
            </div>
            <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
              <p className="text-[var(--color-text-tertiary)]">Accent Color</p>
              <p className="font-mono text-[var(--color-text-primary)]">localStorage</p>
            </div>
            <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
              <p className="text-[var(--color-text-tertiary)]">Animations</p>
              <p className="font-mono text-[var(--color-text-primary)]">localStorage</p>
            </div>
            <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
              <p className="text-[var(--color-text-tertiary)]">Setup Complete</p>
              <p className="font-mono text-[var(--color-text-primary)]">localStorage</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdvancedSettings({ onReset, showResetConfirm, setShowResetConfirm }: { 
  onReset: () => void;
  showResetConfirm: boolean;
  setShowResetConfirm: (e: boolean) => void;
}) {
  return (
    <div className="space-y-8 max-w-4xl">
      <Card variant="outlined" className="border-[var(--color-warning)]/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[var(--color-warning)]/15 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-[var(--color-warning)]" />
            </div>
            <div>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Reset All Settings</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Restore theme, accent, animations, and all preferences to defaults</p>
            </div>
            <Button variant="danger" onClick={() => setShowResetConfirm(true)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Developer Options</CardTitle>
          <CardDescription>Experimental and debugging features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Debug Mode</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Show debug overlays and console logging</p>
            </div>
            <Button variant="outline" className="min-w-[80px]">Off</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Performance Overlay</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Display FPS, memory, render times</p>
            </div>
            <Button variant="outline" className="min-w-[80px]">Off</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Simulate Slow Network</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Throttle API requests for testing</p>
            </div>
            <Button variant="outline" className="min-w-[80px]">Off</Button>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Website Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-[var(--color-text-tertiary)]">Website Version</dt><dd className="font-medium text-[var(--color-text-primary)]">1.0.0-alpha</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Framework</dt><dd className="font-medium text-[var(--color-text-primary)]">Next.js 15</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Styling</dt><dd className="font-medium text-[var(--color-text-primary)]">Tailwind CSS 4</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Deployment</dt><dd className="font-medium text-[var(--color-text-primary)]">Vercel</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Source</dt><dd className="font-medium text-[var(--color-text-primary)]"><a href="https://github.com/mahoe-os/mahoe-29" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)]">GitHub</a></dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">License</dt><dd className="font-medium text-[var(--color-text-primary)]">MIT (website) / GPL-3.0 (OS)</dd></div>
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

// Confirmation Modal
function ResetConfirmModal({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) {
  if (!isOpen) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset All Settings?" size="sm">
      <p className="text-[var(--color-text-secondary)] mb-6">
        This will reset your theme, accent color, animation preferences, and all other settings to their default values. This action cannot be undone.
      </p>
      <div className="flex justify-end gap-3">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm}>
          <Trash2 className="h-4 w-4 mr-2" />
          Reset Everything
        </Button>
      </div>
    </Modal>
  );
}