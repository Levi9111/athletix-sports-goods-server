import { z } from 'zod';

const customerNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(14, { message: 'First Name cannot exceed 14 characters' })
    .min(1, { message: 'Last Name is required' }),
  middleName: z
    .string()
    .trim()
    .max(14, { message: 'Middle Name cannot exceed 14 characters' })
    .optional(),
  lastName: z
    .string()
    .trim()
    .max(14, { message: 'Last Name cannot exceed 14 characters' })
    .min(1, { message: 'Last Name is required' }),
});

const customerValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'Password is required' }),
    customer: z.object({
      name: customerNameSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: 'Gender must be one of: male, female, other',
        }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string({ required_error: 'Email must be provided' })
        .email({ message: 'Invalid email address' }),
      contactNo: z.string({ required_error: 'Contact No must be provided' }),
      shippingAddress: z.string({
        required_error: 'shippingAddress must be provided',
      }),
      billingAddress: z.string().optional(),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const CustomerValidations = {
  customerValidationSchema,
};
