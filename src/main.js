import './style.css';
import { portada, horaMagica, horaMagicaCierre, fotos, guinos, carta, cierre } from './contenido.js';
import { iniciarMusica, sonarAhora } from './musica.js';

const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const reducido = window.matchMedia('(prefers-reduced-motion: reduce)');
const BASE = import.meta.env.BASE_URL;

/* ================================================================ TEXTOS */
let n = 0;
$('#titulo').innerHTML = portada.titulo
  .map((linea) => `<span class="linea">${linea.split(' ').map((p) => `<span class="palabra" style="--i:${n++}">${esc(p)}</span>`).join(' ')}</span>`)
  .join('');
$('#portada-linea').textContent = portada.linea;
$('#versos').innerHTML = horaMagica.map((v, i) => `<p class="verso revela" style="--i:${i * 2}">${esc(v)}</p>`).join('');
$('#versos-cierre').textContent = horaMagicaCierre;
$('#cierre-titulo').textContent = cierre.titulo;
$('#cierre-linea').textContent = cierre.linea;

/* ========================================================== CIELO (canvas) */
const canvas = $('#cielo-canvas');
const ctx = canvas.getContext('2d');
let W = 0, H = 0, DPR = 1, estrellas = [], meteoros = [], destellos = [], scrollY = 0;
let escena = 'portada', tasaMeteoros = 0.002;
const cometa = { alfa: 1, objetivo: 1, division: 0, dividir: false };

function crearEstrellas() {
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  const mismoAncho = W === window.innerWidth && estrellas.length;
  W = window.innerWidth; H = window.innerHeight;
  canvas.width = W * DPR; canvas.height = H * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  if (mismoAncho) return; // la barra del navegador móvil cambia la altura: no regenerar
  const total = Math.min(360, Math.round((W * H) / 4200));
  estrellas = Array.from({ length: total }, () => ({
    x: Math.random() * W,
    y: Math.random() * H * 1.5,
    r: Math.random() ** 4 * 1.1 + 0.2,
    z: Math.random() * 0.35 + 0.05,
    f: Math.random() * Math.PI * 2,
    v: Math.random() * 0.0018 + 0.0004,
    tinte: Math.random() < 0.15 ? '255,222,232' : Math.random() < 0.2 ? '214,214,255' : '255,255,255',
  }));
}

function lanzarMeteoro(fuerte = false) {
  const ang = Math.PI * (0.2 + Math.random() * 0.1);
  const vel = (fuerte ? 10 : 7) + Math.random() * 5;
  meteoros.push({
    x: W * (0.2 + Math.random() * 0.9), y: -20 + Math.random() * H * 0.3,
    vx: -Math.cos(ang) * vel, vy: Math.sin(ang) * vel,
    vida: 0, max: 45 + Math.random() * 35, largo: 70 + Math.random() * 110, rosa: Math.random() < 0.4,
  });
}

function destello(x, y, k) {
  // destello de cuatro puntas, muy pequeño
  const l = 5 + k * 6;
  ctx.strokeStyle = `rgba(255,240,245,${0.7 * k})`; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(x - l, y); ctx.lineTo(x + l, y); ctx.moveTo(x, y - l); ctx.lineTo(x, y + l); ctx.stroke();
}

function colaCometa(x, y, ang, largo, ancho, color, alfa) {
  const tx = x + Math.cos(ang) * largo, ty = y + Math.sin(ang) * largo;
  const g = ctx.createLinearGradient(x, y, tx, ty);
  g.addColorStop(0, `rgba(${color},${0.85 * alfa})`);
  g.addColorStop(0.25, `rgba(${color},${0.35 * alfa})`);
  g.addColorStop(1, `rgba(${color},0)`);
  ctx.strokeStyle = g; ctx.lineCap = 'round';
  for (const [w, a] of [[ancho * 3, 0.25], [ancho, 1]]) { ctx.globalAlpha = a; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(tx, ty); ctx.stroke(); }
  ctx.globalAlpha = 1;
  const h = ctx.createRadialGradient(x, y, 0, x, y, ancho * 5);
  h.addColorStop(0, `rgba(255,255,255,${alfa})`); h.addColorStop(1, `rgba(${color},0)`);
  ctx.fillStyle = h; ctx.beginPath(); ctx.arc(x, y, ancho * 5, 0, Math.PI * 2); ctx.fill();
}

function dibujarCometa() {
  cometa.alfa += (cometa.objetivo - cometa.alfa) * 0.04;
  if (cometa.dividir) cometa.division = Math.min(1, cometa.division + 0.006);
  if (cometa.alfa < 0.01) return;
  const movil = W < 700;
  const x = W * (movil ? 0.68 : 0.74), y = H * (movil ? 0.12 : 0.16);
  const ang = -Math.PI * 0.82, largo = Math.min(W, H) * (movil ? 0.42 : 0.5);
  colaCometa(x, y, ang, largo, 1.6, '170,215,255', cometa.alfa);
  if (cometa.division > 0) {
    // como en Your Name: el cometa se separa y un fragmento brilla en rosa
    const d = cometa.division;
    colaCometa(x - 30 * d, y + 70 * d, ang + 0.12 * d, largo * 0.8, 1.4, '255,170,200', cometa.alfa * d);
  }
}

function dibujar(t) {
  ctx.clearRect(0, 0, W, H);
  for (const s of estrellas) {
    const y = (((s.y - scrollY * s.z) % (H * 1.5)) + H * 1.5) % (H * 1.5);
    if (y > H) continue;
    const a = 0.5 + Math.sin(s.f + t * s.v) * 0.45;
    ctx.fillStyle = `rgba(${s.tinte},${a})`;
    ctx.beginPath(); ctx.arc(s.x, y, s.r, 0, Math.PI * 2); ctx.fill();
    if (s.r > 0.95 && Math.random() < 0.0006) destellos.push({ x: s.x, y, vida: 0 });
  }
  destellos = destellos.filter((d) => d.vida < 60);
  for (const d of destellos) { d.vida++; destello(d.x, d.y, Math.sin((d.vida / 60) * Math.PI)); }
  dibujarCometa();
  if (Math.random() < tasaMeteoros) lanzarMeteoro();
  meteoros = meteoros.filter((m) => m.vida < m.max);
  for (const m of meteoros) {
    m.vida++; m.x += m.vx; m.y += m.vy;
    const k = 1 - m.vida / m.max, mag = Math.hypot(m.vx, m.vy);
    const tx = m.x - (m.vx / mag) * m.largo, ty = m.y - (m.vy / mag) * m.largo;
    const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
    g.addColorStop(0, `rgba(255,255,255,${0.9 * k})`);
    g.addColorStop(0.3, m.rosa ? `rgba(255,175,205,${0.45 * k})` : `rgba(190,205,255,${0.45 * k})`);
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.strokeStyle = g; ctx.lineWidth = 1.3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
  }
}

let animando = false;
function bucle(t) { if (!animando) return; dibujar(t); requestAnimationFrame(bucle); }
function iniciarCielo() {
  if (reducido.matches) { animando = false; cometa.alfa = cometa.objetivo; cometa.division = cometa.dividir ? 1 : 0; dibujar(0); return; }
  if (!animando) { animando = true; requestAnimationFrame(bucle); }
}
crearEstrellas(); iniciarCielo();
document.addEventListener('visibilitychange', () => { if (document.hidden) animando = false; else iniciarCielo(); });
reducido.addEventListener?.('change', iniciarCielo);

/* ============================================================== HILO ROJO */
const hilo = $('#hilo'), hiloPath = $('#hilo-path'), hiloSombra = $('#hilo-sombra');
let hiloLargo = 0;
function trazarHilo() {
  const main = $('main'), w = document.documentElement.clientWidth;
  hilo.setAttribute('viewBox', `0 0 ${w} ${main.offsetHeight}`);
  hilo.style.height = main.offsetHeight + 'px';
  const escenas = [...document.querySelectorAll('.escena')].filter((s) => !s.hidden);
  const movil = w <= 600;
  const lados = [movil ? 8 : Math.max(16, w * 0.022), w - (movil ? 8 : Math.max(16, w * 0.022))];
  const hora = $('#hora'), nudo = hora.querySelector('.nudo');
  const rn = nudo.getBoundingClientRect(); // es un SVG: no tiene offsetTop
  const y0 = rn.top + window.scrollY + rn.height / 2 - main.getBoundingClientRect().top - window.scrollY;
  // nace en el nudo de la hora mágica y baja por el margen
  let lado = 0;
  let d = `M ${w * 0.5} ${y0} C ${w * 0.5} ${y0 + 120}, ${lados[0]} ${y0 + 40}, ${lados[0]} ${y0 + 200}`;
  escenas.forEach((s) => {
    if (s.offsetTop <= hora.offsetTop) return;
    const yb = s.offsetTop + 30;
    const nuevo = 1 - lado;
    d += ` L ${lados[lado]} ${yb - 70} C ${lados[lado]} ${yb - 10}, ${lados[nuevo]} ${yb - 30}, ${lados[nuevo]} ${yb + 40}`;
    lado = nuevo;
  });
  const fin = $('#cierre'), texto = fin.querySelector('.cierre-texto');
  const yf = fin.offsetTop + texto.offsetTop + texto.offsetHeight + 24;
  d += ` L ${lados[lado]} ${yf - 140} C ${lados[lado]} ${yf - 40}, ${w * 0.5} ${yf - 90}, ${w * 0.5} ${yf}`;
  hiloPath.setAttribute('d', d); hiloSombra.setAttribute('d', d);
  hiloLargo = hiloPath.getTotalLength();
  for (const p of [hiloPath, hiloSombra]) p.style.strokeDasharray = hiloLargo;
  alHacerScroll();
}
function alHacerScroll() {
  scrollY = window.scrollY;
  if (!animando) dibujar(0);
  if (!hiloLargo) return;
  let off = 0;
  if (!reducido.matches) {
    const inicio = $('#hora').offsetTop;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = Math.max(0, Math.min(1, (scrollY - inicio + window.innerHeight * 0.5) / (max - inicio + window.innerHeight * 0.3)));
    off = hiloLargo * (1 - p);
  }
  for (const pth of [hiloPath, hiloSombra]) pth.style.strokeDashoffset = off;
}
window.addEventListener('scroll', alHacerScroll, { passive: true });
let rz;
window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { crearEstrellas(); trazarHilo(); }, 150); });

/* ================================================================ FOTOS */
const visor = $('#visor');
let fotoActual = 0;
const src = (f, w) => `${BASE}images/stefi/${f.id}-${w}.webp`;
function imagen(f, i, sizes, carga = 'lazy') {
  const alt = f.texto ? `Stefi — ${f.texto}` : `Stefi, fotografía ${i + 1}`;
  return `<button type="button" data-foto="${i}" aria-label="Ampliar: ${esc(alt)}">
    <img src="${src(f, 1600)}" srcset="${src(f, 800)} 800w, ${src(f, 1600)} 1600w" sizes="${sizes}"
      width="${f.w}" height="${f.h}" alt="${esc(alt)}" loading="${carga}" decoding="async" />
  </button>${f.texto ? `<figcaption>${esc(f.texto)}</figcaption>` : ''}`;
}
if (fotos.length) {
  $('#fotos').hidden = false;
  const forma = (f) => (f.w / f.h > 1.15 ? 'horizontal' : f.w / f.h < 0.87 ? 'vertical' : 'cuadrada');
  $('#protagonista').innerHTML = imagen(fotos[0], 0, '(max-width: 700px) 100vw, 1100px');
  $('#protagonista').classList.add(forma(fotos[0]));
  $('#editorial').innerHTML = fotos.slice(1).map((f, k) =>
    `<figure class="foto revela ${forma(f)}" style="--i:${k % 3}">${imagen(f, k + 1, '(max-width: 700px) 50vw, 33vw')}</figure>`).join('');

  const mostrar = (i) => {
    fotoActual = (i + fotos.length) % fotos.length;
    const f = fotos[fotoActual];
    const img = $('#visor-img');
    img.src = src(f, 1600); img.alt = f.texto ? `Stefi — ${f.texto}` : `Stefi, fotografía ${fotoActual + 1}`;
    $('#visor-txt').textContent = f.texto || '';
  };
  $('#fotos').addEventListener('click', (e) => {
    const b = e.target.closest('[data-foto]'); if (!b) return;
    mostrar(+b.dataset.foto);
    if (typeof visor.showModal === 'function') visor.showModal(); else visor.setAttribute('open', '');
  });
  visor.addEventListener('click', (e) => {
    const a = e.target.closest('[data-accion]')?.dataset.accion;
    if (a === 'cerrar' || e.target === visor) { if (typeof visor.close === 'function') visor.close(); else visor.removeAttribute('open'); }
    if (a === 'prev') mostrar(fotoActual - 1);
    if (a === 'next') mostrar(fotoActual + 1);
  });
  visor.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') mostrar(fotoActual - 1);
    if (e.key === 'ArrowRight') mostrar(fotoActual + 1);
  });
  let toqueX = null;
  visor.addEventListener('touchstart', (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
  visor.addEventListener('touchend', (e) => {
    if (toqueX === null) return;
    const dx = e.changedTouches[0].clientX - toqueX; toqueX = null;
    if (Math.abs(dx) > 50) mostrar(fotoActual + (dx < 0 ? 1 : -1));
  });
}

/* ================================================================ MÚSICA */
iniciarMusica();

/* ================================================================ GUIÑOS */
$('#guinos').innerHTML = guinos.map((g, i) => `
  <li class="guino revela g-${i}" style="--i:${i}">
    <span class="g-marca"${g.lang ? ` lang="${g.lang}"` : ''} aria-hidden="true">${esc(g.marca)}</span>
    ${g.sistema
      ? `<div class="sistema" role="img" aria-label="${esc(g.sistema.join(' '))}">${g.sistema.map((l, j) => `<p${j === 0 ? ' class="sis-titulo"' : ''}>${esc(l)}</p>`).join('')}</div>`
      : `<p class="g-texto">${esc(g.texto)}</p>`}
    <p class="g-obra">${esc(g.obra)}</p>
  </li>`).join('');

/* ================================================================= CARTA */
const sobre = $('#sobre'), cartaEl = $('#carta-texto'), btnCarta = $('#abrir-carta');
cartaEl.innerHTML = `
  <p class="carta-saludo">${esc(carta.saludo)}</p>
  ${carta.parrafos.map((p) => `<p>${esc(p)}</p>`).join('')}
  <p class="carta-despedida">${esc(carta.despedida)}${carta.firma ? `<span class="carta-firma">${esc(carta.firma)}</span>` : ''}</p>`;
btnCarta.addEventListener('click', () => {
  cartaEl.style.maxHeight = cartaEl.scrollHeight + 'px';
  sobre.classList.add('abierta');
  btnCarta.setAttribute('aria-expanded', 'true');
  setTimeout(() => { cartaEl.style.maxHeight = 'none'; trazarHilo(); }, reducido.matches ? 0 : 1400);
  cartaEl.focus({ preventScroll: true });
});

/* ================================================================ CIERRE */
const deseos = ['Tu deseo ya va camino a las estrellas.', 'Guardado en el cielo, solo para ti.', 'Que se cumpla, y que sea pronto.'];
let nDeseos = 0;
$('#btn-deseo').addEventListener('click', () => {
  $('#deseo-msg').textContent = deseos[nDeseos++ % deseos.length];
  cometa.dividir = true;
  if (reducido.matches) { cometa.division = 1; dibujar(0); return; }
  for (let i = 0; i < 18; i++) setTimeout(() => lanzarMeteoro(true), i * 110);
});

/* ============================================= REVELADO Y ESCENA ACTUAL */
const io = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.revela').forEach((x) => io.observe(x));

const ioEscena = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (!e.isIntersecting) return;
    escena = e.target.id;
    document.body.dataset.escena = escena;
    // el cometa acompaña el principio y el final de la historia
    cometa.objetivo = ['portada', 'hora', 'cierre'].includes(escena) ? 1 : 0;
    tasaMeteoros = escena === 'cierre' ? 0.03 : escena === 'portada' ? 0.004 : 0.0015;
    if (escena === 'cierre') cometa.dividir = true;
    if (!animando) { cometa.alfa = cometa.objetivo; cometa.division = cometa.dividir ? 1 : 0; dibujar(0); }
  });
}, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
document.querySelectorAll('.escena').forEach((s) => ioEscena.observe(s));

/* ================================================================ ENTRADA */
const entrada = $('#entrada'), principal = $('#principal');
principal.inert = true;
document.body.classList.add('cerrado');
$('#entrar').focus({ preventScroll: true });
$('#entrar').addEventListener('click', () => {
  sonarAhora(); // dentro del mismo toque, para que el navegador permita el sonido
  entrada.classList.add('saliendo');
  principal.inert = false;
  document.body.classList.remove('cerrado');
  document.body.classList.add('listo');
  if ($('#rep-alterno').hidden) $('#mini').hidden = false;
  setTimeout(() => { entrada.hidden = true; }, reducido.matches ? 0 : 1400);
  $('#titulo').setAttribute('tabindex', '-1');
  $('#titulo').focus({ preventScroll: true });
  trazarHilo();
});
requestAnimationFrame(trazarHilo);
window.addEventListener('load', trazarHilo);
document.fonts?.ready.then(trazarHilo);
document.querySelectorAll('.editorial img, .protagonista img').forEach((img) => img.addEventListener('load', trazarHilo, { once: true }));
