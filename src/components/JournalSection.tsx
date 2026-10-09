import React, { useState } from 'react';
import { BookOpen, ArrowRight, X, Calendar, Clock, Tag } from 'lucide-react';
import { journalPostsData } from '../data/journal';
import { JournalPost } from '../types';

export const JournalSection: React.FC = () => {
  const [activePost, setActivePost] = useState<JournalPost | null>(null);

  return (
    <section id="journal" className="py-20 border-b border-[#292F32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-mono-code uppercase tracking-wider text-[#C7FF4F]">
            07. Engineering Log & Technical Notes
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F2] mt-2">
            Developer Journal & Learning Notes
          </h2>
          <p className="text-sm sm:text-base text-[#A4AAA9] mt-2 max-w-2xl leading-relaxed">
            Concise technical notes, debugging takeaways, and architectural reflections authored while developing coursework and prototypes.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {journalPostsData.map((post) => (
            <article
              key={post.id}
              className="bg-[#171B1F] border border-[#292F32] hover:border-[#3E4549] rounded-2xl p-6 flex flex-col justify-between transition-colors group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[#A4AAA9] mb-3 font-mono-code">
                  <span className="text-[#C7FF4F] font-semibold">{post.topic}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-base font-bold text-[#F5F5F2] group-hover:text-[#C7FF4F] transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#A4AAA9] leading-relaxed mb-6 line-clamp-3">
                  {post.summary}
                </p>

                {/* Tags as clean unboxed typography */}
                <div className="flex flex-wrap items-center gap-1.5 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] font-mono-code rounded bg-[#121518] border border-[#292F32] text-[#A4AAA9]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#292F32] flex items-center justify-between">
                <span className="text-xs text-[#6B7280] font-mono-code">{post.date}</span>
                <button
                  onClick={() => setActivePost(post)}
                  className="text-xs font-semibold text-[#F5F5F2] hover:text-[#C7FF4F] transition-colors flex items-center gap-1.5"
                >
                  <span>Read Note</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reader Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="journal-reader-title"
        >
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setActivePost(null)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-2xl bg-[#121518] border border-[#292F32] rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-[#292F32] bg-[#171B1F] flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-[#A4AAA9] mb-1 font-mono-code">
                  <span className="text-[#C7FF4F]">{activePost.topic}</span>
                  <span>·</span>
                  <span>{activePost.date}</span>
                  <span>·</span>
                  <span>{activePost.readTime}</span>
                </div>
                <h2 id="journal-reader-title" className="text-xl font-bold text-[#F5F5F2]">
                  {activePost.title}
                </h2>
              </div>
              <button
                onClick={() => setActivePost(null)}
                className="p-1.5 text-[#A4AAA9] hover:text-[#F5F5F2] rounded-lg border border-transparent hover:border-[#292F32]"
                aria-label="Close article modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#A4AAA9] leading-relaxed whitespace-pre-line">
              <p className="font-medium text-[#F5F5F2] bg-[#171B1F] p-4 rounded-xl border border-[#292F32]">
                {activePost.summary}
              </p>
              <div className="pt-2 text-[#D1D5DB]">
                {activePost.content}
              </div>
            </div>

            <div className="p-4 border-t border-[#292F32] bg-[#171B1F] flex items-center justify-between">
              <span className="text-xs text-[#6B7280] font-mono-code">
                Authored by Manasvi Sawant · Parul University
              </span>
              <button
                onClick={() => setActivePost(null)}
                className="px-4 py-2 text-xs font-semibold text-[#0B0D0F] bg-[#C7FF4F] hover:bg-[#B5F237] rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
