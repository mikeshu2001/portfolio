# Mikhail Shumovsky — portfolio

[![Tests](https://github.com/mikeshu2001/portfolio/actions/workflows/tests.yml/badge.svg)](https://github.com/mikeshu2001/portfolio/actions/workflows/tests.yml)

The source for my personal portfolio: a deliberately small, hand-editable
website about my work in AI media, content systems, and digital marketing.

I use AI coding agents to help specify, test, and maintain the project, while
keeping the shipped website understandable without a framework or build step.

## What this repository demonstrates

- **Constraint-aware implementation:** plain HTML, CSS, and JavaScript by
  design; no framework or runtime dependency is needed to view the site.
- **Spec-driven changes:** behavior and project decisions are documented in
  [`docs/`](docs/), including the working process and implementation boundaries.
- **Tested browser logic:** validation and structured logging use Node's built-in
  test runner, with no test dependency to install.
- **Privacy-conscious telemetry:** the logger strips common personal fields
  before events reach a sink.
- **Maintainable structure:** CSS and JavaScript are split by responsibility,
  while the single-page content remains easy to edit directly.

## Run locally

The site has no build step. Open `index.html` directly, or serve the directory
with any static file server.

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Run the tests

Node.js 20 or newer is recommended.

```bash
npm test
```

The suite covers message-length boundaries, Unicode input, structured event
formatting, log levels, and removal of personal data from logged objects.

## Repository map

```text
index.html   Page content and semantic structure
css/         Visual system split by responsibility
js/          Small browser modules and testable utilities
tests/       Dependency-free Node test suite
docs/        Specs, architecture notes, and maintenance rules
```

For implementation details, see [`docs/structure.md`](docs/structure.md).

## Other agentic projects

- [Personal Brain Builder](https://github.com/mikeshu2001/personal-brain-builder)
  — a guided cross-project memory system with a deterministic Python control
  plane, validation, and recovery.
- [Content Factory](https://github.com/mikeshu2001/content-factory) — a
  role-based editorial workflow built from agents, skills, explicit handoffs,
  and human approval gates.

## About me

I am an editor and AI-native product builder working at the intersection of
applied AI, content operations, and digital marketing. My current editorial
work is in Russian; the code and architecture notes in this repository are
intended to be readable internationally.

- [Telegram](https://t.me/misha_davai_po_novoi)
- [GitHub](https://github.com/mikeshu2001)
