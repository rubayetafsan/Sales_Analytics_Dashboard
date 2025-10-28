'use client';

import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

interface CategorySales {
  category: string;
  totalRevenue: number;
  salesCount: number;
}

interface SalesByCategoryProps {
  categories: CategorySales[];
}

export default function SalesByCategory({ categories }: SalesByCategoryProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Sales by Category
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {categories.map((cat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                  borderRadius: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {cat.category}
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary.main">
                  ${cat.totalRevenue.toFixed(2)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {cat.salesCount} sales
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}