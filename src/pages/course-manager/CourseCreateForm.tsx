import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import React from 'react';

interface CourseCreateFormProps {
  open: boolean;
  onClose: () => void;
}

const CourseCreateForm: React.FC<CourseCreateFormProps> = ({
  open,
  onClose,
}) => {
  function handleSubmit() {
  }

  return (
    <Dialog open={open} onClose={onClose}  fullWidth maxWidth="lg">
      <DialogTitle>
        <h3>Add New Course</h3>
      </DialogTitle>
      <DialogContent>
        <h5> Hello</h5>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add New
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CourseCreateForm;
