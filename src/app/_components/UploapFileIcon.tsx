import React from "react";
import { useTheme } from "@mui/material/styles";
import useConfig from "@/hooks/useConfig";
import { ThemeMode } from "@/constants/config.enum";
import { defaultBlueColor } from "@/constants/constant";

const UploadFileIcon = () => {
  const theme = useTheme();
  const { mode } = useConfig();

  return (
    <svg
      width="22"
      height="21"
      viewBox="0 0 22 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        fontSize: 40,
        color:
          mode === ThemeMode.DARK
            ? theme.palette.text.primary
            : defaultBlueColor,
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.75 8C4.75 4.54822 7.54822 1.75 11 1.75C13.9382 1.75 16.4045 3.7782 17.0719 6.51188C17.1301 6.75035 17.3014 6.94523 17.5304 7.03365C19.1226 7.64848 20.25 9.1935 20.25 11C20.25 12.39 19.5835 13.624 18.5496 14.4007C18.2184 14.6495 18.1516 15.1196 18.4003 15.4508C18.6491 15.782 19.1192 15.8488 19.4504 15.6C20.8454 14.5523 21.75 12.8817 21.75 11C21.75 8.69141 20.3898 6.70217 18.4293 5.78706C17.4768 2.58539 14.512 0.25 11 0.25C6.8612 0.25 3.48014 3.49432 3.26126 7.57854C1.49832 8.27243 0.25 9.9897 0.25 12C0.25 13.7591 1.20663 15.2939 2.62446 16.1141C2.983 16.3215 3.4418 16.199 3.6492 15.8404C3.85661 15.4819 3.73409 15.0231 3.37554 14.8157C2.40216 14.2526 1.75 13.202 1.75 12C1.75 10.4863 2.78548 9.2126 4.18784 8.85211C4.52413 8.76566 4.7571 8.45969 4.75099 8.11252C4.75033 8.0751 4.75 8.0376 4.75 8ZM15.0303 13.9697L11.5303 10.4697C11.2374 10.1768 10.7626 10.1768 10.4697 10.4697L6.96967 13.9697C6.67678 14.2626 6.67678 14.7374 6.96967 15.0303C7.26256 15.3232 7.73744 15.3232 8.03033 15.0303L10.25 12.8107V20C10.25 20.4142 10.5858 20.75 11 20.75C11.4142 20.75 11.75 20.4142 11.75 20V12.8107L13.9697 15.0303C14.2626 15.3232 14.7374 15.3232 15.0303 15.0303C15.3232 14.7374 15.3232 14.2626 15.0303 13.9697Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default UploadFileIcon;
