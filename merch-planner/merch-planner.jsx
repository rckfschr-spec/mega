
import { useState, useMemo, useCallback, useRef, useEffect } from "react";

const INIT_CATS = [
  { id: "team", label: "Team Outfit", icon: "👕", items: [
    { id: "tshirt", name: "T-Shirts (Team)", purpose: "Einheitliches Auftreten", qty: 20, prices: [8, 15, 25], reusable: true },
    { id: "hoodie", name: "Hoodies (Team)", purpose: "Abends / kühles Wetter", qty: 15, prices: [18, 30, 45], reusable: true },
    { id: "trikot", name: "Sportliche Trikots", purpose: "Challenge-Starter", qty: 8, prices: [15, 30, 50], reusable: true },
    { id: "leibchen", name: "Überzieh-Leibchen", purpose: "Schnell drüber für Fotos", qty: 20, prices: [5, 10, 18], reusable: true },
    { id: "caps", name: "Caps / Snapbacks", purpose: "Sonnenschutz + Branding", qty: 20, prices: [4, 8, 15], reusable: true },
  ]},
  { id: "stand", label: "Stand-Ausstattung", icon: "⛺", items: [
    { id: "hussen", name: "Hussen (Stehtische)", purpose: "Professionelle Optik", qty: 6, prices: [15, 30, 50], reusable: true },
    { id: "liegestuhl", name: "Liegestühle (bedruckt)", purpose: "Chill-Zone am Strand", qty: 10, prices: [20, 40, 70], reusable: true },
    { id: "fahnen", name: "Beachflags / Fahnen", purpose: "Fernwirkung", qty: 4, prices: [30, 60, 120], reusable: true },
    { id: "decken", name: "Picknick-Decken", purpose: "Strand, Kinder-Ecke", qty: 15, prices: [8, 15, 25], reusable: true },
    { id: "rollup", name: "Roll-Up Banner", purpose: "Fläche in Zelten", qty: 4, prices: [40, 80, 130], reusable: true },
    { id: "schirme", name: "Sonnenschirme", purpose: "Schattenplätze", qty: 4, prices: [25, 50, 100], reusable: true },
  ]},
  { id: "premium", label: "Premium Merch", icon: "🏆", items: [
    { id: "bowl", name: "Bowls / Lunchbox", purpose: "Goodie Bag / Verlosung", qty: 30, prices: [5, 12, 22], reusable: true },
    { id: "flasche", name: "Trinkflasche (Edelstahl)", purpose: "Goodie Bag / Team", qty: 50, prices: [5, 12, 20], reusable: true },
    { id: "kaffee", name: "Kaffee-To-Go Becher", purpose: "Goodie Bag / Verlosung", qty: 50, prices: [4, 10, 18], reusable: true },
    { id: "mauspad", name: "Mauspads", purpose: "Büro / B2B-Geschenk", qty: 30, prices: [3, 6, 12], reusable: true },
    { id: "handtuch", name: "Handtücher (Mikrofaser)", purpose: "Schwimmer + Strand", qty: 50, prices: [4, 8, 15], reusable: true },
  ]},
  { id: "giveaway", label: "Giveaways", icon: "🎁", items: [
    { id: "becher", name: "Becher (Melamin)", purpose: "Streuartikel", qty: 300, prices: [0.8, 1.5, 3], reusable: false },
    { id: "ballon", name: "Luftballons", purpose: "Kinder, Hüpfburg", qty: 500, prices: [0.15, 0.3, 0.5], reusable: false },
    { id: "ball", name: "Bälle (Wasser-/Stressball)", purpose: "Strand + Kinder", qty: 200, prices: [0.8, 1.5, 3], reusable: false },
    { id: "klatsch", name: "Klatschdinger", purpose: "Stimmung bei Rennen", qty: 500, prices: [0.3, 0.6, 1], reusable: false },
    { id: "karten", name: "Kartenspiel", purpose: "Erinnerung, Wartezeit", qty: 150, prices: [2, 4, 7], reusable: true },
    { id: "samen", name: "Samen-Tütchen", purpose: "Nachhaltig, on-brand", qty: 500, prices: [0.3, 0.6, 1.2], reusable: false },
    { id: "sticker", name: "Sticker-Sets", purpose: "Branding überall", qty: 500, prices: [0.2, 0.5, 1], reusable: false },
    { id: "schluessel", name: "Schlüsselanhänger (Holz)", purpose: "Haptisch, on-brand", qty: 200, prices: [0.8, 1.5, 3], reusable: false },
    { id: "tattoo", name: "Tattoo-Sticker (temporär)", purpose: "Kinder Hüpfburg", qty: 500, prices: [0.1, 0.2, 0.4], reusable: false },
    { id: "faecher", name: "Fächer (bedruckt)", purpose: "August-Hitze", qty: 300, prices: [0.5, 1, 2], reusable: false },
    { id: "beutel", name: "Jutebeutel", purpose: "Tragetasche", qty: 200, prices: [1.5, 3, 5], reusable: true },
    { id: "flyer", name: "QR-Code Flyer", purpose: "Lead-Generierung", qty: 500, prices: [0.08, 0.15, 0.3], reusable: false },
    { id: "sonnencreme", name: "Sonnencreme-Sachets", purpose: "Nützlich, August", qty: 500, prices: [0.3, 0.5, 0.8], reusable: false },
    { id: "malbuch", name: "Kinder-Malbuch", purpose: "Hüpfburg-Bereich", qty: 100, prices: [0.8, 1.5, 3], reusable: false },
    { id: "pfeife", name: "Trillerpfeifen", purpose: "Anfeuern", qty: 200, prices: [0.3, 0.6, 1.2], reusable: false },
  ]},
  { id: "food", label: "Verpflegung", icon: "🥤", items: [
    { id: "iso", name: "Iso-Drink + Sticker", purpose: "Sportler-Erfrischung", qty: 300, prices: [0.5, 0.8, 1.5], reusable: false },
    { id: "riegel", name: "Müsliriegel + Banderole", purpose: "Snack für Sportler", qty: 300, prices: [0.3, 0.5, 0.8], reusable: false },
    { id: "wasser", name: "Wasser + Sticker", purpose: "Basis-Erfrischung", qty: 500, prices: [0.15, 0.25, 0.4], reusable: false },
  ]},
];

const TC = ["#16a34a", "#d97706", "#dc2626"];
const TL = ["Budget", "Mid", "Premium"];
let _n = 0;
const uid = () => `n${Date.now()}${_n++}`;
const eur = v => v.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " €";
const eurD = v => v.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";

function E({ value, onChange, numeric, decimal, style: s }) {
  const [on, setOn] = useState(false);
  const r = useRef();
  useEffect(() => { if (on && r.current) { r.current.focus(); r.current.select(); } }, [on]);
  if (!on) {
    const display = numeric ? (decimal ? eurD(value) : value) : value || "–";
    return <span onClick={() => setOn(true)} style={{ cursor: "pointer", borderBottom: "1px dashed #d4d0c8", paddingBottom: 1, ...s }}>{display}</span>;
  }
  return <input ref={r} type={numeric ? "number" : "text"} step={decimal ? "0.01" : undefined}
    defaultValue={value}
    style={{ border: "1px solid #d97706", borderRadius: 4, padding: "2px 5px", fontSize: "inherit", fontFamily: "inherit", background: "#fffbeb", outline: "none", width: numeric ? 58 : "100%", textAlign: numeric ? "right" : "left", ...s }}
    onBlur={e => { onChange(numeric ? (decimal ? parseFloat(e.target.value) || 0 : Math.max(0, parseInt(e.target.value) || 0)) : e.target.value); setOn(false); }}
    onKeyDown={e => e.key === "Enter" && e.target.blur()} />;
}

export default function App() {
  const [cats, setCats] = useState(INIT_CATS);
  const [ck, setCk] = useState(() => { const m = {}; INIT_CATS.forEach(c => c.items.forEach(i => m[i.id] = true)); return m; });
  const [qty, setQty] = useState(() => { const m = {}; INIT_CATS.forEach(c => c.items.forEach(i => m[i.id] = i.qty)); return m; });
  const [cp, setCp] = useState({});
  const [del, setDel] = useState(null);
  const [adding, setAdding] = useState(null);
  const [ni, setNi] = useState({ name: "", qty: "", price: "" });
  const [coll, setColl] = useState({});

  const gp = useCallback((item, t) => cp[`${item.id}-${t}`] ?? item.prices[t], [cp]);

  const totals = useMemo(() => {
    const t = [0, 0, 0];
    cats.forEach(c => c.items.forEach(i => { if (ck[i.id]) { const q = qty[i.id] || 0; for (let j = 0; j < 3; j++) t[j] += q * gp(i, j); } }));
    return t;
  }, [cats, ck, qty, cp, gp]);

  const catTotals = useMemo(() => {
    const m = {};
    cats.forEach(c => { m[c.id] = [0, 0, 0]; c.items.forEach(i => { if (ck[i.id]) { const q = qty[i.id] || 0; for (let j = 0; j < 3; j++) m[c.id][j] += q * gp(i, j); } }); });
    return m;
  }, [cats, ck, qty, cp, gp]);

  const toggleAll = v => { const m = {}; cats.forEach(c => c.items.forEach(i => m[i.id] = v)); setCk(m); };
  const toggleCat = cid => {
    const cat = cats.find(c => c.id === cid);
    const allOn = cat.items.every(i => ck[i.id]);
    setCk(p => { const n = { ...p }; cat.items.forEach(i => n[i.id] = !allOn); return n; });
  };

  const addItem = cid => {
    const name = ni.name.trim(); if (!name) return;
    const id = uid(); const price = parseFloat(ni.price) || 0; const q = parseInt(ni.qty) || 0;
    setCats(p => p.map(c => c.id === cid ? { ...c, items: [...c.items, { id, name, purpose: "", qty: q, prices: [price, price, price], reusable: false, isNew: true }] } : c));
    setCk(p => ({ ...p, [id]: true })); setQty(p => ({ ...p, [id]: q }));
    setNi({ name: "", qty: "", price: "" }); setAdding(null);
  };

  const delItem = id => {
    setCats(p => p.map(c => ({ ...c, items: c.items.filter(i => i.id !== id) })));
    setCk(p => { const n = { ...p }; delete n[id]; return n; }); setDel(null);
  };

  const updName = (id, v) => setCats(p => p.map(c => ({ ...c, items: c.items.map(i => i.id === id ? { ...i, name: v } : i) })));
  const updPurpose = (id, v) => setCats(p => p.map(c => ({ ...c, items: c.items.map(i => i.id === id ? { ...i, purpose: v } : i) })));

  const cc = Object.values(ck).filter(Boolean).length;
  const tot = cats.reduce((s, c) => s + c.items.length, 0);

  return (
    <div style={{ fontFamily: "-apple-system, 'Segoe UI', sans-serif", background: "#f6f5f1", minHeight: "100vh", color: "#333" }}>
      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e2db", padding: "20px 24px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#b45309", letterSpacing: 1.5, textTransform: "uppercase" }}>Mega-Holz</div>
            <h1 style={{ margin: "2px 0 0", fontSize: 20, fontWeight: 700, color: "#1a1a1a" }}>Merch-Planner · O-SEE Challenge 2026</h1>
            <p style={{ margin: "3px 0 0", fontSize: 12, color: "#999" }}>14.–16. Aug · Olbersdorfer See · {cc}/{tot} Artikel ausgewählt</p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {TL.map((l, i) => (
              <div key={i} style={{ textAlign: "center", padding: "6px 14px", borderRadius: 8, background: `${TC[i]}08`, border: `1px solid ${TC[i]}22` }}>
                <div style={{ fontSize: 10, color: TC[i], fontWeight: 600, letterSpacing: 0.5 }}>{l}</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: TC[i] }}>{eur(totals[i])}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          <button onClick={() => toggleAll(true)} style={pill}>Alle an</button>
          <button onClick={() => toggleAll(false)} style={pill}>Alle aus</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "16px 20px 60px" }}>
        {cats.map(cat => {
          const isC = coll[cat.id];
          const catCc = cat.items.filter(i => ck[i.id]).length;
          return (
            <div key={cat.id} style={{ marginBottom: 12 }}>
              {/* Category header */}
              <div onClick={() => setColl(p => ({ ...p, [cat.id]: !isC }))} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", background: "#fff", border: "1px solid #e5e2db", borderRadius: isC ? 10 : "10px 10px 0 0", cursor: "pointer", userSelect: "none" }}>
                <span style={{ fontSize: 16 }}>{cat.icon}</span>
                <span style={{ fontWeight: 600, fontSize: 14, flex: 1 }}>{cat.label}</span>
                <span style={{ fontSize: 11, color: "#bbb" }}>{catCc}/{cat.items.length}</span>
                {TL.map((_, t) => (
                  <span key={t} style={{ fontSize: 12, fontWeight: 600, color: TC[t], minWidth: 58, textAlign: "right" }}>{eur(catTotals[cat.id]?.[t] || 0)}</span>
                ))}
                <span onClick={e => { e.stopPropagation(); toggleCat(cat.id); }} style={{ ...cb, width: 18, height: 18, fontSize: 10, background: catCc === cat.items.length ? "#d97706" : catCc > 0 ? "#fde68a" : "#fff", border: catCc === cat.items.length ? "none" : "1.5px solid #ccc", color: catCc === cat.items.length ? "#fff" : "#a16207" }}>
                  {catCc === cat.items.length ? "✓" : catCc > 0 ? "–" : ""}
                </span>
                <span style={{ fontSize: 10, color: "#ccc", transform: isC ? "rotate(-90deg)" : "none", transition: "transform .15s" }}>▼</span>
              </div>

              {!isC && (
                <div style={{ border: "1px solid #e5e2db", borderTop: "none", borderRadius: "0 0 10px 10px", overflow: "hidden", background: "#fff" }}>
                  {/* Column headers */}
                  <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 56px repeat(3, 62px 72px) 24px", padding: "6px 14px", background: "#faf9f6", borderBottom: "1px solid #eee", fontSize: 9, fontWeight: 600, color: "#aaa", textTransform: "uppercase", letterSpacing: 0.5, alignItems: "center" }}>
                    <span />
                    <span>Artikel</span>
                    <span style={{ textAlign: "center" }}>Menge</span>
                    <span style={{ textAlign: "right", color: TC[0], borderLeft: "1.5px solid #c0bbb0", paddingLeft: 8, alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "flex-end", margin: "-6px 0", padding: "6px 0 6px 8px" }}>Budget</span>
                    <span style={{ textAlign: "right", color: TC[0] }}>Summe</span>
                    <span style={{ textAlign: "right", color: TC[1], borderLeft: "1.5px solid #c0bbb0", paddingLeft: 8, alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "flex-end", margin: "-6px 0", padding: "6px 0 6px 8px" }}>Mid</span>
                    <span style={{ textAlign: "right", color: TC[1] }}>Summe</span>
                    <span style={{ textAlign: "right", color: TC[2], borderLeft: "1.5px solid #c0bbb0", paddingLeft: 8, alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "flex-end", margin: "-6px 0", padding: "6px 0 6px 8px" }}>Premium</span>
                    <span style={{ textAlign: "right", color: TC[2] }}>Summe</span>
                    <span />
                  </div>

                  {cat.items.map((item, idx) => {
                    const on = ck[item.id];
                    const q = qty[item.id] || 0;
                    return (
                      <div key={item.id} style={{ display: "grid", gridTemplateColumns: "28px 1fr 56px repeat(3, 62px 72px) 24px", padding: "8px 14px", borderBottom: idx < cat.items.length - 1 ? "1px solid #f3f1ec" : "none", fontSize: 13, alignItems: "center", opacity: on ? 1 : 0.35, transition: "opacity .15s", background: idx % 2 ? "#fcfbf8" : "#fff" }}>
                        {/* Checkbox */}
                        <div onClick={() => setCk(p => ({ ...p, [item.id]: !on }))} style={{ ...cb, background: on ? "#d97706" : "#fff", border: on ? "none" : "1.5px solid #ccc" }}>{on && "✓"}</div>

                        {/* Name + purpose */}
                        <div style={{ minWidth: 0, paddingRight: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" }}>
                            <E value={item.name} onChange={v => updName(item.id, v)} style={{ fontWeight: 500, fontSize: 13 }} />
                            {item.isNew && <span style={{ fontSize: 8, background: "#fef3c7", color: "#b45309", padding: "1px 4px", borderRadius: 3, fontWeight: 700 }}>NEU</span>}
                            {item.reusable && <span style={{ fontSize: 8, background: "#ecfdf5", color: "#059669", padding: "1px 4px", borderRadius: 3, fontWeight: 600 }}>♻</span>}
                          </div>
                          <E value={item.purpose} onChange={v => updPurpose(item.id, v)} style={{ fontSize: 10, color: "#aaa" }} />
                        </div>

                        {/* Qty */}
                        <div style={{ textAlign: "center" }}>
                          <E value={q} numeric onChange={v => setQty(p => ({ ...p, [item.id]: v }))} style={{ fontSize: 12, fontWeight: 600 }} />
                        </div>

                        {/* 3 tiers: price + total */}
                        {[0, 1, 2].map(t => {
                          const p = gp(item, t);
                          const total = on ? q * p : 0;
                          return [
                            <div key={`p${t}`} style={{ textAlign: "right", borderLeft: "1.5px solid #c0bbb0", paddingLeft: 8, alignSelf: "stretch", display: "flex", alignItems: "center", justifyContent: "flex-end", margin: "-8px 0", padding: "8px 0 8px 8px" }}>
                              <E value={p} numeric decimal onChange={v => setCp(pr => ({ ...pr, [`${item.id}-${t}`]: v }))} style={{ fontSize: 11, color: "#777" }} />
                            </div>,
                            <div key={`t${t}`} style={{ textAlign: "right", fontWeight: 600, fontSize: 12, color: on ? TC[t] : "#ddd" }}>
                              {eur(total)}
                            </div>
                          ];
                        }).flat()}

                        {/* Delete */}
                        {del === item.id ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            <span onClick={() => delItem(item.id)} style={{ cursor: "pointer", fontSize: 9, color: "#dc2626", fontWeight: 700 }}>Ja</span>
                            <span onClick={() => setDel(null)} style={{ cursor: "pointer", fontSize: 9, color: "#999" }}>Nein</span>
                          </div>
                        ) : (
                          <span onClick={() => setDel(item.id)} style={{ cursor: "pointer", color: "#d4d0c8", fontSize: 12, textAlign: "center" }}>✕</span>
                        )}
                      </div>
                    );
                  })}

                  {/* Add row */}
                  {adding === cat.id ? (
                    <div style={{ padding: "10px 14px", borderTop: "1px dashed #e5e2db", background: "#fefcf7" }}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-end" }}>
                        <div style={{ flex: 2, minWidth: 100 }}>
                          <div style={fl}>Name</div>
                          <input value={ni.name} onChange={e => setNi(p => ({ ...p, name: e.target.value }))} placeholder="z.B. Bandanas" onKeyDown={e => e.key === "Enter" && addItem(cat.id)} style={ai} />
                        </div>
                        <div style={{ width: 60 }}>
                          <div style={fl}>Menge</div>
                          <input value={ni.qty} onChange={e => setNi(p => ({ ...p, qty: e.target.value }))} placeholder="100" type="number" onKeyDown={e => e.key === "Enter" && addItem(cat.id)} style={ai} />
                        </div>
                        <div style={{ width: 70 }}>
                          <div style={fl}>€/Stk</div>
                          <input value={ni.price} onChange={e => setNi(p => ({ ...p, price: e.target.value }))} placeholder="5.00" type="number" step="0.01" onKeyDown={e => e.key === "Enter" && addItem(cat.id)} style={ai} />
                        </div>
                        <button onClick={() => addItem(cat.id)} style={{ padding: "7px 14px", borderRadius: 6, border: "none", background: "#d97706", color: "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer" }}>Hinzufügen</button>
                        <button onClick={() => { setAdding(null); setNi({ name: "", qty: "", price: "" }); }} style={{ ...pill, padding: "7px 10px" }}>Abbrechen</button>
                      </div>
                    </div>
                  ) : (
                    <div onClick={() => { setAdding(cat.id); setNi({ name: "", qty: "", price: "" }); }} style={{ padding: "8px 14px", borderTop: "1px dashed #e5e2db", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: "#ccc", fontSize: 12 }} onMouseEnter={e => e.currentTarget.style.color = "#d97706"} onMouseLeave={e => e.currentTarget.style.color = "#ccc"}>
                      <span style={{ width: 20, height: 20, borderRadius: 5, border: "1.5px dashed currentColor", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>+</span>
                      Artikel hinzufügen
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Grand total bar */}
        <div style={{ background: "#fff", border: "1px solid #e5e2db", borderRadius: 10, padding: "14px 14px", display: "grid", gridTemplateColumns: "28px 1fr 56px repeat(3, 62px 72px) 24px", alignItems: "center", marginTop: 4 }}>
          <span />
          <span style={{ fontWeight: 700, fontSize: 14 }}>Gesamtsumme</span>
          <span />
          {[0, 1, 2].map(t => [
            <span key={`l${t}`} style={{ borderLeft: "1.5px solid #c0bbb0", alignSelf: "stretch", margin: "-14px 0", padding: "14px 0" }} />,
            <span key={`v${t}`} style={{ textAlign: "right", fontWeight: 700, fontSize: 15, color: TC[t] }}>{eur(totals[t])}</span>
          ]).flat()}
          <span />
        </div>
      </div>
    </div>
  );
}

const pill = { padding: "4px 10px", borderRadius: 6, border: "1px solid #ddd", background: "#fff", color: "#999", fontSize: 11, cursor: "pointer" };
const cb = { width: 20, height: 20, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, fontSize: 11, color: "#fff", fontWeight: 800 };
const fl = { fontSize: 9, color: "#bbb", marginBottom: 2 };
const ai = { width: "100%", background: "#fff", border: "1px solid #ddd", borderRadius: 5, padding: "7px 8px", fontSize: 12, color: "#333", outline: "none" };
