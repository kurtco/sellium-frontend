import React from "react";
import { useTheme } from "@mui/material/styles";

const FilterButton = () => {
  const theme = useTheme();

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        color: theme.palette.text.primary,
        height: 26,
        width: 40,
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.875 5.83334C1.875 5.48817 2.15483 5.20834 2.5 5.20834H17.5C17.8452 5.20834 18.125 5.48817 18.125 5.83334C18.125 6.17852 17.8452 6.45834 17.5 6.45834H2.5C2.15483 6.45834 1.875 6.17852 1.875 5.83334ZM4.375 10C4.375 9.65484 4.65482 9.37501 5 9.37501H15C15.3452 9.37501 15.625 9.65484 15.625 10C15.625 10.3452 15.3452 10.625 15 10.625H5C4.65482 10.625 4.375 10.3452 4.375 10ZM8.33333 13.5417C7.98816 13.5417 7.70833 13.8215 7.70833 14.1667C7.70833 14.5118 7.98816 14.7917 8.33333 14.7917H11.6667C12.0118 14.7917 12.2917 14.5118 12.2917 14.1667C12.2917 13.8215 12.0118 13.5417 11.6667 13.5417H8.33333Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default FilterButton;
