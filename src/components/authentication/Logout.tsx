import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const Logout = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/cubes.png')",
        backgroundSize: 'cover',
        textAlign: 'center',
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: '#3f51b5',
            color: '#fff',
            padding: '16px',
            fontSize: '1.5rem',
          }}
        >
          DUKE team
        </Box>
        <CardContent
          sx={{
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 2 }}>
            See You Again!
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            You are now successfully logged out.
          </Typography>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: '80px',
              alignItems: 'center',
              color: '#4caf50',
              border: '3px dashed #4caf50',
              borderRadius: '50%',
              padding: '16px',
              mb: 3,
            }}
          />
          <Button
            href="/sign-in"
            variant="text"
            sx={{ textTransform: 'none', color: '#3f51b5' }}
          >
            Log back in
          </Button>
        </CardContent>
      </Card>
      <Typography
        variant="body2"
        sx={{ position: 'absolute', bottom: '16px', color: 'text.secondary' }}
      >
        2024 © Attex - CoderThemes.com
      </Typography>
    </Box>
  );
};

export default Logout;
