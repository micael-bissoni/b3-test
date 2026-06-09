import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CurrencyInputComponent } from './currency-input.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const meta: Meta<CurrencyInputComponent> = {
  title: 'Atoms/Currency Input',
  component: CurrencyInputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        ReactiveFormsModule, 
        TranslateModule.forRoot()
      ],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    disabledInput: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<CurrencyInputComponent>;

export const Default: Story = {
  args: {
    variant: 'default',
    disabledInput: false,
    placeholder: 'Enter amount',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'default',
    disabledInput: true,
    placeholder: 'Enter amount',
  },
};
