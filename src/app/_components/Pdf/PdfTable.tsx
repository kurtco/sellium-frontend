import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";

interface PolicyData {
  policyYear?: number;
  ageBegOfYr?: number;
  guaranteedAnnualPremium?: number;
  deathBenefit?: number;
  total?: number;
  average?: number;
}

interface PdfTableProps {
  data: PolicyData[];
}

const PdfTable: React.FC<PdfTableProps> = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: "400px", // Altura máxima del contenedor
        overflowY: "auto", // Activa el scroll vertical
      }}
    >
      <Typography
        variant="h6"
        sx={{
          padding: 2,
          textAlign: "center",
          fontWeight: "bold",
          borderBottom: "1px solid #ccc",
        }}
      >
        Policy Details
      </Typography>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center">Policy Year</TableCell>
            <TableCell align="center">Age Beg of Yr</TableCell>
            <TableCell align="center">Guaranteed Annual Premium</TableCell>
            <TableCell align="center">Death Benefit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                backgroundColor:
                  index % 2 === 0 ? "action.hover" : "background.paper",
              }}
            >
              <TableCell align="center">
                {row.policyYear ||
                  (row.total && "Total") ||
                  (row.average && "Average")}
              </TableCell>
              <TableCell align="center">{row.ageBegOfYr || ""}</TableCell>
              <TableCell align="center">
                {row.guaranteedAnnualPremium
                  ? row.guaranteedAnnualPremium.toLocaleString()
                  : row.total
                  ? row.total.toLocaleString()
                  : row.average
                  ? row.average.toLocaleString()
                  : ""}
              </TableCell>
              <TableCell align="center">
                {row.deathBenefit ? row.deathBenefit.toLocaleString() : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PdfTable;
