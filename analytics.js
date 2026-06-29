/* WorkSource consent-gated analytics. Loads GA4 (and Meta Pixel, when configured)
   ONLY after the visitor accepts cookies. Choice stored in localStorage. */
(function () {
  var GA_ID = 'G-SR6DPK897W';
  var META_PIXEL_ID = ''; // <- paste Meta Pixel ID here to enable retargeting
  var KEY = 'ws_cookie_consent';

  function loadGA() {
    if (!GA_ID) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }
  function loadMeta() {
    if (!META_PIXEL_ID) return;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', META_PIXEL_ID); fbq('track', 'PageView');
  }
  function enable() { loadGA(); loadMeta(); }

  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}
  if (choice === 'accepted') { enable(); return; }
  if (choice === 'declined') { return; }

  function showBanner() {
    var d = document.createElement('div');
    d.setAttribute('role', 'dialog');
    d.setAttribute('aria-label', 'Cookie consent');
    d.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:99999;background:#0b1f3a;color:#fff;padding:16px 20px;font:14px/1.5 system-ui,Segoe UI,Arial,sans-serif;display:flex;flex-wrap:wrap;align-items:center;gap:12px;box-shadow:0 -2px 12px rgba(0,0,0,.25)';
    d.innerHTML = '<span style="flex:1;min-width:240px">We use cookies for analytics to improve WorkSource. See our <a href="/cookie-policy" style="color:#9ec5ff;text-decoration:underline">Cookie Policy</a>.</span>';
    var accept = document.createElement('button');
    accept.textContent = 'Accept';
    accept.style.cssText = 'background:#2f6fed;color:#fff;border:0;border-radius:999px;padding:9px 22px;font-weight:600;cursor:pointer';
    var decline = document.createElement('button');
    decline.textContent = 'Decline';
    decline.style.cssText = 'background:transparent;color:#fff;border:1px solid rgba(255,255,255,.45);border-radius:999px;padding:9px 22px;font-weight:600;cursor:pointer';
    accept.onclick = function () { try { localStorage.setItem(KEY, 'accepted'); } catch (e) {} d.remove(); enable(); };
    decline.onclick = function () { try { localStorage.setItem(KEY, 'declined'); } catch (e) {} d.remove(); };
    d.appendChild(accept); d.appendChild(decline);
    document.body.appendChild(d);
  }
  if (document.readyState !== 'loading') showBanner();
  else document.addEventListener('DOMContentLoaded', showBanner);
})();
