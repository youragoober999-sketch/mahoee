'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Cpu, MemoryStick, HardDrive, Network, Activity, 
  TrendingUp, TrendingDown, Minimize, Maximize2, X,
  ChevronDown, ChevronRight, Settings, Search, Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, Badge } from '@/components/ui';

const generateCpuHistory = () => Array.from({ length: 60 }, () => Math.random() * 100);
const generateMemHistory = () => Array.from({ length: 60 }, () => 30 + Math.random() * 40);
const generateNetHistory = () => Array.from({ length: 60 }, () => Math.random() * 100);

const demoProcesses = [
  { pid: 1234, user: 'user', cpu: 12.5, mem: 1.2, time: '0:45', cmd: 'firefox', priority: 20 },
  { pid: 1235, user: 'user', cpu: 8.2, mem: 890, time: '0:32', cmd: 'code', priority: 20 },
  { pid: 1236, user: 'user', cpu: 3.1, mem: 234, time: '0:12', cmd: 'konsole', priority: 20 },
  { pid: 1237, user: 'user', cpu: 1.8, mem: 156, time: '0:08', cmd: 'dolphin', priority: 20 },
  { pid: 1238, user: 'user', cpu: 0.9, mem: 89, time: '0:03', cmd: 'kwin_wayland', priority: 10 },
  { pid: 1239, user: 'user', cpu: 0.5, mem: 45, time: '0:01', cmd: 'plasmashell', priority: 15 },
  { pid: 1240, user: 'root', cpu: 0.3, mem: 32, time: '0:02', cmd: 'systemd', priority: -5 },
  { pid: 1241, user: 'root', cpu: 0.2, mem: 18, time: '0:01', cmd: 'NetworkManager', priority: 0 },
  { pid: 1242, user: 'user', cpu: 0.1, mem: 12, time: '0:00', cmd: 'pipewire', priority: 0 },
  { pid: 1243, user: 'user', cpu: 0.1, mem: 8, time: '0:00', cmd: 'wireplumber', priority: 0 },
];

const demoDisks = [
  { device: '/dev/nvme0n1p2', mount: '/', type: 'ext4', total: 256 * 1024 ** 3, used: 45 * 1024 ** 3, read: 120 * 1024 ** 2, write: 80 * 1024 ** 2 },
  { device: '/dev/nvme0n1p1', mount: '/boot/efi', type: 'vfat', total: 512 * 1024 ** 2, used: 12 * 1024 ** 2, read: 1 * 1024 ** 2, write: 0 },
  { device: '/dev/sda1', mount: '/home', type: 'ext4', total: 1024 * 1024 ** 3, used: 234 * 1024 ** 3, read: 45 * 1024 ** 2, write: 30 * 1024 ** 2 },
];

const formatBytes = (bytes: number) => {
  if (bytes >= 1024 ** 4) return `${(bytes / 1024 ** 4).toFixed(1)} TB`;
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${bytes} B`;
};

const formatRate = (bytes: number) => `${formatBytes(bytes)}/s`;

export function SystemMonitorApp({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<'overview' | 'processes' | 'resources' | 'disks' | 'network'>('overview');
  const [cpuHistory, setCpuHistory] = useState(generateCpuHistory());
  const [memHistory, setMemHistory] = useState(generateMemHistory());
  const [netHistory, setNetHistory] = useState(generateNetHistory());
  const [cpuUsage, setCpuUsage] = useState(42);
  const [memUsage, setMemUsage] = useState(4.2);
  const [memTotal, setMemTotal] = useState(32);
  const [processes] = useState(demoProcesses);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: 'cpu', direction: 'desc' });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuHistory(prev => [...prev.slice(1), Math.max(0, Math.min(100, prev[prev.length - 1] + (Math.random() - 0.5) * 20))]);
      setMemHistory(prev => [...prev.slice(1), Math.max(20, Math.min(80, prev[prev.length - 1] + (Math.random() - 0.5) * 10))]);
      setNetHistory(prev => [...prev.slice(1), Math.max(0, Math.min(100, prev[prev.length - 1] + (Math.random() - 0.5) * 30))]);
      setCpuUsage(prev => Math.max(5, Math.min(95, prev + (Math.random() - 0.5) * 10)));
      setMemUsage(prev => Math.max(2, Math.min(memTotal - 1, prev + (Math.random() - 0.5) * 0.5)));
    }, 1000);
    return () => clearInterval(interval);
  }, [memTotal]);

  const sortedProcesses = useMemo(() => {
    return [...processes]
      .filter(p => p.cmd.toLowerCase().includes(searchQuery.toLowerCase()) || p.user.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        const aVal = a[sortConfig.key as keyof typeof a];
        const bVal = b[sortConfig.key as keyof typeof b];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [processes, sortConfig, searchQuery]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Activity },
    { id: 'processes', name: 'Processes', icon: Cpu },
    { id: 'resources', name: 'Resources', icon: MemoryStick },
    { id: 'disks', name: 'Disks', icon: HardDrive },
    { id: 'network', name: 'Network', icon: Network },
  ];

  return (
    <div className="flex h-full flex-col bg-[var(--color-bg-primary)]">
      {/* Toolbar */}
      <div className="h-10 flex items-center justify-between px-3 border-b border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)]">
        <div className="flex items-center gap-1 border-b-2 border-[var(--color-border-primary)]">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as any)}
              className={cn(
                'px-3 py-1.5 text-sm font-medium transition-colors relative',
                'hover:text-[var(--color-text-primary)]',
                tab === t.id
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-text-secondary)]'
              )}
            >
              <t.icon className="h-4 w-4 inline mr-1" />
              {t.name}
              {tab === t.id && <div className="absolute bottom-[-2px] left-0 right-0 h-1 bg-[var(--color-accent)]" />}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-tertiary)]" />
            <input
              type="text"
              placeholder="Filter processes..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-8 pr-2 py-1 text-sm bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg w-48 focus:outline-none focus:ring-1 focus:ring-[var(--color-border-focus)]"
            />
          </div>
          <Button variant="ghost" size="sm" className="hidden sm:flex"><Settings className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {tab === 'overview' && (
          <div className="space-y-6">
            {/* System Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card variant="elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--color-text-tertiary)]">CPU Usage</p>
                      <p className="text-3xl font-bold text-[var(--color-text-primary)]">{cpuUsage.toFixed(1)}%</p>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-[var(--color-accent-light)] flex items-center justify-center">
                      <Cpu className="h-8 w-8 text-[var(--color-accent)]" />
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-[var(--color-border-primary)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300" style={{ width: `${cpuUsage}%` }} />
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--color-text-tertiary)]">Memory</p>
                      <p className="text-3xl font-bold text-[var(--color-text-primary)]">{memUsage.toFixed(1)} / {memTotal} GB</p>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-[var(--color-success)]/15 flex items-center justify-center">
                      <MemoryStick className="h-8 w-8 text-[var(--color-success)]" />
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-[var(--color-border-primary)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-success)] rounded-full transition-all duration-300" style={{ width: `${(memUsage / memTotal) * 100}%` }} />
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--color-text-tertiary)]">Disk I/O</p>
                      <p className="text-3xl font-bold text-[var(--color-text-primary)]">R: 120 MB/s</p>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-[var(--color-warning)]/15 flex items-center justify-center">
                      <HardDrive className="h-8 w-8 text-[var(--color-warning)]" />
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-[var(--color-border-primary)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-warning)] rounded-full" style={{ width: '45%' }} />
                  </div>
                </CardContent>
              </Card>

              <Card variant="elevated">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--color-text-tertiary)]">Network</p>
                      <p className="text-3xl font-bold text-[var(--color-text-primary)]">▲ 2.4 MB/s</p>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-[var(--color-info)]/15 flex items-center justify-center">
                      <Network className="h-8 w-8 text-[var(--color-info)]" />
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-[var(--color-border-primary)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-info)] rounded-full" style={{ width: '30%' }} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>CPU History (60s)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 relative">
                    <svg className="w-full h-full" viewBox="0 0 600 200">
                      <defs>
                        <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={`M 0 200 ${cpuHistory.map((v, i) => `L ${i * 10} ${200 - v * 2}`).join(' ')} L 600 200 Z`}
                        fill="url(#cpuGradient)"
                        stroke="var(--color-accent)"
                        strokeWidth="2"
                        fillOpacity="0.3"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Memory History (60s)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 relative">
                    <svg className="w-full h-full" viewBox="0 0 600 200">
                      <defs>
                        <linearGradient id="memGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={`M 0 200 ${memHistory.map((v, i) => `L ${i * 10} ${200 - v * 2}`).join(' ')} L 600 200 Z`}
                        fill="url(#memGradient)"
                        stroke="var(--color-success)"
                        strokeWidth="2"
                        fillOpacity="0.3"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {tab === 'processes' && (
          <Card variant="outlined">
            <CardContent className="pt-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse" role="grid">
                  <thead>
                    <tr className="h-10 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-primary)] sticky top-0">
                      {[
                        { key: 'pid', label: 'PID', width: 'w-16' },
                        { key: 'user', label: 'User', width: 'w-20' },
                        { key: 'cpu', label: 'CPU%', width: 'w-16', numeric: true },
                        { key: 'mem', label: 'Mem (MB)', width: 'w-20', numeric: true },
                        { key: 'time', label: 'Time', width: 'w-20' },
                        { key: 'cmd', label: 'Command', width: 'w-48' },
                        { key: 'priority', label: 'Priority', width: 'w-24', numeric: true },
                      ].map(col => (
                        <th
                          key={col.key}
                          className={cn('px-3 text-left text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider', col.numeric && 'text-right')}
                          onClick={() => handleSort(col.key)}
                          style={{ cursor: sortConfig.key === col.key ? 'pointer' : 'default' }}
                        >
                          <div className="flex items-center gap-1">
                            {col.label}
                            {sortConfig.key === col.key && (
                              sortConfig.direction === 'asc' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sortedProcesses.map(proc => (
                      <tr key={proc.pid} className="hover:bg-[var(--color-surface-hover)] border-b border-[var(--color-border-primary)]/50">
                        <td className="px-3 py-2 text-sm text-[var(--color-text-secondary)] font-mono">{proc.pid}</td>
                        <td className="px-3 py-2 text-sm text-[var(--color-text-secondary)]">{proc.user}</td>
                        <td className="px-3 py-2 text-sm text-[var(--color-text-primary)] font-mono tabular-nums text-right">{proc.cpu.toFixed(1)}%</td>
                        <td className="px-3 py-2 text-sm text-[var(--color-text-secondary)] font-mono tabular-nums text-right">{proc.mem}</td>
                        <td className="px-3 py-2 text-sm text-[var(--color-text-tertiary)] font-mono">{proc.time}</td>
                        <td className="px-3 py-2 text-sm text-[var(--color-text-primary)] font-mono truncate max-w-[200px]">{proc.cmd}</td>
                        <td className="px-3 py-2 text-sm text-[var(--color-text-tertiary)] font-mono text-right">{proc.priority >= 0 ? '+' : ''}{proc.priority}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {tab === 'resources' && (
          <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>CPU Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                      <p className="text-sm text-[var(--color-text-tertiary)]">Model</p>
                      <p className="font-mono text-[var(--color-text-primary)]">AMD Ryzen 7 7800X3D</p>
                    </div>
                    <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                      <p className="text-sm text-[var(--color-text-tertiary)]">Cores / Threads</p>
                      <p className="font-mono text-[var(--color-text-primary)]">8 / 16</p>
                    </div>
                    <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                      <p className="text-sm text-[var(--color-text-tertiary)]">Base / Boost Clock</p>
                      <p className="font-mono text-[var(--color-text-primary)]">4.2 / 5.0 GHz</p>
                    </div>
                    <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                      <p className="text-sm text-[var(--color-text-tertiary)]">L3 Cache</p>
                      <p className="font-mono text-[var(--color-text-primary)]">96 MB</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--color-text-tertiary)] mb-2">Per-Core Usage</p>
                    <div className="grid grid-cols-4 gap-3">
                      {Array.from({ length: 8 }, (_, i) => {
                        const usage = Math.max(0, Math.min(100, cpuUsage + (Math.random() - 0.5) * 30));
                        return (
                          <div key={i} className="p-3 bg-[var(--color-surface-primary)] rounded-lg text-center">
                            <p className="text-xs text-[var(--color-text-tertiary)]">Core {i}</p>
                            <p className="text-xl font-bold text-[var(--color-text-primary)]">{usage.toFixed(0)}%</p>
                            <div className="h-2 bg-[var(--color-border-primary)] rounded-full mt-1 overflow-hidden">
                              <div className="h-full bg-[var(--color-accent)] rounded-full" style={{ width: `${usage}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardHeader>
                  <CardTitle>Memory Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'Total', value: `${memTotal} GB` },
                      { label: 'Used', value: `${memUsage.toFixed(1)} GB` },
                      { label: 'Available', value: `${(memTotal - memUsage).toFixed(1)} GB` },
                      { label: 'Cached', value: `${(memTotal * 0.15).toFixed(1)} GB` },
                      { label: 'Swap Total', value: '8.0 GB' },
                      { label: 'Swap Used', value: '0 B' },
                    ].map(item => (
                      <div key={item.label} className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                        <p className="text-sm text-[var(--color-text-tertiary)]">{item.label}</p>
                        <p className="font-mono text-[var(--color-text-primary)]">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="h-2 bg-[var(--color-border-primary)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-success)] rounded-full transition-all duration-300" style={{ width: `${(memUsage / memTotal) * 100}%` }} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>GPU (Demo)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'GPU', value: 'AMD Radeon RX 7900 XTX' },
                  { label: 'VRAM', value: '24 GB GDDR6' },
                  { label: 'GPU Usage', value: '23%' },
                  { label: 'VRAM Usage', value: '4.2 GB' },
                  { label: 'Temperature', value: '42°C' },
                  { label: 'Power Draw', value: '185 W' },
                  { label: 'Driver', value: 'Mesa 24.1 (RADV)' },
                  { label: 'API', value: 'Vulkan 1.3 / OpenGL 4.6' },
                ].map(item => (
                  <div key={item.label} className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                    <p className="text-sm text-[var(--color-text-tertiary)]">{item.label}</p>
                    <p className="font-mono text-[var(--color-text-primary)]">{item.value}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === 'disks' && (
          <div className="space-y-6">
            {demoDisks.map(disk => (
              <Card key={disk.device} variant="outlined">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>{disk.device} ({disk.mount})</CardTitle>
                  <Badge variant="outline">{disk.type}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                      <p className="text-sm text-[var(--color-text-tertiary)]">Total</p>
                      <p className="font-mono text-[var(--color-text-primary)]">{formatBytes(disk.total)}</p>
                    </div>
                    <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                      <p className="text-sm text-[var(--color-text-tertiary)]">Used</p>
                      <p className="font-mono text-[var(--color-text-primary)]">{formatBytes(disk.used)}</p>
                    </div>
                    <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                      <p className="text-sm text-[var(--color-text-tertiary)]">Free</p>
                      <p className="font-mono text-[var(--color-text-primary)]">{formatBytes(disk.total - disk.used)}</p>
                    </div>
                    <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                      <p className="text-sm text-[var(--color-text-tertiary)]">Usage</p>
                      <p className="font-mono text-[var(--color-text-primary)]">{((disk.used / disk.total) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                  <div className="h-3 bg-[var(--color-border-primary)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300" style={{ width: `${(disk.used / disk.total) * 100}%` }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                      <p className="text-[var(--color-text-tertiary)]">Read Speed</p>
                      <p className="font-mono text-[var(--color-text-primary)]">{formatRate(disk.read)}</p>
                    </div>
                    <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg">
                      <p className="text-[var(--color-text-tertiary)]">Write Speed</p>
                      <p className="font-mono text-[var(--color-text-primary)]">{formatRate(disk.write)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {tab === 'network' && (
          <div className="space-y-6">
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Network Interfaces</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: 'enp3s0', type: 'Ethernet', status: 'Connected', ip: '192.168.1.42', speed: '1 Gbps', rx: 2.4 * 1024 ** 2, tx: 1.1 * 1024 ** 2 },
                  { name: 'wlan0', type: 'Wi-Fi', status: 'Connected', ip: '192.168.1.43', speed: '866 Mbps', rx: 890 * 1024, tx: 320 * 1024 },
                  { name: 'lo', type: 'Loopback', status: 'Up', ip: '127.0.0.1', speed: 'N/A', rx: 12 * 1024 ** 2, tx: 12 * 1024 ** 2 },
                ].map(iface => (
                  <div key={iface.name} className="p-4 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[var(--color-accent-light)] flex items-center justify-center">
                          <Network className="h-5 w-5 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <p className="font-medium text-[var(--color-text-primary)]">{iface.name}</p>
                          <p className="text-sm text-[var(--color-text-tertiary)]">{iface.type} · {iface.speed}</p>
                        </div>
                      </div>
                      <Badge variant={iface.status === 'Connected' ? 'success' : 'outline'}>
                        {iface.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div className="p-3 bg-[var(--color-bg-primary)] rounded-lg">
                        <p className="text-[var(--color-text-tertiary)]">IP Address</p>
                        <p className="font-mono text-[var(--color-text-primary)]">{iface.ip}</p>
                      </div>
                      <div className="p-3 bg-[var(--color-bg-primary)] rounded-lg">
                        <p className="text-[var(--color-text-tertiary)]">Received</p>
                        <p className="font-mono text-[var(--color-success)]">{formatRate(iface.rx)}</p>
                      </div>
                      <div className="p-3 bg-[var(--color-bg-primary)] rounded-lg">
                        <p className="text-[var(--color-text-tertiary)]">Transmitted</p>
                        <p className="font-mono text-[var(--color-warning)]">{formatRate(iface.tx)}</p>
                      </div>
                      <div className="p-3 bg-[var(--color-bg-primary)] rounded-lg">
                        <p className="text-[var(--color-text-tertiary)]">Total</p>
                        <p className="font-mono text-[var(--color-text-primary)]">{formatBytes(iface.rx + iface.tx)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Network History (60s)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 relative">
                  <svg className="w-full h-full" viewBox="0 0 600 200">
                    <defs>
                      <linearGradient id="rxGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="txGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-warning)" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="var(--color-warning)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d={`M 0 200 ${netHistory.map((v, i) => `L ${i * 10} ${200 - v * 2}`).join(' ')} L 600 200 Z`}
                      fill="url(#rxGradient)"
                      stroke="var(--color-success)"
                      strokeWidth="1.5"
                    />
                    <path
                      d={`M 0 200 ${netHistory.map((v, i) => `L ${i * 10} ${200 - v * 1.5 - 20}`).join(' ')} L 600 200 Z`}
                      fill="url(#txGradient)"
                      stroke="var(--color-warning)"
                      strokeWidth="1.5"
                    />
                    <text x="10" y="20" className="text-[var(--color-text-tertiary)]" fontSize="12">▲ TX</text>
                    <text x="10" y="40" className="text-[var(--color-text-tertiary)]" fontSize="12">▼ RX</text>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="h-8 flex items-center justify-between px-3 border-t border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-xs text-[var(--color-text-tertiary)]">
        <span>Processes: {processes.length} | CPU: {cpuUsage.toFixed(1)}% | Memory: {memUsage.toFixed(1)}/{memTotal} GB</span>
        <span>Demo data - not actual system metrics</span>
      </div>
    </div>
  );
}