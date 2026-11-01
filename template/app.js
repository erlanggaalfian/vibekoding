/* ============================================================
   KONTRAK JS — Base Design System (design-system.md §3)
   Satu handler global untuk semua pola lipat — tidak ada JS
   per halaman. Tambahkan halaman baru cukup dengan memakai
   class yang sama di markup.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Tema terang/gelap (§2.1) ---------- */
  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem("vibekoding-theme", t); } catch (e) {}
  }
  function toggleTheme() {
    setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  }
  document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", toggleTheme);
  });

  /* ---------- Navigasi: satu daftar link, state aktif sinkron (§4.8) ---------- */
  ["topnavLinks", "tabbar"].forEach(function (id) {
    var nav = document.getElementById(id);
    if (!nav) return;
    nav.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      e.preventDefault();
      nav.querySelectorAll("a").forEach(function (x) { x.classList.remove("active"); });
      a.classList.add("active");
    });
  });

  /* ---------- Kontrak [data-toggle] (§3.3): dukung ID dipisah spasi ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-toggle]");
    if (t) {
      t.getAttribute("data-toggle").split(/\s+/).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.classList.toggle("is-open");
      });
      t.classList.toggle("is-open");
      t.setAttribute("aria-expanded", t.classList.contains("is-open") ? "true" : "false");
      return;
    }
    /* ---------- Kontrak .m-item (§3.1, §3.5): abaikan ketuk pada kontrol ---------- */
    var item = e.target.closest(".m-item");
    if (item && !e.target.closest("a,button,input,select,textarea,label")) {
      item.classList.toggle("is-open");
      item.setAttribute("aria-expanded", item.classList.contains("is-open") ? "true" : "false");
      return;
    }
    /* ---------- Kontrak tr.m-row: tabel → kartu (§3.2) ---------- */
    var row = e.target.closest("tr.m-row");
    if (row && !e.target.closest("a,button,input,select,textarea,label")) {
      row.classList.toggle("is-expanded");
      row.setAttribute("aria-expanded", row.classList.contains("is-expanded") ? "true" : "false");
    }
  });

  /* ---------- Hitung filter aktif → .m-filter-head-count ---------- */
  function refreshFilterCounts() {
    document.querySelectorAll("[data-toggle]").forEach(function (head) {
      var countEl = head.querySelector(".m-filter-head-count");
      if (!countEl) return;
      var n = 0;
      head.getAttribute("data-toggle").split(/\s+/).forEach(function (id) {
        var panel = document.getElementById(id);
        if (!panel) return;
        panel.querySelectorAll("input,select,textarea").forEach(function (el) {
          if (el.type === "checkbox" || el.type === "radio") { if (el.checked) n++; }
          else if (String(el.value).trim() !== "") n++;
        });
      });
      countEl.textContent = n > 0 ? n + " aktif" : "";
    });
  }
  document.addEventListener("input", refreshFilterCounts);
  document.addEventListener("change", refreshFilterCounts);
  refreshFilterCounts();

  /* ---------- window.mConfirm: dialog bottom-sheet (§3.4) ---------- */
  window.mConfirm = function (opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      var ov = document.getElementById("mConfirmOverlay");
      if (!ov) { resolve(window.confirm(opts.message || "Lanjut?")); return; }
      document.getElementById("mConfirmTitle").textContent = opts.title || "Konfirmasi";
      document.getElementById("mConfirmMsg").textContent = opts.message || "";
      var okBtn = document.getElementById("mConfirmOk");
      var cancelBtn = document.getElementById("mConfirmCancel");
      okBtn.textContent = opts.confirmText || "Ya";
      okBtn.classList.toggle("danger-btn", opts.danger !== false);
      cancelBtn.textContent = opts.cancelText || "Batal";
      function done(v) {
        ov.classList.remove("open");
        okBtn.onclick = cancelBtn.onclick = ov.onclick = null;
        resolve(v);
      }
      okBtn.onclick = function () { done(true); };
      cancelBtn.onclick = function () { done(false); };
      ov.onclick = function (ev) {
        // Klik di luar popup HANYA menutup — event ditelan, tidak
        // mengaktifkan elemen di belakangnya.
        if (ev.target === ov) { ev.preventDefault(); ev.stopPropagation(); done(false); }
      };
      ov.classList.add("open");
    });
  };

  /* ---------- window.mConfirmSubmit(form, opts) (§3.4) ---------- */
  window.mConfirmSubmit = function (form, opts) {
    return window.mConfirm(opts || {}).then(function (ok) {
      if (ok) form.submit();
      return ok;
    });
  };

  /* ---------- Toast (§4.7): selalu di atas bottom nav ---------- */
  var toastTimer = null;
  window.showToast = function (msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  };

  /* ---------- Pagination (§4.4): satu fungsi render bersama ----------
     Desktop: « ‹ 1 2 3 … › » · Mobile (CSS): hanya ‹, aktif, ›  */
  window.renderPagination = function (el, page, totalPages, onGo) {
    if (!el || totalPages < 1) return;
    el.innerHTML = "";
    el.className = "pagination";
    function btn(label, p, cls, current) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "btn btn-sm secondary" + (cls ? " " + cls : "");
      b.textContent = label;
      if (current) b.setAttribute("aria-current", "page");
      if (p < 1 || p > totalPages || p === page) b.disabled = true;
      b.addEventListener("click", function () { onGo(p); });
      return b;
    }
    el.appendChild(btn("«", 1, "pg-first"));
    el.appendChild(btn("‹", page - 1, "pg-prev"));
    var nums = [];
    for (var p = Math.max(1, page - 2); p <= Math.min(totalPages, page + 2); p++) nums.push(p);
    if (nums[0] > 1) nums.unshift("…");
    if (nums[nums.length - 1] < totalPages) nums.push("…");
    nums.forEach(function (p) {
      if (p === "…") {
        var s = document.createElement("span");
        s.textContent = "…"; s.style.padding = "6px 4px"; s.style.color = "var(--color-text-muted)";
        el.appendChild(s); return;
      }
      el.appendChild(btn(String(p), p, "pg-num", p === page));
    });
    el.appendChild(btn("›", page + 1, "pg-next"));
    el.appendChild(btn("»", totalPages, "pg-last"));
  };
})();
