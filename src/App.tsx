import React, { useState, useEffect, useMemo } from 'react';
import { Language, CategoryId } from './types';
import { CATEGORIES, SURVIVAL_PHRASES, EMERGENCY_CONTACTS, SAMPLE_QUIZ } from './data/mockSurvivalData';
import { Header } from './components/Header';
import { QuickSearch } from './components/QuickSearch';
import { CategoryCard } from './components/CategoryCard';
import { PhraseCard } from './components/PhraseCard';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { EmergencyModal } from './components/EmergencyModal';
import { ValidatorModal } from './components/ValidatorModal';
import { QuizModal } from './components/QuizModal';
import { Bookmark, Sparkles, AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  // Application State
  const [language, setLanguage] = useState<Language>('id');
  const [activeTab, setActiveTab] = useState<ActiveTab>('guide');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('transport');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  // Listen for PWA beforeinstallprompt event
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Load saved bookmarks
    const savedBookmarks = localStorage.getItem('semarang_bookmarks');
    if (savedBookmarks) {
      try {
        setBookmarkedIds(JSON.parse(savedBookmarks));
      } catch (err) {
        console.error('Error loading bookmarks', err);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('semarang_bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  // Filtered Phrases
  const filteredPhrases = useMemo(() => {
    return SURVIVAL_PHRASES.filter((p) => {
      // Bookmark filter
      if (showBookmarksOnly && !bookmarkedIds.includes(p.id)) {
        return false;
      }

      // Tag filter
      if (activeTag && !p.tags.includes(activeTag)) {
        return false;
      }

      // Search query filter (searches across Indonesian, English, and tags)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchId = p.phraseId.toLowerCase().includes(query);
        const matchEn = p.phraseEn.toLowerCase().includes(query);
        const matchNoteId = p.contextNoteId.toLowerCase().includes(query);
        const matchNoteEn = p.contextNoteEn.toLowerCase().includes(query);
        const matchTag = p.tags.some((t) => t.toLowerCase().includes(query));
        return matchId || matchEn || matchNoteId || matchNoteEn || matchTag;
      }

      // Category filter (only applied when search is empty)
      return p.categoryId === selectedCategory;
    });
  }, [selectedCategory, searchQuery, activeTag, showBookmarksOnly, bookmarkedIds]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white">
      {/* Sticky Header */}
      <Header
        language={language}
        onToggleLanguage={() => setLanguage((prev) => (prev === 'id' ? 'en' : 'id'))}
        deferredPrompt={deferredPrompt}
        onInstallPwa={handleInstallPwa}
        isInstalled={isInstalled}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-4 pb-24">
        {/* TAB 1: GUIDE (BUKU SAKU PANDUAN) */}
        {activeTab === 'guide' && (
          <div className="space-y-4">
            {/* Academic Greeting Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-4 sm:p-5 shadow-sm border border-slate-800 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-xs text-orange-400 font-bold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {language === 'id'
                      ? 'Selamat Datang di Kota Semarang'
                      : 'Welcome to Semarang City'}
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-snug">
                  {language === 'id'
                    ? 'Buku Saku Adaptasi Bahasa & Budaya Mahasiswa Asing'
                    : 'Language & Cultural Survival Handbook for International Students'}
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-lg leading-relaxed">
                  {language === 'id'
                    ? 'Media pembelajaran mandiri berbasis Mobile (MALL) untuk memudahkan komunikasi praktis sehari-hari di kampus dan masyarakat lokal.'
                    : 'Mobile-Assisted Language Learning (MALL) guide designed for effortless daily interactions in Semarang.'}
                </p>
              </div>
            </div>

            {/* Quick Search & Popular Tags */}
            <QuickSearch
              language={language}
              searchQuery={searchQuery}
              onSearchChange={(q) => {
                setSearchQuery(q);
                if (q) setShowBookmarksOnly(false);
              }}
              activeTag={activeTag}
              onSelectTag={(t) => {
                setActiveTag(t);
                if (t) setShowBookmarksOnly(false);
              }}
            />

            {/* 5 Thematic Category Carousel/Grid (Hidden if actively searching) */}
            {!searchQuery && !activeTag && !showBookmarksOnly && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {language === 'id' ? 'Pilih Modul Pembelajaran:' : 'Select Learning Module:'}
                  </h3>
                  <button
                    onClick={() => setShowBookmarksOnly(true)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <Bookmark className="w-3 h-3" />
                    <span>{language === 'id' ? 'Tersimpan' : 'Saved'} ({bookmarkedIds.length})</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CATEGORIES.map((cat) => (
                    <CategoryCard
                      key={cat.id}
                      category={cat}
                      language={language}
                      isSelected={selectedCategory === cat.id}
                      onSelect={() => setSelectedCategory(cat.id)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Bookmark Filter Indicator */}
            {showBookmarksOnly && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-orange-950 font-bold">
                  <Bookmark className="w-4 h-4 text-orange-600" />
                  <span>
                    {language === 'id' ? 'Menampilkan Frasa Tersimpan' : 'Showing Saved Phrases'} ({filteredPhrases.length})
                  </span>
                </div>
                <button
                  onClick={() => setShowBookmarksOnly(false)}
                  className="text-xs font-bold text-orange-700 hover:underline"
                >
                  {language === 'id' ? 'Tutup Filter' : 'Clear Filter'}
                </button>
              </div>
            )}

            {/* Phrase List Section Header */}
            <div className="flex items-center justify-between pt-1">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                {searchQuery || activeTag
                  ? `${language === 'id' ? 'Hasil Pencarian' : 'Search Results'} (${filteredPhrases.length})`
                  : language === 'id'
                  ? 'Daftar Kosakata & Panduan Situasi'
                  : 'Phrases & Situational Guide'}
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">
                🔊 {language === 'id' ? 'Tekan speaker untuk mendengar' : 'Tap speaker to listen'}
              </span>
            </div>

            {/* Phrase Cards */}
            {filteredPhrases.length > 0 ? (
              <div className="space-y-3">
                {filteredPhrases.map((phrase) => (
                  <PhraseCard
                    key={phrase.id}
                    phrase={phrase}
                    language={language}
                    isBookmarked={bookmarkedIds.includes(phrase.id)}
                    onToggleBookmark={handleToggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-white border border-slate-200 rounded-2xl p-6">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">
                  {language === 'id' ? 'Tidak ada kosakata yang cocok' : 'No phrases found'}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {language === 'id'
                    ? 'Coba gunakan kata kunci pencarian yang lain.'
                    : 'Try another keyword or reset the filter.'}
                </p>
                {(searchQuery || activeTag || showBookmarksOnly) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveTag(null);
                      setShowBookmarksOnly(false);
                    }}
                    className="mt-3 text-xs font-bold bg-slate-900 text-white px-3 py-1.5 rounded-lg"
                  >
                    {language === 'id' ? 'Reset Pencarian' : 'Reset Search'}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: QUIZ / RESEARCH INSTRUMENT */}
        {activeTab === 'quiz' && (
          <QuizModal questions={SAMPLE_QUIZ} language={language} />
        )}

        {/* TAB 3: EMERGENCY */}
        {activeTab === 'emergency' && (
          <EmergencyModal contacts={EMERGENCY_CONTACTS} language={language} />
        )}

        {/* TAB 4: VALIDATOR / EXPERT MODE */}
        {activeTab === 'validator' && (
          <ValidatorModal language={language} />
        )}
      </main>

      {/* Mobile-First Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        language={language}
      />
    </div>
  );
};

export default App;
