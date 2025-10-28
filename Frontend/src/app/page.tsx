'use client';

import Dashboard from '@/components/Dashboard';
import { Container } from '@mui/material';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Dashboard />
      </Container>
    </main>
  );
}