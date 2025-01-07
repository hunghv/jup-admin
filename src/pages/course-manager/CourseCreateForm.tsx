import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import GradientButton from '../../components/GradientButton';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { createCourse } from '../../services/course.service';
import { CourseModel } from '../../models/CourseModel';
import LoadingSpinner from '../../components/Sprinner';

interface CourseCreateFormProps {
  open: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  duration: Yup.string().required('Duration is required'),
  isActive: Yup.boolean(),
  isSale: Yup.boolean(),
  price: Yup.number()
    .required('Price is required')
    .min(0, 'Price must be greater than or equal to 0'),
  saleRate: Yup.number()
    .min(0, 'Sale rate must be at least 0')
    .max(100, 'Sale rate cannot exceed 100'),
});

const CourseCreateForm: React.FC<CourseCreateFormProps> = ({
  open,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      duration: '',
      isActive: true,
      isSale: false,
      saleRate: 0,
      price: 0,
    },
    resolver: yupResolver(validationSchema),
  });

  const isSale = watch('isSale');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileUpload, setFileUpload] = useState<any>(null);
  const dispatch: AppDispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.course);

  const onFormSubmit: SubmitHandler<any> = async (data: CourseModel) => {
    const response = await dispatch(
      createCourse({ file: fileUpload, data: data })
    );
    if (response.payload) {
      setValue('title', '');
      setValue('description', '');
      setValue('duration', '');
      setValue('isActive', true);
      setValue('isSale', false);
      setValue('saleRate', 0);
      setValue('price', 0);
      setImagePreview(null);
      setFileUpload(null);
      onClose();
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileUpload(file);
      setImagePreview(URL.createObjectURL(file)); // Tạo preview URL
    }
  };

  return (
    <>
      {loading && <LoadingSpinner></LoadingSpinner>}
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
        <DialogTitle>
          <h3>Add New Course</h3>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              maxWidth: 600,
              margin: 'auto',
            }}
          >
            {/* Thumbnail Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ marginBottom: '16px' }}
            />
          </Box>
          {/* Preview Thumbnail */}

          {imagePreview && (
            <>
              <Box sx={{ textAlign: 'center' }}>
                <img
                  src={imagePreview}
                  alt="Thumbnail Preview"
                  style={{
                    width: '100%',
                    maxWidth: '300px',
                    borderRadius: '8px',
                  }}
                />
              </Box>
            </>
          )}
          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: '100%',
              maxWidth: 600,
              margin: 'auto',
            }}
          >
            {/* Title */}
            <Controller
              control={control}
              {...register('title')}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Title"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />

            {/* Description */}
            <Controller
              control={control}
              {...register('description')}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />

            {/* Duration */}
            <Controller
              control={control}
              {...register('duration')}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Duration"
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                />
              )}
            />

            {/* Is Active */}
            <Controller
              control={control}
              {...register('isActive')}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} />}
                  label="Is Active"
                />
              )}
            />

            {/* Is Sale */}
            <Controller
              control={control}
              {...register('isSale')}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} checked={field.value} />}
                  label="Is Sale"
                />
              )}
            />
            {isSale && (
              <>
                {/* Sale Rate */}
                <Controller
                  control={control}
                  {...register('saleRate')}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Sale Rate (%)"
                      type="number"
                      error={!!errors.saleRate}
                      helperText={errors.saleRate?.message}
                    />
                  )}
                />
              </>
            )}

            {/* Price */}
            <Controller
              control={control}
              {...register('price')}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Price (VND)"
                  type="number"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary" disabled={loading}>
            Cancel
          </Button>
          <GradientButton
            firstColor={'#FE6B8B'}
            secondColor={'#FF8E53'}
            shadowColor={'rgba(255, 105, 135, .3)'}
            title={'save'}
            onClick={handleSubmit(onFormSubmit)}
            height={36}
            loading= {loading}
          ></GradientButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseCreateForm;
