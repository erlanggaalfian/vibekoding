---
name: vibekoding
description: >
  Terapkan seluruh sistem vibekoding ke proyek baru: base design system
  (tokens, pola interaksi mobile app-like, komponen) + semua skill pendukung
  (desain bersih, selera visual, micro-interaction, kode minimal, review,
  audit). Dipakai saat user menunjuk repo ini / bilang "pakai vibekoding" /
  memulai aplikasi baru dengan desain ini.
---

# Vibekoding

Repo ini adalah sistem lengkap untuk membangun aplikasi web: **satu base
design + skill-skill pendukung**. Saat skill ini aktif, terapkan semuanya
ke proyek yang sedang dikerjakan.

## 1. Baca dulu (wajib)

1. `design-system.md` — acuan desain utama: tokens, skala tipografi, pola
   interaksi, komponen, checklist.
2. `skills/base-design-system/SKILL.md` — cara menerapkan: tokens → kontrak
   JS → pola per halaman → verifikasi.

Jangan mulai menulis kode UI sebelum dua file itu dibaca.

**Warna:** primer tidak dikunci ke satu hex. Tentukan warna dasar proyek,
lalu generate seluruh palet via `examples/palette-generator.html`
(pilih harmoni roda warna: monokromatik/analogous/komplementer/triadik),
tempel hasilnya sebagai `:root` + blok `[data-theme="dark"]` (mode gelap
ikut tergenerate). Aturan lengkap di `design-system.md` §2.1.

## 2. Terapkan dengan urutan ini

| Tahap | Skill | Kapan |
|---|---|---|
| Pondasi | `base-design-system` | Selalu — tokens, layout, pola interaksi |
| Rasa | `selera-visual`, `desain-bersih` | Setiap layar baru / redesign — arah visual, anti pola generik AI |
| Gerak | `micro-interaction` | Setiap animasi/transisi — 100–200ms, transform/opacity saja |
| Standar | `standar-web` | Review aksesibilitas & UX sebelum selesai |
| Struktur | `modul-dalam` | Saat merancang modul/komponen baru |
| Eksekusi | `kode-minimal` | Saat menulis kode — solusi terkecil yang lengkap |
| Hemat kata | `jawaban-ringkas` | Opsional — kalau user minta respons ringkas |
| Quality gate | `review-kode` / `audit-kode` | Review perubahan; audit repo sebelum rilis |
| Arah visual besar | `arah-desain` | Saat butuh arah visual baru yang khas |

Aturan main antar skill: jika dua skill bertentangan, `design-system.md`
yang menang untuk proyek ini. Bagian "Adaptasi Base Design" di tiap skill
menjelaskan penyesuaiannya.

## 3. Verifikasi sebelum selesai

1. Tokens dari `design-system.md` dipakai (tidak ada warna/font hardcode)?
2. Pola interaksi mengikuti kontrak (accordion, filter, bottom-sheet,
   toast) — tidak ada pola tandingan?
3. Micro-interaction < 400ms, hanya transform/opacity,
   `prefers-reduced-motion` ditangani?
4. Tidak ada AI slop (gradient generik, pulse, glassmorphism berlebihan)?
5. Mobile (≤768px) app-like, desktop pixel-identical?
6. `review-kode` untuk perubahan penting sebelum diserahkan.

## Catatan

- Semua skill di repo ini memakai nama sendiri (bukan nama aslinya) agar
  tidak bentrok dengan skill upstream bila dua-duanya terinstal.
- Atribusi sumber asli ada di tiap folder skill dan di README.
