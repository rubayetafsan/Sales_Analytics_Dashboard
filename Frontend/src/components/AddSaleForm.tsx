'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_SALE } from '@/graphql/mutations';
import {
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Typography,
  Alert,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddSaleFormProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  onSuccess: () => void;
}

export default function AddSaleForm({ showForm, setShowForm, onSuccess }: AddSaleFormProps) {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    quantity: '',
    price: '',
    saleDate: new Date().toISOString().split('T')[0],
  });

  const [createSale, { loading, error }] = useMutation(CREATE_SALE, {
    onCompleted: () => {
      setFormData({
        productName: '',
        category: '',
        quantity: '',
        price: '',
        saleDate: new Date().toISOString().split('T')[0],
      });
      setShowForm(false);
      onSuccess();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createSale({
      variables: {
        input: {
          productName: formData.productName,
          category: formData.category,
          quantity: parseInt(formData.quantity),
          price: parseFloat(formData.price),
          saleDate: formData.saleDate,
        },
      },
    });
  };

  return (
    <Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setShowForm(!showForm)}
        sx={{ mb: 2 }}
      >
        {showForm ? 'Cancel' : 'Add New Sale'}
      </Button>

      {showForm && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Add New Sale
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error.message}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                    inputProps={{ min: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    inputProps={{ min: 0.01, step: 0.01 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Sale Date"
                    value={formData.saleDate}
                    onChange={(e) => setFormData({ ...formData, saleDate: e.target.value })}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? 'Adding...' : 'Add Sale'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}