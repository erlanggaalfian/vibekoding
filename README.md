# vibekoding

Sistem lengkap untuk membangun aplikasi web: **satu base design system +
skill-skill pendukung** — dari arah visual sampai quality gate. Tunjuk repo
ini ke AI agent, dan seluruh sistem langsung diterapkan ke proyek baru.

## Cara pakai

| Kamu mau... | Caranya |
|---|---|
| AI langsung menerapkan semuanya | Tunjuk repo ini / bilang **"pakai vibekoding"** → skill `vibekoding` mengatur urutannya |
| Hanya desainnya saja | Kirim `design-system.md` ke chat |
| Lihat contoh hidup | Buka `examples/demo.html` di browser (kecilkan ke ≤768px untuk mode mobile) |
| Pasang satu skill saja | Salin folder skill yang diinginkan ke `~/.agents/skills/` / folder skill agenmu |

## Isi repo

| Path | Keterangan |
|---|---|
| `design-system.md` | **Acuan desain utama.** Tokens (warna, tipografi, shadow, motion), pola interaksi mobile app-like (collapsed-first accordion, bottom-sheet dialog, filter lipat), komponen, checklist. |
| `skills/vibekoding/` | **Skill master.** Satu pintu masuk: baca desain → terapkan dengan urutan → verifikasi. |
| `skills/base-design-system/` | Cara menerapkan base design ke proyek web apa pun (tokens → kontrak JS → pola per halaman → verifikasi). |
| `examples/demo.html` | Contoh mandiri, satu file tanpa dependency: mode gelap/terang (toggle di topnav desktop, FAB di atas tab bar mobile, pilihan tersimpan), navigasi responsif (top bar desktop / tab bar mobile), accordion, tabel → kartu, filter collapsible, popup `mConfirm`/`mConfirmSubmit` (tengah di desktop, bottom-sheet di mobile), blur/frosted glass, micro-interaction (toggle, progress, toast, hover-lift), badge, tombol, pagination, empty state. |
| `examples/palette-generator.html` | **Generator palet interaktif.** Pilih warna dasar + harmoni roda warna (monokromatik/analogous/komplementer/triadik) → hasilkan seluruh token CSS, pratinjau live Terang/Gelap, salin sebagai `:root` + `[data-theme="dark"]`. |

## Skills

Semua skill memakai **nama sendiri** (bukan nama upstream) agar tidak bentrok
bila skill aslinya juga terinstal. Skill bertanda ✦ sudah diadaptasi ke base
design repo ini (bagian "Adaptasi Base Design" di `SKILL.md`-nya).

| Skill | Diadopsi dari | Keterangan |
|---|---|---|
| `skills/vibekoding/` | repo ini | Master: terapkan seluruh sistem ke proyek baru |
| `skills/base-design-system/` | repo ini | Menerapkan base design system ke proyek web apa pun |
| `skills/desain-bersih/` ✦ | Ferousco-dev/anti-slop-design (MIT) | Menghilangkan desain generik AI ("AI slop") dari frontend web/mobile |
| `skills/selera-visual/` ✦ | Leonxlnx/taste-skill (MIT) | Art direction anti-slop: landing page, dashboard, layar admin |
| `skills/arah-desain/` ✦ | anthropics/skills | Arah visual yang khas saat membangun/membongkar UI, anti pola templated |
| `skills/standar-web/` ✦ | vercel-labs/agent-skills | Review UI terhadap Web Interface Guidelines (aksesibilitas/UX) |
| `skills/micro-interaction/` ✦ | repo ini (dibuat baru) | Gerakan kecil yang simpel: button press, hover lift, chevron, sheet, toast — 100–200ms |
| `skills/modul-dalam/` ✦ | mattpocock/skills | Merancang deep module: interface kecil, perilaku besar, seam bersih |
| `skills/kode-minimal/` | DietrichGebert/ponytail (MIT) | "Lazy senior dev": solusi terkecil yang benar-benar bekerja, anti over-engineering |
| `skills/review-kode/` ✦ | DietrichGebert/ponytail | Review perubahan: benar, aman, tahan beban, teruji, cepat, ramping |
| `skills/audit-kode/` ✦ | DietrichGebert/ponytail | Audit seluruh repo: bug, keamanan, beban, tes, dan apa yang bisa dihapus |
| `skills/jawaban-ringkas/` | JuliusBrussee/caveman | Gaya jawab ringkas, hemat token, fakta teknis tetap utuh |

Isi tiap skill adopsi dipertahankan dari sumbernya (bagian adaptasi lokal
ditandai jelas); lisensi asli disertakan bila ada. Atribusi lengkap ada di
tiap folder skill.

## Prinsip desain

- **Mobile app-like, desktop konsisten** — collapsed-first di layar kecil, pixel-identical di desktop.
- **Anti-slop** — tanpa gradient generik, tanpa animasi denyut, tanpa pola template AI.
- **Satu pola, satu tempat** — kontrak interaksi dipakai ulang, bukan diciptakan ulang.
- **Tokens menang** — warna, tipografi, dan motion selalu dari design system, bukan hardcode.
