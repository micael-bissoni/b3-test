import type { Meta, StoryObj } from '@storybook/angular';
import { DataGridRowComponent } from './data-grid-row.component';
import { type DataGridColumn } from '../../organisms/data-grid/data-grid.types';
import {
  DatagridCellDesignationComponent,
  DatagridCellLocationComponent,
  DatagridCellStatusComponent,
  DatagridCellValidateComponent
} from '../../atoms';

const mockColumns: DataGridColumn[] = [
  {
    id: 'designacao',
    label: 'Designação',
    key: 'id',
    width: '1fr',
    cellComponent: DatagridCellDesignationComponent,
    cellConfig: (record) => ({ id: record.id, name: record.nome })
  },
  {
    id: 'location',
    label: 'location',
    key: 'pais',
    width: '150px',
    cellComponent: DatagridCellLocationComponent,
    cellConfig: (record) => ({ pais: record.pais })
  },
  {
    id: 'validate',
    label: 'Validate',
    width: '180px',
    align: 'center',
    cellComponent: DatagridCellValidateComponent,
    cellConfig: (record) => ({ dataInicio: record.dataInicio, dataFim: record.dataFim })
  },
  {
    id: 'estado',
    label: 'Estado',
    key: 'estado',
    width: '120px',
    align: 'center',
    cellComponent: DatagridCellStatusComponent,
    cellConfig: (record) => ({ status: record.estado })
  }
];

const meta: Meta<DataGridRowComponent> = {
  title: 'Organisms/DataGrid/Molecules/DataGridRow',
  component: DataGridRowComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<DataGridRowComponent>;

export const Default: Story = {
  args: {
    record: {
      id: 'REG-001',
      nome: 'Distribuição Lisboa Norte',
      pais: 'Portugal',
      dataInicio: '01 Jan 2024',
      dataFim: '31 Dez 2024',
      estado: 'Ativo'
    },
    columns: mockColumns,
    gridTemplateColumns: 'minmax(250px, 1fr) 150px 180px 120px'
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-40 bg-white p-4">
        <ds-data-grid-row [record]="record" [columns]="columns" [gridTemplateColumns]="gridTemplateColumns"></ds-data-grid-row>
      </div>
    `,
  }),
};

export const Pending: Story = {
  args: {
    record: {
      id: 'REG-002',
      nome: 'Logística Madrid Central',
      pais: 'Espanha',
      dataInicio: '15 Fev 2024',
      dataFim: '15 Fev 2025',
      estado: 'Pendente'
    },
    columns: mockColumns,
    gridTemplateColumns: 'minmax(250px, 1fr) 150px 180px 120px'
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-40 bg-white p-4">
        <ds-data-grid-row [record]="record" [columns]="columns" [gridTemplateColumns]="gridTemplateColumns"></ds-data-grid-row>
      </div>
    `,
  }),
};

export const Cancelled: Story = {
  args: {
    record: {
      id: 'REG-003',
      nome: 'Operação Paris Quest',
      pais: 'França',
      dataInicio: '10 Mar 2024',
      dataFim: '10 Mar 2025',
      estado: 'Cancelado'
    },
    columns: mockColumns,
    gridTemplateColumns: 'minmax(250px, 1fr) 150px 180px 120px'
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-40 bg-white p-4">
        <ds-data-grid-row [record]="record" [columns]="columns" [gridTemplateColumns]="gridTemplateColumns"></ds-data-grid-row>
      </div>
    `,
  }),
};
