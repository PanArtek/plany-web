import { useState, useEffect, useRef, useCallback } from "react";
import {
  Building2, HeartPulse, GraduationCap, UtensilsCrossed, ArrowRight, ArrowUpRight,
  MessageSquare, Ruler, HardHat, ClipboardCheck, Send, MapPin,
  Phone, Mail, Linkedin, Instagram, Menu, X,
} from "lucide-react";

/* ─── DESIGN TOKENS ─── */
const C = {
  bg: "#0D0B09", bgAlt: "#141210", bgDeep: "#080706",
  text: "#E2D9CE", accent: "#C4A97D", accentH: "#D4BA8E",
  muted: "#9A8E7E", dim: "#5E564A", line: "#2A2622",
  error: "#C44040", inputBg: "#100E0C", inputBdr: "#2A2622",
};
const PAD = "clamp(24px,6vw,80px)";
const MAX = 1200;

/* ─── LOGO ─── */
function Logo({ size = 28, color, gap = 0.15 }) {
  const letters = ["P", "L", "A", "N", "Y"];
  const c = color || C.text;
  const r = size / 2;
  const stroke = Math.max(1, size / 18);
  const step = size + size * gap;
  const width = step * (letters.length - 1) + size;
  return (
    <svg width={width} height={size} viewBox={`0 0 ${width} ${size}`} style={{ display: "block" }}>
      {letters.map((l, i) => {
        const cx = r + i * step;
        return (
          <g key={i}>
            <circle cx={cx} cy={r} r={r - stroke / 2} fill="none" stroke={c} strokeWidth={stroke} />
            <text x={cx} y={r} textAnchor="middle" dominantBaseline="central" fill={c} style={{ fontFamily: "'Rubik One', sans-serif", fontSize: size * 0.5, fontWeight: 400 }}>{l}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── HOOKS ─── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => e.isIntersecting && setV(true), { threshold });
    o.observe(el); return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
}
function useCountUp(end, dur, go) {
  const [v, setV] = useState(0); const ran = useRef(false);
  useEffect(() => {
    if (!go || ran.current) return; ran.current = true;
    const steps = Math.ceil(dur / 16); let s = 0;
    const tick = () => { s++; setV(Math.round((1 - Math.pow(1 - s / steps, 3)) * end)); if (s < steps) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [go, end, dur]);
  return v;
}

/* ─── SHARED COMPONENTS ─── */
function SectionLabel({ text, vis }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(10px)", transition: "opacity .6s .1s,transform .6s .1s" }}>
      <div style={{ width: vis ? 36 : 0, height: 2, background: C.accent, transition: "width .6s .2s cubic-bezier(.16,1,.3,1)" }} />
      <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: C.dim, letterSpacing: ".1em", textTransform: "uppercase" }}>{text}</span>
    </div>
  );
}
function SectionTitle({ children, vis, delay = 0.2 }) {
  return (
    <h2 style={{ fontFamily: "'Newsreader',serif", fontWeight: 800, fontSize: "clamp(26px,4vw,42px)", color: C.text, lineHeight: 1.05, letterSpacing: "-.03em", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: `opacity .6s ${delay}s,transform .6s ${delay}s` }}>
      {children}
    </h2>
  );
}
function Noise() {
  const c = useRef(null);
  useEffect(() => {
    const ctx = c.current?.getContext("2d"); if (!ctx) return;
    c.current.width = 200; c.current.height = 200;
    const img = ctx.createImageData(200, 200);
    for (let i = 0; i < img.data.length; i += 4) { const v = Math.random() * 255; img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 16; }
    ctx.putImageData(img, 0, 0);
  }, []);
  return <canvas ref={c} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .45, pointerEvents: "none", mixBlendMode: "overlay" }} />;
}

/* ━━━━━ 1. NAV ━━━━━ */
const NAV = [
  { label: "Specjalizacje", id: "spec" }, { label: "Realizacje", id: "real" },
  { label: "Proces", id: "proc" }, { label: "Kontakt", id: "kontakt" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 60, padding: `0 ${PAD}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(8,7,6,.88)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent", transition: "all .4s" }}>
      <button onClick={() => go("hero")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}><Logo size={26} /></button>
      {/* Desktop */}
      <div className="nd" style={{ display: "flex", gap: 28, alignItems: "center" }}>
        {NAV.map(n => (
          <button key={n.id} onClick={() => go(n.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 400, color: C.muted, letterSpacing: ".05em", textTransform: "uppercase", transition: "color .2s", padding: "4px 0" }}
            onMouseEnter={e => e.target.style.color = C.text} onMouseLeave={e => e.target.style.color = C.muted}>{n.label}</button>
        ))}
        <button onClick={() => go("kontakt")} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: ".05em", textTransform: "uppercase", padding: "8px 18px", background: C.accent, color: "#fff", border: "none", cursor: "pointer", transition: "background .2s" }}
          onMouseEnter={e => e.target.style.background = C.accentH} onMouseLeave={e => e.target.style.background = C.accent}>Wycena</button>
      </div>
      {/* Burger */}
      <button className="nb" onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 4 }}>
        {open ? <X size={22} color={C.text} /> : <Menu size={22} color={C.text} />}
      </button>
      {open && (
        <div style={{ position: "absolute", top: 60, left: 0, right: 0, background: "rgba(8,7,6,.96)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${C.line}`, padding: `16px ${PAD}`, display: "flex", flexDirection: "column", gap: 14 }}>
          {NAV.map(n => <button key={n.id} onClick={() => go(n.id)} style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: C.muted, letterSpacing: ".04em", textTransform: "uppercase", padding: "4px 0" }}>{n.label}</button>)}
        </div>
      )}
    </nav>
  );
}

/* ━━━━━ 2. HERO ━━━━━ */
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const ani = (d) => ({ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(18px)", transition: `opacity .8s ${d}s,transform .8s ${d}s` });

  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", justifyContent: "center", overflow: "hidden" }}>
      <Noise />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 60% at 70% 40%,rgba(13,11,9,.9) 0%,transparent 70%),radial-gradient(ellipse 50% 50% at 20% 80%,rgba(196,169,125,.04) 0%,transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, opacity: .025, backgroundImage: `linear-gradient(90deg,${C.muted} 1px,transparent 1px),linear-gradient(0deg,${C.muted} 1px,transparent 1px)`, backgroundSize: "clamp(60px,8vw,100px) clamp(60px,8vw,100px)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2, padding: `0 ${PAD}`, maxWidth: 900 }}>
        <div style={{ ...ani(.2), display: "flex", alignItems: "center", gap: 0, marginBottom: 32, flexWrap: "wrap" }}>
          {["Projekt", "PLANY", "Przestrzeń"].map((w, i) => (
            <div key={w} style={{ display: "flex", alignItems: "center" }}>
              {i > 0 && <div style={{ width: "clamp(20px,3vw,40px)", height: 1, background: C.accent, margin: "0 clamp(8px,1.2vw,16px)", opacity: .5 }} />}
              {w === "PLANY" ? (
                <Logo size={22} color={C.accent} />
              ) : (
                <span style={{
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: "clamp(11px,1.1vw,13px)",
                  fontWeight: 400,
                  color: C.dim,
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                }}>{w}</span>
              )}
            </div>
          ))}
        </div>
        <h1 style={{ ...ani(.6), fontFamily: "'Newsreader',serif", fontWeight: 800, fontSize: "clamp(38px,7vw,76px)", color: C.text, lineHeight: .9, letterSpacing: "-.04em", marginBottom: 12 }}>
          Realizujemy<br /><span style={{ color: C.accent }}>PLANY</span>
        </h1>
        <p style={{ ...ani(.75), fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(14px,1.6vw,17px)", fontWeight: 300, color: C.muted, lineHeight: 1.65, maxWidth: 520, marginBottom: 12 }}>
          Budowa wnętrz komercyjnych — jeden zespół, jeden termin,<br />pełna kontrola kosztów.
        </p>
        <p style={{ ...ani(.8), fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "clamp(11px,1.1vw,13px)", fontWeight: 400, color: C.dim, letterSpacing: ".04em", marginBottom: 40 }}>
          Biura · Medycyna · Edukacja · Gastronomia · Retail · i inne
        </p>
        <div style={{ ...ani(.9), display: "flex", alignItems: "center", gap: 24 }}>
          <button onClick={() => go("kontakt")} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", padding: "14px 32px", background: C.accent, color: "#fff", border: "none", cursor: "pointer", transition: "background .25s" }}
            onMouseEnter={e => e.target.style.background = C.accentH} onMouseLeave={e => e.target.style.background = C.accent}>Porozmawiajmy</button>
          <button onClick={() => go("real")} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: C.dim, letterSpacing: ".04em", transition: "color .2s" }}
            onMouseEnter={e => e.target.style.color = C.muted} onMouseLeave={e => e.target.style.color = C.dim}>Realizacje ↓</button>
        </div>
      </div>
      {/* Stats bar */}
      <HeroStats loaded={loaded} />
      {/* Scroll indicator */}
      <div style={{ position: "absolute", right: PAD, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: loaded ? .25 : 0, transition: "opacity 1s 1.2s", zIndex: 2 }} className="scroll-ind">
        <div style={{ width: 1, height: 36, background: C.dim }} />
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 9, color: C.dim, letterSpacing: ".1em", textTransform: "uppercase", writingMode: "vertical-rl" }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: C.dim }} />
      </div>
    </section>
  );
}
function HeroStats({ loaded }) {
  const stats = [{ v: "10+", l: "lat doświadczenia" }, { v: "30", l: "osób w zespole" }, { v: "200+", l: "zrealizowanych projektów" }];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: `1px solid ${C.line}`, padding: `32px ${PAD}`, zIndex: 2 }}>
      <div className="hero-stats" style={{ display: "grid", gridTemplateColumns: "repeat(3,auto)", gap: "clamp(28px,6vw,80px)", maxWidth: 560 }}>
        {stats.map((s, i) => (
          <div key={s.l} style={{ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(14px)", transition: `opacity .7s ${1 + i * .15}s,transform .7s ${1 + i * .15}s` }}>
            <div style={{ fontFamily: "'Newsreader',serif", fontWeight: 700, fontSize: "clamp(26px,3.5vw,38px)", color: C.text, lineHeight: 1, marginBottom: 4 }}>{s.v}</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: C.dim, letterSpacing: ".04em", textTransform: "uppercase" }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ━━━━━ 3. SPECJALIZACJE ━━━━━ */
const SPECS = [
  { icon: Building2, tag: "01", title: "Biura i przestrzenie komercyjne", pts: ["Fit-out biur od 100 m² do 5000 m²", "Generalny wykonawca i podwykonawca", "Współpraca z deweloperami i korporacjami", "Realizacje pod klucz — od projektu po odbiór"] },
  { icon: HeartPulse, tag: "02", title: "Kliniki medyczne", pts: ["Gabinety dentystyczne, kliniki weterynaryjne", "Zgodność z normami PN-HD 60364-7-710", "Instalacje specjalistyczne — RTG, CT, HVAC", "Ochrona radiologiczna i wentylacja sterylna"] },
  { icon: UtensilsCrossed, tag: "03", title: "Lokale gastronomiczne", pts: ["Restauracje, bary, food halle, kioski", "Instalacje wod-kan, wentylacja kuchenna", "Posadzki przemysłowe i okładziny", "Odbiory sanepid i PPOŻ"] },
  { icon: GraduationCap, tag: "04", title: "Obiekty edukacyjne", pts: ["Szkoły prywatne i przedszkola", "Bezpieczeństwo pożarowe, normy WT", "Ergonomia przestrzeni dla dzieci", "Trwałe materiały odporne na eksploatację"] },
];
function SpecCard({ s, i, vis }) {
  const [h, setH] = useState(false); const Icon = s.icon; const d = .15 + i * .12;
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: "relative", background: h ? "#1C1A16" : C.bgAlt, border: `1px solid ${h ? C.dim : C.line}`, padding: "clamp(28px,3vw,40px)", display: "flex", flexDirection: "column", transition: `all .35s,opacity .6s ${d}s,transform .6s ${d}s`, opacity: vis ? 1 : 0, transform: vis ? (h ? "translateY(-3px)" : "translateY(0)") : "translateY(22px)", cursor: "default" }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: h ? "100%" : 0, height: 2, background: C.accent, transition: "width .5s cubic-bezier(.16,1,.3,1)" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: C.dim, letterSpacing: ".08em" }}>{s.tag}</span>
        <Icon size={18} strokeWidth={1.5} color={h ? C.accent : C.dim} style={{ transition: "color .3s" }} />
      </div>
      <h3 style={{ fontFamily: "'Newsreader',serif", fontWeight: 700, fontSize: "clamp(17px,1.8vw,21px)", color: C.text, lineHeight: 1.15, letterSpacing: "-.015em", marginBottom: 18 }}>{s.title}</h3>
      <div style={{ width: "100%", height: 1, background: C.line, marginBottom: 18 }} />
      <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
        {s.pts.map((p, j) => <li key={j} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 300, color: C.muted, lineHeight: 1.55, paddingLeft: 14, position: "relative" }}><span style={{ position: "absolute", left: 0, top: 8, width: 5, height: 1, background: C.dim }} />{p}</li>)}
      </ul>
      <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", color: h ? C.accent : C.dim, textDecoration: "none", transition: "color .3s", marginTop: "auto" }}>
        Zobacz realizacje <ArrowRight size={12} strokeWidth={2} style={{ transition: "transform .3s", transform: h ? "translateX(4px)" : "translateX(0)" }} />
      </a>
    </div>
  );
}
function Specjalizacje() {
  const [ref, vis] = useInView();
  const [ref2, vis2] = useInView();
  return (
    <section id="spec" style={{ background: C.bg, padding: `clamp(64px,10vw,120px) ${PAD}`, borderTop: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: MAX, margin: "0 auto" }}>
        <div ref={ref} style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
          <SectionLabel text="Specjalizacje" vis={vis} />
          <SectionTitle vis={vis}>Cztery branże,<br />jeden standard.</SectionTitle>
        </div>
        <div ref={ref2} className="spec-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "clamp(12px,2vw,20px)" }}>
          {SPECS.map((s, i) => <SpecCard key={s.tag} s={s} i={i} vis={vis2} />)}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━ 4. REALIZACJE ━━━━━ */
const PROJECTS = [
  { name: "Star Dental", loc: "Marynarska Point 2", area: "310 m²", cat: "Kliniki", grad: "linear-gradient(135deg,#1a1612,#2a1f18,#1c1410)" },
  { name: "PGE", loc: "ul. Ogrodowa 59A", area: "450 m²", cat: "Biura", grad: "linear-gradient(135deg,#12141a,#181c24,#101318)" },
  { name: "LUXVET", loc: "ul. Ostródzka", area: "280 m²", cat: "Kliniki", grad: "linear-gradient(135deg,#141a16,#1a2420,#101812)" },
  { name: "Hala Koszyki", loc: "Crazy Butcher", area: "290 m²", cat: "Komercyjne", grad: "linear-gradient(135deg,#1a1616,#241a1a,#181010)" },
  { name: "R34 Notariusz", loc: "ul. Rzymowskiego 34", area: "150 m²", cat: "Biura", grad: "linear-gradient(135deg,#16161a,#1c1c24,#121218)" },
  { name: "Szkoła Montessori", loc: "Wawer", area: "400 m²", cat: "Edukacja", grad: "linear-gradient(135deg,#181a14,#20241a,#141810)" },
];
const FILTERS = ["Wszystkie", "Biura", "Kliniki", "Edukacja", "Komercyjne"];

function ProjCard({ p, i }) {
  const [h, setH] = useState(false);
  const [ref, vis] = useInView();
  return (
    <div ref={ref} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: `opacity .5s ${i * .08}s,transform .5s ${i * .08}s`, cursor: "pointer" }}>
      <div style={{ position: "relative", aspectRatio: "4/3", background: p.grad, overflow: "hidden", marginBottom: 14 }}>
        <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: `linear-gradient(90deg,${C.muted} 1px,transparent 1px),linear-gradient(0deg,${C.muted} 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: h ? 0 : .12, transition: "opacity .3s" }}>
          <span style={{ fontFamily: "'Newsreader',serif", fontWeight: 800, fontSize: 26, color: C.text }}>{p.area}</span>
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(196,169,125,.85)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: h ? 1 : 0, transition: "opacity .3s" }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 500, color: "#fff", letterSpacing: ".06em", textTransform: "uppercase" }}>Zobacz więcej</span>
          <ArrowUpRight size={14} strokeWidth={2} color="#fff" />
        </div>
        <div style={{ position: "absolute", top: 10, left: 10, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, color: C.muted, background: "rgba(8,7,6,.7)", backdropFilter: "blur(8px)", padding: "4px 9px", letterSpacing: ".05em", textTransform: "uppercase", opacity: h ? 0 : 1, transition: "opacity .3s" }}>{p.cat}</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <h3 style={{ fontFamily: "'Newsreader',serif", fontWeight: 700, fontSize: "clamp(15px,1.5vw,18px)", color: h ? C.accent : C.text, letterSpacing: "-.01em", marginBottom: 3, transition: "color .3s" }}>{p.name}</h3>
          <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 300, color: C.dim }}>{p.loc}</p>
        </div>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: C.dim, whiteSpace: "nowrap" }}>{p.area}</span>
      </div>
    </div>
  );
}
function Realizacje() {
  const [active, setActive] = useState("Wszystkie");
  const [ref, vis] = useInView();
  const filtered = active === "Wszystkie" ? PROJECTS : PROJECTS.filter(p => p.cat === active);
  return (
    <section id="real" style={{ background: C.bg, padding: `clamp(64px,10vw,120px) ${PAD}`, borderTop: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: MAX, margin: "0 auto" }}>
        <div ref={ref} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: "clamp(36px,5vw,56px)" }}>
          <div>
            <SectionLabel text="Portfolio" vis={vis} />
            <SectionTitle vis={vis}>Nasze realizacje</SectionTitle>
          </div>
          <div className="filter-bar" style={{ display: "flex", gap: 8, flexWrap: "wrap", opacity: vis ? 1 : 0, transition: "opacity .6s .35s" }}>
            {FILTERS.map(f => <button key={f} onClick={() => setActive(f)} className="fbtn" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, fontWeight: active === f ? 500 : 400, letterSpacing: ".04em", textTransform: "uppercase", padding: "8px 14px", background: active === f ? C.accent : "transparent", color: active === f ? "#fff" : C.dim, border: `1px solid ${active === f ? C.accent : C.line}`, cursor: "pointer", transition: "all .25s" }}>{f}</button>)}
          </div>
        </div>
        <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: "clamp(14px,2.5vw,24px)" }}>
          {filtered.map((p, i) => <ProjCard key={p.name + active} p={p} i={i} />)}
        </div>
        <div style={{ marginTop: "clamp(28px,4vw,44px)", paddingTop: 20, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, color: C.dim }}>{filtered.length} {filtered.length === 1 ? "projekt" : filtered.length < 5 ? "projekty" : "projektów"}</span>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━ 5. PROCES ━━━━━ */
const STEPS = [
  { n: "01", icon: MessageSquare, t: "Konsultacja", d: "Bezpłatna wizja lokalna, analiza potrzeb, wstępna wycena w 48h." },
  { n: "02", icon: Ruler, t: "Projekt", d: "Harmonogram, kosztorys szczegółowy, dobór materiałów i podwykonawców." },
  { n: "03", icon: HardHat, t: "Realizacja", d: "Własna ekipa 30 osób + sprawdzeni podwykonawcy. Nadzór dzienny." },
  { n: "04", icon: ClipboardCheck, t: "Odbiór", d: "Dokumentacja powykonawcza, protokoły, gwarancja i serwis." },
];
function StepCard({ s, i, vis }) {
  const [h, setH] = useState(false); const Icon = s.icon; const del = .12 + i * .1;
  return (
    <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ position: "relative", flex: 1, minWidth: 0, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(18px)", transition: `opacity .6s ${del}s,transform .6s ${del}s` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontFamily: "'Newsreader',serif", fontWeight: 800, fontSize: 30, color: h ? C.accent : C.line, lineHeight: 1, transition: "color .35s", letterSpacing: "-.03em" }}>{s.n}</span>
        <Icon size={15} strokeWidth={1.5} color={h ? C.accent : C.dim} style={{ transition: "color .3s" }} />
      </div>
      <div style={{ width: h ? 28 : 16, height: 2, background: C.accent, marginBottom: 12, transition: "width .4s cubic-bezier(.16,1,.3,1)" }} />
      <h3 style={{ fontFamily: "'Newsreader',serif", fontWeight: 700, fontSize: "clamp(16px,1.5vw,19px)", color: C.text, marginBottom: 7 }}>{s.t}</h3>
      <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 300, color: C.muted, lineHeight: 1.6, maxWidth: 260 }}>{s.d}</p>
    </div>
  );
}
function Proces() {
  const [ref, vis] = useInView();
  const [ref2, vis2] = useInView();
  return (
    <section id="proc" style={{ background: C.bg, padding: `clamp(64px,10vw,120px) ${PAD}`, borderTop: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: MAX, margin: "0 auto" }}>
        <div ref={ref} style={{ marginBottom: "clamp(40px,5vw,60px)" }}>
          <SectionLabel text="Proces" vis={vis} />
          <SectionTitle vis={vis}>Wielkie PLANY<br />zaczynają się tu.</SectionTitle>
        </div>
        <div ref={ref2} className="steps-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "clamp(20px,3vw,40px)", position: "relative" }}>
          {STEPS.map((s, i) => <StepCard key={s.n} s={s} i={i} vis={vis2} />)}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━ 6. STATS ━━━━━ */
const STATS = [
  { end: 10, sfx: "+", unit: "lat", lbl: "doświadczenia" },
  { end: 30, sfx: "", unit: "", lbl: "specjalistów w zespole" },
  { end: 200, sfx: "+", unit: "", lbl: "ukończonych projektów" },
  { end: 10, sfx: "M", unit: "PLN", lbl: "wartość projektu" },
];
function StatItem({ s, i, vis }) {
  const v = useCountUp(s.end, 1100 + i * 180, vis);
  return (
    <div style={{ textAlign: "center", opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(14px)", transition: `opacity .6s ${.08 + i * .1}s,transform .6s ${.08 + i * .1}s` }}>
      <div style={{ fontFamily: "'Newsreader',serif", fontWeight: 800, fontSize: "clamp(34px,5vw,52px)", color: C.text, lineHeight: 1, letterSpacing: "-.04em", marginBottom: 4 }}>
        {s.unit === "PLN" ? "do " : ""}{v}<span style={{ color: C.accent }}>{s.sfx}</span>
        {s.unit ? <span style={{ fontSize: "clamp(13px,1.6vw,18px)", fontWeight: 600, color: C.dim, marginLeft: 5 }}>{s.unit}</span> : null}
      </div>
      <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: C.dim, letterSpacing: ".04em", textTransform: "uppercase", marginTop: 5 }}>{s.lbl}</div>
    </div>
  );
}
function Stats() {
  const [ref, vis] = useInView();
  return (
    <section style={{ background: C.bgAlt, padding: `clamp(56px,8vw,96px) ${PAD}`, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(196,169,125,.06) 0%,transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: MAX, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(28px,4vw,44px)" }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: C.dim, letterSpacing: ".1em", textTransform: "uppercase" }}>PLANY w liczbach</span>
        </div>
        <div ref={ref} className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "clamp(16px,3vw,32px)" }}>
          {STATS.map((s, i) => <StatItem key={s.lbl} s={s} i={i} vis={vis} />)}
        </div>
      </div>
    </section>
  );
}

/* ━━━━━ 7. KONTAKT ━━━━━ */
const inputBase = { fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 400, color: C.text, background: C.inputBg, border: `1px solid ${C.inputBdr}`, padding: "11px 13px", width: "100%", outline: "none", transition: "border-color .25s,box-shadow .25s" };
const PTYPES = ["Biuro", "Klinika dentystyczna", "Klinika weterynaryjna", "Szkoła / przedszkole", "Gastronomia", "Inne"];
const AREAS = ["< 100 m²", "100–300 m²", "300–1000 m²", "1000–5000 m²", "> 5000 m²"];

function Inp({ val, set, ph, err, type = "text" }) {
  const [f, setF] = useState(false);
  return <input type={type} value={val} onChange={e => set(e.target.value)} placeholder={ph} onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ ...inputBase, borderColor: err ? C.error : f ? C.accent : C.inputBdr, boxShadow: f ? `0 0 0 1px ${(err ? C.error : C.accent) + "44"}` : "none" }} />;
}
function Sel({ val, set, opts, ph, err }) {
  const [f, setF] = useState(false);
  return <select value={val} onChange={e => set(e.target.value)} onFocus={() => setF(true)} onBlur={() => setF(false)} style={{ ...inputBase, borderColor: err ? C.error : f ? C.accent : C.inputBdr, boxShadow: f ? `0 0 0 1px ${(err ? C.error : C.accent) + "44"}` : "none", color: val ? C.text : C.dim, appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23555550' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 36, cursor: "pointer" }}>
    <option value="" disabled hidden>{ph}</option>
    {opts.map(o => <option key={o} value={o} style={{ background: C.bgAlt, color: C.text }}>{o}</option>)}
  </select>;
}
function Fld({ label, req, err, children }) {
  return <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <label style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, color: err ? C.error : C.dim, letterSpacing: ".06em", textTransform: "uppercase", transition: "color .2s" }}>{label}{req && <span style={{ color: C.accent, marginLeft: 3 }}>*</span>}</label>
    {children}
    {err && <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: C.error, fontWeight: 300 }}>{err}</span>}
  </div>;
}

function ContactForm() {
  const [f, setF] = useState({ name: "", company: "", email: "", phone: "", type: "", area: "", msg: "" });
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const s = k => v => { setF(p => ({ ...p, [k]: v })); if (errs[k]) setErrs(p => ({ ...p, [k]: null })); };
  const validate = () => {
    const e = {};
    if (!f.name.trim()) e.name = "Pole wymagane";
    if (!f.email.trim()) e.email = "Pole wymagane"; else if (!/\S+@\S+\.\S+/.test(f.email)) e.email = "Nieprawidłowy email";
    if (!f.phone.trim()) e.phone = "Pole wymagane"; else if (!/^[\d\s+\-()]{7,}$/.test(f.phone)) e.phone = "Nieprawidłowy numer";
    if (!f.type) e.type = "Wybierz typ";
    setErrs(e); return !Object.keys(e).length;
  };
  const submit = () => { if (!validate()) return; setBusy(true); setTimeout(() => { setBusy(false); setSent(true); }, 1100); };

  if (sent) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "56px 20px", textAlign: "center" }}>
      <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.accent + "18", display: "flex", alignItems: "center", justifyContent: "center" }}><Send size={17} color={C.accent} strokeWidth={1.5} /></div>
      <h3 style={{ fontFamily: "'Newsreader',serif", fontWeight: 700, fontSize: 20, color: C.text }}>Zapytanie wysłane</h3>
      <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, color: C.muted, fontWeight: 300 }}>Odpowiemy w ciągu 24h w dni robocze.</p>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Fld label="Imię i nazwisko" req err={errs.name}><Inp val={f.name} set={s("name")} ph="Jan Kowalski" err={errs.name} /></Fld>
        <Fld label="Firma"><Inp val={f.company} set={s("company")} ph="Opcjonalne" /></Fld>
      </div>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Fld label="Email" req err={errs.email}><Inp val={f.email} set={s("email")} ph="jan@firma.pl" type="email" err={errs.email} /></Fld>
        <Fld label="Telefon" req err={errs.phone}><Inp val={f.phone} set={s("phone")} ph="+48 ..." type="tel" err={errs.phone} /></Fld>
      </div>
      <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Fld label="Typ projektu" req err={errs.type}><Sel val={f.type} set={s("type")} opts={PTYPES} ph="Wybierz..." err={errs.type} /></Fld>
        <Fld label="Metraż"><Sel val={f.area} set={s("area")} opts={AREAS} ph="Wybierz..." /></Fld>
      </div>
      <Fld label="Wiadomość">
        <textarea value={f.msg} onChange={e => s("msg")(e.target.value)} placeholder="Opisz projekt..." rows={4} style={{ ...inputBase, resize: "vertical", minHeight: 90 }}
          onFocus={e => { e.target.style.borderColor = C.accent; e.target.style.boxShadow = `0 0 0 1px ${C.accent}44`; }}
          onBlur={e => { e.target.style.borderColor = C.inputBdr; e.target.style.boxShadow = "none"; }} />
      </Fld>
      <button onClick={submit} disabled={busy} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 12, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", padding: "13px 28px", background: busy ? C.dim : C.accent, color: "#fff", border: "none", cursor: busy ? "wait" : "pointer", transition: "background .25s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%" }}
        onMouseEnter={e => { if (!busy) e.target.style.background = C.accentH; }} onMouseLeave={e => { if (!busy) e.target.style.background = C.accent; }}>
        {busy ? "Wysyłanie..." : "Wyślij zapytanie"}{!busy && <Send size={13} strokeWidth={2} />}
      </button>
      <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: C.dim, fontWeight: 300 }}>Odpowiadamy w ciągu 24h. Twoje dane nie będą udostępniane.</p>
    </div>
  );
}

function ContactInfo() {
  const items = [
    { icon: MapPin, l: "Adres", v: "Warszawa, dzielnica Wawer" },
    { icon: Phone, l: "Telefon", v: "+48 XXX XXX XXX" },
    { icon: Mail, l: "Email", v: "biuro@plany.com.pl" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <Logo size={28} />
        <p style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 13, fontWeight: 300, color: C.muted, lineHeight: 1.6, marginTop: 10, maxWidth: 280 }}>Fit-out komercyjny — biura, kliniki, szkoły. Od konsultacji po klucz.</p>
      </div>
      <div style={{ width: "100%", height: 1, background: C.line }} />
      {items.map(it => { const Ic = it.icon; return (
        <div key={it.l} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <Ic size={14} strokeWidth={1.5} color={C.dim} style={{ marginTop: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, color: C.dim, letterSpacing: ".07em", textTransform: "uppercase", marginBottom: 2 }}>{it.l}</div>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, color: C.text }}>{it.v}</div>
          </div>
        </div>
      ); })}
      <div style={{ width: "100%", height: 1, background: C.line }} />
      <div style={{ width: "100%", aspectRatio: "16/9", background: C.inputBg, border: `1px solid ${C.line}`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .04, backgroundImage: `linear-gradient(90deg,${C.muted} 1px,transparent 1px),linear-gradient(0deg,${C.muted} 1px,transparent 1px)`, backgroundSize: "28px 28px" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <MapPin size={18} strokeWidth={1.2} color={C.accent} />
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: C.dim }}>Wawer, Warszawa</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {[Linkedin, Instagram].map((Ic, i) => <a key={i} href="#" style={{ width: 34, height: 34, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color .25s" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = C.accent} onMouseLeave={e => e.currentTarget.style.borderColor = C.line}><Ic size={14} strokeWidth={1.5} color={C.muted} /></a>)}
      </div>
    </div>
  );
}

function Kontakt() {
  const [ref, vis] = useInView();
  return (
    <section id="kontakt" style={{ background: "#080807", padding: `clamp(64px,10vw,120px) ${PAD}`, borderTop: `1px solid ${C.line}` }}>
      <div style={{ maxWidth: MAX, margin: "0 auto" }}>
        <div ref={ref} style={{ marginBottom: "clamp(36px,5vw,52px)" }}>
          <SectionLabel text="Kontakt" vis={vis} />
          <SectionTitle vis={vis}>Porozmawiajmy<br />o projekcie.</SectionTitle>
        </div>
        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: "clamp(28px,5vw,60px)", opacity: vis ? 1 : 0, transition: "opacity .7s .3s" }}>
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}

/* ━━━━━ 8. FOOTER ━━━━━ */
function Footer() {
  return (
    <footer style={{ background: C.bgDeep, borderTop: `1px solid ${C.line}`, padding: `24px ${PAD}` }}>
      <div className="footer-cols" style={{ maxWidth: MAX, margin: "0 auto", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "center" }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 11, color: C.dim, fontWeight: 300 }}>© 2026 PLANY Sp. z o.o.</span>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, color: C.dim }}>NIP: XXX-XXX-XX-XX</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, color: C.dim }}>KRS: XXXXXXXXXX</span>
        </div>
        <a href="#" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 10, color: C.dim, textDecoration: "none", letterSpacing: ".06em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4, transition: "color .2s", justifySelf: "end" }}
          onMouseEnter={e => e.currentTarget.style.color = C.accent} onMouseLeave={e => e.currentTarget.style.color = C.dim}>
          Na górę <ArrowUpRight size={11} strokeWidth={2} />
        </a>
      </div>
    </footer>
  );
}

/* ━━━━━ APP ━━━━━ */
export default function PLANYLanding() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&family=Rubik+One&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bg}; }
        select option { background: ${C.bgAlt}; color: ${C.text}; }
        @media(max-width:768px) {
          .nd { display:none!important; }
          .nb { display:block!important; }
          .spec-grid, .steps-row { grid-template-columns:1fr!important; }
        }
        @media(min-width:769px) and (max-width:1024px) {
          .spec-grid { grid-template-columns:repeat(2,minmax(0,1fr))!important; }
          .hero-stats { grid-template-columns:repeat(3,auto)!important; gap:20px!important; }
          .stats-row { grid-template-columns:repeat(2,minmax(0,1fr))!important; gap:28px!important; }
          .contact-grid { grid-template-columns:1fr!important; }
          .form-row { grid-template-columns:1fr!important; }
          .scroll-ind { display:none!important; }
          .footer-cols { grid-template-columns:1fr!important; text-align:center; gap:12px!important; }
          .footer-cols>*:last-child { justify-self:center!important; }
        }
        @media(max-width:960px) {
          .proj-grid { grid-template-columns:repeat(2,minmax(0,1fr))!important; }
        }
        @media(max-width:560px) {
          .proj-grid { grid-template-columns:1fr!important; }
          .filter-bar { gap:6px!important; }
          .fbtn { padding:7px 10px!important; font-size:10px!important; }
          .hero-stats { grid-template-columns:1fr!important; gap:16px!important; }
        }
        @media(min-width:769px) {
          .nb { display:none!important; }
        }
      `}</style>
      <Nav />
      <Hero />
      <Specjalizacje />
      <Realizacje />
      <Proces />
      <Stats />
      <Kontakt />
      <Footer />
    </>
  );
}
