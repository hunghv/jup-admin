import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../redux/store';
import LoadingSpinner from '../../components/Sprinner';
import { Typography } from '@mui/material';
import { findCourseById } from '../../services/course.service';

const CourceDetail = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { curentCourse, loading, error } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(findCourseById(id + ''));
  }, []);

  return (
    <>
      {loading && <LoadingSpinner></LoadingSpinner>}
      {error && (
        <Typography variant="h5" fontWeight="bold" mb={2} sx={{ color: 'red' }}>
          {error}
        </Typography>
      )}
      <div>{JSON.stringify(curentCourse)}</div>
    </>
  );
};

export default CourceDetail;
