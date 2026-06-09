import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxGroupComponent } from './checkbox-group.component';

const meta: Meta<CheckboxGroupComponent> = {
  title: 'Molecules/CheckboxGroup',
  component: CheckboxGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CheckboxGroupComponent>;

export const Default: Story = {
  args: {
    label: 'Preferências de Região',
    options: ['Option 1', 'Option 2', 'Option 3'],
    disabled: false,
  },
};

export const Preselected: Story = {
  args: {
    options: ['Lisboa', 'Porto', 'Madrid'],
    value: new Set(['Lisboa', 'Madrid']),
  },
};

export const Disabled: Story = {
  args: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    disabled: true,
  },
};
