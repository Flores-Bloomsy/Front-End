import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";

function createData(id, name, estado, opciones) {
  return { id, name, estado, opciones };
}

const rows = [
  createData(1, "Mark", "pagada", "ver orden"),
  createData(1, "Mark", "pagada", "ver orden"),
];

export default function BasicTable() {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>#ID</TableCell>
              <TableCell align="right">Nombre Completo</TableCell>
              <TableCell align="right">Estados</TableCell>
              <TableCell align="right">Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>

                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.estado}</TableCell>
                <TableCell align="right">{row.opciones}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
