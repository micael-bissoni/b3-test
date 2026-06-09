import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FileUploadComponent } from './file-upload.component';

const meta: Meta<FileUploadComponent> = {
  title: 'Molecules/FileUpload',
  component: FileUploadComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
    moduleMetadata({
      imports: [CommonModule, TranslateModule],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    fileCleared: { action: 'fileCleared' },
  },
  args: {
    size: 'md',
    label: 'molecules.fileUpload.label',
    hint: 'molecules.fileUpload.hint',
    accept: 'image/*',
  },
};

export default meta;
type Story = StoryObj<FileUploadComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl">
        <ds-file-upload 
          [size]="size"
          [label]="label"
          [hint]="hint"
          [accept]="accept"
          (fileCleared)="fileCleared()"
        >
        </ds-file-upload>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl flex flex-wrap gap-12 items-end justify-center">
        <div class="flex flex-col items-center gap-4">
          <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Small (sm)</span>
          <ds-file-upload size="sm"></ds-file-upload>
        </div>
        <div class="flex flex-col items-center gap-4">
          <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Medium (md)</span>
          <ds-file-upload size="md"></ds-file-upload>
        </div>
        <div class="flex flex-col items-center gap-4">
          <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Large (lg)</span>
          <ds-file-upload size="lg"></ds-file-upload>
        </div>
        <div class="flex flex-col items-center gap-4">
          <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Extra Large (xl)</span>
          <ds-file-upload size="xl"></ds-file-upload>
        </div>
      </div>
      <div class="p-12 bg-gray-50 rounded-3xl mt-8 w-full max-w-2xl mx-auto">
        <div class="flex flex-col items-center gap-4">
          <span class="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Width (full)</span>
          <ds-file-upload size="full"></ds-file-upload>
        </div>
      </div>
    `,
  }),
};

export const ImagePreview: Story = {
  args: {
    // @ts-ignore - ngModel is handled by CVA
    previewUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl">
        <ds-file-upload 
          [size]="size"
          [label]="label"
          [hint]="hint"
          [ngModel]="previewUrl"
        >
        </ds-file-upload>
      </div>
    `,
  }),
};

export const FilePreview: Story = {
  args: {
    // @ts-ignore
    previewUrl: 'document-preview',
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="p-12 bg-gray-50 rounded-3xl">
        <ds-file-upload 
          #upload
          size="lg"
          [label]="label"
          [hint]="hint"
          [ngModel]="previewUrl"
        >
        </ds-file-upload>
      </div>
    `,
  }),
};
