"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// material-ui
import Box from "@mui/material/Box";

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
} from "@tanstack/react-table";

import { CsvHeader, RecruiterTableData } from "../../../interfaces/interfaces";
import {
  AgentsDataTableHeaders,
  LoadingSpinnerLabels,
  SnackBarLabels,
} from "@/constants/labels.enums";
import MainCard from "../MainCard";
import ScrollX from "../ScrollX";
import TablePagination from "../TablePagination";
import { useTheme } from "@mui/material/styles";
import DataTableHeaderActions from "./DataTableHeaderActions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/store";
import SnackbarMessage from "../SnackbarMessage";
import { setShowSuccessSnackbar } from "../../../../store/imageSlice";
import LoadingSpinner from "../LoadingSpinner";

// ==============================|| REACT TABLE ||============================== //

interface ReactTableStructure {
  data: RecruiterTableData[];
}
interface ReactTableStructure {
  data: RecruiterTableData[];
  columns: ColumnDef<RecruiterTableData>[];
  top?: boolean; // Opcional
  loading: boolean;
}

const ReactTable = ({ data, columns, top, loading }: ReactTableStructure) => {
  // data = dummyDataTable;
  // console.log("datatable", data);
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter(); // Usar el hook useRouter para la navegación

  const handleRowClick = (userCode: string) => {
    router.push(`/agentdetails/${userCode}`); // Redirigir a la URL correspondiente
  };

  const { dataFromImage, error, showSuccessSnackbar } = useSelector(
    (state: RootState) => state.image
  );

  const handleCloseSnackbar = useCallback(() => {
    dispatch(setShowSuccessSnackbar(false));
  }, [dispatch]);

  useEffect(() => {
    if (showSuccessSnackbar) {
      const timeoutId = setTimeout(() => {
        handleCloseSnackbar();
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [
    dispatch,
    showSuccessSnackbar,
    error,
    dataFromImage?.userCode,
    handleCloseSnackbar,
  ]);

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
    <MainCard
      content={true}
      sx={{
        "& .MuiCardHeader-title": {
          fontSize: "16px",
          fontWeight: "600",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative", // Importante para centrar el spinner
      }}
    >
      <DataTableHeaderActions />

      {showSuccessSnackbar && dataFromImage?.userCode && (
        <SnackbarMessage
          message={SnackBarLabels.message}
          open={showSuccessSnackbar}
          handleClose={handleCloseSnackbar}
          error={false}
        />
      )}

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
            {loading && (
              <Box
                sx={{
                  position: "absolute",
                  top: 60,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 10,
                }}
              >
                <LoadingSpinner text={LoadingSpinnerLabels.datatable} />
              </Box>
            )}
            {!loading && (
              <Table>
                <TableHead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableCell
                          key={header.id}
                          onClick={() => header.column.toggleSorting()}
                          sx={{ cursor: "pointer", paddingLeft: 0 }}
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
                    <TableRow
                      key={row.id}
                      onClick={() => handleRowClick(row.original.userCode)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          {...cell.column.columnDef.meta}
                          sx={{ paddingLeft: 0 }}
                        >
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
            )}
          </TableContainer>
        </Stack>
      </ScrollX>
    </MainCard>
  );
};

// ==============================|| REACT TABLE - PAGINATION ||============================== //

export default function PaginationTable() {
  const [data, setData] = useState<RecruiterTableData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchRecruiterData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/recruiter/A0456");
      const result: RecruiterTableData[] = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiterData();
  }, []);

  const columns = useMemo<ColumnDef<RecruiterTableData>[]>(
    () => [
      { header: AgentsDataTableHeaders.NAME, accessorKey: "userName" },
      { header: AgentsDataTableHeaders.USERCODE, accessorKey: "userCode" },
      { header: AgentsDataTableHeaders.POSITION, accessorKey: "position" },
      { header: AgentsDataTableHeaders.PHONE, accessorKey: "phone" },
      { header: AgentsDataTableHeaders.EMAIL, accessorKey: "email" },
      // {
      //   header: AgentsDataTableHeaders.PROFILECOMPLETION,
      //   accessorKey: "profileProgress",
      //   cell: (cell: CellContext<RecruiterTableData, unknown>) => {
      //     const value = cell.getValue() as number;
      //     return <LinearWithLabel value={value} sx={{ minWidth: 75 }} />;
      //   },
      // },
    ],
    []
  );

  return (
    <>
      <ReactTable data={data} columns={columns} top={false} loading={loading} />
    </>
  );
}
