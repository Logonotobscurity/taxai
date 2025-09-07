import { z } from 'zod';

export const TaxFormSchema = z.object({
  calculationType: z.string({ required_error: 'Please select a tax type.' }),
  income: z.coerce
    .number({ required_error: 'Annual income is required.' })
    .positive('Income must be a positive number.'),
  taxYear: z.string({ required_error: 'Please select a tax year.' }),
  employmentType: z.string({
    required_error: 'Please select an employment type.',
  }),
  deductions: z.object({
    pension: z.coerce.number().optional(),
    nhf: z.coerce.number().optional(),
    nhis: z.coerce.number().optional(),
    lifeInsurance: z.coerce.number().optional(),
    gratuity: z.coerce.number().optional(),
  }),
  allowances: z.object({
    transport: z.coerce.number().optional(),
    housing: z.coerce.number().optional(),
    utility: z.coerce.number().optional(),
    meal: z.coerce.number().optional(),
  }),
});
