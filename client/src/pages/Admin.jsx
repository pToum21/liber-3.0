import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import { QUERY_ALL_USERS } from '../utils/queries';
import { useNavigate } from 'react-router-dom'; 

export default function Admin() {
  const [updateUser, { error, data }] = useMutation(UPDATE_USER);
  const { loading, data: userData, refetch } = useQuery(QUERY_ALL_USERS);

  const rows = userData?.getAllUsers || [];
// change user role
  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser({
        variables: {
          id: userId,
          role: newRole,
        },
      });

      // Refetch the user data to reflect the changes
      refetch();
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  // only allow admin to see this page
  // const isAdmin = () => {
  //   const user = getUser();
  // }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Users</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.username}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.role}</TableCell>
                <TableCell align="right">
                  {/* Role update functionality integrated directly */}
                  <label>
                    Role:
                    <select
                      value={row.role}
                      onChange={(e) =>
                        handleRoleChange(row._id, e.target.value)
                      }
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </label>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
