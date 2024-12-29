import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
} from '@mui/material';
import { User } from '../../models/User';
import { AppDispatch } from '../../redux/store';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createUser, updateUser } from '../../services';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface UserFormProps {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
}

const schema = yup.object({
  fullname: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().nullable(),
  address1: yup.string().nullable(),
  address2: yup.string().nullable(),
  country: yup.string().nullable(),
  dateOfBirth: yup.date().required('Date of Birth is required').nullable(),
  profilePictureUrl: yup.string().url().nullable(),
  role: yup.string().required('Role is required'),
  accountStatus: yup.string().required('Account status is required'),
  isActive: yup.boolean().nullable(),
  bio: yup.string().nullable(),
  gender: yup.string().nullable(),
  occupation: yup.string().nullable(),
  company: yup.string().nullable(),
  city: yup.string().nullable(),
});

const UserForm: React.FC<UserFormProps> = ({
  open,
  onClose,
  selectedUser,
  setSelectedUser,
}) => {
  //   const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const currentYear = dayjs();

  useEffect(() => {
    if (selectedUser) {
      setValue('fullname', selectedUser.fullname);
      setValue('email', selectedUser.email);
      setValue('gender', selectedUser.gender);
      setValue('phone', selectedUser.phone);
      setValue('address1', selectedUser.address1);
      setValue('address2', selectedUser.address2);
      setValue('country', selectedUser.country);
      setValue(
        'dateOfBirth',
        selectedUser.dateOfBirth ? new Date(selectedUser.dateOfBirth) : null
      );
      setValue('profilePictureUrl', selectedUser.profilePictureUrl);
      setValue('role', selectedUser.role);
      setValue('accountStatus', selectedUser.accountStatus);
      setValue('isActive', selectedUser.isActive);
      setValue('bio', selectedUser.bio);
      setValue('occupation', selectedUser.occupation);
      setValue('city', selectedUser.city);
      setValue('company', selectedUser.company);
    } else {
      setValue('fullname', '');
      setValue('email', '');
      setValue('gender', '');
      setValue('phone', '');
      setValue('address1', '');
      setValue('address2', '');
      setValue('country', 'VietNam');
      setValue('dateOfBirth', null);
      setValue('profilePictureUrl', '');
      setValue('role', '');
      setValue('accountStatus', '');
      setValue('isActive', false);
      setValue('bio', '');
      setValue('occupation', '');
      setValue('city', '');
      setValue('company', '');
    }
  }, [selectedUser, setValue]);

  //   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setFormData({
  //       ...formData,
  //       isActive: event.target.checked,
  //     });
  //   };

  const onFormSubmit: SubmitHandler<any> = (data: any) => {
    if (selectedUser?.id) {
      dispatch(updateUser({ ...data, id: selectedUser?.id }));
    } else {
      dispatch(createUser({ ...data }));
    }
    setValue('fullname', '');
    setValue('email', '');
    setValue('gender', '');
    setValue('phone', '');
    setValue('address1', '');
    setValue('address2', '');
    setValue('country', 'VietNam');
    setValue('dateOfBirth', null);
    setValue('profilePictureUrl', '');
    setValue('role', '');
    setValue('accountStatus', 'active');
    setValue('isActive', false);
    setValue('bio', '');
    setValue('occupation', '');
    setValue('city', '');
    setValue('company', '');
    setSelectedUser(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <h3>{selectedUser ? 'Edit User' : 'Add User'}</h3>
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ paddingTop: 1 }}
        >
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            {...register('fullname')}
            error={!!errors.fullname}
            size="small"
            helperText={errors.fullname?.message}
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            size="small"
            disabled={selectedUser ? true : false}
          />
          <Select
            {...register('country')}
            label="Country"
            variant="outlined"
            labelId="country-label"
            defaultValue={selectedUser?.country}
            error={!!errors.country}
            size="small"
          >
            <MenuItem value="">Select Country</MenuItem>
            <MenuItem value="USA">USA</MenuItem>
            <MenuItem value="Canada">Canada</MenuItem>
            <MenuItem value="India">India</MenuItem>
            <MenuItem value="VietNam">Việt Nam</MenuItem>
            <MenuItem value="Australia">Australia</MenuItem>
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              maxDate={currentYear}
              value={dayjs(selectedUser?.dateOfBirth) || null}
              onChange={(date) =>
                setValue('dateOfBirth', date?.toDate() ?? null)
              }
              openTo="year"
              yearsOrder="desc"
              sx={{ minWidth: 250 }}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Address Line 1"
            variant="outlined"
            {...register('address1')}
            error={!!errors.address1}
            helperText={errors.address1?.message}
            size="small"
          />
          <TextField
            fullWidth
            label="Address Line 2"
            variant="outlined"
            {...register('address2')}
            error={!!errors.address2}
            helperText={errors.address2?.message}
            size="small"
          />
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            {...register('phone')}
            error={!!errors.phone}
            helperText={errors.phone?.message}
            size="small"
          />
          <TextField
            fullWidth
            label="Bio"
            variant="outlined"
            multiline
            size="small"
            rows={3}
            {...register('bio')}
            error={!!errors.bio}
            helperText={errors.bio?.message}
          />
          <Select
            {...register('accountStatus')}
            label="Status"
            variant="outlined"
            labelId="status-label"
            defaultValue={selectedUser?.accountStatus}
            error={!!errors.accountStatus}
            size="small"
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="banned">Banned</MenuItem>
          </Select>
          <Select
            {...register('role')}
            label="Role"
            variant="outlined"
            labelId="role-label"
            defaultValue={selectedUser?.role}
            error={!!errors.role}
            size="small"
          >
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="System admin">System admin</MenuItem>
            <MenuItem value="Instructor">Instructor</MenuItem>
            <MenuItem value="Student">Student</MenuItem>
          </Select>
          <Select
            {...register('gender')}
            label="Gender"
            variant="outlined"
            labelId="gender-label"
            defaultValue={selectedUser?.gender}
            error={!!errors.gender}
            size="small"
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="FeMale">FeMale</MenuItem>
            <MenuItem value="Unknow">Unknow</MenuItem>
          </Select>
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            {...register('city')}
            error={!!errors.city}
            helperText={errors.city?.message}
            size="small"
          />
          <TextField
            fullWidth
            label="Occupation"
            variant="outlined"
            {...register('occupation')}
            error={!!errors.occupation}
            helperText={errors.occupation?.message}
            size="small"
          />
          <TextField
            fullWidth
            label="company"
            variant="outlined"
            {...register('company')}
            error={!!errors.company}
            helperText={errors.company?.message}
            size="small"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(onFormSubmit)} color="primary">
          {selectedUser ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
      {JSON.stringify(errors)}
    </Dialog>
  );
};

export default UserForm;
