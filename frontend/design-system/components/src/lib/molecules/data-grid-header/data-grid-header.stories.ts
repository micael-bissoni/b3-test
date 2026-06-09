import type { Meta, StoryObj } from '@storybook/angular';
import { DataGridHeaderComponent } from './data-grid-header.component';

const meta: Meta<DataGridHeaderComponent> = {
  title: 'Organisms/DataGrid/Molecules/DataGridHeader',
  component: DataGridHeaderComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    actionLabel: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<DataGridHeaderComponent>;

export const Default: Story = {
  args: {
    title: 'organisms.dataGrid.title',
    subtitle: 'organisms.dataGrid.subtitle',
    actionLabel: 'common.export',
  },
};

export const Minimal: Story = {
  args: {
    title: 'organisms.dataGrid.title',
    subtitle: '',
    actionLabel: '',
  },
};
