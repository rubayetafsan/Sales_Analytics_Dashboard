import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export interface SentimentAnalysisResult {
  text: string;
  score: number;
  comparative: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  positive: string[];
  negative: string[];
  confidence: number;
}

export function analyzeSentiment(text: string): SentimentAnalysisResult {
  // Analyze the text
  const result = sentiment.analyze(text);

  // Determine sentiment category
  let sentimentCategory: 'positive' | 'neutral' | 'negative';
  if (result.score > 0) {
    sentimentCategory = 'positive';
  } else if (result.score < 0) {
    sentimentCategory = 'negative';
  } else {
    sentimentCategory = 'neutral';
  }

  // Calculate confidence based on comparative score
  // Comparative score is normalized (-1 to 1), convert to percentage
  const confidence = Math.min(Math.abs(result.comparative) * 100, 100);

  return {
    text,
    score: result.score,
    comparative: result.comparative,
    sentiment: sentimentCategory,
    positive: result.positive,
    negative: result.negative,
    confidence: parseFloat(confidence.toFixed(2)),
  };
}

// Helper function for batch analysis
export function analyzeSentimentBatch(texts: string[]): SentimentAnalysisResult[] {
  return texts.map((text) => analyzeSentiment(text));
}