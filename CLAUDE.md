# CLAUDE.md — iDigLabs site

Context for Claude Code working in this repo.

## What this is

The iDigLabs storefront. Static HTML, no build step, no framework, no
dependencies. Deployed to Netlify from the `main` branch of GitHub.
Pushing to `main` deploys. There is nothing to compile.

## Architecture

```
index.html          LIVE — the free Old School rack. This is the whole site.
404.html            Branded error page
netlify.toml        Redirects, headers, staged-page notes
robots.txt          Blocks /_staged/ from crawlers
assets/site.css     All styling. CSS variables at the top.
assets/site.js      All data and all behaviour.

_staged/            NOT LIVE. Finished pages held back for staggered launch.
  home-full.html      The original four-department storefront homepage
  instruments.html    7 synths + Discovery Series bundle
  plugins.html        4 processors
  software.html       3 macOS apps
```

Every page is hand-written HTML sharing `assets/site.css` and
`assets/site.js`. Pages differ only in their masthead, intro copy, spec
table, and which render function they call at the bottom.

## Launch strategy — read before adding pages

The site is deliberately ONE page. Old School is a free ten-plugin
giveaway; the paid catalogue is released a product at a time so each drop
is its own announcement. Do not restore the department nav or link the
staged pages unless explicitly asked.

**To launch a department:**

1. `git mv _staged/instruments.html .`
2. Add its nav link back to `index.html` (a `.seg` nav block — see
   `_staged/home-full.html` for the markup)
3. Remove that page's note from `netlify.toml`
4. Add its URL to `sitemap.xml`
5. Confirm every `PRODUCTS[].url` on that page is a real Lemon Squeezy
   checkout link, not `"#"`

The staged pages are finished and current. They render correctly the
moment they are moved back.

## The one rule

**Product content lives in `assets/site.js`, not in the HTML.** The
`PRODUCTS`, `FAMILIES`, and `OLDSCHOOL` arrays at the top of that file
are the single source of truth. Renderers build the DOM from them. Never
hard-code a product name, price, or description into an HTML file.

### Adding a product

Append one object to `PRODUCTS`:

```js
{ group:"plugins", ref:"IDL-105", name:"Anvil", art:"chain", status:"new",
  kind:"compressor · feedback topology", price:49,
  url:"https://idiglabs.lemonsqueezy.com/checkout/buy/UUID",
  copy:"One paragraph. <b>Bold</b> is allowed. No other tags." }
```

- `group` — `"instruments"` | `"plugins"` | `"software"`. Decides the page.
- `status` — `""` | `"new"` | `"soon"` | `"free"`. Controls the plate stamp
  and the button. `"soon"` renders a dead "Notify me"; `"free"` renders
  "Claim free →" and prints `Free` instead of a price.
- `art` — a key in the `ART` object. Reuse an existing motif unless a new
  drawing is genuinely warranted.
- `family` — optional; must match a `FAMILIES[].id`. Adds the bundle band
  to the plate.

Removing a product means deleting its object. Nothing else references it.

### Bundle pricing is computed

`FAMILIES[].members` is a list of `PRODUCTS[].name` strings. The
"separately" total and the savings figure are summed at render time.
Change a member price and the bundle math follows. Do not hard-code totals.

### The Old School rack

`OLDSCHOOL` drives ten generated front panels on `oldschool.html`. Each
entry's `knobs` count and `meter` type (`"vu"` | `"curve"` | `null`) change
the drawing. The panels are drawn by `rackFace()` — they are not images.

## Design system

Do not introduce new colours, fonts, or spacing values. Everything comes
from the CSS variables at the top of `site.css`:

- Paper `#F0EBE1`, panel `#FAF7F0`, ink `#211E1A`, spot `#B0663F`
- IBM Plex Sans for UI, IBM Plex Mono for values and reference numbers
- Uppercase letterspaced labels are `.lbl`; monospace refs are `.ref`

The site mirrors the BRICK plugin UI: cream stock, black ink linework,
schematic drawings, black knobs with white pointers, black band at the
bottom. It reads as an engineering datasheet, deliberately. Reject
changes that make it look like a generic dark-mode plugin site.

**No stock photography. No icon fonts. No CSS frameworks.** All artwork is
inline SVG drawn in `site.js` or in the page.

## Constraints

- No build step. Do not add npm, bundlers, or a static site generator.
- No external JS beyond `lemon.js` (Lemon Squeezy checkout) and Google Fonts.
- No `localStorage` or cookies.
- The YouTube embed is a click-to-load facade in `mountVideo()` — keep it
  that way; do not replace it with a bare iframe.
- Every checkout link gets `data-ls`. `wireCheckout()` appends `?embed=1`
  and the `lemonsqueezy-button` class automatically at runtime.

## Deploying

```bash
git add .
git commit -m "what changed"
git push
```

Netlify rebuilds in ~15 seconds. For anything risky, push a branch instead
and use the Netlify deploy preview URL before merging.

## Known open items

- The ten `OLDSCHOOL[].kind` one-liners are placeholders and need rewriting.
  These are the only words describing each plugin on the live page.
- All `PRODUCTS[].url` values are still `"#"`. Each staged page needs real
  Lemon Squeezy checkout URLs before it can be moved out of `_staged/`.
- BRICK appears at $49 in `PRODUCTS` and is also OS-01 in the free Old
  School rack. Not visible while `plugins.html` is staged, but it must be
  resolved before that page launches.
- Discovery Series price ($99) is provisional.

## Deploying right now

The GitHub account is flagged and cannot authorise third-party OAuth, so
Netlify is NOT watching the repo. `git push` does not deploy. Publish with:

```bash
netlify deploy --prod
```

Keep committing and pushing to git regardless — the history matters. Once
GitHub lifts the flag, link the repo in Netlify (Site settings → Build &
deploy) and `git push` alone will deploy.
