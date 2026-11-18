import './style.css';
import { persona, intro, fotos, canciones, albumAppleMusic, universos, carta, final } from './contenido.js';
import { luna, cuerpos, constelaciones, hechos } from './cielo.js';

const $ = (s) => document.querySelector(s);
const el = (tag, attrs = {}, html = '') => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
  if (html) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
const BASE = import.meta.env.BASE_URL;

/* ---------------------------------------------------------------- INTRO */
$('#intro-kicker').textContent = intro.kicker;
$('#intro-nombre').innerHTML = [...persona.nombre].map((c, i) => `<span style="--i:${i}">${esc(c)}</span>`).join('');
$('#intro-edad').textContent = persona.edad;
$('#intro-lugar').textContent = `${persona.fecha} · ${persona.lugar}`;
$('#intro-mensaje').textContent = intro.mensaje;
$('#intro-nombre').setAttribute('aria-label', persona.nombre);

/* ------------------------------------------------------- CANVAS ESTELAR */
const canvas = $('#cielo-canvas');
const ctx = canvas.getContext('2d');
let W = 0, H = 0, DPR = 1, estrellas = [], meteoros = [], tasaMeteoros = 0.004, scrollY = 0;

function crearEstrellas() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W * DPR; canvas.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  const n = Math.min(420, Math.round((W * H) / 3800));
  estrellas = Array.from({ length: n }, () => ({
    x: Math.random() * W,
    y: Math.random() * H * 1.6,
    r: Math.random() ** 3 * 1.6 + 0.25,
    z: Math.random() * 0.5 + 0.1, // parallax
    f: Math.random() * Math.PI * 2,
    v: Math.random() * 0.002 + 0.0006,
    tinte: Math.random() < 0.12 ? '255,214,170' : Math.random() < 0.2 ? '214,200,255' : '255,255,255',
  }));
}

function lanzarMeteoro(fuerte = false) {
  const ang = Math.PI * (0.18 + Math.random() * 0.12);
  const vel = (fuerte ? 11 : 8) + Math.random() * 6;
  meteoros.push({
    x: Math.random() * W * 1.1, y: -20 + Math.random() * H * 0.35,
    vx: -Math.cos(ang) * vel, vy: Math.sin(ang) * vel,
    vida: 0, max: 50 + Math.random() * 40, largo: 90 + Math.random() * 120,
    rosa: Math.random() < 0.35,
  });
}

function dibujar(t) {
  ctx.clearRect(0, 0, W, H);
  const off = scrollY;
  for (const s of estrellas) {
    const y = (((s.y - off * s.z) % (H * 1.6)) + H * 1.6) % (H * 1.6);
    if (y > H) continue;
    const a = 0.45 + Math.sin(s.f + t * s.v) * 0.45;
    ctx.fillStyle = `rgba(${s.tinte},${a})`;
    ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, Math.PI * 2); ctx.fill();
  }
  if (Math.random() < tasaMeteoros) lanzarMeteoro();
  meteoros = meteoros.filter((m) => m.vida < m.max);
  for (const m of meteoros) {
    m.vida++; m.x += m.vx; m.y += m.vy;
    const k = 1 - m.vida / m.max;
    const mag = Math.hypot(m.vx, m.vy);
    const tx = m.x - (m.vx / mag) * m.largo, ty = m.y - (m.vy / mag) * m.largo;
    const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
    g.addColorStop(0, `rgba(255,255,255,${0.95 * k})`);
    g.addColorStop(0.3, m.rosa ? `rgba(255,170,200,${0.5 * k})` : `rgba(190,200,255,${0.5 * k})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
  }
}

let animando = false;
function bucle(t) {
  if (!animando) return;
  dibujar(t);
  requestAnimationFrame(bucle);
}
function iniciarCielo() {
  if (reducido.matches) { animando = false; dibujar(0); return; }
  if (!animando) { animando = true; requestAnimationFrame(bucle); }
}
crearEstrellas(); iniciarCielo();
let rz;
window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { crearEstrellas(); trazarHilo(); if (!animando) dibujar(0); }, 150); });
document.addEventListener('visibilitychange', () => { if (document.hidden) animando = false; else iniciarCielo(); });
reducido.addEventListener?.('change', iniciarCielo);

/* ----------------------------------------------------------- HILO ROJO */
const hilo = $('#hilo'), hiloPath = $('#hilo-path');
let hiloLargo = 0;
function trazarHilo() {
  const h = document.querySelector("main").offsetHeight, w = document.documentElement.clientWidth;
  hilo.setAttribute('viewBox', `0 0 ${w} ${h}`);
  hilo.style.height = h + 'px';
  const secciones = [...document.querySelectorAll('.escena')];
  // El hilo corre por los márgenes y cambia de lado solo entre escenas,
  // para no cruzar nunca el texto.
  const movil = w <= 600;
  const lados = [movil ? 7 : Math.max(14, w * 0.018), w - (movil ? 7 : Math.max(54, w * 0.045))];
  const inicio = secciones[0], fin = secciones.at(-1);
  const y0 = inicio.offsetTop + inicio.offsetHeight - 6;
  let lado = 0;
  let d = `M ${w * 0.5} ${y0} C ${w * 0.3} ${y0 + 10}, ${lados[0]} ${y0 + 10}, ${lados[0]} ${y0 + 90}`;
  secciones.forEach((s, i) => {
    if (i < 2) return;
    const yb = s.offsetTop + 34; // dentro del margen superior de la escena
    const nuevo = 1 - lado;
    d += ` L ${lados[lado]} ${yb - 70} C ${lados[lado]} ${yb - 10}, ${lados[nuevo]} ${yb - 30}, ${lados[nuevo]} ${yb + 40}`;
    lado = nuevo;
  });
  const yf = fin.offsetTop + fin.offsetHeight;
  d += ` L ${lados[lado]} ${yf - 150} C ${lados[lado]} ${yf - 60}, ${w * 0.5} ${yf - 110}, ${w * 0.5} ${yf - 40}`;
  hiloPath.setAttribute('d', d);
  hiloLargo = hiloPath.getTotalLength();
  hiloPath.style.strokeDasharray = hiloLargo;
  actualizarScroll();
}
function actualizarScroll() {
  scrollY = window.scrollY;
  if (!hiloLargo) return;
  if (reducido.matches) { hiloPath.style.strokeDashoffset = 0; return; }
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const p = Math.min(1, (scrollY + window.innerHeight * 0.6) / (max + window.innerHeight * 0.6));
  hiloPath.style.strokeDashoffset = hiloLargo * (1 - p);
}
window.addEventListener('scroll', () => { actualizarScroll(); if (!animando) dibujar(0); }, { passive: true });

/* --------------------------------------------------- CIELO: RUEDA ZODIACAL */
const NS = 'http://www.w3.org/2000/svg';
const svgEl = (tag, attrs) => { const n = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v); return n; };
// El ángulo crece en sentido antihorario; 0° (Aries) a la derecha.
const polar = (lon, r) => { const a = (-lon * Math.PI) / 180; return [Math.cos(a) * r, Math.sin(a) * r]; };

function dibujarRueda() {
  const svg = $('#rueda');
  const defs = svgEl('defs', {});
  defs.innerHTML = `<radialGradient id="rg-fondo"><stop offset="0" stop-color="#1a2160" stop-opacity=".9"/><stop offset="1" stop-color="#070b24" stop-opacity=".2"/></radialGradient>
  <filter id="brillo" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
  svg.append(defs, svgEl('circle', { r: 190, fill: 'url(#rg-fondo)' }));
  [188, 150, 112].forEach((r) => svg.append(svgEl('circle', { r, fill: 'none', stroke: 'rgba(243,217,164,.28)', 'stroke-width': r === 150 ? 0.6 : 1 })));
  constelaciones.forEach(([nombre, ini], i) => {
    const fin = constelaciones[(i + 1) % constelaciones.length][1];
    const span = ((fin - ini) + 360) % 360;
    const [x1, y1] = polar(ini, 112), [x2, y2] = polar(ini, 188);
    svg.append(svgEl('line', { x1, y1, x2, y2, stroke: 'rgba(243,217,164,.22)', 'stroke-width': 0.8 }));
    const mid = ini + span / 2;
    const [tx, ty] = polar(mid, 169);
    let rot = -mid + 90; if (mid > 180) rot += 180;
    const t = svgEl('text', { x: tx, y: ty, 'text-anchor': 'middle', 'dominant-baseline': 'middle', transform: `rotate(${rot} ${tx} ${ty})`, class: 'rueda-const' });
    t.textContent = span < 10 ? nombre.slice(0, 3) + '.' : nombre;
    svg.append(t);
  });
  for (let g = 0; g < 360; g += 10) {
    const [a, b] = polar(g, 150), [c, d] = polar(g, g % 30 ? 146 : 140);
    svg.append(svgEl('line', { x1: a, y1: b, x2: c, y2: d, stroke: 'rgba(255,255,255,.25)', 'stroke-width': 0.6 }));
  }
  // cuerpos, con radio escalonado para evitar choques
  const orden = [...cuerpos].sort((a, b) => a.lon - b.lon);
  const radios = {}; let ultimoLon = -99, nivel = 0;
  orden.forEach((c) => { nivel = c.lon - ultimoLon < 9 ? nivel + 1 : 0; radios[c.id] = 128 - nivel * 22; ultimoLon = c.lon; });
  const grupoCuerpos = svgEl('g', {});
  cuerpos.forEach((c) => {
    const rr = radios[c.id];
    const [x, y] = polar(c.lon, rr);
    const [lx, ly] = polar(c.lon, 150);
    const g = svgEl('g', { class: 'rueda-cuerpo', tabindex: 0, 'data-id': c.id, role: 'button', 'aria-label': `${c.nombre} en ${c.constelacion}` });
    g.append(svgEl('line', { x1: x, y1: y, x2: lx, y2: ly, stroke: c.color, 'stroke-opacity': 0.35, 'stroke-width': 0.7 }));
    g.append(svgEl('circle', { cx: x, cy: y, r: c.r, fill: c.color, filter: 'url(#brillo)' }));
    const [nx, ny] = polar(c.lon, rr - c.r - 10);
    const t = svgEl('text', { x: nx, y: ny, 'text-anchor': 'middle', 'dominant-baseline': 'middle', class: 'rueda-nombre' });
    t.textContent = c.nombre;
    g.append(t);
    grupoCuerpos.append(g);
  });
  svg.append(grupoCuerpos);
  const centro = svgEl('text', { x: 0, y: -6, 'text-anchor': 'middle', class: 'rueda-centro' }); centro.textContent = 'Pacho';
  const centro2 = svgEl('text', { x: 0, y: 12, 'text-anchor': 'middle', class: 'rueda-centro-sub' }); centro2.textContent = '18 · XI · 2008';
  svg.append(centro, centro2);

  const marcar = (id) => {
    document.querySelectorAll('[data-id]').forEach((n) => n.classList.toggle('activo', n.dataset.id === id));
  };
  svg.addEventListener('click', (e) => { const g = e.target.closest('[data-id]'); if (g) marcar(g.dataset.id); });
  svg.addEventListener('keydown', (e) => { const g = e.target.closest('[data-id]'); if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); marcar(g.dataset.id); } });
  $('#cuerpos-lista').addEventListener('click', (e) => { const li = e.target.closest('[data-id]'); if (li) marcar(li.dataset.id); });
}

function dibujarLuna() {
  // Gibosa menguante: iluminada ~63 %. Terminador como elipse.
  const svg = $('#luna-svg'); const R = 50;
  const k = luna.iluminacion / 100; const rx = Math.abs(1 - 2 * k) * R;
  svg.innerHTML = `<defs><radialGradient id="lg" cx=".4" cy=".4"><stop offset="0" stop-color="#fffdf2"/><stop offset="1" stop-color="#d9d2bd"/></radialGradient>
  <filter id="lb"><feGaussianBlur stdDeviation="6"/></filter></defs>
  <circle r="${R + 4}" fill="#f3d9a4" opacity=".25" filter="url(#lb)"/>
  <circle r="${R}" fill="#1b2150"/>
  <path d="M 0 ${-R} A ${R} ${R} 0 0 0 0 ${R} A ${rx} ${R} 0 0 ${k > 0.5 ? 0 : 1} 0 ${-R} Z" fill="url(#lg)"/>
  <circle cx="-18" cy="-10" r="7" fill="#000" opacity=".06"/><circle cx="-8" cy="18" r="10" fill="#000" opacity=".05"/>`;
  $('#luna-fase').textContent = `Luna ${luna.fase.toLowerCase()} · ${luna.iluminacion} %`;
  $('#luna-detalle').textContent = `En ${luna.constelacion}. Salió a las ${luna.salida} y se ocultó a las ${luna.puesta}. ${luna.nota}`;
}

function listaCuerpos() {
  $('#cuerpos-lista').innerHTML = cuerpos.map((c) => `
    <li data-id="${c.id}" tabindex="0">
      <span class="punto" style="--c:${c.color}"></span>
      <strong>${esc(c.nombre)}</strong>
      <span class="const">${esc(c.constelacion)}</span>
      <span class="horas">↑ ${esc(c.salida)} · ↓ ${esc(c.puesta)}</span>
      ${c.nota ? `<span class="nota">${esc(c.nota)}</span>` : ''}
    </li>`).join('');
}

function lineaDelDia() {
  const cont = $('#linea-dia');
  const pct = (h) => (h / 24) * 100;
  const filas = cuerpos.filter((c) => !['urano', 'neptuno'].includes(c.id)).map((c) => `
    <div class="ld-fila" data-id="${c.id}">
      <span class="ld-nombre">${esc(c.nombre)}</span>
      <div class="ld-pista">${c.arriba.map(([a, b]) => `<span class="ld-barra" style="left:${pct(a)}%;width:${pct(b - a)}%;--c:${c.color}"></span>`).join('')}</div>
    </div>`).join('');
  const marcas = [0, 6, 12, 18, 24].map((h) => `<span style="left:${pct(h)}%">${String(h).padStart(2, '0')}:00</span>`).join('');
  cont.innerHTML = `<div class="ld-cielo" aria-hidden="true"></div>${filas}<div class="ld-fila ld-eje"><span class="ld-nombre"></span><div class="ld-pista">${marcas}</div></div>`;
  $('#hechos').innerHTML = hechos.map((h) => `<article class="hecho revela"><span class="etiqueta dato">Dato</span><h3>${esc(h.titulo)}</h3><p>${esc(h.texto)}</p><small>${esc(h.fuente)}</small></article>`).join('');
}

dibujarRueda(); dibujarLuna(); listaCuerpos(); lineaDelDia();

/* ------------------------------------------------------------ MÚSICA */
const enc = encodeURIComponent;
let pistaActual = 0, sonando = false;
const disco = $('#disco');
$('#ecualizador').innerHTML = Array.from({ length: 24 }, (_, i) => `<i style="--d:${(i * 0.137) % 1}s;--h:${30 + ((i * 37) % 70)}%"></i>`).join('');
$('#pistas').innerHTML = canciones.map((c, i) => `
  <li><button type="button" data-pista="${i}"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${esc(c.titulo)}</span><span class="jp">${esc(c.jp)}</span></button></li>`).join('');
function elegirPista(i) {
  pistaActual = i;
  const c = canciones[i];
  $('#pista-titulo').textContent = c.titulo;
  $('#pista-jp').textContent = `${c.jp} · RADWIMPS`;
  $('#pista-nota').textContent = c.nota;
  const q = `RADWIMPS ${c.titulo}`;
  $('#btn-spotify').href = `https://open.spotify.com/search/${enc(q)}`;
  $('#btn-youtube').href = `https://music.youtube.com/search?q=${enc(q)}`;
  $('#btn-apple').href = albumAppleMusic;
  document.querySelectorAll('[data-pista]').forEach((b) => b.setAttribute('aria-current', b.dataset.pista == i ? 'true' : 'false'));
}
elegirPista(0);
$('#pistas').addEventListener('click', (e) => {
  const b = e.target.closest('[data-pista]'); if (!b) return;
  elegirPista(+b.dataset.pista);
  sonando = true; $('.reproductor').classList.add('sonando');
});
// El disco gira cuando ella abre una canción en una plataforma (interacción explícita).
['#btn-spotify', '#btn-youtube', '#btn-apple'].forEach((s) => $(s).addEventListener('click', () => $('.reproductor').classList.add('sonando')));
disco.addEventListener('click', () => $('.reproductor').classList.toggle('sonando'));

/* ------------------------------------- SONIDO AMBIENTE (generado, opcional) */
// Un pad suave sintetizado en el navegador. Solo arranca si se pulsa el botón.
let audio = null;
function crearAmbiente() {
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
  const ac = new AC();
  const maestro = ac.createGain(); maestro.gain.value = 0;
  const filtro = ac.createBiquadFilter(); filtro.type = 'lowpass'; filtro.frequency.value = 900;
  const delay = ac.createDelay(); delay.delayTime.value = 0.45;
  const fb = ac.createGain(); fb.gain.value = 0.35;
  delay.connect(fb).connect(delay);
  filtro.connect(maestro); filtro.connect(delay); delay.connect(maestro);
  maestro.connect(ac.destination);
  // Acorde suave (re mayor add9) con osciladores levemente desafinados
  [146.83, 220, 293.66, 369.99, 440, 659.25].forEach((f, i) => {
    [-4, 4].forEach((det) => {
      const o = ac.createOscillator(); o.type = i > 3 ? 'sine' : 'triangle'; o.frequency.value = f; o.detune.value = det;
      const g = ac.createGain(); g.gain.value = 0.018;
      const lfo = ac.createOscillator(); lfo.frequency.value = 0.05 + i * 0.013;
      const lg = ac.createGain(); lg.gain.value = 0.012; lfo.connect(lg).connect(g.gain);
      o.connect(g).connect(filtro); o.start(); lfo.start();
    });
  });
  // Campanitas aleatorias (pentatónica)
  const notas = [587.33, 659.25, 739.99, 880, 987.77, 1174.66];
  const campana = () => {
    if (ac.state !== 'running') return;
    const o = ac.createOscillator(); o.type = 'sine'; o.frequency.value = notas[Math.floor(Math.random() * notas.length)];
    const g = ac.createGain(); const t = ac.currentTime;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.05, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + 3);
    o.connect(g).connect(filtro); o.start(t); o.stop(t + 3.2);
  };
  const timer = setInterval(() => Math.random() < 0.55 && campana(), 1800);
  return { ac, maestro, timer, campana };
}
const btnAmb = $('#ambiente');
btnAmb.addEventListener('click', async () => {
  if (!audio) audio = crearAmbiente();
  if (!audio) { btnAmb.querySelector('.ambiente-txt').textContent = 'Sin audio'; return; }
  const on = btnAmb.getAttribute('aria-pressed') !== 'true';
  const t = audio.ac.currentTime;
  if (on) { await audio.ac.resume(); audio.maestro.gain.cancelScheduledValues(t); audio.maestro.gain.linearRampToValueAtTime(0.9, t + 2.5); }
  else { audio.maestro.gain.cancelScheduledValues(t); audio.maestro.gain.linearRampToValueAtTime(0, t + 1.2); setTimeout(() => btnAmb.getAttribute('aria-pressed') === 'false' && audio.ac.suspend(), 1300); }
  btnAmb.setAttribute('aria-pressed', String(on));
});

/* ------------------------------------------------------------ GALERÍA */
const grid = $('#galeria-grid');
grid.innerHTML = fotos.map((f, i) => `
  <figure class="foto revela ${f.vertical ? 'vertical' : ''}" style="--i:${i % 4}">
    <button type="button" data-foto="${i}" aria-label="Ampliar foto ${i + 1}${f.texto ? ': ' + esc(f.texto) : ''}">
      <img src="${BASE}fotos/${esc(f.archivo)}" alt="${esc(f.texto || `Foto ${i + 1}`)}" loading="lazy" decoding="async" />
    </button>
    ${f.texto ? `<figcaption>${esc(f.texto)}</figcaption>` : ''}
  </figure>`).join('');
const visor = $('#visor'); let fotoActual = 0;
function mostrarFoto(i) {
  fotoActual = (i + fotos.length) % fotos.length;
  const f = fotos[fotoActual];
  $('#visor-img').src = `${BASE}fotos/${f.archivo}`;
  $('#visor-img').alt = f.texto || `Foto ${fotoActual + 1}`;
  $('#visor-txt').textContent = f.texto || '';
}
grid.addEventListener('click', (e) => {
  const b = e.target.closest('[data-foto]'); if (!b) return;
  mostrarFoto(+b.dataset.foto);
  if (typeof visor.showModal === 'function') visor.showModal(); else visor.setAttribute('open', '');
});
visor.addEventListener('click', (e) => {
  const a = e.target.closest('[data-accion]')?.dataset.accion;
  if (a === 'cerrar' || e.target === visor) {
    if (typeof visor.close === 'function') visor.close(); else visor.removeAttribute('open');
  }
  if (a === 'prev') mostrarFoto(fotoActual - 1);
  if (a === 'next') mostrarFoto(fotoActual + 1);
});
visor.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') mostrarFoto(fotoActual - 1);
  if (e.key === 'ArrowRight') mostrarFoto(fotoActual + 1);
});
let toqueX = null;
visor.addEventListener('touchstart', (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
visor.addEventListener('touchend', (e) => {
  if (toqueX === null) return; const dx = e.changedTouches[0].clientX - toqueX; toqueX = null;
  if (Math.abs(dx) > 50) mostrarFoto(fotoActual + (dx < 0 ? 1 : -1));
});

/* ----------------------------------------------------------- UNIVERSOS */
$('#universos-lista').innerHTML = universos.map((u, i) => `
  <article class="universo revela u-${i}">
    <header><span class="u-jp">${esc(u.jp)}</span><h3>${esc(u.obra)}</h3></header>
    ${u.tipo === 'sistema'
      ? `<div class="sistema">${u.sistema.map((l, j) => `<p class="${j === 0 ? 'sis-titulo' : ''}">${esc(l)}</p>`).join('')}</div>`
      : `<blockquote>${esc(u.texto)}</blockquote>`}
    <p class="u-autor"><span class="etiqueta ${u.tipo === 'cita' ? 'dato' : 'arte'}">${u.tipo === 'cita' ? 'Cita' : 'Inspirado'}</span> ${esc(u.autor)}</p>
  </article>`).join('');

/* --------------------------------------------------------------- CARTA */
$('#carta-texto').innerHTML = `
  <p class="carta-saludo">${esc(carta.saludo)}</p>
  ${carta.parrafos.map((p) => `<p>${esc(p)}</p>`).join('')}
  <p class="carta-despedida">${esc(carta.despedida)}${carta.firma ? `<br><span class="carta-firma">${esc(carta.firma)}</span>` : ''}</p>`;

/* --------------------------------------------------------------- FINAL */
$('#final-titulo').textContent = final.titulo;
$('#final-linea').textContent = final.linea;
const deseos = [
  'Tu deseo ya viaja entre las estrellas.',
  'Guardado. Las Leónidas se encargan del resto.',
  'Otro deseo más para el cielo de Stefi.',
];
let nDeseos = 0;
$('#btn-deseo').addEventListener('click', () => {
  $('#deseo-msg').textContent = deseos[nDeseos++ % deseos.length];
  if (reducido.matches) return;
  for (let i = 0; i < 18; i++) setTimeout(() => lanzarMeteoro(true), i * 90);
  audio?.campana?.();
});

/* ------------------------------------------- REVELADO Y ESCENA ACTIVA */
const io = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.15, rootMargin: '0px 0px -5% 0px' });
document.querySelectorAll('.revela').forEach((n) => io.observe(n));

const enlaces = [...document.querySelectorAll('.indice a')];
const ioEscena = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    enlaces.forEach((a) => a.toggleAttribute('aria-current', a.getAttribute('href') === '#' + id));
    document.body.dataset.escena = id;
    tasaMeteoros = id === 'final' ? 0.05 : id === 'inicio' ? 0.012 : 0.004;
  });
}, { threshold: 0.4 });
document.querySelectorAll('.escena').forEach((s) => ioEscena.observe(s));

requestAnimationFrame(() => { document.body.classList.add('listo'); trazarHilo(); });
window.addEventListener('load', trazarHilo);
document.fonts?.ready.then(trazarHilo);
