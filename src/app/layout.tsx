// "use client";
// import { ConfigProvider } from "@/context/ConfigContext";
// import useConfig from "@/hooks/useConfig";
// import Palette from "@/themes/palette";
// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { useMemo } from "react";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const { mode, presetColor } = useConfig(); // obtener el modo y colores del contexto
//   const theme = useMemo(() => Palette(mode, presetColor), [mode, presetColor]);

//   return (
//     <html lang="en">
//       <body>
//         <ConfigProvider>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <main style={{ backgroundColor: presetColor }}>{children}</main>
//           </ThemeProvider>
//         </ConfigProvider>
//       </body>
//     </html>
//   );
// }

"use client";
import { ConfigProvider } from "@/context/ConfigContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import Palette from "@/themes/palette";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mode = "dark"; // Forzar el modo oscuro para probar
  const presetColor = "theme1"; // Puedes modificarlo según tus configuraciones
  const theme = useMemo(() => Palette(mode, presetColor), [mode, presetColor]);

  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main style={{ backgroundColor: presetColor }}>{children}</main>
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
