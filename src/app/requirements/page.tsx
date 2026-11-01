'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, MemoryStick, HardDrive, Monitor, 
  Wifi, Bluetooth, Usb, Globe, 
  Shield, Check, X, AlertCircle,
  HelpCircle, Download, ExternalLink,
  AlertTriangle, Info, Terminal
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Badge, Button } from '@/components/ui';

const requirements = {
  minimum: [
    { component: 'CPU', spec: 'x86_64 processor (2+ cores)', details: 'x86-64-v2 (Haswell/Excavator or newer)', icon: Cpu, met: true },
    { component: 'RAM', spec: '4 GB', details: 'DDR4/DDR3/LPDDR4X', icon: MemoryStick, met: true },
    { component: 'Storage', spec: '25 GB available space', details: 'SSD recommended, HDD supported', icon: HardDrive, met: true },
    { component: 'GPU', spec: 'OpenGL 3.3+ / Vulkan 1.1+', details: 'Integrated or discrete, Mesa 20+ or proprietary', icon: Monitor, met: true },
    { component: 'Display', spec: '1366×768', details: 'X11 or Wayland session', icon: Monitor, met: true },
    { component: 'Boot', spec: 'UEFI or Legacy BIOS', details: 'Secure Boot optional', icon: Shield, met: true },
    { component: 'Internet', spec: 'Required for installation', details: 'Ethernet, WiFi, or tethering', icon: Globe, met: true },
  ],
  recommended: [
    { component: 'CPU', spec: 'x86_64 (4+ cores, AVX2)', details: 'x86-64-v3 (Zen 2 / Skylake or newer)', icon: Cpu, met: true },
    { component: 'RAM', spec: '8 GB (16 GB for development)', details: 'DDR4-3200 / DDR5-4800', icon: MemoryStick, met: true },
    { component: 'Storage', spec: '50 GB+ NVMe SSD', details: 'Btrfs with compression enabled', icon: HardDrive, met: true },
    { component: 'GPU', spec: 'Vulkan 1.3+ discrete GPU', details: 'AMD RDNA2+, NVIDIA RTX 20+, Intel Arc', icon: Monitor, met: true },
    { component: 'Display', spec: '1920×1080+ (HiDPI supported)', details: 'Fractional scaling 100%-200%', icon: Monitor, met: true },
    { component: 'Boot', spec: 'UEFI with Secure Boot', details: 'systemd-boot or GRUB', icon: Shield, met: true },
    { component: 'Internet', spec: 'Broadband (Flatpaks, updates)', details: '5+ Mbps recommended', icon: Globe, met: true },
  ],
  optimal: [
    { component: 'CPU', spec: '8+ cores, AVX-512', details: 'Zen 4 / Raptor Lake or newer', icon: Cpu, met: true },
    { component: 'RAM', spec: '32 GB+ DDR5', details: 'ECC supported', icon: MemoryStick, met: true },
    { component: 'Storage', spec: '1 TB+ NVMe Gen4', details: 'Separate /home partition', icon: HardDrive, met: true },
    { component: 'GPU', spec: 'High-end discrete (24 GB VRAM)', details: 'ROCm/CUDA for compute', icon: Monitor, met: true },
    { component: 'Display', spec: '4K/5K/8K, 120Hz+', details: 'HDR, wide gamut', icon: Monitor, met: true },
    { component: 'Peripherals', spec: 'Thunderbolt 4, USB4', details: 'eGPU, docks, high-speed storage', icon: Usb, met: true },
  ],
};

const supportedHardware = {
  cpu: [
    { vendor: 'AMD', models: 'Ryzen 1000–9000, EPYC, Threadripper', support: 'Excellent', notes: 'Full sensor support, PBO, Curve Optimizer' },
    { vendor: 'Intel', models: 'Core 6th–14th Gen, Xeon, Atom', support: 'Excellent', notes: 'Hybrid scheduling, power management, iGPU' },
    { vendor: 'ARM64', models: 'Apple M1–M3 (Asahi), Qualcomm Snapdragon X', support: 'Experimental', notes: 'Asahi Linux required for Apple Silicon' },
  ],
  gpu: [
    { vendor: 'AMD', models: 'RDNA 1–3 (RX 5000–7000), CDNA', support: 'Excellent', notes: 'Mesa RADV, ROCm 6+, video encode/decode' },
    { vendor: 'NVIDIA', models: 'Turing–Blackwell (GTX 16–RTX 50)', support: 'Good', notes: 'Proprietary 550+ for Wayland, Nouveau basic' },
    { vendor: 'Intel', models: 'Xe (Arc, Iris Xe, UHD 700+)', support: 'Excellent', notes: 'Mesa ANV, compute, AV1 encode/decode' },
    { vendor: 'Virtual', models: 'VirtIO-GPU, VMware SVGA, QXL', support: 'Good', notes: '3D acceleration with guest agents' },
  ],
  wifi: [
    { vendor: 'Intel', models: 'WiFi 6/6E/7 (AX200–BE200)', support: 'Excellent', notes: 'iwlwifi, 160 MHz, WPA3' },
    { vendor: 'AMD/MediaTek', models: 'Filogic 830/880, MT7921/7922', support: 'Good', notes: 'mt7921e driver, improving' },
    { vendor: 'Realtek', models: 'RTL8852A/B/C, RTL8851B', support: 'Fair', notes: 'rtw89 driver, DKMS may be needed' },
    { vendor: 'Qualcomm', models: 'QCA6390/6490 (Snapdragon)', support: 'Experimental', notes: 'ath11k/ath12k, limited testing' },
  ],
  audio: [
    { type: 'USB Audio Class 1/2', support: 'Excellent', notes: 'Plug-and-play, PipeWire native' },
    { type: 'Bluetooth (A2DP, LE, LC3)', support: 'Excellent', notes: 'PipeWire + BlueZ 5.66+, multipoint' },
    { type: 'HDMI/DP Audio', support: 'Excellent', notes: 'Multi-channel, auto-switch' },
    { type: 'Thunderbolt Audio', support: 'Good', notes: 'Requires bolt daemon, authorization' },
  ],
};

const vmSupport = [
  { name: 'QEMU/KVM (libvirt)', status: 'Excellent', features: ['VirtIO (net, blk, gpu, fs)', 'SPICE/QXL', 'VirGL 3D', 'UEFI (OVMF)', 'Nested virt', 'Memory ballooning', 'CPU pinning', 'Huge pages'], notes: 'Best performance, near-native with GPU passthrough' },
  { name: 'GNOME Boxes', status: 'Excellent', features: ['Simple UI', 'Auto SPICE', 'File sharing', 'Clipboard sync', 'Auto resize'], notes: 'Easiest for quick testing, Flatpak integrated' },
  { name: 'VirtualBox 7', status: 'Good', features: ['Guest Additions', 'Shared folders', 'Seamless mode', '3D (limited)', 'USB passthrough'], notes: 'Guest Additions required for full features' },
  { name: 'VMware Workstation/Fusion', status: 'Good', features: ['VMware Tools', 'Unity mode', 'Drag-drop', '3D (DX11)', 'Restricted VMs'], notes: 'Proprietary, Tools needed for Wayland' },
  { name: 'UTM (macOS)', status: 'Good', features: ['Apple Virtualization', 'Rosetta 2 (x86)', 'GPU passthrough (M-series)', 'SPICE'], notes: 'Best for Apple Silicon, x86 via Rosetta' },
  { name: 'WSL2 (Windows)', status: 'Fair', features: ['systemd', 'GUI apps', 'GPU compute', 'Networking'], notes: 'Not full desktop, use for CLI/dev only' },
];

const knownIssues = [
  { title: 'NVIDIA Wayland Flicker', severity: 'Medium', status: 'Workaround', desc: 'Some RTX 30/40 series show flickering on Wayland with 550 driver. Use X11 session or downgrade to 535.', affected: 'NVIDIA RTX 30/40 series' },
  { title: 'Fractional Scaling Artifacts', severity: 'Low', status: 'Investigating', desc: '125%/150% scaling may show rendering artifacts in GTK3/4 apps. Use 100% or 200% for now.', affected: 'HiDPI displays with fractional scaling' },
  { title: 'Calamares NVMe Detection', severity: 'Medium', status: 'Fixed in next', desc: 'Installer may not detect all NVMe drives. Workaround: use manual partitioning.', affected: 'Some NVMe controllers' },
  { title: 'Bluetooth Initial Pairing', severity: 'Low', status: 'Workaround', desc: 'First pairing may fail. Restart bluetooth service: sudo systemctl restart bluetooth', affected: 'All Bluetooth hardware' },
  { title: 'Secure Boot Key Enrollment', severity: 'Low', status: 'Documented', desc: 'MOK enrollment required for NVIDIA/VMware modules. Follow on-screen prompts.', affected: 'Systems with Secure Boot enabled' },
];

export default function RequirementsPage() {
  const [activeTab, setActiveTab] = useState<'minimum' | 'recommended' | 'optimal'>('recommended');

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
              System Requirements
            </h1>
            <p className="text-lg lg:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500 delay-100">
              Detailed hardware requirements and compatibility information for running Mahoe 29.
            </p>
          </div>
        </div>
      </section>

      {/* Requirement Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 mb-8 justify-center">
            {[
              { id: 'minimum', name: 'Minimum', desc: 'Basic functionality' },
              { id: 'recommended', name: 'Recommended', desc: 'Great experience' },
              { id: 'optimal', name: 'Optimal', desc: 'Best performance' },
            ].map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'outline'}
                onClick={() => setActiveTab(tab.id as any)}
                className="min-w-[140px]"
              >
                <div className="text-left">
                  <div className="font-medium">{tab.name}</div>
                  <div className="text-xs opacity-75">{tab.desc}</div>
                </div>
              </Button>
            ))}
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {requirements[activeTab].map((req, index) => (
              <motion.div
                key={req.component}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card variant="interactive" className="group">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center flex-shrink-0">
                        <req.icon className="h-6 w-6 text-[var(--color-accent)]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-semibold text-[var(--color-text-primary)]">{req.component}</h3>
                          <Badge variant={req.met ? 'success' : 'error'} size="sm">
                            {req.met ? 'Supported' : 'Not Supported'}
                          </Badge>
                        </div>
                        <p className="text-lg font-mono text-[var(--color-accent)] mb-1">{req.spec}</p>
                        <p className="text-sm text-[var(--color-text-tertiary)]">{req.details}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware Compatibility */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Hardware Compatibility
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Tested and verified hardware components
            </p>
          </div>

          <div className="space-y-8">
            {Object.entries(supportedHardware).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                  {({ cpu: <Cpu />, gpu: <Monitor />, wifi: <Wifi />, audio: <Volume2 /> } as any)[category] || <HelpCircle />}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map(item => (
                    <Card key={item.models} variant="outlined">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-[var(--color-text-secondary)] text-sm">{item.vendor}</span>
                          <Badge variant={item.support === 'Excellent' ? 'success' : item.support === 'Good' ? 'outline' : 'warning'} size="sm">
                            {item.support}
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--color-text-primary)] font-mono mb-2">{item.models}</p>
                        <p className="text-xs text-[var(--color-text-tertiary)]">{item.notes}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Machine Support */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Virtual Machine Support
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Mahoe 29 runs well in virtual machines. Here's the compatibility matrix.
            </p>
          </div>

          <div className="space-y-4">
            {vmSupport.map(vm => (
              <Card key={vm.name} variant="outlined" className="overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-[var(--color-accent-light)] flex items-center justify-center">
                        <Monitor className="h-6 w-6 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--color-text-primary)]">{vm.name}</h3>
                        <Badge variant={vm.status === 'Excellent' ? 'success' : 'outline'} size="sm">{vm.status}</Badge>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {vm.features.map(f => (
                        <Badge key={f} variant="outline" size="sm">{f}</Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-text-tertiary)] mt-4">{vm.notes}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Known Issues */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Known Issues & Workarounds
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Current limitations and their workarounds in the Alpha release
            </p>
          </div>

          <div className="space-y-4">
            {knownIssues.map(issue => (
              <Card key={issue.title} variant="outlined">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0',
                      issue.severity === 'High' && 'bg-[var(--color-error)]/15 text-[var(--color-error)]',
                      issue.severity === 'Medium' && 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
                      issue.severity === 'Low' && 'bg-[var(--color-info)]/15 text-[var(--color-info)]'
                    )}>
                      {issue.severity === 'High' && <AlertTriangle className="h-5 w-5" />}
                      {issue.severity === 'Medium' && <AlertCircle className="h-5 w-5" />}
                      {issue.severity === 'Low' && <Info className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-[var(--color-text-primary)]">{issue.title}</h4>
                        <Badge variant={issue.severity === 'High' ? 'error' : issue.severity === 'Medium' ? 'warning' : 'outline'} size="sm">
                          {issue.severity}
                        </Badge>
                        <Badge variant={issue.status === 'Fixed in next' ? 'success' : 'outline'} size="sm">
                          {issue.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--color-text-secondary)] mt-2 ml-14">{issue.desc}</p>
                  <p className="text-xs text-[var(--color-text-tertiary)] mt-2 ml-14"><strong>Affected:</strong> {issue.affected}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Media */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Create Installation Media
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { os: 'Linux', tool: 'BalenaEtcher', desc: 'GUI, cross-platform, validated writes', cmd: 'Flatpak: flatpak install flathub com.balenaetcher.balenaEtcher', icon: Download },
              { os: 'Linux', tool: 'dd (CLI)', desc: 'Built-in, fastest, no verification', cmd: 'sudo dd if=mahoe-29.iso of=/dev/sdX bs=4M status=progress && sync', icon: Terminal },
              { os: 'Windows', tool: 'Rufus', desc: 'Best for Windows, DD mode recommended', cmd: 'Download from rufus.ie → Select ISO → DD Image mode → Start', icon: Download },
              { os: 'Windows', tool: 'BalenaEtcher', desc: 'Also works on Windows', cmd: 'Download from balena.io/etcher', icon: Download },
              { os: 'macOS', tool: 'BalenaEtcher', desc: 'GUI, easiest for macOS', cmd: 'brew install --cask balenaetcher', icon: Download },
              { os: 'macOS', tool: 'dd (CLI)', desc: 'Native, careful with disk identifier', cmd: 'diskutil list → sudo dd if=mahoe-29.iso of=/dev/rdiskX bs=4m', icon: Terminal },
            ].map((item, index) => (
              <Card key={index} variant="outlined">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-[var(--color-accent)]" />
                    <div>
                      <CardTitle className="text-lg">{item.os}</CardTitle>
                      <CardDescription>{item.tool}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
                  <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg font-mono text-xs overflow-x-auto">
                    <code>{item.cmd}</code>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Verify Download */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16 bg-[var(--color-bg-secondary)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4">
              Verify Your Download
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)]">
              Always verify the SHA-256 checksum before installing
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { os: 'Linux / macOS', cmd: 'sha256sum mahoe-29-alpha.iso', alt: 'shasum -a 256 mahoe-29-alpha.iso' },
              { os: 'Windows (PowerShell)', cmd: 'Get-FileHash mahoe-29-alpha.iso -Algorithm SHA256', alt: 'certutil -hashfile mahoe-29-alpha.iso SHA256' },
              { os: 'Verify Checksum File', cmd: 'sha256sum -c SHA256SUMS', alt: 'Compares all files in checksum file' },
            ].map(item => (
              <Card key={item.os} variant="outlined">
                <CardHeader>
                  <CardTitle>{item.os}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg font-mono text-sm overflow-x-auto">
                    <code>{item.cmd}</code>
                  </div>
                  <div className="p-3 bg-[var(--color-surface-primary)] rounded-lg font-mono text-sm overflow-x-auto text-[var(--color-text-tertiary)]">
                    <code>{item.alt}</code>
                  </div>
                  <p className="text-xs text-[var(--color-text-tertiary)]">Compare output with the .sha256 file from the release page</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Missing import
import { Volume2 } from 'lucide-react';