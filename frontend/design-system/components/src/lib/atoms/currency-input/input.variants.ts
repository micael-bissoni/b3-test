import { cva, type VariantProps } from 'class-variance-authority';

export const inputVariants = cva(
    'flex-1 py-1.5 outline-none text-sm font-base placeholder:text-gray-medium bg-transparent text-gray-dark focus:ring-4 focus:ring-primary/20 transition-all',
    {
        variants: {
            variant: {
                default: 'w-full bg-primary/10 border-none rounded-xl py-4 h-14 text-sm font-base shadow-sm hover:bg-primary/[0.15]',
                ghost: 'border-none',
                premium: 'w-full bg-primary/10 border-none rounded-xl py-4 h-14 text-sm font-base shadow-sm hover:bg-primary/[0.15]',
            },
        },
    }
);

export type InputVariants = VariantProps<typeof inputVariants>;
