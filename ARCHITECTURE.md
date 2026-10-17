# Architecture

A static, multi-page site that is served as-is by GitHub Pages. There is no build step: what is in the repository is what the browser receives.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Intro, project carousel and technology section |
| `bio.html` | Biography and photo |
| `projects.html` | One entry per project, with poster, description and repository link |
| `contact.html` | Contact form (Formspree) |
| `tech_stack.html` | Full technology list by category *(planned, ADR-0010)* |

Every page shares the same header (wordmark and navigation) and footer (social links and copyright). These are repeated in each file by design (ADR-0007).

## Layers

```
HTML  →  content and structure (all text, projects and technologies live here)
CSS   →  presentation, one file per component or page
JS    →  behavior only, one class per behavior, added on top of existing markup
```

With JavaScript disabled, all content remains visible and every link still works (ADR-0008).

## Target layout

The repository is moving to this layout one pull request at a time. `CHANGELOG.md` records each step.

```
css/
  base.css              reset, design tokens (colors, fonts, spacing) as custom properties
  header.css            wordmark, navigation, mobile menu
  footer.css            social links, copyright
  home.css              intro section
  project-carousel.css  project cards and carousel
  tech-carousel.css     categorized technology carousel
  bio.css, projects.css, contact.css, tech-stack.css   page-specific styles
js/
  navigation-menu.js    NavigationMenu: opens and closes the mobile menu, keeps aria-expanded in sync
  project-carousel.js   ProjectCarousel: previous/next over a scroll-snap track
  tech-carousel.js      TechCarousel: switches technology categories (buttons and arrow keys)
  scroll-reveal.js      ScrollReveal: fades sections in when they enter the viewport
  main.js               creates each class only if its element exists on the page; sets the footer year
assets/
  img/                  photos and project posters (WebP)
  icons/                favicon and technology logos (SVG)
```

## Conventions

- **Naming:** BEM-style CSS classes (`block__element`), as already used in the project. JavaScript uses descriptive camelCase names and PascalCase class names. HTML hooks for JavaScript use `data-*` attributes, so styling and behavior stay independent.
- **Styling:** colors, fonts and spacing are defined once in `base.css` as custom properties and reused everywhere.
- **Scripts:** loaded at the end of each page with `defer`, in dependency order, with `main.js` last (ADR-0006).
- **Comments:** used only where the reason behind the code is not obvious from the code itself.
- **Formatting:** defined in `.editorconfig`.
