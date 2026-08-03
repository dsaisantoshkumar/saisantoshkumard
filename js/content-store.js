// ==========================================================================
// ContentStore — tiny localStorage-backed override layer.
//
// The portfolio always has a working set of defaults (js/content-data.js).
// When the Admin Panel saves an edit, it writes an "override" object to
// localStorage. ContentStore.get() returns the defaults with any saved
// override merged on top, so the page (and this browser only — see the
// note in content-data.js) reflects the latest edit on every reload.
//
// This is intentionally simple: one JSON blob, one key, shallow-per-section
// replacement (each top-level section — skills, education, certifications,
// contact, profile — is either left at its default or fully replaced by the
// saved override for that section). No server, no build step.
// ==========================================================================

const ContentStore = (function () {
  const KEY = "portfolioContentOverride";

  function readOverride() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writeOverride(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  // Returns the live content object: defaults with saved sections replaced.
  function get() {
    const override = readOverride();
    const merged = {};
    Object.keys(portfolioContentDefaults).forEach(function (section) {
      merged[section] =
        override[section] !== undefined ? override[section] : portfolioContentDefaults[section];
    });
    return merged;
  }

  // Replace one top-level section (e.g. "skills", "education") and persist.
  function setSection(section, value) {
    const override = readOverride();
    override[section] = value;
    return writeOverride(override);
  }

  // Discard all saved overrides — the page reverts to content-data.js.
  function resetAll() {
    try {
      localStorage.removeItem(KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  function resetSection(section) {
    const override = readOverride();
    delete override[section];
    return writeOverride(override);
  }

  // Full merged content as a formatted JSON string, for the Admin Panel's
  // "Export JSON" button — paste this into content-data.js to make an edit
  // permanent for every visitor, not just this browser.
  function exportJSON() {
    return JSON.stringify(get(), null, 2);
  }

  function hasOverrides() {
    const override = readOverride();
    return Object.keys(override).length > 0;
  }

  return { get, setSection, resetAll, resetSection, exportJSON, hasOverrides };
})();
