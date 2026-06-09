import { Meta, StoryObj } from '@storybook/angular';
import { DatagridCellValidateComponent } from './datagrid-cell-validate.component';
import { FormControl } from '@angular/forms';

const meta: Meta<DatagridCellValidateComponent> = {
  title: 'Organisms/DataGrid/Molecules/DataGridRow/Atoms/DatagridCellValidate',
  component: DatagridCellValidateComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DatagridCellValidateComponent>;

export const Default: Story = {
  args: {
    dataInicio: '01/01/2023',
    dataFim: '31/12/2023',
    editMode: false,
    controlInicio: undefined,
    controlFim: undefined,
  },
};

export const EditMode: Story = {
  args: {
    dataInicio: '01/01/2023',
    dataFim: '31/12/2023',
    editMode: true,
    controlInicio: new FormControl('2024-01-01'),
    controlFim: new FormControl('2024-12-31'),
  },
};
