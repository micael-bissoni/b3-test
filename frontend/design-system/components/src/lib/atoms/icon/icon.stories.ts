import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  title: 'Atoms/Icon',
  component: IconComponent,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: [
        'content-copy',
        'content-paste',
        'check-circle',
        'calendar-today',
        'payments',
        'corporate-fare',
        'management',
        'location-on',
      ],
    },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'success', 'error', 'warning', 'info', 'inherit'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<IconComponent>;

export const Primary: Story = {
  args: {
    name: 'content-copy',
    intent: 'primary',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    name: 'content-paste',
    intent: 'secondary',
    size: 'large',
  },
};

export const CorporateFare: Story = {
  args: {
    name: 'corporate-fare',
    intent: 'primary',
    size: 'large',
  },
};

export const Management: Story = {
  args: {
    name: 'management',
    intent: 'secondary',
    size: 'large',
  },
};
