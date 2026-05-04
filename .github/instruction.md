# INSTRUCTION.md — Serene Sleep (舒眠助手)

## Project Overview

A mobile-first sleep tracking PWA for elderly users. The app uses a charming cat theme, Traditional Chinese UI, high-contrast dark visuals, and large touch targets. All data is persisted in `localStorage` — no backend or database.

---

## Tech Stack

| Layer            | Library / Tool                                        |
| ---------------- | ----------------------------------------------------- |
| Framework        | Vue 3 (Composition API + `<script setup>`)            |
| Routing          | vue-router 4                                          |
| State Management | Pinia                                                 |
| Styling          | Tailwind CSS v3 (custom theme, dark mode via `class`) |
| Icons            | Material Symbols Outlined (Google Fonts CDN)          |
| Fonts            | Public Sans + Noto Sans TC (Google Fonts CDN)         |
| Build Tool       | Vite                                                  |
| Storage          | Browser `localStorage` (via Pinia plugin)             |

---

## Project Structure

```
/
├── stitch_source/            # ⚠️ READ-ONLY prototype HTML references
│   ├── _1/                   # Settings screen (設定)
│   │   ├── screen.png
│   │   └── code.html
│   ├── _2/                   # Sleep Report screen (睡眠報告)
│   │   ├── screen.png
│   │   └── code.html
│   ├── _3/                   # Cat Tracker screen (舒眠貓助手) — Home
│   │   ├── screen.png
│   │   └── code.html
│   ├── _4/                   # Bedtime Alert screen (就寢提醒)
│   │   ├── screen.png
│   │   └── code.html
│   └── serene_sleep/
│       └── DESIGN.md         # Design tokens & system spec
│
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   ├── sleep.js          # Sleep session records
│   │   └── settings.js       # User goals & alarm config
│   ├── views/
│   │   ├── HomeView.vue      # Cat Tracker (舒眠貓助手)
│   │   ├── ReportView.vue    # Sleep Reports (睡眠報告)
│   │   ├── SettingsView.vue  # Settings (設定)
│   │   └── AlertView.vue     # Bedtime Alert (就寢提醒)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BottomNavBar.vue
│   │   │   └── TopAppBar.vue
│   │   ├── home/
│   │   │   ├── CatButton.vue
│   │   │   └── QuickActions.vue
│   │   ├── report/
│   │   │   ├── DayView.vue
│   │   │   ├── WeekView.vue
│   │   │   ├── SleepStageBar.vue
│   │   │   ├── TrendChart.vue
│   │   │   └── SessionList.vue
│   │   └── settings/
│   │       ├── TimePickerCard.vue
│   │       └── AlarmCard.vue
│   └── assets/
│       └── cat/              # Cat illustrations (SVG)
│
├── public/
│   └── favicon.ico
├── index.html
├── tailwind.config.js
├── vite.config.js
└── INSTRUCTION.md
```

> **`stitch_source/` is reference only. Never import from it or modify it.**

---

## Tailwind Configuration

Copy the design tokens from `stitch_source/serene_sleep/DESIGN.md` into `tailwind.config.js`. Key settings:

```js
// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        surface: "#17130d",
        "surface-dim": "#17130d",
        "surface-bright": "#3e3831",
        "surface-container-lowest": "#110e08",
        "surface-container-low": "#1f1b14",
        "surface-container": "#231f18",
        "surface-container-high": "#2e2922",
        "surface-container-highest": "#39342d",
        "on-surface": "#ebe1d6",
        "on-surface-variant": "#d0c5b5",
        outline: "#999081",
        "outline-variant": "#4d463a",
        primary: "#e1c386",
        "on-primary": "#402d00",
        "primary-container": "#a88d56",
        "primary-fixed": "#ffdfa0",
        "primary-fixed-dim": "#e1c386",
        secondary: "#d9c4a0",
        "on-secondary": "#3b2f15",
        "secondary-container": "#55472c",
        tertiary: "#f8b990",
        "on-tertiary": "#4d2609",
        "tertiary-container": "#bc845f",
        "tertiary-fixed": "#ffdcc7",
        "tertiary-fixed-dim": "#f8b990",
        background: "#17130d",
        "on-background": "#ebe1d6",
        error: "#ffb4ab",
        "error-container": "#93000a",
      },
      fontFamily: {
        sans: ["Public Sans", "Noto Sans TC", "sans-serif"],
        chinese: ["Noto Sans TC", "sans-serif"],
      },
      fontSize: {
        "headline-lg": ["40px", { lineHeight: "52px", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "42px", fontWeight: "600" }],
        "body-lg": ["22px", { lineHeight: "34px", fontWeight: "400" }],
        "body-md": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "label-lg": [
          "20px",
          { lineHeight: "24px", fontWeight: "600", letterSpacing: "0.02em" },
        ],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        sm: "0.25rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
      spacing: {
        "touch-target-min": "56px",
        "margin-edge": "24px",
        gutter: "16px",
        "stack-gap": "20px",
      },
    },
  },
};
```

Add `class="dark"` to `<html>` in `index.html` so dark mode is always active.

---

## Data Models

### Sleep Session

```js
// Stored as array in localStorage key: 'serene_sleep_sessions'
{
  id: string,           // crypto.randomUUID()
  startTime: string,    // ISO 8601, e.g. "2025-05-02T22:30:00"
  endTime: string,      // ISO 8601
  durationMinutes: number,
  stages: {
    deep: number,       // minutes
    light: number,      // minutes
    rem: number,        // minutes
  },
  note: string,         // optional user note
}
```

### Settings

```js
// Stored in localStorage key: 'serene_sleep_settings'
{
  targetBedtime: string,       // "HH:MM", e.g. "22:30"
  targetWakeTime: string,      // "HH:MM", e.g. "06:45"
  alarmEnabled: boolean,
  alarmMinutesBefore: number,  // e.g. 30 (minutes before targetBedtime)
}
```

### Active Session State (**persisted to localStorage**)

```js
// Stored in localStorage key: 'serene_sleep_active_session'
// Also reflected in sleepStore.activeSession
{
  isTracking: boolean,
  startTime: string | null,    // ISO 8601 when tracking started, e.g. "2025-05-02T22:30:00"
}
```

> **Critical:** This must survive app close/reopen. It is written to `localStorage` immediately on `startSleep()` and cleared on `stopSleep()`. On every app init, the store reads this key and restores tracking state if `isTracking === true`.

---

## Pinia Stores

### `stores/settings.js`

- `state`: `targetBedtime`, `targetWakeTime`, `alarmEnabled`, `alarmMinutesBefore`
- `actions`: `updateSettings(patch)`, `loadFromStorage()`, `saveToStorage()`
- Auto-persist to `localStorage` on every action via a watcher or plugin

### `stores/sleep.js`

- `state`: `sessions[]`, `activeSession`
- `getters`:
  - `lastSession` — most recent completed session
  - `sessionsThisWeek` — last 7 days of sessions
  - `weeklyAverageDuration` — average duration in minutes
  - `weeklyAverageBedtime` — average bedtime as "HH:MM"
  - `weeklyAverageWakeTime` — average wake time as "HH:MM"
- `actions`:
  - `startSleep()` — sets `activeSession = { isTracking: true, startTime: new Date().toISOString() }`, immediately calls `storage.saveActiveSession()` so the state survives app close
  - `stopSleep()` — reads `activeSession.startTime`, computes duration, creates a new session with mock stages, pushes to `sessions[]`, calls `storage.saveSessions()`, then calls `storage.clearActiveSession()` and resets `activeSession` to `{ isTracking: false, startTime: null }`
  - `resumeFromStorage()` — called on app init; reads `storage.getActiveSession()`; if `isTracking === true`, restores `activeSession` so the UI shows the in-progress state with the correct original `startTime`
  - `deleteSession(id)` — removes by id, saves
  - `updateSession(id, patch)` — edits a session, saves
  - `loadFromStorage()` / `saveToStorage()`

**Sleep stage generation:** When `stopSleep()` is called, generate plausible mock stage breakdown from actual duration (e.g., deep ≈ 25%, REM ≈ 20%, light ≈ 55%). Do not fake real biometric data.

---

## Routing

```js
// router/index.js
const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/report", name: "Report", component: ReportView },
  { path: "/settings", name: "Settings", component: SettingsView },
  { path: "/alert", name: "Alert", component: AlertView },
];
```

- `HomeView`, `ReportView`, `SettingsView` show `BottomNavBar`
- `AlertView` is full-screen with no nav bar
- `SettingsView` shows `TopAppBar` with a back button, no bottom nav

---

## Screen Specifications

> Reference `stitch_source/_*/screen.png` for visual layout and `stitch_source/_*/code.html` for markup patterns. Do **not** copy HTML verbatim — translate patterns into Vue SFCs.

### Screen A — Cat Sleep Tracker / Home (`HomeView.vue`)

**Route:** `/` | **Prototype:** `stitch_source/_3/`

The primary interaction screen.

**Layout:**

- `TopAppBar`: App title "舒眠貓助手", settings gear icon (→ `/settings`), white noise icon
- Center: Large circular `CatButton` (min 200px diameter) with cat illustration
  - **Idle state:** Cat awake illustration, label "開始睡眠", gold border
  - **Tracking state:** Cat asleep illustration, label "睡眠中... 點擊結束", pulsing animation
- Below button: elapsed time display when tracking (HH:MM:SS live counter)
- `QuickActions` row: shortcuts to last night's stats and white noise toggle
- `BottomNavBar`

**Behaviour:**

- Tap `CatButton` → `sleepStore.startSleep()` → switch to tracking state
- Tap again → `sleepStore.stopSleep()` → navigate to `/report` (day view of the just-completed session)
- If `alarmEnabled` in settings: schedule a `setTimeout` for the alarm time; navigate to `/alert` when it fires
- **On mount:** call `sleepStore.resumeFromStorage()` result is already done at app init — `HomeView` simply reads `sleepStore.activeSession.isTracking` to determine which UI state to render

**Elapsed timer behaviour (supports resume after app close):**

The live HH:MM:SS counter must be derived from `activeSession.startTime`, not a local counter variable. This ensures the displayed time is accurate even if the user closed and reopened the app mid-session:

```js
// In HomeView.vue or CatButton.vue
const elapsed = computed(() => {
  if (!sleepStore.activeSession.isTracking) return null;
  return Date.now() - new Date(sleepStore.activeSession.startTime).getTime();
});

// Tick every second with setInterval, but only to trigger reactivity — the value
// itself is always derived from startTime, never incremented manually.
```

**Accessibility:** Button must be at least 200×200px with clear state labels. Use `aria-label` and `role="button"`.

---

### Screen B — Sleep Reports (`ReportView.vue`)

**Route:** `/report` | **Prototype:** `stitch_source/_2/`

**Layout:**

- `TopAppBar`: Title "睡眠報告"
- Tab switcher: "今日" / "本週" (large, min 56px height tabs)
- **Day View (`DayView.vue`):**
  - Three stat cards: 總睡眠時數, 就寢時間, 起床時間 (use `headline-lg` size)
  - `SleepStageBar`: Horizontal stacked bar — Deep (gold), Light (bronze), REM (sienna)
  - Stage legend with durations in minutes
- **Week View (`WeekView.vue`):**
  - Three `TrendChart` components (SVG bar/line charts, no external chart library required):
    1. 平均睡眠時數 — with target line
    2. 平均就寢時間 — with target line
    3. 平均起床時間 — with target line
  - Each chart shows a positive feedback message when close to goal (within 15 min): e.g., "只差 15 分鐘就達標！"
- `SessionList`: Scrollable list of recent sessions
  - Each row: date, duration, edit (✏️) and delete (🗑️) actions
  - Min row height 64px
  - Edit opens an inline form or modal to adjust startTime / endTime
- `BottomNavBar`

---

### Screen C — Settings (`SettingsView.vue`)

**Route:** `/settings` | **Prototype:** `stitch_source/_1/`

**Layout:**

- `TopAppBar`: Back button (←), title "設定" — **no bottom nav**
- `TimePickerCard` for 目標就寢時間: displays current value, "變更" button opens a native `<input type="time">` or custom wheel picker
- `TimePickerCard` for 目標起床時間: same pattern
- `AlarmCard`: Toggle switch (oversized) to enable/disable alarm, number input for "提前幾分鐘提醒" (minutes before)
- All changes call `settingsStore.updateSettings()` and auto-save

**Accessibility:** All inputs min 56px tall. Toggle must have visible ON/OFF text label alongside the switch.

---

### Screen D — Bedtime Alert (`AlertView.vue`)

**Route:** `/alert` | **Prototype:** `stitch_source/_4/`

Full-screen overlay. No nav bars.

**Layout:**

- Full dark background
- Large cat illustration (sleepy/yawning)
- Headline: "就寢時間到了！" (`headline-lg`)
- Subtext: target bedtime
- Two large buttons (min 64px height, full width):
  - "稍後提醒" (Snooze) — re-triggers alarm after 10 minutes, returns to Home
  - "知道了，去睡" (Stop) — dismisses alert, navigates to Home
- Optional: ambient animation (gentle glow pulse)

---

## Layout Components

### `BottomNavBar.vue`

Three tabs with icon + Chinese text label. Active tab: gold color + thick top border.

| Tab  | Icon        | Route       |
| ---- | ----------- | ----------- |
| 追蹤 | `bedtime`   | `/`         |
| 報告 | `bar_chart` | `/report`   |
| 設定 | `settings`  | `/settings` |

Min height 64px. Each tab touch target min 56px wide.

### `TopAppBar.vue`

Props: `title`, `showBack` (bool), `actions` (slot). Fixed to top, `z-50`. Background `#05070A`, bottom border accent.

---

## localStorage Strategy

Use a simple read/write wrapper. Do **not** use a Pinia persistence plugin — implement manually to keep it transparent:

```js
// utils/storage.js
const KEYS = {
  sessions: "serene_sleep_sessions",
  settings: "serene_sleep_settings",
  activeSession: "serene_sleep_active_session", // ← persisted tracking state
};

export const storage = {
  getSessions: () => JSON.parse(localStorage.getItem(KEYS.sessions) || "[]"),
  saveSessions: (data) =>
    localStorage.setItem(KEYS.sessions, JSON.stringify(data)),
  getSettings: () => JSON.parse(localStorage.getItem(KEYS.settings) || "null"),
  saveSettings: (data) =>
    localStorage.setItem(KEYS.settings, JSON.stringify(data)),
  getActiveSession: () =>
    JSON.parse(localStorage.getItem(KEYS.activeSession) || "null"),
  saveActiveSession: (data) =>
    localStorage.setItem(KEYS.activeSession, JSON.stringify(data)),
  clearActiveSession: () => localStorage.removeItem(KEYS.activeSession),
};
```

Load from storage in each store's `$onAction` or inside `loadFromStorage()` called on app init (`main.js`).

**App init sequence in `main.js`:**

```js
const app = createApp(App);
app.use(pinia);
app.use(router);

// Restore all persisted state before mounting
const sleepStore = useSleepStore();
const settingsStore = useSettingsStore();

settingsStore.loadFromStorage();
sleepStore.loadFromStorage();
sleepStore.resumeFromStorage(); // ← restores in-progress session if app was closed mid-tracking

app.mount("#app");
```

---

## Alarm Implementation

Alarms are implemented with `setTimeout` (no Service Worker needed for MVP). The alarm is scheduled when:

1. The app is opened (on mount of `HomeView`)
2. Settings are saved

```js
// Pseudocode in HomeView or a composable useAlarm()
function scheduleAlarm() {
  const { targetBedtime, alarmEnabled, alarmMinutesBefore } = settingsStore;
  if (!alarmEnabled) return;

  const [h, m] = targetBedtime.split(":").map(Number);
  const alarmTime = new Date();
  alarmTime.setHours(h, m - alarmMinutesBefore, 0, 0);
  if (alarmTime < new Date()) alarmTime.setDate(alarmTime.getDate() + 1);

  const delay = alarmTime - Date.now();
  setTimeout(() => router.push("/alert"), delay);
}
```

> **Limitation:** `setTimeout` does not persist across app restarts. If the user closes and reopens the app, the alarm is rescheduled from `App.vue` or `main.js` on mount — so as long as the user reopens the app before the alarm time, it will still fire. If the app is closed past the alarm time, no alert is shown for that night (acceptable for MVP). Add a clear comment in the code noting this constraint for future Service Worker upgrade.

---

## Accessibility Requirements

These are non-negotiable given the elderly target audience:

- All interactive elements: min touch target `56px × 56px`
- All body text: min `18px`
- All buttons include both icon AND text label
- Contrast ratio ≥ 4.5:1 for all text (WCAG AA)
- `lang="zh-TW"` on `<html>`
- `aria-label` on icon-only buttons
- Avoid relying on color alone for state (use icons + text redundantly)
- Never use font weight below 400

---

## Visual & UX Guidelines

- **Dark mode always on.** Add `class="dark"` to `<html>` in `index.html`.
- **No light mode toggle** — not needed for this audience.
- **Language:** All UI strings in Traditional Chinese (zh-TW). Use UTF-8.
- **Cat theme:** Cat illustrations appear on the Home screen (CatButton) and Alert screen. Use SVG illustrations — keep them simple, warm, and non-cartoonish.
- **Positive language:** Use encouraging phrasing (e.g., "你做得很好！", "只差一點點就達標！").
- **Avoid:** Loading spinners on simple actions, complex multi-step flows, small icons without labels, light text on medium backgrounds.

---

## Development Notes

- Run dev server: `npm run dev`
- The app is mobile-first. Use a `390px` wide viewport in devtools.
- Prototype screens in `stitch_source/` open directly in a browser for visual reference.
- When in doubt about layout, open `stitch_source/_*/screen.png` — it is the source of truth for visual design.
- All new components should go in `src/components/` organized by feature folder.
- Use `<script setup>` syntax throughout — no Options API.
