# NetBackup Design System

Terapkan design system NetBackup (mobile app-like + desktop konsisten) ke proyek web apa pun: pakai tokens, kontrak interaksi, dan pola komponen dari `design-system.md`.

## Terapkan tokens dulu

- Salin CSS variables warna, tipografi, shadow, motion, dan gutter dari `design-system.md` §2 sebagai `:root` di stylesheet proyek.
- Pakai skala tipografi persis seperti tabel: 800 hanya angka besar/H1, 700 semua judul, 600 tombol/label/nama, 400 body.
- Samakan label kecil muted ke satu gaya: `600 / uppercase / letter-spacing: 0.06em`.
- Jangan ganti font-weight antar breakpoint dan jangan biarkan dua ukuran berbeda untuk elemen selevel.

## Pasang kontrak interaksi

- Tambahkan satu handler global untuk `[data-toggle]` (mendukung ID dipisah spasi) yang toggle class `is-open` dan `aria-expanded`.
- Tambahkan satu handler global untuk `.m-item`: ketuk toggle `is-open`, tapi abaikan ketuk pada `a, button, input, select, textarea`.
- Sediakan `window.mConfirm({title, message, confirmText, cancelText, danger})` yang me-return `Promise<boolean>`; tampilkan sebagai bottom-sheet di mobile dan dialog tengah di desktop.
- Salin CSS `.m-item`, `.m-filter-head`, `.m-filter-more`, dan bottom-sheet dari contoh di `examples/demo.html`.

## Bangun pola per halaman

- Setiap daftar di mobile: tentukan ringkasannya saat terlipat (nama + satu info penting + panah kanan), detail penuh saat terbuka.
- Tabel di mobile jadi kartu: sel pertama sebagai judul + panah, kolom lain tersembunyi sampai `.is-expanded`, tombol aksi full-width.
- Filter di mobile: baris toggle "Filter · N aktif" + chevron; isi filter terlipat.
- Judul halaman di mobile bisa diketuk untuk menampilkan keterangan (pola `.m-item` pada header).
- Ganti setiap `confirm()` bawaan dengan `window.mConfirm`.

## Jaga konsistensi

- Satu komponen badge untuk semua label status; satu gaya tombol; pagination ikut pola 40px satu baris di mobile.
- Input mobile 16px agar iOS tidak auto-zoom; hormati `prefers-reduced-motion`.
- Semua pola lipat hanya aktif di `max-width: 768px`; desktop harus piksel-identik sebelum dan sesudah.
- Uji di 360px: tidak ada wrap rusak, tidak ada teks terpotong, target sentuh minimal 40px.

## Verifikasi

- Buka `examples/demo.html` di lebar mobile dan desktop sebagai referensi visual.
- Setelah menerapkan, bandingkan tiap pola dengan demo: judul, badge, kartu, accordion, dialog, dan pagination harus terlihat dan berperilaku sama.
