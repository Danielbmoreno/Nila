/* ==========================================================================
   REPRODUCTOR — controla el reproductor oficial de Spotify (iFrame API).
   Todo lo que muestra (reproduciendo, progreso, duración) viene de los eventos
   reales de Spotify. Nunca se simula: si Spotify no carga, se ofrecen enlaces.
   https://developer.spotify.com/documentation/embeds/references/iframe-api
   ========================================================================== */
import { canciones } from './contenido.js';

const API = 'https://open.spotify.com/embed/iframe-api/v1';
const $ = (s) => document.querySelector(s);
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const uri = (c) => `spotify:track:${c.spotify}`;
const enlace = (c) => `https://open.spotify.com/track/${c.spotify}`;

let control = null, actual = 0, pausado = true, arrastrando = false, iniciado = false;

const ui = {};

function pintarPista() {
  const c = canciones[actual];
  ui.titulo.textContent = c.titulo;
  ui.jp.textContent = c.jp;
  ui.detalle.textContent = c.detalle;
  ui.pistas.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === actual)));
}

function reiniciarProgreso() {
  ui.rango.value = 0; ui.rango.max = 0; ui.rango.disabled = true;
  ui.actual.textContent = '0:00'; ui.total.textContent = '–:––';
  ui.rango.style.setProperty('--p', '0%');
}

function estado(texto) { ui.estado.textContent = texto; }

function fallar() {
  if (!ui.play.disabled) return; // ya está funcionando
  estado('No se pudo cargar el reproductor de Spotify.');
  ui.play.disabled = true;
  ui.alterno.hidden = false;
  ui.alterno.innerHTML = 'Puedes escucharlas directamente en Spotify: ' +
    canciones.map((c) => `<a href="${enlace(c)}" target="_blank" rel="noopener">${c.titulo}</a>`).join(' · ');
}

function alActualizar({ data }) {
  if (!data) return;
  pausado = data.isPaused;
  const dur = Math.round((data.duration || 0) / 1000);
  const pos = Math.min(dur, Math.round((data.position || 0) / 1000));
  if (dur > 0) {
    ui.rango.disabled = false;
    ui.rango.max = dur;
    ui.total.textContent = mmss(dur);
    if (!arrastrando) {
      ui.rango.value = pos;
      ui.actual.textContent = mmss(pos);
      ui.rango.setAttribute('aria-valuetext', `${mmss(pos)} de ${mmss(dur)}`);
      ui.rango.style.setProperty('--p', `${(pos / dur) * 100}%`);
    }
  }
  const sonando = !pausado && !data.isBuffering;
  ui.raiz.classList.toggle('sonando', sonando);
  ui.play.classList.toggle('en-pausa', !pausado);
  ui.play.setAttribute('aria-label', pausado ? 'Reproducir' : 'Pausar');
  estado(data.isBuffering ? 'Cargando…' : pausado ? (pos > 0 ? 'En pausa' : 'Lista para escuchar') : 'Sonando ahora');
}

function crearControlador(IFrameAPI) {
  IFrameAPI.createController(
    ui.embed,
    { uri: uri(canciones[actual]), width: '100%', height: 80 },
    (c) => {
      control = c;
      c.addListener('ready', () => { ui.play.disabled = false; estado('Lista para escuchar'); });
      c.addListener('playback_update', alActualizar);
    }
  );
}

function cargarAPI() {
  if (iniciado) return;
  iniciado = true;
  window.onSpotifyIframeApiReady = crearControlador;
  const s = document.createElement('script');
  s.src = API; s.async = true;
  s.onerror = fallar;
  document.head.append(s);
  setTimeout(fallar, 15000);
}

export function iniciarMusica() {
  Object.assign(ui, {
    raiz: $('#reproductor'), estado: $('#rep-estado'), titulo: $('#rep-titulo'), jp: $('#rep-jp'),
    detalle: $('#rep-detalle'), play: $('#rep-play'), rango: $('#rep-progreso'), actual: $('#rep-actual'),
    total: $('#rep-total'), pistas: $('#rep-pistas'), embed: $('#spotify-embed'), alterno: $('#rep-alterno'),
  });

  ui.pistas.innerHTML = canciones.map((c, i) =>
    `<button type="button" data-pista="${i}" aria-pressed="false"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="t">${c.titulo}</span><span class="jp" lang="ja">${c.jp}</span></button>`).join('');
  pintarPista();

  ui.play.addEventListener('click', () => control?.togglePlay());

  ui.pistas.addEventListener('click', (e) => {
    const b = e.target.closest('[data-pista]');
    if (!b || +b.dataset.pista === actual) return;
    actual = +b.dataset.pista;
    pintarPista();
    reiniciarProgreso();
    if (control) {
      const seguir = !pausado;
      control.loadUri(uri(canciones[actual]));
      if (seguir) control.play();
      estado(seguir ? 'Cargando…' : 'Lista para escuchar');
    }
  });

  ui.rango.addEventListener('input', () => {
    arrastrando = true;
    ui.actual.textContent = mmss(+ui.rango.value);
    ui.rango.style.setProperty('--p', `${(ui.rango.value / (ui.rango.max || 1)) * 100}%`);
  });
  ui.rango.addEventListener('change', () => { control?.seek(+ui.rango.value); arrastrando = false; });

  // El reproductor de Spotify solo se carga cuando la escena se acerca.
  const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { cargarAPI(); io.disconnect(); } }, { rootMargin: '600px 0px' });
  io.observe(ui.raiz);
}
