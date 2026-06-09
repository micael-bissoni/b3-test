import { cva, type VariantProps } from 'class-variance-authority';

export const avatarVariants = cva(
  'relative flex rounded-full shrink-0 overflow-hidden select-none items-center justify-center border',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-[10px]',
        sm: 'h-8 w-8 text-xs',
        md: 'h-10 w-10 text-xs',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-xl',
      },
      variant: {
        primary: 'bg-primary border-primary text-on-primary',
        secondary: 'bg-secondary border-secondary text-on-secondary',
        outline: 'bg-transparent border-primary text-primary',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

export type AvatarVariants = VariantProps<typeof avatarVariants>;
