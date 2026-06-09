import { Meta, StoryObj } from '@storybook/angular';
import { DatagridCellDesignationComponent } from './datagrid-cell-designation.component';
import { FormControl } from '@angular/forms';

const meta: Meta<DatagridCellDesignationComponent> = {
  title: 'Organisms/DataGrid/Molecules/DataGridRow/Atoms/DatagridCellDesignation',
  component: DatagridCellDesignationComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DatagridCellDesignationComponent>;

export const Default: Story = {
  args: {
    id: 'ID-123',
    name: 'Sample Designation',
    editMode: false,
    control: undefined,
  },
};

export const EditMode: Story = {
  args: {
    id: 'ID-123',
    name: 'Sample Designation',
    editMode: true,
    control: new FormControl('Edited Designation'),
  },
};
