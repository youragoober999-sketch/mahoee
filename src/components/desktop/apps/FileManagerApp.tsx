'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  FolderOpen, File, FileText, Image, Music, Video, Code, Archive, 
  ChevronRight, ChevronDown, Search, Home, HardDrive, Download,
  Grid, List, MoreVertical, Copy, Trash2, Edit2, Plus, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Input } from '@/components/ui';

interface FileItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  size?: number;
  modified: number;
  extension?: string;
  children?: FileItem[];
  parentId?: string;
}

const getFileIcon = (item: FileItem) => {
  if (item.type === 'folder') return <FolderOpen className="h-5 w-5 text-[var(--color-warning)]" />;
  
  const ext = item.extension?.toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) return <Image className="h-5 w-5 text-[var(--color-accent)]" />;
  if (['mp3', 'wav', 'flac', 'ogg', 'm4a'].includes(ext || '')) return <Music className="h-5 w-5 text-[var(--color-rose)]" />;
  if (['mp4', 'mkv', 'webm', 'mov', 'avi'].includes(ext || '')) return <Video className="h-5 w-5 text-[var(--color-violet)]" />;
  if (['js', 'ts', 'jsx', 'tsx', 'py', 'rs', 'go', 'cpp', 'c', 'h', 'json', 'html', 'css'].includes(ext || '')) return <Code className="h-5 w-5 text-[var(--color-emerald)]" />;
  if (['zip', 'tar', 'gz', 'rar', '7z'].includes(ext || '')) return <Archive className="h-5 w-5 text-[var(--color-amber)]" />;
  if (['txt', 'md', 'pdf', 'doc', 'docx'].includes(ext || '')) return <FileText className="h-5 w-5 text-[var(--color-text-secondary)]" />;
  return <File className="h-5 w-5 text-[var(--color-text-tertiary)]" />;
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

// Mock filesystem
const createMockFilesystem = (): FileItem[] => [
  {
    id: 'home',
    name: 'home',
    type: 'folder',
    modified: Date.now() - 86400000,
    children: [
      {
        id: 'user',
        name: 'user',
        type: 'folder',
        modified: Date.now() - 43200000,
        parentId: 'home',
        children: [
          {
            id: 'documents',
            name: 'Documents',
            type: 'folder',
            modified: Date.now() - 21600000,
            parentId: 'user',
            children: [
              { id: 'readme', name: 'README.md', type: 'file', size: 2048, modified: Date.now() - 86400000, extension: 'md', parentId: 'documents' },
              { id: 'license', name: 'LICENSE', type: 'file', size: 1024, modified: Date.now() - 172800000, extension: 'txt', parentId: 'documents' },
              { id: 'changelog', name: 'CHANGELOG.md', type: 'file', size: 4096, modified: Date.now() - 3600000, extension: 'md', parentId: 'documents' },
            ]
          },
          {
            id: 'downloads',
            name: 'Downloads',
            type: 'folder',
            modified: Date.now() - 3600000,
            parentId: 'user',
            children: [
              { id: 'iso', name: 'mahoe-29-alpha.iso', type: 'file', size: 2147483648, modified: Date.now() - 7200000, extension: 'iso', parentId: 'downloads' },
              { id: 'checksum', name: 'SHA256SUMS', type: 'file', size: 512, modified: Date.now() - 7200000, extension: 'txt', parentId: 'downloads' },
            ]
          },
          {
            id: 'pictures',
            name: 'Pictures',
            type: 'folder',
            modified: Date.now() - 86400000,
            parentId: 'user',
            children: [
              { id: 'wallpaper', name: 'mahoe-wallpaper.png', type: 'file', size: 5242880, modified: Date.now() - 86400000, extension: 'png', parentId: 'pictures' },
              { id: 'logo', name: 'mahoe-logo.svg', type: 'file', size: 15360, modified: Date.now() - 86400000, extension: 'svg', parentId: 'pictures' },
            ]
          },
          {
            id: 'music',
            name: 'Music',
            type: 'folder',
            modified: Date.now() - 86400000,
            parentId: 'user',
            children: [
              { id: 'track1', name: 'Mahoe Theme.ogg', type: 'file', size: 3145728, modified: Date.now() - 86400000, extension: 'ogg', parentId: 'music' },
            ]
          },
          {
            id: 'videos',
            name: 'Videos',
            type: 'folder',
            modified: Date.now() - 86400000,
            parentId: 'user',
            children: []
          },
          {
            id: 'dev',
            name: 'Development',
            type: 'folder',
            modified: Date.now() - 10800000,
            parentId: 'user',
            children: [
              { id: 'mahoe-web', name: 'mahoe-website', type: 'folder', modified: Date.now() - 3600000, parentId: 'dev', children: [] },
              { id: 'mahoe-de', name: 'mahoe-desktop', type: 'folder', modified: Date.now() - 7200000, parentId: 'dev', children: [] },
            ]
          },
        ]
      }
    ]
  },
  {
    id: 'root',
    name: '/',
    type: 'folder',
    modified: Date.now() - 86400000,
    children: [
      { id: 'etc', name: 'etc', type: 'folder', modified: Date.now() - 86400000, parentId: 'root', children: [] },
      { id: 'usr', name: 'usr', type: 'folder', modified: Date.now() - 86400000, parentId: 'root', children: [] },
      { id: 'var', name: 'var', type: 'folder', modified: Date.now() - 86400000, parentId: 'root', children: [] },
      { id: 'opt', name: 'opt', type: 'folder', modified: Date.now() - 86400000, parentId: 'root', children: [] },
      { id: 'tmp', name: 'tmp', type: 'folder', modified: Date.now() - 3600000, parentId: 'root', children: [] },
    ]
  },
  {
    id: 'media',
    name: 'Media',
    type: 'folder',
    modified: Date.now() - 86400000,
    children: []
  }
];

function findItem(items: FileItem[], id: string): FileItem | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItem(item.children, id);
      if (found) return found;
    }
  }
  return null;
}

function findParent(items: FileItem[], id: string, parent?: FileItem): FileItem | null {
  for (const item of items) {
    if (item.id === id) return parent || null;
    if (item.children) {
      const found = findParent(item.children, id, item);
      if (found) return found;
    }
  }
  return null;
}

function getPath(items: FileItem[], id: string): string[] {
  const parent = findParent(items, id);
  if (!parent) return [id];
  return [...getPath(items, parent.id), id];
}

export function FileManagerApp({ onClose }: { onClose: () => void }) {
  const [filesystem] = useState<FileItem[]>(createMockFilesystem);
  const [currentPath, setCurrentPath] = useState<string[]>(['home', 'user']);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [showHidden, setShowHidden] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const renameInputRef = useRef<HTMLInputElement>(null);

  const getCurrentFolder = () => {
    let folder: FileItem | null = null;
    for (const id of currentPath) {
      folder = findItem(filesystem, id);
      if (!folder) break;
    }
    return folder;
  };

  const currentFolder = getCurrentFolder();
  const items = currentFolder?.children?.filter(item => showHidden || !item.name.startsWith('.')) || [];

  const navigateTo = (id: string) => {
    const path = getPath(filesystem, id);
    setCurrentPath(path);
    setSelectedItems(new Set());
  };

  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(prev => prev.slice(0, -1));
      setSelectedItems(new Set());
    }
  };

  const handleSelection = (id: string, e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      setSelectedItems(prev => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
    } else if (e.shiftKey && selectedItems.size > 0) {
      // Range selection would go here
    } else {
      setSelectedItems(new Set([id]));
    }
  };

  const handleDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateTo(item.id);
    }
  };

  const startRename = (item: FileItem) => {
    setRenamingId(item.id);
    setRenameValue(item.name);
    setTimeout(() => renameInputRef.current?.focus(), 0);
  };

  const finishRename = (item: FileItem) => {
    if (renameValue.trim() && renameValue !== item.name) {
      // In a real app, this would update the filesystem
      console.log('Rename', item.id, 'to', renameValue);
    }
    setRenamingId(null);
    setRenameValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent, item: FileItem) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (item.type === 'folder') navigateTo(item.id);
    } else if (e.key === 'F2') {
      e.preventDefault();
      startRename(item);
    } else if (e.key === 'Delete') {
      e.preventDefault();
      // Delete action
    }
  };

  const currentLocation = currentPath.map(id => findItem(filesystem, id)?.name || id).join(' / ');

  return (
    <div className="flex h-full flex-col bg-[var(--color-bg-primary)]">
      {/* Toolbar */}
      <div className="h-10 flex items-center gap-2 px-3 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={navigateUp} aria-label="Go up" disabled={currentPath.length <= 1}>
            <ChevronRight className="h-4 w-4 rotate-180" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setCurrentPath(['home', 'user'])} aria-label="Home">
            <Home className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-px h-6 bg-[var(--color-border-primary)] mx-1" />
        <div className="flex-1 max-w-md px-2 py-1 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg text-sm text-[var(--color-text-secondary)] truncate">
          {currentLocation}
        </div>
        <div className="w-px h-6 bg-[var(--color-border-primary)] mx-1" />
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} aria-label="Grid view" className={viewMode === 'grid' ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} aria-label="List view" className={viewMode === 'list' ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowHidden(!showHidden)} aria-label={showHidden ? 'Hide hidden files' : 'Show hidden files'} className={showHidden ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : ''}>
            <Info className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Address Bar */}
      <div className="h-10 flex items-center px-3 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
        <Input
          value={currentLocation}
          onChange={() => {}}
          readOnly
          className="h-8 text-sm bg-[var(--color-surface-primary)]"
          placeholder="Path"
        />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div
          className={cn(
            'border-r border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] flex flex-col transition-all duration-200',
            'resize-x overflow-auto min-w-[180px] max-w-[400px]'
          )}
          style={{ width: sidebarWidth }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              const startX = e.clientX;
              const startWidth = sidebarWidth;
              const move = (ev: MouseEvent) => setSidebarWidth(Math.max(180, Math.min(400, startWidth + ev.clientX - startX)));
              const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
              document.addEventListener('mousemove', move);
              document.addEventListener('mouseup', up);
            }
          }}
        >
          <div className="p-3 border-b border-[var(--color-border-primary)]">
            <h4 className="font-medium text-[var(--color-text-secondary)] text-xs uppercase tracking-wider mb-2">Places</h4>
            <nav>
              <ul className="space-y-1" role="navigation">
                {[
                  { id: 'home', name: 'Home', icon: Home },
                  { id: 'root', name: 'Root', icon: HardDrive },
                  { id: 'downloads', name: 'Downloads', icon: Download },
                  { id: 'media', name: 'Media', icon: HardDrive },
                ].map((place) => {
                  const isActive = currentPath.includes(place.id);
                  return (
                    <li key={place.id}>
                      <button
                        onClick={() => { const item = findItem(filesystem, place.id); if (item) navigateTo(item.id); }}
                        className={cn(
                          'w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors',
                          'hover:bg-[var(--color-surface-hover)]',
                          isActive ? 'bg-[var(--color-accent-light)] text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                        )}
                        role="menuitem"
                        aria-current={isActive ? 'location' : undefined}
                      >
                        <place.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate">{place.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          <div className="p-3 border-b border-[var(--color-border-primary)]">
            <h4 className="font-medium text-[var(--color-text-secondary)] text-xs uppercase tracking-wider mb-2">Devices</h4>
            <ul className="space-y-1">
              <li>
                <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors">
                  <HardDrive className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">OS Disk (256 GB)</span>
                </button>
              </li>
              <li>
                <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] transition-colors">
                  <Download className="h-4 w-4 flex-shrink-0" />
                  <span className="truncate">USB Drive (32 GB)</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* File List */}
        <div className="flex-1 flex flex-col min-w-0">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[var(--color-text-tertiary)] p-8">
              <FolderOpen className="h-16 w-16 mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-1">This folder is empty</h3>
              <p className="text-sm">Right-click to create new files or folders</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3" role="list">
                {items.map((item) => (
                  <FileGridItem
                    key={item.id}
                    item={item}
                    selected={selectedItems.has(item.id)}
                    renaming={renamingId === item.id}
                    renameValue={renameValue}
                    onSelect={(e) => handleSelection(item.id, e)}
                    onDoubleClick={() => handleDoubleClick(item)}
                    onRenameStart={() => startRename(item)}
                    onRenameFinish={() => finishRename(item)}
                    onRenameChange={setRenameValue}
                    renameInputRef={renameInputRef}
                    onKeyDown={(e) => handleKeyDown(e, item)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              <table className="w-full border-collapse" role="grid">
                <thead>
                  <tr className="h-10 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-primary)]">
                    <th className="px-4 text-left text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">Name</th>
                    <th className="px-4 text-right text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider w-24">Size</th>
                    <th className="px-4 text-left text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider w-48">Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <FileListRow
                      key={item.id}
                      item={item}
                      selected={selectedItems.has(item.id)}
                      renaming={renamingId === item.id}
                      renameValue={renameValue}
                      onSelect={(e) => handleSelection(item.id, e)}
                      onDoubleClick={() => handleDoubleClick(item)}
                      onRenameStart={() => startRename(item)}
                      onRenameFinish={() => finishRename(item)}
                      onRenameChange={setRenameValue}
                      renameInputRef={renameInputRef}
                      onKeyDown={(e) => handleKeyDown(e, item)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-8 flex items-center justify-between px-3 border-t border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-xs text-[var(--color-text-tertiary)]">
        <span>{items.length} items, {selectedItems.size} selected</span>
        <span>{items.filter(i => i.type === 'folder').length} folders, {items.filter(i => i.type === 'file').length} files</span>
      </div>
    </div>
  );
}

function FileGridItem({ 
  item, selected, renaming, renameValue, onSelect, onDoubleClick, 
  onRenameStart, onRenameFinish, onRenameChange, renameInputRef, onKeyDown 
}: {
  item: FileItem;
  selected: boolean;
  renaming: boolean;
  renameValue: string;
  onSelect: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
  onRenameStart: () => void;
  onRenameFinish: () => void;
  onRenameChange: (value: string) => void;
  renameInputRef: React.RefObject<HTMLInputElement>;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  const displayName = item.name;
  const extension = item.extension;

  if (renaming) {
    return (
      <div className="flex flex-col items-center gap-1 p-2 bg-[var(--color-accent-light)] rounded-lg" role="listitem">
        <input
          ref={renameInputRef}
          type="text"
          value={renameValue}
          onChange={(e) => onRenameChange(e.target.value)}
          onBlur={onRenameFinish}
          onKeyDown={(e) => { if (e.key === 'Enter') onRenameFinish(); if (e.key === 'Escape') { onRenameChange(item.name); onRenameFinish(); } }}
          className="w-full px-2 py-1 text-sm bg-[var(--color-surface-primary)] border border-[var(--color-border-focus)] rounded text-[var(--color-text-primary)] focus:outline-none"
          autoFocus
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors cursor-pointer',
        'hover:bg-[var(--color-surface-hover)]',
        selected && 'bg-[var(--color-accent-light)] border border-[var(--color-accent)]/50'
      )}
      role="listitem"
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      onContextMenu={(e) => { e.preventDefault(); onSelect(e); onRenameStart(); }}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="p-2 bg-[var(--color-surface-secondary)] rounded-lg">{getFileIcon(item)}</div>
      <span className="text-sm text-[var(--color-text-primary)] truncate max-w-full px-1">{displayName}</span>
      {item.type === 'file' && item.size && (
        <span className="text-xs text-[var(--color-text-tertiary)]">{formatSize(item.size)}</span>
      )}
    </div>
  );
}

function FileListRow({ 
  item, selected, renaming, renameValue, onSelect, onDoubleClick, 
  onRenameStart, onRenameFinish, onRenameChange, renameInputRef, onKeyDown 
}: {
  item: FileItem;
  selected: boolean;
  renaming: boolean;
  renameValue: string;
  onSelect: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
  onRenameStart: () => void;
  onRenameFinish: () => void;
  onRenameChange: (value: string) => void;
  renameInputRef: React.RefObject<HTMLInputElement>;
  onKeyDown: (e: React.KeyboardEvent) => void;
}) {
  if (renaming) {
    return (
      <tr className="bg-[var(--color-accent-light)]" role="row">
        <td colSpan={3} className="px-4 py-1">
          <input
            ref={renameInputRef}
            type="text"
            value={renameValue}
            onChange={(e) => onRenameChange(e.target.value)}
            onBlur={onRenameFinish}
            onKeyDown={(e) => { if (e.key === 'Enter') onRenameFinish(); if (e.key === 'Escape') { onRenameChange(item.name); onRenameFinish(); } }}
            className="w-full px-2 py-1 text-sm bg-[var(--color-surface-primary)] border border-[var(--color-border-focus)] rounded text-[var(--color-text-primary)] focus:outline-none"
            autoFocus
          />
        </td>
      </tr>
    );
  }

  return (
    <tr
      className={cn(
        'hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer',
        selected && 'bg-[var(--color-accent-light)]'
      )}
      role="row"
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
      onContextMenu={(e) => { e.preventDefault(); onSelect(e); onRenameStart(); }}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <td className="px-4 py-2 flex items-center gap-3">
        {getFileIcon(item)}
        <span className="text-sm text-[var(--color-text-primary)] truncate">{item.name}</span>
      </td>
      <td className="px-4 py-2 text-right text-sm text-[var(--color-text-tertiary)]">
        {item.type === 'file' && item.size ? formatSize(item.size) : '—'}
      </td>
      <td className="px-4 py-2 text-sm text-[var(--color-text-tertiary)]">
        {formatDate(item.modified)}
      </td>
    </tr>
  );
}