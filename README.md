# Semarang Survival Guide (Language & Culture MALL)
> **Language Survival Book Digital Berbasis Mobile-Assisted Language Learning (MALL) dengan Pendekatan Lintas Budaya bagi Mahasiswa Internasional di Kota Semarang.**

Aplikasi buku saku digital interaktif berbasis **Web & Progressive Web App (PWA)** yang dirancang khusus untuk memfasilitasi adaptasi sosial-linguistik mahasiswa asing di Kota Semarang. Dikembangkan sebagai instrumen riset program Doktoral (S3) Pendidikan Bahasa Universitas Negeri Semarang (UNNES).

---

## 👨‍💻 Identitas Proyek & Pengembang
* **Entitas Pengembang:** [Outlook Universe (OUNERS)](https://outlookuniverse.space) — Software & Digital Product Studio
* **Lead Project Manager / Lead Developer:** Naufal Angkasah, S.Kom.
* **Peneliti / Klien Riset:** Nurtilek Kadyrov (NIM: 2402200026) — S3 Ilmu Pendidikan Bahasa UNNES
* **Promotor / Pembimbing:** Prof. Dr. Yusro Edy Nugroho, S.S., M.Hum. & Dr. Wati Istanti, S.Pd., M.Pd.

---

## ✨ Fitur-Fitur Utama Aplikasi

### 1. 📱 Progressive Web App (PWA) & 100% Offline-First
* **Pemasangan Instan 1-Klik:** Pengguna dapat memasang aplikasi langsung ke layar utama (*Homescreen*) Android maupun iPhone tanpa perlu melewati antrean download toko aplikasi.
* **Tampilan Full-Screen:** Berjalan mandiri tanpa bilah URL browser (*standalone*), memberikan pengalaman layaknya aplikasi native.
* **Dukungan Akses Offline:** Seluruh materi 5 modul tersimpan di *cache Service Worker (Workbox)*, sehingga tetap dapat dibuka saat mahasiswa tidak memiliki paket data internet.

### 2. 🌐 Sistem Bilingual Penuh (ID 🇮🇩 / EN 🇬🇧)
* **Toggle Bahasa Instan:** Tombol pengalih bahasa di header memungkinkan pengguna beralih bahasa dalam satu sentuhan.
* **Konteks Berdampingan:** Menyajikan kosakata bahasa Indonesia bersamaan dengan terjemahan bahasa Inggris dan panduan fonetik (*phonetic guide*).

### 3. 📚 5 Modul Tematik Budaya Lokal Semarang
1. **Transportasi & Navigasi Kota:**
   * Panduan naik Trans Semarang (termasuk Koridor 6 rute kampus UNNES Sekaran).
   * Cara menawar dan etika naik becak di kawasan Simpang Lima & Kota Lama.
   * Ungkapan saat naik angkutan kota (*"Kiri, Pak!"*).
2. **Kuliner & Warung Lokal:**
   * Kosakata memesan makanan khas Semarang (Lumpia basah/goreng, Tahu Gimbal, Wingko Babat).
   * Peringatan bahan makanan non-halal / daging babi.
   * Ungkapan alergi (*"tidak kuat pedas"*) dan pesan bawa pulang (*"dibungkus"*).
3. **Etiket Sosial & Unggah-Ungguh Santun:**
   * Sapaan bahasa Jawa halus yang sangat dihormati (*"Nuwun sewu"*, *"Matur nuwun sanget"*, *"Monggo"*).
   * Panduan gestur tubuh sopan (membungkuk santun, menunjuk dengan jempol).
4. **Situasi Darurat & Layanan Medis:**
   * Nomor darurat bebas pulsa Kota Semarang (Call 112).
   * Rujukan rumah sakit utama (RSUP Dr. Kariadi) dan kantor kepolisian (Polrestabes).
   * Kantor Urusan Internasional (KUI) UNNES.
5. **Culture Shock & Kehidupan Harian:**
   * Waktu kumandang azan/salat dan jam tenang lingkungan warga.
   * Kebiasaan bulan puasa Ramadan di masyarakat lokal.
   * Aturan umum jam malam kos mahasiswa.

### 4. 🔊 Pemutar Audio Pelafalan (Native Speech Engine)
* Tombol speaker audio ergonomis berukuran besar (**48 x 48 dp**) yang mudah disentuh.
* Memutar pelafalan bahasa Indonesia yang fasih dan alami secara instan melalui *Web Speech Synthesis API*.
* Dilengkapi teks panduan fonetik untuk memudahkan pembelajar pemula melafalkan intonasi kata yang benar.

### 5. 🔍 Pencarian Pintar & Manajemen Frasa Favorit
* **Instant Smart Search:** Menyaring kosakata secara *real-time* berdasarkan kata kunci bahasa Indonesia, bahasa Inggris, maupun konteks situasi.
* **Tagar Populer:** Tombol jalan pintas untuk pencarian cepat (`#lumpia`, `#trans semarang`, `#halal`, `#nuwun sewu`, `#rumah sakit`).
* **Fitur Bookmark:** Mahasiswa dapat menyimpan frasa darurat yang sering dipakai ke dalam tab tersendiri (*localStorage*).

### 6. 🎓 Mode Evaluator Dosen & Dewan Pakar (PIN-Protected)
* **Akses Otorisasi 4-Digit (PIN: `2026`):** Mencegah responden mahasiswa mengakses instrumen penilaian penguji secara tidak sengaja.
* **Lembar Angket Validasi Ahli:** Formulir evaluasi digital mencakup 4 aspek kelayakan (Kelayakan Isi/Materi, Desain Antarmuka, Keterbacaan Bahasa, dan Kemudahan Akses MALL) dengan skala penilaian 1–5 bintang.
* **Kolom Masukan Kritis:** Dosen validator dapat langsung mengetikkan saran perbaikan dan kritik ilmiah untuk penyempurnaan produk disertasi.

### 7. 📝 Simulasi Kuis Skenario Budaya (Instrumen Riset)
* Pengujian adaptasi budaya berbasis studi kasus situasi nyata (misal: etika bertransaksi becak, tata krama berpapasan dengan warga lansia).
* Penilaian otomatis dan umpan balik langsung (*instant explanation*) untuk setiap opsi jawaban yang dipilih.

### 8. 🚨 Direktori Darurat & Integrasi Peta
* Tombol panggil langsung (*click-to-call*) ke nomor telepon darurat penting.
* Tautan terpadu (*deep-link*) yang langsung membuka rute navigasi di Google Maps.

---

## 🎨 Standar Ergonomi & Desain (Anti-AI Slop)
Aplikasi didesain khusus agar nyaman digunakan oleh rentang usia **20 hingga 60 tahun** (mahasiswa internasional hingga dewan penguji senior):
* **Tipografi Berkontras Tinggi:** Menggunakan font *Plus Jakarta Sans* dengan warna teks hitam pekat (*Midnight Slate `#0F172A`*) di atas latar belakang teduh (*Warm Sand `#F8FAFC`*).
* **Bebas Elemen Norak:** Menghindari efek gradien neon ungu, *glassmorphism* buram, dan teks abu-abu pudar yang sulit dibaca mata lanjut usia.
* **Aksen Budaya Semarang:** Memadukan aksen terakota bata Kota Lama (*Terracotta `#C2410C`*) dan warna khas Warak Ngendog.

---

## 🛠️ Arsitektur Teknologi (Tech Stack)
* **Frontend Framework:** React 18 + Vite 6
* **Bahasa Pemrograman:** TypeScript 5.7
* **Styling Engine:** Tailwind CSS 3.4
* **PWA Engine:** `vite-plugin-pwa` (Workbox Service Worker Caching)
* **Ikonografi:** Lucide React Icons
* **Audio Engine:** Web Speech API & HTML5 Audio Architecture
* **Target Deployment:** Vercel (`survival-semarang.vercel.app`)

---

## 🚀 Panduan Menjalankan Proyek (Local Development)

### 1. Prasyarat
* Node.js versi 18+ (disarankan Node.js v20+)
* npm versi 9+

### 2. Instalasi Dependensi
```bash
git clone https://github.com/naufal-angkasah/language-survival-semarang.git
cd language-survival-semarang
npm install
```

### 3. Menjalankan Server Pengembangan (Dev Mode)
```bash
npm run dev
```
Buka browser di alamat `http://localhost:5173`.

### 4. Build untuk Produksi
```bash
npm run build
```
Hasil berkas siap rilis berada di direktori `/dist` beserta *service worker PWA* yang terkompilasi otomatis.

---
© 2026 **Outlook Universe (OUNERS)**. Hak Cipta Materi & Instrumen Penelitian milik Peneliti Disertasi.
