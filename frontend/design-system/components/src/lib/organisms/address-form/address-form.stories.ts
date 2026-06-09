import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AddressFormComponent } from './address-form.component';

const meta: Meta<AddressFormComponent> = {
  title: 'Organisms/AddressForm',
  component: AddressFormComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, TranslateModule],
    }),
  ],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    group: { control: false },
    onRemove: { action: 'onRemove' },
  },
};

export default meta;
type Story = StoryObj<AddressFormComponent>;

const fb = new FormBuilder();
const createDefaultGroup = () => fb.group({
  type: ['MAIN', Validators.required],
  street: ['', Validators.required],
  number: ['', Validators.required],
  neighborhood: [''],
  complement: [''],
  city: ['', Validators.required],
  state: ['', Validators.required],
  postalCode: ['', Validators.required],
  country: ['Portugal', Validators.required],
});

export const Default: Story = {
  args: {
    group: createDefaultGroup(),
    showRemove: false,
  },
};

export const WithRemoveButton: Story = {
  args: {
    group: createDefaultGroup(),
    showRemove: true,
  },
};

export const Prefilled: Story = {
  args: {
    group: fb.group({
      type: ['SHIPPING', Validators.required],
      street: ['Av. da Liberdade', Validators.required],
      number: ['123', Validators.required],
      neighborhood: ['Baixa', Validators.required],
      complement: ['4º Esq', Validators.required],
      city: ['Lisboa', Validators.required],
      state: ['Lisboa', Validators.required],
      postalCode: ['1000-001', Validators.required],
      country: ['Portugal', Validators.required],
    }),
    showRemove: true,
  },
};

export const InvalidState: Story = {
  args: {
    group: fb.group({
      type: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: [''],
      complement: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
    }),
    showRemove: true,
  },
  play: async ({ canvasElement }) => {
    // This will trigger validation display in the component if we had a way to mark all as touched
    // Since we don't want to add complex play functions yet, we just provide the empty group
  }
};
