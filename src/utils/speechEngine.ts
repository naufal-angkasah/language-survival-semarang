// Specialized Indonesian Natural Prosody & Local Emotional Speech Engine
// Designed for MALL (Mobile-Assisted Language Learning) BIPA Research in Semarang

export type EmotionTone = 'shout' | 'polite' | 'emergency' | 'culinary' | 'inquiry' | 'casual';

export interface ProsodyConfig {
  pitch: number;    // Voice pitch (0 to 2, 1.0 is standard)
  rate: number;     // Speaking rate (0.1 to 10, 1.0 is standard)
  volume: number;   // Volume (0 to 1)
  labelId: string;  // Label in Indonesian
  labelEn: string;  // Label in English
  icon: string;
  badgeStyle: string;
}

// Check if browser supports Web Speech API
export const isSpeechSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

// Stop any currently active speech synthesis immediately
export const stopSpeech = (): void => {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
};

// Cache voices once loaded
let cachedVoices: SpeechSynthesisVoice[] = [];

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (!isSpeechSupported()) return [];
  if (cachedVoices.length > 0) return cachedVoices;
  cachedVoices = window.speechSynthesis.getVoices();
  return cachedVoices;
};

// Pre-load and find the most natural, human-sounding Indonesian voice
export const getBestIndonesianVoice = (): SpeechSynthesisVoice | null => {
  const voices = getAvailableVoices();
  if (voices.length === 0) return null;

  // Priority 1: High-fidelity natural neural Indonesian voices (Microsoft Edge Gadis / Ardi Natural)
  const naturalId = voices.find(
    (v) =>
      (v.lang === 'id-ID' || v.lang === 'id_ID' || v.lang.toLowerCase().startsWith('id')) &&
      (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Online'))
  );
  if (naturalId) return naturalId;

  // Priority 2: Google Indonesian (Chrome Desktop & Android)
  const googleId = voices.find(
    (v) =>
      (v.lang === 'id-ID' || v.lang === 'id_ID' || v.lang.toLowerCase().startsWith('id')) &&
      v.name.toLowerCase().includes('google')
  );
  if (googleId) return googleId;

  // Priority 3: Apple Damayanti (macOS & iOS Safari)
  const appleId = voices.find(
    (v) =>
      (v.lang === 'id-ID' || v.lang === 'id_ID' || v.lang.toLowerCase().startsWith('id')) &&
      v.name.toLowerCase().includes('damayanti')
  );
  if (appleId) return appleId;

  // Priority 4: Exact id-ID voice
  const exactId = voices.find((v) => v.lang === 'id-ID' || v.lang === 'id_ID');
  if (exactId) return exactId;

  // Priority 5: Any voice starting with id or in (historical language code for Indonesia)
  const anyId = voices.find(
    (v) => v.lang.toLowerCase().startsWith('id') || v.lang.toLowerCase().startsWith('in')
  );
  if (anyId) return anyId;

  // Priority 6: Voice with "indonesia" in its name
  const nameId = voices.find((v) => v.name.toLowerCase().includes('indonesia'));
  if (nameId) return nameId;

  return null;
};

// Format raw phrase text to eliminate robotic artifacts (like reading "/" as "garis miring")
// and insert authentic conversational breathing rhythm for local Indonesian prosody
export const formatSpokenIndonesian = (rawText: string, tone: EmotionTone): string => {
  let text = rawText.trim();

  // 1. Remove slash "/" alternatives to avoid TTS saying "garis miring"
  if (text.includes('/')) {
    text = text
      .replace(/Pak\s*\/\s*Bu/gi, 'Pak... atau Bu')
      .replace(/Kiri,\s*Pak!\s*\/\s*Kiri,\s*Mas!/gi, 'Kiri, Pak!... Kiri, Mas!')
      .replace(/Nuwun sewu\s*\/\s*Permisi/gi, 'Nuwun sewu... Permisi')
      .replace(/Matur nuwun sanget\s*\/\s*Terima kasih banyak!/gi, 'Matur nuwun sanget!... Terima kasih banyak!')
      .replace(/\s*\/\s*/g, '... atau ');
  }

  // 2. Acronym expansion for natural local pronunciation
  text = text
    .replace(/\bUNNES\b/g, 'Unnes')
    .replace(/\bUNDIP\b/g, 'Undip')
    .replace(/\bUIN\b/g, 'U-I-N')
    .replace(/\bRSUP\b/g, 'R-S-U-P')
    .replace(/\bIGD\b/g, 'I-G-D')
    .replace(/\bKTM\b/g, 'K-T-M')
    .replace(/\bBRT\b/g, 'B-R-T');

  // 3. Conversational breathing pauses before honorifics & particles
  // In local Semarang & Central Java etiquette, speakers pause slightly before addressing elders/drivers
  text = text
    .replace(/,\s*Pak\b/gi, '... Pak')
    .replace(/,\s*Bu\b/gi, '... Bu')
    .replace(/,\s*Mas\b/gi, '... Mas')
    .replace(/,\s*Mbak\b/gi, '... Mbak')
    .replace(/,\s*ya\b/gi, '... ya');

  // 4. Tone-specific phrasing adjustments
  if (tone === 'shout') {
    // Add exclamation clarity for street shout
    if (!text.endsWith('!')) text = `${text}!`;
  } else if (tone === 'polite') {
    // Gentle elongation
    if (!text.endsWith('.')) text = `${text}.`;
  }

  return text;
};

// Get emotional prosody parameters (pitch, tempo/rate, volume, label)
export const getProsodyForTone = (tone: EmotionTone, isSlowMode = false): ProsodyConfig => {
  switch (tone) {
    case 'shout':
      // Teriakan Angkot / Turun Kendaraan: Lantang, bertenaga, intonasi tinggi, proyeksi suara jelas
      return {
        pitch: 1.15,
        rate: isSlowMode ? 0.84 : 1.05,
        volume: 1.0,
        labelId: 'Seruan Angkot (Lantang & Berenergi)',
        labelEn: 'Angkot Shout (Loud & Clear)',
        icon: '📢',
        badgeStyle: 'bg-amber-50 text-amber-800 border-amber-200/80',
      };

    case 'polite':
      // Unggah-Ungguh Santun Jawa: Halus, tempo lambat mengayun sopan, nada hangat bersahabat (grapyak)
      return {
        pitch: 1.00,
        rate: isSlowMode ? 0.76 : 0.88,
        volume: 0.95,
        labelId: 'Santun Jawa (Halus & Hangat)',
        labelEn: 'Polite Javanese (Gentle & Warm)',
        icon: '🙏',
        badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      };

    case 'emergency':
      // Situasi Darurat: Intonasi tinggi, tempo cepat dan tegas (urgensi tinggi & butuh pertolongan)
      return {
        pitch: 1.16,
        rate: isSlowMode ? 0.88 : 1.08,
        volume: 1.0,
        labelId: 'Darurat Medis (Mendesak & Panik)',
        labelEn: 'Emergency (Urgent & Anxious)',
        icon: '🚨',
        badgeStyle: 'bg-rose-50 text-rose-800 border-rose-200/80',
      };

    case 'culinary':
      // Warung Makan & Angkringan: Ramah, santai, akrab seperti mengobrol dengan penjual makanan lokal
      return {
        pitch: 1.08,
        rate: isSlowMode ? 0.80 : 0.94,
        volume: 1.0,
        labelId: 'Pesan Warung (Akrab & Ramah)',
        labelEn: 'Food Stall (Friendly & Warm)',
        icon: '🍜',
        badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200/80',
      };

    case 'inquiry':
      // Bertanya Arah / Info: Intonasi nada sedikit naik di akhir kalimat (penasaran sopan)
      return {
        pitch: 1.12,
        rate: isSlowMode ? 0.82 : 0.96,
        volume: 1.0,
        labelId: 'Bertanya Sopan (Intonasi Penasaran)',
        labelEn: 'Polite Inquiry (Curious Inflection)',
        icon: '❓',
        badgeStyle: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
      };

    case 'casual':
    default:
      // Keseharian: Natural, mengalir santai
      return {
        pitch: 1.06,
        rate: isSlowMode ? 0.80 : 0.96,
        volume: 1.0,
        labelId: 'Santai Keseharian (Natural)',
        labelEn: 'Daily Conversation (Natural)',
        icon: '💬',
        badgeStyle: 'bg-slate-50 text-slate-700 border-slate-200/80',
      };
  }
};

// Automatic tone detector if not explicitly specified
export const detectEmotionTone = (phraseText: string, categoryId?: string): EmotionTone => {
  const lower = phraseText.toLowerCase();

  if (categoryId === 'emergency' || lower.includes('tolong') || lower.includes('darurat') || lower.includes('hilang') || lower.includes('sakit')) {
    return 'emergency';
  }

  if (lower.includes('kiri') || lower.includes('stop') || lower.includes('turun')) {
    return 'shout';
  }

  if (
    lower.includes('nuwun sewu') ||
    lower.includes('monggo') ||
    lower.includes('matur nuwun') ||
    lower.includes('permisi') ||
    categoryId === 'etiquette'
  ) {
    return 'polite';
  }

  if (categoryId === 'culinary' || lower.includes('makan') || lower.includes('lumpia') || lower.includes('bungkus') || lower.includes('pedas')) {
    return 'culinary';
  }

  if (phraseText.endsWith('?') || lower.startsWith('berapa') || lower.startsWith('apakah') || lower.startsWith('jam berapa')) {
    return 'inquiry';
  }

  return 'casual';
};

export interface SpeakOptions {
  isSlow?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Master speak function
export const speakIndonesian = (
  rawText: string,
  tone?: EmotionTone,
  options?: SpeakOptions
): void => {
  if (!isSpeechSupported()) {
    alert('Browser tidak mendukung sintesis suara (Web Speech API).');
    options?.onError?.(new Error('Speech synthesis unsupported'));
    return;
  }

  stopSpeech();

  const finalTone = tone || detectEmotionTone(rawText);
  const spokenText = formatSpokenIndonesian(rawText, finalTone);
  const prosody = getProsodyForTone(finalTone, options?.isSlow);

  const utterance = new SpeechSynthesisUtterance(spokenText);
  utterance.lang = 'id-ID';
  utterance.pitch = prosody.pitch;
  utterance.rate = prosody.rate;
  utterance.volume = prosody.volume;

  const bestVoice = getBestIndonesianVoice();
  if (bestVoice) {
    utterance.voice = bestVoice;
  }

  utterance.onstart = () => {
    options?.onStart?.();
  };

  utterance.onend = () => {
    options?.onEnd?.();
  };

  utterance.onerror = (e) => {
    options?.onError?.(e);
  };

  // Ensure speech synthesis is awake (fixes Chrome standby issue)
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }

  window.speechSynthesis.speak(utterance);
};
