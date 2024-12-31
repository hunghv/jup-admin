import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  IconButton,
  MenuItem,
  Menu,
  TablePagination,
  colors,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { User } from '../../models/User';
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTION } from '../../common/constant';
import { deleteUser, fetchUsers, resetPassword } from '../../services';
import { updateRowsPerPage } from '../../redux/userSlice';
import KeyIcon from '@mui/icons-material/Key';
import LoadingSpinner from '../spinner/Sprinner';
import { red } from '@mui/material/colors';

interface UserTableProps {
  onEdit: (user: User) => void;
}

const UserPage: React.FC<UserTableProps> = ({ onEdit }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(ROWS_PER_PAGE);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event: any, user: User) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleOnEdit = () => {
    setAnchorEl(null);
    if (selectedUser) {
      onEdit(selectedUser);
    }
  };

  const { users, loading, error, total } = useSelector(
    (state: RootState) => state.users
  );

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchUsers({
        page: page,
        limit: rowsPerPage,
        sort: '{"createdAt":"DESC"}',
      })
    );
  }, [page, rowsPerPage, dispatch]);

  function handleChangeRowsPerPage(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    dispatch(updateRowsPerPage(rowsPerPage));
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleChangePage(event: any | null, page: number): void {
    setPage(page);
  }

  function handleOnDelete(): void {
    handleMenuClose();
    if (selectedUser) {
      dispatch(deleteUser(selectedUser.id));
    }
  }
  const handleOnResetPassword = () => {
    handleMenuClose();
    if (selectedUser) {
      dispatch(resetPassword(selectedUser.email));
    }
  };

  return (
    <>
      {error && <h3 style={{ color: 'red' }}>{error}</h3>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Verified</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row: User) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <Avatar
                      src={row?.profilePictureUrl ?? ''}
                      sx={{ marginRight: 2 }}
                    />
                    {row.fullname}
                  </Box>
                </TableCell>
                <TableCell>{row?.email}</TableCell>
                <TableCell>{row?.phone}</TableCell>
                <TableCell>{row?.role}</TableCell>
                <TableCell>{row?.isActive ? '✅' : '❌'}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: row.accountStatus === 'active' ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {row?.accountStatus}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-controls="actions-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event, row)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleOnEdit()}>
                      <CreateIcon sx={{ fontSize: 20 }} />
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleOnDelete()}>
                      <DeleteIcon sx={{ fontSize: 20 }} />
                      Delete
                    </MenuItem>
                    <MenuItem onClick={() => handleOnResetPassword()}>
                      <KeyIcon sx={{ fontSize: 20 }} />
                      Reset Password
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTION}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPageChange={handleChangePage}
        />
      </TableContainer>
      {loading && <LoadingSpinner />}
    </>
  );
};

export default UserPage;
