import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

const meta: Meta<AvatarComponent> = {
  title: 'Atoms/Avatar',
  component: AvatarComponent,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<AvatarComponent>;

export const Default: Story = {
  args: {
    src: 'https://github.com/micaelbissoni.png',
    alt: 'Micael Bissoni',
    size: 'md',
    variant: 'primary',
  },
};

export const Initials: Story = {
  args: {
    firstName: 'Micael',
    lastName: 'Bissoni',
    size: 'lg',
    variant: 'secondary',
  },
};

export const Sizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="flex items-end gap-4">
        <ds-avatar size="xs" firstName="X" lastName="S"></ds-avatar>
        <ds-avatar size="sm" firstName="S" lastName="M"></ds-avatar>
        <ds-avatar size="md" firstName="M" lastName="D"></ds-avatar>
        <ds-avatar size="lg" firstName="L" lastName="G"></ds-avatar>
        <ds-avatar size="xl" firstName="X" lastName="L"></ds-avatar>
      </div>
    `,
  }),
};
