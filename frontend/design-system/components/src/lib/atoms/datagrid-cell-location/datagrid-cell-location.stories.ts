import { Meta, StoryObj } from '@storybook/angular';
import { DatagridCellLocationComponent } from './datagrid-cell-location.component';
import { FormControl } from '@angular/forms';

const meta: Meta<DatagridCellLocationComponent> = {
  title: 'Organisms/DataGrid/Molecules/DataGridRow/Atoms/DatagridCelllocation',
  component: DatagridCellLocationComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DatagridCellLocationComponent>;

export const Default: Story = {
  args: {
    pais: 'Brazil',
    editMode: false,
    control: undefined,
  },
};

export const EditMode: Story = {
  args: {
    pais: 'Brazil',
    editMode: true,
    control: new FormControl('USA'),
  },
};
