import type { Meta, StoryObj } from '@storybook/angular';
import { FundationsComponent } from './fundations.component';

const meta: Meta<FundationsComponent> = {
  title: 'Design System/Fundations',
  component: FundationsComponent,
  tags: ['!autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      disable: true,
    },
    actions: {
      disable: true,
    },
    docs: {
      disable: true,
    },
  },
};

export default meta;
type Story = StoryObj<FundationsComponent>;

export const Default: Story = {
  args: {},
};
