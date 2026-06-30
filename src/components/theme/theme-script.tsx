// Script inline bloqueante que aplica el tema ANTES de la primera pintura (anti-FOUC).
// Precedencia: preferencia persistida → prefers-color-scheme → dark (fallback si falla).
// Recibe nonce para cumplir la CSP (se inyecta en T05).
const THEME_SCRIPT = `(function(){try{var d=document.documentElement;var s=localStorage.getItem('theme');var dark=s==='dark'||((s===null||s==='system')&&window.matchMedia('(prefers-color-scheme: dark)').matches);d.classList.toggle('dark',dark);d.style.colorScheme=dark?'dark':'light';}catch(e){document.documentElement.classList.add('dark');document.documentElement.style.colorScheme='dark';}})();`;

export function ThemeScript({ nonce }: { nonce?: string }) {
  return (
    <script
      nonce={nonce}
      // React elimina el nonce del payload de hidratación (seguridad), así que el valor
      // del servidor no coincide con el del cliente. El mismatch es esperado e inofensivo.
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
    />
  );
}
