import type { Meta, StoryObj } from '@storybook/angular';
import { DataGridFilterComponent } from './data-grid-filter.component';
import { moduleMetadata } from '@storybook/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { CheckboxGroupComponent, RadioGroupComponent } from '../index';

const meta: Meta<DataGridFilterComponent> = {
  title: 'Organisms/DataGrid/Molecules/DataGridFilter',
  component: DataGridFilterComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [OverlayModule, A11yModule],
    }),
  ],
  argTypes: {
    configs: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<DataGridFilterComponent>;

export const Default: Story = {
  args: {
    configs: [
      { id: 'regions', label: 'Regiões Ativas', component: CheckboxGroupComponent, options: ['Lisboa', 'Porto', 'Madrid'] },
      { id: 'status', label: 'Estado', component: RadioGroupComponent, options: ['Todos', 'Ativa', 'Pendente'] }
    ],
  },
};

export const CustomSections: Story = {
  args: {
    configs: [
      { id: 'priority', label: 'Prioridade', component: RadioGroupComponent, options: ['Alta', 'Média', 'Baixa'] },
      { id: 'categories', label: 'Categorias', component: CheckboxGroupComponent, options: ['UX', 'Dev', 'Product'] }
    ],
  },
};
