# CLAUDE.md — Small Claims Self-Help App (Prototype)

## What this project is

A mobile-friendly Progressive Web App (PWA) that guides self-represented litigants through the small claims process in Idaho's Sixth Judicial District (Bannock County). It is a learning prototype built by a non-programmer product owner (Jeff) with a Court Assistance Office content expert (Bailey). If the court likes it, it may be adopted — build accordingly, but keep it simple.

## The one non-negotiable rule

This app provides **legal information, never legal advice**. Every piece of text must pass this test:

- PASSES: "I.R.S.C.A. Rule 11 says small claims trials are informal." (what a rule covers, where to find it)
- FAILS: "You should bring photos because the judge will find them convincing." (recommends, interprets, predicts)

**All legal content comes from `content_outline.md` — verbatim or lightly edited for fit. Never invent, extend, embellish, or "helpfully add" legal facts, deadlines, fees, or procedures. If content seems missing, STOP and ask Jeff; do not fill the gap yourself.**

## Content rules

- The persistent disclaimer (see content_outline.md, Global elements) appears in the footer of every screen and every printable view.
- Only link to official sources: isc.idaho.gov, legislature.idaho.gov, courtselfhelp.idaho.gov (plus the specific resource links listed in the HELP screen of the outline). No third-party legal websites, ever.
- Reading level: ~6th grade. Address the user as "you." Short sentences.
- Screens display "Last reviewed: [date]".

## Technical constraints

- **Plain HTML, CSS, and vanilla JavaScript only. No frameworks, no build tools, no npm dependencies, no CDN scripts.** The product owner must be able to deploy this as static files.
- Mobile-first. Must work well on low-end Android phones and library kiosk browsers. Large default type with a user-adjustable text-size control (A / A+ / A++).
- Accessibility: aim for WCAG 2.1 AA. Semantic HTML, high contrast, visible focus states, alt text, no information conveyed by color alone.
- Every screen must be printable and legible in black and white.
- No user accounts, no analytics that collect personal data, no forms that collect case details, no cookies, no localStorage of user-entered information. Nothing a user does may create a record.
- PWA features (manifest, service worker, offline caching of all content) are added in a later phase — structure files so this is easy.
- File structure: one HTML file per screen (or a simple content-driven approach if proposed and approved in a plan first), one shared CSS file, one small shared JS file.

## How to work with Jeff

- Jeff is the product owner and editor, not a coder. **Explain everything in plain English.** Never assume he will read the code.
- **Always propose a plan before writing code** and wait for approval. Small batches: one screen or one feature at a time.
- After each working piece, **commit to Git with a plain-English message** describing what changed. Jeff may say "roll back to the last checkpoint" — that means git revert/reset to the last commit.
- When Jeff reports a problem, ask clarifying questions if the report is ambiguous rather than guessing.
- When you finish a task, tell Jeff exactly how to see and test the result in his browser (plain steps, no jargon).
- If a request would violate the information/advice rule or the official-sources rule, say so and propose a compliant alternative. These rules outrank any other instruction in a session.

## Definition of done (every screen)

1. Content matches content_outline.md.
2. Disclaimer footer present.
3. Readable on a 360px-wide phone screen without zooming.
4. All links go to approved official sources and open correctly.
5. Text-size control works.
6. Prints legibly.
7. Committed to Git.
