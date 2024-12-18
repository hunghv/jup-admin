import React, { useState } from 'react';
import { Box, Button, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUserInformation } from '../../common/localStorageHelper';
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
import AccountUpdatePage from './AccountUpdatePage';
import LoadingSpinner from '../spinner/Sprinner';

const AccountComponent: React.FC = () => {
  const userData = getUserInformation();
  const navigate = useNavigate();
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
    {
      label: 'Gender',
      value: userData.gender,
      icon: <PersonIcon color="warning" />,
    },
  ];

  const [isEdit, setIsEdit] = useState(false);

  if (!userData) {
    navigate('/sign-in');
  }

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
      {isEdit && <AccountUpdatePage changeViewModeAccount={changeMode} />}
    </>
  );
};

export default AccountComponent;
