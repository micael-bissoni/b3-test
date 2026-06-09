import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ButtonComponent } from '../../atoms/button/button.component';

const meta: Meta<LoginFormComponent> = {
  title: 'Organisms/LoginForm',
  component: LoginFormComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, IconComponent, ButtonComponent],
    }),
  ],
  argTypes: {
    // control if needed
  },
};

export default meta;
type Story = StoryObj<LoginFormComponent>;

export const Default: Story = {
  args: {
  },
};

export const Submitting: Story = {
  args: {
    // Since isSubmitting is a signal inside the component for internal state, 
    // to mock it externally we'd need to expose it as an input or use a play function to click submit.
  },
  play: async ({ canvasElement }) => {
    // If you want to see the submitting state, you could mock the form submission here
  }
};
