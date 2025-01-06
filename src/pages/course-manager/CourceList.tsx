import { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
  Card,
  styled,
} from '@mui/material';
import LoadingSpinner from '../../components/Sprinner';
import { fetchCourse } from '../../services/course.service';

const ProductCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(1),
}));

function CourceList() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const dispatch: AppDispatch = useDispatch();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.course
  );

  const displayedProducts = courses.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
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
        {displayedProducts.map((product, index) => (
          <ProductCard key={index}>
            {/* {product.badge && <BadgeLabel>{product.badge}</BadgeLabel>} */}
            <CardMedia
              component="img"
              height="140"
              image={product?.image}
              alt={product?.name}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {product?.name}
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
                  {product?.originalPrice}
                </Typography>
              ) : null}
              <Typography variant="h6" color="primary">
                {product?.price}
              </Typography>
            </CardContent>
          </ProductCard>
        ))}
      </Box>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" sx={{ marginTop: 4 }}>
        <Pagination
          count={Math.ceil(courses.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </>
  );
}

export default CourceList;
