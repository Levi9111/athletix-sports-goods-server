import { z } from 'zod';

const productValidationSchema = z.object({
  product: z.object({
    name: z
      .string({
        required_error: 'Product name is required',
      })
      .max(18, {
        message: 'Product name must be at least 18 characters',
      }),
  }),

  description: z.string({ required_error: 'Product description is required' }),
  category: z.string({ required_error: 'Product category is required' }),
  brand: z.string({ required_error: 'Product brand is required' }),
  price: z
    .number({
      required_error: 'Product price is required',
    })
    .nonnegative({ message: 'Product price must be a positive number' }),
  discount: z
    .number({
      required_error: 'Product discount is required',
    })
    .nonnegative({ message: 'Product discount must be a positive number' })
    .default(0),
  image: z
    .string({
      required_error: 'Product image URL is required',
    })
    .url({ message: 'Product image URL must be a valid URL' }),
  features: z.array(z.string()).nonempty({
    message: 'Product features must be a non-empty array of strings',
  }),
});

const updateValidationSchema = z.object({
  product: z
    .object({
      name: z
        .string()
        .max(18, {
          message: 'Product name must be at most 18 characters',
        })
        .optional(),
    })
    .optional(),

  description: z.string().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  price: z
    .number()
    .nonnegative({ message: 'Product price must be a positive number' })
    .optional(),

  discount: z
    .number()
    .nonnegative({ message: 'Product discount must be a positive number' })
    .default(0)
    .optional(),

  image: z
    .string()
    .url({ message: 'Product image URL must be a valid URL' })
    .optional(),

  features: z
    .array(z.string())
    .nonempty({
      message: 'Product features must be a non-empty array of strings',
    })
    .optional(),
});

export const ProductValidations = {
  productValidationSchema,
  updateValidationSchema,
};
