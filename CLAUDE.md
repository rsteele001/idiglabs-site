# CLAUDE.md — iDigLabs site

Context for Claude Code working in this repo.

## What this is

The iDigLabs storefront. Static HTML, no build step, no framework, no
dependencies. Deployed by Netlify from GitHub: every push to `main`
deploys to idiglabs.com (see "Deploying right now"). There is nothing
to compile.

## Architecture

Only `public/` is published. Anything at the repo root (this file,
DEPLOY.md, netlify.toml, _staged/) never reaches the site.

```
netlify.toml               Publish dir, redirects (/buy/<slug> → Payhip), headers
public/index.html          Storefront home: All Access block, trials, departments
public/all-access.html     ALL ACCESS — every paid product, one price
public/instruments.html    Department pages — render PRODUCTS by group
public/plugins.html
public/software.html
public/oldschool.html      The free Old School rack (was / until the catalog launched)
public/<slug>.html         One product page per paid product — a shell with
                           data-slug; renderProduct() builds the rest
public/404.html            Branded error page
public/robots.txt          Blocks /_staged/ from crawlers
public/assets/site.css     All styling. CSS variables at the top.
public/assets/site.js      All data and all behaviour.
```

Every page shares `assets/site.css` and `assets/site.js` (referenced with
`?v=N` — bump N on every page when either changes; `/assets/*` is cached
for an hour).

## Pricing — no sales, ever

The price is the price. No discounts, no countdowns, no "was $X".
ALL ACCESS is the only multi-product offer and its price is fixed.

## The one rule

**Product content lives in `public/assets/site.js`, not in the HTML.** The
`PRODUCTS`, `FAMILIES`, and `OLDSCHOOL` arrays at the top of that file
are the single source of truth. Renderers build the DOM from them. Never
hard-code a product name, price, or description into an HTML file.

### Adding a product

Append one object to `PRODUCTS`:

```js
{ slug:"anvil", group:"plugins", ref:"IDL-109", name:"Anvil", art:"chain", status:"new",
  kind:"compressor · feedback topology", price:21, macos:"11",
  copy:"One paragraph. <b>Bold</b> is allowed. No other tags." }
```

then create `public/anvil.html` (copy any product shell, change
`data-slug`), add a `/buy/anvil` redirect to `netlify.toml`, and add the
page to `sitemap.xml`. No store URL ever goes in `site.js`.

- `slug` — page is `/<slug>.html`, Buy is `/buy/<slug>`.
- `app` — `true` for macOS apps; their footer never mentions AU/VST3 or Windows.
- `includes` / `keyNote` — optional; what one purchase contains, and an
  extra product-page footer line.
- `video` — optional YouTube ID; a click-to-play facade above the
  description. Omitted means nothing renders.
- `shots` — optional array of image paths under `/media/<slug>/`; a row of
  bordered plates below the description. Omitted or `[]` renders nothing.
  Images: 1600 px wide, one aspect ratio per product (16:10 suits most
  plug-in windows), PNG or WebP, under ~400 KB each.
- `copy` — department-plate blurb. Empty renders a marked TODO. Product
  pages always show a TODO description block for now.
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

Do not introduce new colors, fonts, or spacing values. Everything comes
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
- No external JS beyond `payhip.js` (Payhip checkout) and Google Fonts.
- No `localStorage` or cookies.
- The YouTube embed is a click-to-load facade in `mountVideo()` — keep it
  that way; do not replace it with a bare iframe.
- Every checkout link gets `data-ls`. `wireCheckout()` appends `?embed=1`
  and the `payhip-button` class automatically at runtime.

## Deploying

```bash
git add .
git commit -m "what changed"
git push
```

Netlify rebuilds in ~15 seconds. For anything risky, push a branch instead
and use the Netlify deploy preview URL before merging.

### Windows

`WINDOWS` near the top of `site.js` is the single switch, `false` until
Windows ships. All Windows wording lives in `site.js` (`WIN_COPY`,
`WIN_INSTALL`, product `keyNoteWin`); pages carry only empty `data-win`
hooks that `applyWindows()` fills. `/windows.html` (install note) redirects
home while the flag is off. Apps (`app:true`) never change.

At launch: flip the flag, add `/windows.html` to `sitemap.xml`, bump
`site.js?v=` on every page.

## Known open items

- The ten `OLDSCHOOL[].kind` one-liners are placeholders and need rewriting.
- Every product page shows a TODO description block; most department
  plates do too. Search `site.js` and the dept pages for "TODO".
- `/buy/all-access` and `/trials` are commented-out pending redirects in
  `netlify.toml`. Until filled, those links 404.
- Product names and pages must carry no hardware brand names (SSL,
  Neve, Moog, 1176, etc.).

## Deploying right now

**Since 2026-10-01 Netlify is linked to the repo: every push to `main`
deploys to idiglabs.com.** Pushing IS deploying. Commit locally as asked, but
never push `main` unless Ron has said to deploy.


## Licensing model — CURRENT STATE

**The whole catalog is fully offline (confirmed by Ron, 2026-10-02).** No
plug-in and no app contacts a license server. Keys are validated on the
user's machine (`~/idiglabs/shared/Licensing`); the only URL any product
holds is its Buy link, opened in the browser. Payhip's license verification
API is not used. The privacy policy and terms say this as of 2026-10-02.

History: until September 2026, eleven plug-ins called `api.lemonsqueezy.com`
on activation. A "never contacts a server" claim published on 17 Aug 2026 was
reverted the same day because the binaries of the time contradicted it. If
any future product adds a network call, the legal pages change in the same
deploy.

## Payment provider

Payhip processes payments and issues license keys. Migrated from Lemon Squeezy
in August 2026.

Payhip is NOT the merchant of record — the seller is Ron Steele, trading as
iDigLabs. Payhip's role is tax-specific and varies by territory: marketplace
facilitator in the US, digital platform operator in Canada, and reseller for
VAT in the EU and UK. It collects and remits the applicable tax in those
capacities. Do not reintroduce "Merchant of Record" anywhere.

- `payhip.js` loads in `<head>` on any page with a buy button.
- A buy link needs `class="payhip-buy-button"` and `data-product="<code>"`.
  `wireCheckout()` adds both automatically to any `a[data-ls]` pointing at a
  `payhip.com/b/<code>` URL, so product data only needs the plain URL.
- Old School free product: `https://payhip.com/b/lziae` (code `lziae`).
- All three legal pages describe Payhip's tax role in those terms. If the
  provider changes again, or its role does, those pages must change the same
  day.

## After any working-tree replacement

The `.netlify` link file lives in the working tree, not in `.git`. If the
folder is replaced wholesale, run this before deploying or the CLI will
create a stray project:

```bash
netlify link --name idiglabs
```
