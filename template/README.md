# Template Starter — Base Design System

Scaffold aplikasi baru yang siap dipakai: memakai token dari
`design-system.md`, mendukung **terang & gelap**, dan semua komponen
demo di bawah **berfungsi** saat `index.html` dibuka di browser.

> Acuan desain: [`../design-system.md`](../design-system.md)
> Generator palet: [`../examples/palette-generator.html`](../examples/palette-generator.html)

## Isi folder

| File | Keterangan |
|---|---|
| `index.html` | Scaffold halaman: navigasi responsif, ringkasan, daftar lipat, tabel→kartu, filter, formulir, badge/tombol, dialog, switch, progress, pagination, empty state |
| `tokens.css` | **Satu-satunya file yang perlu diganti** untuk ganti warna: blok `:root` (terang) + `[data-theme="dark"]` (gelap), format sama persis dengan output generator palet |
| `components.css` | Seluruh gaya komponen — hanya memakai token, tanpa hex terkunci |
| `app.js` | Kontrak JS global: toggle tema, `[data-toggle]`, `.m-item`, baris tabel, `mConfirm`, toast, `renderPagination` |
| `README.md` | File ini |

## Cara memakai untuk aplikasi baru

**Opsi A — salin folder (paling cepat):**
1. Salin folder `template/` ini ke proyek barumu, ganti namanya (mis. `web/`).
2. Buka `index.html` — semua komponen langsung jalan.
3. Ganti tulisan `Template` di topbar dengan nama aplikasimu (cari `TODO` di `index.html`).
4. Hapus section contoh yang tidak dipakai, duplikat yang dipakai.

**Opsi B — fork repo:**
Clone repo ini, lalu kerjakan di dalam salinan `template/` seperti Opsi A.
Jangan ubah `design-system.md`, `skills/`, atau `examples/` — itu acuan
bersama yang dipakai semua aplikasi.

## Cara ganti palet warna (5 menit)

Warna **tidak dikunci** — yang dikunci hanya peran & relasinya
(primer, aksen, netral, status). Untuk identitas aplikasimu sendiri:

1. Buka `examples/palette-generator.html` (di repo ini, bukan di folder template).
2. Pilih **warna dasar** + **harmoni aksen** (monokromatik paling aman).
3. Klik **Salin CSS**, lalu **tempel menggantikan seluruh isi** `template/tokens.css`
   (biarkan komentar cara pakai di atasnya bila mau).
4. Refresh `index.html` — seluruh komponen ikut warna baru, termasuk mode gelap.
5. Sesuaikan juga `theme-color` di `<head>` `index.html` agar status bar
   mobile mengikuti warna brand.

Tidak ada file lain yang perlu disentuh untuk ganti warna.

## Komponen yang tersedia (kontrak siap pakai)

| Pola | Cara pakai | Keterangan |
|---|---|---|
| Accordion per item | `li.m-item` + `.m-item-title` + `.m-item-extra` | Mobile: ketuk judul → isi terbuka; ketuk link/tombol tidak melipat |
| Tabel → kartu | `table.data-table`, baris `tr.m-row`, sel utama `td.td-primary` | Mobile: baris jadi kartu lipat; tambah `.m-collapsed-extra` untuk ringkasan |
| Filter lipat | `button.m-filter-head[data-toggle="id-panel"]` + `#id-panel.m-filter-more` | Jumlah filter aktif terhitung otomatis |
| Dialog | `await mConfirm({title, message, confirmText, danger})` | Tengah di desktop, bottom-sheet di mobile |
| Toast | `showToast("pesan")` | Selalu di atas bottom tab bar |
| Pagination | `renderPagination(el, halaman, total, onGo)` | Desktop lengkap, mobile ringkas `‹ aktif ›` |
| Tema | `data-theme-toggle` pada tombol | Tersimpan di browser, ikut preferensi OS saat pertama dibuka |
| Switch / progress | `.switch`, `.progress > i` | Lihat contoh di `index.html` |
| Form mobile | `.field`, `.m-sticky-actions` | Input 16px anti-zoom iOS; aksi sticky di bawah |

## Checklist sebelum dianggap selesai (dari design-system.md §5)

1. [ ] Palet diganti via generator — bukan edit hex satu-satu
2. [ ] Setiap daftar mobile punya ringkasan jelas saat terlipat (nama + 1 info penting + panah)
3. [ ] Semua `confirm()` bawaan diganti `mConfirm`
4. [ ] Skala tipografi konsisten per level judul
5. [ ] Uji di lebar 360px: tidak ada wrap rusak / teks terpotong
6. [ ] Uji toggle terang↔gelap di desktop dan mobile

## Yang sengaja tidak dipakai

Native rewrite/WebView, `user-scalable=no`, swipe-action per baris,
infinite scroll, animasi denyut, glassmorphism berlebihan
(lihat design-system.md §6).
