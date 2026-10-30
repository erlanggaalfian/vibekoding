# Base Design System

Base design system untuk aplikasi web — dipakai agar tampilan **konsisten di mobile maupun desktop**, dengan rasa seperti aplikasi mobile native di layar kecil. Dokumen ini adalah acuan tunggal: kirim file ini saja ketika ingin menerapkan gaya yang sama ke proyek lain.

> Disarikan dari sebuah aplikasi dashboard produksi, per 2026-10-31.

---

## 1. Filosofi

1. **Mobile-first collapsed-first** — di layar kecil, tampilkan hanya ringkasan penting; detail muncul saat diketuk (panah ke bawah).
2. **Satu pola, semua halaman** — accordion, filter, dialog, badge, dan tombol memakai kontrak yang sama di mana pun.
3. **Desktop tidak berubah** — semua pola lipat hanya aktif di `max-width: 768px`; desktop piksel-identik.
4. **Sentuh yang ramah jempol** — target sentuh min 40px di mobile, tombol aksi full-width saat panel terbuka.
5. **Anti-slop** — tanpa gradient/glass berlebihan, tanpa animasi denyut; transisi pendek (100–200ms) dengan easing standar.

---

## 2. Design Tokens

### 2.1 Warna — sistem palet, bukan warna tetap

Warna primer **tidak dikunci** ke satu hex. Pilih satu **warna dasar**
(base) untuk tiap proyek, lalu turunkan seluruh palet darinya memakai
aturan roda warna di bawah. Yang dikunci adalah **peran & relasi antar
warna**, bukan nilai hex-nya.

**Contoh bawaan** (hanya contoh — boleh diganti): primer `#0097FC`.

#### Aturan roda warna

1. **Warna dasar → skala primer (50–900).** Pertahankan hue, ubah
   lightness bertahap; saturasi sedikit turun di ujung terang dan
   sedikit naik di ujung gelap:

   | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
   |---|---|---|---|---|---|---|---|---|---|
   | l 97% | l 92% | l 82% | l 70% | l 58% | = warna dasar | l 38% | l 30% | l 24% | l 18% |

   `--color-primary` = 500 (atau 600 bila butuh kontras lebih ke teks
   putih); `--color-primary-hover` = 600/700.
2. **Aksen via harmoni roda warna.** Pilih satu per proyek:
   - *Monokromatik* (default, paling aman): aksen = primer 700.
   - *Analogous:* hue ± 30° dari primer.
   - *Komplementer:* hue + 180° — pakai hemat, hanya untuk sorotan kecil.
   - *Triadik:* hue + 120° dan + 240°.
3. **Netral mengikuti hue dasar** (tinted, bukan abu mati): saturasi
   10–15%, skala lightness untuk teks / latar / border.
4. **Warna status di posisi tetap roda warna** — jangan digeser mengikuti
   primer: success h≈150°, warning h≈42°, danger h≈0°, info h≈205°.
   Tiap status punya tiga peran: `bg` (terang), `text` (gelap),
   `border-soft`.
5. **Kontras.** Teks di atas primer ≥ 4.5:1 (putih atau teks gelap,
   pilih menurut luminansi). Teks muted di atas latar ≥ 4.5:1.

#### Cara cepat: generator palet

Buka `examples/palette-generator.html` — pilih warna dasar + harmoni,
salin blok CSS variables yang dihasilkan (nama token sama persis dengan
di bawah), tempel sebagai `:root` di stylesheet proyek. Pratinjau
komponen ikut berubah langsung mengikuti palet.

```css
/* Contoh hasil generator untuk warna dasar #0097FC (h 204°) */
:root {
  /* Skala primer — hue tetap, lightness bertahap */
  --color-primary-50: #f4f8fb;
  --color-primary-100: #ddedf8;
  --color-primary-200: #b6ddf7;
  --color-primary-300: #77c4f8;
  --color-primary-400: #38acfa;
  --color-primary-500: #0097fc;   /* = warna dasar */
  --color-primary-600: #0078c8;
  --color-primary-700: #0060a0;
  --color-primary-800: #004b7d;
  --color-primary-900: #00395f;

  --color-primary: var(--color-primary-500);
  --color-primary-hover: var(--color-primary-600);
  --color-primary-text: #16202e;  /* putih hanya 3.07:1 — teks gelap 5.34:1 ✓ */

  /* Aksen (contoh: monokromatik) */
  --color-accent: var(--color-primary-700);

  /* Teks — netral mengikuti hue dasar, saturasi ±12% */
  --color-text-header: #1e293b;
  --color-text-body: #334155;
  --color-text-muted: #64748b;

  /* Latar */
  --color-bg-body: #f4f7f9;
  --color-bg-content: #ffffff;
  --color-bg-hover: #f8fafc;

  /* Status — hue tetap di roda warna */
  --color-success: #10b981;  --color-success-bg: #d1fae5;  --color-success-text: #047857;   /* h≈150° */
  --color-danger: #dc2626;   --color-danger-bg: #fee2e2;   --color-danger-text: #991b1b;     /* h≈0° */
  --color-danger-soft-bg: #fff5f5;      /* kartu peringatan lembut */
  --color-danger-border-soft: #fecaca;
  --color-info-bg: #e0f2fe;  --color-info-text: #0284c7;    /* h≈205° */
  --color-warning-bg: #fef9c3; --color-warning-text: #a16207; /* h≈42° */

  /* Border & garis */
  --color-border: #e2e8f0;
  --color-metric-border: #eaeff5;
}
```

### 2.2 Tipografi

Font: `Inter, system-ui, -apple-system, sans-serif`. Mono: `Menlo, Courier New`.

| Level | Desktop | Mobile | Bobot | Kegunaan |
|---|---|---|---|---|
| Display | 32px | 26px | 800 | angka besar metrik |
| H1 | 28px | 20px | 800 | `.page-header` (judul halaman) |
| H2 | 20px | 18px | 700 | `.section-title`, `.form-title`, `.modal-header h3` |
| H3 | 16px | 14px | 700 | `.table-title` |
| Body | 16px | 16px | 400 | teks umum (eksplisit di `body`) |
| Konten | 14px | 14px | 500–600 | `td`, `.btn`, label form, `.alert` |
| Judul kartu | 13px UPPERCASE | 12px UPPERCASE | 700 | `.chart-title`, `.metric-title` |
| Small | 12px | 11px | 400–600 | `th` uppercase, caption |
| Badge | 11px UPPERCASE | 11px UPPERCASE | 700 | `.badge` |

Aturan bobot: **800** hanya angka besar/H1 → **700** semua judul → **600** tombol/label/nama item → **400** body. Jangan ganti bobot antar breakpoint.

Label kecil muted selalu satu gaya: `600 / uppercase / letter-spacing: 0.06em`.

### 2.3 Spacing, Radius, Shadow, Motion

```css
--layout-gutter: 32px;      /* desktop */  --layout-gutter-sm: 20px;
--layout-gutter (mobile): 16px;

/* Radius: 4px (kecil) · 6px (tombol kecil) · 8px (kartu, tombol) · 10-12px (panel) · 999px (badge/pill) */
--shadow-card: 0 1px 3px rgba(0,0,0,.06), 0 4px 12px rgba(0,0,0,.04);
--shadow-card-hover: 0 4px 12px rgba(0,0,0,.08), 0 8px 24px rgba(0,0,0,.06);
--backdrop-blur: blur(12px);

/* Motion */
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--dur-micro: 100ms; --dur-short: 200ms; --dur-medium: 350ms;
```

Breakpoint mobile: `max-width: 768px`. Target sentuh mobile: min **40px** (font tombol 14px).

---

## 3. Pola Interaksi (Kontrak JS)

Semua pola lipat memakai **satu handler global** — tidak ada JS per halaman.

### 3.1 Per-item accordion (`.m-item`) — mobile only

Item daftar yang bisa dilipat per baris. Ketuk judul → isi terbuka.

```html
<li class="m-item" aria-expanded="false">
  <span class="m-item-title"><strong>Nama</strong></span>   <!-- panah otomatis via ::after -->
  <span class="m-item-extra">detail tersembunyi…</span>      <!-- muncul saat terbuka -->
  <a class="btn m-item-extra">Aksi</a>                       <!-- tombol: full-width + teks tengah -->
</li>
```

```css
@media (max-width: 768px) {
  .m-item { cursor: pointer; }
  .m-item-title { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .m-item-title::after { /* chevron bawah, rotate -135deg saat .is-open */ }
  .m-item .m-item-extra { display: none; }
  .m-item.is-open .m-item-extra { display: block; }
  .m-item.is-open .m-item-extra.btn { display: flex; width: 100%; } /* tombol full-width */
}
```

Aturan: baris terlipat = **nama kiri, panah kanan** (badge boleh ikut di baris judul). Ketuk pada link/tombol/input di dalam item **tidak** melipat (handler mengabaikannya). `aria-expanded` di-toggle.

### 3.2 Accordion tabel → kartu (mobile only)

Baris tabel menjadi kartu di mobile. Sel pertama (`.td-primary`) jadi judul + panah; kolom lain tersembunyi sampai kartu dibuka (`.is-expanded`); tombol aksi full-width 2 kolom saat terbuka.

Ringkasan saat terlipat: tambahkan `<span class="m-collapsed-extra">` di dalam `.td-primary` (mis. badge status, titik status `.m-dot`).

### 3.3 Filter collapsible (mobile only)

```html
<button class="m-mobile-only m-filter-head" data-toggle="filter-a filter-b">
  <span>Filter</span><span class="m-filter-head-count">2 aktif</span> <!-- panah via CSS -->
</button>
<div class="m-filter-more" id="filter-a">…</div>
```

`data-toggle` mendukung **spasi** untuk beberapa ID. Di desktop `.m-filter-more` memakai `display: contents` sehingga layout piksel-identik.

### 3.4 Dialog bottom-sheet (`window.mConfirm`)

Pengganti `confirm()` bawaan. Di mobile tampil sebagai bottom-sheet; di desktop dialog tengah.

```js
const ok = await window.mConfirm({
  title: 'Hapus perangkat?',
  message: 'Tindakan ini tidak bisa dibatalkan.',
  confirmText: 'Ya, hapus',   // danger: true → tombol merah
  cancelText: 'Batal',
  danger: true
});
if (!ok) return;
```

Untuk submit form: `window.mConfirmSubmit(form, {...})`. Klik di luar popup **hanya menutup** (event ditelan di capture phase, tidak mengaktifkan elemen di belakangnya).

### 3.5 Judul halaman bisa diketuk (mobile only)

```html
<div class="page-header-container m-item">
  <h1 class="page-header m-item-title">Judul</h1>
  <p class="page-subtitle m-item-extra">Keterangan…</p>
</div>
```

Keterangan muncul saat judul diketuk; desktop tidak berubah.

---

## 4. Komponen

### 4.1 Badge & pill

```css
.badge { font-size: 11px; font-weight: 700; text-transform: uppercase;
         letter-spacing: 0.6px; border-radius: 999px; padding: 5px 12px; }
```
Varian: `.success` `.danger` `.gray` `.blue`. Satu komponen untuk semua label status — tidak ada gaya pill kedua.

### 4.2 Tombol

`.btn` 14px/600, radius 8px, min-height 40px. `.btn-sm` 13px, min-height 32px. `.secondary` untuk aksi pendamping. **Mobile:** tombol aksi di dalam item/accordion yang terbuka selalu `width: 100%`.

### 4.3 Kartu status (contoh: item gagal)

```css
background: var(--color-danger-soft-bg);   /* #fff5f5 */
border: 1px solid var(--color-danger-border-soft); /* #fecaca */
border-radius: 8px; padding: 10px 14px;
```

Daftar kartu: `display: flex; flex-direction: column; gap: 8px`.

### 4.4 Pagination (mobile)

Tombol 40×40px, font 14px, gap 6px. Tombol `<<` `>>` disembunyikan di mobile (7 tombol muat 1 baris di 360px). Satu fungsi render bersama untuk semua halaman.

### 4.5 Panel kaca buram (menu mobile)

```css
background: color-mix(in srgb, var(--color-primary) 88%, transparent);
backdrop-filter: blur(16px);
/* fallback browser lama: rgba(0,151,252,.88) */
```

### 4.6 Form

Label 14px/600; di mobile input/select **16px** (mencegah auto-zoom iOS). Aksi form sticky di bagian bawah pada mobile (`.m-sticky-actions`). Tambahkan `inputmode`/`enterkeyhint` yang sesuai.

### 4.7 Empty state & toast

Empty state: `.empty-data-text` (italic, muted, tengah). Toast diposisikan **di atas** bottom nav 56px agar tidak tertutup.

### 4.8 Navigasi bawah (mobile)

Bottom tab bar 56px + safe-area. Menu panel terpisah dengan blur (4.5).

---

## 5. Checklist Penerapan ke Proyek Baru

1. Salin **tokens** (§2) sebagai CSS variables.
2. Salin **kontrak JS** (§3): satu handler `[data-toggle]`, satu handler `.m-item`, `window.mConfirm`.
3. Terapkan **skala tipografi** (§2.2) ke semua judul — jangan biarkan ukuran judul berbeda untuk level yang sama.
4. Setiap daftar di mobile: putuskan **apa ringkasannya** saat terlipat (nama + 1 info penting + panah).
5. Setiap `confirm()` bawaan → `mConfirm`.
6. Input mobile 16px; tombol aksi full-width saat terbuka; pagination ikut pola §4.4.
7. Uji di lebar 360px: tidak ada wrap yang rusak, tidak ada teks terpotong.

## 6. Yang Sengaja TIDAK Dipakai

Native rewrite / WebView, `user-scalable=no`, swipe-action per baris, infinite scroll, animasi denyut/pulse, glassmorphism berlebihan, mengganti bobot font antar breakpoint.
