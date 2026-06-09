import type { Meta, StoryObj } from '@storybook/angular';
import { DataGridColumnComponent } from './data-grid-column.component';

const meta: Meta<DataGridColumnComponent> = {
  title: 'Organisms/DataGrid/Molecules/DataGridColumn',
  component: DataGridColumnComponent,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<DataGridColumnComponent>;

export const Left: Story = {
  args: {
    align: 'left',
  },
  render: (args) => ({
    props: args,
    template: `<ds-data-grid-column [align]="align">{{ 'organisms.dataGrid.column.designation' | translate }}</ds-data-grid-column>`,
  }),
};

export const Center: Story = {
  args: {
    align: 'center',
  },
  render: (args) => ({
    props: args,
    template: `<ds-data-grid-column [align]="align">Validate</ds-data-grid-column>`,
  }),
};

export const Right: Story = {
  args: {
    align: 'right',
  },
  render: (args) => ({
    props: args,
    template: `<ds-data-grid-column [align]="align">Ações</ds-data-grid-column>`,
  }),
};
