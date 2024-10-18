import React from "react";
import { useTheme } from "@mui/material/styles";
import useConfig from "@/hooks/useConfig";
import { ThemeMode } from "@/constants/config.enum";
import { defaultBlueColor } from "@/constants/constant";
const MoonIcon = () => {
  const theme = useTheme();
  const { mode } = useConfig();
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color:
          mode === ThemeMode.DARK
            ? theme.palette.text.primary
            : defaultBlueColor,
        height: 26,
        width: 40,
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.43867 0.431856C8.56725 0.652273 8.549 0.928748 8.39242 1.13027C7.59783 2.15314 7.125 3.4371 7.125 4.83325C7.125 8.16998 9.82992 10.8749 13.1667 10.8749C14.0852 10.8749 14.9541 10.6704 15.732 10.305C15.9632 10.1964 16.2371 10.2394 16.4239 10.4135C16.6107 10.5876 16.6728 10.8579 16.5807 11.0961C15.4057 14.1347 12.4555 16.2916 9 16.2916C4.51268 16.2916 0.875 12.6539 0.875 8.16656C0.875 4.08397 3.88552 0.705606 7.80783 0.128506C8.06033 0.0913563 8.31008 0.21144 8.43867 0.431856ZM6.56403 1.73545C3.96955 2.7187 2.125 5.22763 2.125 8.16656C2.125 11.9636 5.20304 15.0416 9 15.0416C11.3963 15.0416 13.5073 13.8154 14.7381 11.9551C14.2317 12.0663 13.7058 12.1249 13.1667 12.1249C9.13958 12.1249 5.875 8.86031 5.875 4.83325C5.875 3.72609 6.12209 2.67587 6.56403 1.73545Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default MoonIcon;
