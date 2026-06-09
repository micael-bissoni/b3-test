import type { Meta, StoryObj } from '@storybook/angular';
import { RadioGroupComponent } from './radio-group.component';
import { userEvent, within } from '@storybook/testing-library';

const meta: Meta<RadioGroupComponent> = {
  title: 'Molecules/RadioGroup',
  component: RadioGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    options: { control: 'object' },
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<RadioGroupComponent>;

export const Default: Story = {
  args: {
    label: 'Estado do Processo',
    options: ['Option 1', 'Option 2', 'Option 3'],
    disabled: false,
    value: '',
  }
};

export const Preselected: Story = {
  args: {
    options: ['Todos', 'Ativa', 'Pendente'],
    value: 'Ativa',
  },
};

export const Disabled: Story = {
  args: {
    options: ['High', 'Medium', 'Low'],
    disabled: true,
    value: 'Medium',
  },
};
