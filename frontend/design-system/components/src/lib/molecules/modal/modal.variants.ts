import { cva, type VariantProps } from 'class-variance-authority';

export const modalVariants = cva(
  'relative w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[calc(100vh-2rem)] animate-in fade-in zoom-in duration-200',
  {
    variants: {
      size: {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-2xl',
        full: 'sm:max-w-[calc(100%-2rem)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export type ModalVariants = VariantProps<typeof modalVariants>;
