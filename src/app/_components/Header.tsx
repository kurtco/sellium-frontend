import { AppBar, Toolbar, Typography, Switch, Box } from "@mui/material";

import { ThemeMode } from "@/constants/config.enum";
import useConfig from "@/hooks/useConfig";

export default function Header() {
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const { mode, onChangeMode } = useConfig();

  const handleToggleMode = () => {
    const newMode = mode === "light" ? "dark" : "light";
    onChangeMode(newMode);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        height: "58px",
        padding: "9px 24px",
        borderBottom: "1px solid #e0e0e0",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" color="textPrimary">
          My Application
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1" color="textSecondary">
            {mode === ThemeMode.DARK ? "Dark Mode" : "Light Mode"}
          </Typography>

          <Switch {...label} onChange={handleToggleMode} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
