import type { Meta, StoryObj } from '@storybook/angular';
import { FormFieldComponent } from './form-field.component';
import { InputComponent } from '../../atoms/input/input.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<FormFieldComponent> = {
  title: 'Molecules/FormField',
  component: FormFieldComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [InputComponent],
    }),
  ],
  argTypes: {
    label: { control: 'text' },
    error: { control: 'text' },
    hint: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<FormFieldComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-form-field [label]="label" [hint]="hint" [error]="error" [required]="required">
        <ds-input placeholder="Enter text..."></ds-input>
      </ds-form-field>
    `,
  }),
  args: {
    label: 'Username',
    hint: 'Enter your preferred username',
    required: true,
  },
};

export const WithError: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-form-field [label]="label" [error]="error" [required]="true">
        <ds-input variant="default" [class]="'border-danger'"></ds-input>
      </ds-form-field>
    `,
  }),
  args: {
    label: 'Email',
    error: 'Please enter a valid email address',
  },
};
