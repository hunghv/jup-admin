import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { Create } from '@mui/icons-material';
import CourseCreateForm from './CourseCreateForm';
import CourseList from './CourseList';

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

function CourseManager() {
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => {
    setIsFormOpen(false);
  };
  return (
    <>
      <Box sx={{ padding: 2 }}>
        {/* Header Section */}
        <HeaderSection>
          <Typography variant="h5" fontWeight="bold">
            Courses
          </Typography>
          <Box>
            <Button startIcon={<FilterListIcon />} sx={{ marginRight: 2 }}>
              Filters
            </Button>
            <Button endIcon={<SortIcon />}>Sort By: Featured</Button>
            <Button
              startIcon={<Create />}
              sx={{ marginLeft: 2 }}
              onClick={() => {
                handleOpenForm();
              }}
            >
              Add Course
            </Button>
          </Box>
        </HeaderSection>
        <CourseList></CourseList>
        <CourseCreateForm open={isFormOpen} onClose={handleCloseForm} />
      </Box>
    </>
  );
}

export default CourseManager;
