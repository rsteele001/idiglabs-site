/* ============================================================
   iDigLabs — shared data + renderers
   EDIT ONLY THE PRODUCTS ARRAY. Everything else is plumbing.
   price + url are PLACEHOLDERS until real Payhip links land.
   group: "instruments" | "plugins" | "software"
   status: "" | "new" | "soon"
   art: transformer | ladder | wave | fm | chain | stack | folder | tag | disc
   ============================================================ */

const PRODUCTS = [

  /* ---------------- INSTRUMENTS ---------------- */
  { group:"instruments", ref:"IDL-201", name:"Pulsar-6", art:"wave", status:"",
    kind:"polyphonic synthesiser · six voices", price:69, url:"#",
    copy:"Six voices and an SSM-style low-pass, plus three things the original never had: <b>Move</b> for tempo-locked per-parameter drift, <b>Pump</b> for triggered patterns locked to host position, <b>Spread</b> for width that survives a fold to mono." },

  { group:"instruments", ref:"IDL-202", name:"Kaleidoscope", art:"stack", status:"soon",
    kind:"wavetable synthesiser", price:69, url:"#",
    copy:"Five tables, 128 frames deep, ten mip levels so the top octave stays clean. <b>Table</b>, <b>Shuffle</b> and <b>Scan</b> are the whole interface. Built on the Pulsar-6 voice, so the filter and the effects are the ones you already know." },

  { group:"instruments", ref:"IDL-203", name:"Raven", art:"ladder", status:"",
    kind:"monophonic lead · bass music", price:49, url:"#",
    copy:"Four corners — Reese, screech, growl, mangle — and an XY puck to sit anywhere between them. Hard resonance, four-times oversampled, a wobble LFO phase-locked to the host, and a sixteen-step gate you draw yourself." },

  { group:"instruments", ref:"IDL-204", name:"Lucy", art:"wave", status:"", family:"discovery",
    kind:"virtual-analog · discovery instrument", price:49, url:"#",
    copy:"No exposed envelopes. Three macros — <b>Prism</b>, <b>Kaleidoscope</b>, <b>Cellophane</b> — and a <b>Diamonds</b> button that throws the whole patch. Twist until you love it, then save. That is the entire method." },

  { group:"instruments", ref:"IDL-205", name:"Tekno", art:"ladder", status:"",
    kind:"monophonic bass", price:39, url:"#",
    copy:"A four-pole ladder, a sub that stays under the kick, and glide that behaves at the bottom of the keyboard. One job. It has no randomiser and does not need one." },

  { group:"instruments", ref:"IDL-206", name:"Axel", art:"fm", status:"", family:"discovery",
    kind:"frequency modulation · dark", price:39, url:"#",
    copy:"Metal, wood, and the low end that comes with them. <b>Forge</b> is the soft-saturation stage the whole catalogue is built on — this is where it first shipped." },

  { group:"instruments", ref:"IDL-207", name:"Trixie", art:"fm", status:"", family:"discovery",
    kind:"frequency modulation · glassy", price:39, url:"#",
    copy:"Bells, keys, and air. The other side of the same engine as Axel, voiced upward instead of down. Two units, one architecture, no overlap." },

  /* ---------------- PLUGINS (processors) ---------------- */
  { group:"plugins", ref:"IDL-101", name:"Brick", art:"transformer", status:"new",
    kind:"transformer · equivalent circuit · type BV-1", price:49, url:"#",
    copy:"Nickel or steel, and the whole network hanging off it — leakage inductance, magnetising inductance, core loss, winding capacitance, source and load impedance. Drive it and it behaves like iron, not like a curve someone drew." },

  { group:"plugins", ref:"IDL-102", name:"Matrix:Endgame", art:"chain", status:"",
    kind:"master bus · four stages", price:59, url:"#",
    copy:"Saturation, glue, width, ceiling — in that order, because that is the order that works. Three saturation profiles at stage three. The last plug-in on the chain and the last decision you make." },

  { group:"plugins", ref:"IDL-103", name:"Trilogy", art:"chain", status:"",
    kind:"effects · three modes", price:39, url:"#",
    copy:"<b>Cellophane</b> puts a sound behind glass. <b>Tangerine</b> widens it without breaking mono. <b>Swirl</b> moves it. Three modes, one window, no menu diving." },

  { group:"plugins", ref:"IDL-104", name:"Old School", art:"stack", status:"free",
    kind:"collection · ten units · free", price:0, url:"oldschool.html",
    copy:"Modelling the boxes is the easy half. What nobody models is the wire between them — transformers loading the input, cable capacitance rolling the top, one stage driven hot into the next. All ten built as one chain. <b>Free, with a perpetual licence. No trial, no expiry, no catch.</b>" },

  /* ---------------- UTILITY SOFTWARE ---------------- */
  { group:"software", ref:"IDL-301", name:"Lost &amp; Found", art:"folder", status:"",
    kind:"macOS app · Kontakt library browser", price:39, url:"#",
    copy:"Finds every Kontakt library on every drive, including the ones the installer lost, and sorts them by the vendor who actually made them. Drag in anything the scan missed and it stays put. No account, no catalogue, no storefront." },

  { group:"software", ref:"IDL-302", name:"Tag &amp; Find", art:"tag", status:"",
    kind:"macOS app · audio file browser", price:39, url:"#",
    copy:"Your tags, not somebody's metadata scheme. Waveform preview, drag straight into the session, and folders that reconcile themselves when you move a drive. Seventy thousand files and it still opens instantly." },

  { group:"software", ref:"IDL-303", name:"Scan and Clean", art:"disc", status:"soon",
    kind:"macOS app · drive maintenance", price:29, url:"#",
    copy:"An audio-aware cleaner that knows the difference between a cache file and a session render. Nothing is deleted outright — it goes to the <b>Grave-Yard</b> first, and comes back if you were wrong." }
];

/* ============================================================
   FAMILIES — bundles. members must match product `name` exactly.
   ============================================================ */
const FAMILIES = [
  { id:"discovery", group:"instruments", ref:"IDL-B01",
    name:"Discovery Series", kind:"bundle · three instruments · one architecture",
    members:["Lucy","Trixie","Axel"], price:99, url:"#",
    copy:"Same voice, three temperaments. No exposed envelopes on any of them — the envelope is baked into the category you pick, so there is nothing to dial in before you hear something. Macros, a randomiser, and a save button. <b>Lucy</b> is the analog end, <b>Axel</b> the dark FM, <b>Trixie</b> the glass. Learn one and you have learned all three." }
];

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
  { name:"Heat",       kind:"saturation",         knobs:3, meter:"vu"    },
  { name:"Deck",       kind:"tape",               knobs:4, meter:"vu"    },
  { name:"Slab",       kind:"low-end hype",       knobs:4, meter:"curve" },
  { name:"Rig",        kind:"amp &amp; cabinet",  knobs:4, meter:"curve" },
  { name:"Vice",       kind:"compressor",         knobs:4, meter:"vu"    },
  { name:"Rig Vocal",  kind:"vocal chain",        knobs:3, meter:"curve" },
  { name:"Voodoo",     kind:"modulation",         knobs:3, meter:null    },
  { name:"Crank",      kind:"drive",              knobs:2, meter:"vu"    },
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
    <g fill="#B0663F"><circle cx="222" cy="43" r="3"/></g>`,

  disc:`<g fill="none" stroke="#211E1A" stroke-width="1.2">
      <rect x="20" y="26" width="120" height="54" fill="#fff"/>
      <path d="M20 44 H140 M20 62 H140"/><circle cx="34" cy="35" r="3"/><circle cx="34" cy="53" r="3"/><circle cx="34" cy="71" r="3"/>
      <path d="M150 53 H186"/><path d="M178 47 L186 53 L178 59"/>
      <path d="M198 30 h80 v50 h-80 z" fill="#fff"/><path d="M198 42 H278"/>
      <path d="M212 56 l10 12 l10-12 M222 68 V52"/></g>
    <g font-family="IBM Plex Mono, monospace" font-size="9" fill="#B0663F"><text x="200" y="39">GRAVE-YARD</text></g>`
};

function plate(motif, vb){
  return '<svg viewBox="'+(vb||"0 0 300 96")+'" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'+(ART[motif]||"")+'</svg>';
}

/* ============================================================
   Department page renderer
   ============================================================ */
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
                : free ? '<a class="buy" href="'+p.url+'">Claim free →</a>'
                : '<a class="buy" href="'+p.url+'" data-ls>Buy — $'+p.price+'</a>';
    const tagPrice = free ? '<span class="price">Free</span>'
                          : '<span class="price">$'+p.price+'</span>';
    const art = document.createElement("article");
    art.className = "unit";
    art.innerHTML =
      '<div class="unit-plate">'+plate(p.art)+stamp+band+'</div>'+
      '<div class="unit-top"><h3>'+p.name+'</h3><span class="ref">'+p.ref+'</span></div>'+
      '<div class="lbl kind">'+p.kind+'</div>'+
      '<p>'+p.copy+'</p>'+
      '<div class="unit-foot">'+tagPrice+btn+'</div>';
    host.appendChild(art);
  });
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
function mountVideo(hostId, id){
  const host = document.getElementById(hostId);
  if(!host) return;
  const vid = id || PROMO_VIDEO;
  host.innerHTML =
    '<button class="vplay" aria-label="Play the Old School Series demo">'+
      '<img src="https://i.ytimg.com/vi/'+vid+'/maxresdefault.jpg" alt="" loading="lazy">'+
      '<span class="vbtn"><svg viewBox="0 0 44 44" width="44" height="44" aria-hidden="true">'+
        '<circle cx="22" cy="22" r="21" fill="none" stroke="#F0EBE1" stroke-width="1.5"/>'+
        '<path d="M17 13 L32 22 L17 31 Z" fill="#F0EBE1"/></svg></span>'+
    '</button>';
  host.querySelector(".vplay").addEventListener("click", ()=>{
    host.innerHTML =
      '<iframe src="https://www.youtube-nocookie.com/embed/'+vid+'?autoplay=1&rel=0&modestbranding=1" '+
      'title="Old School Series demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; '+
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
    { at:0.88, head:"True.",               body:"Save it. Name it something you will recognise at two in the morning." }
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
