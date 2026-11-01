export interface GitHubRelease {
  tag_name: string;
  name: string;
  body: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: GitHubAsset[];
  html_url: string;
}

export interface GitHubAsset {
  id: number;
  name: string;
  label: string | null;
  content_type: string;
  state: string;
  size: number;
  download_count: number;
  created_at: string;
  updated_at: string;
  browser_download_url: string;
}

export interface MahoeRelease {
  version: string;
  name: string;
  description: string;
  date: string;
  prerelease: boolean;
  draft: boolean;
  assets: MahoeAsset[];
  url: string;
}

export interface MahoeAsset {
  name: string;
  label: string;
  size: number;
  downloadUrl: string;
  type: 'iso' | 'installer' | 'checksum' | 'other';
  architecture?: string;
}

export interface DownloadCategory {
  id: string;
  name: string;
  description: string;
  releases: MahoeRelease[];
}

const GITHUB_REPO = 'mahoe-os/mahoe-29';
const GITHUB_API_BASE = 'https://api.github.com';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let releaseCache: { data: MahoeRelease[]; timestamp: number } | null = null;

function classifyAsset(asset: GitHubAsset): MahoeAsset['type'] {
  const name = asset.name.toLowerCase();
  if (name.endsWith('.iso')) return 'iso';
  if (name.includes('installer') || name.endsWith('.exe') || name.endsWith('.dmg') || name.endsWith('.appimage')) return 'installer';
  if (name.includes('sha256') || name.includes('checksum') || name.endsWith('.sha256') || name.endsWith('.sha256sum')) return 'checksum';
  return 'other';
}

function getArchitecture(name: string): string | undefined {
  const lower = name.toLowerCase();
  if (lower.includes('x86_64') || lower.includes('amd64')) return 'x86_64';
  if (lower.includes('arm64') || lower.includes('aarch64')) return 'arm64';
  if (lower.includes('i386') || lower.includes('i686')) return 'x86';
  return undefined;
}

function transformRelease(release: GitHubRelease): MahoeRelease {
  return {
    version: release.tag_name.replace(/^v/, ''),
    name: release.name || release.tag_name,
    description: release.body || '',
    date: release.published_at || release.created_at,
    prerelease: release.prerelease,
    draft: release.draft,
    url: release.html_url,
    assets: release.assets.map(asset => ({
      name: asset.name,
      label: asset.label || asset.name,
      size: asset.size,
      downloadUrl: asset.browser_download_url,
      type: classifyAsset(asset),
      architecture: getArchitecture(asset.name),
    })),
  };
}

async function fetchWithCache<T>(url: string, cacheKey: string): Promise<T> {
  const now = Date.now();
  if (releaseCache && (now - releaseCache.timestamp) < CACHE_DURATION) {
    return releaseCache.data as T;
  }

  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Mahoe-Website/1.0',
    },
    next: { revalidate: 300 }, // 5 minutes for Next.js cache
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchReleases(): Promise<MahoeRelease[]> {
  try {
    const releases = await fetchWithCache<GitHubRelease[]>(
      `${GITHUB_API_BASE}/repos/${GITHUB_REPO}/releases?per_page=20`,
      'releases'
    );

    const transformed = releases
      .filter(r => !r.draft)
      .map(transformRelease);

    releaseCache = { data: transformed, timestamp: Date.now() };
    return transformed;
  } catch (error) {
    console.error('Failed to fetch releases:', error);
    // Return empty array on error - UI will show unavailable state
    return [];
  }
}

export async function fetchLatestRelease(): Promise<MahoeRelease | null> {
  const releases = await fetchReleases();
  const stable = releases.find(r => !r.prerelease);
  return stable || releases[0] || null;
}

export function getAssetByType(release: MahoeRelease, type: MahoeAsset['type']): MahoeAsset | undefined {
  return release.assets.find(a => a.type === type);
}

export function getIsoAsset(release: MahoeRelease): MahoeAsset | undefined {
  return getAssetByType(release, 'iso');
}

export function getInstallerAsset(release: MahoeRelease): MahoeAsset | undefined {
  return getAssetByType(release, 'installer');
}

export function getChecksumAsset(release: MahoeRelease): MahoeAsset | undefined {
  return getAssetByType(release, 'checksum');
}

export function formatReleaseDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function getReleaseChannel(release: MahoeRelease): 'stable' | 'beta' | 'experimental' {
  if (release.prerelease) {
    if (release.version.includes('alpha') || release.version.includes('dev')) {
      return 'experimental';
    }
    return 'beta';
  }
  return 'stable';
}

export const downloadCategories: DownloadCategory[] = [
  {
    id: 'stable',
    name: 'Stable Releases',
    description: 'Production-ready releases recommended for daily use.',
    releases: [],
  },
  {
    id: 'beta',
    name: 'Beta Releases',
    description: 'Pre-release versions for testing upcoming features.',
    releases: [],
  },
  {
    id: 'experimental',
    name: 'Experimental Builds',
    description: 'Cutting-edge builds with latest changes. May be unstable.',
    releases: [],
  },
];

export function categorizeReleases(releases: MahoeRelease[]): DownloadCategory[] {
  return downloadCategories.map(cat => ({
    ...cat,
    releases: releases.filter(r => getReleaseChannel(r) === cat.id),
  }));
}