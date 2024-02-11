import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_USER, REMOVE_USER } from '../utils/mutations';
import { QUERY_ALL_USERS } from '../utils/queries';
import Auth from '../utils/auth';
import Error from './Error';
import { pink } from '@mui/material/colors';

const muipink = pink[300];

export default function Admin() {
  const [updateUser, { error, data }] = useMutation(UPDATE_USER);
  const [removeUser, { data: removedUserData }] = useMutation(REMOVE_USER);
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
  Auth.getToken();
  const authUser = Auth.getProfile()
  console.log(authUser.data.role);
  const role = authUser.data.role;

  const deleteUser = async (idOfDeleted) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    // Check if user confirmed deletion
    if (confirmDelete) {
      try {
        // Delete user if confirmed
        await removeUser({
          variables: { id: idOfDeleted }
        });
        refetch();
      } catch (error) {
        console.error('Error deleting user:', error.message);
      }
    }
  }


  return (
    <div>
      {
        role === 'admin' ?
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
                    <TableCell align="right">Current status: {row.role.charAt(0).toUpperCase() + row.role.slice(1)}<br />
                      {/* Role update functionality integrated directly */}
                      <label>
                        Change:
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

                    {/* delete user functionality */}
                    <TableCell align="right">
                      <a onClick={() => { deleteUser(row._id) }} href="#">
                        <DeleteForeverIcon sx={{ color: muipink }} />
                      </a>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          :

          <Error />
      }
    </div>
  );
}
