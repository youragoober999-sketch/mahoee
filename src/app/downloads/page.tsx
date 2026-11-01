'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, HardDrive, FileText, Check, X, 
  AlertCircle, Clock, Hash, ExternalLink, 
  ChevronDown, ChevronUp, Copy, Info, 
  Star, Tag, Radio, HelpCircle,
  Monitor
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Badge, Modal, Input, Select } from '@/components/ui';
import { fetchReleases, fetchLatestRelease, categorizeReleases, getReleaseChannel, formatReleaseDate, getIsoAsset, getInstallerAsset, getChecksumAsset, MahoeRelease, MahoeAsset } from '@/lib/github';

export default function DownloadsPage() {
  const [releases, setReleases] = useState<MahoeRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'stable' | 'beta' | 'experimental'>('stable');
  const [selectedRelease, setSelectedRelease] = useState<MahoeRelease | null>(null);
  const [showChecksum, setShowChecksum] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    loadReleases();
  }, []);

  const loadReleases = async () => {
    try {
      setLoading(true);
      const data = await fetchReleases();
      setReleases(data);
      setError(null);
    } catch (err) {
      setError('Failed to load releases from GitHub. Please try again later.');
      console.error('Failed to fetch releases:', err);
    } finally {
      setLoading(false);
    }
  };

  const categorized = categorizeReleases(releases);
  const currentCategory = categorized.find(c => c.id === activeTab);

  const handleDownload = async (asset: MahoeAsset, release: MahoeRelease) => {
    try {
      const response = await fetch(asset.downloadUrl, { method: 'HEAD' });
      if (!response.ok) throw new Error('Download not available');
      
      // Trigger download
      const a = document.createElement('a');
      a.href = asset.downloadUrl;
      a.download = asset.name;
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download failed:', err);
      alert('Download failed. Please try the direct GitHub link.');
      window.open(asset.downloadUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const copyChecksum = (checksum: string) => {
    navigator.clipboard.writeText(checksum);
    setCopied(checksum);
    setTimeout(() => setCopied(null), 2000);
  };

  const verifyChecksum = (file: File, expectedChecksum: string) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const buffer = e.target?.result as ArrayBuffer;
        const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        resolve(hashHex.toUpperCase() === expectedChecksum.toUpperCase() ? 'Valid' : 'Invalid');
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--color-accent)] border-t-transparent mx-auto mb-4" />
          <p className="text-[var(--color-text-secondary)]">Loading releases from GitHub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 animate-in slide-in-from-bottom-4 duration-500">
              Download Mahoe 29
            </h1>
            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-100">
              Get the official ISO images, installers, and verification files. 
              All downloads are hosted on GitHub Releases for transparency and security.
            </p>
          </div>
        </div>
      </section>

      {/* Error State */}
      {error && (
        <section className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <Card variant="outlined" className="border-[var(--color-error)]/50 bg-[var(--color-error)]/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 p-4 bg-[var(--color-surface-primary)] rounded-lg">
                  <AlertCircle className="h-6 w-6 text-[var(--color-error)] flex-shrink-0" />
                  <div>
                    <p className="font-medium text-[var(--color-error)]">Unable to Load Releases</p>
                    <p className="text-sm text-[var(--color-text-secondary)]">{error}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={loadReleases} className="ml-auto">
                    Retry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Current Release Highlight */}
      {releases.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            {(async () => {
              const latest = await fetchLatestRelease();
              if (latest) {
                return (
                  <Card variant="elevated" className="animate-in slide-in-from-bottom-4 duration-500">
                    <CardContent className="pt-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center gap-4">
                          <div className="h-16 w-16 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
                            <HardDrive className="h-8 w-8 text-[var(--color-accent)]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <Badge variant={getReleaseChannel(latest) === 'stable' ? 'success' : getReleaseChannel(latest) === 'beta' ? 'warning' : 'info'} dot>
                                {getReleaseChannel(latest).charAt(0).toUpperCase() + getReleaseChannel(latest).slice(1)}
                              </Badge>
                              <Badge variant="outline" size="sm">v{latest.version}</Badge>
                              <span className="text-sm text-[var(--color-text-tertiary)]">Released {formatReleaseDate(latest.date)}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">Mahoe 29 {latest.name}</h3>
                            <p className="text-[var(--color-text-secondary)] mt-1 max-w-xl">{latest.description?.split('\n')[0] || 'Latest release of Mahoe 29'}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {getIsoAsset(latest) && (
                            <Button size="lg" icon={<Download className="h-5 w-5" />} iconPosition="left" 
                              onClick={() => handleDownload(getIsoAsset(latest)!, latest)}>
                              Download ISO ({formatBytes(getIsoAsset(latest)!.size)})
                            </Button>
                          )}
                          <Button variant="outline" size="lg" onClick={() => setSelectedRelease(latest)}>
                            <Info className="h-5 w-5 mr-2" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              }
              return null;
            })()}
          </div>
        </section>
      )}

      {/* Release Channels Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 mb-6 border-b border-[var(--color-border-primary)]">
            {[
              { id: 'stable', name: 'Stable', icon: Star, desc: 'Production-ready releases' },
              { id: 'beta', name: 'Beta', icon: Tag, desc: 'Pre-release for testing' },
              { id: 'experimental', name: 'Experimental', icon: Radio, desc: 'Cutting-edge builds' },
            ].map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'ghost'}
                size="sm"
                className="h-10 px-4"
                onClick={() => setActiveTab(tab.id as any)}
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.name}
              </Button>
            ))}
          </div>

          {currentCategory?.releases.length === 0 ? (
            <Card variant="outlined">
              <CardContent className="pt-12 pb-12 text-center">
                <Tag className="h-12 w-12 text-[var(--color-text-tertiary)]/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[var(--color-text-secondary)] mb-2">No {activeTab} releases yet</h3>
                <p className="text-[var(--color-text-tertiary)]">Check back later for new {activeTab} builds</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {currentCategory?.releases.map((release, index) => (
                <ReleaseCard 
                  key={release.version} 
                  release={release} 
                  index={index}
                  onSelect={setSelectedRelease}
                  onDownload={handleDownload}
                  onVerify={verifyChecksum}
                  copied={copied}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Verification Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Verify Your Download
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Always verify the integrity of downloaded files using SHA-256 checksums.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Linux / macOS</CardTitle>
                <CardDescription>Terminal verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg font-mono text-sm overflow-x-auto">
                  <code>sha256sum mahoe-29-alpha.iso</code>
                </div>
                <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg font-mono text-sm overflow-x-auto">
                  <code>shasum -a 256 mahoe-29-alpha.iso</code>
                </div>
                <p className="text-sm text-[var(--color-text-tertiary)]">Compare output with the checksum file</p>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Windows</CardTitle>
                <CardDescription>PowerShell verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg font-mono text-sm overflow-x-auto">
                  <code>Get-FileHash mahoe-29-alpha.iso -Algorithm SHA256</code>
                </div>
                <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg font-mono text-sm overflow-x-auto">
                  <code>certutil -hashfile mahoe-29-alpha.iso SHA256</code>
                </div>
                <p className="text-sm text-[var(--color-text-tertiary)]">Compare output with the checksum file</p>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Browser Verification</CardTitle>
                <CardDescription>Drag & drop to verify</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div 
                  className="p-6 border-2 border-dashed border-[var(--color-border-primary)] rounded-lg text-center hover:border-[var(--color-accent)] transition-colors"
                  onDragOver={e => { e.preventDefault(); e.currentTarget.classList.add('border-[var(--color-accent)]'); }}
                  onDragLeave={e => e.currentTarget.classList.remove('border-[var(--color-accent)]')}
                  onDrop={async (e) => {
                    e.preventDefault();
                    e.currentTarget.classList.remove('border-[var(--color-accent)]');
                    const file = e.dataTransfer.files[0];
                    if (file && showChecksum) {
                      try {
                        const result = await verifyChecksum(file, showChecksum);
                        alert(`Checksum: ${result}`);
                      } catch {
                        alert('Failed to verify');
                      }
                    }
                  }}
                >
                  <Hash className="h-8 w-8 mx-auto mb-2 text-[var(--color-text-tertiary)]" />
                  <p className="text-sm text-[var(--color-text-secondary)]">Drop ISO file here to verify</p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">Requires checksum to be loaded above</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Installation Guide
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Step-by-step instructions for installing Mahoe 29 on your hardware or virtual machine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Download ISO', desc: 'Get the official ISO from the releases above', icon: Download },
              { step: '02', title: 'Create Boot Media', desc: 'Flash to USB with BalenaEtcher, Rufus, or dd', icon: HardDrive },
              { step: '03', title: 'Boot from USB', desc: 'Enter BIOS/UEFI and select USB boot device', icon: Monitor },
              { step: '04', title: 'Install', desc: 'Follow the Calamares installer wizard', icon: Check },
            ].map((item, index) => (
              <Card key={item.step} variant="outlined" className="animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <span className="text-3xl font-bold text-[var(--color-accent)]/30">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="h-5 w-5 text-[var(--color-accent)]" />
                        <h3 className="font-semibold text-[var(--color-text-primary)]">{item.title}</h3>
                      </div>
                      <p className="text-[var(--color-text-secondary)]">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12">
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Create Bootable USB</CardTitle>
                <CardDescription>Recommended tools for each platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { os: 'Linux', tools: ['BalenaEtcher (GUI)', 'dd (CLI)', 'Ventoy (multi-boot)'], cmd: 'sudo dd if=mahoe-29.iso of=/dev/sdX bs=4M status=progress' },
                    { os: 'Windows', tools: ['Rufus (Recommended)', 'BalenaEtcher', 'Ventoy'], cmd: 'Use Rufus: Select ISO → Start → DD Image mode' },
                    { os: 'macOS', tools: ['BalenaEtcher (GUI)', 'dd (CLI)'], cmd: 'sudo dd if=mahoe-29.iso of=/dev/diskX bs=4m' },
                  ].map(item => (
                    <div key={item.os} className="p-4 bg-[var(--color-surface-primary)] rounded-lg">
                      <h4 className="font-medium text-[var(--color-text-primary)] mb-2">{item.os}</h4>
                      <ul className="space-y-1 text-sm text-[var(--color-text-secondary)] mb-3">
                        {item.tools.map(t => <li key={t} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[var(--color-success)]" />{t}</li>)}
                      </ul>
                      <div className="p-2 bg-[var(--color-bg-primary)] rounded font-mono text-xs overflow-x-auto"><code>{item.cmd}</code></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              System Requirements
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Minimum Requirements</CardTitle>
                <CardDescription>Basic functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'x86_64 CPU (2+ cores, x86-64-v2)',
                    '4 GB RAM',
                    '25 GB available storage',
                    'OpenGL 3.3+ / Vulkan 1.1+ compatible GPU',
                    '1366×768 display resolution',
                    'Internet connection for installation',
                    'UEFI or Legacy BIOS boot',
                  ].map((req, i) => (
                    <li key={i} className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                      <Check className="h-5 w-5 text-[var(--color-success)] flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardHeader>
                <CardTitle>Recommended</CardTitle>
                <CardDescription>Optimal experience</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    'x86_64 CPU (4+ cores, AVX2, x86-64-v3)',
                    '8 GB RAM or more (16 GB for development)',
                    '50 GB+ NVMe SSD',
                    'Dedicated GPU with Vulkan 1.3+ (AMD/NVIDIA/Intel Arc)',
                    '1920×1080 or higher (HiDPI supported)',
                    'Broadband internet for updates & Flatpaks',
                    'UEFI with Secure Boot support',
                  ].map((req, i) => (
                    <li key={i} className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                      <Check className="h-5 w-5 text-[var(--color-accent)] flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card variant="outlined" className="mt-8">
            <CardHeader>
              <CardTitle>Virtual Machine Support</CardTitle>
              <CardDescription>Tested hypervisors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'QEMU/KVM', status: 'Excellent', note: 'VirtIO, SPICE, 3D accel' },
                  { name: 'VirtualBox', status: 'Good', note: 'Guest Additions needed' },
                  { name: 'VMware', status: 'Good', note: 'VMware Tools needed' },
                  { name: 'GNOME Boxes', status: 'Excellent', note: 'Native integration' },
                ].map(item => (
                  <div key={item.name} className="p-4 bg-[var(--color-surface-primary)] rounded-lg">
                    <h4 className="font-medium text-[var(--color-text-primary)]">{item.name}</h4>
                    <Badge variant={item.status === 'Excellent' ? 'success' : 'outline'} className="mt-1">{item.status}</Badge>
                    <p className="text-sm text-[var(--color-text-tertiary)] mt-2">{item.note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Release Detail Modal */}
      <Modal
        isOpen={!!selectedRelease}
        onClose={() => setSelectedRelease(null)}
        title={selectedRelease ? `Mahoe 29 v${selectedRelease.version}` : ''}
        size="xl"
      >
        {selectedRelease && (
          <ReleaseDetailModal 
            release={selectedRelease} 
            onDownload={handleDownload}
            onVerify={verifyChecksum}
            onClose={() => setSelectedRelease(null)}
            copied={copied}
            setCopied={setCopied}
          />
        )}
      </Modal>
    </div>
  );
}

function ReleaseCard({ release, index, onSelect, onDownload, onVerify, copied }: { 
  release: MahoeRelease; 
  index: number; 
  onSelect: (r: MahoeRelease) => void;
  onDownload: (asset: MahoeAsset, release: MahoeRelease) => void;
  onVerify: (file: File, checksum: string) => Promise<string>;
  copied: string | null;
}) {
  const channel = getReleaseChannel(release);
  const isoAsset = getIsoAsset(release);
  const installerAsset = getInstallerAsset(release);
  const checksumAsset = getChecksumAsset(release);

  return (
    <Card variant="interactive" onClick={() => onSelect(release)} className="overflow-hidden">
      <CardContent className="pt-0">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
                <HardDrive className="h-6 w-6 text-[var(--color-accent)]" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Badge variant={channel === 'stable' ? 'success' : channel === 'beta' ? 'warning' : 'info'} dot>
                    {channel.charAt(0).toUpperCase() + channel.slice(1)}
                  </Badge>
                  <span className="font-mono text-[var(--color-accent)]">v{release.version}</span>
                  <span className="text-sm text-[var(--color-text-tertiary)]">{formatReleaseDate(release.date)}</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{release.name}</h3>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {isoAsset && (
                <Button size="lg" icon={<Download className="h-5 w-5" />} 
                  onClick={(e) => { e.stopPropagation(); onDownload(isoAsset, release); }}>
                  ISO ({formatBytes(isoAsset.size)})
                </Button>
              )}
              {installerAsset && (
                <Button variant="outline" size="lg" 
                  onClick={(e) => { e.stopPropagation(); onDownload(installerAsset, release); }}>
                  Installer ({formatBytes(installerAsset.size)})
                </Button>
              )}
              {checksumAsset && (
                <Button variant="ghost" size="lg" icon={<Hash className="h-4 w-4" />}
                  onClick={(e) => { e.stopPropagation(); }}>
                  Checksums
                </Button>
              )}
              <Button variant="ghost" size="lg" onClick={(e) => { e.stopPropagation(); onSelect(release); }}>
                <ExternalLink className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
          </div>

          {release.description && (
            <div className="px-6 pb-6 border-t border-[var(--color-border-primary)]">
              <p className="text-[var(--color-text-secondary)] text-sm line-clamp-3">{release.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ReleaseDetailModal({ release, onDownload, onVerify, onClose, copied, setCopied }: { 
  release: MahoeRelease; 
  onDownload: (asset: MahoeAsset, release: MahoeRelease) => void;
  onVerify: (file: File, checksum: string) => Promise<string>;
  onClose: () => void;
  copied: string | null;
  setCopied: (s: string | null) => void;
}) {
  const isoAsset = getIsoAsset(release);
  const installerAsset = getInstallerAsset(release);
  const checksumAsset = getChecksumAsset(release);
  const channel = getReleaseChannel(release);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <Badge variant={channel === 'stable' ? 'success' : channel === 'beta' ? 'warning' : 'info'} dot className="text-sm">
          {channel.charAt(0).toUpperCase() + channel.slice(1)} Release
        </Badge>
        <Badge variant="outline" size="sm">v{release.version}</Badge>
        <span className="text-sm text-[var(--color-text-tertiary)]">{formatReleaseDate(release.date)}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {isoAsset && (
          <Card variant="outlined" onClick={() => onDownload(isoAsset, release)} className="cursor-pointer hover:border-[var(--color-accent)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
                  <FileText className="h-7 w-7 text-[var(--color-accent)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)]">Bootable ISO Image</h4>
                  <p className="text-sm text-[var(--color-text-tertiary)]">For clean installation on hardware or VM</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="font-mono text-[var(--color-text-secondary)]">{formatBytes(isoAsset.size)}</span>
                    <span className="text-[var(--color-text-tertiary)]">.iso</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        {installerAsset && (
          <Card variant="outlined" onClick={() => onDownload(installerAsset, release)} className="cursor-pointer hover:border-[var(--color-accent)]">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-[var(--color-success)]/15 flex items-center justify-center">
                  <Download className="h-7 w-7 text-[var(--color-success)]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text-primary)]">Installer Package</h4>
                  <p className="text-sm text-[var(--color-text-tertiary)]">Alternative installation method</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="font-mono text-[var(--color-text-secondary)]">{formatBytes(installerAsset.size)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {checksumAsset && (
        <Card variant="outlined">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>SHA-256 Checksums</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => { 
              fetch(checksumAsset.downloadUrl).then(r => r.text()).then(t => { 
                setCopied(t.trim()); 
                navigator.clipboard.writeText(t.trim());
              }); 
            }}>
              <Copy className="h-4 w-4 mr-2" />
              Copy All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-[var(--color-surface-primary)] rounded-lg font-mono text-sm overflow-x-auto max-h-64 overflow-y-auto">
              <LoadingChecksum url={checksumAsset.downloadUrl} copied={copied} setCopied={setCopied} />
            </div>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-3">
              Verify with: <code className="bg-[var(--color-surface-tertiary)] px-1.5 py-0.5 rounded">sha256sum -c SHA256SUMS</code>
            </p>
          </CardContent>
        </Card>
      )}

      {release.description && (
        <Card variant="outlined">
          <CardHeader>
            <CardTitle>Release Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none text-sm" style={{ '--tw-prose-body': 'var(--color-text-secondary)' }}>
              {release.description.split('\n').map((line, i) => (
                <p key={i} className="whitespace-pre-wrap">{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function LoadingChecksum({ url, copied, setCopied }: { url: string; copied: string | null; setCopied: (s: string | null) => void }) {
  const [checksum, setChecksum] = useState<string>('Loading...');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(r => r.text())
      .then(t => setChecksum(t.trim()))
      .catch(() => { setError('Failed to load'); setChecksum(''); });
  }, [url]);

  if (error) return <span className="text-[var(--color-error)]">{error}</span>;

  return (
    <span 
      className={cn('cursor-pointer transition-colors', copied === checksum && 'text-[var(--color-success)]')}
      onClick={() => { setCopied(checksum); navigator.clipboard.writeText(checksum); }}
      title="Click to copy"
    >
      {checksum}
      {copied === checksum && <Check className="h-3.5 w-3.5 ml-2 inline" />}
    </span>
  );
}

function formatBytes(bytes: number): string {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${bytes} B`;
}