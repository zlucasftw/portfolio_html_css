# Limitations

Known limitations of the site, why they exist and what would remove them.
Each one follows from a decision in [`DECISIONS.md`](DECISIONS.md).

| Limitation | Why | Way out |
| --- | --- | --- |
| The header and footer markup is repeated in every page, so a change has to be made in each file. | There is no build step and no JavaScript includes (ADR-0001, ADR-0007). | A static site generator or build step with partials. |
| The technology list appears both on the home page and on `tech_stack.html`. | Content lives in the HTML (ADR-0008). | Same as above. |
| JavaScript classes are global names, and the order of `<script>` tags matters. | Classic scripts keep `file://` working (ADR-0006). | ES modules served from a local server. |
| No minification or bundling. | No build step (ADR-0001). | A build step. At this size, the gain is small. |
| Images are optimized by hand before they are committed. | No build step or image pipeline (ADR-0012). | An image pipeline in a build step. |
| The contact form depends on Formspree and its free-plan limits, and visitors land on Formspree's confirmation page after sending. | It's a static site with no server (ADR-0011). | `fetch` submission with an inline message, or a different provider. |
| The contact form and web fonts need a network connection, even when the site is opened from disk. | They are external services. | Self-hosted fonts. A form cannot work without a server of some kind. |
| The site is only available in Portuguese. | ADR-0003. | An English version or bilingual pages. |
| GitHub Pages does not allow custom HTTP headers (for example a Content-Security-Policy header). | Hosting choice. | A `<meta http-equiv>` CSP for part of the policy, or a host that supports headers. |
| There is no automated test suite in the repository. | It is a static site with very little logic. Pages are checked in a headless browser at mobile, tablet and desktop widths before each merge. | Add the browser checks to the repository and run them in CI. |
