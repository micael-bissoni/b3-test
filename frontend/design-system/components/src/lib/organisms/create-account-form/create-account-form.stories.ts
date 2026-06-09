import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CreateAccountFormComponent } from './create-account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { InputComponent } from '../../atoms/input/input.component';
import { InputPasswordComponent } from '../../molecules/input-password/input-password.component';
import { FormFieldComponent } from '../../molecules/form-field/form-field.component';

const meta: Meta<CreateAccountFormComponent> = {
  title: 'Organisms/CreateAccountForm',
  component: CreateAccountFormComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        ReactiveFormsModule, 
        IconComponent, 
        ButtonComponent, 
        InputComponent, 
        InputPasswordComponent, 
        FormFieldComponent
      ],
    }),
  ],
  argTypes: {
    isSubmitting: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<CreateAccountFormComponent>;

export const Default: Story = {
  args: {
    isSubmitting: false,
  },
};

export const Submitting: Story = {
  args: {
    isSubmitting: true,
  },
};
