/* ==========================================================================
   CONTENIDO EDITABLE DEL REGALO
   Todo el texto del sitio vive aquí. Cambia lo que quieras sin tocar el resto.
   ========================================================================== */

export const persona = {
  nombre: 'Stefi',
  nombreCompleto: 'Ashly Estefanía Castiblanco Acosta',
  edad: 18,
  fecha: '18 de noviembre de 2008',
  lugar: 'Pacho, Cundinamarca',
};

export const intro = {
  kicker: '18 · XI · 2008 — 18 · XI · 2026',
  mensaje:
    'Un 18 de noviembre, en Pacho, el mundo empezó a ser un poquito más bonito. ' +
    'Dieciocho años después, todo este cielo es para ti.',
};

/* --------------------------------------------------------------------------
   GALERÍA
   1. Copia tus fotos en  public/fotos/  (ej.: foto-01.jpg ... foto-08.jpg)
   2. Cambia "archivo" por el nombre exacto de cada foto (con su extensión).
   3. Escribe un pie de foto corto en "texto" (o déjalo vacío: '').
   Puedes agregar más de 8 fotos copiando una línea.
   -------------------------------------------------------------------------- */
export const fotos = [
  { archivo: 'foto-01.svg', texto: 'El primer recuerdo que quiero guardar', vertical: true },
  { archivo: 'foto-02.svg', texto: 'Esa tarde que no queríamos que terminara' },
  { archivo: 'foto-03.svg', texto: 'Tu risa, en su mejor versión' },
  { archivo: 'foto-04.svg', texto: 'Contigo hasta lo simple brilla', vertical: true },
  { archivo: 'foto-05.svg', texto: 'Un día cualquiera que se volvió favorito', vertical: true },
  { archivo: 'foto-06.svg', texto: 'Mirando el mismo cielo' },
  { archivo: 'foto-07.svg', texto: 'Nosotros, sin pose' },
  { archivo: 'foto-08.svg', texto: 'Lo que viene es todavía mejor', vertical: true },
];

/* --------------------------------------------------------------------------
   MÚSICA — RADWIMPS · Your Name. (Kimi no Na wa, 2016)
   Los botones abren plataformas oficiales. No se aloja ni se descarga música.
   -------------------------------------------------------------------------- */
export const canciones = [
  { titulo: 'Dream Lantern', jp: '夢灯籠', nota: 'La que abre la película. Como abrir los ojos a un día nuevo.' },
  { titulo: 'Zenzenzense', jp: '前前前世', nota: 'Como si ya nos conociéramos de antes de antes.' },
  { titulo: 'Sparkle', jp: 'スパークル', nota: 'Para escucharla mirando el cielo, sin afán.' },
  { titulo: 'Nandemonaiya', jp: 'なんでもないや', nota: 'La de los créditos. La que se queda sonando por dentro.' },
  { titulo: 'Katawaredoki', jp: 'かたわれ時', nota: 'Esa hora mágica del atardecer en la que todo se encuentra.' },
];
export const albumAppleMusic = 'https://music.apple.com/album/1434005560';

/* --------------------------------------------------------------------------
   UNIVERSOS ANIME
   tipo: 'cita'  → frase de la obra (traducción libre al español)
         'inspirado' → texto original inspirado en los temas de la obra
   -------------------------------------------------------------------------- */
export const universos = [
  {
    obra: 'Your Name.',
    jp: '君の名は。',
    tipo: 'cita',
    texto:
      'Unir los hilos es musubi. Que las personas se encuentren es musubi. Que el tiempo fluya también es musubi.',
    autor: 'Hitoha Miyamizu — Kimi no Na wa (Makoto Shinkai, 2016). Traducción libre.',
  },
  {
    obra: 'Mushoku Tensei',
    jp: '無職転生',
    tipo: 'inspirado',
    texto:
      'Hay un mundo entero esperando a que lo recorras: idiomas por aprender, magias por descubrir y caminos que todavía no tienen nombre.',
    autor: 'Inspirado en el espíritu aventurero de Mushoku Tensei.',
  },
  {
    obra: 'Nanatsu no Taizai',
    jp: '七つの大罪',
    tipo: 'inspirado',
    texto:
      'Hay amores que se reconocen siempre, sin importar el reino, la época ni la historia en la que aparezcan.',
    autor: 'Inspirado en Meliodas y Elizabeth — Los siete pecados capitales.',
  },
  {
    obra: 'Solo Leveling',
    jp: '나 혼자만 레벨업',
    tipo: 'sistema',
    sistema: [
      '[ NIVEL 18 ALCANZADO ]',
      'Nueva etapa desbloqueada.',
      'Todas tus estadísticas han aumentado.',
      'Misión diaria: ser feliz. Recompensa: todo lo bonito que viene.',
    ],
    autor: 'Inspirado en las ventanas del Sistema de Solo Leveling.',
  },
];

/* --------------------------------------------------------------------------
   CARTA — escríbela con tus palabras. Cada elemento del arreglo es un párrafo.
   -------------------------------------------------------------------------- */
export const carta = {
  saludo: 'Stefi:',
  parrafos: [
    'Hoy cumples dieciocho y llevo días pensando cómo decirte todo lo que siento sin que suene a tarjeta de almacén. Creo que no se puede, así que te lo voy a decir como me sale.',
    'Me gusta tu risa, esa que se te escapa cuando algo te da pena. Me gusta cómo hablas de lo que te emociona, con las manos y con los ojos al mismo tiempo. Me gusta que contigo hasta un día normal se siente como una de esas escenas en las que el cielo se pinta de colores.',
    'Le doy gracias a Dios por tu vida, por el día en que naciste allá en Pacho y por todos los caminos que hicieron que nos encontráramos. Le pido que te bendiga siempre, que te llene de alegría y que cada sueño que tienes guardado se te vaya cumpliendo, uno por uno, a su tiempo.',
    'Dieciocho años es apenas el comienzo de lo bonito. Hay muchísimo por vivir y yo quiero estar ahí: en los viajes, en las tardes sin plan, en las canciones que vamos a gastar de tanto oírlas.',
    'Feliz cumpleaños, mi amor. Que este año sea tan bonito como tú.',
  ],
  despedida: 'Con todo mi amor,',
  firma: '', // ← escribe aquí tu nombre
};

export const final = {
  titulo: 'Feliz cumpleaños, Stefi',
  linea: 'Que Dios bendiga cada paso de este nuevo año. El cielo entero está de tu lado.',
};
