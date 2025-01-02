import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CircularProgress, Typography } from '@mui/material';
import { AppDispatch, RootState } from '../redux/store';
import { uploadFile } from '../services';

interface ImageUploaderProps {
    handleImageChange: (url: string) => void;
    handleUploaded: (url: string) => void;
  }

const FileUpload: React.FC<ImageUploaderProps> = ({ handleImageChange, handleUploaded }) => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error,
    file: uploadedFile,
  } = useSelector((state: RootState) => state.upload);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      handleImageChange(imageUrl);
    }else {
      handleImageChange('');
    }
  };

  const handleUpload = async () => {
    if (file) {
      const response = await dispatch(uploadFile(file));
      handleUploaded(response.payload);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <input type="file" onChange={handleFileChange} />
      <div style={{ marginTop: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'upload file'}
        </Button>
      </div>
    </div>
  );
};

export default FileUpload;
