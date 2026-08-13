# CLAUDE.md — iDigLabs site

Context for Claude Code working in this repo.

## What this is

The iDigLabs storefront. Static HTML, no build step, no framework, no
dependencies. Deployed to Netlify from the `main` branch of GitHub.
Pushing to `main` deploys. There is nothing to compile.

## Architecture

```
index.html          Homepage — interactive hero schematic, method, department cards
instruments.html    7 synths + Discovery Series bundle
plugins.html        4 processors
software.html       3 macOS apps
oldschool.html      Free 10-plugin rack + demo video + checkout
404.html            Branded error page
netlify.toml        Redirects, headers, short links (/free, /synths, /apps)
assets/site.css     All styling. CSS variables at the top.
assets/site.js      All data and all behaviour.
```

Every page is hand-written HTML sharing `assets/site.css` and
`assets/site.js`. Pages differ only in their masthead, intro copy, spec
table, and which render function they call at the bottom.

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
- BRICK is listed at $49 on `plugins.html` and is also OS-01 in the free
  Old School rack. This is a contradiction that needs a decision, not code.
- All `PRODUCTS[].url` values except Old School are still `"#"`. They need
  real Lemon Squeezy checkout URLs before launch.
- Discovery Series price ($99) is provisional.
