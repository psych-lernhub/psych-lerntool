/* progress.js — Lernfortschritt pro Modul & pro Lernmodulart.
   Liest die SRS-Stände aus localStorage (Keys lm-<präfix>-vl<NN>) und rendert in #lernfortschritt.
   Rein clientseitig, neutral (keine Noten). Wird vom privaten UND vom öffentlichen Hub eingebunden.
   Exponiert window.renderProgress() (z.B. nach Fortschritts-Code-Import erneut aufrufen). */
(function () {
  var MOD = {  // Modul-Code -> Anzeigename (neutral, keine Noten)
    m2a: "Allgemeine Psychologie A", m4b: "Entwicklungspsychologie B", m5: "Sozialpsychologie",
    m11a: "Diagnostik I", m11b: "Diagnostik II", m12a: "Verfahrenslehre I",
    m12b: "Verfahrenslehre II", m14b: "Methodenlehre II"
  };
  var ORDER = ["m2a", "m4b", "m5", "m11a", "m11b", "m12a", "m12b", "m14b"];

  function typeOf(nn) {            // Suffix NN -> [Label, Sortier-Rang]
    nn = parseInt(nn, 10);
    if (nn === 0)  return ["Altklausur / Set", 5];
    if (nn === 90) return ["Modell-Trainer", 1];
    if (nn === 98) return ["KI-Set", 4];
    if (nn === 97) return ["Freitext-Set", 6];
    if (nn === 99) return ["OSCE-Simulation", 7];
    if (nn >= 21 && nn <= 29) return ["Vertiefung", 2];
    return ["Lernmodule (VL)", 0];
  }
  function modOf(mid) { var m = mid.match(/^m\d+[a-z]?/); return m ? m[0] : mid; }

  function collect() {
    var mods = {}, now = Date.now();
    for (var i = 0; i < localStorage.length; i++) {
      var k = localStorage.key(i); var m = k && k.match(/^lm-(.+)-vl(\d+)$/); if (!m) continue;
      var code = modOf(m[1]); var ty = typeOf(m[2]);
      var obj; try { obj = JSON.parse(localStorage.getItem(k)); } catch (e) { continue; }
      if (!obj || typeof obj !== "object" || Array.isArray(obj)) continue;
      var M = mods[code] || (mods[code] = { seen: 0, due: 0, mast: 0, corr: 0, tot: 0, types: {} });
      var T = M.types[ty[0]] || (M.types[ty[0]] = { seen: 0, due: 0, mast: 0, corr: 0, tot: 0, ord: ty[1] });
      for (var id in obj) {
        var p = obj[id];
        if (!p || typeof p !== "object" || (p.reps === undefined && p.stability === undefined && p.state === undefined)) continue;
        var isDue = (p.due && now >= p.due) || (!p.due && p.state === "new");
        [M, T].forEach(function (g) {
          g.seen++; if ((p.stability || 0) > 21) g.mast++;
          g.corr += Math.max(0, (p.reps || 0) - (p.lapses || 0)); g.tot += (p.reps || 0);
          if (isDue) g.due++;
        });
      }
    }
    return mods;
  }
  function quote(g) { return g.tot ? Math.round(g.corr / g.tot * 100) + "%" : "—"; }
  function barPct(g) { return g.seen ? Math.round(g.mast / g.seen * 100) : 0; }
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

  function renderProgress() {
    var el = document.getElementById("lernfortschritt"); if (!el) return;
    var mods = collect(), codes = Object.keys(mods);
    if (!codes.length) {
      el.innerHTML = '<div class="lf-empty">📊 Noch kein Lernfortschritt auf diesem Gerät — sobald du in einem Modul übst, siehst du hier <strong>pro Modul</strong> und <strong>pro Lernart</strong>, was du schon gelernt hast und wo du wiederholen solltest.</div>';
      return;
    }
    codes.sort(function (a, b) { var ia = ORDER.indexOf(a), ib = ORDER.indexOf(b); if (ia < 0) ia = 99; if (ib < 0) ib = 99; return ia - ib || a.localeCompare(b); });
    var urgent = codes.filter(function (c) { return mods[c].due > 0; }).sort(function (a, b) { return mods[b].due - mods[a].due; });

    var h = '<div class="lf-head">📊 Dein Lernfortschritt <span>pro Modul · pro Lernart</span></div>';
    if (urgent.length)
      h += '<div class="lf-urgent">🔁 Am dringendsten wiederholen: ' +
        urgent.slice(0, 4).map(function (c) { return '<b>' + c.toUpperCase() + '</b> (' + mods[c].due + ')'; }).join(' · ') + '</div>';

    codes.forEach(function (c) {
      var M = mods[c], name = MOD[c] || "", b = barPct(M);
      var tkeys = Object.keys(M.types).sort(function (a, b) { return M.types[a].ord - M.types[b].ord; });
      var sub = tkeys.map(function (tn) {
        var T = M.types[tn];
        return '<div class="lf-sub"><span class="lf-sub-n">' + esc(tn) + '</span>' +
          '<span class="lf-nums">✅ ' + T.seen + ' · 🔁 ' + T.due + ' · ⭐ ' + T.mast + ' · ' + quote(T) + '</span></div>';
      }).join('');
      h += '<details class="lf-mod"' + (M.due > 0 ? ' data-due="1"' : '') + '>' +
        '<summary><span class="lf-code">' + c.toUpperCase() + '</span> <span class="lf-name">' + esc(name) + '</span>' +
        '<span class="lf-bar" title="' + b + '% der bearbeiteten Karten beherrscht"><i style="width:' + b + '%"></i></span>' +
        '<span class="lf-nums">✅ ' + M.seen + ' · ' + (M.due > 0 ? '<b class="lf-due">🔁 ' + M.due + '</b>' : '🔁 0') + ' · ⭐ ' + M.mast + ' · ' + quote(M) + '</span></summary>' +
        '<div class="lf-subs">' + sub + '</div></details>';
    });
    h += '<div class="lf-legend">✅ bearbeitet · 🔁 heute fällig · ⭐ beherrscht (stabil) · Quote = Anteil richtig · Balken = beherrscht/bearbeitet</div>';
    el.innerHTML = h;
  }
  window.renderProgress = renderProgress;

  var css =
    '#lernfortschritt{max-width:700px;margin:0 auto 22px;font-family:system-ui,sans-serif}' +
    '.lf-head{font-size:.95rem;font-weight:800;color:var(--text);margin-bottom:8px}' +
    '.lf-head span{font-weight:500;font-size:.74rem;color:var(--text3)}' +
    '.lf-urgent{background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.35);border-radius:10px;padding:8px 12px;font-size:.8rem;color:var(--text2);margin-bottom:10px}' +
    '.lf-urgent b{color:var(--yellow)}' +
    '.lf-mod{background:var(--surface);border:1px solid var(--border);border-radius:12px;margin-bottom:8px;overflow:hidden}' +
    '.lf-mod[data-due="1"]{border-color:rgba(251,191,36,.4)}' +
    '.lf-mod>summary{cursor:pointer;list-style:none;display:flex;align-items:center;gap:10px;padding:12px 14px;flex-wrap:wrap}' +
    '.lf-mod>summary::-webkit-details-marker{display:none}' +
    '.lf-mod>summary::before{content:"\\25B8";color:var(--accent);font-size:.8rem}' +
    '.lf-mod[open]>summary::before{content:"\\25BE"}' +
    '.lf-code{font-family:"SF Mono",Menlo,monospace;font-weight:800;color:var(--accent);font-size:.82rem}' +
    '.lf-name{color:var(--text2);font-size:.82rem;flex:1;min-width:90px}' +
    '.lf-bar{width:64px;height:7px;background:var(--bg);border-radius:5px;overflow:hidden;flex-shrink:0}' +
    '.lf-bar i{display:block;height:100%;background:linear-gradient(90deg,#34d399,#818cf8)}' +
    '.lf-nums{font-size:.72rem;color:var(--text3);font-family:"SF Mono",Menlo,monospace;white-space:nowrap}' +
    '.lf-due{color:var(--yellow)}' +
    '.lf-subs{padding:0 14px 10px 30px}' +
    '.lf-sub{display:flex;justify-content:space-between;gap:10px;padding:5px 0;border-top:1px solid var(--border);font-size:.76rem}' +
    '.lf-sub-n{color:var(--text2)}' +
    '.lf-legend{font-size:.68rem;color:var(--text3);margin-top:6px;text-align:center}' +
    '.lf-empty{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:14px 16px;font-size:.85rem;color:var(--text2);line-height:1.5}';
  var s = document.createElement("style"); s.textContent = css; document.head.appendChild(s);

  if (document.readyState !== "loading") renderProgress();
  else document.addEventListener("DOMContentLoaded", renderProgress);
})();
