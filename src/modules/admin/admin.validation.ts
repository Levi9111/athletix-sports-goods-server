import { z } from 'zod';

const adminNameSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name id Required',
    })
    .trim()
    .max(14, { message: 'First Name cannot exceed 14 characters' }),
  middleName: z
    .string()
    .trim()
    .max(14, { message: 'Middle Name cannot exceed 14 characters' })
    .optional(),
  lastName: z
    .string({
      required_error: 'Last name is required',
    })
    .trim()
    .max(14, { message: 'Last Name cannot exceed 14 characters' }),
});

const adminValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: 'Password is required' }),
    admin: z.object({
      name: adminNameSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: 'Gender must be one of: male, female, other',
        }),
      }),
      dateOfBirth: z.string(),
      email: z
        .string({ required_error: 'Email must be provided' })
        .email({ message: 'Invalid email address' }),
      contactNo: z.string({ required_error: 'Contact No must be provided' }),
      address: z.string({
        required_error: 'Address must be provided',
      }),
      profileImg: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const AdminValidations = {
  adminValidationSchema,
};
