/* ============================================================
   iDigLabs — shared data + renderers
   EDIT THE DATA BLOCK BELOW. Everything after it is plumbing.

   Pricing: no sales, ever. The price is the price.

   slug    — the product page is /<slug>.html, Buy is /buy/<slug>
             (a netlify.toml redirect to Payhip). Never a store URL here.
   group   — "instruments" | "plugins" | "software". Decides the dept page.
   status  — "" | "new" | "soon" | "free"
   app     — true for the macOS apps (footer says app, not AU/VST3)
   macos   — minimum macOS shown in the footer
   includes— optional: what one purchase contains
   keyNote — optional extra footer line (keyNoteWin replaces it when
             WINDOWS is true)
   video   — optional YouTube ID. Shows a click-to-play facade above the
             description on the product page. Omit it and nothing renders.
   shots   — optional array of image paths, e.g.
             ["/media/shatter/shatter-1.png"]. A row of bordered plates
             below the description. Omit it or leave it [] and nothing
             renders.
   copy    — department-plate blurb. "" renders a marked TODO.
   description — product page copy: { short, body, points[], note? }.
             short is the lead line, then the body paragraph, then the
             points as bullets. note, if present, prints under the
             footer. Absent renders a marked TODO.
   art     — transformer | ladder | wave | fm | chain | stack | folder | tag
   ============================================================ */

/* ============================================================
   WINDOWS — the one switch. false until Windows has shipped.

   true turns on, across the whole site:
   - every plug-in product page: Mac + PC footer and spec, a link to
     /windows.html; Dream State's "One key unlocks both, on Mac and PC."
   - All Access: "Mac and Windows", plus the Mac-and-PC key line
   - trial wording: plug-ins on Mac and Windows, apps on Mac
   - homepage: "Now on Mac and Windows." near the top
   - Old School, Instruments, Plugins, /how: Mac-only wording swapped
     for Mac + PC wording via data-win hooks (see WIN_COPY)
   - /windows.html: the install note. While false that page sends
     visitors to the homepage.
   The apps (app:true) stay Mac-only regardless.

   All Windows wording lives in this file, never in the HTML, so the
   pages carry only empty hooks. It is still readable by anyone who
   opens site.js.
   ============================================================ */
const WINDOWS = true;

/* Text for every data-win hook. applyWindows() swaps each hooked
   element's content for its entry here, and un-hides empty hooks. */
const WIN_COPY = {
  banner:      "Now on Mac and Windows.",
  trialsFine:  "Every product has a 30-day full trial: plug-ins on Mac and Windows, apps on Mac. After that it keeps working, with a reminder.",
  osLabel:     "OS",
  deptFormat:  "AU · VST3 (Mac) · VST3 (Win)",
  deptOS:      "macOS 11+ · Windows 10/11 64-bit",
  deptKey:     "one key · Mac and PC",
  ledeKey:     "No subscription. You buy a license once and you keep it. One key works on all your computers, Mac and PC.",
  ledeFormats: "Plug-ins are AU and VST3 on Mac, Apple Silicon and Intel, notarized under one Developer ID — and VST3 on Windows 10 or 11 (64-bit). The apps are Mac-only.",
  howKeyHead:  "One key, Mac and PC",
  howKeyText:  "One key works on all your computers, Mac and PC. Buy it once and keep it. There is no subscription. The apps are Mac-only.",
  howSigned:   "Every Mac installer is signed with our Developer ID and notarized by Apple. Installing on Windows: <a href=\"/windows.html\">see the note</a>.",
  osFormat:    "AU · VST3 (Mac) · VST3 (Win)",
  osOS:        "macOS 11+ · Windows 10/11",
  osInstaller: "Mac: signed · notarized",
  osAccount:   "There is no key to issue and no account to create. Payhip handles the download, and after that the ten are simply installed on your computer — no subscription, and nothing checking in while you work.",
  osWinNote:   "On Windows: <a href=\"/windows.html\">installing on Windows</a>."
};

const WIN_INSTALL = [
  "Run the installer. Plug-ins install to <span class=\"addr\">C:\\Program Files\\Common Files\\VST3\\</span>.",
  "Windows may show \u201cWindows protected your PC.\u201d Click <b>More info</b>, then <b>Run anyway</b>.",
  "Rescan plug-ins in your DAW if they don't appear.",
  "Enter the same key you use on your Mac."
];

function applyWindows(){
  if(!WINDOWS) return;
  document.documentElement.classList.add("windows");
  document.querySelectorAll("[data-win]").forEach(n=>{
    const t = WIN_COPY[n.dataset.win];
    if(t === undefined) return;
    n.innerHTML = t;
    n.hidden = false;
  });
}

/* /windows.html: the install note when WINDOWS, otherwise home. */
function renderWindowsInstall(hostId){
  const host = document.getElementById(hostId);
  if(!host) return;
  if(!WINDOWS){ location.replace("/"); return; }
  host.innerHTML = '<ol class="steps">'+WIN_INSTALL.map(s=>'<li>'+s+'</li>').join("")+'</ol>';
}

const TRIALS_URL = "/trials";

const ALL_ACCESS = {
  ref:"IDL-AA1", price:233, url:"/buy/all-access",
  head:"Every iDigLabs product, one key.",
  // Computed at render, so a price or catalog change can never leave this
  // line stale: {SEPARATE} = sum of every paid PRODUCTS price, {PRICE} =
  // the All Access price, {COUNT} = number of paid products, {EACH} =
  // {PRICE} / {COUNT} rounded to the dollar.
  line:"{SEPARATE} of tools for {PRICE}. {COUNT} plugins and apps, about {EACH} each.",
  body:"Every plugin and both apps with one key, on every Mac you own. Real price, every day, no countdown.",
  fine:"Future products are separate purchases. No subscription, ever.",
  scope:"All plug-ins and both apps. One-time."
};

const PRODUCTS = [

  /* ---------------- $55 ---------------- */
  { slug:"shatter", group:"instruments", ref:"IDL-208", name:"Shatter", art:"wave", status:"",
    kind:"spectral resynthesizer · instrument + FX insert", price:55, macos:"11",
    includes:["Shatter","Shatter FX","Shatter standalone app"], copy:"",
    shots:["/media/shatter/shatter-1.webp"],
    description:{
      short:"You already have the sound. You just haven't heard it yet.",
      body:"Drop in any audio file, and Shatter turns it into a playable instrument across the keyboard. A door slam, a field recording, a vocal or a single note becomes a living wavetable you can play, twist and layer. Add a synth oscillator underneath to give textures a fundamental, and use TWIST to scatter coherent sound into something new. Includes Shatter FX for live processing or freeze, and a standalone app.",
      points:["Drop any audio file, play it across the keyboard","TWIST macro, from coherent to scattered","Synth oscillator layer with its own octave control","Shatter FX insert, live or freeze","Standalone app, no DAW needed","Built for sound design: ambiences, environments, moods"] } },

  { slug:"tag-and-find", group:"software", ref:"IDL-302", name:"Tag &amp; Find", art:"tag", status:"",
    kind:"macOS app · audio file browser", price:55, app:true, macos:"13",
    copy:"Your tags, not somebody's metadata scheme. Waveform preview, drag straight into the session, and folders that reconcile themselves when you move a drive. Seventy thousand files and it still opens instantly.",
    shots:["/media/tag-and-find/tag-and-find-1.webp"],
    description:{
      short:"Find the right sound effect fast, and drag it straight into your DAW.",
      body:"Drag your sound effects folders into Tag &amp; Find, or choose them from your drives, and it builds a searchable library you can browse by category, tag, mark favorites in and group into projects. Preview instantly, then drag the sound straight into your session.",
      points:["Drag in folders or pick them from any drive","Search your whole library in seconds","Drag sounds straight into your DAW","Categories, tags, favorites and projects","Inline audio preview","Runs entirely on your Mac: no account, no cloud, no subscription"] } },

  { slug:"lost-and-found", group:"software", ref:"IDL-301", name:"Lost &amp; Found", art:"folder", status:"",
    kind:"macOS app · Kontakt library browser", price:55, app:true, macos:"13.5",
    copy:"Finds every Kontakt library on every drive, including the ones the installer lost, and sorts them by the vendor who actually made them. Drag in anything the scan missed and it stays put. No account, no catalog, no storefront.",
    shots:["/media/lost-and-found/lost-and-found-1.webp"],
    description:{
      short:"Find every Kontakt library on every drive, even the ones Kontakt forgot.",
      body:"Lost &amp; Found scans your drives, finds every Kontakt library, and organizes them by vendor so you can see everything you own in one place.",
      points:["Scans all connected drives","Finds libraries Kontakt has lost track of","Groups everything by vendor","Runs entirely on your Mac: no account, no cloud, no subscription"],
      note:"Requires Full Disk Access (the app shows you how)." } },

  /* ---------------- $34 ---------------- */
  /* Order within a tier: instruments first, then effects. */
  { slug:"super-stack", group:"instruments", ref:"IDL-210", name:"Super Stack", art:"stack", status:"",
    kind:"layered synth rack", price:34, macos:"11", copy:"",
    shots:["/media/super-stack/super-stack-1.webp"],
    description:{
      short:"Four synth engines stacked for pads and motion.",
      body:"Super Stack layers four engines into one instrument, built to do two things extremely well: lush pads and sounds that move. Master macros shape the whole stack at once, per-layer controls fine-tune each engine, and a full effects chain finishes it.",
      points:["Four stacked engines","Master macros plus per-layer controls","Built-in FX chain","TWIST: re-roll the patch for instant new ideas"] } },

  { slug:"polypop", group:"instruments", ref:"IDL-209", name:"PolyPop", art:"wave", status:"",
    kind:"polyphonic synthesizer", price:34, macos:"11", copy:"",
    shots:["/media/polypop/polypop-1.webp"],
    description:{
      short:"A polyphonic lead synth with 1970s character.",
      body:"PolyPop takes the lead voice from Acid Mono and makes it polyphonic: big, bright, retro leads with a fat parallel path for weight. A character tool that does one thing with attitude.",
      points:["Polyphonic lead voice","Fat parallel signal path","Octave control, −2 to +2","Few knobs, no preset scrolling"] } },

  { slug:"acid-mono", group:"instruments", ref:"IDL-211", name:"Acid Mono", art:"ladder", status:"",
    kind:"monophonic synthesizer · acid + lead", price:34, macos:"11", copy:"",
    shots:["/media/acid-mono/acid-mono-1.webp","/media/acid-mono/acid-mono-2.webp"],
    description:{
      short:"Acid bass with squelch, slide and grit.",
      body:"A monophonic acid bass synth built for basslines that bite and leads that cut.",
      points:["Monophonic acid voice with slide","Squelchy, resonant filter","Built for bass and cutting leads"] } },

  { slug:"discovery", group:"instruments", ref:"IDL-B01", name:"Discovery Series", art:"fm", status:"",
    kind:"three instruments · one architecture", price:34, macos:"11",
    includes:["Lucy","Axel","Trixie"],
    copy:"Same voice, three temperaments. No exposed envelopes on any of them — the envelope is baked into the category you pick, so there is nothing to dial in before you hear something. Macros, a randomizer, and a save button. <b>Lucy</b> is the analog end, <b>Axel</b> the dark FM, <b>Trixie</b> the glass. Learn one and you have learned all three.",
    shots:["/media/discovery/discovery-1.webp","/media/discovery/discovery-2.webp","/media/discovery/discovery-3.webp"],
    description:{
      short:"Three focused synths: Lucy, Axel and Trixie.",
      body:"Three characterful synths in one package. Simple, fast and easy to get great results from, with one key that unlocks all three.",
      points:["Lucy, Axel and Trixie","Simple controls, big character","One key unlocks all three"] } },

  { slug:"kaleidoscope", group:"instruments", ref:"IDL-202", name:"Kaleidoscope", art:"stack", status:"",
    kind:"wavetable synthesizer", price:34, macos:"11",
    copy:"43 wavetables in ten categories, or load your own. <b>MOVE</b> gives eleven controls their own motion, <b>PUMP</b> retriggers in time with your track, and <b>VIBE TWIST</b> rolls new ideas with undo and A/B. Built on the Pulsar-6 voice, so the filter and the effects are the ones you already know.",
    shots:["/media/kaleidoscope/kaleidoscope-1.webp"],
    description:{
      short:"A wavetable synth that never sits still.",
      body:"Kaleidoscope scans through 43 wavetables, or your own, while MOVE gives eleven controls their own motion. Pads shift and evolve through chorus, ping-pong delay, swirl and a deep space chain. VIBE TWIST rolls new ideas with undo and A/B.",
      points:["Two detuned wavetable oscillators plus sub, six voices","43 tables in 10 categories, or load your own","MOVE: built-in motion on 11 parameters","PUMP: tempo-synced rhythmic retrigger","20 presets"] } },

  { slug:"pulsar-6", group:"instruments", ref:"IDL-201", name:"Pulsar-6", art:"wave", status:"",
    kind:"polyphonic synthesizer · six voices", price:34, macos:"11",
    copy:"Six voices and a ladder low-pass, plus three things a vintage poly never had: <b>Move</b> for tempo-locked per-parameter drift, <b>Pump</b> for triggered patterns locked to host position, <b>Spread</b> for width that survives a fold to mono.",
    description:{
      short:"A six-voice analog-style polysynth.",
      body:"Pulsar-6 morphs its oscillators from saw to square to pulse, into a warm 24 dB filter that holds its low end as you push resonance. Classic poly sounds with built-in movement and a deep effects chain.",
      points:["Two detuned morphing oscillators plus sub, six voices","24 dB low-pass that keeps its bass","MOVE drift and PUMP rhythms","Chorus, delay, swirl and space","20 presets"] } },

  { slug:"raven", group:"instruments", ref:"IDL-203", name:"Raven", art:"ladder", status:"",
    kind:"leads and basses · mono or 8-voice poly", price:34, macos:"11",
    copy:"Four corners — Reese, screech, growl, mangle — and an XY puck to sit anywhere between them. Hard resonance, four-times oversampled, a wobble LFO phase-locked to the host, and a sixteen-step gate you draw yourself.",
    shots:["/media/raven/raven-1.webp"],
    description:{
      short:"Leads and basses that bite.",
      body:"Raven stacks seven detuned oscillators per voice and morphs between four characters (REESE, SCREECH, GROWL and MANGLE) on an X/Y pad. Tempo-locked wobble and a drawable 16-step gate make it move with your track.",
      points:["Seven-oscillator voice plus sub","X/Y morph between four sounds","WOBBLE and 16-step PULSATE gate, synced to your DAW","Mono or 8-voice poly, with glide","TWIST randomizer with locks"] } },

  { slug:"drumtool", group:"instruments", ref:"IDL-212", name:"Drumtool", art:"stack", status:"",
    kind:"drum instrument", price:34, macos:"11", copy:"",
    shots:["/media/drumtool/drumtool-1.webp","/media/drumtool/drumtool-2.webp"],
    description:{
      short:"Audition drums already mix-ready.",
      body:"Four channels (kick, snare and two toms), each with a full processing chain that stays put while you step through sources. You hear every kick already shaped and sitting in the mix, not raw.",
      points:["Four channels: kick, snare, two toms","Processing holds while you swap sources","Separate outputs per channel plus a master bus","Master compressor"] } },

  { slug:"dream-state", group:"plugins", ref:"IDL-105", name:"Dream State", art:"chain", status:"",
    kind:"modulation + reverb · two plug-ins", price:34, macos:"11",
    includes:["Dream State Motion","Dream State Void"], keyNote:"One key unlocks both.", keyNoteWin:"One key unlocks both, on Mac and PC.", copy:"",
    shots:["/media/dream-state/dream-state-1.webp","/media/dream-state/dream-state-2.webp"],
    description:{
      short:"A delay and a reverb built for space.",
      body:"Motion is a delay and modulation effect with rotary-speaker movement. Void is an outer-space reverb with four modes (VOID, ORBIT, NEBULA and EVENT HORIZON), tails up to 7 seconds, and tape delay ahead of the reverb.",
      points:["Motion: delay and modulation, rotary movement","Void: four outer-space reverb modes, long tails","Tape delay into reverb","Use together or separately"] } },

  { slug:"haul", group:"plugins", ref:"IDL-108", name:"Haul", art:"transformer", status:"",
    kind:"tape", price:34, macos:"11", copy:"",
    shots:["/media/haul/haul-1.webp"],
    description:{
      short:"The dark, warm cloud of half-inch tape.",
      body:"A half-inch two-track tape machine: the warm, dark glue of running a mix to tape, with tube drive and a MUD control to clear the low mids.",
      points:["Half-inch two-track tape character","Tube drive","MUD: low-mid cleanup","Starts on a musical default, not a blank slate"] } },

  /* ---------------- $21 ---------------- */
  { slug:"tekno", group:"instruments", ref:"IDL-205", name:"Tekno", art:"ladder", status:"",
    kind:"monophonic bass", price:21, macos:"11",
    copy:"A four-pole ladder, a sub that stays under the kick, and glide that behaves at the bottom of the keyboard. One job. It has no randomizer and does not need one.",
    shots:["/media/tekno/tekno-1.webp"],
    description:{
      short:"A mono bass synth built for movement.",
      body:"A single-voice bass machine: three detuned oscillators plus sub, always-on glide and a clean ladder filter, with five punchy envelope shapes. Add auto-wah, flanger and space to taste.",
      points:["Three oscillators plus sub, mono, with glide","BEEF filter cutoff, mod-wheel ready","Five envelope shapes: SPIT, SNAP, STAB, PUMP, SMEAR","CREATURE auto-wah, GLIDE flanger, SWIRL space, LIFT octave","Six preset tabs"] } },

  { slug:"bind", group:"plugins", ref:"IDL-106", name:"Bind", art:"transformer", status:"",
    kind:"stereo bus compressor", price:21, macos:"11", copy:"",
    shots:["/media/bind/bind-1.webp"],
    description:{
      short:"A stereo bus compressor with two personalities.",
      body:"A warm tube vari-mu and a punchy VCA, switchable on the fly with a smooth crossfade. Set it flat and it passes audio untouched; push it and it glues a mix together.",
      points:["Tube (BIAS) or VCA, switchable on the fly","Ratio, attack, release (with AUTO), makeup and dry/wet mix","Sidechain high-pass to keep the low end from pumping","Linked or unlinked stereo","Input and gain-reduction meters"] } },

  { slug:"cinch", group:"plugins", ref:"IDL-107", name:"Cinch", art:"chain", status:"",
    kind:"drum channel strip · insert", price:21, macos:"11", copy:"",
    shots:["/media/cinch/cinch-1.webp"],
    description:{
      short:"Drumtool's channel strip, for any track.",
      body:"The processing chain from Drumtool, for any audio: a faster alternative to reaching for EQ and a compressor. Great on drums, just as good on bass, vocals and buses.",
      points:["Bottom-end saturator","Transient control","LOUD: one-knob loudness limiter","Works on any source"] } },

  /* ---------------- FREE ---------------- */
  { slug:"oldschool", group:"plugins", ref:"IDL-104", name:"Old School Series", art:"stack", status:"free",
    kind:"collection · ten plug-ins · free", price:0, macos:"11",
    copy:"Modeling the boxes is the easy half. What nobody models is the wire between them — transformers loading the input, cable capacitance rolling the top, one stage driven hot into the next. All ten built as one chain. <b>Free, with a perpetual license. No trial, no expiry, no catch.</b>" }
];

/* ============================================================
   FAMILIES — multi-product bundles. members must match product
   `name` exactly. Empty: Discovery and Dream State are each sold
   as one product now, so there is nothing to sum. The renderer
   stays for the next real bundle.
   ============================================================ */
const FAMILIES = [];

/* ============================================================
   OLD SCHOOL SERIES — free, permanently
   OLDSCHOOL[].kind: one-liners are PLACEHOLDERS — rewrite each.
   knobs/meter drive the drawn front panel. meter: "vu"|"curve"|null
   ============================================================ */
const PROMO_URL = "https://payhip.com/b/lziae";        // Payhip product page
const PROMO_PRODUCT = "lziae";                        // Payhip product code
const PROMO_VIDEO = "Wf1g0stwn5M";   // YouTube ID — Old School Series demo

const OLDSCHOOL = [
  { name:"Brick",      kind:"transformer",        knobs:4, meter:"curve" },
  { name:"Heat",       kind:"saturation eq",      knobs:3, meter:"vu"    },
  { name:"Deck",       kind:"tape",               knobs:4, meter:"vu"    },
  { name:"Slab",       kind:"low-end hype",       knobs:4, meter:"curve" },
  { name:"Rig",        kind:"effects rack",       knobs:4, meter:"curve" },
  { name:"Vice",       kind:"compressor",         knobs:4, meter:"vu"    },
  { name:"Rig Vocal",  kind:"vocal chain",        knobs:3, meter:"curve" },
  { name:"Voodoo",     kind:"potluck mayhem",     knobs:3, meter:null    },
  { name:"Crank",      kind:"small amp and room", knobs:2, meter:"vu"    },
  { name:"Bust",       kind:"destruction",        knobs:3, meter:null    }
];

/* ============================================================
   Plate artwork — line schematics drawn per motif
   ============================================================ */
const ART = {
  transformer:`<g fill="none" stroke="#211E1A" stroke-width="1.2">
      <path d="M20 40 H70 M110 40 H140"/><rect x="70" y="30" width="40" height="20" fill="#fff"/>
      <path d="M140 40 V56 q12 6 0 12 q12 6 0 12 V80"/><path d="M160 40 V56 q-12 6 0 12 q-12 6 0 12 V80"/>
      <path d="M147 34 V78 M153 34 V78"/><path d="M160 40 H200"/>
      <path d="M200 40 q8-14 16 0 q8-14 16 0"/><path d="M232 40 H280"/><path d="M20 80 H280"/></g>
    <g fill="#171514"><circle cx="60" cy="18" r="9"/><circle cx="150" cy="14" r="9"/><circle cx="240" cy="18" r="9"/></g>
    <g stroke="#fff" stroke-width="1.4"><path d="M60 18 L55 11"/><path d="M150 14 L150 6"/><path d="M240 18 L245 11"/></g>`,

  ladder:`<g fill="none" stroke="#211E1A" stroke-width="1.2">
      <path d="M20 78 H50"/><rect x="50" y="30" width="26" height="20" fill="#fff"/><path d="M63 50 V78"/>
      <rect x="96" y="30" width="26" height="20" fill="#fff"/><path d="M109 50 V78"/>
      <rect x="142" y="30" width="26" height="20" fill="#fff"/><path d="M155 50 V78"/>
      <rect x="188" y="30" width="26" height="20" fill="#fff"/><path d="M201 50 V78"/>
      <path d="M63 30 H201"/><path d="M20 30 H50 M214 40 H240"/><path d="M50 78 H280"/>
      <path d="M240 40 V78"/></g>
    <g fill="#171514"><circle cx="258" cy="24" r="10"/></g>
    <g stroke="#fff" stroke-width="1.5"><path d="M258 24 L252 17"/></g>`,

  wave:`<g fill="none" stroke="#211E1A" stroke-width="1.2">
      <path d="M18 62 h14 v-24 h14 v24 h14 v-24 h14 v24 h14"/>
      <path d="M102 62 l14-26 l14 26 l14-26 l14 26"/>
      <path d="M172 62 q26-34 52 0"/><path d="M226 62 h56"/><path d="M18 80 H282"/>
      <path d="M60 34 V24 M144 32 V24 M226 40 V24"/></g>
    <g fill="#171514"><circle cx="60" cy="14" r="9"/><circle cx="144" cy="14" r="9"/><circle cx="226" cy="14" r="9"/></g>
    <g stroke="#fff" stroke-width="1.4"><path d="M60 14 L54 8"/><path d="M144 14 L144 6"/><path d="M226 14 L232 8"/></g>`,

  fm:`<g fill="none" stroke="#211E1A" stroke-width="1.2">
      <rect x="26" y="20" width="54" height="34" fill="#fff"/><rect x="120" y="20" width="54" height="34" fill="#fff"/>
      <rect x="214" y="20" width="54" height="34" fill="#fff"/>
      <path d="M80 37 H120 M174 37 H214"/><path d="M53 54 V72 H241 V54"/>
      <path d="M36 40 q9-12 18 0 q9-12 18 0"/><path d="M130 40 q9-12 18 0 q9-12 18 0"/>
      <path d="M224 40 q9-12 18 0 q9-12 18 0"/><path d="M26 84 H268"/></g>
    <g font-family="IBM Plex Mono, monospace" font-size="9" fill="#6B635A">
      <text x="34" y="17">OP1</text><text x="128" y="17">OP2</text><text x="222" y="17">OP3</text></g>`,

  chain:`<g fill="none" stroke="#211E1A" stroke-width="1.2">
      <path d="M14 46 H40"/><rect x="40" y="32" width="46" height="28" fill="#fff"/>
      <path d="M86 46 H108"/><rect x="108" y="32" width="46" height="28" fill="#fff"/>
      <path d="M154 46 H176"/><rect x="176" y="32" width="46" height="28" fill="#fff"/>
      <path d="M222 46 H244"/><rect x="244" y="32" width="42" height="28" fill="#fff"/>
      <path d="M14 80 H286"/><path d="M63 60 V80 M131 60 V80 M199 60 V80 M265 60 V80"/></g>
    <g fill="#171514"><circle cx="63" cy="16" r="7"/><circle cx="131" cy="16" r="7"/><circle cx="199" cy="16" r="7"/><circle cx="265" cy="16" r="7"/></g>
    <g stroke="#fff" stroke-width="1.3"><path d="M63 16 L59 11"/><path d="M131 16 L131 9"/><path d="M199 16 L204 11"/><path d="M265 16 L269 11"/></g>
    <g fill="none" stroke="#A9A093" stroke-width="1" stroke-dasharray="3 4"><path d="M63 22 V32 M131 22 V32 M199 22 V32 M265 22 V32"/></g>`,

  stack:`<g fill="none" stroke="#211E1A" stroke-width="1.2">
      <rect x="22" y="22" width="76" height="52" fill="#fff"/><rect x="112" y="22" width="76" height="52" fill="#fff"/>
      <rect x="202" y="22" width="76" height="52" fill="#fff"/><path d="M98 48 H112 M188 48 H202"/>
      <path d="M34 62 h10 v-16 h10 v16 h10 v-16 h10 v16 h8"/>
      <path d="M124 62 q26-30 52 0"/><path d="M214 62 h10 l10-18 l10 18 h10"/></g>
    <g font-family="IBM Plex Mono, monospace" font-size="10" fill="#6B635A">
      <text x="30" y="36">I</text><text x="120" y="36">II</text><text x="210" y="36">III</text></g>`,

  folder:`<g fill="none" stroke="#211E1A" stroke-width="1.2">
      <path d="M22 78 V30 h34 l8 10 h50 v38 z" fill="#fff"/>
      <path d="M130 34 H278 M130 48 H278 M130 62 H240 M130 76 H262"/>
      <path d="M34 52 h10 M34 62 h22"/>
      <circle cx="90" cy="20" r="10"/><path d="M97 27 L110 40"/></g>
    <g fill="#B0663F"><circle cx="270" cy="62" r="3.5"/></g>`,

  tag:`<g fill="none" stroke="#211E1A" stroke-width="1.2">
      <path d="M18 62 h6 v-14 h5 v22 h5 v-30 h5 v38 h5 v-26 h5 v16 h5 v-24 h5 v30 h5 v-18 h5 v10 h6"/>
      <path d="M110 34 h74 v18 h-74 z" fill="#fff"/><circle cx="120" cy="43" r="3"/>
      <path d="M110 62 h96 v18 h-96 z" fill="#fff"/><circle cx="120" cy="71" r="3"/>
      <path d="M212 34 h66 v18 h-66 z" fill="#fff"/><circle cx="222" cy="43" r="3"/></g>
    <g fill="#B0663F"><circle cx="222" cy="43" r="3"/></g>`
};

function plate(motif, vb){
  return '<svg viewBox="'+(vb||"0 0 300 96")+'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+(ART[motif]||"")+'</svg>';
}

/* ============================================================
   Links — derived from slug, never stored
   ============================================================ */
const pageUrl = p => "/"+p.slug+".html";
const buyUrl  = p => "/buy/"+p.slug;
const paid    = () => PRODUCTS.filter(p=>p.status!=="free");

/* A visibly marked placeholder. Search the source for "TODO" to find them. */
function todo(what, draft){
  return '<div class="todo"><span class="lbl">TODO · '+what+'</span>'+
    (draft ? '<p><span class="lbl">previous site copy — review</span><br>'+draft+'</p>' : '')+
  '</div>';
}

/* ============================================================
   Department page renderer
   ============================================================ */
/* "Tag & Find and Lost & Found", from the data, so a new app joins it. */
const appNames = () => {
  const n = PRODUCTS.filter(p=>p.app).map(p=>p.name);
  return n.length > 1 ? n.slice(0,-1).join(", ")+" and "+n[n.length-1] : n.join("");
};

/* Department-card blurb: the product's own `copy`, else its short line. */
const blurb = p => p.copy || (p.description && p.description.short) || "";

function renderUnits(group, hostId){
  const host = document.getElementById(hostId);
  if(!host) return;
  PRODUCTS.filter(p=>p.group===group).forEach(p=>{
    const soon  = p.status==="soon";
    const free  = p.status==="free";
    const stamp = p.status ? '<span class="tag stamp">'+p.status+'</span>' : '';
    const fam   = FAMILIES.find(f=>f.id===p.family);
    const band  = fam ? '<span class="fam">'+fam.name+'</span>' : '';
    const btn   = soon ? '<a class="buy" href="#" aria-disabled="true">Notify me</a>'
                : free ? '<a class="buy" href="'+pageUrl(p)+'">Claim free →</a>'
                : '<span class="btns"><a class="buy ghost" href="'+pageUrl(p)+'">Details</a>'+
                  '<a class="buy" href="'+buyUrl(p)+'" data-ls>Buy — $'+p.price+'</a></span>';
    const tagPrice = free ? '<span class="price">Free</span>'
                          : '<span class="price">$'+p.price+'</span>';
    const art = document.createElement("article");
    art.className = "unit";
    art.innerHTML =
      '<a class="unit-plate" href="'+pageUrl(p)+'">'+plate(p.art)+stamp+band+'</a>'+
      '<div class="unit-top"><h3><a href="'+pageUrl(p)+'">'+p.name+'</a></h3><span class="ref">'+p.ref+'</span></div>'+
      '<div class="lbl kind">'+p.kind+(p.app ? ' · <span class="spot">Mac only</span>' : '')+'</div>'+
      (blurb(p) ? '<p>'+blurb(p)+'</p>' : todo("description"))+
      '<div class="unit-foot">'+tagPrice+btn+'</div>';
    host.appendChild(art);
  });
}

/* Count and price range for a homepage department card. */
function renderDeptMeta(){
  document.querySelectorAll("[data-dept-meta]").forEach(n=>{
    const g = n.dataset.deptMeta;
    const ps = paid().filter(p=>p.group===g);
    const lo = Math.min(...ps.map(p=>p.price)), hi = Math.max(...ps.map(p=>p.price));
    const noun = g==="software" ? (ps.length===1?"app":"apps") : (ps.length===1?"product":"products");
    n.textContent = ps.length+" "+noun+" · "+(lo===hi ? "$"+lo : "$"+lo+"–"+hi);
  });
}

/* ============================================================
   Product page footer — format, OS, trial, key.
   WINDOWS (top of file) switches every plug-in to the Mac + PC
   wording. Apps never change.
   ============================================================ */
function footerLines(p){
  if(p.app) return [
    "Native macOS app · macOS "+p.macos+" or later",
    "30-day free trial. One key works on all your Macs."
  ];
  const lines = WINDOWS ? [
    "AU and VST3 (Mac) · VST3 (Windows)",
    "macOS "+p.macos+" or later · Windows 10 or 11 (64-bit)",
    "30-day free trial. One key works on all your computers, Mac and PC."
  ] : [
    "AU and VST3 · macOS "+p.macos+" or later · Apple Silicon and Intel",
    "30-day free trial. One key works on all your Macs."
  ];
  const note = WINDOWS && p.keyNoteWin ? p.keyNoteWin : p.keyNote;
  if(note) lines.push(note);
  return lines;
}

/* ============================================================
   Product page — /<slug>.html carries only data-slug; the rest
   is built from PRODUCTS.
   ============================================================ */
function renderProduct(hostId){
  const host = document.getElementById(hostId);
  if(!host) return;
  const p = PRODUCTS.find(x=>x.slug===host.dataset.slug);
  if(!p){ host.innerHTML = todo("unknown product slug: "+host.dataset.slug); return; }

  document.title = p.name.replace("&amp;","&")+" — iDigLabs";
  const wm = document.getElementById("wordmark"); if(wm) wm.innerHTML = p.name;
  const ms = document.getElementById("mastsub"); if(ms) ms.innerHTML = p.kind;
  const nav = document.querySelector('.seg a[data-group="'+p.group+'"]');
  if(nav) nav.setAttribute("aria-current","page");

  const incl = p.includes
    ? '<dt>Includes</dt><dd>'+p.includes.join(" · ")+'</dd>' : '';
  const fmt  = p.app ? "macOS app" : (WINDOWS ? "AU · VST3 (Mac) · VST3 (Win)" : "AU · VST3");
  const os   = p.app ? "macOS "+p.macos+"+" : (WINDOWS ? "macOS "+p.macos+"+ · Windows 10/11 64-bit" : "macOS "+p.macos+"+");
  const winNote = (WINDOWS && !p.app)
    ? '<p class="pnote"><a href="/windows.html">Installing on Windows →</a></p>'
    : '';
  const d = p.description;
  const descNote = d && d.note ? '<p class="pnote">'+d.note+'</p>' : '';

  /* Media slots. Both render nothing at all when the field is absent or
     empty — no placeholder, no gap. The shots sit below the description
     and counter, across the full content width (see .shots in site.css). */
  const video = p.video ? '<div class="vwrap pvideo" id="pvideo"></div>' : '';
  const shots = (p.shots && p.shots.length)
    ? '<div class="shots">'+p.shots.map((src,i)=>
        '<a class="shot" href="'+src+'"><img src="'+src+'" alt="'+p.name+' screenshot '+(i+1)+'" loading="lazy"></a>'
      ).join("")+'</div>'
    : '';

  host.innerHTML =
    '<div class="prod">'+
      '<div>'+
        '<div class="unit-plate prod-plate">'+plate(p.art)+'</div>'+
        video+
        (d ? '<div class="pdesc">'+
            '<p class="plead">'+d.short+'</p>'+
            '<p>'+d.body+'</p>'+
            '<ul>'+d.points.map(t=>'<li>'+t+'</li>').join("")+'</ul>'+
          '</div>'
          : todo("product description", p.copy))+
      '</div>'+
      '<aside class="counter">'+
        (p.app ? '<p class="maconly"><b>Mac only.</b> Requires macOS '+p.macos+' or later.'+
          (WINDOWS ? ' Not available for Windows.' : '')+'</p>' : '')+
        '<span class="lbl">price · one-time</span>'+
        '<div class="counter-val"><b>$'+p.price+'</b><span>'+p.ref+'</span></div>'+
        '<div class="btnrow">'+
          '<a class="buy big" href="'+buyUrl(p)+'" data-ls>Buy — $'+p.price+'</a>'+
          '<a class="buy big ghost" href="'+TRIALS_URL+'">Try</a>'+
        '</div>'+
        '<dl>'+incl+
          '<dt>Format</dt><dd>'+fmt+'</dd>'+
          '<dt>OS</dt><dd>'+os+'</dd>'+
          (p.app ? '' : '<dt>Arch</dt><dd>Apple Silicon · Intel</dd>')+
          '<dt>Trial</dt><dd>30 days · full</dd>'+
          '<dt>License</dt><dd>perpetual</dd>'+
        '</dl>'+
      '</aside>'+
    '</div>'+
    shots+
    '<div class="pfoot">'+footerLines(p).map(l=>'<p>'+l+'</p>').join("")+descNote+winNote+'</div>'+
    '<a class="strip" href="/all-access.html">'+
      '<span class="l"><b>All Access</b><span class="sub">'+ALL_ACCESS.head+' $'+ALL_ACCESS.price+' one-time.</span></span>'+
      '<span class="go">See what’s in it →</span>'+
    '</a>';

  if(p.video) mountVideo("pvideo", p.video, p.name.replace("&amp;","&"));
}

/* ============================================================
   ALL ACCESS — homepage block (compact) and /all-access.html (full)
   The "separately" figure on the full page is summed, not typed.
   ============================================================ */
function renderAllAccess(hostId, full){
  const host = document.getElementById(hostId);
  if(!host) return;
  const ps  = paid();
  const sep = ps.reduce((s,p)=>s+p.price,0);
  const line = ALL_ACCESS.line
    .replace("{SEPARATE}", "$"+sep)
    .replace("{PRICE}", "$"+ALL_ACCESS.price)
    .replace("{COUNT}", ps.length)
    .replace("{EACH}", "$"+Math.round(ALL_ACCESS.price/ps.length));
  const item = p =>
    '<li><a href="'+pageUrl(p)+'">'+p.name+'</a>'+
    (p.includes ? ' <span class="ref">'+p.includes.join(" · ")+'</span>' : '')+
    (p.app ? ' <span class="ref">Mac only</span>' : '')+
    '<span class="price">$'+p.price+'</span></li>';
  /* The Windows half of this line names an unreleased platform, so it
     only appears once WINDOWS is true. */
  const appsNote = '<p>'+appNames()+' are macOS only'+
    (WINDOWS ? ' and not part of the Windows release.' : '.')+'</p>';
  const groups = [["instruments","Instruments"],["plugins","Effects"],["software","Apps"]];
  const list = full
    ? '<ul class="aa-list">'+groups.map(([g,label])=>{
          const gs = ps.filter(p=>p.group===g);
          return gs.length ? '<li class="aa-group"><span class="lbl">'+label+'</span></li>'+gs.map(item).join("") : '';
        }).join("")+
      '<li class="aa-total"><span>Bought separately</span><span class="price">$'+sep+'</span></li>'+
      '</ul>'+
      appsNote+
      '<p>'+ALL_ACCESS.fine+'</p>'
    : '';
  host.innerHTML =
    '<div class="bundle aa">'+
      '<div class="bundle-head"><span class="lbl">all access · '+ALL_ACCESS.scope+(WINDOWS ? ' Mac and Windows.' : '')+'</span><span class="ref">'+ALL_ACCESS.ref+'</span></div>'+
      '<div class="bundle-text">'+
        '<h3>'+ALL_ACCESS.head+'</h3>'+
        '<p>'+line+'</p>'+
        '<p>'+ALL_ACCESS.body+'</p>'+
        (WINDOWS ? '<p>One key, every plug-in, Mac and PC (apps are Mac-only).</p>' : '')+
        list+
        '<div class="bundle-foot">'+
          '<span><span class="price aa-price">$'+ALL_ACCESS.price+'</span> <span class="lbl">one-time</span></span>'+
          '<span class="btns">'+
            (full ? '' : '<a class="buy ghost" href="/all-access.html">What’s included</a>')+
            '<a class="buy" href="'+ALL_ACCESS.url+'" data-ls>Get All Access — $'+ALL_ACCESS.price+'</a>'+
          '</span>'+
        '</div>'+
      '</div>'+
    '</div>';
}

/* ---------- bundle renderer ---------- */
function renderFamilies(group, hostId){
  const host = document.getElementById(hostId);
  if(!host) return;
  FAMILIES.filter(f=>f.group===group).forEach(f=>{
    const units = f.members.map(n=>PRODUCTS.find(p=>p.name===n)).filter(Boolean);
    const sep   = units.reduce((s,p)=>s+p.price,0);
    const save  = sep - f.price;
    const plates = units.map(p=>
      '<figure><div class="mini">'+plate(p.art)+'</div><figcaption>'+p.name+'</figcaption></figure>'
    ).join("");
    const sec = document.createElement("div");
    sec.className = "bundle";
    sec.innerHTML =
      '<div class="bundle-head"><span class="lbl">'+f.kind+'</span><span class="ref">'+f.ref+'</span></div>'+
      '<div class="bundle-body">'+
        '<div class="bundle-plates">'+plates+'</div>'+
        '<div class="bundle-text"><h3>'+f.name+'</h3><p>'+f.copy+'</p>'+
          '<div class="bundle-foot">'+
            '<span><span class="price">$'+f.price+'</span> '+
            '<span class="strike">$'+sep+' separately</span></span>'+
            '<a class="buy" href="'+f.url+'" data-ls>Buy the three — save $'+save+'</a>'+
          '</div>'+
        '</div>'+
      '</div>';
    host.appendChild(sec);
  });
}

/* ============================================================
   Old School rack — drawn front panels + countdown
   ============================================================ */
function rackFace(u){
  const W=240, H=104;
  let s = '<svg viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">';
  s += '<rect x="6" y="6" width="'+(W-12)+'" height="'+(H-12)+'" fill="none" stroke="#211E1A" stroke-width="1.2"/>';
  s += '<line x1="6" y1="26" x2="'+(W-6)+'" y2="26" stroke="#211E1A" stroke-width="1"/>';
  // rack ears
  s += '<circle cx="14" cy="16" r="3" fill="none" stroke="#211E1A"/><circle cx="'+(W-14)+'" cy="16" r="3" fill="none" stroke="#211E1A"/>';
  // knob row
  const n = u.knobs, span = u.meter ? 118 : W-56, x0 = 32;
  for(let i=0;i<n;i++){
    const x = n===1 ? x0+span/2 : x0 + (i/(n-1))*span;
    const a = (-120 + (0.22+0.6*((i*37)%10)/10)*240) * Math.PI/180;
    s += '<circle cx="'+x.toFixed(1)+'" cy="62" r="12" fill="#171514"/>';
    s += '<line x1="'+x.toFixed(1)+'" y1="62" x2="'+(x+Math.sin(a)*8).toFixed(1)+'" y2="'+(62-Math.cos(a)*8).toFixed(1)+'" stroke="#FAF7F0" stroke-width="1.6" stroke-linecap="round"/>';
    s += '<line x1="'+x.toFixed(1)+'" y1="80" x2="'+x.toFixed(1)+'" y2="86" stroke="#A9A093" stroke-width="1"/>';
  }
  // window
  if(u.meter==="vu"){
    s += '<rect x="168" y="40" width="60" height="44" fill="#F0EBE1" stroke="#211E1A" stroke-width="1"/>';
    s += '<path d="M176 78 A34 34 0 0 1 220 78" fill="none" stroke="#211E1A" stroke-width="1"/>';
    s += '<path d="M212 60 A34 34 0 0 1 220 78" fill="none" stroke="#B0663F" stroke-width="1.8"/>';
    s += '<line x1="198" y1="80" x2="184" y2="58" stroke="#211E1A" stroke-width="1.2"/>';
  } else if(u.meter==="curve"){
    s += '<rect x="168" y="40" width="60" height="44" fill="#F0EBE1" stroke="#211E1A" stroke-width="1"/>';
    s += '<path d="M172 76 C188 76 192 50 204 50 C214 50 218 56 224 68" fill="none" stroke="#211E1A" stroke-width="1.4"/>';
    s += '<path d="M172 80 H224" stroke="#DFD7C9" stroke-width="1"/>';
  }
  s += '</svg>';
  return s;
}

function renderRack(hostId){
  const host = document.getElementById(hostId);
  if(!host) return;
  OLDSCHOOL.forEach((u,i)=>{
    const d = document.createElement("article");
    d.className = "rackunit";
    d.innerHTML =
      '<div class="rackface">'+rackFace(u)+'</div>'+
      '<div class="racktop"><h3>'+u.name+'</h3><span class="ref">OS-'+String(i+1).padStart(2,"0")+'</span></div>'+
      '<div class="lbl">'+u.kind+'</div>';
    host.appendChild(d);
  });
}

/* Wire every [data-ls] link to the Payhip overlay checkout.
   Payhip needs class="payhip-buy-button" and data-product="<code>" on the
   anchor; payhip.js binds the overlay on load. Set each product's `url`
   to its Payhip page and `payhip` to its product code. */
function wireCheckout(){
  document.querySelectorAll("a[data-ls]").forEach(a=>{
    const href = a.getAttribute("href");
    if(!href || href==="#") a.href = PROMO_URL;
    if(a.href.indexOf("payhip.com")>-1){
      a.classList.add("payhip-buy-button");
      if(!a.dataset.theme) a.dataset.theme = "none";
      if(!a.dataset.product){
        const m = a.href.match(/payhip\.com\/b\/([A-Za-z0-9]+)/);
        if(m) a.dataset.product = m[1];
      }
    }
  });
}

/* Facade video — loads the iframe only on click, so YouTube sets no
   cookies and drops no ~1MB of script on people who never press play. */
function mountVideo(hostId, id, label){
  const host = document.getElementById(hostId);
  if(!host) return;
  const vid = id || PROMO_VIDEO;
  const what = (label || "Old School Series")+" demo";
  host.innerHTML =
    '<button class="vplay" aria-label="Play the '+what+'">'+
      '<img src="https://i.ytimg.com/vi/'+vid+'/maxresdefault.jpg" alt="" loading="lazy">'+
      '<span class="vbtn"><svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">'+
        '<circle cx="22" cy="22" r="21" fill="none" stroke="#F0EBE1" stroke-width="1.5"/>'+
        '<path d="M17 13 L32 22 L17 31 Z" fill="#F0EBE1"/></svg></span>'+
    '</button>';
  host.querySelector(".vplay").addEventListener("click", ()=>{
    host.innerHTML =
      '<iframe src="https://www.youtube-nocookie.com/embed/'+vid+'?autoplay=1&rel=0&modestbranding=1" '+
      'title="'+what+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; '+
      'encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  });
}

/* ============================================================
   Homepage hero — schematic knobs, meter, response curve
   Runs only if the hero SVG is on the page.
   ============================================================ */
(function hero(){
  const knobLayer = document.getElementById("knobs");
  if(!knobLayer) return;

  const CONTROLS = [
    { id:"twist",  x:145, label:"Twist",      unit:"%",  v:0.00, },
    { id:"move",   x:300, label:"Move",       unit:"%",  v:0.34 },
    { id:"pump",   x:470, label:"Pump",       unit:"pat",v:0.25 },
    { id:"spread", x:620, label:"Spread",     unit:"%",  v:0.52 },
    { id:"cello",  x:780, label:"Cellophane", unit:"%",  v:0.40 },
    { id:"tang",   x:905, label:"Tangerine",  unit:"%",  v:0.28 }
  ];
  const STAGES = [
    { at:0.00, head:"Nothing yet.",        body:"That is also a setting. Most people stop here and call it a preset." },
    { at:0.18, head:"Something moved.",    body:"Not enough to matter on a phone speaker. Keep going." },
    { at:0.42, head:"Now it has a shape.", body:"This is where most units are supposed to live. Yours does not have to." },
    { at:0.68, head:"Past polite.",        body:"The stage before it is being driven, and the wire in between knows it." },
    { at:0.88, head:"True.",               body:"Save it. Name it something you will recognize at two in the morning." }
  ];

  const NS = "http://www.w3.org/2000/svg";
  const KY = 268, KR = 30;
  const el = (n,a)=>{ const e=document.createElementNS(NS,n); for(const k in a) e.setAttribute(k,a[k]); return e; };

  const meterName = document.getElementById("meterName");
  const meterVal  = document.getElementById("meterVal");
  const needle    = document.getElementById("needle");
  const stageNote = document.getElementById("stageNote");
  const curve     = document.getElementById("curve");
  const satFill   = document.getElementById("satFill");
  const W0=14, W1=546, Y0=79, H=54;

  CONTROLS.forEach(c=>{
    const g = el("g",{class:"knob-hit",tabindex:"0",role:"slider","aria-label":c.label,"aria-valuemin":"0","aria-valuemax":"100"});
    g.appendChild(el("circle",{class:"knob-ring",cx:c.x,cy:KY,r:KR+3,fill:"none",stroke:"transparent"}));
    g.appendChild(el("circle",{cx:c.x,cy:KY,r:KR,fill:"#171514"}));
    c.ptr = el("line",{x1:c.x,y1:KY,x2:c.x,y2:KY-KR+7,stroke:"#FAF7F0","stroke-width":"2.2","stroke-linecap":"round"});
    g.appendChild(c.ptr);
    const lab = el("text",{x:c.x,y:KY+KR+20,"text-anchor":"middle","font-family":"IBM Plex Sans, sans-serif","font-size":"10.5","letter-spacing":"2.2",fill:"#6B635A"});
    lab.textContent = c.label.toUpperCase();
    g.appendChild(lab);
    c.val = el("text",{x:c.x,y:KY+KR+38,"text-anchor":"middle","font-family":"IBM Plex Mono, monospace","font-size":"12.5",fill:"#211E1A"});
    g.appendChild(c.val);
    knobLayer.appendChild(g);
    c.node = g;

    let startY=0, startV=0, dragging=false;
    g.addEventListener("pointerdown", e=>{ dragging=true; startY=e.clientY; startV=c.v; g.setPointerCapture(e.pointerId); e.preventDefault(); });
    g.addEventListener("pointermove", e=>{ if(dragging) set(c, startV + (startY-e.clientY)/180); });
    g.addEventListener("pointerup",   ()=>dragging=false);
    g.addEventListener("pointercancel",()=>dragging=false);
    g.addEventListener("keydown", e=>{
      const s = e.shiftKey ? 0.01 : 0.05;
      if(e.key==="ArrowUp"||e.key==="ArrowRight"){ set(c,c.v+s); e.preventDefault(); }
      if(e.key==="ArrowDown"||e.key==="ArrowLeft"){ set(c,c.v-s); e.preventDefault(); }
    });
  });

  function set(c,v){
    c.v = Math.max(0,Math.min(1,v));
    const a = (-140 + c.v*280) * Math.PI/180;
    c.ptr.setAttribute("x2", (c.x + Math.sin(a)*(KR-7)).toFixed(2));
    c.ptr.setAttribute("y2", (KY  - Math.cos(a)*(KR-7)).toFixed(2));
    c.val.textContent = c.unit==="pat" ? String(1+Math.round(c.v*7)) : Math.round(c.v*100)+" %";
    c.node.setAttribute("aria-valuenow", Math.round(c.v*100));
    focusMeter(c); drawCurve();
  }

  function focusMeter(c){
    meterName.textContent = c.label.toLowerCase();
    meterVal.textContent  = c.unit==="pat" ? "pattern "+(1+Math.round(c.v*7)) : Math.round(c.v*100)+" %";
    const a = (-58 + c.v*116) * Math.PI/180;
    needle.setAttribute("x2", (170 + Math.sin(a)*98).toFixed(2));
    needle.setAttribute("y2", (116 - Math.cos(a)*98).toFixed(2));
    let s = STAGES[0];
    STAGES.forEach(st=>{ if(c.v >= st.at) s = st; });
    stageNote.innerHTML = "<b>"+s.head+"</b> "+s.body;
  }

  const bell = (f,fc,q,g)=>{ const x=Math.log2(f/fc); return g*Math.exp(-(x*x)/(2*q*q)); };
  function shape(f){
    const move=CONTROLS[1].v, pump=CONTROLS[2].v, spr=CONTROLS[3].v, cel=CONTROLS[4].v, tang=CONTROLS[5].v;
    let g = 0;
    g += bell(f,70,1.1,-0.30+move*1.5);
    g += bell(f,420,1.4,pump*0.7-0.2);
    g += bell(f,2200,1.2,cel*1.2);
    g += bell(f,9000,1.0,spr*1.1+tang*0.9);
    g -= Math.max(0,Math.log2(f/16000))*2.2;
    return g;
  }
  function path(scale){
    let d="";
    for(let i=0;i<=120;i++){
      const t=i/120, f=20*Math.pow(1000,t), x=W0+t*(W1-W0);
      const y=Y0-shape(f)*H*0.42*scale;
      d += (i?" L":"M")+x.toFixed(1)+" "+Math.max(6,Math.min(150,y)).toFixed(1);
    }
    return d;
  }
  function drawCurve(){
    curve.setAttribute("d", path(1));
    satFill.setAttribute("d", path(0.55)+" L"+W1+" 150 L"+W0+" 150 Z");
  }

  // meter ticks
  const ticks = document.getElementById("meterTicks");
  for(let i=0;i<=10;i++){
    const a=(-58+(i/10)*116)*Math.PI/180, r0=112, r1=(i%5===0)?100:106;
    ticks.appendChild(el("line",{
      x1:(170+Math.sin(a)*r0).toFixed(1), y1:(116-Math.cos(a)*r0).toFixed(1),
      x2:(170+Math.sin(a)*r1).toFixed(1), y2:(116-Math.cos(a)*r1).toFixed(1),
      stroke: i>=9 ? "#B0663F" : "#211E1A"
    }));
  }

  CONTROLS.forEach(c=>set(c,c.v));
  focusMeter(CONTROLS[0]);
})();

/* site.js loads at the end of <body>, so every static data-win hook is
   already in the DOM. Rendered content handles WINDOWS itself. */
applyWindows();
