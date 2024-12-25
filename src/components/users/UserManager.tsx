import { Button, Box, Typography } from '@mui/material';
import { useState } from 'react';
import UserForm from './UserForm';
import UserPage from './UserPage';
import { User } from '../../models/User';

function UserManager() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => {
    setSelectedUser(null);
    setIsFormOpen(false);
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setSelectedUser(null);
          handleOpenForm();
        }}
        sx={{ float: 'right', marginBottom: 2 }}
      >
        + New User
      </Button>
      <UserPage
        onEdit={(user) => {
          setSelectedUser(user);
          handleOpenForm();
        }}
      ></UserPage>
      <UserForm
        open={isFormOpen}
        onClose={handleCloseForm}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </Box>
  );
}

export default UserManager;
