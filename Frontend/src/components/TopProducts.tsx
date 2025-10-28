'use client';

import { Card, CardContent, Typography, Box, Chip } from '@mui/material';

interface TopProduct {
  productName: string;
  totalRevenue: number;
  totalQuantity: number;
}

interface TopProductsProps {
  products: TopProduct[];
}

export default function TopProducts({ products }: TopProductsProps) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Top Products by Revenue
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          {products.map((product, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: 2,
                bgcolor: 'grey.50',
                borderRadius: 1,
              }}
            >
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  {product.productName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {product.totalQuantity} units sold
                </Typography>
              </Box>
              <Chip
                label={`$${product.totalRevenue.toFixed(2)}`}
                color="success"
                sx={{ fontWeight: 'bold' }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}