import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMutation } from '@apollo/client'
import { useQuery } from '@apollo/client'
import { UPDATE_USER } from '../utils/mutations';
import { QUERY_ALL_USERS } from '../utils/queries';



export default function Admin() {
    const [updateUser, { error, data}] = useMutation(UPDATE_USER)
    const {loading, data:userData } = useQuery(QUERY_ALL_USERS)

    console.log(userData)

    const rows = userData?.getAllUsers || [];

    


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Users(100g serving)</TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}