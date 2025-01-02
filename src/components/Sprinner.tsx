import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
  return (
    <CircularProgress
      color="warning"
      size={54}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
      }}
    />
  );
};

export default LoadingSpinner;
