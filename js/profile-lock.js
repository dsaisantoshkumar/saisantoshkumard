// ==========================================================================
// Profile lock / unlock control (bottom of sidebar).
//
// SECURITY NOTE — read this before relying on it for anything sensitive:
// This site is static HTML/CSS/JS with no server and no real authentication
// system. What follows is a *convenience* gate to keep the Admin Panel out
// of casual visitors' way — it is NOT secure authentication. Anyone who
// opens browser devtools can read this file, see the SHA-256 hash below,
// and (with enough effort) brute-force or simply bypass the check by
// running JavaScript directly in the console. Do not use this pattern to
// protect anything truly private. The only thing it gates here is whether
// the on-page content-editing forms are shown — it does not protect any
// server, database, or account, because this site has none.
//
// The password itself is never stored in plaintext anywhere in this file —
// only its SHA-256 hash, computed once and hard-coded below. Even so, this
// is "obscurity", not security: a hash of a fixed password is still
// guessable if someone really wants to.
// ==========================================================================

const ProfileLock = (function () {
  // SHA-256 of the admin password. Never store the plaintext password here.
  const PASSWORD_HASH = "bb95e018b642c529ed6f20aad7731565554a816d78713e1c0173e3dac4a18923";
  const SESSION_KEY = "adminUnlocked";

  async function sha256Hex(text) {
    const data = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map(function (b) {
        return b.toString(16).padStart(2, "0");
      })
      .join("");
  }

  function isUnlocked() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === "true";
    } catch (e) {
      return false;
    }
  }

  function applyState(unlocked) {
    document.body.dataset.adminUnlocked = unlocked ? "true" : "false";
    const label = document.getElementById("adminLockLabel");
    const btn = document.getElementById("adminLockBtn");
    if (label) label.textContent = unlocked ? "Lock Profile" : "Unlock Profile";
    if (btn) btn.setAttribute("aria-pressed", unlocked ? "true" : "false");
    document.dispatchEvent(new CustomEvent("adminUnlockChanged", { detail: { unlocked: unlocked } }));
  }

  async function attemptUnlock() {
    const entered = window.prompt("Enter the admin password to unlock profile editing:");
    if (entered === null) return; // cancelled
    const hash = await sha256Hex(entered.trim());
    if (hash === PASSWORD_HASH) {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch (e) {
        /* sessionStorage unavailable — unlock still works for this page view */
      }
      applyState(true);
    } else {
      window.alert("That password doesn't match. Profile editing stays locked.");
    }
  }

  function lock() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {
      /* ignore */
    }
    applyState(false);
  }

  function init() {
    const btn = document.getElementById("adminLockBtn");
    if (!btn) return;
    applyState(isUnlocked());
    btn.addEventListener("click", function () {
      if (isUnlocked()) {
        lock();
      } else {
        attemptUnlock();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  return { isUnlocked: isUnlocked, lock: lock };
})();
