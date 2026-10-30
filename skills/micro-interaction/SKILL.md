---
name: micro-interaction
description: >
  Micro-interaction untuk UI web: gerakan kecil yang memberi umpan balik
  (button press, hover lift, chevron accordion, bottom-sheet, toast) —
  simpel, cepat (100–200ms), dan konsisten. Dipakai saat menambah atau
  meninjau animasi/transisi pada komponen, dan saat UI terasa "mati" atau
  sebaliknya terlalu ramai.
---

# Micro Interaction

Micro-interaction yang bagus itu **tidak terlihat** — user hanya merasa
aplikasinya responsif. Setiap gerakan harus punya fungsi: memberi umpan
balik, mengarahkan perhatian, atau mengkomunikasikan perubahan status.
Kalau sebuah animasi tidak melakukan salah satu dari tiga itu, hapus.

## Prinsip

1. **Cepat.** 100ms untuk umpan balik sentuhan, 200ms untuk perubahan
   tampilan, 350ms maksimal untuk elemen yang masuk/keluar layar.
   Animasi yang lambat terasa "berat", bukan "mewah".
2. **Satu easing untuk semua.** `cubic-bezier(0, 0, 0.2, 1)` (ease-out):
   mulai cepat, berhenti halus. Jangan campur easing per komponen.
3. **Kecil dan konsisten.** Satu pola = satu gerakan, dipakai di semua
   tempat yang sama. Accordion selalu putar chevron-nya; tombol selalu
   press 0.98.
4. **Fungsi dulu, dekorasi tidak.** Gerakan dekoratif murni (elemen
   melayang, ikon bergoyang tanpa alasan) adalah slop — hapus.

## Katalog pola

### Button: press + hover lift

```css
.btn { transition: transform 100ms var(--ease-out), box-shadow 200ms var(--ease-out); }
.btn:hover { transform: translateY(-1px); box-shadow: var(--shadow-card-hover); }
.btn:active { transform: scale(0.98); }
```

Press memberi tahu "tap-mu diterima" — wajib di mobile. Hover lift hanya
untuk pointer (desktop); jangan tiru hover di layar sentuh.

### Chevron accordion

```css
.m-item-title::after { transition: transform 200ms var(--ease-out); }
.m-item.is-open .m-item-title::after { transform: rotate(180deg); }
```

Chevron berputar = status buka/tutup terbaca tanpa teks tambahan.
Jangan animasikan `height` konten (mahal) — cukup toggle `display`/
`grid-template-rows`, chevron-nya yang bergerak.

### Bottom-sheet / dialog masuk

```css
.sheet { transform: translateY(100%); transition: transform 350ms var(--ease-out); }
.sheet.is-open { transform: translateY(0); }
```

Elemen masuk dari arah ia berasal (sheet dari bawah, toast dari bawah,
dropdown dari pemicunya). Overlay fade 200ms via `opacity`.

### Toast / notifikasi

Slide + fade 350ms saat masuk, auto-dismiss dengan fade 200ms.
Toast tidak boleh menggeser layout — `position: fixed`.

### Toggle / switch

```css
.switch-knob { transition: transform 200ms var(--ease-out); }
```

Satu-satunya yang bergerak adalah knob-nya. Warna track berubah instan
atau 100ms — jangan lebih.

### Bilah progres / bar status

```css
.bar-fill { transition: width 200ms var(--ease-out); }
```

`width` di sini boleh karena elemennya kecil dan jarang; untuk daftar
panjang, pilih `transform: scaleX()`.

### Entrance halaman/panel

Fade + translateY(8px → 0), 200–350ms, sekali saat mount.
Jangan stagger per baris lebih dari ~50ms antar item — total harus
tetap di bawah 500ms.

## Aturan performa

- **Hanya animasikan `transform` dan `opacity`.** Keduanya tidak memicu
  layout ulang (compositor-only). Jangan animasikan `width`, `height`,
  `margin`, `top/left` pada daftar atau elemen yang sering berubah.
- Satu animasi berjalan per interaksi. Dua animasi yang berebut
  perhatian = tidak ada yang diperhatikan.
- Test di HP kelas menengah, bukan cuma di laptop. Kalau patah-patah,
  sederhanakan gerakannya — jangan naikkan durasinya.

## Aksesibilitas

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { transition: none !important; animation: none !important; }
}
```

Wajib di setiap proyek. Gerakan tidak boleh menjadi satu-satunya
penanda status (chevron + teks, bukan chevron saja).

## Jangan pernah

- Animasi denyut/pulse, bounce, atau "perhatian" yang berulang tanpa henti.
- Durasi > 400ms untuk interaksi rutin.
- Easing `ease-in` untuk elemen masuk (terasa lambat di awal = tidak responsif).
- Animasi saat halaman dimuat yang menunda konten terbaca.
- Parallax atau gerakan mengikuti scroll/kursor tanpa fungsi.

## Checklist verifikasi

1. Setiap animasi < 400ms? (mayoritas 100–200ms)
2. Hanya `transform`/`opacity` yang dianimasikan?
3. `prefers-reduced-motion` ditangani?
4. Pola yang sama dipakai konsisten di semua halaman?
5. Masih terasa responsif di HP menengah?

---

## Adaptasi Base Design (vibekoding)

> Skill ini ditulis native untuk repo ini.

- Pakai token motion dari `design-system.md`: `--ease-out`,
  `--dur-micro: 100ms`, `--dur-short: 200ms`, `--dur-medium: 350ms`.
- Jangan ciptakan pola gerakan baru untuk kasus yang sudah ada di
  `design-system.md` (accordion, filter lipat, bottom-sheet `mConfirm`,
  toast, pagination).
- Anti-slop berlaku penuh: tanpa pulse, tanpa glassmorphism animasi,
  tanpa dekorasi gerak.
