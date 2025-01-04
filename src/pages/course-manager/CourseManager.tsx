import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Pagination,
} from '@mui/material';
import { styled } from '@mui/system';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { Create } from '@mui/icons-material';

const products = [
  {
    name: 'Tiếng Anh cho người mất gốc',
    price: '2.000.000 VND',
    image: '/assets/images/product/product-1.webp',
    sale: true,
    badge: 'SALE',
  },
  {
    name: 'Tiếng Anh nâng cao',
    price: '1.000.000 VND',
    originalPrice: '',
    image: '/assets/images/product/product-2.webp',
    sale: false,
    badge: null,
  },
  {
    name: 'Tiếng Anh Toeic',
    price: '3.600.000 VND',
    originalPrice: '5.000.000',
    image: '/assets/images/product/product-3.webp',
    sale: true,
    badge: 'SALE',
  },
  {
    name: 'Làm chủ tiếng anh thật dễ',
    price: '1.500.000 VND',
    image: '/assets/images/product/product-4.webp',
    sale: false,
    badge: 'NEW',
  },
  {
    name: 'Nike ZoomX SuperRep Surge',
    price: '$9.57',
    image: '/assets/images/product/product-5.webp',
    sale: true,
    badge: 'SALE',
  },
  {
    name: 'Zoom Freak 2',
    price: '$61.46',
    originalPrice: '$81.46',
    image: '/assets/images/product/product-6.webp',
    sale: true,
    badge: 'SALE',
  },
  {
    name: 'Nike Air Max Zephyr',
    price: '$96.73',
    image: '/assets/images/product/product-7.webp',
    sale: false,
    badge: null,
  },
  {
    name: 'Jordan Delta',
    price: '$63.04',
    image: '/assets/images/product/product-8.webp',
    sale: false,
    badge: 'NEW',
  },
];

const ProductCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(1),
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

function CourseManager() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => {
    setSelectedCourse(null);
    setIsFormOpen(false);
  };
  const handleChangePage = (event: any, value: any) => {
    setPage(value);
  };

  const displayedProducts = products.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  return (
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
              setSelectedCourse(null);
              handleOpenForm();
            }}
          >
            Add Course
          </Button>
        </Box>
      </HeaderSection>

      {/* Grid Layout */}
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
              image={product.image}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {product.name}
              </Typography>
              {product.originalPrice ? (
                <Typography
                  sx={{
                    textDecoration: 'line-through',
                    color: 'gray',
                    marginRight: 1,
                  }}
                  variant="body2"
                >
                  {product.originalPrice}
                </Typography>
              ) : null}
              <Typography variant="h6" color="primary">
                {product.price}
              </Typography>
            </CardContent>
          </ProductCard>
        ))}
      </Box>

      {/* Pagination */}
      <Box display="flex" justifyContent="center" sx={{ marginTop: 4 }}>
        <Pagination
          count={Math.ceil(products.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
}

export default CourseManager;
