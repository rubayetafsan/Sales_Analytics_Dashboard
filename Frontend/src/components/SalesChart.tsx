'use client';

import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Trend {
  date: string;
  revenue: number;
  salesCount: number;
}

interface SalesChartProps {
  data: Trend[];
}

export default function SalesChart({ data }: SalesChartProps) {
  console.log('SalesChart data:', data);

  // Get current date and subtract 30 days
  const today = new Date('2025-10-26T02:05:00Z'); // CET time
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // Filter data for the last 30 days
  const filteredData = data.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= thirtyDaysAgo && itemDate <= today;
  });

  const formattedData = filteredData.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Revenue Trend (Last 30 Days)
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `$${value.toFixed(2)}`}
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #ccc' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}