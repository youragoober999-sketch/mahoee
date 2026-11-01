'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit2, Search, MoreVertical, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

const defaultNotes: Note[] = [
  {
    id: '1',
    title: 'Welcome to Mahoe Notes',
    content: 'This is a fully functional notes application running in the Mahoe 29 desktop simulation.\n\nYou can:\n• Create new notes with the + button\n• Edit any note by clicking on it\n• Delete notes with the trash icon\n• Search through your notes\n• All changes persist during this session\n\nTry creating a new note!',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
  },
  {
    id: '2',
    title: 'Mahoe 29 Features',
    content: 'Key features to explore:\n\n1. Custom KDE Plasma desktop\n2. macOS-inspired design language\n3. Wayland-first graphics stack\n4. Pre-installed development tools\n5. Flatpak & Snap support\n6. Custom theming engine\n\nAll built on Kubuntu 26.04 LTS.',
    createdAt: Date.now() - 43200000,
    updatedAt: Date.now() - 43200000,
  },
  {
    id: '3',
    title: 'Keyboard Shortcuts',
    content: 'Common shortcuts in Mahoe:\n\n• Meta + Space: Application launcher\n• Meta + Tab: Window switcher\n• Meta + D: Show desktop\n• Ctrl + Alt + T: Terminal\n• Meta + E: File manager\n• Meta + S: Settings\n• Meta + 1-9: Launch pinned apps',
    createdAt: Date.now() - 21600000,
    updatedAt: Date.now() - 21600000,
  },
];

export function NotesApp({ onClose }: { onClose: () => void }) {
  const [notes, setNotes] = useState<Note[]>(defaultNotes);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(defaultNotes[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const filteredNotes = notes
    .filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const activeNote = notes.find(n => n.id === activeNoteId);

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setNotes(prev => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
    setEditingNote(newNote);
    setShowEditor(true);
    setTimeout(() => titleRef.current?.focus(), 0);
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(note =>
      note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
    ));
  };

  const deleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotes(prev => prev.filter(note => note.id !== id));
    if (activeNoteId === id) {
      const remaining = notes.filter(n => n.id !== id);
      setActiveNoteId(remaining[0]?.id || null);
    }
  };

  const handleSave = () => {
    if (editingNote) {
      const title = titleRef.current?.value.trim() || 'Untitled Note';
      const content = contentRef.current?.value || '';
      updateNote(editingNote.id, { title, content });
    }
    setShowEditor(false);
    setEditingNote(null);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingNote) {
      updateNote(editingNote.id, { title: e.target.value });
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (editingNote) {
      updateNote(editingNote.id, { content: e.target.value });
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 86400000) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diff < 604800000) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex h-full flex-col bg-[var(--color-bg-primary)]">
      {/* Toolbar */}
      <div className="h-10 flex items-center justify-between px-3 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={createNote} aria-label="New note">
            <Plus className="h-4 w-4" />
          </Button>
          <div className="w-px h-6 bg-[var(--color-border-primary)]" />
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-tertiary)]" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 text-sm bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-border-focus)]"
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setSidebarCollapsed(!sidebarCollapsed)} aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className={cn(
          'flex flex-col border-r border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] transition-all duration-200 overflow-hidden',
          sidebarCollapsed ? 'w-12' : 'w-64'
        )}>
          <div className="p-3 border-b border-[var(--color-border-primary)]">
            <h3 className={cn('font-medium text-[var(--color-text-secondary)] truncate', sidebarCollapsed && 'hidden')}>
              Notes ({notes.length})
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {filteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-[var(--color-text-tertiary)] py-8">
                <FileText className="h-8 w-8 mb-2 opacity-50" />
                <span className={cn('text-sm', sidebarCollapsed && 'hidden')}>
                  {searchQuery ? 'No notes found' : 'No notes yet'}
                </span>
              </div>
            ) : (
              <ul className="space-y-1" role="listbox">
                {filteredNotes.map((note) => (
                  <li key={note.id}>
                    <button
                      onClick={() => {
                        setActiveNoteId(note.id);
                        setShowEditor(false);
                        setEditingNote(null);
                      }}
                      className={cn(
                        'w-full px-3 py-2.5 rounded-lg text-left transition-colors',
                        'hover:bg-[var(--color-surface-hover)]',
                        activeNoteId === note.id
                          ? 'bg-[var(--color-accent-light)] text-[var(--color-text-primary)]'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
                        sidebarCollapsed && 'justify-center'
                      )}
                      role="option"
                      aria-selected={activeNoteId === note.id}
                    >
                      {!sidebarCollapsed && (
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{note.title || 'Untitled'}</p>
                          <p className="text-xs truncate mt-0.5">{note.content.slice(0, 60)}...</p>
                          <p className="text-xs text-[var(--color-text-tertiary)] mt-1">{formatDate(note.updatedAt)}</p>
                        </div>
                      )}
                      {sidebarCollapsed && (
                        <FileText className="h-5 w-5 text-[var(--color-text-tertiary)]" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Editor / Viewer */}
        <div className="flex-1 flex flex-col min-w-0">
          {showEditor && editingNote ? (
            /* Editor View */
            <div className="flex-1 flex flex-col p-4 overflow-hidden">
              <input
                ref={titleRef}
                type="text"
                value={editingNote.title}
                onChange={handleTitleChange}
                onKeyDown={(e) => e.key === 'Enter' && contentRef.current?.focus()}
                className="mb-3 px-3 py-2 text-lg font-medium bg-transparent border-none focus:outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)]"
                placeholder="Note title..."
                autoFocus
              />
              <textarea
                ref={contentRef}
                value={editingNote.content}
                onChange={handleContentChange}
                onBlur={handleSave}
                className="flex-1 w-full px-3 py-3 bg-transparent border-none focus:outline-none text-[var(--color-text-primary)] placeholder-[var(--color-text-tertiary)] resize-none font-mono text-sm leading-relaxed"
                placeholder="Start writing..."
                spellCheck
              />
              <div className="mt-3 flex items-center justify-end gap-2 text-xs text-[var(--color-text-tertiary)]">
                <span>Auto-saves on blur</span>
                <Button variant="ghost" size="sm" onClick={handleSave}>Done</Button>
              </div>
            </div>
          ) : activeNote ? (
            /* Viewer View */
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
                <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">{activeNote.title}</h1>
                <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                  Updated {formatDate(activeNote.updatedAt)}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto prose prose-invert" style={{ '--tw-prose-body': 'var(--color-text-secondary)', '--tw-prose-headings': 'var(--color-text-primary)' }}>
                  <div className="whitespace-pre-wrap font-mono text-sm leading-relaxed">{activeNote.content}</div>
                </div>
              </div>
              <div className="p-4 border-t border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => { setEditingNote(activeNote); setShowEditor(true); setTimeout(() => titleRef.current?.focus(), 0); }}>
                  <Edit2 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={(e) => deleteNote(activeNote.id, e)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-8">
                <FileText className="h-16 w-16 text-[var(--color-text-tertiary)]/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[var(--color-text-secondary)] mb-2">No note selected</h3>
                <p className="text-[var(--color-text-tertiary)] mb-6">Select a note from the sidebar or create a new one</p>
                <Button onClick={createNote} icon={<Plus className="h-4 w-4" />}>
                  New Note
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}