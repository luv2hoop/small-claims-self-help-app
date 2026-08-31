/* ==========================================================================
   Small Claims Self-Help App — shared script
   Only job right now: the A / A+ / A++ text-size control.

   The choice is kept in sessionStorage, not localStorage. That means it is
   remembered while someone clicks between screens during one visit, but is
   automatically forgotten as soon as they close the browser tab/window.
   Nothing is written that outlives the visit.
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
  });
})();
