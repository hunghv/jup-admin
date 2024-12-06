import { Box, Typography, Button } from '@mui/material';
import { RouterLink } from '../../routes/components';

function NotFound() {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        padding: 2,
      }}
    >
      {/* Title */}
      <Typography
        variant="h4"
        component="h1"
        sx={{ fontWeight: 'bold', marginBottom: 2 }}
      >
        Sorry, page not found!
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: '#666', marginBottom: 4, maxWidth: '400px' }}
      >
        Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
        mistyped the URL? Be sure to check your spelling.
      </Typography>

      <Box
        component="img"
        src="/assets/illustrations/illustration-404.svg" // Replace this with your actual 404 image URL
        alt="404 Not Found"
        sx={{
          width: '200px',
          marginBottom: 4,
        }}
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        component={RouterLink}
        href="/"
      >
        Go to home
      </Button>
    </Box>
  );
}

export default NotFound;
