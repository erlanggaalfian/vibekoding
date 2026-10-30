---
name: standar-web
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Fetch the latest guidelines from the source URL below
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the fetched guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

Use WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.

## Usage

When a user provides a file or pattern argument:
1. Fetch guidelines from the source URL above
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.

---

## Adaptasi Base Design (vibekoding)

> Bagian ini adalah adaptasi lokal repo ini — bukan bagian dari skill aslinya.

Saat skill ini dipakai untuk proyek yang mengikuti base design system repo ini
(`design-system.md` + skill `base-design-system`):

1. **Tokens menang.** Pakai token warna, skala tipografi, spacing, radius, shadow,
   dan motion dari `design-system.md`. Jangan menciptakan palet atau gaya huruf
   baru kecuali brief memintanya.
2. **Pola interaksi konsisten.** Untuk perilaku mobile (accordion collapsed-first,
   filter lipat, dialog bottom-sheet, header yang bisa diketuk) ikuti kontrak di
   `design-system.md` — jangan merancang pola tandingan.
3. **Anti-slop tetap berlaku.** Base design ini juga anti-slop: tanpa gradient
   generik, glassmorphism berlebihan, atau animasi pulse — kecuali disetujui
   eksplisit.
4. **Konflik?** Jika panduan skill ini bertentangan dengan `design-system.md`
   untuk proyek tersebut, `design-system.md` yang menang. Sampaikan
   penyimpangannya ke user.
