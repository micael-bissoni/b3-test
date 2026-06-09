import { cva } from 'class-variance-authority';

export const clipboardVariants = cva(
    'relative group w-fit',
    {
        variants: {
            status: {
                copied: '',
                initial: '',
            },
        },
        defaultVariants: {
            status: 'initial',
        },
    }
);

export const clipboardContainerVariants = cva(
    'absolute size-full flex items-center justify-center top-0 right-0 left-0 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300',
    {
        variants: {
            status: {
                copied: 'text-green-500',
                initial: 'text-gray-500',
            },
        },
        defaultVariants: {
            status: 'initial',
        },
    }
);
