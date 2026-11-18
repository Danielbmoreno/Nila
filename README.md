# Nila · Stefi 18

Regalo de cumpleaños para Stefi (18 de noviembre de 2026). Sitio estático hecho con Vite, sin backend.

## Escenas

1. **Inicio**: nombre, edad, fecha y lugar, con cielo estrellado animado.
2. **El cielo del día en que naciste**: rueda de la eclíptica con la posición real del Sol, la Luna y los planetas, fase lunar, horario sobre el horizonte de Pacho y datos curiosos verificados.
3. **La banda sonora**: RADWIMPS, *Your Name.*, con enlaces a Spotify, YouTube Music y Apple Music.
4. **Galería**: 8 fotos con visor ampliado.
5. **Mundos que nos gustan**: Your Name, Mushoku Tensei, Nanatsu no Taizai y Solo Leveling.
6. **Carta**.
7. **Final**: «Feliz cumpleaños, Stefi», lluvia de meteoros y botón para pedir un deseo.

## Editar el contenido

Todo el texto está en **`src/contenido.js`**: mensaje inicial, pies de foto, canciones, frases, carta y final.

- **Carta**: edita `carta.parrafos`. Escribe tu nombre en `carta.firma`.
- **Datos astronómicos**: `src/cielo.js`. Ya están calculados, no hace falta tocarlos.

## Cambiar las fotografías

1. Prepara tus fotos en JPG o WebP, de unos **1600 px de ancho como máximo** y **menos de 400 KB** cada una. [Squoosh](https://squoosh.app) sirve para comprimirlas.
2. Cópialas en **`public/fotos/`**, por ejemplo `foto-01.jpg` … `foto-08.jpg`.
3. En `src/contenido.js`, dentro de `fotos`, cambia `archivo` por el nombre exacto de cada foto. Las mayúsculas cuentan, porque GitHub Pages las distingue.
4. Pon `vertical: true` en las fotos verticales. En las horizontales, quita esa propiedad.
5. Borra los `foto-0X.svg` que ya no uses.

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # previsualiza dist/
```

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy.yml` compila y publica el sitio cada vez que hay un push a `main`. También se puede lanzar a mano desde la pestaña **Actions**.

1. En GitHub, ve a **Settings → Pages → Build and deployment → Source** y elige **GitHub Actions**.
2. Haz merge de los cambios en `main`.
3. El sitio quedará en `https://<usuario>.github.io/Nila/`.

`vite.config.js` usa `base: './'`, así que las rutas funcionan aunque el repositorio cambie de nombre.

## Privacidad

`index.html` incluye `<meta name="robots" content="noindex, nofollow">` para que los buscadores no indexen el sitio. Si quieres que aparezca en Google, borra esa línea.

## Fuentes y créditos

- Efemérides: [Astronomy Engine](https://github.com/cosinekitty/astronomy) v2.1.19, validado contra JPL Horizons y NOVAS. Calculado para Pacho (5,13° N, 74,16° W, 2 136 m) a las 12:00 hora de Colombia. Las constelaciones siguen los límites de la IAU.
- Leónidas 2008: [International Meteor Organization](https://www.imo.net/leonids-2008) y CBET 1572 (IAU).
- Música: RADWIMPS, *Your Name.* (2016). Este sitio no aloja audio; solo enlaza a plataformas oficiales. El botón «Ambiente» genera un sonido original en el navegador con Web Audio.
- Las obras citadas pertenecen a sus autores. Las frases marcadas como «Inspirado» son textos originales.
