import type { Meta, StoryObj } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<ModalComponent> = {
  title: 'Molecules/Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
  },
};

export default meta;
type Story = StoryObj<ModalComponent>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Example Modal',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-modal 
        [isOpen]="isOpen" 
        [title]="title" 
        [size]="size"
        (close)="isOpen = false"
      >
        <p class="text-gray-600">
          This is a modal content. You can put anything here.
          It supports Atomic Design and is fully responsive.
        </p>
        <div footer class="flex gap-2">
          <ds-button intent="secondary" (click)="isOpen = false">Cancel</ds-button>
          <ds-button intent="primary" (click)="isOpen = false">Confirm</ds-button>
        </div>
      </ds-modal>
      <ds-button (click)="isOpen = true">Open Modal</ds-button>
    `,
  }),
};

export const Large: Story = {
  args: {
    ...Default.args,
    size: 'lg',
    title: 'Large Modal Title',
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: 'sm',
    title: 'Small Modal Title',
  },
};
