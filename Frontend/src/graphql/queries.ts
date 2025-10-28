import { gql } from '@apollo/client';

export const GET_SALES = gql`
  query GetSales {
    sales {
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

export const GET_ANALYTICS = gql`
  query GetAnalytics {
    analytics {
      kpis {
        totalRevenue
        totalSales
        avgOrderValue
      }
      trends {
        date
        revenue
        salesCount
      }
      topProducts {
        productName
        totalRevenue
        totalQuantity
      }
      salesByCategory {
        category
        totalRevenue
        salesCount
      }
    }
  }
`;

export const GET_SALE = gql`
  query GetSale($id: Int!) {
    sale(id: $id) {
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