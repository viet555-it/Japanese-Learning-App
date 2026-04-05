import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp, ChevronDown, MessageSquare, Share2, ImagePlus, Send, Users, Sparkles, CheckCircle2, X } from 'lucide-react';
import { getFeedbacks, submitFeedback, upvoteFeedback } from '../../api/feedbackApi';

const CATEGORIES = [
  'Bug Report',
  'Feature Request',
  'Translation Error',
  'UI / UX',
  'Performance',
  'Content Request',
  'Other',
];

const RATINGS = [
  { id: 'angry',   emoji: '😡', label: 'Angry' },
  { id: 'sad',     emoji: '😕', label: 'Sad' },
  { id: 'neutral', emoji: '😐', label: 'Neutral' },
  { id: 'happy',   emoji: '😊', label: 'Happy' },
  { id: 'love',    emoji: '🥰', label: 'Love' },
];

const CATEGORY_COLORS = {
  'Bug Report':        'bg-red-500/20 text-red-300 border-red-500/30',
  'Feature Request':   'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  'Translation Error': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'UI / UX':           'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'Performance':       'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'Content Request':   'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Other':             'bg-gray-500/20 text-gray-300 border-gray-500/30',
};

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function UserAvatar({ name, avatarUrl, size = 40 }) {
  const initials = (name || 'A').charAt(0).toUpperCase();
  if (avatarUrl) return <img src={avatarUrl} alt={name} className="rounded-full object-cover flex-shrink-0" style={{ width: size, height: size }} />;
  const colors = ['bg-pink-500', 'bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500', 'bg-cyan-500'];
  const color = colors[(name || 'A').charCodeAt(0) % colors.length];
  return (
    <div className={`${color} rounded-full flex items-center justify-center text-white font-black flex-shrink-0`} style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {initials}
    </div>
  );
}

function FeedCard({ post, onUpvote }) {
  const [voted, setVoted] = useState(false);
  const [votes, setVotes] = useState(post.upvotes || 0);
  const catClass = CATEGORY_COLORS[post.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  const ratingEmoji = RATINGS.find(r => r.id === post.rating)?.emoji || '😊';

  const handleVote = async () => {
    if (voted) return;
    setVoted(true);
    setVotes(v => v + 1);
    try { await onUpvote(post.id); } catch {}
  };

  return (
    <div className="w-full rounded-2xl border border-white/[0.06] bg-white/[0.025] hover:bg-white/[0.04] transition-all duration-200 p-8 flex gap-6">
      {/* Vote column */}
      <div className="flex flex-col items-center gap-2 min-w-[52px]">
        <button
          onClick={handleVote}
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${voted ? 'bg-[var(--accent-color)]/20 text-[var(--accent-color)]' : 'bg-white/5 text-white/40 hover:text-[var(--accent-color)]'}`}
        >
          <ChevronUp size={22} strokeWidth={2.5} />
        </button>
        <span className={`text-[20px] font-black leading-none ${voted ? 'text-[var(--accent-color)]' : 'text-white/50'}`}>{votes}</span>
        <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-white/20 hover:text-white/50 transition-all">
          <ChevronDown size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <UserAvatar name={post.author_name} avatarUrl={post.author_avatar} size={42} />
            <div>
              <p className="font-bold text-[16px] text-white/90 leading-none mb-1.5">{post.author_name || 'Anonymous'}</p>
              <p className="text-white/35 text-[13px]">{timeAgo(post.created_at)}</p>
            </div>
          </div>
          <span className={`text-[11px] font-black uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border flex-shrink-0 ${catClass}`}>
            {post.category}
          </span>
        </div>

        <div className="flex items-start gap-4 mb-5">
          <span className="text-[32px] leading-none flex-shrink-0">{ratingEmoji}</span>
          <p className="text-[16px] text-white/70 leading-relaxed">{post.description}</p>
        </div>

        {post.image_data && (
          <div className="mb-5 rounded-xl overflow-hidden max-w-md border border-white/10">
            <img src={post.image_data} alt="Evidence" className="w-full object-cover hover:opacity-100 opacity-80 transition-opacity" />
          </div>
        )}

        <div className="flex items-center gap-6 text-white/25 text-[14px] pt-4 border-t border-white/[0.05]">
          <button className="flex items-center gap-2 hover:text-white/60 transition-colors">
            <MessageSquare size={15} /> Comments
          </button>
          <button className="flex items-center gap-2 hover:text-white/60 transition-colors">
            <Share2 size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  const [tab, setTab] = useState('form');
  const [rating, setRating] = useState('love');
  const [category, setCategory] = useState(CATEGORIES[1]);
  const [description, setDescription] = useState('');
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(false);
  const fileRef = useRef();

  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const loadFeed = async () => {
    setLoadingFeed(true);
    try {
      const data = await getFeedbacks();
      setFeedbacks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingFeed(false);
    }
  };

  // Load feed on mount AND whenever user switches to community tab
  useEffect(() => {
    loadFeed();
  }, [tab]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) { alert('Image too large! Max 3MB.'); return; }
    const reader = new FileReader();
    reader.onloadend = () => { setImageData(reader.result); setImagePreview(reader.result); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!description.trim()) { alert('Please describe your experience!'); return; }
    if (!user) { alert('You need to be logged in to submit feedback!'); return; }
    setSubmitting(true);
    try {
      const result = await submitFeedback({ user_id: user.UserID, rating, category, description, image_data: imageData });
      // Prepend new post to community feed immediately (optimistic update)
      const newPost = {
        id: result.id || Date.now(),
        author_name: user.DisplayName || user.Username || 'Anonymous',
        author_avatar: user.Avatar || null,
        rating,
        category,
        description,
        image_data: imageData,
        upvotes: 0,
        created_at: new Date().toISOString(),
      };
      setFeedbacks(prev => [newPost, ...prev]);
      // Reset form
      setDescription('');
      setImageData(null);
      setImagePreview(null);
      setRating('love');
      setCategory(CATEGORIES[1]);
      // Show success toast
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
      // Also reload from server to make sure DB persisted it
      setTimeout(() => loadFeed(), 1000);
    } catch (e) {
      console.error('Feedback submit error:', e);
      alert('Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col text-[var(--text-color)]">

      {/* Success toast */}
      {success && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-[var(--bg-color)] border border-[var(--accent-color)]/50 rounded-2xl px-8 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 size={24} style={{ color: 'var(--accent-color)' }} />
          <div>
            <p className="font-black text-[15px]">Feedback submitted! 🎉</p>
            <p className="text-[12px] opacity-50">Check Feedback Community to see your post.</p>
          </div>
        </div>
      )}

      {/* ── Header + Tabs ── */}
      <div className="w-full border-b border-white/[0.05]">
        <div className="px-12 pt-8 pb-0 flex items-end justify-between">
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-1">
              <MessageSquare size={26} style={{ color: 'var(--accent-color)' }} />
              <h1 className="text-2xl font-black tracking-tight">Feedback</h1>
            </div>
            <p className="text-[13px] opacity-40 pl-10">Share your experience &amp; help us improve GoJapan</p>
          </div>

          {/* Tabs — right-aligned, bottom-flush */}
          <div className="flex gap-0 self-end">
            <button
              onClick={() => setTab('form')}
              className={`px-7 py-3 text-[14px] font-bold transition-all border-b-2 flex items-center gap-2 ${
                tab === 'form'
                  ? 'border-[var(--accent-color)] text-[var(--accent-color)]'
                  : 'border-transparent opacity-40 hover:opacity-70'
              }`}
            >
              <Sparkles size={14} /> Submit Feedback
            </button>
            <button
              onClick={() => setTab('community')}
              className={`px-7 py-3 text-[14px] font-bold transition-all border-b-2 flex items-center gap-2 ${
                tab === 'community'
                  ? 'border-[var(--accent-color)] text-[var(--accent-color)]'
                  : 'border-transparent opacity-40 hover:opacity-70'
              }`}
            >
              <Users size={14} /> Feedback Community
              {feedbacks.length > 0 && (
                <span className="text-[11px] font-black bg-[var(--accent-color)]/20 text-[var(--accent-color)] px-2 py-0.5 rounded-full">{feedbacks.length}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── FORM TAB ── */}
      {tab === 'form' && (
        <div className="flex-1 px-12 py-10 animate-in fade-in duration-300">
          <div className="w-full max-w-5xl space-y-10">

            {/* Rating */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] opacity-40 mb-5">How is your experience?</p>
              <div className="w-full flex gap-4">
                {RATINGS.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setRating(r.id)}
                    className={`flex-1 flex flex-col items-center gap-3 rounded-2xl py-6 transition-all duration-200 border ${
                      rating === r.id
                        ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10 scale-[1.04]'
                        : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:scale-[1.02]'
                    }`}
                  >
                    <span className="text-5xl">{r.emoji}</span>
                    <span className={`text-[12px] font-black uppercase tracking-widest ${rating === r.id ? 'text-[var(--accent-color)]' : 'opacity-30'}`}>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Category + Image */}
            <div className="w-full flex gap-6">
              <div className="flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] opacity-40 mb-4">Category</p>
                <div className="relative">
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full appearance-none rounded-2xl px-6 py-4 text-[15px] font-bold outline-none focus:border-[var(--accent-color)] transition-all cursor-pointer border border-white/[0.07]"
                    style={{ color: 'var(--text-color)', background: 'rgba(255,255,255,0.03)' }}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c} style={{ background: '#1a1a1a' }}>{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />
                </div>
              </div>

              <div className="flex-1">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] opacity-40 mb-4">Visual Evidence</p>
                <div className="flex items-center gap-4">
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="h-[54px] px-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.07] hover:border-[var(--accent-color)] transition-all flex items-center gap-3 group"
                  >
                    <ImagePlus size={20} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[14px] font-bold opacity-50 group-hover:opacity-100 transition-opacity">Upload image</span>
                  </button>
                  {imagePreview && (
                    <div className="relative h-[54px] w-[80px] rounded-2xl overflow-hidden border border-white/10">
                      <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                      <button
                        onClick={() => { setImageData(null); setImagePreview(null); }}
                        className="absolute top-1 right-1 bg-black/80 rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-500 transition-colors"
                      >
                        <X size={10} className="text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="w-full">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] opacity-40 mb-4">Tell us more...</p>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Provide specific details about your experience. Be as technical or descriptive as needed..."
                rows={7}
                className="w-full rounded-2xl px-7 py-5 text-[15px] outline-none transition-all resize-none leading-relaxed border border-white/[0.07] focus:border-[var(--accent-color)]"
                style={{ color: 'var(--text-color)', background: 'rgba(255,255,255,0.025)' }}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={submitting || !description.trim()}
              className="w-full bg-white text-black flex items-center justify-center gap-3 text-[17px] py-5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting
                ? <><div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Sending...</>
                : <><Send size={18} /> Send Feedback</>
              }
            </button>

            {!user && (
              <p className="text-center text-[13px] opacity-40">⚠ You need to be logged in to submit feedback.</p>
            )}
          </div>
        </div>
      )}

      {/* ── COMMUNITY TAB ── */}
      {tab === 'community' && (
        <div className="flex-1 px-12 py-10 animate-in fade-in duration-300">
          <div className="w-full max-w-5xl space-y-5">
            {loadingFeed ? (
              <div className="py-32 flex flex-col items-center gap-5 opacity-40">
                <div className="w-10 h-10 border-2 border-white/20 border-t-[var(--accent-color)] rounded-full animate-spin" />
                <p className="text-[15px]">Loading community feed...</p>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="py-32 flex flex-col items-center gap-4 opacity-40">
                <MessageSquare size={64} className="opacity-30" />
                <p className="text-xl font-black">No feedback yet</p>
                <p className="text-[14px]">Be the first to share your experience!</p>
              </div>
            ) : (
              feedbacks.map(post => (
                <FeedCard key={post.id} post={post} onUpvote={upvoteFeedback} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
