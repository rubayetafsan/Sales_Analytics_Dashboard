'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ANALYZE_SENTIMENT } from '@/graphql/mutations';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  Alert,
  CircularProgress,
  Paper,
  Grid,
} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export default function SentimentAnalyzer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);

  const [analyzeSentiment, { loading, error }] = useMutation(ANALYZE_SENTIMENT, {
    onCompleted: (data) => {
      setResult(data.analyzeSentiment);
    },
  });

  const handleAnalyze = () => {
    if (text.trim()) {
      analyzeSentiment({
        variables: {
          input: { text },
        },
      });
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <SentimentVerySatisfiedIcon sx={{ fontSize: 60, color: '#10b981' }} />;
      case 'negative':
        return <SentimentVeryDissatisfiedIcon sx={{ fontSize: 60, color: '#ef4444' }} />;
      default:
        return <SentimentNeutralIcon sx={{ fontSize: 60, color: '#6b7280' }} />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" gap={1} mb={2}>
          <AnalyticsIcon color="primary" />
          <Typography variant="h6">Sentiment Analysis</Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Analyze the sentiment of customer feedback, reviews, or any text to determine if it's positive, neutral, or negative.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error.message}
          </Alert>
        )}

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Enter text to analyze"
          placeholder="Type or paste your text here... (e.g., customer review, feedback, comment)"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          fullWidth
          sx={{ mb: 3 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Analyze Sentiment'}
        </Button>

        {result && (
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} display="flex" justifyContent="center">
                {getSentimentIcon(result.sentiment)}
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Chip
                  label={result.sentiment.toUpperCase()}
                  color={getSentimentColor(result.sentiment) as any}
                  sx={{ fontSize: '1.2rem', fontWeight: 'bold', px: 2, py: 3 }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Box textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Score
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {result.score}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Confidence
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {result.confidence}%
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Comparative
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {result.comparative.toFixed(3)}
                  </Typography>
                </Box>
              </Grid>

              {result.positive.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Positive Words:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {result.positive.map((word: string, index: number) => (
                      <Chip key={index} label={word} size="small" color="success" variant="outlined" />
                    ))}
                  </Box>
                </Grid>
              )}

              {result.negative.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Negative Words:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {result.negative.map((word: string, index: number) => (
                      <Chip key={index} label={word} size="small" color="error" variant="outlined" />
                    ))}
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="caption">
                    <strong>How it works:</strong> The analyzer examines words and phrases to determine overall sentiment.
                    Score indicates strength (positive/negative numbers), while comparative normalizes by text length.
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
}