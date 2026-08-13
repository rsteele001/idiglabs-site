# Deploy runbook

One-time setup, then every future change is three commands.

---

## 1. Check for email on the domain — do this first

Moving nameservers drops MX records, and mail stops **silently**. Run:

```bash
dig +short MX idiglabs.com
```

- **Empty output** → no mail on the domain. Take Path A below.
- **Anything returned** → mail is configured. Take Path B, or recreate
  those MX records in Netlify after switching. Write down exactly what it
  printed before you change anything.

---

## 2. Push to GitHub

From the folder containing `index.html`:

```bash
git init
git add .
git commit -m "iDigLabs site — initial"
git branch -M main
```

Create an empty repo at github.com/new named `idiglabs-site`. **Do not**
let it add a README, .gitignore, or licence — the repo must be empty or
the first push will conflict. Then:

```bash
git remote add origin https://github.com/rsteele001/idiglabs-site.git
git push -u origin main
```

---

## 3. Connect Netlify

1. Netlify → **Add new site → Import an existing project → GitHub**
2. Authorise, pick `idiglabs-site`
3. Build command: **leave empty**. Publish directory: **`.`**
   (`netlify.toml` already sets both — just confirm it matches.)
4. Deploy

You get a URL like `some-name-a4b21.netlify.app`. Open it, click through
all five pages, test the Old School checkout button. Fix anything broken
before touching DNS.

---

## 4. Point the domain

In Netlify: **Domain management → Add a domain →** `idiglabs.com`.

### Path A — move nameservers (simpler, no mail on domain)

Netlify gives you four nameservers, e.g. `dns1.p03.nsone.net` … `dns4`.

GoDaddy → **My Products → Domains → idiglabs.com → DNS → Nameservers →
Change → I'll use my own nameservers.** Paste all four. Save.

Netlify now handles DNS, the apex/www split, and SSL automatically.

### Path B — keep GoDaddy DNS (required if you have mail)

In GoDaddy's DNS records panel:

| Type  | Name | Value                        |
|-------|------|------------------------------|
| A     | `@`  | `75.2.60.5`                  |
| CNAME | `www`| `your-site.netlify.app`      |

**Delete GoDaddy's parked-page A record and any default `www` CNAME**, or
they'll fight the new ones and you'll get intermittent GoDaddy landing
pages. Also disable any "Website Builder" or domain forwarding GoDaddy
switched on by default.

### Both paths

Propagation is usually minutes, occasionally a few hours. Netlify's
dashboard shows when it sees the records and issues the SSL certificate
on its own. Don't force-refresh SSL until DNS resolves.

Verify:

```bash
dig +short idiglabs.com
curl -sI https://idiglabs.com | head -1
```

---

## 5. Every change after that

```bash
git add .
git commit -m "what changed"
git push
```

Live in ~15 seconds.

**For anything risky**, push a branch instead:

```bash
git checkout -b new-product
# ...edits...
git push -u origin new-product
```

Netlify builds it at a separate preview URL without touching the live
site. Merge to `main` when it looks right.

**Rollback:** Netlify → Deploys → pick any earlier deploy → **Publish
deploy**. Live again in seconds.

---

## 6. Before you send anyone traffic

- [ ] Test the Old School checkout in a **private window**. If Lemon
      Squeezy asks for a card on a $0 product, that setting will kill the
      campaign — fix it in the LS product config first.
- [ ] Confirm the download email actually arrives, with a working DMG link.
- [ ] Install from that DMG on a Mac that has never seen the plugins, and
      confirm Gatekeeper doesn't complain.
- [ ] Open `/free`, `/synths`, `/apps` — the short links should redirect.
- [ ] Hit a made-up URL and confirm the 404 page renders.
- [ ] Check the site on a phone.

---

## Short links available

`netlify.toml` maps these — use them in forum posts and on LinkedIn:

- `idiglabs.com/free` → Old School
- `idiglabs.com/oldschool` → Old School
- `idiglabs.com/synths` → Instruments
- `idiglabs.com/apps` → Utility software
