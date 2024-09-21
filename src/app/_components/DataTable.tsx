"use client";
import PropTypes from "prop-types";

import { useEffect, useMemo, useState } from "react";

// material-ui
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid2";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";

// third-party
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";

import MainCard from "./MainCard";
import TablePagination from "./TablePagination";
import ScrollX from "./ScrollX";
import LinearWithLabel from "./LinearWithLabel";
import {
  CsvHeader,
  Recruit,
  RecruiterTableData,
  Users,
} from "../../interfaces/interfaces";
import {
  AgentsDataTableHeaders,
  DataTableLabels,
} from "@/constants/labels.enums";
import { calculateCompletion } from "@/utils/commonFunctions";

// ==============================|| REACT TABLE ||============================== //

interface ReactTableStructure {
  data: RecruiterTableData[];
}
interface ReactTableStructure {
  data: RecruiterTableData[];
  columns: ColumnDef<RecruiterTableData>[];
  top?: boolean; // Opcional
}

const ReactTable = ({ data, columns, top }: ReactTableStructure) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  const headers: CsvHeader[] = [];

  table.getAllColumns().map((columns) =>
    headers.push({
      label:
        typeof columns.columnDef.header === "string"
          ? columns.columnDef.header
          : "#",
      // @ts-ignore
      key: columns.columnDef.accessorKey,
    })
  );

  return (
    <MainCard
      title={DataTableLabels.MAINCARDTITLE}
      content={false}
      // secondary={
      //   <CSVExport
      //     {...{
      //       data,
      //       headers,
      //       filename: DataTableLabels.CSVFILENAME,
      //     }}
      //   />
      // }
    >
      <ScrollX>
        <Stack>
          {top && (
            <Box sx={{ p: 2 }}>
              <TablePagination
                {...{
                  setPageSize: table.setPageSize,
                  setPageIndex: table.setPageIndex,
                  getState: table.getState,
                  getPageCount: table.getPageCount,
                }}
              />
            </Box>
          )}

          <TableContainer>
            <Table>
              <TableHead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableCell
                        key={header.id}
                        {...header.column.columnDef.meta}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {!top && (
            <>
              <Divider />
              <Box sx={{ p: 2 }}>
                <TablePagination
                  {...{
                    setPageSize: table.setPageSize,
                    setPageIndex: table.setPageIndex,
                    getState: table.getState,
                    getPageCount: table.getPageCount,
                  }}
                />
              </Box>
            </>
          )}
        </Stack>
      </ScrollX>
    </MainCard>
  );
};

// ==============================|| REACT TABLE - PAGINATION ||============================== //

export default function PaginationTable() {
  const [data, setData] = useState<RecruiterTableData[]>([]);

  const fetchRecruiterData = async () => {
    try {
      const response = await fetch("/api/users/A0456");
      const result: Users = await response.json();

      const mappedData = result.recruits.map((item: Recruit) => ({
        name: item.userName,
        position: item.position,
        phoneNumber: item.phone,
        email: item.email,
        profileProgress: calculateCompletion(item),
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRecruiterData();
  }, []);

  const columns = useMemo(
    () => [
      { header: AgentsDataTableHeaders.NAME, accessorKey: "name" },
      { header: AgentsDataTableHeaders.POSITION, accessorKey: "position" },
      { header: AgentsDataTableHeaders.PHONE, accessorKey: "phoneNumber" },
      {
        header: AgentsDataTableHeaders.PROFILECOMPLETION,
        accessorKey: "profileProgress",
      },
    ],
    []
  );

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <ReactTable {...{ data, columns }} />
      </Grid>
    </Grid>
  );
}
