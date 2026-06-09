import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CreateAccountTemplateComponent } from './create-account-template.component';
import { CreateAccountFormComponent } from '../../organisms/create-account-form/create-account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ButtonComponent } from '../../atoms/button/button.component';

const meta: Meta<CreateAccountTemplateComponent> = {
  title: 'Templates/CreateAccountTemplate',
  component: CreateAccountTemplateComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CreateAccountFormComponent, ReactiveFormsModule, IconComponent, ButtonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<CreateAccountTemplateComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-create-account-template>
        <ds-create-account-form></ds-create-account-form>
      </ds-create-account-template>
    `,
  }),
};
