import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AutocompleteComponent } from './autocomplete.component';

const meta: Meta<AutocompleteComponent> = {
  title: 'Molecules/Autocomplete',
  component: AutocompleteComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    class: { control: 'text' },
    debounceTime: { control: 'number' },
    isLoading: { control: 'boolean' },
  },
  args: {
    placeholder: 'common.searchPlaceholder',
    debounceTime: 300,
    isLoading: false,
    options: [
      { label: 'Portugal', value: 'PT' },
      { label: 'Spain', value: 'ES' },
      { label: 'United Kingdom', value: 'GB' },
      { label: 'United States', value: 'US' },
      { label: 'France', value: 'FR' },
      { label: 'Germany', value: 'DE' },
      { label: 'Italy', value: 'IT' },
    ],
  },
};

export default meta;
type Story = StoryObj<AutocompleteComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl min-h-[400px]">
        <div class="max-w-sm mx-auto">
          <ds-autocomplete 
            [options]="options"
            [placeholder]="placeholder"
            [class]="class"
            [debounceTime]="debounceTime"
            [isLoading]="isLoading"
          />
        </div>
      </div>
    `,
  }),
};

export const WithPreselectedValue: Story = {
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl('PT'),
    },
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl min-h-[400px]">
        <div class="max-w-sm mx-auto flex flex-col gap-4">
          <ds-autocomplete 
            [options]="options"
            [placeholder]="placeholder"
            [formControl]="control"
            [debounceTime]="debounceTime"
            [isLoading]="isLoading"
          />
          <div class="text-xs text-gray-medium bg-white p-4 rounded-xl border border-gray-light">
            Selected Value: <span class="font-mono text-primary">{{ control.value }}</span>
          </div>
        </div>
      </div>
    `,
  }),
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl min-h-[400px]">
        <div class="max-w-sm mx-auto">
          <ds-autocomplete 
            [options]="options"
            [placeholder]="placeholder"
            [isLoading]="isLoading"
          />
        </div>
      </div>
    `,
  }),
};

export const RemoteData: Story = {
  render: (args) => ({
    props: {
      ...args,
      remoteOptions: [],
      isFetching: false,
      search: (query: string) => {
        // This is a simplified demo of how to use it
        console.log('Searching for:', query);
      }
    },
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl min-h-[400px]">
        <div class="max-w-sm mx-auto flex flex-col gap-4">
          <ds-autocomplete 
            [options]="remoteOptions"
            [isLoading]="isFetching"
            (queryChange)="search($event)"
            placeholder="Type to search (see console)..."
          />
          <div class="text-xs text-blue-medium bg-blue-50 p-4 rounded-xl border border-blue-100 italic">
            Check the console to see the debounced query changes. In a real app, you would fetch data here and update the [options] input.
          </div>
        </div>
      </div>
    `,
  }),
};
