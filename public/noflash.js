!(function () {
  const e = 'dark-mode';
  const o = 'light-mode';
  function t(t) {
    document.body.classList.add(t ? e : o),
      document.body.classList.remove(t ? o : e);
  }
  const s = window.matchMedia('(prefers-color-scheme: dark)');
  const c = s.media === '(prefers-color-scheme: dark)';
  let a = null;
  try {
    a = localStorage.getItem('darkMode');
  } catch (e) {}
  const d = a !== null;
  if ((d && (a = JSON.parse(a)), d)) t(a);
  else if (c) t(s.matches), localStorage.setItem('darkMode', s.matches);
  else {
    const o = document.body.classList.contains(e);
    localStorage.setItem('darkMode', JSON.stringify(o));
  }
})();
