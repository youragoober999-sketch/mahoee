'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal as TerminalIcon, X, Copy, Trash2, ChevronDown, ChevronUp, Minimize, Maximize2, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Input } from '@/components/ui';

const demoCommands: Record<string, { description: string; output: string[] }> = {
  help: {
    description: 'Show available commands',
    output: [
      'Available commands:',
      '  help          - Show this help message',
      '  ls [path]     - List directory contents',
      '  cd <path>     - Change directory',
      '  pwd           - Print working directory',
      '  echo <text>   - Print text to stdout',
      '  cat <file>    - Display file contents',
      '  neofetch      - Show system information',
      '  htop          - Show process viewer (demo)',
      '  df -h         - Show disk usage',
      '  free -h       - Show memory usage',
      '  uname -a      - Show kernel information',
      '  whoami        - Show current user',
      '  date          - Show current date/time',
      '  clear         - Clear terminal',
      '  history       - Show command history',
      '  sudo <cmd>    - Run command as root (demo)',
      '  mahoe-info    - Show Mahoe 29 information',
      '',
      'Note: This is a simulated terminal. Commands do not execute on your actual system.',
    ],
  },
  ls: {
    description: 'List directory contents',
    output: [
      'total 48',
      'drwxr-xr-x  2 user user 4096 Nov  1 10:00 Documents',
      'drwxr-xr-x  2 user user 4096 Nov  1 10:00 Downloads',
      'drwxr-xr-x  2 user user 4096 Nov  1 10:00 Pictures',
      'drwxr-xr-x  2 user user 4096 Nov  1 10:00 Music',
      'drwxr-xr-x  2 user user 4096 Nov  1 10:00 Videos',
      'drwxr-xr-x  3 user user 4096 Nov  1 10:00 Development',
      '-rw-r--r--  1 user user  2048 Nov  1 10:00 README.md',
      '-rw-r--r--  1 user user  1024 Nov  1 10:00 LICENSE',
    ],
  },
  pwd: {
    description: 'Print working directory',
    output: ['/home/user'],
  },
  'neofetch': {
    description: 'Show system information',
    output: [
      '            .-/+oossssoo+/-.            user@mahoe',
      '        `:+ssssssssssssssssss+:`        ------------',
      '      -+ssssssssssssssssssyyssss+-      OS: Mahoe 29 Alpha (Kubuntu 26.04)',
      '    .ossssssssssssssssssdMMMNysssso.    Kernel: Linux 6.8.0-generic',
      '   /ssssssssssshdmmNNmmyNMMMMhsssss/    Uptime: 2 hours, 34 mins',
      '  +ssssssssshmydMMMMMMMNddddyssssss+    Packages: 2847 (apt), 12 (flatpak)',
      ' /sssssssshNMMMyhhyyyyhmNMMMNhssssss/   Shell: bash 5.2.15',
      '.ssssssssdMMMNhsssssssssshNMMMdssssss.  Resolution: 1920x1080',
      '+sssshhhyNMMNyssssssssssssyNMMMysssss+  DE: KDE Plasma 6.1 (Mahoe)',
      'ossyNMMMNyMMhsssssssssssssshmmmhssssss  WM: KWin',
      'ossyNMMMNyMMhsssssssssssssshmmmhssssss  Theme: Mahoe-Dark [GTK3/4]',
      '+sssshhhyNMMNyssssssssssssyNMMMysssss+  Icons: Mahoe [GTK3/4]',
      '.ssssssssdMMMNhsssssssssshNMMMdssssss.  Terminal: Konsole',
      ' /sssssssshNMMMyhhyyyyhmNMMMNhssssss/   CPU: AMD Ryzen 7 7800X3D (8) @ 4.2GHz',
      '  +ssssssssshmydMMMMMMMNddddyssssss+    GPU: AMD Radeon RX 7900 XTX',
      '   /sssssssssssssssssssdMMMNysssso.     Memory: 4.2GiB / 32GiB',
      '    .ossssssssssssssssssdMMMNysssso.    ',
      '      -+ssssssssssssssssssyyssss+-      ',
      '        `:+ssssssssssssssssss+:`        ',
      '            .-/+oossssoo+/-.            ',
    ],
  },
  'mahoe-info': {
    description: 'Show Mahoe 29 information',
    output: [
      '╔══════════════════════════════════════════════════════════════╗',
      '║                    Mahoe 29 Alpha                            ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  A premium Linux-based operating system                      ║',
      '║  Built on Kubuntu 26.04 LTS (Noble Numbat)                   ║',
      '║  Desktop: KDE Plasma 6.1 with Mahoe customizations          ║',
      '║  Kernel: Linux 6.8 with hardware enablement                 ║',
      '║  Display: Wayland-first, X11 fallback                       ║',
      '║  Audio: PipeWire                                             ║',
      '║  Init: systemd                                               ║',
      '╠══════════════════════════════════════════════════════════════╣',
      '║  Design Philosophy: macOS-inspired aesthetics               ║',
      '║  Customization: Deep KDE Plasma integration                 ║',
      '║  Target: Developers, creators, power users                  ║',
      '╚══════════════════════════════════════════════════════════════╝',
      '',
      'Website: https://mahoeos.org',
      'GitHub:  https://github.com/mahoe-os/mahoe-29',
      'Discord: https://discord.gg/mahoe',
    ],
  },
  'htop': {
    description: 'Show process viewer (demo)',
    output: [
      '  CPU [|||||||||||||||||||||||||||||||||||||||        ]  42%',
      '  Mem [||||||||||||||||||||||||||||||||||||           ]  4.2G/32G',
      '  Swp [|                                                ]  0B/8G',
      '',
      '  PID  USER      PRI  NI  VIRT   RES   SHR  CPU%  MEM%  TIME+  Command',
      '  1234 user       20   0  2.4G  1.2G  120M  12.0  3.8   0:45  firefox',
      '  1235 user       20   0  1.8G  890M  98M   8.5   2.7   0:32  code',
      '  1236 user       20   0  567M  234M  45M   3.2   0.7   0:12  konsole',
      '  1237 user       20   0  345M  156M  32M   1.1   0.5   0:08  dolphin',
      '  1238 user       20   0  123M   89M  21M   0.5   0.3   0:03  kwin_wayland',
      '  1239 user       20   0  89M    45M  12M   0.2   0.1   0:01  plasmashell',
    ],
  },
  'df': {
    description: 'Show disk usage',
    output: [
      'Filesystem      Size  Used Avail Use% Mounted on',
      '/dev/nvme0n1p2  238G   45G  182G  20% /',
      '/dev/nvme0n1p1  511M   12M  499M   3% /boot/efi',
      '/dev/sda1       931G  234G  697G  26% /home',
      'tmpfs            16G     0   16G   0% /dev/shm',
    ],
  },
  'free': {
    description: 'Show memory usage',
    output: [
      '              total        used        free      shared  buff/cache   available',
      'Mem:           32Gi       4.2Gi       24Gi       256Mi       3.8Gi       27Gi',
      'Swap:          8.0Gi         0B       8.0Gi',
    ],
  },
  'uname': {
    description: 'Show kernel information',
    output: ['Linux mahoe 6.8.0-45-generic #45-Ubuntu SMP PREEMPT_DYNAMIC x86_64 GNU/Linux'],
  },
  whoami: {
    description: 'Show current user',
    output: ['user'],
  },
  date: {
    description: 'Show current date/time',
    output: [new Date().toString()],
  },
  echo: {
    description: 'Print text to stdout',
    output: [],
  },
};

export function TerminalApp({ onClose }: { onClose: () => void }) {
  const [history, setHistory] = useState<{ command: string; output: string[] }[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [currentDir, setCurrentDir] = useState('/home/user');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const commandHistory = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory(prev => [...prev, { command: trimmed, output: [] }]);
    commandHistory.current = [trimmed, ...commandHistory.current.slice(0, 49)];
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const baseCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output: string[] = [];

    if (demoCommands[baseCmd]) {
      if (baseCmd === 'echo') {
        output = [args.join(' ')];
      } else if (baseCmd === 'ls' && args.length > 0) {
        output = [`ls: cannot access '${args[0]}': No such file or directory (demo)`];
      } else if (baseCmd === 'cd') {
        if (args[0] === '..') {
          const parent = currentDir.split('/').slice(0, -1).join('/') || '/';
          setCurrentDir(parent);
          output = [];
        } else if (args[0] === '~' || args[0] === '') {
          setCurrentDir('/home/user');
          output = [];
        } else {
          const newPath = currentDir === '/' ? `/${args[0]}` : `${currentDir}/${args[0]}`;
          setCurrentDir(newPath);
          output = [];
        }
      } else {
        output = demoCommands[baseCmd].output;
      }
    } else if (baseCmd === 'clear') {
      setHistory([]);
      setCurrentCommand('');
      return;
    } else if (baseCmd === 'history') {
      output = commandHistory.current.map((c, i) => `${commandHistory.current.length - i}  ${c}`);
    } else if (baseCmd === 'sudo') {
      output = [`[sudo] password for user: `, `Sorry, try again.`, `[sudo] password for user: `, `sudo: 3 incorrect password attempts (demo)`];
    } else {
      output = [`mahoe: command not found: ${baseCmd}`, `Type 'help' for available commands.`];
    }

    setHistory(prev => {
      const newHist = [...prev];
      newHist[newHist.length - 1] = { command: trimmed, output };
      return newHist;
    });
  }, [currentDir]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(currentCommand);
      setCurrentCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.current.length - 1) {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setCurrentCommand(commandHistory.current[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setCurrentCommand(commandHistory.current[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab completion for demo commands
      const matches = Object.keys(demoCommands).filter(c => c.startsWith(currentCommand.toLowerCase()));
      if (matches.length === 1) {
        setCurrentCommand(matches[0] + ' ');
      } else if (matches.length > 1) {
        setHistory(prev => [...prev, { command: currentCommand, output: [matches.join('  ')] }]);
      }
    } else if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setCurrentCommand('');
      setHistory(prev => [...prev, { command: currentCommand, output: ['^C'] }]);
    }
  };

  return (
    <div className="flex h-full flex-col bg-[var(--color-bg-primary)]" style={{ minWidth: 600, minHeight: 400 }}>
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Terminal Output */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
          style={{ lineHeight: 1.6 }}
        >
          <div className="text-[var(--color-text-tertiary)] mb-4">
            <span>Mahoe 29 Alpha Terminal (Demo)</span>
            <span className="ml-4">Type 'help' for available commands</span>
            <span className="ml-4">This is a simulation - commands don't execute on your system</span>
          </div>

          {history.map((entry, index) => (
            <div key={index} className="mb-3">
              <div className="flex items-baseline gap-2 mb-1">
                <span style={{ color: 'var(--color-success)' }}>user@mahoe</span>
                <span style={{ color: 'var(--color-text-tertiary)' }}>: </span>
                <span style={{ color: 'var(--color-accent)' }}>{currentDir}</span>
                <span style={{ color: 'var(--color-success)' }}>$</span>
                <span style={{ color: 'var(--color-text-primary)' }} className="ml-1">{entry.command}</span>
              </div>
              {entry.output.map((line, lineIndex) => (
                <div key={lineIndex} className="ml-10 whitespace-pre-wrap" style={{ color: 'var(--color-text-secondary)' }}>
                  {line}
                </div>
              ))}
            </div>
          ))}

          {/* Current input line */}
          <div className="flex items-baseline gap-2">
            <span style={{ color: 'var(--color-success)' }}>user@mahoe</span>
            <span style={{ color: 'var(--color-text-tertiary)' }}>: </span>
            <span style={{ color: 'var(--color-accent)' }}>{currentDir}</span>
            <span style={{ color: 'var(--color-success)' }}>$</span>
            <Input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none focus:outline-none font-mono text-sm"
              style={{ color: 'var(--color-text-primary)' }}
              placeholder=" "
              autoFocus
              spellCheck={false}
            />
            <span className="inline-block w-2 h-5 animate-pulse" style={{ backgroundColor: 'var(--color-text-primary)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}