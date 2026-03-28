import { useState, useEffect } from "react";
const FONTS=`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Space+Mono&display=swap');`;
const CSS=`
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0a0618;--card:#120f24;--card2:#1a1630;--gold:#e8b86d;--gold-l:#f5d08a;--gold-xl:rgba(232,184,109,.08);--teal:#00e5cc;--purple:#9d4edd;--rose:#f72585;--ink:#f0e8d8;--ink2:#c0a880;--ink3:#8070a0;--border:#2a2040;--sh:0 4px 30px rgba(0,0,0,.5);--sh-lg:0 8px 50px rgba(0,0,0,.6);--ff:'Crimson Text',serif;--fd:'Cinzel',serif;--fm:'Space Mono',monospace}
html,body{min-height:100vh;background:var(--bg);color:var(--ink);font-family:var(--ff)}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes starTwinkle{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes dotBlink{0%,100%{opacity:1}50%{opacity:.2}}
@keyframes pop{0%{transform:scale(.9);opacity:0}70%{transform:scale(1.04)}100%{transform:scale(1);opacity:1}}
@keyframes orbGlow{0%,100%{box-shadow:0 0 20px rgba(232,184,109,.2),inset 0 0 20px rgba(232,184,109,.05)}50%{box-shadow:0 0 40px rgba(232,184,109,.4),inset 0 0 30px rgba(232,184,109,.1)}}
@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-8px) rotate(2deg)}}
@keyframes reveal{from{opacity:0;max-height:0}to{opacity:1;max-height:1000px}}
.fu{animation:fadeUp .5s ease both}.pop{animation:pop .4s ease both}
/* STARS BG */
.stars{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.star{position:absolute;background:#fff;border-radius:50%}
header{position:relative;z-index:10;padding:20px 32px;display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--border);background:rgba(10,6,24,.9);backdrop-filter:blur(8px)}
.brand-ico{font-size:30px;animation:float 3s ease-in-out infinite}
.brand-name{font-family:var(--fd);font-size:20px;font-weight:700;color:var(--gold);letter-spacing:.08em;text-shadow:0 0 20px rgba(232,184,109,.3)}
.brand-sub{font-size:10px;color:var(--ink3);font-family:var(--fm);background:var(--gold-xl);border:1px solid rgba(232,184,109,.15);padding:2px 9px;border-radius:3px;margin-left:8px}
/* HERO */
.hero{position:relative;z-index:10;text-align:center;padding:52px 20px 36px;overflow:hidden}
.hero-deco{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(157,78,221,.08) 0%,transparent 60%);pointer-events:none}
.hero-eyebrow{font-family:var(--fm);font-size:9px;color:var(--gold);letter-spacing:.25em;text-transform:uppercase;margin-bottom:14px;opacity:.6}
.hero-title{font-family:var(--fd);font-size:clamp(26px,5vw,58px);font-weight:900;color:var(--gold);text-shadow:0 0 40px rgba(232,184,109,.3);margin-bottom:10px;line-height:1.1;letter-spacing:.04em}
.hero-sub{color:var(--ink2);font-size:16px;max-width:500px;margin:0 auto 32px;line-height:1.7;font-style:italic}
/* ORB */
.orb{width:100px;height:100px;border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(232,184,109,.15),rgba(157,78,221,.08));border:1px solid rgba(232,184,109,.2);margin:0 auto 32px;animation:orbGlow 3s ease-in-out infinite;display:flex;align-items:center;justify-content:center;font-size:48px}
/* FORM */
.main{position:relative;z-index:10;max-width:700px;margin:0 auto 28px;padding:0 20px}
.form-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:26px;box-shadow:var(--sh)}
.form-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.sec-lbl{font-family:var(--fd);font-size:10px;color:var(--gold);letter-spacing:.15em;text-transform:uppercase;margin-bottom:12px;opacity:.8}
/* PET TYPES */
.pets{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:20px}
.pet-btn{font-size:28px;width:56px;height:56px;border-radius:12px;border:1px solid var(--border);background:var(--card2);cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px}
.pet-lbl{font-size:8px;color:var(--ink3);font-family:var(--fm);text-transform:uppercase;letter-spacing:.04em}
.pet-btn:hover{border-color:rgba(232,184,109,.3);transform:translateY(-2px)}
.pet-btn.on{border-color:var(--gold);background:var(--gold-xl);box-shadow:0 0 20px rgba(232,184,109,.15)}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
.inp-lbl{font-family:var(--fm);font-size:9px;color:var(--ink3);text-transform:uppercase;letter-spacing:.1em;margin-bottom:6px}
.inp{width:100%;background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:10px 14px;font-family:var(--ff);font-size:13.5px;color:var(--ink);outline:none;transition:border-color .2s}
.inp:focus{border-color:rgba(232,184,109,.4);box-shadow:0 0 0 3px rgba(232,184,109,.06)}
.inp::placeholder{color:var(--ink3)}
.inp option{background:var(--card)}
/* SIGNOS */
.signos{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;margin-bottom:16px}
.signo-btn{border:1px solid var(--border);border-radius:8px;background:var(--card2);padding:8px 4px;cursor:pointer;transition:all .2s;text-align:center}
.signo-btn:hover{border-color:rgba(232,184,109,.3)}
.signo-btn.on{border-color:var(--gold);background:var(--gold-xl)}
.signo-ico{font-size:18px;display:block;margin-bottom:2px}
.signo-name{font-family:var(--fm);font-size:8px;color:var(--ink3);text-transform:uppercase;letter-spacing:.04em}
.btn-wrap{display:flex;gap:10px;justify-content:center;margin-top:18px}
.btn{font-family:var(--fd);font-size:13px;font-weight:700;border:none;border-radius:6px;padding:13px 30px;cursor:pointer;transition:all .2s;letter-spacing:.08em;display:flex;align-items:center;gap:8px}
.btn-main{background:linear-gradient(135deg,var(--gold),var(--gold-l));color:var(--bg)}
.btn-main:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(232,184,109,.3)}
.btn-main:disabled{opacity:.4;cursor:not-allowed;transform:none !important;box-shadow:none}
.btn-sec{background:var(--card2);border:1px solid var(--border);color:var(--ink3);font-size:12px;padding:11px 18px}
.btn-sec:hover{border-color:rgba(232,184,109,.3);color:var(--gold)}
.spinner{animation:spin 1s linear infinite;display:inline-block}
/* RESULTADO */
.result-card{background:linear-gradient(135deg,var(--card),rgba(157,78,221,.05));border:1px solid rgba(232,184,109,.15);border-radius:12px;padding:28px;margin-top:20px;position:relative;overflow:hidden;box-shadow:var(--sh-lg);animation:pop .5s ease}
.result-card::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.result-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--purple),transparent)}
.r-header{text-align:center;margin-bottom:22px}
.r-pet{font-size:48px;display:block;margin-bottom:8px;animation:float 3s ease-in-out infinite}
.r-name{font-family:var(--fd);font-size:20px;color:var(--gold);letter-spacing:.06em;margin-bottom:4px}
.r-signo{font-size:13px;color:var(--ink3);font-family:var(--fm)}
.r-sep{height:1px;background:linear-gradient(90deg,transparent,rgba(232,184,109,.2),transparent);margin:16px 0}
.horoscopo-text{font-family:var(--ff);font-size:clamp(14px,2.5vw,16px);color:var(--ink2);line-height:1.9;font-style:italic;animation:fadeUp .6s ease}
.horoscopo-text::first-letter{font-family:var(--fd);font-size:2.5em;float:left;line-height:.8;margin-right:8px;color:var(--gold);padding-top:4px}
/* AREAS */
.areas{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}
.area{background:var(--card2);border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center}
.area-ico{font-size:20px;display:block;margin-bottom:5px}
.area-lbl{font-family:var(--fm);font-size:9px;color:var(--ink3);text-transform:uppercase;letter-spacing:.08em;margin-bottom:5px}
.area-stars{color:var(--gold);font-size:12px}
/* EJEMPLOS */
.ejemplos{position:relative;z-index:10;max-width:700px;margin:0 auto 28px;padding:0 20px}
.ej-title{font-family:var(--fd);font-size:16px;color:var(--ink2);margin-bottom:12px;letter-spacing:.04em}
.ej-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:9px}
.ej-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;transition:all .2s;display:flex;align-items:center;gap:12px}
.ej-card:hover{border-color:rgba(232,184,109,.2);transform:translateY(-2px)}
.ej-ico{font-size:30px}
.ej-name{font-size:13px;font-weight:600;color:var(--ink)}
.ej-detail{font-size:11px;color:var(--ink3);font-style:italic}
footer{position:relative;z-index:10;text-align:center;padding:20px;color:var(--ink3);font-size:11px;border-top:1px solid var(--border);background:rgba(10,6,24,.9)}
.thinking{position:relative;z-index:10;display:flex;align-items:center;gap:6px;color:var(--gold);font-family:var(--fm);font-size:11px;justify-content:center;padding:24px;font-style:italic;letter-spacing:.06em}
.thinking span{width:6px;height:6px;border-radius:50%;background:var(--gold);animation:dotBlink 1.2s infinite}
.thinking span:nth-child(2){animation-delay:.2s}.thinking span:nth-child(3){animation-delay:.4s}
.toast{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--gold);color:var(--bg);border-radius:6px;padding:10px 22px;font-family:var(--fd);font-size:13px;font-weight:700;z-index:999;white-space:nowrap;animation:pop .3s ease}
@media(max-width:580px){.signos{grid-template-columns:repeat(4,1fr)}.areas{grid-template-columns:1fr 1fr}.ej-grid{grid-template-columns:1fr}.grid2{grid-template-columns:1fr}.pets{gap:7px}}
`;
const PETS=[{emoji:"🐱",name:"Gato"},{emoji:"🐶",name:"Perro"},{emoji:"🐹",name:"Hámster"},{emoji:"🐰",name:"Conejo"},{emoji:"🐦",name:"Pájaro"},{emoji:"🐠",name:"Pez"},{emoji:"🐢",name:"Tortuga"},{emoji:"🦎",name:"Lagartija"}];
const SIGNOS=[{emoji:"♈",name:"Aries"},{emoji:"♉",name:"Tauro"},{emoji:"♊",name:"Géminis"},{emoji:"♋",name:"Cáncer"},{emoji:"♌",name:"Leo"},{emoji:"♍",name:"Virgo"},{emoji:"♎",name:"Libra"},{emoji:"♏",name:"Escorpio"},{emoji:"♐",name:"Sagitario"},{emoji:"♑",name:"Capricornio"},{emoji:"♒",name:"Acuario"},{emoji:"♓",name:"Piscis"}];
const EJ=[{ico:"🐱",name:"Mittens",detail:"Gata, Leo, 3 años"},{ico:"🐶",name:"Thor",detail:"Perro, Aries, 2 años"},{ico:"🐹",name:"Pepino",detail:"Hámster, Géminis, 1 año"},{ico:"🐰",name:"Luna",detail:"Coneja, Piscis, 4 años"}];
const AREAS_LABELS=["Comida 🍖","Sueño 😴","Travesuras 😈"];
function Toast({msg,onClose}){useEffect(()=>{const t=setTimeout(onClose,2400);return()=>clearTimeout(t);},[]);return <div className="toast">⭐ {msg}</div>;}
function Stars(){
  const stars=Array(80).fill(0).map((_,i)=>({
    left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,
    size:`${Math.random()*2+0.5}px`,
    delay:`${Math.random()*5}s`,dur:`${Math.random()*3+2}s`,
  }));
  return <div className="stars">{stars.map((s,i)=><div key={i} className="star" style={{left:s.left,top:s.top,width:s.size,height:s.size,animationDelay:s.delay,animationDuration:s.dur,animation:`starTwinkle ${s.dur} ${s.delay} ease-in-out infinite`}}/>)}</div>;
}
function parseAreas(text){
  const food=text.match(/(\d)\s*(?:estrella|star|⭐)/gi);
  return[Math.floor(Math.random()*2)+4,Math.floor(Math.random()*3)+3,Math.floor(Math.random()*3)+3];
}
export default function App(){
  const [pet,setPet]=useState("🐱");
  const [nombre,setNombre]=useState("");
  const [edad,setEdad]=useState("");
  const [signo,setSigno]=useState("♌");
  const [result,setResult]=useState(null);
  const [loading,setLoading]=useState(false);
  const [toast,setToast]=useState(null);
  const [areas,setAreas]=useState(null);
  const petName=PETS.find(p=>p.emoji===pet)?.name||"mascota";
  const signoName=SIGNOS.find(s=>s.emoji===signo)?.name||"Leo";
  const consultar=async()=>{
    if(!nombre.trim()||loading)return;
    setLoading(true);setResult(null);setAreas(null);
    try{
      const prompt=`Eres el astrólogo más respetado del mundo... de mascotas. Llevas 30 años leyendo los astros para animales domésticos y tienes un don especial para interpretar los movimientos cósmicos en relación a la vida cotidiana de las mascotas.\n\nMascota: ${pet} ${petName}\nNombre: ${nombre}\n${edad?`Edad: ${edad} años`:""}\nSigno zodiacal: ${signoName} ${signo}\n\nGenera el horóscopo mensual de esta mascota. Debe incluir:\n- Predicciones cósmicas para su vida (comida, juego, sueño, relación con su dueño)\n- Referencias a Mercurio retrógrado y cómo afecta su apetito\n- Una predicción específica sobre algo que encontrará debajo del sofá\n- Su compatibilidad con mascotas de otros signos del vecindario\n- Un consejo sagrado de los astros para su dueño humano\n- El número de la suerte para esta semana (relacionado con sus croquetas)\n\nTono: dramático, místico, completamente absurdo pero entregado con total seriedad. En español chileno poético. 4-5 párrafos ricos y elaborados.`;
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,messages:[{role:"user",content:prompt}]})});
      const d=await r.json();
      const txt=d.content?.[0]?.text||"Los astros guardan silencio hoy.";
      setResult(txt);setAreas(parseAreas(txt));
    }catch(e){setResult("Los astros están temporalmente fuera de servicio. Mercurio retrógrado está afectando el servidor.");}
    setLoading(false);
  };
  const loadExample=(ej)=>{
    const match=PETS.find(p=>p.emoji===ej.ico);
    if(match)setPet(match.emoji);
    setNombre(ej.name.split(",")[0]);
    const parts=ej.detail.split(", ");
    if(parts[1]){const s=SIGNOS.find(sg=>sg.name===parts[1]);if(s)setSigno(s.emoji);}
    if(parts[2])setEdad(parts[2].replace(" años","").replace(" año",""));
    setResult(null);
  };
  return(
    <>
      <style>{FONTS+CSS}</style>
      <Stars/>
      <div style={{position:"relative",zIndex:10,display:"flex",flexDirection:"column",minHeight:"100vh"}}>
        <header className="fu">
          <span className="brand-ico">🔮</span>
          <span className="brand-name">Astro Mascota</span>
          <span className="brand-sub">Horóscopo Felino & Canino</span>
        </header>
        <div className="hero fu">
          <div className="hero-deco"/>
          <div className="hero-eyebrow">— Las estrellas hablan para ellos —</div>
          <div className="orb">✨</div>
          <h1 className="hero-title">Horóscopo<br/>para Mascotas</h1>
          <p className="hero-sub">Los astros tienen mensajes importantes para tu mascota. Mercurio retrógrado está afectando sus croquetas. Descubre qué le depara el universo.</p>
        </div>
        <div className="main">
          <div className="form-card pop" style={{position:"relative"}}>
            <div className="sec-lbl">Especie</div>
            <div className="pets">{PETS.map(p=><button key={p.emoji} className={`pet-btn${pet===p.emoji?" on":""}`} onClick={()=>setPet(p.emoji)}><span>{p.emoji}</span><span className="pet-lbl">{p.name}</span></button>)}</div>
            <div className="grid2">
              <div><div className="inp-lbl">Nombre de la mascota</div><input className="inp" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder="Ej: Mittens, Thor, Luna..."/></div>
              <div><div className="inp-lbl">Edad (años)</div><input className="inp" type="number" min="0" max="30" value={edad} onChange={e=>setEdad(e.target.value)} placeholder="Ej: 3"/></div>
            </div>
            <div className="sec-lbl">Signo Zodiacal</div>
            <div className="signos">
              {SIGNOS.map(s=><button key={s.emoji} className={`signo-btn${signo===s.emoji?" on":""}`} onClick={()=>setSigno(s.emoji)}><span className="signo-ico">{s.emoji}</span><span className="signo-name">{s.name}</span></button>)}
            </div>
            <div className="btn-wrap">
              <button className="btn btn-main" onClick={consultar} disabled={loading||!nombre.trim()}>
                {loading?<><span className="spinner">⟳</span> Consultando los astros...</>:<>🔮 Consultar los Astros</>}
              </button>
              {(nombre||result)&&<button className="btn btn-sec" onClick={()=>{setNombre("");setEdad("");setResult(null);setAreas(null);}}>✕</button>}
            </div>
          </div>
          {loading&&<div className="thinking"><span/><span/><span/><span style={{marginLeft:8}}>Alineando planetas con las croquetas...</span></div>}
          {result&&!loading&&(
            <div className="result-card">
              <div className="r-header">
                <span className="r-pet">{pet}</span>
                <div className="r-name">{nombre}</div>
                <div className="r-signo">{signoName} {signo} · {petName}</div>
              </div>
              <div className="r-sep"/>
              <div className="horoscopo-text">{result}</div>
              {areas&&(
                <>
                  <div className="r-sep"/>
                  <div className="areas">
                    {AREAS_LABELS.map((lbl,i)=>(
                      <div key={i} className="area">
                        <span className="area-ico">{lbl.split(" ")[1]}</span>
                        <div className="area-lbl">{lbl.split(" ")[0]}</div>
                        <div className="area-stars">{"⭐".repeat(areas[i])}{"☆".repeat(5-areas[i])}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <div className="r-sep"/>
              <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
                <button className="btn btn-sec" style={{fontSize:"11px",padding:"8px 14px"}} onClick={()=>{navigator.clipboard.writeText(result).catch(()=>{});setToast("Horóscopo copiado — compártelo con tu mascota");}}>📋 Copiar</button>
              </div>
            </div>
          )}
        </div>
        <div className="ejemplos fu">
          <div className="ej-title">⭐ Mascotas frecuentes</div>
          <div className="ej-grid">
            {EJ.map((ej,i)=>(
              <div key={i} className="ej-card" onClick={()=>loadExample(ej)}>
                <span className="ej-ico">{ej.ico}</span>
                <div><div className="ej-name">{ej.name}</div><div className="ej-detail">{ej.detail}</div></div>
              </div>
            ))}
          </div>
        </div>
        <footer>Astro Mascota · by VibeCodingChile<br/><span style={{fontSize:10,opacity:.6}}>Los astros no tienen opinión real sobre las mascotas. Pero igual es verdad.</span></footer>
      </div>
      {toast&&<Toast msg={toast} onClose={()=>setToast(null)}/>}
    </>
  );
}
