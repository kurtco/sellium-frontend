import { AppBar, Toolbar, Box, Avatar, Typography } from "@mui/material";
import useConfig from "@/hooks/useConfig";
import HeaderLogo from "./HeaderLogo";
import ThemeModeAvatar from "./ThemeModeAvatar";
import { useTheme } from "@mui/material/styles";
import { ThemeMode } from "@/constants/config.enum";

export default function Header() {
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();

  const handleToggleMode = () => {
    const newMode = mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    onChangeMode(newMode);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.background.default,
        height: "58px",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "16px",
          paddingTop: "16px",
        }}
      >
        <HeaderLogo />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            alt="Light Mode"
            style={{
              backgroundColor: theme.palette.primary.lighter,
              width: 40,
              height: 40,
            }}
            onClick={handleToggleMode}
            sx={{ cursor: "pointer" }}
          >
            <ThemeModeAvatar />
          </Avatar>
          <Avatar
            alt="User Profile"
            style={{
              backgroundColor: theme.palette.primary.lighter,
              width: 40,
              height: 40,
            }}
          >
            <Typography style={{ color: "#166EE0" }}>BG</Typography>
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
