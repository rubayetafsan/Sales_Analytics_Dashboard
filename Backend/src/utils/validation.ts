import { z } from 'zod';

const createSaleSchema = z.object({
  productName: z.string().min(1, 'Product name is required').max(255),
  category: z.string().min(1, 'Category is required').max(100),
  quantity: z.number().int().positive('Quantity must be positive'),
  price: z.number().positive('Price must be positive'),
  saleDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
});

export function validateCreateSaleInput(input: any) {
  try {
    createSaleSchema.parse(input);
    return { success: true, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    return { success: false, errors: [{ message: 'Validation failed' }] };
  }
}