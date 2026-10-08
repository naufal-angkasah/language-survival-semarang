import React, { useState } from 'react';
import { RespondentRecord, ValidatorRecord, SurvivalPhrase, CategoryId } from '../types';
import { exportToCsv } from '../utils/exportCsv';
import { 
  Users, Award, BookOpen, Download, Plus, Trash2, 
  Search, ArrowLeft, CheckCircle2, TrendingUp,
  FileSpreadsheet, ShieldAlert
} from 'lucide-react';

interface AdminDashboardProps {
  respondents: RespondentRecord[];
  validators: ValidatorRecord[];
  phrases: SurvivalPhrase[];
  onAddPhrase: (phrase: SurvivalPhrase) => void;
  onDeletePhrase: (id: string) => void;
  onBackToApp: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  respondents,
  validators,
  phrases,
  onAddPhrase,
  onDeletePhrase,
  onBackToApp,
}) => {
  const [activeTab, setActiveTab] = useState<'respondents' | 'validators' | 'cms'>('respondents');
  const [searchQuery, setSearchQuery] = useState('');

  // Add Phrase Modal State
  const [isAddingPhrase, setIsAddingPhrase] = useState(false);
  const [newPhraseId, setNewPhraseId] = useState('');
  const [newPhraseEn, setNewPhraseEn] = useState('');
  const [newPhonetic, setNewPhonetic] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryId>('transport');
  const [newContextNote, setNewContextNote] = useState('');

  // Compute Research Analytics
  const totalRespondents = respondents.length;
  const avgPreTest = totalRespondents
    ? (respondents.reduce((acc, r) => acc + r.preTestScore, 0) / totalRespondents).toFixed(1)
    : '0';
  const avgPostTest = totalRespondents
    ? (respondents.reduce((acc, r) => acc + r.postTestScore, 0) / totalRespondents).toFixed(1)
    : '0';
  const avgValidatorScore = validators.length
    ? (validators.reduce((acc, v) => acc + v.percentage, 0) / validators.length).toFixed(1)
    : '0';

  // Export to Excel/SPSS Handler
  const handleExportRespondents = () => {
    const exportData = respondents.map((r, i) => ({
      No: i + 1,
      Nama_Mahasiswa: r.name,
      Negara_Asal: r.country,
      Kampus_Tujuan: r.university,
      Program_Beasiswa: r.program,
      Skor_PreTest: r.preTestScore,
      Skor_PostTest: r.postTestScore,
      Peningkatan_Skor: r.gainScore,
      Tanggal_Tes: r.date,
    }));
    exportToCsv('Data_Responden_Disertasi_SPSS_Nurtilek', exportData);
  };

  const handleExportValidators = () => {
    const exportData = validators.map((v, i) => ({
      No: i + 1,
      Nama_Pakar: v.validatorName,
      Bidang_Kepakaran: v.expertise,
      Skor_Materi: v.contentScore,
      Skor_UI: v.uiScore,
      Skor_Bilingual: v.bilingualScore,
      Skor_MALL: v.usabilityScore,
      Rata_Rata: v.averageScore,
      Persentase_Kelayakan: `${v.percentage}%`,
      Catatan_Saran: v.feedback,
      Tanggal_Validasi: v.date,
    }));
    exportToCsv('Lembar_Validasi_Dewan_Pakar_Nurtilek', exportData);
  };

  const handleCreatePhrase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhraseId.trim() || !newPhraseEn.trim()) return;

    const newPhrase: SurvivalPhrase = {
      id: `custom-${Date.now()}`,
      categoryId: newCategory,
      phraseId: newPhraseId,
      phraseEn: newPhraseEn,
      phonetic: newPhonetic || 'Lafal standar',
      contextNoteId: newContextNote || 'Catatan adaptasi praktis.',
      contextNoteEn: newContextNote || 'Practical adaptation note.',
      tags: ['custom', newCategory],
      isImportant: true,
    };

    onAddPhrase(newPhrase);
    setNewPhraseId('');
    setNewPhraseEn('');
    setNewPhonetic('');
    setNewContextNote('');
    setIsAddingPhrase(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Academic Admin Bar */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-20 shadow-2xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToApp}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 text-xs font-bold active-press"
              title="Kembali ke Aplikasi Mobile"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Ke Aplikasi HP</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  Admin Dashboard Riset
                </span>
                <span className="text-xs text-slate-400">|</span>
                <span className="text-xs font-bold text-slate-700">UNNES 2026</span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                Pusat Kendali Disertasi: Nurtilek Kadyrov
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Cloud Sync Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6 flex-1">
        {/* KPI Analytical Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wide">Total Responden</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{totalRespondents}</p>
            <span className="text-[11px] text-blue-700 font-medium">Mahasiswa Internasional</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wide">Rata-Rata Pre-Test</span>
              <TrendingUp className="w-4 h-4 text-slate-400" />
            </div>
            <p className="text-2xl font-black text-slate-700">{avgPreTest}</p>
            <span className="text-[11px] text-slate-400 font-medium">Skor baseline awal</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wide">Rata-Rata Post-Test</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-emerald-600">{avgPostTest}</p>
            <span className="text-[11px] text-emerald-700 font-medium">Naik signifikan (+{(Number(avgPostTest) - Number(avgPreTest)).toFixed(1)} pts)</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wide">Kelayakan Ahli</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-black text-blue-800">{avgValidatorScore}%</p>
            <span className="text-[11px] text-blue-700 font-bold">Kategori: Sangat Layak</span>
          </div>
        </div>

        {/* Tab Navigation Pill in Clean Blue & White */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('respondents')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'respondents'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Data Responden Mahasiswa ({respondents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('validators')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'validators'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Hasil Dewan Pakar ({validators.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'cms'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>CMS Kosakata & Modul ({phrases.length})</span>
          </button>
        </div>

        {/* TAB 1: DATA RESPONDEN & EXCEL EXPORT */}
        {activeTab === 'respondents' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Rekapitulasi Nilai Pre-Test & Post-Test
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Format tabel siap diekspor ke SPSS untuk pengujian statistik Paired Sample T-Test.
                </p>
              </div>

              <button
                onClick={handleExportRespondents}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl active-press transition shadow-xs"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Unduh ke Excel / SPSS (.csv)</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-3">No</th>
                    <th className="py-3 px-3">Nama Mahasiswa</th>
                    <th className="py-3 px-3">Negara</th>
                    <th className="py-3 px-3">Kampus</th>
                    <th className="py-3 px-3 text-center">Pre-Test</th>
                    <th className="py-3 px-3 text-center">Post-Test</th>
                    <th className="py-3 px-3 text-center">Peningkatan</th>
                    <th className="py-3 px-3">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {respondents.map((r, i) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-3 font-mono text-slate-400">{i + 1}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{r.name}</td>
                      <td className="py-3 px-3">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-medium">
                          {r.country}
                        </span>
                      </td>
                      <td className="py-3 px-3">{r.university}</td>
                      <td className="py-3 px-3 text-center font-bold text-slate-600">{r.preTestScore}</td>
                      <td className="py-3 px-3 text-center font-black text-emerald-600">{r.postTestScore}</td>
                      <td className="py-3 px-3 text-center font-bold text-blue-700">+{r.gainScore}</td>
                      <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: HASIL DEWAN PAKAR */}
        {activeTab === 'validators' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Penilaian Kelayakan Dewan Penguji Disertasi
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Rekapitulasi data angket validasi ahli materi bahasa, ahli media, dan ahli budaya.
                </p>
              </div>

              <button
                onClick={handleExportValidators}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl active-press transition shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Lembar Validasi (.csv)</span>
              </button>
            </div>

            <div className="space-y-3">
              {validators.map((v) => (
                <div key={v.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{v.validatorName}</h4>
                      <span className="text-xs text-blue-700 font-semibold">{v.expertise}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-blue-800">{v.percentage}%</span>
                      <span className="text-[11px] block font-bold text-emerald-700">Sangat Layak</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
                    <div className="bg-white p-2 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Materi Bahasa:</span>
                      <strong className="text-slate-800">{v.contentScore} / 5</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Desain Media UI:</span>
                      <strong className="text-slate-800">{v.uiScore} / 5</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Bilingual Audio:</span>
                      <strong className="text-slate-800">{v.bilingualScore} / 5</strong>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Aksesibilitas MALL:</span>
                      <strong className="text-slate-800">{v.usabilityScore} / 5</strong>
                    </div>
                  </div>

                  {v.feedback && (
                    <div className="bg-white border border-slate-200 p-3 rounded-xl text-xs mt-2">
                      <span className="font-bold text-slate-700 block mb-0.5">Catatan / Saran Revisi Dosen:</span>
                      <p className="text-slate-600 italic leading-relaxed">"{v.feedback}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: CMS KOSAKATA & MODUL */}
        {activeTab === 'cms' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">
                  Manajemen Konten Kosakata & Frasa (CMS)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ubah atau tambah materi tanpa perlu koding. Pembaruan otomatis tampil di aplikasi mahasiswa.
                </p>
              </div>

              <button
                onClick={() => setIsAddingPhrase(true)}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl active-press transition"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Kosakata Baru</span>
              </button>
            </div>

            {/* Modal Form Tambah Frasa Baru */}
            {isAddingPhrase && (
              <form onSubmit={handleCreatePhrase} className="bg-blue-50/60 border border-blue-200 p-4 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  Formulir Tambah Kosakata Baru
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Frasa Bahasa Indonesia:</label>
                    <input
                      type="text"
                      required
                      value={newPhraseId}
                      onChange={(e) => setNewPhraseId(e.target.value)}
                      placeholder="Contoh: Berapa harga lumpianya, Mas?"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Terjemahan Bahasa Inggris:</label>
                    <input
                      type="text"
                      required
                      value={newPhraseEn}
                      onChange={(e) => setNewPhraseEn(e.target.value)}
                      placeholder="Example: How much is the spring roll, Sir?"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Panduan Fonetik Lafal:</label>
                    <input
                      type="text"
                      value={newPhonetic}
                      onChange={(e) => setNewPhonetic(e.target.value)}
                      placeholder="Contoh: Buh-rah-pah har-gah..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Kategori Modul:</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as CategoryId)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-900"
                    >
                      <option value="transport">Transportasi & Navigasi</option>
                      <option value="culinary">Kuliner & Warung Lokal</option>
                      <option value="etiquette">Etiket Sosial & Santun</option>
                      <option value="emergency">Situasi Darurat</option>
                      <option value="culture">Culture Shock</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Budaya Semarang:</label>
                  <textarea
                    rows={2}
                    value={newContextNote}
                    onChange={(e) => setNewContextNote(e.target.value)}
                    placeholder="Penjelasan konteks pemakaian frasa dalam kehidupan lokal..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingPhrase(false)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Simpan Kosakata
                  </button>
                </div>
              </form>
            )}

            {/* List of Phrases with Delete Action */}
            <div className="space-y-2">
              {phrases.map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-slate-900 truncate">{p.phraseId}</span>
                      <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.2 rounded font-semibold uppercase">
                        {p.categoryId}
                      </span>
                    </div>
                    <p className="text-slate-500 truncate">{p.phraseEn}</p>
                  </div>

                  <button
                    onClick={() => onDeletePhrase(p.id)}
                    className="p-1.5 text-slate-300 hover:text-rose-600 transition"
                    title="Hapus frasa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
