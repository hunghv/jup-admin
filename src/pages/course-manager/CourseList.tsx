import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Pagination,
  styled,
  Typography,
} from '@mui/material';
import { fetchCourse } from '../../services/course.service';
import { useNavigate } from 'react-router-dom';
import CurrencyFormatter from '../../components/CurrencyFormatter';
import LoadingSpinner from '../../components/Sprinner';
import { ReactComponent as StarIcon } from '../../assets/icon/star-icon.svg';

const BadgeLabel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  left: theme.spacing(1),
  backgroundColor: 'red',
  color: 'white',
  padding: theme.spacing(0.5, 1),
  borderRadius: theme.shape.borderRadius,
  fontSize: '0.8rem',
  fontWeight: 'bold',
}));

const ProductCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(1),
}));

function CourseList() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { courses, loading, error, total } = useSelector(
    (state: RootState) => state.course
  );

  useEffect(() => {
    dispatch(
      fetchCourse({
        page: page - 1,
        limit: itemsPerPage,
      })
    );
  }, [page, itemsPerPage, dispatch]);

  const handleChangePage = (event: any, value: any) => {
    setPage(value);
  };

  const handleNavigate = (id: string) => {
    navigate(`/course/${id}`);
  };

  return (
    <>
      {/* Grid Layout */}
      {loading && <LoadingSpinner></LoadingSpinner>}
      {error && (
        <Typography variant="h5" fontWeight="bold" mb={2} sx={{ color: 'red' }}>
          {error}
        </Typography>
      )}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr', // Single column on small screens
          sm: 'repeat(2, 1fr)', // Two columns on small screens
          md: 'repeat(3, 1fr)', // Three columns on medium screens
          lg: 'repeat(4, 1fr)', // Four columns on large screens
        }}
        gap={2}
      >
        {courses.map((product, index) => (
          <ProductCard
            key={index}
            onClick={() => handleNavigate(product.id)}
            sx={{
              ':hover': {
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transform: 'scale(1.02)',
              },
            }}
          >
            {product.isSale && (
              <BadgeLabel>SALE {product.saleRate}%</BadgeLabel>
            )}
            <CardMedia
              component="img"
              height="140"
              image={product?.thumnailUrl}
              alt={product?.title}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {product?.title}
              </Typography>
              {product?.originalPrice ? (
                <Typography
                  sx={{
                    textDecoration: 'line-through',
                    color: 'gray',
                    marginRight: 1,
                  }}
                  variant="body2"
                >
                  <CurrencyFormatter
                    amount={product?.originalPrice}
                    locale="vi-VN"
                    currency="VND"
                  />
                </Typography>
              ) : null}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" color="primary">
                  <CurrencyFormatter
                    amount={product?.price}
                    locale="vi-VN"
                    currency="VND"
                  />
                </Typography>
                <Box
                  sx={{
                    width: 50,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6" color="secondary">
                    {product.Rate ?? 0}
                  </Typography>
                  <Box sx={{ width: 18, margin: 1 }}>
                    <StarIcon />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </ProductCard>
        ))}
      </Box>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" sx={{ marginTop: 4 }}>
        <Pagination
          count={Math.ceil(total / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </>
  );
}

export default CourseList;
