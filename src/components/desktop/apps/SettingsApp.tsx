'use client';

import React, { useState } from 'react';
import { 
  Monitor, Palette, Layout, MousePointerClick, Wifi, Bluetooth, 
  Volume2, Power, User, Shield, Key, HardDrive, Cpu, MemoryStick,
  ChevronLeft, ChevronRight, Check, X, SlidersHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Input, Select } from '@/components/ui';
import { useTheme } from '@/context/ThemeContext';
import { mahoeColors, AccentColor } from '@/lib/design-system';

const settingsCategories = [
  { id: 'appearance', name: 'Appearance', icon: Palette, description: 'Theme, accent colors, wallpapers' },
  { id: 'display', name: 'Display', icon: Monitor, description: 'Resolution, scaling, night light' },
  { id: 'desktop', name: 'Desktop', icon: Layout, description: 'Panels, widgets, animations' },
  { id: 'input', name: 'Input', icon: MousePointerClick, description: 'Keyboard, mouse, touchpad' },
  { id: 'network', name: 'Network', icon: Wifi, description: 'Wi-Fi, Bluetooth, VPN' },
  { id: 'sound', name: 'Sound', icon: Volume2, description: 'Output, input, applications' },
  { id: 'power', name: 'Power', icon: Battery, description: 'Battery, sleep, performance' },
  { id: 'accounts', name: 'Accounts', icon: User, description: 'Users, login, permissions' },
  { id: 'security', name: 'Security', icon: Shield, description: 'Firewall, encryption, keys' },
  { id: 'storage', name: 'Storage', icon: HardDrive, description: 'Disks, partitions, backup' },
  { id: 'about', name: 'About', icon: Info, description: 'System info, updates, license' },
];

const wallpapers = [
  { id: 'default', name: 'Mahoe Default', preview: 'bg-gradient-to-br from-[#0d1b2a] via-[#1b2a3a] to-[#0d1b2a]' },
  { id: 'dark', name: 'Midnight', preview: 'bg-[#0a0a0f]' },
  { id: 'blue', name: 'Ocean', preview: 'bg-gradient-to-br from-[#0c1a3a] to-[#1a3a5c]' },
  { id: 'green', name: 'Forest', preview: 'bg-gradient-to-br from-[#0a2a1a] to-[#1a4a2c]' },
  { id: 'purple', name: 'Twilight', preview: 'bg-gradient-to-br from-[#1a0a2a] to-[#3a1a4c]' },
  { id: 'gradient', name: 'Aurora', preview: 'bg-gradient-to-br from-[#0a1a2a] via-[#1a0a2a] to-[#2a1a0a]' },
];

const accentOptions: { id: AccentColor; name: string; color: string }[] = [
  { id: 'default', name: 'Mahoe Blue', color: mahoeColors.accents.default.DEFAULT },
  { id: 'emerald', name: 'Emerald', color: mahoeColors.accents.emerald.DEFAULT },
  { id: 'amber', name: 'Amber', color: mahoeColors.accents.amber.DEFAULT },
  { id: 'rose', name: 'Rose', color: mahoeColors.accents.rose.DEFAULT },
  { id: 'violet', name: 'Violet', color: mahoeColors.accents.violet.DEFAULT },
  { id: 'cyan', name: 'Cyan', color: mahoeColors.accents.cyan.DEFAULT },
];

export function SettingsApp({ onClose }: { onClose: () => void }) {
  const { theme, resolvedMode, setMode, setAccent, setReducedMotion } = useTheme();
  const [activeCategory, setActiveCategory] = useState('appearance');
  const [animationsEnabled, setAnimationsEnabled] = useState(!theme.reducedMotion);
  const [wallpaper, setWallpaper] = useState('default');
  const [panelPosition, setPanelPosition] = useState<'bottom' | 'top' | 'left' | 'right'>('bottom');
  const [panelSize, setPanelSize] = useState(48);

  const category = settingsCategories.find(c => c.id === activeCategory);

  return (
    <div className="flex h-full bg-[var(--color-bg-primary)]">
      {/* Sidebar */}
      <aside className="w-56 border-r border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] flex flex-col">
        <div className="p-4 border-b border-[var(--color-border-primary)]">
          <h2 className="font-semibold text-[var(--color-text-primary)]">Settings</h2>
        </div>
        <nav className="flex-1 overflow-y-auto p-2" role="navigation" aria-label="Settings categories">
          <ul className="space-y-1">
            {settingsCategories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
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
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-3 border-t border-[var(--color-border-primary)] text-xs text-[var(--color-text-tertiary)]">
          Mahoe 29 Alpha · Based on Kubuntu 26.04 LTS
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">{category?.name}</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">{category?.description}</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
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

          {activeCategory === 'display' && (
            <DisplaySettings />
          )}

          {activeCategory === 'desktop' && (
            <DesktopSettings 
              panelPosition={panelPosition}
              setPanelPosition={setPanelPosition}
              panelSize={panelSize}
              setPanelSize={setPanelSize}
              animationsEnabled={animationsEnabled}
              setAnimationsEnabled={setAnimationsEnabled}
            />
          )}

          {activeCategory === 'input' && (
            <InputSettings />
          )}

          {activeCategory === 'network' && (
            <NetworkSettings />
          )}

          {activeCategory === 'sound' && (
            <SoundSettings />
          )}

          {activeCategory === 'power' && (
            <PowerSettings />
          )}

          {activeCategory === 'accounts' && (
            <AccountsSettings />
          )}

          {activeCategory === 'security' && (
            <SecuritySettings />
          )}

          {activeCategory === 'storage' && (
            <StorageSettings />
          )}

          {activeCategory === 'about' && (
            <AboutSettings />
          )}

          {!category && (
            <div className="text-center py-12 text-[var(--color-text-tertiary)]">
              <SlidersHorizontal className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Select a category from the sidebar</p>
            </div>
          )}
        </div>
      </div>
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
    <div className="max-w-4xl space-y-8">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred color scheme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'dark', name: 'Dark', icon: <Monitor className="h-5 w-5" />, preview: 'bg-[#0d0d0f] border-[#2a2a33]' },
              { id: 'light', name: 'Light', icon: <Monitor className="h-5 w-5" />, preview: 'bg-[#fafafa] border-[#e4e4e7]' },
              { id: 'system', name: 'System', icon: <Monitor className="h-5 w-5" />, preview: 'bg-gradient-to-r from-[#0d0d0f] to-[#fafafa] border-[#2a2a33]' },
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
          <CardDescription>Customize the highlight color used throughout the system</CardDescription>
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
          <CardTitle>Wallpaper</CardTitle>
          <CardDescription>Choose a desktop background</CardDescription>
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
          <CardDescription>Control system-wide animation behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Enable Animations</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Smooth transitions and motion effects throughout the system</p>
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
              <p className="text-sm text-[var(--color-text-tertiary)]">Minimize animations for accessibility (overrides above)</p>
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

function DisplaySettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Resolution & Scaling</CardTitle>
          <CardDescription>Configure display resolution and UI scaling</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Resolution</label>
              <Select
                options={[
                  { value: '1920x1080', label: '1920 × 1080 (Full HD)' },
                  { value: '2560x1440', label: '2560 × 1440 (QHD)' },
                  { value: '3840x2160', label: '3840 × 2160 (4K UHD)' },
                  { value: 'auto', label: 'Auto-detect' },
                ]}
                value="auto"
                onChange={() => {}}
                placeholder="Select resolution"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Scale Factor</label>
              <Select
                options={[
                  { value: '100', label: '100%' },
                  { value: '125', label: '125%' },
                  { value: '150', label: '150%' },
                  { value: '175', label: '175%' },
                  { value: '200', label: '200%' },
                  { value: 'auto', label: 'Auto' },
                ]}
                value="auto"
                onChange={() => {}}
                placeholder="Select scale"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Night Light</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Reduce blue light at night for better sleep</p>
            </div>
            <Button variant="outline" className="min-w-[80px]">Off</Button>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Refresh Rate</CardTitle>
          <CardDescription>Configure display refresh rate</CardDescription>
        </CardHeader>
        <CardContent>
          <Select
            options={[
              { value: '60', label: '60 Hz' },
              { value: '75', label: '75 Hz' },
              { value: '120', label: '120 Hz' },
              { value: '144', label: '144 Hz' },
              { value: 'auto', label: 'Auto (Recommended)' },
            ]}
            value="auto"
            onChange={() => {}}
            placeholder="Select refresh rate"
          />
        </CardContent>
      </Card>
    </div>
  );
}

function DesktopSettings({ panelPosition, setPanelPosition, panelSize, setPanelSize, animationsEnabled, setAnimationsEnabled }: any) {
  return (
    <div className="max-w-4xl space-y-8">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Panel Position</CardTitle>
          <CardDescription>Choose where the main panel appears</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {[
              { id: 'bottom', name: 'Bottom', icon: <ChevronDown className="h-6 w-6" /> },
              { id: 'top', name: 'Top', icon: <ChevronDown className="h-6 w-6 rotate-180" /> },
              { id: 'left', name: 'Left', icon: <ChevronRight className="h-6 w-6 rotate-90" /> },
              { id: 'right', name: 'Right', icon: <ChevronRight className="h-6 w-6 rotate-270" /> },
            ].map((pos) => (
              <button
                key={pos.id}
                type="button"
                onClick={() => setPanelPosition(pos.id as any)}
                className={cn(
                  'relative p-6 rounded-xl border-2 transition-all duration-200 text-center',
                  'hover:shadow-[var(--shadow-lg)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                  panelPosition === pos.id
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-light)] shadow-[var(--shadow-glow)]'
                    : 'border-[var(--color-border-primary)] bg-[var(--color-surface-primary)]'
                )}
              >
                <div className="text-[var(--color-accent)] mb-2">{pos.icon}</div>
                <span className="font-medium text-[var(--color-text-primary)]">{pos.name}</span>
                {panelPosition === pos.id && (
                  <Check className="absolute top-3 right-3 h-5 w-5 text-[var(--color-accent)]" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Panel Size</CardTitle>
          <CardDescription>Adjust the thickness of the panel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="32"
              max="64"
              step="4"
              value={panelSize}
              onChange={(e) => setPanelSize(Number(e.target.value))}
              className="flex-1 h-2 bg-[var(--color-border-primary)] rounded-full appearance-none accent-[var(--color-accent)]"
            />
            <span className="text-[var(--color-text-primary)] font-mono min-w-[3rem] text-right">{panelSize}px</span>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Window Animations</CardTitle>
          <CardDescription>Configure window opening/closing animations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Window Animations</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Animate windows when opening, closing, minimizing</p>
            </div>
            <Button variant={animationsEnabled ? 'primary' : 'outline'} onClick={() => setAnimationsEnabled(!animationsEnabled)} className="min-w-[80px]">
              {animationsEnabled ? 'On' : 'Off'}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Minimize Animation</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Animation style when minimizing windows</p>
            </div>
            <Select
              options={[
                { value: 'scale', label: 'Scale' },
                { value: 'slide', label: 'Slide' },
                { value: 'fade', label: 'Fade' },
                { value: 'genie', label: 'Genie' },
              ]}
              value="scale"
              onChange={() => {}}
              placeholder="Select animation"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InputSettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Keyboard</CardTitle>
          <CardDescription>Keyboard layout, repeat rate, shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Select
              options={[
                { value: 'us', label: 'English (US)' },
                { value: 'uk', label: 'English (UK)' },
                { value: 'de', label: 'German' },
                { value: 'fr', label: 'French' },
                { value: 'es', label: 'Spanish' },
              ]}
              value="us"
              onChange={() => {}}
              placeholder="Keyboard Layout"
              label="Layout"
            />
            <Select
              options={[
                { value: 'default', label: 'Default' },
                { value: 'fast', label: 'Fast' },
                { value: 'slow', label: 'Slow' },
              ]}
              value="default"
              onChange={() => {}}
              placeholder="Repeat Rate"
              label="Key Repeat Rate"
            />
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Mouse & Touchpad</CardTitle>
          <CardDescription>Pointer speed, scrolling, gestures</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">Pointer Speed</label>
            <input type="range" min="1" max="10" value={5} className="w-full h-2 bg-[var(--color-border-primary)] rounded-full appearance-none accent-[var(--color-accent)]" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Natural Scrolling</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Content moves in the direction of your fingers</p>
            </div>
            <Button variant="outline" className="min-w-[80px]">Off</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Tap to Click</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Tap the touchpad to click</p>
            </div>
            <Button variant="primary" className="min-w-[80px]">On</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function NetworkSettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Wi-Fi</CardTitle>
          <CardDescription>Manage wireless network connections</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Wi-Fi</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Enable or disable wireless networking</p>
            </div>
            <Button variant="primary" className="min-w-[80px]">On</Button>
          </div>
          <div className="border-t border-[var(--color-border-primary)] pt-4">
            <p className="font-medium text-[var(--color-text-primary)] mb-3">Available Networks</p>
            <div className="space-y-2">
              {['Mahoe-Network', 'HomeWiFi', 'Guest-Network', 'Office-5G'].map((net) => (
                <div key={net} className="flex items-center justify-between p-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
                      <Wifi className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{net}</p>
                      <p className="text-sm text-[var(--color-text-tertiary)]">WPA2 · Strong signal</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Connect</Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Bluetooth</CardTitle>
          <CardDescription>Manage Bluetooth devices</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Bluetooth</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Enable or disable Bluetooth</p>
            </div>
            <Button variant="primary" className="min-w-[80px]">On</Button>
          </div>
          <div className="border-t border-[var(--color-border-primary)] pt-4">
            <p className="font-medium text-[var(--color-text-primary)] mb-3">Paired Devices</p>
            <div className="space-y-2">
              {['MX Master 3', 'AirPods Pro', 'Sony WH-1000XM4'].map((dev) => (
                <div key={dev} className="flex items-center justify-between p-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
                      <Bluetooth className="h-5 w-5 text-[var(--color-accent)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{dev}</p>
                      <p className="text-sm text-[var(--color-text-tertiary)]">Connected</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Disconnect</Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SoundSettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Output Device</CardTitle>
          <CardDescription>Select where to play sound</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {['Built-in Audio', 'HDMI Display', 'USB Headset', 'Bluetooth Headphones'].map((dev) => (
              <label key={dev} className="flex items-center justify-between p-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg cursor-pointer hover:border-[var(--color-border-secondary)]">
                <div className="flex items-center gap-3">
                  <input type="radio" name="output" className="h-4 w-4 accent-[var(--color-accent)]" />
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">{dev}</p>
                    <p className="text-sm text-[var(--color-text-tertiary)]">Stereo · Ready</p>
                  </div>
                </div>
                <div className="h-8 w-20 bg-[var(--color-surface-tertiary)] rounded-full relative">
                  <div className="absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow-md transition-transform" style={{ transform: 'translateX(80%)' }} />
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Input Device</CardTitle>
          <CardDescription>Select microphone for recording</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {['Built-in Microphone', 'USB Microphone', 'Headset Microphone'].map((dev) => (
              <label key={dev} className="flex items-center justify-between p-3 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg cursor-pointer hover:border-[var(--color-border-secondary)]">
                <div className="flex items-center gap-3">
                  <input type="radio" name="input" className="h-4 w-4 accent-[var(--color-accent)]" />
                  <div>
                    <p className="font-medium text-[var(--color-text-primary)]">{dev}</p>
                    <p className="text-sm text-[var(--color-text-tertiary)]">Mono · Ready</p>
                  </div>
                </div>
                <div className="h-8 w-20 bg-[var(--color-surface-tertiary)] rounded-full relative">
                  <div className="absolute top-1 left-1 h-6 w-6 bg-white rounded-full shadow-md transition-transform" style={{ transform: 'translateX(60%)' }} />
                </div>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PowerSettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Power Profile</CardTitle>
          <CardDescription>Choose performance vs battery life balance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'performance', name: 'Performance', desc: 'Maximum performance, higher power use', icon: <Cpu className="h-6 w-6" /> },
              { id: 'balanced', name: 'Balanced', desc: 'Balance performance and power saving', icon: <SlidersHorizontal className="h-6 w-6" /> },
              { id: 'power-saver', name: 'Power Saver', desc: 'Extended battery life, reduced performance', icon: <Battery className="h-6 w-6" /> },
            ].map((profile) => (
              <button
                key={profile.id}
                type="button"
                className={cn(
                  'p-4 rounded-xl border-2 transition-all duration-200 text-center',
                  'hover:shadow-[var(--shadow-lg)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
                  profile.id === 'balanced'
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent-light)] shadow-[var(--shadow-glow)]'
                    : 'border-[var(--color-border-primary)] bg-[var(--color-surface-primary)]'
                )}
              >
                <div className="text-[var(--color-accent)] mb-2">{profile.icon}</div>
                <span className="font-medium text-[var(--color-text-primary)] block mb-1">{profile.name}</span>
                <span className="text-sm text-[var(--color-text-tertiary)]">{profile.desc}</span>
                {profile.id === 'balanced' && (
                  <Check className="absolute top-3 right-3 h-5 w-5 text-[var(--color-accent)]" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Sleep & Screen</CardTitle>
          <CardDescription>Configure automatic sleep and screen blanking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Select
              options={[
                { value: 'never', label: 'Never' },
                { value: '5', label: '5 minutes' },
                { value: '15', label: '15 minutes' },
                { value: '30', label: '30 minutes' },
                { value: '60', label: '1 hour' },
              ]}
              value="15"
              onChange={() => {}}
              placeholder="Screen blank"
              label="Screen Blank After"
            />
            <Select
              options={[
                { value: 'never', label: 'Never' },
                { value: '30', label: '30 minutes' },
                { value: '60', label: '1 hour' },
                { value: '120', label: '2 hours' },
              ]}
              value="30"
              onChange={() => {}}
              placeholder="Sleep"
              label="Sleep After"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AccountsSettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>Manage user accounts and login settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl">
              <div className="h-16 w-16 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                <User className="h-8 w-8 text-[var(--color-accent)]" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-[var(--color-text-primary)]">Live User</h3>
                <p className="text-sm text-[var(--color-text-tertiary)]">Standard User · Auto-login enabled</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Login Options</CardTitle>
          <CardDescription>Configure how you sign in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Automatic Login</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Skip the login screen on boot</p>
            </div>
            <Button variant="primary" className="min-w-[80px]">On</Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Require Password on Wake</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Lock screen when system wakes from sleep</p>
            </div>
            <Button variant="outline" className="min-w-[80px]">Off</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Firewall</CardTitle>
          <CardDescription>Manage firewall rules and protection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Firewall Status</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">Active protection against unauthorized connections</p>
            </div>
            <Button variant="primary" className="min-w-[80px]">Active</Button>
          </div>
          <Button variant="outline" className="w-full justify-start">Configure Rules</Button>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Encryption</CardTitle>
          <CardDescription>Disk encryption and security keys</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Full Disk Encryption</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">LUKS2 encryption on system partition</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-[var(--color-success)]/15 text-[var(--color-success)] rounded-full">Enabled</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-[var(--color-text-primary)]">Secure Boot</p>
              <p className="text-sm text-[var(--color-text-tertiary)]">UEFI Secure Boot verification</p>
            </div>
            <span className="px-3 py-1 text-xs font-medium bg-[var(--color-warning)]/15 text-[var(--color-warning)] rounded-full">Not Enrolled</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StorageSettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Storage Overview</CardTitle>
          <CardDescription>View disk usage and manage partitions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'OS Disk (nvme0n1)', size: '256 GB', used: '45 GB', free: '211 GB', type: 'SSD (NVMe)', mount: '/' },
              { name: 'Data Drive (sda1)', size: '1 TB', used: '234 GB', free: '766 GB', type: 'HDD', mount: '/home' },
              { name: 'USB Drive (sdb1)', size: '32 GB', used: '2.1 GB', free: '29.9 GB', type: 'USB 3.0', mount: '/media/usb' },
            ].map((disk) => (
              <div key={disk.mount} className="p-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <HardDrive className="h-6 w-6 text-[var(--color-text-tertiary)]" />
                    <div>
                      <p className="font-medium text-[var(--color-text-primary)]">{disk.name}</p>
                      <p className="text-sm text-[var(--color-text-tertiary)]">{disk.type} · Mounted at {disk.mount}</p>
                    </div>
                  </div>
                  <span className="text-sm text-[var(--color-text-secondary)]">{disk.used} / {disk.size}</span>
                </div>
                <div className="h-2 bg-[var(--color-border-primary)] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300" 
                    style={{ width: `${(parseFloat(disk.used) / parseFloat(disk.size)) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[var(--color-text-tertiary)] mt-1">
                  <span>{disk.free} free</span>
                  <span>{Math.round((parseFloat(disk.used) / parseFloat(disk.size)) * 100)}% used</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AboutSettings() {
  return (
    <div className="max-w-4xl space-y-8">
      <Card variant="elevated">
        <CardContent className="pt-8 text-center">
          <div className="h-20 w-20 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12">
              <rect width="32" height="32" rx="8" fill="currentColor"/>
              <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">Mahoe 29</h1>
          <p className="text-[var(--color-text-secondary)] mb-1">Version 0.1.0-alpha</p>
          <p className="text-[var(--color-text-tertiary)] mb-6">Based on Kubuntu 26.04 LTS (Noble Numbat)</p>
          <div className="flex justify-center gap-4 text-sm text-[var(--color-text-tertiary)]">
            <span>KDE Plasma 6.1</span>
            <span>·</span>
            <span>Linux Kernel 6.8</span>
            <span>·</span>
            <span>Wayland</span>
          </div>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div><dt className="text-[var(--color-text-tertiary)]">OS</dt><dd className="font-medium text-[var(--color-text-primary)]">Mahoe 29 Alpha</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Base</dt><dd className="font-medium text-[var(--color-text-primary)]">Kubuntu 26.04 LTS</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Kernel</dt><dd className="font-medium text-[var(--color-text-primary)]">Linux 6.8.0-generic</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Desktop</dt><dd className="font-medium text-[var(--color-text-primary)]">KDE Plasma 6.1</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Display Server</dt><dd className="font-medium text-[var(--color-text-primary)]">Wayland (X11 fallback)</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Architecture</dt><dd className="font-medium text-[var(--color-text-primary)]">x86_64</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Build Date</dt><dd className="font-medium text-[var(--color-text-primary)]">November 2026</dd></div>
            <div><dt className="text-[var(--color-text-tertiary)]">Support</dt><dd className="font-medium text-[var(--color-text-primary)]">5 Years (LTS)</dd></div>
          </dl>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader>
          <CardTitle>Legal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Mahoe 29 is free and open-source software licensed under the GPL-3.0 license.
            It includes software from the Ubuntu archive, KDE Plasma, and many other open-source projects.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" size="sm">View Licenses</Button>
            <Button variant="ghost" size="sm">Privacy Policy</Button>
            <Button variant="ghost" size="sm">Report Bug</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Missing imports
import { Battery, Info } from 'lucide-react';