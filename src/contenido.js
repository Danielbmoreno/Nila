/* ==========================================================================
   CONTENIDO DEL REGALO
   Todo el texto vive aquí. Puedes cambiar cualquier palabra sin tocar el diseño.
   ========================================================================== */

export const portada = {
  titulo: ['Stefi,', 'qué bonito que existas'],
  linea: '18 años · 18 de noviembre de 2026',
};

/* La «hora mágica» (kataware-doki): el atardecer en el que, en Your Name,
   dos caminos se encuentran. Texto original, no es una cita. */
export const horaMagica = [
  'Hay una hora, justo al atardecer,',
  'en la que el cielo no es ni día ni noche.',
  'Dicen que en ese momento',
  'los caminos que tenían que cruzarse, se cruzan.',
];
export const horaMagicaCierre = 'Gracias por cruzarte con el mío.';

/* --------------------------------------------------------------------------
   FOTOGRAFÍAS
   Archivos en  public/images/stefi/  (versiones optimizadas para web).
   La primera foto de la lista es la protagonista.
   orientacion: 'vertical' | 'horizontal' | 'cuadrada'
   texto: pie de foto corto (opcional).
   Mientras la lista esté vacía, la galería no se muestra.
   -------------------------------------------------------------------------- */
export const fotos = [
  { id: 'stefi-01', w: 1200, h: 1600, texto: '' },
  { id: 'stefi-02', w: 1600, h: 1200, texto: 'A la hora mágica.' },
  { id: 'stefi-03', w: 1200, h: 1600, texto: '' },
  { id: 'stefi-04', w: 1296, h: 972, texto: 'Nuestras rutas.' },
  { id: 'stefi-05', w: 900, h: 1600, texto: 'Contigo, hasta lo más simple.' },
  { id: 'stefi-06', w: 1200, h: 1600, texto: '' },
  { id: 'stefi-07', w: 1296, h: 972, texto: '' },
  { id: 'stefi-08', w: 1296, h: 972, texto: '' },
];

/* --------------------------------------------------------------------------
   MÚSICA — RADWIMPS · 君の名は。 Your Name. (2016)
   Grabaciones oficiales en Spotify. Se reproducen con el reproductor
   oficial de Spotify; este sitio no aloja ni copia audio.
   -------------------------------------------------------------------------- */
export const canciones = [
  {
    titulo: 'Dream Lantern',
    jp: '夢灯籠',
    detalle: 'RADWIMPS · Your Name.',
    spotify: '5fzDajm5HFdaeSZtQWfArw',
  },
  {
    titulo: 'Sparkle',
    jp: 'スパークル',
    detalle: 'movie ver. · RADWIMPS · Your Name.',
    spotify: '3A4FRzgve9BjfKbvVXRIFO',
  },
];

/* --------------------------------------------------------------------------
   GUIÑOS — frases propias inspiradas en cada mundo (no son citas).
   -------------------------------------------------------------------------- */
export const guinos = [
  { obra: 'Your Name.', marca: '結び', texto: 'Musubi: el hilo que une a las personas, aunque estén lejos.' },
  { obra: 'Mushoku Tensei', marca: '魔術', texto: 'Que tu nuevo mundo venga lleno de magia por aprender.' },
  { obra: 'Nanatsu no Taizai', marca: '七', texto: 'Te encontraría en cualquier reino.' },
  { obra: 'Solo Leveling', marca: 'SYSTEM', sistema: ['[ Nivel 18 alcanzado ]', 'Todas tus estadísticas han aumentado.'] },
];

/* --------------------------------------------------------------------------
   CARTA — es tuya: cambia lo que no suene a ti.
   Cada elemento del arreglo es un párrafo.
   -------------------------------------------------------------------------- */
export const carta = {
  saludo: 'Tefa:',
  parrafos: [
    'No sé muy bien por dónde empezar, así que empiezo por lo más cierto: qué bonito que existas.',
    'Hoy cumples dieciocho y yo estoy feliz como si el cumpleaños fuera mío. Me alegra muchísimo poder celebrarte, verte llegar a esta edad con esa forma tan tuya de reírte, de emocionarte por las cosas pequeñas y de convertir cualquier plan, por simple que sea, en un buen recuerdo.',
    'Me gusta quién eres. Me gusta tu forma de ver las cosas, tu manera de querer y lo fácil que es estar contigo. Contigo no tengo que fingir nada, y eso es de las cosas más bonitas que me han pasado.',
    'Le doy gracias a Dios por tu vida y por haberte puesto en mi camino. Le pido que te bendiga, que te cuide en cada paso y que esta etapa que empieza te traiga cosas tan bonitas como tú.',
    'Tengo muchas ganas de todo lo que viene: de los lugares que todavía no conocemos, de las canciones que nos van a recordar este año, de las fotos que aún no nos hemos tomado y de las tardes enteras hablando de cualquier cosa.',
    'Feliz cumpleaños, mi amor. Gracias por existir y por dejarme quererte.',
  ],
  despedida: 'Con todo mi amor,',
  firma: '', // ← escribe aquí tu nombre
};

export const cierre = {
  titulo: 'Por todas las historias bonitas que todavía te esperan.',
  linea: 'Feliz cumpleaños, Tefa.',
};
