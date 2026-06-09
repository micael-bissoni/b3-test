import type { Meta, StoryObj } from '@storybook/angular';
import { ClipboardComponent } from './clipboard.component';

const meta: Meta<ClipboardComponent> = {
  title: 'Atoms/Clipboard',
  component: ClipboardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-clipboard [content]="content">Content to copy</ds-clipboard>
    `
  })
};

export default meta;
type Story = StoryObj<ClipboardComponent>;

export const Default: Story = {
  args: {
    content: 'Hello World',
  },
};
