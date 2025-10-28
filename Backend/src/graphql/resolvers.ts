import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';
import { validateCreateSaleInput } from '../utils/validation.js';
import { analyzeSentiment, type SentimentAnalysisResult } from '../services/sentimentService.js';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    // Get all sales
    sales: async () => {
      return await prisma.sale.findMany({
        orderBy: [{ saleDate: 'desc' }, { createdAt: 'desc' }],
      });
    },

    // Get single sale
    sale: async (_: any, { id }: { id: number }) => {
      const sale = await prisma.sale.findUnique({ where: { id } });
      if (!sale) {
        throw new GraphQLError('Sale not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
      return sale;
    },

    // Get analytics
    analytics: async () => {
      // Get all sales for calculations
      const sales = await prisma.sale.findMany();

      // Calculate KPIs
      const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.totalAmount), 0);
      const totalSales = sales.length;
      const avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

      // Calculate trends (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const recentSales = sales.filter((sale) => sale.saleDate >= thirtyDaysAgo);

      const trendsMap = new Map<string, { revenue: number; count: number }>();
      recentSales.forEach((sale) => {
        const dateKey = sale.saleDate.toISOString().split('T')[0];
        const existing = trendsMap.get(dateKey) || { revenue: 0, count: 0 };
        trendsMap.set(dateKey, {
          revenue: existing.revenue + Number(sale.totalAmount),
          count: existing.count + 1,
        });
      });

      const trends = Array.from(trendsMap.entries())
        .map(([date, data]) => ({
          date,
          revenue: data.revenue,
          salesCount: data.count,
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

      // Calculate top products
      const productsMap = new Map<string, { revenue: number; quantity: number }>();
      sales.forEach((sale) => {
        const existing = productsMap.get(sale.productName) || { revenue: 0, quantity: 0 };
        productsMap.set(sale.productName, {
          revenue: existing.revenue + Number(sale.totalAmount),
          quantity: existing.quantity + sale.quantity,
        });
      });

      const topProducts = Array.from(productsMap.entries())
        .map(([productName, data]) => ({
          productName,
          totalRevenue: data.revenue,
          totalQuantity: data.quantity,
        }))
        .sort((a, b) => b.totalRevenue - a.totalRevenue)
        .slice(0, 5);

      // Calculate sales by category
      const categoriesMap = new Map<string, { revenue: number; count: number }>();
      sales.forEach((sale) => {
        const existing = categoriesMap.get(sale.category) || { revenue: 0, count: 0 };
        categoriesMap.set(sale.category, {
          revenue: existing.revenue + Number(sale.totalAmount),
          count: existing.count + 1,
        });
      });

      const salesByCategory = Array.from(categoriesMap.entries())
        .map(([category, data]) => ({
          category,
          totalRevenue: data.revenue,
          salesCount: data.count,
        }))
        .sort((a, b) => b.totalRevenue - a.totalRevenue);

      return {
        kpis: {
          totalRevenue,
          totalSales,
          avgOrderValue,
        },
        trends,
        topProducts,
        salesByCategory,
      };
    },
  },

  Mutation: {
    // Create new sale
    createSale: async (_: any, { input }: any) => {
      // Validate input
      const validation = validateCreateSaleInput(input);
      if (!validation.success) {
        throw new GraphQLError('Validation failed', {
          extensions: { 
            code: 'BAD_USER_INPUT',
            errors: validation.errors 
          },
        });
      }

      const { productName, category, quantity, price, saleDate } = input;
      const totalAmount = quantity * price;

      return await prisma.sale.create({
        data: {
          productName,
          category,
          quantity,
          price,
          totalAmount,
          saleDate: new Date(saleDate),
        },
      });
    },

    // Delete sale
    deleteSale: async (_: any, { id }: { id: number }) => {
      try {
        await prisma.sale.delete({ where: { id } });
        return true;
      } catch (error) {
        throw new GraphQLError('Sale not found', {
          extensions: { code: 'NOT_FOUND' },
        });
      }
    },

    // Analyze sentiment
    analyzeSentiment: async (_: any, { input }: { input: { text: string } }) => {
      const { text } = input;

      // Validate input
      if (!text || text.trim().length === 0) {
        throw new GraphQLError('Text is required', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      if (text.length > 5000) {
        throw new GraphQLError('Text is too long (max 5000 characters)', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      // Perform sentiment analysis
      const result = analyzeSentiment(text);

      return result;
    },
  },
};