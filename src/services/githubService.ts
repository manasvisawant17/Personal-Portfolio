import { GitHubUser, GitHubRepo } from '../types';

interface GitHubCacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

export interface GitHubFetchResult {
  user: GitHubUser | null;
  repos: GitHubRepo[];
  rateLimited: boolean;
  rateLimitReset?: number;
  error?: string;
  isCached?: boolean;
}

export async function fetchGitHubProfile(username: string): Promise<GitHubFetchResult> {
  const cleanUsername = username.trim();
  if (!cleanUsername) {
    return {
      user: null,
      repos: [],
      rateLimited: false,
      error: 'No GitHub username configured.'
    };
  }

  const cacheKey = `gh_cache_${cleanUsername.toLowerCase()}`;

  // Check cache
  try {
    const cachedStr = sessionStorage.getItem(cacheKey);
    if (cachedStr) {
      const cached = JSON.parse(cachedStr) as GitHubCacheEntry<{ user: GitHubUser; repos: GitHubRepo[] }>;
      if (Date.now() - cached.timestamp < CACHE_TTL_MS) {
        return {
          user: cached.data.user,
          repos: cached.data.repos,
          rateLimited: false,
          isCached: true
        };
      }
    }
  } catch {
    // Ignore sessionStorage issues
  }

  try {
    const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(cleanUsername)}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (userRes.status === 403) {
      const resetHeader = userRes.headers.get('x-ratelimit-reset');
      return {
        user: null,
        repos: [],
        rateLimited: true,
        rateLimitReset: resetHeader ? parseInt(resetHeader, 10) * 1000 : undefined,
        error: 'GitHub API hourly rate limit reached for unauthenticated requests.'
      };
    }

    if (userRes.status === 404) {
      return {
        user: null,
        repos: [],
        rateLimited: false,
        error: `GitHub user "${cleanUsername}" was not found.`
      };
    }

    if (!userRes.ok) {
      return {
        user: null,
        repos: [],
        rateLimited: false,
        error: `GitHub API error (${userRes.status}: ${userRes.statusText})`
      };
    }

    const userData: GitHubUser = await userRes.json();

    // Fetch repositories
    const reposRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(cleanUsername)}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    let reposData: GitHubRepo[] = [];
    if (reposRes.ok) {
      reposData = await reposRes.json();
    }

    // Filter out forks or keep all (we keep non-forks prioritized)
    const sortedRepos = Array.isArray(reposData) ? reposData : [];

    // Cache successful result
    try {
      sessionStorage.setItem(
        cacheKey,
        JSON.stringify({
          data: { user: userData, repos: sortedRepos },
          timestamp: Date.now()
        })
      );
    } catch {
      // Storage quota or disabled
    }

    return {
      user: userData,
      repos: sortedRepos,
      rateLimited: false
    };
  } catch (err) {
    return {
      user: null,
      repos: [],
      rateLimited: false,
      error: err instanceof Error ? err.message : 'Network failure reaching GitHub API.'
    };
  }
}
