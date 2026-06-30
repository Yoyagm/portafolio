# Foto de perfil

Coloca aquí tu foto como **`me.jpg`** (reemplaza el placeholder actual).

- **Formato**: JPG o WebP.
- **Proporción**: 4:5 (vertical), p. ej. **800×1000 px**. Otras proporciones se recortan automáticamente con `object-cover`, pero 4:5 se ve mejor.
- **Nombre**: mantén `me.jpg` (así no hay que tocar código). Si usas otro nombre/extensión, actualiza `photo` en `src/content/profile.ts`.

Tras reemplazar el archivo:

```bash
git add public/profile/me.jpg
git commit -m "feat(profile): foto de perfil real"
git push
```

El push dispara el redeploy automático y la foto aparece en `/` y `/about`.
