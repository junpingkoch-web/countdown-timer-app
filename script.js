(function () {
  "use strict";

  const STORAGE_KEY = "countdownStudio.events";
  const LANG_KEY = "countdownStudio.lang";

  const i18n = {
    en: {
      appTitle: "Countdown Studio",
      tabDate: "Date Countdown",
      tabTimer: "Timer",
      eventNameLabel: "Event name",
      eventNamePlaceholder: "e.g. Birthday, Launch day...",
      eventDateLabel: "Target date & time",
      addCountdownBtn: "Add countdown",
      emptyState: "No countdowns yet. Add your first event above.",
      days: "Days",
      hours: "Hours",
      minutes: "Min",
      seconds: "Sec",
      deleteBtn: "Delete",
      completedBanner: "Time's up! 🎉",
      minutesLabel: "Minutes",
      secondsLabel: "Seconds",
      startBtn: "Start",
      pauseBtn: "Pause",
      resumeBtn: "Resume",
      resetBtn: "Reset",
      timerRunning: "Timer running…",
      timerPaused: "Paused",
      timerDone: "Time's up!",
      langButtonLabel: "DE",
      helpTitle: "Tips & how to use",
      helpDateHeading: "Date Countdown",
      helpTip1: "Add as many events as you like — each one keeps counting live in the background.",
      helpTip2: "Events are sorted automatically, soonest first.",
      helpTip3: "Click \"Delete\" on a card to remove an event you no longer need.",
      helpTimerHeading: "Timer",
      helpTip4: "Set minutes and seconds, then press Start to begin the countdown.",
      helpTip5: "Use Pause / Resume to stop and continue without losing the remaining time.",
      helpTip6: "Reset at any time to go back to your chosen duration.",
      helpGeneralHeading: "Good to know",
      helpTip7: "Your countdowns and language choice are saved automatically in this browser, so they're still here next time you visit.",
      helpTip8: "Use the language button in the top right to switch the whole page between English and German.",
      adLabel: "Advertisement",
      coffeeBtn: "Buy me a coffee",
      coffeeTooltip: "Enjoyed this tool? Buy me a coffee"
    },
    de: {
      appTitle: "Countdown Studio",
      tabDate: "Datums-Countdown",
      tabTimer: "Timer",
      eventNameLabel: "Ereignisname",
      eventNamePlaceholder: "z. B. Geburtstag, Launch-Tag...",
      eventDateLabel: "Zieldatum & Uhrzeit",
      addCountdownBtn: "Countdown hinzufügen",
      emptyState: "Noch keine Countdowns. Füge oben dein erstes Ereignis hinzu.",
      days: "Tage",
      hours: "Std",
      minutes: "Min",
      seconds: "Sek",
      deleteBtn: "Löschen",
      completedBanner: "Zeit abgelaufen! 🎉",
      minutesLabel: "Minuten",
      secondsLabel: "Sekunden",
      startBtn: "Start",
      pauseBtn: "Pause",
      resumeBtn: "Fortsetzen",
      resetBtn: "Zurücksetzen",
      timerRunning: "Timer läuft…",
      timerPaused: "Pausiert",
      timerDone: "Zeit abgelaufen!",
      langButtonLabel: "EN",
      helpTitle: "Tipps & Bedienung",
      helpDateHeading: "Datums-Countdown",
      helpTip1: "Füge beliebig viele Ereignisse hinzu — jedes läuft im Hintergrund live weiter.",
      helpTip2: "Ereignisse werden automatisch sortiert, das nächste zuerst.",
      helpTip3: "Klicke auf \"Löschen\" bei einer Karte, um ein Ereignis zu entfernen.",
      helpTimerHeading: "Timer",
      helpTip4: "Stelle Minuten und Sekunden ein und drücke Start, um den Countdown zu beginnen.",
      helpTip5: "Mit Pause / Fortsetzen anhalten und weitermachen, ohne die verbleibende Zeit zu verlieren.",
      helpTip6: "Jederzeit zurücksetzen, um zur gewählten Dauer zurückzukehren.",
      helpGeneralHeading: "Gut zu wissen",
      helpTip7: "Deine Countdowns und die Sprachwahl werden automatisch in diesem Browser gespeichert und sind beim nächsten Besuch noch da.",
      helpTip8: "Mit dem Sprachbutton oben rechts wechselst du die ganze Seite zwischen Englisch und Deutsch.",
      adLabel: "Anzeige",
      coffeeBtn: "Spendier einen Kaffee",
      coffeeTooltip: "Hat dir das Tool geholfen? Spendier einen Kaffee"
    }
  };

  let currentLang = localStorage.getItem(LANG_KEY) || "en";

  function t(key) {
    return i18n[currentLang][key] || i18n.en[key] || key;
  }

  function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((el) => {
      el.setAttribute("title", t(el.getAttribute("data-i18n-title")));
    });
    document.getElementById("langToggle").querySelector(".lang-flag").textContent = t("langButtonLabel");
    renderCountdowns();
    updateTimerStatusText();
  }

  document.getElementById("langToggle").addEventListener("click", () => {
    currentLang = currentLang === "en" ? "de" : "en";
    localStorage.setItem(LANG_KEY, currentLang);
    applyLanguage();
  });

  // ---------- Help modal ----------
  const helpModal = document.getElementById("helpModal");
  const helpToggle = document.getElementById("helpToggle");
  const helpClose = document.getElementById("helpClose");

  function openHelp() {
    helpModal.hidden = false;
  }
  function closeHelp() {
    helpModal.hidden = true;
  }
  helpToggle.addEventListener("click", openHelp);
  helpClose.addEventListener("click", closeHelp);
  helpModal.addEventListener("click", (e) => {
    if (e.target === helpModal) closeHelp();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !helpModal.hidden) closeHelp();
  });

  // ---------- Tabs ----------
  const tabButtons = document.querySelectorAll(".tab-btn");
  const panels = {
    date: document.getElementById("panel-date"),
    timer: document.getElementById("panel-timer")
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      Object.values(panels).forEach((p) => p.classList.remove("active"));
      panels[btn.dataset.tab].classList.add("active");
    });
  });

  // ---------- Date Countdown ----------
  const dateForm = document.getElementById("dateForm");
  const eventNameInput = document.getElementById("eventName");
  const eventDateInput = document.getElementById("eventDate");
  const countdownList = document.getElementById("countdownList");
  const emptyState = document.getElementById("emptyState");

  function loadEvents() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveEvents(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  let events = loadEvents();

  dateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = eventNameInput.value.trim();
    const dateVal = eventDateInput.value;
    if (!name || !dateVal) return;

    events.push({
      id: Date.now().toString(36),
      name,
      target: new Date(dateVal).getTime()
    });
    saveEvents(events);
    dateForm.reset();
    renderCountdowns();
  });

  countdownList.addEventListener("click", (e) => {
    const delBtn = e.target.closest("[data-delete-id]");
    if (delBtn) {
      events = events.filter((ev) => ev.id !== delBtn.dataset.deleteId);
      saveEvents(events);
      renderCountdowns();
    }
  });

  function formatTargetDate(ts) {
    const d = new Date(ts);
    return d.toLocaleString(currentLang === "de" ? "de-DE" : "en-US", {
      year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  }

  function renderCountdowns() {
    const items = countdownList.querySelectorAll(".countdown-item");
    items.forEach((el) => el.remove());
    emptyState.style.display = events.length === 0 ? "block" : "none";

    events
      .slice()
      .sort((a, b) => a.target - b.target)
      .forEach((ev) => {
        const el = document.createElement("div");
        el.className = "countdown-item";
        el.dataset.id = ev.id;
        el.innerHTML = `
          <div class="countdown-item-head">
            <div>
              <h3>${escapeHtml(ev.name)}</h3>
              <p class="countdown-target">${formatTargetDate(ev.target)}</p>
            </div>
            <button class="btn-danger" data-delete-id="${ev.id}">${t("deleteBtn")}</button>
          </div>
          <div class="time-grid">
            <div class="time-unit"><div class="value" data-unit="d">0</div><div class="label">${t("days")}</div></div>
            <div class="time-unit"><div class="value" data-unit="h">0</div><div class="label">${t("hours")}</div></div>
            <div class="time-unit"><div class="value" data-unit="m">0</div><div class="label">${t("minutes")}</div></div>
            <div class="time-unit"><div class="value" data-unit="s">0</div><div class="label">${t("seconds")}</div></div>
          </div>
          <p class="completed-banner" style="display:none">${t("completedBanner")}</p>
        `;
        countdownList.appendChild(el);
      });
    tickCountdowns();
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function tickCountdowns() {
    const now = Date.now();
    countdownList.querySelectorAll(".countdown-item").forEach((el) => {
      const ev = events.find((e) => e.id === el.dataset.id);
      if (!ev) return;
      const diff = ev.target - now;
      const grid = el.querySelector(".time-grid");
      const banner = el.querySelector(".completed-banner");
      if (diff <= 0) {
        el.classList.add("completed");
        banner.style.display = "block";
        el.querySelector('[data-unit="d"]').textContent = "0";
        el.querySelector('[data-unit="h"]').textContent = "0";
        el.querySelector('[data-unit="m"]').textContent = "0";
        el.querySelector('[data-unit="s"]').textContent = "0";
        return;
      }
      el.classList.remove("completed");
      banner.style.display = "none";
      const totalSec = Math.floor(diff / 1000);
      const d = Math.floor(totalSec / 86400);
      const h = Math.floor((totalSec % 86400) / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      el.querySelector('[data-unit="d"]').textContent = d;
      el.querySelector('[data-unit="h"]').textContent = String(h).padStart(2, "0");
      el.querySelector('[data-unit="m"]').textContent = String(m).padStart(2, "0");
      el.querySelector('[data-unit="s"]').textContent = String(s).padStart(2, "0");
    });
  }

  setInterval(tickCountdowns, 1000);

  // ---------- Timer ----------
  const timerDisplay = document.getElementById("timerDisplay");
  const timerMinutesInput = document.getElementById("timerMinutes");
  const timerSecondsInput = document.getElementById("timerSeconds");
  const timerStart = document.getElementById("timerStart");
  const timerPause = document.getElementById("timerPause");
  const timerReset = document.getElementById("timerReset");
  const timerStatus = document.getElementById("timerStatus");

  let timerTotalSeconds = 25 * 60;
  let timerRemaining = timerTotalSeconds;
  let timerHandle = null;
  let timerState = "idle"; // idle | running | paused | done

  function formatTimer(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  function renderTimerDisplay() {
    timerDisplay.textContent = formatTimer(timerRemaining);
  }

  function updateTimerStatusText() {
    if (timerState === "running") timerStatus.textContent = t("timerRunning");
    else if (timerState === "paused") timerStatus.textContent = t("timerPaused");
    else if (timerState === "done") timerStatus.textContent = t("timerDone");
    else timerStatus.textContent = "";
  }

  function setInputsDisabled(disabled) {
    timerMinutesInput.disabled = disabled;
    timerSecondsInput.disabled = disabled;
  }

  timerStart.addEventListener("click", () => {
    if (timerState === "idle" || timerState === "done") {
      const mins = Math.max(0, parseInt(timerMinutesInput.value, 10) || 0);
      const secs = Math.max(0, Math.min(59, parseInt(timerSecondsInput.value, 10) || 0));
      timerTotalSeconds = mins * 60 + secs;
      if (timerTotalSeconds <= 0) return;
      timerRemaining = timerTotalSeconds;
    }
    timerState = "running";
    setInputsDisabled(true);
    timerStart.disabled = true;
    timerPause.disabled = false;
    timerPause.textContent = t("pauseBtn");
    updateTimerStatusText();
    renderTimerDisplay();

    clearInterval(timerHandle);
    timerHandle = setInterval(() => {
      timerRemaining -= 1;
      if (timerRemaining <= 0) {
        timerRemaining = 0;
        renderTimerDisplay();
        clearInterval(timerHandle);
        timerState = "done";
        timerStart.disabled = false;
        timerPause.disabled = true;
        setInputsDisabled(false);
        updateTimerStatusText();
        return;
      }
      renderTimerDisplay();
    }, 1000);
  });

  timerPause.addEventListener("click", () => {
    if (timerState === "running") {
      clearInterval(timerHandle);
      timerState = "paused";
      timerPause.textContent = t("resumeBtn");
      timerStart.disabled = false;
      updateTimerStatusText();
    } else if (timerState === "paused") {
      timerState = "running";
      timerPause.textContent = t("pauseBtn");
      timerStart.disabled = true;
      updateTimerStatusText();
      timerHandle = setInterval(() => {
        timerRemaining -= 1;
        if (timerRemaining <= 0) {
          timerRemaining = 0;
          renderTimerDisplay();
          clearInterval(timerHandle);
          timerState = "done";
          timerStart.disabled = false;
          timerPause.disabled = true;
          setInputsDisabled(false);
          updateTimerStatusText();
          return;
        }
        renderTimerDisplay();
      }, 1000);
    }
  });

  timerReset.addEventListener("click", () => {
    clearInterval(timerHandle);
    timerState = "idle";
    const mins = Math.max(0, parseInt(timerMinutesInput.value, 10) || 0);
    const secs = Math.max(0, Math.min(59, parseInt(timerSecondsInput.value, 10) || 0));
    timerTotalSeconds = mins * 60 + secs;
    timerRemaining = timerTotalSeconds;
    setInputsDisabled(false);
    timerStart.disabled = false;
    timerPause.disabled = true;
    timerPause.textContent = t("pauseBtn");
    updateTimerStatusText();
    renderTimerDisplay();
  });

  // ---------- Init ----------
  applyLanguage();
  renderTimerDisplay();
})();
