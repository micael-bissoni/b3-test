import type { Meta, StoryObj } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

const meta: Meta<BadgeComponent> = {
  title: 'Atoms/Badge',
  component: BadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['success', 'warning', 'danger', 'info', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<BadgeComponent>;

export const Success: Story = {
  args: {
    intent: 'success',
  },
  render: (args) => ({
    props: args,
    template: `<ds-badge [intent]="intent">Ativo</ds-badge>`,
  }),
};

export const Warning: Story = {
  args: {
    intent: 'warning',
  },
  render: (args) => ({
    props: args,
    template: `<ds-badge [intent]="intent">Pendente</ds-badge>`,
  }),
};

export const Danger: Story = {
  args: {
    intent: 'danger',
  },
  render: (args) => ({
    props: args,
    template: `<ds-badge [intent]="intent">Cancelado</ds-badge>`,
  }),
};

export const Info: Story = {
  args: {
    intent: 'info',
  },
  render: (args) => ({
    props: args,
    template: `<ds-badge [intent]="intent">Info</ds-badge>`,
  }),
};

export const Neutral: Story = {
  args: {
    intent: 'neutral',
  },
  render: (args) => ({
    props: args,
    template: `<ds-badge [intent]="intent">Rascunho</ds-badge>`,
  }),
};
