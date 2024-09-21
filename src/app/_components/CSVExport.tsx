/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// material-ui
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";

// third-party
import { CSVLink } from "react-csv";

// assets
import DownloadOutlined from "@ant-design/icons/DownloadOutlined";

interface CsvExportProps<T = any> {
  data: T[];
  filename: string;
  headers: { label: string; key: string }[];
}
export default function CSVExport({ data, filename, headers }: CsvExportProps) {
  const theme = useTheme();

  return (
    <CSVLink data={data} filename={filename} headers={headers}>
      <Tooltip title="CSV Export">
        <DownloadOutlined
          style={{
            fontSize: "24px",
            color: theme.palette.text.secondary,
            marginTop: 4,
            marginRight: 4,
            marginLeft: 4,
          }}
        />
      </Tooltip>
    </CSVLink>
  );
}
