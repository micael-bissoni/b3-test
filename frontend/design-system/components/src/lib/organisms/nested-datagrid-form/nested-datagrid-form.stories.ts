import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NestedDatagridFormComponent } from './nested-datagrid-form.component';

const meta: Meta<NestedDatagridFormComponent> = {
  title: 'Organisms/NestedDatagridForm',
  component: NestedDatagridFormComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
    }),
  ],
  argTypes: {
    columns: { control: 'object' },
    nestedConfig: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<NestedDatagridFormComponent>;

export const Default: Story = {
  args: {
    columns: [
      { id: 'name', label: 'Nome', key: 'name' },
      { id: 'role', label: 'Cargo', key: 'role' }
    ],
    nestedConfig: {
      dataKey: 'subtasks',
      columns: [
        { id: 'task', label: 'Tarefa', key: 'task' },
        { id: 'due', label: 'Prazo', key: 'due' }
      ]
    }
  },
};
