# Decisions

Architecture and process decisions for this project, recorded as lightweight ADRs
(Architecture Decision Records). Each record keeps the alternatives that were not
chosen: they are not rejected forever, only deferred, and are the natural next steps
if the chosen option stops being enough.

Status values: **Accepted** (agreed, may still be in progress), **Superseded by ADR-XXXX**.

| ADR | Title | Status |
| --- | --- | --- |
| [0001](#adr-0001-plain-html-css-and-javascript) | Plain HTML, CSS and JavaScript | Accepted |
| [0002](#adr-0002-keep-the-multi-page-structure) | Keep the multi-page structure | Accepted |
| [0003](#adr-0003-content-in-portuguese-documentation-in-english) | Content in Portuguese, documentation in English | Accepted |
| [0004](#adr-0004-git-flow-with-a-dev-branch) | Git Flow with a `dev` branch | Accepted |
| [0005](#adr-0005-conventional-commits-keep-a-changelog-and-semver) | Conventional Commits, Keep a Changelog and SemVer | Accepted |
| [0006](#adr-0006-one-class-per-behavior-loaded-as-classic-scripts) | One class per behavior, loaded as classic scripts | Accepted |
| [0007](#adr-0007-repeat-the-header-and-footer-in-every-page) | Repeat the header and footer in every page | Accepted |
| [0008](#adr-0008-content-lives-in-the-html) | Content lives in the HTML | Accepted |
| [0009](#adr-0009-show-the-original-eight-projects) | Show the original eight projects | Accepted |
| [0010](#adr-0010-categorized-technology-carousel-and-a-technology-page) | Categorized technology carousel and a technology page | Accepted |
| [0011](#adr-0011-contact-form-through-formspree) | Contact form through Formspree | Accepted |
| [0012](#adr-0012-serve-images-as-webp) | Serve images as WebP | Accepted |
| [0013](#adr-0013-mit-license-for-the-code) | MIT license for the code | Accepted |
| [0014](#adr-0014-public-contact-channels) | Public contact channels | Accepted |
| [0015](#adr-0015-accessibility-and-motion-baseline) | Accessibility and motion baseline | Accepted |
| [0016](#adr-0016-repository-documentation-set) | Repository documentation set | Accepted |

---

## ADR-0001: Plain HTML, CSS and JavaScript

- **Date:** 2026-10-17
- **Status:** Accepted

**Context.** The site is a small personal portfolio of five pages that is hosted on GitHub Pages. It has no content that changes at runtime.

**Decision.** Keep the site as plain HTML, CSS and JavaScript, with no framework, library, package manager or build step.

**Consequences.** Anyone can read, run and change the site by opening a file in a browser. Optimizations a build would provide, such as minification, partials and image pipelines, are done by hand or left out (see `LIMITATIONS.md`).

**Alternatives (deferred).** A static site generator for shared partials. A framework such as React or Next.js, which the README already lists as a possible evolution.

## ADR-0002: Keep the multi-page structure

- **Date:** 2026-10-17
- **Status:** Accepted

**Context.** The site was designed as separate pages: home, bio, projects and contact. Its visual language comes from Silent Poets, where a quiet home page opens onto dedicated sections.

**Decision.** Keep the multi-page structure and add a fifth page, `tech_stack.html`, for the full technology list that the home page already links to.

**Consequences.** Each page stays short and focused. Shared parts such as the header and footer repeat in every page (see ADR-0007).

**Alternatives (deferred).** A single long page with anchor navigation. A hybrid where the home page shows short teaser sections that link to each page.

## ADR-0003: Content in Portuguese, documentation in English

- **Date:** 2026-10-17
- **Status:** Accepted

**Decision.** Site content stays in Brazilian Portuguese (`lang="pt-BR"`), as originally written. Repository documentation and commit messages are in English, and the README opens with a short Portuguese summary.

**Alternatives (deferred).** An English version of the site. A bilingual site with a language switch, which would double the content to maintain.

## ADR-0004: Git Flow with a `dev` branch

- **Date:** 2026-10-17
- **Status:** Accepted

**Context.** GitHub Pages publishes `main`, so every commit on `main` goes live.

**Decision.** Use Git Flow. `main` holds published releases and `dev` integrates finished work. Work happens on short-lived topic branches named after their purpose (`feature/*`, `fix/*`, `refactor/*`, `perf/*`, `docs/*`, `chore/*`), each merged into `dev` through a reviewed pull request. Releases go from `release/x.y.z` into `main` and are tagged. Urgent fixes to the live site use `hotfix/*`.

**Consequences.** The live site only changes on a release. Each pull request covers a single concern, which keeps reviews small.

**Alternatives (deferred).** Committing straight to `main`. Trunk-based development with short-lived branches into `main`.

## ADR-0005: Conventional Commits, Keep a Changelog and SemVer

- **Date:** 2026-10-17
- **Status:** Accepted

**Decision.** Commits are atomic and follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (`type(scope): subject`, imperative mood, a subject of 72 characters or fewer, and a body explaining *why* when that isn't obvious). `CHANGELOG.md` follows Keep a Changelog. Versions follow SemVer. The site as published in August 2025 is recorded as `0.1.0`, and the first complete version will be `1.0.0`.

**Alternatives (deferred).** The earlier free-form prefixes (`add:`, `update:`). A changelog generated automatically from commits.

## ADR-0006: One class per behavior, loaded as classic scripts

- **Date:** 2026-10-17
- **Status:** Accepted

**Context.** The original `script.js` mixed the menu, the carousel and mobile layout fixes in global functions, and much of it was commented-out code.

**Decision.** Each interactive behavior gets its own small class in its own file under `js/`, such as `NavigationMenu` and `ProjectCarousel`. Each class has a single responsibility, with no inheritance and no shared base classes. `js/main.js` creates each class only when its element exists on the page. The files are loaded with `<script defer>` rather than as ES modules, so the site keeps working when opened straight from disk (`file://`).

**Consequences.** The classes are global names, and script order in the HTML matters (see `LIMITATIONS.md`).

**Alternatives (deferred).** ES modules with `import`/`export`, which need a local server during development.

## ADR-0007: Repeat the header and footer in every page

- **Date:** 2026-10-17
- **Status:** Accepted

**Context.** Without a build step, HTML cannot include shared fragments.

**Decision.** Each page contains its own copy of the header and footer markup, and the copies are kept identical.

**Consequences.** The site works without JavaScript and search engines see complete pages. A change to the header or footer must be repeated in every page. This trade of DRY for KISS is deliberate and is listed in `LIMITATIONS.md`.

**Alternatives (deferred).** Injecting the shared fragments with JavaScript. Introducing a build step or static site generator (see ADR-0001).

## ADR-0008: Content lives in the HTML

- **Date:** 2026-10-17
- **Status:** Accepted

**Decision.** Projects, technologies and text are written in the HTML, not generated from JavaScript data. JavaScript only adds behavior to markup that already exists (progressive enhancement).

**Consequences.** With JavaScript disabled, every project and technology is still visible and every link still works.

## ADR-0009: Show the original eight projects

- **Date:** 2026-10-17
- **Status:** Accepted

**Decision.** Keep the eight projects already on the site (Plann.er, Nearby, Imagine, URL Shortener, Freelance Hours, Portfolio — The Dude, DevStage and NLW Agents). Fix their links, images and descriptions, and give each a complete entry on `projects.html`.

**Alternatives (deferred).** Adding newer projects such as Terminal Quest RPG and AlgaDelivery. A curated list ordered by relevance.

## ADR-0010: Categorized technology carousel and a technology page

- **Date:** 2026-10-17
- **Status:** Accepted

**Context.** The home page showed eight logos in an auto-scrolling marquee, and its "Saiba mais" link pointed to a page that didn't exist.

**Decision.** Replace the marquee with a carousel grouped by category (languages, backend, frontend and mobile, databases, cloud and DevOps, APIs and testing). It is operated by buttons and arrow keys, with no automatic movement. Add `tech_stack.html` with the full list.

**Alternatives (deferred).** Auto-advance that pauses on hover or focus. Swipe gestures. Keeping the marquee.

## ADR-0011: Contact form through Formspree

- **Date:** 2026-10-17
- **Status:** Accepted

**Decision.** Keep the existing Formspree endpoint and submit with a native HTML `POST`, with no JavaScript required.

**Consequences.** After sending, the visitor sees Formspree's confirmation page. The form depends on a third-party service (see `LIMITATIONS.md`).

**Alternatives (deferred).** Submitting with `fetch` and showing the result inline. Replacing the form with direct contact links.

## ADR-0012: Serve images as WebP

- **Date:** 2026-10-17
- **Status:** Accepted

**Context.** The project images were PNG files of up to 3.6 MB each, about 14 MB in total. They were the main cause of slow loading.

**Decision.** Resize the images to the largest size the layout uses and convert them to WebP. Declare their dimensions and lazy-load the ones below the fold. The originals remain in the Git history.

**Alternatives (deferred).** Recompressing PNG/JPEG at a smaller size. Using `<picture>` with AVIF and fallbacks.

## ADR-0013: MIT license for the code

- **Date:** 2026-10-17
- **Status:** Accepted

**Context.** The repository is MIT licensed, but the footer said "todos os direitos reservados" (all rights reserved), which contradicts it.

**Decision.** Keep the MIT license and change the footer to "© {year} Lucas Góis", with the year set automatically.

**Alternatives (deferred).** All rights reserved. MIT for the code with personal content (photo, texts, project images) reserved.

## ADR-0014: Public contact channels

- **Date:** 2026-10-17
- **Status:** Accepted

**Decision.** The public channels are `contact@lucasgois.me`, LinkedIn, GitHub and Credly, the same as the GitHub profile.

## ADR-0015: Accessibility and motion baseline

- **Date:** 2026-10-17
- **Status:** Accepted

**Decision.** Every page has:

- one `<h1>`, landmarks and a skip link;
- visible keyboard focus and a menu that reports its state (`aria-expanded`) and closes with Escape;
- a meta description and Open Graph tags.

Entrance animations and scroll reveals are subtle, and they are switched off when the visitor prefers reduced motion.

**Alternatives (deferred).** Richer motion. Dark/light theme switching.

## ADR-0016: Repository documentation set

- **Date:** 2026-10-17
- **Status:** Accepted

**Decision.** The repository carries `README.md`, `LICENSE`, `CHANGELOG.md`, `DECISIONS.md`, `LIMITATIONS.md`, `ARCHITECTURE.md`, `.editorconfig` and `.gitignore`. That is enough to explain what the project is, why it is built this way, how it is organized and what it does not do.

**Alternatives (deferred).** A pull request template. Community files such as `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md` and `SECURITY.md`, which matter more for projects with outside contributors.
