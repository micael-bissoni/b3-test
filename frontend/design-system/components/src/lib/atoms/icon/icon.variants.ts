import { cva, type VariantProps } from 'class-variance-authority';

export const iconVariants = cva(
  'inline-block align-middle shrink-0 [mask-repeat:no-repeat] [mask-position:center] [mask-size:contain]',
  {
    variants: {
      intent: {
        primary: 'bg-primary',
        secondary: 'bg-secondary',
        tertiary: 'bg-tertiary',
        inherit: 'bg-current',
        success: 'bg-success',
        error: 'bg-error',
        warning: 'bg-warning',
        info: 'bg-info',
      },
      size: {
        small: 'w-4 h-4',
        medium: 'w-6 h-6',
        large: 'w-8 h-8',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  }
);

export type IconVariants = VariantProps<typeof iconVariants>;
