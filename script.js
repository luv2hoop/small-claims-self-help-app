/* ==========================================================================
   Small Claims Self-Help App — shared script
   Two jobs: the A / A+ / A++ text-size control, and (see the second half of
   this file) remembering which step screen someone last visited so Home can
   offer to jump back there.
   ========================================================================== */

(function () {
  "use strict";

  var SIZE_KEY = "textSize"; // stored value: "normal" | "large" | "xlarge"
  var SIZE_CLASSES = { normal: "", large: "text-large", xlarge: "text-xlarge" };

  function applySize(size) {
    document.documentElement.classList.remove("text-large", "text-xlarge");
    var cls = SIZE_CLASSES[size];
    if (cls) {
      document.documentElement.classList.add(cls);
    }
    var buttons = document.querySelectorAll(".text-size-control button");
    for (var i = 0; i < buttons.length; i++) {
      var isActive = buttons[i].getAttribute("data-size") === size;
      buttons[i].setAttribute("aria-pressed", isActive ? "true" : "false");
    }
  }

  function getStoredSize() {
    try {
      return window.sessionStorage.getItem(SIZE_KEY) || "normal";
    } catch (e) {
      // Some browsers (e.g. private mode, kiosk lockdown) can block storage.
      // Fail quietly and just use the normal size for this page view.
      return "normal";
    }
  }

  function storeSize(size) {
    try {
      window.sessionStorage.setItem(SIZE_KEY, size);
    } catch (e) {
      // Ignore — worst case the choice won't carry to the next screen.
    }
  }

  /* ------------------------------------------------------------------------
     "Continue where you left off"

     This is the one deliberate exception to the "nothing a user does may
     create a record" rule in CLAUDE.md -- Jeff explicitly approved it on
     2026-08-31 so people don't have to re-click through screens they've
     already read on a process that can take weeks. See CLAUDE.md for the
     exact scope of this exception.

     What's stored, in localStorage (survives closing the browser, unlike
     the sessionStorage used for text size above): only the filename and
     plain-language title of the last step screen someone opened -- e.g.
     "p5.html" / "Step 5: The defendant's 21 days". Nothing about the
     person's actual case (no names, dates, dollar amounts, or anything
     they typed) is ever stored. A page opts in by putting
     data-progress-page and data-progress-label on its <body> tag; pages
     that don't set those attributes (Home, Glossary, Help, About, the
     calculator) are never recorded as "where you left off". The banner on
     Home always includes a one-click "Start over / forget this" button
     that erases it immediately.
     ------------------------------------------------------------------------ */

  var PROGRESS_KEY = "lastVisitedScreen";

  // Text for the resume banner in each language the site supports. Picked by
  // the <html lang="..."> attribute of the page currently being viewed, so
  // the banner speaks whichever language you're browsing in right now --
  // not necessarily the language of the page you last left off on.
  var RESUME_STRINGS = {
    en: {
      lastOn: "You were last on: ",
      continueLink: "Continue where you left off →",
      forget: "Start over / forget this"
    },
    es: {
      lastOn: "Te quedaste en: ",
      continueLink: "Continuar donde lo dejaste →",
      forget: "Empezar de nuevo / olvidar esto"
    }
  };

  function currentResumeStrings() {
    var lang = document.documentElement.getAttribute("lang");
    return RESUME_STRINGS[lang] || RESUME_STRINGS.en;
  }

  function saveProgress() {
    var page = document.body.getAttribute("data-progress-page");
    var label = document.body.getAttribute("data-progress-label");
    if (!page || !label) {
      return;
    }
    try {
      window.localStorage.setItem(PROGRESS_KEY, JSON.stringify({ page: page, label: label }));
    } catch (e) {
      // Storage blocked (private browsing, kiosk lockdown, etc.) -- fail quietly.
    }
  }

  function escapeForDisplay(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderResumeBanner() {
    var slot = document.getElementById("resume-banner-slot");
    if (!slot) {
      return;
    }

    var saved = null;
    try {
      var raw = window.localStorage.getItem(PROGRESS_KEY);
      saved = raw ? JSON.parse(raw) : null;
    } catch (e) {
      saved = null;
    }
    if (!saved || !saved.page || !saved.label) {
      return;
    }

    var t = currentResumeStrings();
    slot.innerHTML =
      '<div class="resume-banner">' +
        "<p>" + escapeForDisplay(t.lastOn) + "<strong>" + escapeForDisplay(saved.label) + "</strong></p>" +
        '<div class="resume-banner-actions">' +
          '<a class="button-primary inline" href="' + encodeURI(saved.page) + '">' + escapeForDisplay(t.continueLink) + "</a>" +
          '<button type="button" id="resume-clear-btn">' + escapeForDisplay(t.forget) + "</button>" +
        "</div>" +
      "</div>";
    slot.hidden = false;

    var clearBtn = document.getElementById("resume-clear-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", function () {
        try {
          window.localStorage.removeItem(PROGRESS_KEY);
        } catch (e) {
          // Ignore.
        }
        slot.hidden = true;
        slot.innerHTML = "";
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    applySize(getStoredSize());

    var buttons = document.querySelectorAll(".text-size-control button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (event) {
        var size = event.currentTarget.getAttribute("data-size");
        storeSize(size);
        applySize(size);
      });
    }

    saveProgress();
    renderResumeBanner();
  });
})();
