# AGENTS.md

## Project

- Name: `timer_app_udemylecture`
- Stack: HTML, CSS, JavaScript (no framework, no build step)
- Entry point: `index.html`

## Current Features

- Stopwatch mode
- Countdown mode
- Lap recording
- Clock image (`clock.svg`)

## File Map

- `index.html`: UI structure and controls
- `style.css`: layout and visual styles
- `script.js`: timer state, mode switching, and event handling
- `clock.svg`: static clock illustration
- `README.md`: project documentation

## Implementation Rules

- Keep the app dependency-free.
- Use plain JavaScript (ES6+), readable variable names, and small functions.
- Preserve existing IDs and class names unless a refactor requires changes in both HTML/CSS/JS.
- Prefer ASCII text in source files to avoid encoding issues in terminal output.
- Keep UI responsive on desktop and mobile widths.

## Behavior Requirements

- `Stopwatch` and `Countdown` must be switchable in one screen.
- `Start`, `Pause`, `Reset`, and `Lap` must remain available and stable.
- Countdown completion must stop at zero and notify the user.
- Laps should be listed newest first.

## Local Run

- Open `index.html` directly in a browser.

## Git Workflow

- Check changes: `git status`
- Commit format: short imperative message, e.g. `Add lap clear button`
- Push branch: `main`
