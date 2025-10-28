export const typeDefs = `#graphql
  scalar Date
  scalar Decimal

  type Sale {
    id: Int!
    productName: String!
    category: String!
    quantity: Int!
    price: Decimal!
    totalAmount: Decimal!
    saleDate: Date!
    createdAt: Date!
  }

  type KPIs {
    totalRevenue: Float!
    totalSales: Int!
    avgOrderValue: Float!
  }

  type Trend {
    date: String!
    revenue: Float!
    salesCount: Int!
  }

  type TopProduct {
    productName: String!
    totalRevenue: Float!
    totalQuantity: Int!
  }

  type SalesByCategory {
    category: String!
    totalRevenue: Float!
    salesCount: Int!
  }

  type Analytics {
    kpis: KPIs!
    trends: [Trend!]!
    topProducts: [TopProduct!]!
    salesByCategory: [SalesByCategory!]!
  }

  input CreateSaleInput {
    productName: String!
    category: String!
    quantity: Int!
    price: Float!
    saleDate: String!
  }

  type Query {
    sales: [Sale!]!
    sale(id: Int!): Sale
    analytics: Analytics!
  }

  type SentimentResult {
    text: String!
    score: Int!
    comparative: Float!
    sentiment: String!
    positive: [String!]!
    negative: [String!]!
    confidence: Float!
  }

  input SentimentAnalysisInput {
    text: String!
  }

  type Mutation {
    createSale(input: CreateSaleInput!): Sale!
    deleteSale(id: Int!): Boolean!
    analyzeSentiment(input: SentimentAnalysisInput!): SentimentResult!
  }
`;