import { Meta, StoryObj, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputPasswordComponent } from './input-password.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideStore } from '@ngrx/store';

const meta: Meta<InputPasswordComponent> = {
  title: 'Molecules/InputPassword',
  component: InputPasswordComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, TranslateModule],
    }),
    applicationConfig({
        providers: [
          provideStore({}),
        ],
      }),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    showVisibilityToggle: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<InputPasswordComponent>;

export const Default: Story = {
  args: {
    placeholder: '••••',
    showVisibilityToggle: true,
  },
};

export const WithoutIcon: Story = {
  args: {
    placeholder: 'Enter password',
    showVisibilityToggle: true,
  },
};

export const WithoutToggle: Story = {
  args: {
    placeholder: '••••',
    showVisibilityToggle: false,
  },
};
