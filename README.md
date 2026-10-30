# vibekoding

Koleksi kebutuhan "vibe coding": design system, skill, dan contoh kode yang bisa dipakai ulang di proyek web.

## Isi

| Path | Keterangan |
|---|---|
| `design-system.md` | **Acuan desain utama.** Base design system: tokens (warna, tipografi, shadow, motion), pola interaksi mobile app-like (collapsed-first accordion, bottom-sheet dialog, filter lipat), dan komponen. Kirim file ini saja saat ingin menerapkan gaya yang sama ke proyek lain. |
| `skills/base-design-system/` | Skill untuk Muse: cara menerapkan base design ini ke proyek web apa pun (tokens → kontrak JS → pola per halaman → verifikasi). |
| `examples/demo.html` | Contoh mandiri (satu file, tanpa dependency): accordion per-item, filter collapsible, bottom-sheet `mConfirm`, badge, tombol, pagination, judul ketuk. Buka di browser; kecilkan ke ≤768px untuk melihat perilaku mobile. |

## Skills

Koleksi skill untuk agen coding. Skill bertanda ✦ sudah diadaptasi ke base design system repo ini (ada bagian "Adaptasi Base Design" di `SKILL.md`-nya).

| Skill | Sumber | Keterangan |
|---|---|---|
| `skills/base-design-system/` | repo ini | Menerapkan base design system ke proyek web apa pun. |
| `skills/anti-slop-design/` ✦ | Ferousco-dev/anti-slop-design (MIT) | Menghilangkan desain generik AI ("AI slop") dari frontend web/mobile. |
| `skills/design-taste-frontend/` ✦ | Leonxlnx/taste-skill (MIT) | Art direction anti-slop: landing page, dashboard, layar admin. |
| `skills/frontend-design/` ✦ | anthropics/skills | Arah visual yang khas saat membangun/membongkar UI, anti pola templated. |
| `skills/web-design-guidelines/` ✦ | vercel-labs/agent-skills | Review UI terhadap Web Interface Guidelines Vercel (aksesibilitas/UX). |
| `skills/caveman/` | JuliusBrussee/caveman | Gaya jawab ringkas, hemat token, tanpa mengubah kode/command. |
| `skills/ponytail/` | DietrichGebert/ponytail (MIT) | "Lazy senior dev": solusi terkecil yang benar-benar bekerja, anti over-engineering. |
| `skills/ponytail-review/` ✦ | DietrichGebert/ponytail | Review perubahan: benar, aman, tahan beban, teruji, cepat, ramping. |
| `skills/ponytail-audit/` ✦ | DietrichGebert/ponytail | Audit seluruh repo: bug, keamanan, beban, tes, dan apa yang bisa dihapus. |
| `skills/codebase-design/` ✦ | mattpocock/skills | Merancang deep module: interface kecil, perilaku besar, seam bersih. |
| `skills/micro-interaction/` ✦ | repo ini (dibuat baru) | Gerakan kecil yang simpel dan bagus: button press, hover lift, chevron, sheet, toast — 100–200ms. |

Isi tiap skill (kecuali bagian adaptasi lokal) dipertahankan verbatim dari sumbernya; lisensi asli disertakan bila ada.

## Cara pakai

1. **Mau desain seperti ini di proyek baru?** Kirim `design-system.md` ke chat.
2. **Mau Muse yang menerapkan?** Skill `base-design-system` sudah mengajarkan polanya.
3. **Mau lihat contoh hidup?** Buka `examples/demo.html`.
