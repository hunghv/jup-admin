import {
  Box,
  Paper,
  Typography,
  Divider,
  Avatar,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateUser } from '../../services';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserInformation } from '../../common/localStorageHelper';
import { AppDispatch } from '../../redux/store';
import * as yup from 'yup';

const currentYear = dayjs();

interface ChildProps {
  changeViewModeAccount: () => void;
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
  bio: yup.string().nullable(),
  gender: yup.string().nullable(),
  occupation: yup.string().nullable(),
  city: yup.string().nullable(),
  facebookProfile: yup.string().nullable(),
  twitterProfile: yup.string().nullable(),
  linkedinProfile: yup.string().nullable(),
  company: yup.string().nullable(),
});

const AccountUpdatePage: React.FC<ChildProps> = ({ changeViewModeAccount }) => {
  const userData = getUserInformation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const removeAvatar = () => {
    setValue('profilePictureUrl', '');
  };

  if (!userData) {
    navigate('/sign-in');
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userData) {
      setValue('fullname', userData.fullname);
      setValue('email', userData.email);
      setValue('phone', userData.phone);
      setValue('address1', userData.address1);
      setValue('address2', userData.address2);
      setValue('country', userData.country ?? '');
      setValue('dateOfBirth', userData.dateOfBirth);
      setValue('profilePictureUrl', userData.profilePictureUrl);
      setValue('role', userData.role);
      setValue('accountStatus', userData.accountStatus);
      setValue('bio', userData.bio);
      setValue('gender', userData.gender ?? '');
      setValue('occupation', userData.occupation);
      setValue('city', userData.city);
      setValue('facebookProfile', userData.facebookProfile);
      setValue('twitterProfile', userData.twitterProfile);
      setValue('linkedinProfile', userData.linkedinProfile);
      setValue('company', userData.company);
    }
  }, [userData, setValue]);

  const onFormSubmit: SubmitHandler<any> = (data: any) => {
    dispatch(updateUser({ ...data, id: userData.id }));
  };
  const changeViewMode = () => {
    changeViewModeAccount();
  };
  return (
    <Box sx={{ width: { xs: '100%', md: '75%' } }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Account
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box display="flex" alignItems="center" gap={2} mb={3}>
          <Avatar
            alt={userData?.fullname}
            src={userData?.profilePicture}
            sx={{ width: 80, height: 80, border: '3px solid #e0e0e0' }}
          />
          <Button
            onClick={() => removeAvatar()}
            variant="text"
            color="error"
            sx={{ fontWeight: 'bold' }}
          >
            Remove
          </Button>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
          }}
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
            disabled
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
            <Select
              {...register('country')}
              label="Country"
              variant="outlined"
              labelId="country-label"
              defaultValue={userData?.country}
              error={!!errors.country}
            >
              <MenuItem value="">Select Country</MenuItem>
              <MenuItem value="USA">USA</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              <MenuItem value="India">India</MenuItem>
              <MenuItem value="VietNam">Việt Nam</MenuItem>
              <MenuItem value="Australia">Australia</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              maxDate={currentYear}
              value={dayjs(userData?.dateOfBirth) || null}
              onChange={(date: any) =>
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
            label="Facebook Profile"
            variant="outlined"
            {...register('facebookProfile')}
            error={!!errors.facebookProfile}
            helperText={errors.facebookProfile?.message}
            size="small"
          />

          <TextField
            fullWidth
            label="Twitter Profile"
            variant="outlined"
            {...register('twitterProfile')}
            error={!!errors.twitterProfile}
            helperText={errors.twitterProfile?.message}
            size="small"
          />

          <TextField
            fullWidth
            label="Company"
            variant="outlined"
            {...register('company')}
            error={!!errors.company}
            helperText={errors.company?.message}
            size="small"
          />
          <TextField
            fullWidth
            label="City"
            variant="outlined"
            {...register('city')}
            error={!!errors.city}
            helperText={errors.city?.message}
            size="small"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
              {...register('gender')}
              label="Gender"
              variant="outlined"
              labelId="gender-label"
              defaultValue={userData?.gender}
              error={!!errors.gender}
            >
              <MenuItem value="">Chọn giới tính </MenuItem>
              <MenuItem value="Unknow">Không biết</MenuItem>
              <MenuItem value="Male">Nam</MenuItem>
              <MenuItem value="Female">Nữ</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Linkedin Profile"
            variant="outlined"
            {...register('linkedinProfile')}
            error={!!errors.linkedinProfile}
            helperText={errors.linkedinProfile?.message}
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
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <Button
            onClick={() => changeViewMode()}
            variant="text"
            color="inherit"
            sx={{ fontWeight: 'bold', textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onFormSubmit)}
            sx={{
              fontWeight: 'bold',
              textTransform: 'none',
              boxShadow: 'none',
            }}
          >
            Save changes
          </Button>
          {Object.keys(errors).length > 0 && <p>{JSON.stringify(errors)}</p>}
        </Box>
      </Paper>
    </Box>
  );
};

export default AccountUpdatePage;
