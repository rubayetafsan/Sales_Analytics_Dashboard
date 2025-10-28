import { gql } from '@apollo/client';

export const CREATE_SALE = gql`
  mutation CreateSale($input: CreateSaleInput!) {
    createSale(input: $input) {
      id
      productName
      category
      quantity
      price
      totalAmount
      saleDate
      createdAt
    }
  }
`;

export const DELETE_SALE = gql`
  mutation DeleteSale($id: Int!) {
    deleteSale(id: $id)
  }
`;

export const ANALYZE_SENTIMENT = gql`
  mutation AnalyzeSentiment($input: SentimentAnalysisInput!) {
    analyzeSentiment(input: $input) {
      text
      score
      comparative
      sentiment
      positive
      negative
      confidence
    }
  }
`;