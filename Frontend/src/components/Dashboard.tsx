'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ANALYTICS, GET_SALES } from '@/graphql/queries';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import KPICard from './KPICard';
import SalesChart from './SalesChart';
import TopProducts from './TopProducts';
import SalesByCategory from './SalesByCategory';
import SalesTable from './SalesTable';
import AddSaleForm from './AddSaleForm';
import SentimentAnalyzer from './SentimentAnalyzer';

export default function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: analyticsData, loading: analyticsLoading, error: analyticsError } = useQuery(GET_ANALYTICS);
  const { data: salesData, loading: salesLoading, error: salesError, refetch } = useQuery(GET_SALES);

  const loading = analyticsLoading || salesLoading;
  const error = analyticsError || salesError;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading data: {error.message}
      </Alert>
    );
  }

  const analytics = analyticsData?.analytics;
  const sales = salesData?.sales || [];

  return (
    <Box>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom className="font-bold text-gray-800">
          Sales Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and analyze your sales performance
        </Typography>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <KPICard
            title="Total Revenue"
            value={`$${analytics?.kpis?.totalRevenue?.toFixed(2) || '0.00'}`}
            icon="💰"
            color="primary"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <KPICard
            title="Total Sales"
            value={analytics?.kpis?.totalSales || 0}
            icon="🛍️"
            color="secondary"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <KPICard
            title="Avg Order Value"
            value={`$${analytics?.kpis?.avgOrderValue?.toFixed(2) || '0.00'}`}
            icon="📊"
            color="info"
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} lg={6}>
          <SalesChart data={analytics?.trends || []} />
        </Grid>
        <Grid item xs={12} lg={6}>
          <TopProducts products={analytics?.topProducts || []} />
        </Grid>
      </Grid>

      {/* Sales by Category */}
      <Box mb={4}>
        <SalesByCategory categories={analytics?.salesByCategory || []} />
      </Box>

      {/* Sentiment Analysis */}
      <Box mb={4}>
        <SentimentAnalyzer />
      </Box>

      {/* Add Sale Form */}
      <Box mb={4}>
        <AddSaleForm 
          showForm={showAddForm} 
          setShowForm={setShowAddForm}
          onSuccess={() => refetch()}
        />
      </Box>

      {/* Sales Table */}
      <SalesTable sales={sales} onDelete={() => refetch()} />
    </Box>
  );
}