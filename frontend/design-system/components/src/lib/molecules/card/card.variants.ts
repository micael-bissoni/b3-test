import { cva, type VariantProps } from 'class-variance-authority';

export const cardVariants = cva(
  'rounded-lg border overflow-hidden transition-all duration-200 bg-white',
  {
    variants: {
      variant: {
        default: 'border-gray-light shadow-sm hover:shadow-md',
        flat: 'bg-gray-light border-none shadow-none',
        outline: 'bg-transparent border-gray-medium',
        elevated: 'border-none shadow-lg hover:shadow-xl',
      },
      padding: {
        none: 'p-0',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
    },
  }
);

export type CardVariants = VariantProps<typeof cardVariants>;
