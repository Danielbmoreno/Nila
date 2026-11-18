# Nila · Stefi 18

Regalo de cumpleaños para Stefi (18 de noviembre de 2026). Es un sitio estático hecho con Vite y publicado en GitHub Pages:
https://danielbmoreno.github.io/Nila/

## El recorrido

La página es un solo cielo que cambia mientras ella baja: empieza en el atardecer, pasa por la noche y termina en el amanecer. Un hilo rojo trenzado, el *musubi* de Your Name, une toda la historia.

1. **Portada.** «Stefi, qué bonito que existas», sobre un lago al atardecer con un cometa.
2. **La hora mágica** (*kataware-doki*). Un texto propio inspirado en Your Name y el nudo donde nace el hilo rojo.
3. **Fotografías.** Una foto protagonista y una galería editorial que se puede ampliar.
4. **Música.** Dream Lantern y Sparkle de RADWIMPS, con el reproductor oficial de Spotify.
5. **Los mundos que te gustan.** Guiños breves a Your Name, Mushoku Tensei, Nanatsu no Taizai y Solo Leveling.
6. **Carta.** Atada con hilo rojo; se abre al tocarla.
7. **Cierre.** «Por todas las historias bonitas que todavía te esperan», con estrellas fugaces y un deseo.

## Editar el contenido

Todo el texto está en **`src/contenido.js`**: portada, versos, canciones, guiños, carta y cierre.

En la carta, escribe tu nombre en `carta.firma`.

## Fotografías

Las fotos van en `public/images/stefi/`, con dos tamaños en WebP por foto:

```
public/images/stefi/stefi-01-800.webp
public/images/stefi/stefi-01-1600.webp
```

Luego se listan en `fotos`, dentro de `src/contenido.js`. La primera foto es la protagonista:

```js
export const fotos = [
  { id: 'stefi-01', w: 1600, h: 2000, texto: 'Pie de foto opcional' },
];
```

`w` y `h` son el ancho y el alto de la versión de 1600. Mientras `fotos` esté vacía, la galería no aparece.

## Música

Las canciones se reproducen con el **reproductor oficial de Spotify** a través de su iFrame API. Todo lo que muestra la página (reproduciendo, en pausa, progreso y duración) viene de los eventos reales de Spotify. Este sitio no aloja ni copia audio.

- Con la sesión de Spotify abierta en el navegador, las canciones se escuchan completas; sin sesión, Spotify solo reproduce un fragmento.
- La API de Spotify no permite controlar el volumen, así que se ajusta desde el dispositivo.
- Si Spotify no carga, la página ofrece enlaces directos a las canciones.

Las pistas se definen en `canciones`, dentro de `src/contenido.js`, por su ID de Spotify:

- Dream Lantern: `5fzDajm5HFdaeSZtQWfArw`
- Sparkle, movie ver.: `3A4FRzgve9BjfKbvVXRIFO`

Ambas son del álbum oficial *君の名は。 / Your Name.* (2016).

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera dist/
npm run preview   # previsualiza dist/
```

## Publicar en GitHub Pages

El workflow `.github/workflows/deploy.yml` compila y publica el sitio en cada push a `main`.

Una sola vez, en GitHub, ve a **Settings → Pages → Source** y elige **GitHub Actions**.

`vite.config.js` usa `base: './'`, así que las rutas funcionan bajo `/Nila/`.

## Vista previa al compartir y privacidad

`public/og.jpg` es la imagen que aparece al enviar el enlace por WhatsApp u otras apps.

`index.html` pide a los buscadores no indexar el sitio (`noindex`).
