import type { Meta, StoryObj } from '@storybook/angular';
import { DividerComponent } from './divider.component';

const meta: Meta<DividerComponent> = {
  title: 'Atoms/Divider',
  component: DividerComponent,
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    margin: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<DividerComponent>;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    margin: 'md',
  },
};

export const InContext: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex flex-col">
        <p class="text-sm">Abimael Bissoni</p>
        <ds-divider [orientation]="orientation" [margin]="margin"></ds-divider>
        <p class="text-sm">Developer</p>
      </div>
    `,
  }),
};
