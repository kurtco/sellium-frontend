import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Box,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const theme = useTheme();
  return (
    <TextField
      variant="outlined"
      placeholder="Search"
      size="small"
      sx={{
        padding: "0px 12px 4px 12px",
        height: "32px",
        width: "226px",
        "& .MuiOutlinedInput-root": {
          paddingRight: "8px",
          "& fieldset": {
            borderColor: theme.palette.grey[300],
          },
        },
      }}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ color: theme.palette.grey[300] }}
                />
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </Box>
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default SearchBar;
