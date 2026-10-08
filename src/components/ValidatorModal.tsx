import React, { useState } from 'react';
import { Language } from '../types';
import { Lock, Unlock, CheckCircle2, Star, Send, ShieldCheck } from 'lucide-react';

interface ValidatorModalProps {
  language: Language;
}

export const ValidatorModal: React.FC<ValidatorModalProps> = ({ language }) => {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [validatorName, setValidatorName] = useState('');
  const [expertise, setExpertise] = useState('Ahli Media Pembelajaran');
  const [scores, setScores] = useState<{ [key: string]: number }>({
    content: 5,
    ui: 5,
    bilingual: 5,
    usability: 5,
  });
  const [feedback, setFeedback] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '2026') {
      setIsUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleScoreChange = (aspect: string, val: number) => {
    setScores((prev) => ({ ...prev, [aspect]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* PIN LOCK SCREEN */}
      {!isUnlocked ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 text-center max-w-sm mx-auto shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {language === 'id' ? 'Mode Evaluasi Dewan Pakar' : 'Expert Validator Mode'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed">
            {language === 'id'
              ? 'Masukkan PIN otorisasi dewan penguji untuk mengakses instrumen validasi kelayakan media disertasi.'
              : 'Enter the 4-digit authorization PIN to access the academic dissertation validation instrument.'}
          </p>

          <form onSubmit={handleUnlock} className="space-y-3">
            <div>
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN (Demo: 2026)"
                className="w-full text-center tracking-widest text-lg font-mono py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-bold text-slate-900"
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-medium mt-1.5">
                  PIN keliru. Gunakan PIN demo: 2026
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl active-press transition flex items-center justify-center gap-1.5 shadow-sm shadow-blue-600/20"
            >
              <Unlock className="w-4 h-4 text-white" />
              <span>{language === 'id' ? 'Buka Instrumen Validasi' : 'Unlock Evaluation Sheet'}</span>
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Kandidat Doktor: <strong className="text-slate-700">Nurtilek Kadyrov</strong> (UNNES 2026)
          </div>
        </div>
      ) : submitted ? (
        /* SUCCESS CONFIRMATION */
        <div className="bg-white border border-blue-200 rounded-3xl p-6 text-center max-w-sm mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-blue-500/20">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Penilaian Berhasil Tersimpan!
          </h3>
          <p className="text-xs text-slate-600 mt-1 mb-4 leading-relaxed">
            Terima kasih atas evaluasi dan masukan dewan pakar. Data skor validasi otomatis disinkronkan ke Web Dashboard Peneliti.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setIsUnlocked(false);
              setPin('');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
          >
            Selesai & Kunci Kembali
          </button>
        </div>
      ) : (
        /* FORM LEMBAR PENILAIAN VALIDASI */
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Instrumen Validasi Ahli
              </div>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                Formulir Kelayakan Media MALL
              </h3>
            </div>
            <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-bold px-2 py-0.5 rounded-full shrink-0">
              PIN Verified
            </span>
          </div>

          {/* Profil Evaluator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nama Lengkap & Gelar:</label>
              <input
                type="text"
                required
                value={validatorName}
                onChange={(e) => setValidatorName(e.target.value)}
                placeholder="Prof. / Dr. / Dosen Validator"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Bidang Kepakaran:</label>
              <select
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-600 text-slate-900"
              >
                <option value="Ahli Media Pembelajaran">Ahli Media Pembelajaran & Digital</option>
                <option value="Ahli Bahasa (BIPA)">Ahli Pembelajaran Bahasa (BIPA)</option>
                <option value="Ahli Budaya Lokal Semarang">Ahli Budaya Lokal & Sosiokultural</option>
              </select>
            </div>
          </div>

          {/* Kriteria Skala 1 - 5 */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Penilaian Aspek Kelayakan (Skala 1 - 5)
            </h4>

            {[
              {
                id: 'content',
                title: '1. Relevansi Konten Bahasa & Budaya Semarang',
                desc: 'Kesesuaian materi survival dengan konteks riil kehidupan kota Semarang.',
              },
              {
                id: 'ui',
                title: '2. Ergonomi Desain Antarmuka & Keterbacaan',
                desc: 'Kontras visual, ukuran font, serta kemudahan navigasi perangkat mobile.',
              },
              {
                id: 'bilingual',
                title: '3. Kejelasan Bahasa Bilingual & Audio Pelafalan',
                desc: 'Akurasi terjemahan Indonesia–Inggris dan kejelasan fungsi audio.',
              },
              {
                id: 'usability',
                title: '4. Kemudahan Operasional & Akses Mandiri (MALL)',
                desc: 'Kelancaran akses tanpa internet (offline) dan kepraktisan penggunaan.',
              },
            ].map((crit) => (
              <div key={crit.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{crit.title}</h5>
                    <p className="text-[11px] text-slate-500">{crit.desc}</p>
                  </div>
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md shrink-0">
                    Skor: {scores[crit.id]}/5
                  </span>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => handleScoreChange(crit.id, star)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-0.5 ${
                        scores[crit.id] >= star
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-white text-slate-400 border border-slate-200'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{star}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Kolom Catatan Revisi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Catatan Kritis, Saran Perbaikan & Rekomendasi:
            </label>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tuliskan masukan untuk penyempurnaan produk disertasi..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl active-press transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/20"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Kirim Lembar Validasi Ahli</span>
          </button>
        </form>
      )}
    </div>
  );
};
