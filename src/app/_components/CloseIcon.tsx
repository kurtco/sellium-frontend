import React from "react";
import { useTheme } from "@mui/material/styles";

const CloseIcon = () => {
  const theme = useTheme();
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color: theme.palette.grey[500],
        height: 12,
        width: 12,
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.558056 0.558056C0.802131 0.313981 1.19786 0.313981 1.44194 0.558056L6 5.11608L10.5581 0.558056C10.8022 0.313981 11.1978 0.313981 11.4419 0.558056C11.686 0.802131 11.686 1.19786 11.4419 1.44194L6.88392 6L11.4419 10.5581C11.686 10.8022 11.686 11.1978 11.4419 11.4419C11.1978 11.686 10.8022 11.686 10.5581 11.4419L6 6.88392L1.44194 11.4419C1.19786 11.686 0.802131 11.686 0.558056 11.4419C0.313981 11.1978 0.313981 10.8022 0.558056 10.5581L5.11608 6L0.558056 1.44194C0.313981 1.19786 0.313981 0.802131 0.558056 0.558056Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CloseIcon;
