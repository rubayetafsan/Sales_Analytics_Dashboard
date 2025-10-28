'use client';

import { Card, CardContent, Typography, Box } from '@mui/material';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: string;
  color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

export default function KPICard({ title, value, icon, color }: KPICardProps) {
  const gradients = {
    primary: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    secondary: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    info: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    warning: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    error: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  };

  return (
    <Card
      sx={{
        background: gradients[color],
        color: 'white',
        height: '100%',
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
              {title}
            </Typography>
            <Typography variant="h4" component="div" fontWeight="bold">
              {value}
            </Typography>
          </Box>
          <Box fontSize="3rem" sx={{ opacity: 0.8 }}>
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}