import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Molecules/Card',
  component: CardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'flat', 'outline', 'elevated'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hasHeader: { control: 'boolean' },
    hasFooter: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-card [variant]="variant" [padding]="padding">
        <div class="flex flex-col gap-2">
          <h3 class="text-lg font-bold">Standard Card</h3>
          <p class="text-gray-medium">This is a standard card content with default padding and styling.</p>
        </div>
      </ds-card>
    `,
  }),
  args: {
    variant: 'default',
    padding: 'md',
  },
};

export const WithHeaderAndFooter: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-card [variant]="variant" [padding]="padding" [hasHeader]="true" [hasFooter]="true">
        <div card-header>
          <h3 class="text-lg font-bold">Card Title</h3>
        </div>
        <div class="flex flex-col gap-2">
          <p class="text-gray-medium">Card body content goes here. It can contain any elements including lists, images, or forms.</p>
        </div>
        <div card-footer class="flex justify-end gap-2">
          <button class="px-4 py-2 text-sm border border-gray-medium rounded hover:bg-gray-light/50 transition-colors">Cancel</button>
          <button class="px-4 py-2 text-sm bg-primary text-white rounded hover:opacity-90 transition-opacity">Submit</button>
        </div>
      </ds-card>
    `,
  }),
  args: {
    variant: 'default',
    padding: 'md',
  },
};

export const Elevated: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-card variant="elevated" padding="lg">
        <div class="flex flex-col gap-4">
          <h3 class="text-xl font-bold">Elevated Card</h3>
          <p class="text-gray-medium">Elevated cards are perfect for dashboard stats or highlighting important information with a soft shadow.</p>
        </div>
      </ds-card>
    `,
  }),
};
