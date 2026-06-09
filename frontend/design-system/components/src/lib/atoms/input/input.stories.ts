import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { InputComponent } from './input.component';
import { ButtonComponent } from '../button/button.component';
import { type ButtonVariants } from '../button/button.variants';

type InputStoryArgs = InputComponent & {
  intent?: ButtonVariants['intent'];
  size?: ButtonVariants['size'];
  shape?: ButtonVariants['shape'];
  onIconClick?: () => void;
};

const meta: Meta<InputStoryArgs> = {
  title: 'Atoms/Input',
  component: InputComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, TranslateModule.forRoot(), ButtonComponent],
    }),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'premium'],
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    disabledInput: {
      control: 'boolean',
      name: 'disabled',
    },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'outline', 'ghost', 'link', 'success', 'danger', 'warning', 'info'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'icon'],
    },
    shape: {
      control: 'select',
      options: ['standard', 'circle'],
    },
  },
};

export default meta;
type Story = StoryObj<InputStoryArgs>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
  },
};

export const Premium: Story = {
  args: {
    placeholder: 'Premium input...',
    variant: 'premium',
  },
};

export const Ghost: Story = {
  args: {
    placeholder: 'Ghost input...',
    variant: 'ghost',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter text...',
    value: 'Hello World',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input...',
    disabledInput: true,
  },
};

export const Password: Story = {
  args: {
    placeholder: 'Enter password...',
    type: 'password',
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Search...',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-input [placeholder]="placeholder">
        <ds-button prefix intent="ghost" size="icon" shape="standard">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </ds-button>
      </ds-input>
    `,
  }),
};

export const WithClickableIcon: Story = {
  args: {
    placeholder: 'Click the icon...',
    intent: 'primary',
    size: 'icon',
    shape: 'circle',
  },
  argTypes: {
    onIconClick: { action: 'iconClicked' },
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-input 
        [placeholder]="placeholder" 
      >
        <ds-button 
          prefix 
          [intent]="intent"
          [size]="size"
          [shape]="shape"
          class="cursor-pointer"
          (click)="onIconClick()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </ds-button>
      </ds-input>
    `,
  }),
};

export const WithPrefix: Story = {
  args: {
    placeholder: 'Enter amount...',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-input [placeholder]="placeholder">
        <span prefix class="text-gray-dark font-medium">$</span>
      </ds-input>
    `,
  }),
};

export const WithSuffix: Story = {
  args: {
    placeholder: 'Weight...',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-input [placeholder]="placeholder">
        <span suffix class="text-gray-medium text-sm">kg</span>
      </ds-input>
    `,
  }),
};

export const WithPrefixAndSuffix: Story = {
  args: {
    placeholder: '0.00',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-input [placeholder]="placeholder">
        <span prefix class="text-gray-dark font-medium">€</span>
        <span suffix class="text-gray-medium text-sm">R$</span>
      </ds-input>
    `,
  }),
};
