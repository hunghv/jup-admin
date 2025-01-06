import { Button, CircularProgress } from '@mui/material';
import React from 'react';

interface ChildProps {
  onClick: () => void;
  title: any;
  firstColor?: any;
  secondColor?: any;
  shadowColor?: any;
  height?: any;
  loading?: boolean;
}

const GradientButton: React.FC<ChildProps> = ({
  onClick,
  shadowColor,
  firstColor,
  secondColor,
  height,
  title,
  loading = false,
}) => {
  function handleSubmit(): void {
    onClick();
  }

  return (
    <Button
      onClick={handleSubmit}
      variant="contained"
      sx={{
        background: `linear-gradient(45deg, ${firstColor} 30%,  ${secondColor} 90%)`,
        border: 0,
        borderRadius: 3,
        boxShadow: `0 3px 5px 2px ${shadowColor}`,
        color: 'white',
        height: { height },
        '&:hover': {
          background: `linear-gradient(45deg, ${secondColor} 30%,  ${firstColor} 90%)`,
        },
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : title }
    </Button>
  );
};

export default GradientButton;
