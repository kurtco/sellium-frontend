"use client";
import useConfig from "@/hooks/useConfig";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { presetColor } = useConfig(); // Obtenemos presetColor del hook useConfig

  return (
    <html lang="en">
      <body>
        <main style={{ backgroundColor: presetColor }}>{children}</main>
      </body>
    </html>
  );
}
