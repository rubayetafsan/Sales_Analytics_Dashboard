'use client';

import { useMutation } from '@apollo/client';
import { DELETE_SALE } from '@/graphql/mutations';
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface Sale {
  id: number;
  productName: string;
  category: string;
  quantity: number;
  price: number;
  totalAmount: number;
  saleDate: string;
}

interface SalesTableProps {
  sales: Sale[];
  onDelete: () => void;
}

export default function SalesTable({ sales, onDelete }: SalesTableProps) {
  const [deleteSale, { loading, error }] = useMutation(DELETE_SALE, {
    onCompleted: () => {
      onDelete();
    },
  });

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this sale?')) {
      await deleteSale({ variables: { id } });
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Recent Sales
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sales.map((sale) => (
                <TableRow key={sale.id} hover>
                  <TableCell>{sale.productName}</TableCell>
                  <TableCell>{sale.category}</TableCell>
                  <TableCell align="right">{sale.quantity}</TableCell>
                  <TableCell align="right">${Number(sale.price).toFixed(2)}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                    ${Number(sale.totalAmount).toFixed(2)}
                  </TableCell>
                  <TableCell>{new Date(sale.saleDate).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(sale.id)}
                      disabled={loading}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}