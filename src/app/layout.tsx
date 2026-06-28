// Root layout passthrough: el <html>/<body> reales viven en app/[locale]/layout.tsx
// (propiedad única del <html lang>, evita anidamiento). RF17/RNF2.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
