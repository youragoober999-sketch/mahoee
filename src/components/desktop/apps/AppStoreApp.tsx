'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, Layers, Download, Star, Heart, 
  ChevronLeft, ChevronRight, X, Check, AlertCircle,
  Globe, Code, Gamepad2, Music, Image, Video, Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Card, CardContent, CardHeader, CardTitle, Badge, Input } from '@/components/ui';

const categories = [
  { id: 'all', name: 'All', icon: Layers },
  { id: 'featured', name: 'Featured', icon: Star },
  { id: 'development', name: 'Development', icon: Code },
  { id: 'graphics', name: 'Graphics & Design', icon: Image },
  { id: 'internet', name: 'Internet', icon: Globe },
  { id: 'media', name: 'Audio & Video', icon: Video },
  { id: 'games', name: 'Games', icon: Gamepad2 },
  { id: 'utilities', name: 'Utilities', icon: Settings },
  { id: 'system', name: 'System', icon: Cpu },
];

const demoApps = [
  {
    id: 'firefox',
    name: 'Firefox',
    description: 'Fast, private web browser from Mozilla',
    category: 'internet',
    icon: Globe,
    version: '128.0',
    size: '85 MB',
    rating: 4.8,
    downloads: '1.2M',
    verified: true,
    screenshots: [],
  },
  {
    id: 'vscode',
    name: 'Visual Studio Code',
    description: 'Code editor redefined and optimized for modern web and cloud applications',
    category: 'development',
    icon: Code,
    version: '1.92',
    size: '95 MB',
    rating: 4.9,
    downloads: '2.5M',
    verified: true,
    screenshots: [],
  },
  {
    id: 'gimp',
    name: 'GIMP',
    description: 'Advanced image editor for photo retouching, composition, and authoring',
    category: 'graphics',
    icon: Image,
    version: '2.10.38',
    size: '120 MB',
    rating: 4.6,
    downloads: '890K',
    verified: true,
    screenshots: [],
  },
  {
    id: 'vlc',
    name: 'VLC Media Player',
    description: 'Plays most multimedia files and various streaming protocols',
    category: 'media',
    icon: Video,
    version: '3.0.21',
    size: '45 MB',
    rating: 4.9,
    downloads: '3.1M',
    verified: true,
    screenshots: [],
  },
  {
    id: 'steam',
    name: 'Steam',
    description: 'Digital distribution platform for games and software',
    category: 'games',
    icon: Gamepad2,
    version: '1.0.0',
    size: '2.1 GB',
    rating: 4.7,
    downloads: '1.8M',
    verified: true,
    screenshots: [],
  },
  {
    id: 'libreoffice',
    name: 'LibreOffice',
    description: 'Free and open-source office suite',
    category: 'utilities',
    icon: Settings,
    version: '24.8',
    size: '320 MB',
    rating: 4.5,
    downloads: '1.5M',
    verified: true,
    screenshots: [],
  },
  {
    id: 'obsidian',
    name: 'Obsidian',
    description: 'Private and flexible note-taking app',
    category: 'utilities',
    icon: Settings,
    version: '1.6.5',
    size: '95 MB',
    rating: 4.8,
    downloads: '560K',
    verified: true,
    screenshots: [],
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Voice, video and text communication service',
    category: 'internet',
    icon: Globe,
    version: '0.0.29',
    size: '120 MB',
    rating: 4.6,
    downloads: '2.2M',
    verified: true,
    screenshots: [],
  },
  {
    id: 'blender',
    name: 'Blender',
    description: 'Free and open-source 3D creation suite',
    category: 'graphics',
    icon: Image,
    version: '4.2',
    size: '280 MB',
    rating: 4.9,
    downloads: '780K',
    verified: true,
    screenshots: [],
  },
  {
    id: 'docker',
    name: 'Docker Desktop',
    description: 'Container platform for developers',
    category: 'development',
    icon: Code,
    version: '4.32',
    size: '450 MB',
    rating: 4.7,
    downloads: '1.1M',
    verified: true,
    screenshots: [],
  },
  {
    id: 'spotify',
    name: 'Spotify',
    description: 'Music streaming service',
    category: 'media',
    icon: Music,
    version: '1.2.3',
    size: '180 MB',
    rating: 4.5,
    downloads: '2.8M',
    verified: true,
    screenshots: [],
  },
  {
    id: 'htop',
    name: 'htop',
    description: 'Interactive process viewer',
    category: 'system',
    icon: Cpu,
    version: '3.3.0',
    size: '1.2 MB',
    rating: 4.9,
    downloads: '450K',
    verified: true,
    screenshots: [],
  },
];

export function AppStoreApp({ onClose }: { onClose: () => void }) {
  const [activeCategory, setActiveCategory] = useState('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<typeof demoApps[0] | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filteredApps = useMemo(() => {
    return demoApps.filter(app => {
      const matchesCategory = activeCategory === 'all' || activeCategory === 'featured' || app.category === activeCategory;
      const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const featuredApps = useMemo(() => 
    demoApps.filter(app => ['firefox', 'vscode', 'vlc', 'steam', 'blender', 'docker'].includes(app.id))
  , []);

  return (
    <div className="flex h-full flex-col bg-[var(--color-bg-primary)]">
      {/* Toolbar */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-[var(--color-text-primary)]">App Store</h2>
          <div className="w-px h-6 bg-[var(--color-border-primary)]" />
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-tertiary)]" />
            <Input
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search apps..."
              className="h-8 pl-10 text-sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex border border-[var(--color-border-primary)] rounded-lg overflow-hidden">
            <Button variant="ghost" size="sm" onClick={() => setView('grid')} className={view === 'grid' ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}><Grid className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => setView('list')} className={view === 'list' ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}><List className="h-4 w-4" /></Button>
          </div>
          <Button variant="ghost" size="sm" className="hidden sm:flex"><Heart className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Category Sidebar */}
      <div className="h-12 flex items-center px-4 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] overflow-x-auto">
        <div className="flex gap-2 whitespace-nowrap">
          {categories.map(cat => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className="whitespace-nowrap"
            >
              <cat.icon className="h-4 w-4 mr-1" />
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeCategory === 'featured' && (
          <>
            {/* Featured Banner */}
            <div className="mb-6 relative aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-accent)]/20 to-[var(--color-accent)]/5 border border-[var(--color-border-primary)]">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="text-center max-w-2xl">
                  <div className="h-20 w-20 rounded-2xl bg-[var(--color-accent)] flex items-center justify-center mx-auto mb-4">
                    <Code className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Visual Studio Code</h3>
                  <p className="text-[var(--color-text-secondary)] mb-4">Code editing. Redefined. Build and debug modern web and cloud applications.</p>
                  <Button size="lg" icon={<Download className="h-5 w-5" />}>Install</Button>
                </div>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="space-y-8">
              {['development', 'internet', 'media', 'graphics', 'games', 'utilities', 'system'].map(catId => {
                const cat = categories.find(c => c.id === catId);
                const catApps = demoApps.filter(a => a.category === catId).slice(0, 6);
                if (catApps.length === 0) return null;
                return (
                  <div key={catId} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text-primary)]">
                        {cat && cat.icon && <cat.icon className="h-5 w-5 text-[var(--color-accent)]" />}
                        {cat?.name}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {catApps.map(app => <AppCard key={app.id} app={app} onClick={() => setSelectedApp(app)} />)}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeCategory !== 'featured' && (
          <div className={view === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4' : 'space-y-3'}>
            {filteredApps.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-[var(--color-text-tertiary)]">
                <Search className="h-12 w-12 mb-4 opacity-50" />
                <p>No apps found matching your criteria</p>
              </div>
            ) : (
              filteredApps.map(app => view === 'grid' ? (
                <AppCard key={app.id} app={app} onClick={() => setSelectedApp(app)} />
              ) : (
                <AppListItem key={app.id} app={app} onClick={() => setSelectedApp(app)} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function AppCard({ app, onClick }: { app: typeof demoApps[0]; onClick: () => void }) {
  return (
    <Card variant="interactive" onClick={onClick} className="h-full flex flex-col">
      <CardContent className="pt-6 flex-1 flex flex-col">
        <div className="h-16 w-16 rounded-xl bg-[var(--color-surface-tertiary)] flex items-center justify-center mb-4 mx-auto">
          <app.icon className="h-8 w-8 text-[var(--color-accent)]" />
        </div>
        <h4 className="font-semibold text-[var(--color-text-primary)] text-center mb-1">{app.name}</h4>
        <p className="text-sm text-[var(--color-text-tertiary)] text-center mb-3 line-clamp-2 flex-1">{app.description}</p>
        <div className="flex items-center justify-center gap-2 mb-3">
          <Badge variant="outline" size="sm">{app.version}</Badge>
          <Badge variant="outline" size="sm">{app.size}</Badge>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
            <Star className="h-3.5 w-3.5 fill-current text-[var(--color-warning)]" />
            {app.rating}
          </span>
          {app.verified && (
            <Badge variant="success" size="sm" dot>Verified</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function AppListItem({ app, onClick }: { app: typeof demoApps[0]; onClick: () => void }) {
  return (
    <Card variant="interactive" onClick={onClick} padding="sm" className="flex items-center gap-4">
      <div className="h-12 w-12 rounded-lg bg-[var(--color-surface-tertiary)] flex items-center justify-center flex-shrink-0">
        <app.icon className="h-6 w-6 text-[var(--color-accent)]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-[var(--color-text-primary)] truncate">{app.name}</h4>
          {app.verified && <Badge variant="success" size="sm" dot>Verified</Badge>}
        </div>
        <p className="text-sm text-[var(--color-text-tertiary)] truncate mt-0.5">{app.description}</p>
        <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-text-tertiary)]">
          <span>{app.version}</span>
          <span>{app.size}</span>
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-current text-[var(--color-warning)]" />
            {app.rating}
          </span>
        </div>
      </div>
      <Button variant="primary" size="sm" className="whitespace-nowrap">Install</Button>
    </Card>
  );
}

// Missing imports
import { Grid, List, Cpu } from 'lucide-react';