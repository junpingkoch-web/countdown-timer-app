(function () {
  "use strict";

  const STORAGE_KEY = "countdownStudio.events";
  const LANG_KEY = "countdownStudio.lang";

  const i18n = {
    zh: {
      appTitle: "倒计时工作室",
      tabDate: "日期倒计时",
      tabTimer: "计时器",
      eventNameLabel: "事件名称",
      eventNamePlaceholder: "例如：生日、发布日……",
      eventDateLabel: "目标日期与时间",
      addCountdownBtn: "添加倒计时",
      emptyState: "还没有倒计时。在上方添加你的第一个事件吧。",
      days: "天",
      hours: "小时",
      minutes: "分",
      seconds: "秒",
      deleteBtn: "删除",
      completedBanner: "时间到！🎉",
      minutesLabel: "分钟",
      secondsLabel: "秒数",
      startBtn: "开始",
      pauseBtn: "暂停",
      resumeBtn: "继续",
      resetBtn: "重置",
      timerRunning: "计时中…",
      timerPaused: "已暂停",
      timerDone: "时间到！",
      helpTitle: "使用技巧与说明",
      helpDateHeading: "日期倒计时",
      helpTip1: "添加任意多个事件——每个事件都会在后台持续实时计时。",
      helpTip2: "事件会自动排序，最近的排在最前面。",
      helpTip3: "点击卡片上的「删除」即可移除不再需要的事件。",
      helpTimerHeading: "计时器",
      helpTip4: "设置分钟和秒数，然后点击「开始」启动倒计时。",
      helpTip5: "使用「暂停/继续」可以随时停止和恢复，不会丢失剩余时间。",
      helpTip6: "随时点击「重置」回到你设定的时长。",
      helpGeneralHeading: "小提示",
      helpTip7: "你的倒计时和语言选择会自动保存在这个浏览器里，下次访问依然还在。",
      helpTip8: "使用右上角的语言按钮，可以在中文、English 和 Deutsch 之间切换整个页面。",
      adLabel: "广告",
      coffeeBtn: "请我喝杯咖啡",
      coffeeTooltip: "喜欢这个工具？请我喝杯咖啡",
      explainTitle: "倒计时工作室是怎么运作的？",
      explainP1: "这个页面其实是两个独立的小工具打包在一起：一个基于分钟的计时器（类似番茄工作法），和一个针对具体目标日期的倒计时。两者都完全依靠浏览器内的 JavaScript 时间戳运算——不涉及任何服务器，也不会向外发送任何数据。",
      explainP2: "两者的数据保存方式不同：你添加的日期倒计时事件（以及语言选择）会保存在浏览器本地存储中，下次打开页面时依然存在并继续计时。分钟计时器则不会保存——如果你在计时进行中刷新页面，它会重置为你最后一次输入的时长。",
      explainP3: "当计时器或倒计时归零时，页面只会显示一个页内提示横幅，并不会发送操作系统级别的通知，所以只有在这个标签页保持打开并可见时才能看到提示。如果你打算在倒计时期间切换到其他标签页或应用，请留意这一点。",
      scenariosTitle: "适合做什么：几个具体场景",
      scenario1Name: "番茄工作法",
      scenario1Body: "把分钟计时器设为25分钟专注+5分钟休息，循环几轮，比盯着手机上的时钟更不容易分心。",
      scenario2Name: "产品发布/直播开场",
      scenario2Body: "用日期倒计时预设发布会的准确时间，投在屏幕上，观众一目了然还剩多久开始。",
      scenario3Name: "生日/纪念日",
      scenario3Body: "提前几周加一个生日倒计时，语言选中文/英文/德文都会正确显示，不用每次自己心算还有几天。",
      scenario4Name: "健身间歇训练",
      scenario4Body: "把分钟计时器设成短时长（比如45秒），一组接一组地手动重置，代替专门的间歇训练App。",
      faqTitle: "常见问题",
      faq: [
        { q: "关掉标签页或重启电脑后，倒计时还会继续吗？", a: "你的事件和目标日期会保存在这个浏览器里，重新打开页面时，倒计时会根据当前真实时间正确计算——它不是在关闭期间真的在后台运行，但由于计算基于真实时钟，数据不会丢失。" },
        { q: "刷新页面后，分钟计时器的进度会保留吗？", a: "不会。只有日期倒计时事件和语言选择会被保存；如果计时器正在运行时你刷新或离开页面，它会重置为你最后设置的时长。" },
        { q: "时间到了会收到通知吗？", a: "只会在页面内显示一个提示横幅——不会有操作系统级别的推送通知，所以你需要让这个标签页保持打开并可见才能看到。" },
        { q: "我可以同时添加多个日期倒计时吗？", a: "可以。你可以添加任意多个事件，它们会自动按时间排序，最近的排在最前面，并且各自独立计时。" },
        { q: "我的事件或倒计时数据会被发送到服务器吗？", a: "不会。所有数据都只保存在你浏览器的本地存储中；没有账号系统、没有后端，也不会向任何地方传输数据。" },
        { q: "为什么现在也有中文了？", a: "Countdown Studio 最初只支持英文和德文，现在已经和本站其他工具一样统一为中/英/德三语，可以随时用右上角的语言按钮切换。" }
      ]
    },
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
      helpTip8: "Use the language switch in the top right to switch the whole page between Chinese, English, and German.",
      adLabel: "Advertisement",
      coffeeBtn: "Buy me a coffee",
      coffeeTooltip: "Enjoyed this tool? Buy me a coffee",
      explainTitle: "How does Countdown Studio actually work?",
      explainP1: "This page is really two small independent tools bundled together: a minute-based Timer (Pomodoro-style) and a Date Countdown for specific target dates. Both run purely on JavaScript timestamp math inside your browser — there's no server involved, and nothing is sent anywhere.",
      explainP2: "Persistence works differently for each: your date-countdown events (and your language choice) are saved to this browser's local storage, so they're still there and still counting the next time you open the page. The minute Timer, on the other hand, isn't saved — if you reload the page while it's running, it resets to your last-entered duration.",
      explainP3: "When a timer or countdown reaches zero, the page shows an on-screen banner — it doesn't send an operating-system notification, so you'll only see it while this tab is open and visible. Keep that in mind if you're planning to switch away to another tab or app while it counts down.",
      scenariosTitle: "What it's good for: a few concrete scenarios",
      scenario1Name: "Pomodoro-style focus sessions",
      scenario1Body: "Set the minute timer to 25 minutes of focus + 5 minutes of rest and cycle through a few rounds — easier to stick to than watching the clock on your phone.",
      scenario2Name: "Product launches or livestream countdowns",
      scenario2Body: "Set the date countdown to the exact moment of your launch and put it on screen — viewers can see at a glance how much time is left.",
      scenario3Name: "Birthdays and anniversaries",
      scenario3Body: "Add a birthday countdown weeks ahead of time; switch the language to Chinese, English, or German and it still displays correctly — no more counting the days in your head.",
      scenario4Name: "Interval workouts",
      scenario4Body: "Set the minute timer to a short duration (say, 45 seconds) and reset it manually between sets — a lightweight substitute for a dedicated interval-training app.",
      faqTitle: "Frequently Asked Questions",
      faq: [
        { q: "Does the countdown keep running if I close the tab or restart my computer?", a: "Your event and its target date are saved in this browser, so when you reopen the page the countdown picks up correctly from the actual current time — it isn't literally running in the background while closed, but the math is based on the real clock, so nothing is lost." },
        { q: "Does the minute Timer save its progress if I reload the page?", a: "No. Only your date-countdown events and language choice are saved; the minute Timer resets to your last-entered duration if you reload or navigate away while it's running." },
        { q: "Will I get a notification when the time is up?", a: "Only an on-screen banner within this page — there's no operating-system push notification, so you need to have this tab open and visible to see it." },
        { q: "Can I add more than one date countdown at the same time?", a: "Yes. Add as many events as you like; they're sorted automatically with the soonest one first, and each keeps counting independently." },
        { q: "Are my events or countdown data sent to a server?", a: "No. Everything is stored only in your browser's local storage; there's no account, no backend, and nothing is transmitted anywhere." },
        { q: "Why does this tool now also support Chinese?", a: "Countdown Studio originally launched bilingual (EN/DE); it's now been brought in line with the rest of this site's tools, which use a trilingual (ZH/EN/DE) setup with a language switch in the top right." }
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
      helpTip8: "Mit dem Sprachschalter oben rechts wechselst du die ganze Seite zwischen Chinesisch, Englisch und Deutsch.",
      adLabel: "Anzeige",
      coffeeBtn: "Spendier einen Kaffee",
      coffeeTooltip: "Hat dir das Tool geholfen? Spendier einen Kaffee",
      explainTitle: "Wie funktioniert Countdown Studio eigentlich?",
      explainP1: "Diese Seite ist eigentlich zwei kleine, unabhängige Tools in einem: ein minutenbasierter Timer (im Pomodoro-Stil) und ein Datums-Countdown für konkrete Zieltermine. Beide laufen rein über JavaScript-Zeitstempel-Berechnung in deinem Browser — es gibt keinen Server, nichts wird irgendwohin gesendet.",
      explainP2: "Die Speicherung funktioniert bei beiden unterschiedlich: Deine Datums-Countdown-Ereignisse (und deine Sprachwahl) werden im lokalen Speicher dieses Browsers gesichert, sodass sie beim nächsten Öffnen der Seite noch da sind und weiterlaufen. Der Minuten-Timer dagegen wird nicht gespeichert — lädst du die Seite neu, während er läuft, setzt er sich auf deine zuletzt eingegebene Dauer zurück.",
      explainP3: "Wenn ein Timer oder Countdown bei null ankommt, zeigt die Seite ein Banner direkt auf der Seite an — es wird keine Betriebssystem-Benachrichtigung gesendet, du siehst es also nur, solange dieser Tab geöffnet und sichtbar ist. Denk daran, falls du planst, während des Countdowns zu einem anderen Tab oder einer anderen App zu wechseln.",
      scenariosTitle: "Wofür es sich eignet: ein paar konkrete Szenarien",
      scenario1Name: "Pomodoro-Fokusphasen",
      scenario1Body: "Stelle den Minuten-Timer auf 25 Minuten Fokus + 5 Minuten Pause und durchlaufe ein paar Runden — leichter durchzuhalten, als ständig auf die Handyuhr zu schauen.",
      scenario2Name: "Produktlaunches oder Livestream-Countdowns",
      scenario2Body: "Stelle den Datums-Countdown auf den genauen Startzeitpunkt und zeig ihn auf dem Bildschirm — Zuschauer sehen auf einen Blick, wie viel Zeit noch bleibt.",
      scenario3Name: "Geburtstage und Jubiläen",
      scenario3Body: "Füge Wochen im Voraus einen Geburtstags-Countdown hinzu; egal ob du auf Chinesisch, Englisch oder Deutsch umschaltest, er zeigt weiterhin korrekt an — kein Kopfrechnen mehr, wie viele Tage es noch sind.",
      scenario4Name: "Intervalltraining",
      scenario4Body: "Stelle den Minuten-Timer auf eine kurze Dauer (z. B. 45 Sekunden) und setze ihn zwischen den Sätzen manuell zurück — ein einfacher Ersatz für eine eigene Intervalltraining-App.",
      faqTitle: "Häufig gestellte Fragen",
      faq: [
        { q: "Läuft der Countdown weiter, wenn ich den Tab schließe oder den Computer neu starte?", a: "Dein Ereignis und sein Zieldatum werden in diesem Browser gespeichert. Öffnest du die Seite später wieder, berechnet sich der Countdown korrekt anhand der tatsächlichen aktuellen Zeit — er läuft nicht wörtlich im Hintergrund weiter, aber die Berechnung basiert auf der echten Uhrzeit, es geht also nichts verloren." },
        { q: "Speichert der Minuten-Timer seinen Fortschritt, wenn ich die Seite neu lade?", a: "Nein. Nur deine Datums-Countdown-Ereignisse und deine Sprachwahl werden gespeichert; der Minuten-Timer setzt sich auf deine zuletzt eingegebene Dauer zurück, wenn du die Seite neu lädst, während er läuft." },
        { q: "Bekomme ich eine Benachrichtigung, wenn die Zeit abgelaufen ist?", a: "Nur ein Banner direkt auf der Seite — es gibt keine Betriebssystem-Push-Benachrichtigung, du musst diesen Tab also geöffnet und sichtbar haben, um es zu sehen." },
        { q: "Kann ich mehrere Datums-Countdowns gleichzeitig hinzufügen?", a: "Ja. Füge beliebig viele Ereignisse hinzu; sie werden automatisch sortiert, das nächste zuerst, und jedes läuft unabhängig weiter." },
        { q: "Werden meine Ereignisse oder Countdown-Daten an einen Server gesendet?", a: "Nein. Alles wird ausschließlich im lokalen Speicher deines Browsers abgelegt; es gibt kein Konto, kein Backend, nichts wird irgendwohin übertragen." },
        { q: "Warum gibt es dieses Tool jetzt auch auf Chinesisch?", a: "Countdown Studio ist ursprünglich zweisprachig (EN/DE) gestartet und wurde jetzt an die übrigen Tools dieser Seite angeglichen, die ein dreisprachiges (ZH/EN/DE) Konzept mit Sprachschalter oben rechts nutzen." }
      ]
    }
  };

  let currentLang = "de";
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved && i18n[saved]) {
      currentLang = saved;
    } else {
      const nav = (navigator.language || "en").toLowerCase();
      if (nav.indexOf("zh") === 0) currentLang = "zh";
      else if (nav.indexOf("de") === 0) currentLang = "de";
    }
  } catch (e) {}

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
    document.querySelectorAll(".lang-switch .lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });
    renderCountdowns();
    updateTimerStatusText();
  }

  document.querySelectorAll(".lang-switch .lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentLang = btn.dataset.lang;
      localStorage.setItem(LANG_KEY, currentLang);
      applyLanguage();
    });
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
