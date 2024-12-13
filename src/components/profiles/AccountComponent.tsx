import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { getUserInformation } from '../../common/localStorageHelper';
import { AppDispatch } from '../../redux/store';
import { updateUser } from '../../services';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LanguageIcon from '@mui/icons-material/Language';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import {
  AddAlarmRounded,
  AddToHomeScreen,
  BiotechOutlined,
  CommentBank,
  EditNote,
  LocationCityOutlined,
  PermIdentityRounded,
  Phone,
} from '@mui/icons-material';

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
  isActive: yup.boolean().required(),
  bio: yup.string().nullable(),
});

const currentYear = dayjs();

const AccountComponent: React.FC = () => {
  const userData = getUserInformation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const personalInfo = [
    {
      label: 'Full Name',
      value: userData.fullname,
      icon: <PersonIcon color="warning" />,
    },
    {
      label: 'email',
      value: userData.email,
      icon: <EmailIcon color="warning" />,
    },
    {
      label: 'Phone Number',
      value: userData.phone,
      icon: <Phone color="warning" />,
    },
    {
      label: 'Address 1',
      value: userData.address1,
      icon: <AddToHomeScreen color="warning" />,
    },
    {
      label: 'Address 2',
      value: userData.address2,
      icon: <AddAlarmRounded color="warning" />,
    },
    {
      label: 'Country',
      value: userData.country,
      icon: <LanguageIcon color="warning" />,
    },
    {
      label: 'Date Of Birth',
      value: userData.dateOfBirth,
      icon: <CalendarTodayIcon color="warning" />,
    },
    {
      label: 'Role',
      value: userData.role,
      icon: <PermIdentityRounded color="warning" />,
    },
    {
      label: 'Account Status',
      value: userData.accountStatus,
      icon: <PersonIcon color="warning" />,
    },
    {
      label: 'Company',
      value: userData.company,
      icon: <CommentBank color="warning" />,
    },
    {
      label: 'City',
      value: userData.city,
      icon: <LocationCityOutlined color="warning" />,
    },
    {
      label: 'Occupation',
      value: userData.occupation,
      icon: <LocationCityOutlined color="warning" />,
    },
    {
      label: 'ZipCode',
      value: userData.zipCode,
      icon: <LocationCityOutlined color="warning" />,
    },
    {
      label: 'Twitter Profile',
      value: userData.twitterProfile,
      icon: <CommentBank color="warning" />,
    },
    {
      label: 'Linkedin Profile',
      value: userData.linkedinProfile,
      icon: <PermIdentityRounded color="warning" />,
    },
    {
      label: 'Bio',
      value: userData.bio,
      icon: <BiotechOutlined color="warning" />,
    },
  ];

  const [isEdit, setIsEdit] = useState(false);

  const removeAvatar = () => {
    setValue('profilePictureUrl', '');
  }

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
      setValue('country', userData.country);
      setValue('dateOfBirth', userData.dateOfBirth);
      setValue('profilePictureUrl', userData.profilePictureUrl);
      setValue('role', userData.role);
      setValue('accountStatus', userData.accountStatus);
      setValue('isActive', userData.isActive);
      setValue('bio', userData.bio);
    }
  }, [userData, setValue]);

  const onFormSubmit: SubmitHandler<any> = (data: any) => {
    dispatch(updateUser({ ...data, id: userData.id }));
  };

  const changeMode = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      {' '}
      {!isEdit && (
        <Box sx={{ p: 3 }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Personal information
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Manage your personal information, including phone numbers and
                email address where you can be contacted
              </Typography>
            </Box>
            <Box>
              <Button
                onClick={() => changeMode()}
                startIcon={<EditNote />}
                sx={{ marginRight: 2, fontWeight: 700 }}
              >
                Edit Profile
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            {personalInfo.map((info: any, index) => (
              <Card
                key={index}
                variant="outlined"
                sx={{
                  flex: '1 1 calc(33.333% - 16px)',
                  minWidth: '300px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderRadius: 5,
                  p: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ fontWeight: 700, color: 'black' }}
                  >
                    {info.label}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="subtitle1"
                    fontWeight="medium"
                  >
                    {info.value}
                  </Typography>
                </Box>
                <Box sx={{ mr: 2 }}>{info.icon}</Box>
              </Card>
            ))}
          </Box>
        </Box>
      )}
      {isEdit && (
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
              <Button onClick={()=> removeAvatar()} variant="text" color="error" sx={{ fontWeight: 'bold' }}>
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
              <Select
                {...register('country')}
                label="Country"
                variant="outlined"
                labelId="country-label"
                defaultValue={userData?.country}
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
                onClick={() => changeMode()}
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
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default AccountComponent;
