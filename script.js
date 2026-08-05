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
      coffeeTooltip: "Enjoyed this tool? Buy me a coffee",
      explainTitle: "How does Countdown Studio actually work?",
      explainP1: "This page is really two small independent tools bundled together: a minute-based Timer (Pomodoro-style) and a Date Countdown for specific target dates. Both run purely on JavaScript timestamp math inside your browser — there's no server involved, and nothing is sent anywhere.",
      explainP2: "Persistence works differently for each: your date-countdown events (and your language choice) are saved to this browser's local storage, so they're still there and still counting the next time you open the page. The minute Timer, on the other hand, isn't saved — if you reload the page while it's running, it resets to your last-entered duration.",
      explainP3: "When a timer or countdown reaches zero, the page shows an on-screen banner — it doesn't send an operating-system notification, so you'll only see it while this tab is open and visible. Keep that in mind if you're planning to switch away to another tab or app while it counts down.",
      faqTitle: "Frequently Asked Questions",
      faq: [
        { q: "Does the countdown keep running if I close the tab or restart my computer?", a: "Your event and its target date are saved in this browser, so when you reopen the page the countdown picks up correctly from the actual current time — it isn't literally running in the background while closed, but the math is based on the real clock, so nothing is lost." },
        { q: "Does the minute Timer save its progress if I reload the page?", a: "No. Only your date-countdown events and language choice are saved; the minute Timer resets to your last-entered duration if you reload or navigate away while it's running." },
        { q: "Will I get a notification when the time is up?", a: "Only an on-screen banner within this page — there's no operating-system push notification, so you need to have this tab open and visible to see it." },
        { q: "Can I add more than one date countdown at the same time?", a: "Yes. Add as many events as you like; they're sorted automatically with the soonest one first, and each keeps counting independently." },
        { q: "Are my events or countdown data sent to a server?", a: "No. Everything is stored only in your browser's local storage; there's no account, no backend, and nothing is transmitted anywhere." },
        { q: "Why is this tool only available in English and German?", a: "Countdown Studio is one of the earlier, simpler tools in this collection and was built bilingual (EN/DE) from the start. Other, later tools on this site use a trilingual (ZH/EN/DE) setup instead." }
      ]
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
      coffeeTooltip: "Hat dir das Tool geholfen? Spendier einen Kaffee",
      explainTitle: "Wie funktioniert Countdown Studio eigentlich?",
      explainP1: "Diese Seite ist eigentlich zwei kleine, unabhängige Tools in einem: ein minutenbasierter Timer (im Pomodoro-Stil) und ein Datums-Countdown für konkrete Zieltermine. Beide laufen rein über JavaScript-Zeitstempel-Berechnung in deinem Browser — es gibt keinen Server, nichts wird irgendwohin gesendet.",
      explainP2: "Die Speicherung funktioniert bei beiden unterschiedlich: Deine Datums-Countdown-Ereignisse (und deine Sprachwahl) werden im lokalen Speicher dieses Browsers gesichert, sodass sie beim nächsten Öffnen der Seite noch da sind und weiterlaufen. Der Minuten-Timer dagegen wird nicht gespeichert — lädst du die Seite neu, während er läuft, setzt er sich auf deine zuletzt eingegebene Dauer zurück.",
      explainP3: "Wenn ein Timer oder Countdown bei null ankommt, zeigt die Seite ein Banner direkt auf der Seite an — es wird keine Betriebssystem-Benachrichtigung gesendet, du siehst es also nur, solange dieser Tab geöffnet und sichtbar ist. Denk daran, falls du planst, während des Countdowns zu einem anderen Tab oder einer anderen App zu wechseln.",
      faqTitle: "Häufig gestellte Fragen",
      faq: [
        { q: "Läuft der Countdown weiter, wenn ich den Tab schließe oder den Computer neu starte?", a: "Dein Ereignis und sein Zieldatum werden in diesem Browser gespeichert. Öffnest du die Seite später wieder, berechnet sich der Countdown korrekt anhand der tatsächlichen aktuellen Zeit — er läuft nicht wörtlich im Hintergrund weiter, aber die Berechnung basiert auf der echten Uhrzeit, es geht also nichts verloren." },
        { q: "Speichert der Minuten-Timer seinen Fortschritt, wenn ich die Seite neu lade?", a: "Nein. Nur deine Datums-Countdown-Ereignisse und deine Sprachwahl werden gespeichert; der Minuten-Timer setzt sich auf deine zuletzt eingegebene Dauer zurück, wenn du die Seite neu lädst, während er läuft." },
        { q: "Bekomme ich eine Benachrichtigung, wenn die Zeit abgelaufen ist?", a: "Nur ein Banner direkt auf der Seite — es gibt keine Betriebssystem-Push-Benachrichtigung, du musst diesen Tab also geöffnet und sichtbar haben, um es zu sehen." },
        { q: "Kann ich mehrere Datums-Countdowns gleichzeitig hinzufügen?", a: "Ja. Füge beliebig viele Ereignisse hinzu; sie werden automatisch sortiert, das nächste zuerst, und jedes läuft unabhängig weiter." },
        { q: "Werden meine Ereignisse oder Countdown-Daten an einen Server gesendet?", a: "Nein. Alles wird ausschließlich im lokalen Speicher deines Browsers abgelegt; es gibt kein Konto, kein Backend, nichts wird irgendwohin übertragen." },
        { q: "Warum gibt es dieses Tool nur auf Englisch und Deutsch?", a: "Countdown Studio ist eines der früheren, einfacheren Tools in dieser Sammlung und wurde von Anfang an zweisprachig (EN/DE) gebaut. Andere, später entstandene Tools auf dieser Seite nutzen stattdessen ein dreisprachiges (ZH/EN/DE) Konzept." }
      ]
    }
  };

  let currentLang = localStorage.getItem(LANG_KEY) || "en";

  function t(key) {
    return i18n[currentLang][key] || i18n.en[key] || key;
  }

  const faqListEl = document.getElementById("faqList");
  function renderFAQ() {
    if (!faqListEl) return;
    const faq = (i18n[currentLang] && i18n[currentLang].faq) || [];
    faqListEl.innerHTML = "";
    faq.forEach((item) => {
      const details = document.createElement("details");
      details.className = "faq-item";
      const summary = document.createElement("summary");
      summary.innerHTML = '<span class="chev">▶</span> <span>' + item.q + "</span>";
      const body = document.createElement("div");
      body.className = "faq-a";
      body.textContent = item.a;
      details.appendChild(summary);
      details.appendChild(body);
      faqListEl.appendChild(details);
    });
  }

  function applyLanguage() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    renderFAQ();
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
