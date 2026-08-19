# CV

Cuatro PDF generales salen de dos cuerpos y un preámbulo compartido. Los wrappers solo
fijan variante (`onepage` / `full`) e idioma (`en` / `es`).

| Archivo | Editar aquí |
|---|---|
| `cv-preamble.tex` | Estilo, tipografías, márgenes, comandos `\entry` / `\project` / `\skill` |
| `cv-body.tex` | Contenido en **inglés** |
| `cv-body-es.tex` | Contenido en **español** |

**EN y ES no se traducen solos.** Al cambiar contenido en uno, hay que cambiarlo en el otro.

| Salida | Páginas | Para qué |
|---|---|---|
| `johan-rodriguez-cv-es-onepage.tex` | 1 | **Por defecto en Colombia y LatAm.** Lo sirve el sitio en `/es`. |
| `johan-rodriguez-cv-es.tex` | 2 | Español, detallado. |
| `johan-rodriguez-cv-onepage.tex` | 1 | Inglés, para postular. Lo sirve el sitio en `/en`. |
| `johan-rodriguez-cv.tex` | 2 | Inglés, detallado, con los seis proyectos. |

`cv/dirigidos/` contiene un CV por vacante y **está fuera de git a propósito**; ver
`dirigidos/LEEME.md`.

```bash
brew install tectonic     # una vez
make -C cv                # compila los cuatro, comprueba y copia a public/cv/
make -C cv dirigidos      # compila los dirigidos a una vacante
```

`tectonic` descarga bajo demanda los paquetes que faltan, así que no hace falta
instalar TeX Live entero. `make check` falla si la versión corta se va a dos
páginas: cuando eso pasa hay que recortar contenido, no el interlineado.

## Decisiones

Este es un CV de alguien que **todavía no ha trabajado como ingeniero a tiempo
completo**, y está construido para eso:

- **Los proyectos se escriben como se escribe un empleo** — título, entidad,
  fechas y bullets con cifras. Es lo que sustituye a un historial laboral largo.
- **El trabajo real que sí existe va arriba, en Experience.** El rol de
  Developer / Technical Support en la UPB no es un proyecto personal y no debe
  quedar enterrado entre ellos.
- **Una sola columna, y ninguna tabla de dos columnas.** Verificado con
  `pdftotext`: con la tabla que había antes para las skills, la extracción
  devolvía primero todas las etiquetas y después todos los valores, y un ATS
  perdía la asociación. Ahora cada fila es una línea de texto corrido.
- **Todo es texto real.** Nada dentro de una imagen: lo que no se extrae, no
  existe para el filtro automático.
- **Cada proyecto enlaza a su evidencia** — repositorio, demo o informe. Los que
  no la tienen lo dicen (`Private repository — walkthrough available on request`).
- **Ciudad y país, no la dirección postal.** Un CV circula por muchas manos.
- **Sin bachillerato**, sin foto, sin "referencias a petición", sin barras de
  porcentaje de dominio de cada lenguaje.
- **Las cifras son las medidas, no las que favorecen.** El detector de phishing
  reporta 70,5 % de recall al 1 % de falsos positivos, no el 99 % que da el
  benchmark con fugas; el sistema de trading reporta 52,9 % de exactitud contra
  una puerta del 55 % que no ha pasado.

## Al postular

Reordena los bullets según la oferta y reutiliza sus propias palabras: los
filtros puntúan por coincidencia de términos. La versión de una página está
pensada para que quepa un reordenamiento sin romper la maquetación.

Al tocar el CV hay que revisar también `src/content/` (perfil, proyectos,
certificaciones): las dos fuentes tienen que contar lo mismo.
