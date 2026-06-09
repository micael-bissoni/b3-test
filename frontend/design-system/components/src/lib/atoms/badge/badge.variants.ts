import { cva, type VariantProps } from 'class-variance-authority';

export const badgeVariants = cva(
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors',
    {
        variants: {
            intent: {
                success: 'bg-success/10 text-success border border-success/20',
                warning: 'bg-warning/10 text-warning border border-warning/20',
                danger: 'bg-danger/10 text-danger border border-danger/20',
                info: 'bg-info/10 text-info border border-info/20',
                neutral: 'bg-gray-light text-gray-dark border border-gray-medium/20',
            },
        },
        defaultVariants: {
            intent: 'neutral',
        }
    }
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
