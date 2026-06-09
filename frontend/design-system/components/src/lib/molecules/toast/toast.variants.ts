import { cva, type VariantProps } from 'class-variance-authority';

export const toastVariants = cva(
  'flex items-center gap-3 p-4 rounded-lg border shadow-lg max-w-md w-full animate-in slide-in-from-right-full duration-300',
  {
    variants: {
      type: {
        success: 'bg-success-50 border-success-200 text-success-700',
        error: 'bg-error-50 border-error-200 text-error-700',
        warning: 'bg-warning-50 border-warning-200 text-warning-700',
        info: 'bg-primary-50 border-primary-200 text-primary-700',
      },
    },
    defaultVariants: {
      type: 'info',
    },
  }
);

export type ToastVariants = VariantProps<typeof toastVariants>;
