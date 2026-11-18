/* ==========================================================================
   EL CIELO DEL 18 DE NOVIEMBRE DE 2008 — PACHO, CUNDINAMARCA
   Datos calculados con Astronomy Engine v2.1.19 (Don Cross; validado contra
   JPL Horizons y NOVAS) para 5.13° N, 74.16° W, 2 136 m s. n. m.
   Hora de referencia: 12:00 hora de Colombia (UTC−5). La hora exacta de
   nacimiento no se conoce; las horas de salida y puesta son las de ese día.
   Constelaciones: límites oficiales de la IAU.
   ========================================================================== */

export const observador = { lat: '5.13° N', lon: '74.16° W', alt: '2 136 m', zona: 'UTC−5' };

export const luna = {
  fase: 'Gibosa menguante',
  iluminacion: 63, // %
  edad: 20.7, // días desde la luna nueva del 28 oct 2008
  constelacion: 'Cáncer',
  salida: '22:25 (17 nov)',
  puesta: '11:04',
  nota: 'Seguía en el cielo de la mañana. El cuarto menguante llegó al día siguiente (19 nov, 16:31).',
};

export const sol = {
  constelacion: 'Libra',
  salida: '05:46',
  mediodia: '11:41',
  puesta: '17:37',
  altura: 65, // grados sobre el horizonte a mediodía
};

// lon = longitud eclíptica geocéntrica (grados) a las 12:00 hora local.
// arriba = intervalos [desde, hasta] en horas locales sobre el horizonte.
export const cuerpos = [
  { id: 'sol', nombre: 'Sol', simbolo: '☉', lon: 236.7, constelacion: 'Libra', salida: '05:46', puesta: '17:37', arriba: [[5.77, 17.62]], color: '#ffd27a', r: 9 },
  { id: 'luna', nombre: 'Luna', simbolo: '☾', lon: 131.7, constelacion: 'Cáncer', salida: '22:25*', puesta: '11:04', arriba: [[0, 11.07], [23.32, 24]], color: '#f4f1e6', r: 7 },
  { id: 'mercurio', nombre: 'Mercurio', simbolo: '☿', lon: 232.7, constelacion: 'Libra', salida: '05:29', puesta: '17:21', arriba: [[5.48, 17.35]], color: '#c9c3b8', r: 3, nota: 'A 4° del Sol: invisible a simple vista.' },
  { id: 'venus', nombre: 'Venus', simbolo: '♀', lon: 277.2, constelacion: 'Sagitario', salida: '08:43', puesta: '20:29', arriba: [[8.72, 20.48]], color: '#fff1c9', r: 5, nota: 'Lucero de la tarde (magnitud −4,1) al anochecer, hacia el occidente.' },
  { id: 'marte', nombre: 'Marte', simbolo: '♂', lon: 241.7, constelacion: 'Escorpio', salida: '06:08', puesta: '17:56', arriba: [[6.13, 17.93]], color: '#ff8a6a', r: 3.5, nota: 'A 5° del Sol: oculto por su brillo.' },
  { id: 'jupiter', nombre: 'Júpiter', simbolo: '♃', lon: 289.8, constelacion: 'Sagitario', salida: '09:36', puesta: '21:22', arriba: [[9.6, 21.37]], color: '#ffe0b0', r: 4.5, nota: 'Brillante en el anochecer (magnitud −2,0), cerca de Venus.' },
  { id: 'saturno', nombre: 'Saturno', simbolo: '♄', lon: 170.1, constelacion: 'Leo', salida: '01:28', puesta: '13:34', arriba: [[1.47, 13.57]], color: '#e8d6a0', r: 4, nota: 'Visible en la madrugada, en Leo.' },
  { id: 'urano', nombre: 'Urano', simbolo: '♅', lon: 348.8, constelacion: 'Acuario', salida: '13:23', puesta: '01:25', arriba: [[0, 1.42], [13.38, 24]], color: '#a8e6e0', r: 2.5, nota: 'Magnitud 5,8: solo con cielo muy oscuro o binoculares.' },
  { id: 'neptuno', nombre: 'Neptuno', simbolo: '♆', lon: 321.5, constelacion: 'Capricornio', salida: '11:43', puesta: '23:35', arriba: [[11.72, 23.58]], color: '#8fb0ff', r: 2.5, nota: 'Magnitud 7,9: requiere telescopio.' },
];

// Límites aproximados de las constelaciones sobre la eclíptica (IAU), en grados.
export const constelaciones = [
  ['Piscis', 351.6], ['Aries', 29.0], ['Tauro', 53.5], ['Géminis', 90.4],
  ['Cáncer', 118.2], ['Leo', 138.2], ['Virgo', 174.2], ['Libra', 218.0],
  ['Escorpio', 241.0], ['Ofiuco', 247.7], ['Sagitario', 266.3],
  ['Capricornio', 299.7], ['Acuario', 327.9],
];

export const hechos = [
  {
    titulo: 'Las Leónidas seguían activas',
    texto:
      'La lluvia de meteoros de las Leónidas tuvo un estallido el 17 de noviembre de 2008, hacia las 01:00–02:00 UT. El día en que naciste la lluvia seguía activa.',
    fuente: 'International Meteor Organization · CBET 1572 (IAU)',
  },
  {
    titulo: 'Venus y Júpiter se acercaban',
    texto:
      'Esa semana los dos planetas más brillantes del anochecer estaban a unos 13° uno del otro. El 1 de diciembre de 2008 se juntaron con la Luna creciente en una conjunción que se vio en todo el mundo.',
    fuente: 'Cálculo con Astronomy Engine',
  },
  {
    titulo: 'El Sol, muy alto',
    texto:
      'Pacho está a solo 5° del ecuador: a mediodía (11:41) el Sol estaba a 65° sobre el horizonte, casi encima, en dirección a Libra.',
    fuente: 'Cálculo con Astronomy Engine',
  },
];
