"use client";
import { useEffect, useMemo, useState } from "react";

// material-ui
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

// third-party
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  CellContext,
} from "@tanstack/react-table";

import {
  CsvHeader,
  Recruit,
  RecruiterTableData,
  Users,
} from "../../../interfaces/interfaces";
import {
  AgentsDataTableHeaders,
  DataTableLabels,
} from "@/constants/labels.enums";
import { calculateCompletion } from "@/utils/commonFunctions";
import MainCard from "../MainCard";
import ScrollX from "../ScrollX";
import TablePagination from "../TablePagination";
import LinearWithLabel from "../LinearWithLabel";
import { dummyDataTable } from "@/constants/constant";
import { useTheme } from "@mui/material/styles";

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
  data = dummyDataTable;
  const theme = useTheme();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const headers: CsvHeader[] = [];

  table.getAllColumns().map((columns) =>
    headers.push({
      label:
        typeof columns.columnDef.header === "string"
          ? columns.columnDef.header
          : "#",
      key: (columns.columnDef as { accessorKey?: string }).accessorKey || "#",
    })
  );

  return (
    <MainCard title={DataTableLabels.MAINCARDTITLE} content={false}>
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
                        onClick={() => header.column.toggleSorting()}
                        sx={{ cursor: "pointer" }}
                      >
                        {header.isPlaceholder ? null : (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "desc" ? (
                                <FontAwesomeIcon
                                  icon={faCaretDown}
                                  style={{
                                    color:
                                      header.column.getIsSorted() === "desc"
                                        ? theme.palette.text.primary
                                        : theme.palette.grey[500],
                                    padding: "5px",
                                    borderRadius: "4px",
                                  }}
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faCaretUp}
                                  style={{
                                    color:
                                      header.column.getIsSorted() === "asc"
                                        ? theme.palette.text.primary
                                        : theme.palette.grey[500],
                                    padding: "5px",
                                    borderRadius: "4px",
                                  }}
                                />
                              )
                            ) : (
                              <Box
                                sx={{
                                  padding: "5px",
                                  borderRadius: "4px",
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faCaretUp}
                                  style={{
                                    color: theme.palette.grey[500],
                                  }}
                                />
                              </Box>
                            )}
                          </Box>
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
      { header: AgentsDataTableHeaders.EMAIL, accessorKey: "email" },
      {
        header: AgentsDataTableHeaders.PROFILECOMPLETION,
        accessorKey: "profileProgress",
        cell: (cell: CellContext<RecruiterTableData, number>) => (
          <LinearWithLabel value={cell.getValue()} sx={{ minWidth: 75 }} />
        ),
      },
    ],
    []
  );

  return (
    <>
      <ReactTable {...{ data, columns }} />
    </>
  );
}
