import { CategoryInfo, SurvivalPhrase, EmergencyContact, QuizQuestion, RespondentRecord, ValidatorRecord } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'transport',
    titleId: 'Transportasi & Navigasi',
    titleEn: 'Transport & Navigation',
    descId: 'Panduan naik Trans Semarang, angkot, becak, dan tanya arah rute.',
    descEn: 'Guide for Trans Semarang bus, public vans, pedicabs, and asking directions.',
    iconName: 'Bus',
    color: 'from-blue-600 to-indigo-700',
    badge: '12 Frasa'
  },
  {
    id: 'culinary',
    titleId: 'Kuliner & Warung Lokal',
    titleEn: 'Culinary & Local Dining',
    descId: 'Kosakata kuliner khas Semarang (lumpia, tahu gimbal) & info halal.',
    descEn: 'Semarang local food terms, ordering at stalls, and dietary/halal warnings.',
    iconName: 'UtensilsCrossed',
    color: 'from-amber-600 to-orange-700',
    badge: '14 Frasa'
  },
  {
    id: 'etiquette',
    titleId: 'Etiket Sosial & Santun',
    titleEn: 'Social Etiquette & Manners',
    descId: 'Sapaan sopan khas Jawa, gestur ramah, dan tata krama bertamu.',
    descEn: 'Polite Javanese greetings, respectful gestures, and social harmony tips.',
    iconName: 'Smile',
    color: 'from-emerald-600 to-teal-700',
    badge: '10 Frasa'
  },
  {
    id: 'emergency',
    titleId: 'Situasi Darurat & Medis',
    titleEn: 'Emergency & Medical Help',
    descId: 'Nomor penting Semarang, frasa medis, dan lokasi rumah sakit/polisi.',
    descEn: 'Emergency hotlines, hospital phrases, and local medical facilities.',
    iconName: 'ShieldAlert',
    color: 'from-rose-600 to-red-700',
    badge: '8 Frasa'
  },
  {
    id: 'culture',
    titleId: 'Culture Shock & Keseharian',
    titleEn: 'Culture Shock & Daily Habits',
    descId: 'Jadwal warga, waktu ibadah, kebiasaan puasa, dan adaptasi lingkungan.',
    descEn: 'Local prayer times, fasting customs, daily rhythm, and community ethics.',
    iconName: 'Compass',
    color: 'from-violet-600 to-purple-700',
    badge: '9 Frasa'
  }
];

export const INITIAL_SURVIVAL_PHRASES: SurvivalPhrase[] = [
  // --- TRANSPORTASI ---
  {
    id: 'tr-01',
    categoryId: 'transport',
    phraseId: 'Berapa ongkosnya sampai Simpang Lima, Pak?',
    phraseEn: 'How much is the fare to Simpang Lima, Sir?',
    phonetic: 'Buh-rah-pah ong-kos-nyah sahm-pye Seem-pahng Lee-mah, Pahk?',
    contextNoteId: 'Gunakan saat menaiki becak atau angkot konvensional. Selalu tanyakan tarif sebelum naik.',
    contextNoteEn: 'Use when riding a pedicab or traditional minibus. Always agree on the fare before boarding.',
    tags: ['becak', 'angkot', 'harga', 'fare'],
    isImportant: true
  },
  {
    id: 'tr-02',
    categoryId: 'transport',
    phraseId: 'Tolong berhenti di halte Trans Semarang depan, ya.',
    phraseEn: 'Please drop me off at the Trans Semarang bus stop ahead.',
    phonetic: 'Toh-long buhr-huhn-tee dee hahl-tuh Trahns Seh-mah-rahng duh-pahn, yah.',
    contextNoteId: 'Trans Semarang adalah bus rapid transit utama di Semarang dengan tarif terjangkau (Rp 3.500 atau Rp 1.000 untuk pelajar/mahasiswa ber-KTM).',
    contextNoteEn: 'Trans Semarang is the main BRT in the city (Fare: IDR 3,500, or IDR 1,000 with a student ID).',
    tags: ['bus', 'trans semarang', 'halte'],
    isImportant: true
  },
  {
    id: 'tr-03',
    categoryId: 'transport',
    phraseId: 'Permisi, bus ini lewat kampus UNNES Sekaran tidak?',
    phraseEn: 'Excuse me, does this bus pass by the UNNES Sekaran campus?',
    phonetic: 'Puhr-mee-see, boos ee-nee leh-waht kahm-poos OON-NES Seh-kah-rahn tee-dahk?',
    contextNoteId: 'Untuk menuju UNNES Gunungpati dari pusat kota, naik Trans Semarang Koridor 6.',
    contextNoteEn: 'To reach UNNES Gunungpati from downtown, take Trans Semarang Corridor 6.',
    tags: ['unnes', 'arah', 'direction']
  },
  {
    id: 'tr-04',
    categoryId: 'transport',
    phraseId: 'Kiri, Pak! / Kiri, Mas!',
    phraseEn: 'Stop on the left side, Sir! (Getting off)',
    phonetic: 'Kee-ree, Pahk! / Kee-ree, Mahs!',
    contextNoteId: 'Ungkapan khas Indonesia saat ingin turun dari angkutan kota (angkot).',
    contextNoteEn: 'Universal shout inside an angkot minibus to notify the driver you wish to get off.',
    tags: ['angkot', 'turun']
  },

  // --- KULINER & RESTORAN ---
  {
    id: 'cul-01',
    categoryId: 'culinary',
    phraseId: 'Minta lumpia basah dua dan lumpia goreng dua, ya.',
    phraseEn: 'I would like two fresh spring rolls and two fried spring rolls, please.',
    phonetic: 'Meen-tah loom-pee-ah bah-sah doo-ah dahn loom-pee-ah goh-rehng doo-ah, yah.',
    contextNoteId: 'Lumpia adalah ikon kuliner Semarang. Ada dua varian: basah (fresh soft) dan goreng (crispy). Biasanya disajikan dengan saus cokelat manis dan daun bawang segar.',
    contextNoteEn: 'Lumpia is Semarang’s signature snack filled with bamboo shoots. Available in fresh or crispy fried.',
    tags: ['makanan', 'lumpia', 'khas'],
    isImportant: true
  },
  {
    id: 'cul-02',
    categoryId: 'culinary',
    phraseId: 'Apakah makanan ini halal? Apakah ada daging babi?',
    phraseEn: 'Is this food halal? Does it contain pork or lard?',
    phonetic: 'Ah-pah-kah mah-kah-nahn ee-nee hah-lahl? Ah-pah-kah ah-dah dah-geeng bah-bee?',
    contextNoteId: 'Semarang memiliki perpaduan budaya Tionghoa dan Jawa. Di warung pecinan (seperti Semawis), penting menanyakan kehalalan jika Anda memiliki pantangan muslim.',
    contextNoteEn: 'Semarang has a rich Chinese-Javanese heritage. In Chinatown areas (e.g. Semawis Night Market), ask this if you require halal food.',
    tags: ['halal', 'muslim', 'pantangan'],
    isImportant: true
  },
  {
    id: 'cul-03',
    categoryId: 'culinary',
    phraseId: 'Jangan pakai cabai ya, saya tidak kuat pedas.',
    phraseEn: 'No chili please, I cannot handle spicy food.',
    phonetic: 'Jah-ngahn pah-kye chah-bye yah, sah-yah tee-dahk koo-aht puh-dahs.',
    contextNoteId: 'Banyak masakan Jawa Tengah manis gurih, tapi sambal lokal sering kali sangat pedas.',
    contextNoteEn: 'Crucial phrase if your digestive system is not accustomed to Indonesian raw chili.',
    tags: ['pedas', 'spicy', 'alergi']
  },
  {
    id: 'cul-04',
    categoryId: 'culinary',
    phraseId: 'Bisa minta bungkus untuk dibawa pulang?',
    phraseEn: 'Could you please pack this for takeaway / to-go?',
    phonetic: 'Bee-sah meen-tah boong-koos oon-took dee-bah-wah poo-lahng?',
    contextNoteId: 'Di Indonesia, istilah to-go / takeaway biasanya disebut "dibungkus".',
    contextNoteEn: 'Takeaway food is universally termed "bungkus".',
    tags: ['bungkus', 'takeaway']
  },

  // --- ETIKET SOSIAL ---
  {
    id: 'eti-01',
    categoryId: 'etiquette',
    phraseId: 'Nuwun sewu / Permisi, Pak / Bu.',
    phraseEn: 'Excuse me / Pardon me, Sir / Ma’am.',
    phonetic: 'Noo-woon seh-woo / Puhr-mee-see, Pahk / Boo.',
    contextNoteId: '"Nuwun sewu" adalah ungkapan bahasa Jawa halus yang sangat dihormati saat lewat di depan orang yang lebih tua atau bertanya jalan.',
    contextNoteEn: '"Nuwun sewu" is the highest polite Javanese expression when passing elders or interrupting.',
    tags: ['sopan', 'jawa', 'nuwun sewu'],
    isImportant: true
  },
  {
    id: 'eti-02',
    categoryId: 'etiquette',
    phraseId: 'Matur nuwun sanget / Terima kasih banyak!',
    phraseEn: 'Thank you very much!',
    phonetic: 'Mah-toor noo-woon sah-ngeht / Tuh-ree-mah kah-see bah-nyahk!',
    contextNoteId: 'Mengucapkan terima kasih dalam bahasa Jawa lokal langsung memikat hati warga Semarang.',
    contextNoteEn: 'Speaking local polite Javanese gratitude instantly builds rapport with locals.',
    tags: ['terima kasih', 'jawa']
  },
  {
    id: 'eti-03',
    categoryId: 'etiquette',
    phraseId: 'Monggo, silakan.',
    phraseEn: 'Please, go ahead / Welcome.',
    phonetic: 'Mong-goh, see-lah-kahn.',
    contextNoteId: 'Disertai sedikit membungkukkan badan dan tangan kanan mengarah ke depan dengan jempol menunjuk santun.',
    contextNoteEn: 'Accompanied by a gentle nod and right hand gesture. Avoid pointing with your index finger.',
    tags: ['sopan', 'gestur']
  },

  // --- SITUASI DARURAT ---
  {
    id: 'emg-01',
    categoryId: 'emergency',
    phraseId: 'Tolong saya! Di mana rumah sakit terdekat?',
    phraseEn: 'Help me! Where is the nearest hospital?',
    phonetic: 'Toh-long sah-yah! Dee mah-nah roo-mah sah-keet tuhr-duh-kaht?',
    contextNoteId: 'Di Semarang, rumah sakit rujukan utama terlengkap adalah RSUP Dr. Kariadi dan RS Roemani.',
    contextNoteEn: 'Main general referral hospitals in Semarang: RSUP Dr. Kariadi and RS Roemani.',
    tags: ['darurat', 'medis', 'rumah sakit'],
    isImportant: true
  },
  {
    id: 'emg-02',
    categoryId: 'emergency',
    phraseId: 'Dompet dan paspor saya hilang, di mana kantor polisi terdekat?',
    phraseEn: 'My wallet and passport are missing, where is the nearest police station?',
    phonetic: 'Dom-peht dahn pahs-por sah-yah hee-lahng, dee mah-nah kahn-tor poh-lee-see tuhr-duh-kaht?',
    contextNoteId: 'Untuk surat kehilangan resmi, kunjungi Polsek terdekat atau Polrestabes Semarang.',
    contextNoteEn: 'To obtain a formal police loss report (Surat Kehilangan), visit nearest Polsek or Polrestabes.',
    tags: ['polisi', 'paspor', 'kehilangan'],
    isImportant: true
  },
  {
    id: 'emg-03',
    categoryId: 'emergency',
    phraseId: 'Saya merasa pusing sekali dan demam tinggi.',
    phraseEn: 'I feel very dizzy and have a high fever.',
    phonetic: 'Sah-yah muh-rah-sah poo-seeng suh-kah-lee dahn duh-mahm teeng-gee.',
    contextNoteId: 'Katakan ini kepada dokter atau perawat di IGD (Instalasi Gawat Darurat).',
    contextNoteEn: 'Useful when arriving at an ER clinic or university health center.',
    tags: ['gejala', 'sakit']
  },

  // --- CULTURE SHOCK & HARIAN ---
  {
    id: 'cul-01',
    categoryId: 'culture',
    phraseId: 'Sekarang sudah masuk waktu salat ya?',
    phraseEn: 'Is it prayer time right now?',
    phonetic: 'Suh-kah-rahng soo-dah mah-sook wahk-too sah-laht yah?',
    contextNoteId: 'Di Semarang dan pulau Jawa, suara azan berkumandang 5 kali sehari dari masjid lokal. Hormati waktu tersebut dengan tidak memutar musik terlalu kencang.',
    contextNoteEn: 'Mosque calls to prayer echo 5 times daily. Lower music volume and respect local quiet hours.',
    tags: ['ibadah', 'salat', 'masjid'],
    isImportant: true
  },
  {
    id: 'cul-02',
    categoryId: 'culture',
    phraseId: 'Jam berapa gerbang kos ditutup?',
    phraseEn: 'What time is the boarding house gate locked?',
    phonetic: 'Jahm buh-rah-pah gehr-bahng kos dee-too-toop?',
    contextNoteId: 'Sebagian besar rumah kos mahasiswa di Semarang (terutama sekitar UNNES Sekaran) memiliki jam malam (biasanya pukul 22.00 atau 23.00 WIB).',
    contextNoteEn: 'Most student boarding houses (kos) enforce curfew gates (typically 10 PM or 11 PM).',
    tags: ['kos', 'jam malam', 'asrama']
  }
];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'ec-1',
    name: 'Panggilan Darurat Terpadu Semarang',
    number: '112',
    category: 'Layanan Gratis Bebas Pulsa (Ambulans, Damkar, Bencana)'
  },
  {
    id: 'ec-2',
    name: 'RSUP Dr. Kariadi (Rumah Sakit Utama)',
    number: '(024) 8413476',
    category: 'Jl. Dr. Sutomo No. 16, Semarang',
    mapsUrl: 'https://maps.google.com/?q=RSUP+Dr+Kariadi+Semarang'
  },
  {
    id: 'ec-3',
    name: 'Polrestabes Semarang (Polda Jateng)',
    number: '(024) 8444444',
    category: 'Jl. Dr. Sutomo No. 19, Semarang',
    mapsUrl: 'https://maps.google.com/?q=Polrestabes+Semarang'
  },
  {
    id: 'ec-4',
    name: 'Pusat Layanan Mahasiswa Internasional (KUI UNNES)',
    number: '(024) 8508091',
    category: 'Gedung Rektorat UNNES Kampus Sekaran',
    mapsUrl: 'https://maps.google.com/?q=UNNES+Sekaran+Gunungpati'
  }
];

export const SAMPLE_QUIZ: QuizQuestion[] = [
  {
    id: 'q-1',
    situationId: 'Anda hendak naik becak dari Kawasan Kota Lama menuju Simpang Lima.',
    situationEn: 'You want to ride a becak (pedicab) from Kota Lama to Simpang Lima.',
    questionId: 'Kapan saat yang paling tepat untuk menyepakati harga ongkos?',
    questionEn: 'When is the most appropriate time to agree on the fare?',
    options: [
      {
        id: 'opt-a',
        textId: 'Sebelum Anda naik ke atas becak',
        textEn: 'Before stepping onto the pedicab',
        isCorrect: true,
        explanationId: 'Tepat sekali! Selalu tanyakan dan sepakati ongkos sebelum jalan untuk menghindari kesalahpahaman harga turis.',
        explanationEn: 'Correct! Always agree on the fare beforehand to prevent misunderstanding or inflated tourist fares.'
      },
      {
        id: 'opt-b',
        textId: 'Setelah sampai di tempat tujuan',
        textEn: 'After arriving at your destination',
        isCorrect: false,
        explanationId: 'Kurang tepat. Menawar di akhir sering memicu salah paham tarif.',
        explanationEn: 'Incorrect. Negotiating after arrival often leads to fare disputes.'
      },
      {
        id: 'opt-c',
        textId: 'Tidak perlu tanya, bayar saja sesuka hati',
        textEn: 'No need to ask, just pay whatever you feel like',
        isCorrect: false,
        explanationId: 'Salah. Ini melanggar norma etiket bertransaksi lokal.',
        explanationEn: 'Incorrect. This violates local transaction manners.'
      }
    ]
  },
  {
    id: 'q-2',
    situationId: 'Anda melewati sekumpulan warga lokal lanjut usia yang sedang duduk santai di depan gang.',
    situationEn: 'You are walking past a group of elderly locals resting in front of an alley.',
    questionId: 'Ucapan dan gestur apa yang paling sopan dalam budaya Semarang?',
    questionEn: 'Which phrase and gesture is most polite in local Semarang culture?',
    options: [
      {
        id: 'opt-a',
        textId: 'Berjalan cepat sambil menatap lurus ke depan',
        textEn: 'Walk fast while looking straight ahead',
        isCorrect: false,
        explanationId: 'Kurang tepat. Dianggap dingin dan tidak ramah.',
        explanationEn: 'Incorrect. Seen as aloof or unfriendly.'
      },
      {
        id: 'opt-b',
        textId: 'Tersenyum, membungkuk sedikit sambil berucap "Nuwun sewu"',
        textEn: 'Smile, slightly lower your posture, and say "Nuwun sewu"',
        isCorrect: true,
        explanationId: 'Sempurna! Sikap ini menunjukkan penghormatan tinggi pada norma unggah-ungguh Jawa.',
        explanationEn: 'Perfect! This demonstrates high respect for Javanese social manners (unggah-ungguh).'
      },
      {
        id: 'opt-c',
        textId: 'Melambaikan tangan dengan tangan kiri',
        textEn: 'Waving with your left hand',
        isCorrect: false,
        explanationId: 'Salah. Tangan kiri dianggap kurang sopan untuk memberi salam.',
        explanationEn: 'Incorrect. Left hand is considered disrespectful for social gestures in Indonesia.'
      }
    ]
  }
];

// Initial mock respondent data for research demonstration
export const INITIAL_RESPONDENTS: RespondentRecord[] = [
  {
    id: 'resp-01',
    name: 'Almazbek Batyrov',
    country: 'Kyrgyzstan',
    university: 'UNNES',
    program: 'KNB Scholarship',
    preTestScore: 45,
    postTestScore: 90,
    gainScore: 45,
    date: '2026-10-07'
  },
  {
    id: 'resp-02',
    name: 'Fatima El-Sayed',
    country: 'Egypt',
    university: 'UNNES',
    program: 'Darmasiswa',
    preTestScore: 50,
    postTestScore: 95,
    gainScore: 45,
    date: '2026-10-07'
  },
  {
    id: 'resp-03',
    name: 'Li Wei',
    country: 'China',
    university: 'UNDIP',
    program: 'Exchange Student',
    preTestScore: 40,
    postTestScore: 85,
    gainScore: 45,
    date: '2026-10-08'
  },
  {
    id: 'resp-04',
    name: 'Jean-Luc Rakoto',
    country: 'Madagascar',
    university: 'UNNES',
    program: 'KNB Scholarship',
    preTestScore: 55,
    postTestScore: 100,
    gainScore: 45,
    date: '2026-10-08'
  },
  {
    id: 'resp-05',
    name: 'Khamphou Thammavong',
    country: 'Laos',
    university: 'UIN Walisongo',
    program: 'Darmasiswa',
    preTestScore: 35,
    postTestScore: 80,
    gainScore: 45,
    date: '2026-10-08'
  }
];

// Initial mock validator records
export const INITIAL_VALIDATORS: ValidatorRecord[] = [
  {
    id: 'val-01',
    validatorName: 'Prof. Dr. Yusro Edy Nugroho, M.Hum.',
    expertise: 'Ahli Pembelajaran Bahasa (BIPA)',
    contentScore: 5,
    uiScore: 5,
    bilingualScore: 5,
    usabilityScore: 4,
    averageScore: 4.75,
    percentage: 95.0,
    feedback: 'Struktur materi survival khas Semarang sangat kontekstual dan menjawab kebutuhan mahasiswa asing di luar kelas.',
    date: '2026-10-07'
  },
  {
    id: 'val-02',
    validatorName: 'Dr. Wati Istanti, S.Pd., M.Pd.',
    expertise: 'Ahli Budaya Lokal & Sosiokultural',
    contentScore: 5,
    uiScore: 5,
    bilingualScore: 5,
    usabilityScore: 5,
    averageScore: 5.0,
    percentage: 100.0,
    feedback: 'Penekanan pada etika Jawa (nuwun sewu dan gestur santun) sangat autentik dan aplikatif untuk adaptasi mahasiswa.',
    date: '2026-10-08'
  }
];
