'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { TaxFormSchema } from '@/lib/schemas';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';

type TaxInputFormProps = {
  onSubmit: (data: z.infer<typeof TaxFormSchema>) => void;
  initialData?: z.infer<typeof TaxFormSchema>;
};

export function TaxInputForm({ onSubmit, initialData }: TaxInputFormProps) {
  const form = useForm<z.infer<typeof TaxFormSchema>>({
    resolver: zodResolver(TaxFormSchema),
    defaultValues: initialData || {
      calculationType: 'paye',
      income: undefined,
      taxYear: '2024',
      employmentType: 'employee',
      deductions: {},
      allowances: {},
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <CardHeader className="p-0">
            <CardTitle>Tax Information</CardTitle>
            <CardDescription>
              Provide your primary financial details for the tax year. All fields are required.
            </CardDescription>
          </CardHeader>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <FormField
              control={form.control}
              name="income"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Income (₦)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="taxYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employmentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Employment Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="calculationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tax Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="paye">PAYE</SelectItem>
                      <SelectItem value="vat" disabled>VAT (coming soon)</SelectItem>
                      <SelectItem value="wht" disabled>Withholding Tax (coming soon)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Accordion type="multiple" className="w-full" defaultValue={['deductions']}>
          <AccordionItem value="deductions">
            <AccordionTrigger className="text-lg font-semibold">
              Allowable Deductions
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="deductions.pension"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pension Contribution (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 400000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deductions.nhf"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NHF Contribution (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 125000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deductions.nhis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NHIS Premium (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deductions.lifeInsurance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Life Insurance Premium (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 100000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="allowances">
            <AccordionTrigger className="text-lg font-semibold">
              Allowances
            </AccordionTrigger>
            <AccordionContent className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="allowances.transport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Transport Allowance (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 120000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allowances.housing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Housing Allowance (₦)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 500000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-end">
          <Button type="submit" size="lg" className="gradient-primary">
            Continue to Calculation
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
