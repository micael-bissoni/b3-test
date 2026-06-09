import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
    'inline-flex items-center justify-center font-base font-medium transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
    {
        variants: {
            intent: {
                primary: 'bg-primary text-on-primary hover:opacity-90 shadow-md',
                secondary: 'bg-secondary text-on-secondary border border-secondary hover:bg-secondary/90',
                tertiary: 'bg-tertiary text-on-tertiary border border-tertiary hover:bg-tertiary/90',
                outline: 'bg-transparent border border-primary text-primary hover:bg-primary/5',
                ghost: 'bg-transparent text-primary hover:bg-primary/5',
                link: 'bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto',
                success: 'bg-success text-on-success border border-success hover:bg-success/90',
                danger: 'bg-danger text-on-danger border border-danger hover:bg-danger/90',
                warning: 'bg-warning text-on-warning border border-warning hover:bg-warning/90',
                info: 'bg-info text-on-info border border-info hover:bg-info/90',
            },
            size: {
                small: 'text-sm px-2 py-1',
                medium: 'text-md px-4 py-2',
                large: 'text-lg px-6 py-3',
                icon: 'p-1 h-auto w-auto aspect-square text-sm'
            },
            shape: {
                standard: 'rounded-button',
                circle: 'rounded-full aspect-square'
            },
            fullWidth: {
                true: 'w-full',
                false: ''
            }
        },
        defaultVariants: {
            intent: 'primary',
            size: 'medium',
            shape: 'standard',
            fullWidth: false,
        }
    }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
