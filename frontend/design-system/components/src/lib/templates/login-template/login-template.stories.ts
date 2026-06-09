import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { LoginTemplateComponent } from './login-template.component';
import { LoginFormComponent } from '../../organisms/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ButtonComponent } from '../../atoms/button/button.component';

const meta: Meta<LoginTemplateComponent> = {
  title: 'Templates/LoginTemplate',
  component: LoginTemplateComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, LoginFormComponent, ReactiveFormsModule, IconComponent, ButtonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<LoginTemplateComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-login-template>
        <ds-login-form></ds-login-form>
      </ds-login-template>
    `,
  }),
};
