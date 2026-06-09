import { Meta, StoryObj } from '@storybook/angular';
import { DatagridCellStatusComponent } from './datagrid-cell-status.component';
import { FormControl } from '@angular/forms';

const meta: Meta<DatagridCellStatusComponent> = {
  title: 'Organisms/DataGrid/Molecules/DataGridRow/Atoms/DatagridCellStatus',
  component: DatagridCellStatusComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DatagridCellStatusComponent>;

export const Default: Story = {
  args: {
    status: 'Ativo',
    editMode: false,
    control: undefined,
  },
};

export const EditMode: Story = {
  args: {
    status: 'Ativo',
    editMode: true,
    control: new FormControl('Pendente'),
  },
};
