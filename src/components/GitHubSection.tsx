import React, { useState, useEffect, useMemo } from 'react';
import {
  Github,
  Star,
  GitFork,
  RefreshCw,
  ExternalLink,
  Search,
  SlidersHorizontal,
  AlertTriangle,
  FolderGit2,
  Check,
  UserCheck,
} from 'lucide-react';
import { siteConfig } from '../data/config';
import { fetchGitHubProfile, GitHubFetchResult } from '../services/githubService';
import { GitHubRepo, GitHubUser } from '../types';

export const GitHubSection: React.FC = () => {
  const [username, setUsername] = useState<string>(siteConfig.githubUsername);
  const [inputUsername, setInputUsername] = useState<string>(siteConfig.githubUsername);
  const [loading, setLoading] = useState<boolean>(true);
  const [result, setResult] = useState<GitHubFetchResult | null>(null);

  // Client search and filter states
  const [repoSearch, setRepoSearch] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'updated' | 'stars'>('updated');

  const loadData = async (userToFetch: string) => {
    setLoading(true);
    const data = await fetchGitHubProfile(userToFetch);
    setResult(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData(username);
  }, [username]);

  const handleApplyUsername = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setUsername(inputUsername.trim());
    }
  };

  // Distinct programming languages in repos
  const languages = useMemo(() => {
    if (!result?.repos) return ['All'];
    const langs = new Set<string>();
    result.repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ['All', ...Array.from(langs)];
  }, [result?.repos]);

  // Filtered and sorted repositories
  const filteredRepos = useMemo(() => {
    if (!result?.repos) return [];

    return result.repos
      .filter((repo) => {
        if (selectedLanguage !== 'All' && repo.language !== selectedLanguage) {
          return false;
        }
        if (repoSearch.trim()) {
          const q = repoSearch.toLowerCase();
          const matchName = repo.name.toLowerCase().includes(q);
          const matchDesc = repo.description?.toLowerCase().includes(q);
          if (!matchName && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
  }, [result?.repos, selectedLanguage, repoSearch, sortBy]);

  return (
    <section id="github" className="py-20 border-b border-[#292F32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-xs font-mono-code uppercase tracking-wider text-[#C7FF4F]">
              03. Public Activity & Codebases
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F2] mt-2">
              GitHub Sync & Repositories
            </h2>
            <p className="text-sm sm:text-base text-[#A4AAA9] mt-2 max-w-2xl">
              Live data retrieved via the public GitHub REST API. Inspect repositories, commit activity, and active programming languages without artificial metrics.
            </p>
          </div>

          {/* Quick Username Switcher & Refresh */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleApplyUsername} className="flex items-center gap-1.5">
              <input
                type="text"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                placeholder="GitHub handle..."
                aria-label="GitHub username"
                className="px-2.5 py-1.5 text-xs bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] focus:border-[#C7FF4F] focus:outline-none w-36"
              />
              <button
                type="submit"
                className="px-2.5 py-1.5 text-xs font-medium text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors whitespace-nowrap"
              >
                Sync
              </button>
            </form>

            <button
              onClick={() => loadData(username)}
              disabled={loading}
              className="p-1.5 text-[#A4AAA9] hover:text-[#F5F5F2] hover:bg-[#171B1F] rounded-lg border border-[#292F32] transition-colors disabled:opacity-50"
              aria-label="Refresh GitHub data"
              title="Refresh GitHub data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#C7FF4F]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Informational Notice */}
        <div className="p-3 mb-8 rounded-lg bg-[#121518] border border-[#292F32] flex items-center justify-between text-xs text-[#A4AAA9]">
          <span className="flex items-center gap-2">
            <Github className="w-4 h-4 text-[#C7FF4F] shrink-0" />
            <span>
              Connected to public GitHub API endpoint (<code>api.github.com/users/{username}</code>). Only public repository telemetry is queryable without authentication tokens.
            </span>
          </span>
          {result?.isCached && (
            <span className="text-[11px] font-mono-code text-[#6B7280] hidden sm:inline">
              Cached (5m TTL)
            </span>
          )}
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="space-y-6">
            <div className="h-32 rounded-2xl bg-[#171B1F] border border-[#292F32] animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-44 rounded-xl bg-[#171B1F] border border-[#292F32] animate-pulse" />
              ))}
            </div>
          </div>
        )}

        {/* Rate Limited State */}
        {!loading && result?.rateLimited && (
          <div className="p-8 rounded-2xl bg-[#1F1717] border border-[#4A2020] text-center max-w-xl mx-auto my-6">
            <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#F5F5F2]">GitHub API Rate Limit Reached</h3>
            <p className="text-xs text-[#A4AAA9] mt-2 mb-4 leading-relaxed">
              GitHub limits unauthenticated REST calls to 60 queries/hour per IP.
              {result.rateLimitReset && (
                <span className="block mt-1 text-[#F5F5F2] font-mono-code">
                  Resets around: {new Date(result.rateLimitReset).toLocaleTimeString()}
                </span>
              )}
            </p>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0B0D0F] bg-[#C7FF4F] rounded-lg hover:bg-[#B5F237] transition-colors"
            >
              <span>View @{username} Directly on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* User Not Found or Error State */}
        {!loading && !result?.rateLimited && result?.error && (
          <div className="p-8 rounded-2xl bg-[#121518] border border-[#292F32] text-center max-w-lg mx-auto my-6">
            <UserCheck className="w-8 h-8 text-[#A4AAA9] mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-[#F5F5F2]">User Not Found</h3>
            <p className="text-xs text-[#A4AAA9] mt-2 mb-5">
              {result.error}. Enter a valid public GitHub username above to load genuine repositories.
            </p>
            <button
              onClick={() => {
                setInputUsername('torvalds');
                setUsername('torvalds');
              }}
              className="px-3.5 py-1.5 text-xs text-[#F5F5F2] bg-[#171B1F] hover:bg-[#1D2228] border border-[#292F32] rounded-lg transition-colors"
            >
              Test with public account (e.g. torvalds)
            </button>
          </div>
        )}

        {/* Profile Card & Repositories Display */}
        {!loading && !result?.rateLimited && result?.user && (
          <div className="space-y-8">
            {/* Live Profile Header Card */}
            <div className="bg-[#121518] border border-[#292F32] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={result.user.avatar_url}
                  alt={`${result.user.login}'s GitHub avatar`}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl border border-[#292F32] object-cover bg-[#171B1F]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#F5F5F2]">
                      {result.user.name || result.user.login}
                    </h3>
                    <span className="text-xs font-mono-code text-[#A4AAA9]">
                      @{result.user.login}
                    </span>
                  </div>
                  {result.user.bio && (
                    <p className="text-xs text-[#A4AAA9] mt-1 max-w-md line-clamp-2">
                      {result.user.bio}
                    </p>
                  )}
                  {result.user.location && (
                    <p className="text-[11px] text-[#6B7280] font-mono-code mt-1">
                      📍 {result.user.location}
                    </p>
                  )}
                </div>
              </div>

              {/* GitHub Stats Strip (Real, not fake) */}
              <div className="flex items-center gap-6 sm:gap-8 self-stretch sm:self-auto justify-around sm:justify-end pt-4 sm:pt-0 border-t sm:border-t-0 border-[#292F32]">
                <div className="text-center">
                  <span className="text-lg font-bold font-mono-code text-[#F5F5F2] tabular-nums">
                    {result.user.public_repos}
                  </span>
                  <p className="text-[11px] text-[#A4AAA9]">Repositories</p>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold font-mono-code text-[#F5F5F2] tabular-nums">
                    {result.user.followers}
                  </span>
                  <p className="text-[11px] text-[#A4AAA9]">Followers</p>
                </div>
                <div className="text-center">
                  <span className="text-lg font-bold font-mono-code text-[#F5F5F2] tabular-nums">
                    {result.user.following}
                  </span>
                  <p className="text-[11px] text-[#A4AAA9]">Following</p>
                </div>

                <a
                  href={result.user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#171B1F] border border-[#292F32] hover:border-[#3E4549] text-[#F5F5F2] transition-colors"
                  aria-label="Open GitHub Profile"
                  title="Open GitHub Profile"
                >
                  <ExternalLink className="w-4 h-4 text-[#C7FF4F]" />
                </a>
              </div>
            </div>

            {/* Repositories Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#121518] p-4 rounded-xl border border-[#292F32]">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  placeholder="Search repositories..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#171B1F] border border-[#292F32] rounded-lg text-[#F5F5F2] placeholder-[#6B7280] focus:border-[#C7FF4F] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {/* Language Filter */}
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-[#171B1F] border border-[#292F32] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F2] focus:border-[#C7FF4F] focus:outline-none"
                  aria-label="Filter repositories by language"
                >
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang === 'All' ? 'All Languages' : lang}
                    </option>
                  ))}
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars')}
                  className="bg-[#171B1F] border border-[#292F32] rounded-lg px-2.5 py-1.5 text-xs text-[#F5F5F2] focus:border-[#C7FF4F] focus:outline-none"
                  aria-label="Sort repositories"
                >
                  <option value="updated">Recently Updated</option>
                  <option value="stars">Most Stars</option>
                </select>
              </div>
            </div>

            {/* Repositories Grid */}
            {filteredRepos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRepos.map((repo) => (
                  <div
                    key={repo.id}
                    className="bg-[#171B1F] border border-[#292F32] hover:border-[#3E4549] rounded-xl p-5 flex flex-col justify-between transition-colors group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-bold text-[#F5F5F2] group-hover:text-[#C7FF4F] transition-colors truncate max-w-[200px]"
                        >
                          {repo.name}
                        </a>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#A4AAA9] hover:text-[#F5F5F2] p-1"
                          aria-label={`Open ${repo.name} repository`}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      <p className="text-xs text-[#A4AAA9] line-clamp-2 leading-relaxed mb-4">
                        {repo.description || 'No description provided.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#242A2E] text-xs font-mono-code text-[#A4AAA9]">
                      <div className="flex items-center gap-2">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 text-[#F5F5F2]">
                            <span className="w-2 h-2 rounded-full bg-[#C7FF4F]" />
                            <span>{repo.language}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400" />
                          <span className="tabular-nums">{repo.stargazers_count}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3 text-[#A4AAA9]" />
                          <span className="tabular-nums">{repo.forks_count}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-[#121518] border border-[#292F32] rounded-xl text-center">
                <p className="text-xs text-[#A4AAA9]">
                  No repositories match your current filter criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
