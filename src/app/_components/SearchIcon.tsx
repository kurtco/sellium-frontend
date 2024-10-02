import React from "react";
import { useTheme } from "@mui/material/styles";

const SearchIcon = () => {
  const theme = useTheme();

  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color: theme.palette.text.primary,
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.125 8.16667C2.125 4.82995 4.82995 2.125 8.16667 2.125C11.5034 2.125 14.2083 4.82995 14.2083 8.16667C14.2083 11.5034 11.5034 14.2083 8.16667 14.2083C4.82995 14.2083 2.125 11.5034 2.125 8.16667ZM8.16667 0.875C4.13959 0.875 0.875 4.13959 0.875 8.16667C0.875 12.1937 4.13959 15.4583 8.16667 15.4583C9.95517 15.4583 11.5933 14.8144 12.8618 13.7457L15.2247 16.1086C15.4688 16.3527 15.8645 16.3527 16.1086 16.1086C16.3527 15.8645 16.3527 15.4688 16.1086 15.2247L13.7457 12.8618C14.8144 11.5933 15.4583 9.95517 15.4583 8.16667C15.4583 4.13959 12.1937 0.875 8.16667 0.875Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default SearchIcon;
