

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { DataGridComponent } from './data-grid.component';
import { type DataGridRecord, type DataGridColumn } from './data-grid.types';
import { DatagridCellDesignationComponent, DatagridCellStatusComponent } from '../../atoms';
import { DatagridCellLocationComponent } from '../../atoms/datagrid-cell-location/datagrid-cell-location.component';
import { DatagridCellValidateComponent } from '../../atoms/datagrid-cell-validate/datagrid-cell-validate.component';
import { NestedDatagridFormComponent } from '../nested-datagrid-form/nested-datagrid-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const mockData: DataGridRecord[] = [
  { id: 'REG-001', nome: 'Distribuição Lisboa Norte', pais: 'Portugal', dataInicio: '01 Jan 2024', dataFim: '31 Dez 2024', estado: 'Ativo' },
  { id: 'REG-002', nome: 'Logística Madrid Central', pais: 'Espanha', dataInicio: '15 Fev 2024', dataFim: '15 Fev 2025', estado: 'Pendente' },
  { id: 'REG-003', nome: 'Operação Paris Quest', pais: 'França', dataInicio: '10 Mar 2024', dataFim: '10 Mar 2025', estado: 'Cancelado' },
  { id: 'REG-004', nome: 'Gestão Porto Douro', pais: 'Portugal', dataInicio: '01 Abr 2024', dataFim: '01 Abr 2025', estado: 'Ativo' },
  { id: 'REG-005', nome: 'Hub Barcelona Porto', pais: 'Espanha', dataInicio: '20 Mai 2024', dataFim: '20 Mai 2025', estado: 'Ativo' },
  { id: 'REG-006', nome: 'Distrito Berlim Este', pais: 'Alemanha', dataInicio: '05 Jun 2024', dataFim: '05 Jun 2025', estado: 'Pendente' },
  { id: 'REG-007', nome: 'Operação Londres City', pais: 'Reino Unido', dataInicio: '12 Jul 2024', dataFim: '12 Jul 2025', estado: 'Ativo' },
  { id: 'REG-008', nome: 'Logística Milão Norte', pais: 'Itália', dataInicio: '30 Ago 2024', dataFim: '30 Ago 2025', estado: 'Ativo' },
  { id: 'REG-009', nome: 'Hub Amsterdão Porto', pais: 'Holanda', dataInicio: '15 Set 2024', dataFim: '15 Set 2025', estado: 'Cancelado' },
  { id: 'REG-010', nome: 'Gestão Roma Sul', pais: 'Itália', dataInicio: '01 Out 2024', dataFim: '01 Out 2025', estado: 'Ativo' },
  { id: 'REG-011', nome: 'Distribuição Lisboa Sul', pais: 'Portugal', dataInicio: '10 Nov 2024', dataFim: '10 Nov 2025', estado: 'Ativo' },
];

const mockColumns: DataGridColumn[] = [
  {
    id: 'designacao',
    label: 'Designação',
    key: 'id',
    width: '1fr',
    cellComponent: DatagridCellDesignationComponent,
    cellConfig: (record) => ({ id: record["id"], name: record["nome"] })
  },
  {
    id: 'location',
    label: 'location',
    key: 'pais',
    width: '150px',
    cellComponent: DatagridCellLocationComponent,
    cellConfig: (record) => ({ pais: record["pais"] })
  },
  {
    id: 'validate',
    label: 'Validate',
    width: '180px',
    align: 'center',
    cellComponent: DatagridCellValidateComponent,
    cellConfig: (record) => ({ dataInicio: record["dataInicio"], dataFim: record["dataFim"] })
  },
  {
    id: 'estado',
    label: 'Estado',
    key: 'estado',
    width: '120px',
    align: 'center',
    cellComponent: DatagridCellStatusComponent,
    cellConfig: (record) => ({ status: record["estado"] })
  }
];

const meta: Meta<DataGridComponent> = {
  title: 'Organisms/DataGrid',
  component: DataGridComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [OverlayModule, A11yModule, NestedDatagridFormComponent, ReactiveFormsModule, TranslateModule],
    }),
  ],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    actionLabel: { control: 'text' },
    pageSize: { control: 'number' },
    filtersChange: { action: 'filtersChange' },
    searchChange: { action: 'searchChange' },
    actionClicked: { action: 'actionClicked' },
    addRow: { action: 'addRow' },
    removeRow: { action: 'removeRow' },
    nestedAddRow: { action: 'nestedAddRow' },
    nestedRemoveRow: { action: 'nestedRemoveRow' },
  },
};

export default meta;
type Story = StoryObj<DataGridComponent>;

export const Default: Story = {
  args: {
    title: 'organisms.dataGrid.title',
    subtitle: 'organisms.dataGrid.subtitle',
    actionLabel: 'common.export',
    searchPlaceholder: 'organisms.dataGrid.searchPlaceholder',
    data: mockData,
    columns: mockColumns,
    pageSize: 5,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-[90vh] w-full bg-slate-50 p-4 lg:p-10">
        <ds-data-grid 
          [title]="title" 
          [subtitle]="subtitle" 
          [actionLabel]="actionLabel"
          [searchPlaceholder]="searchPlaceholder"
          [data]="data"
          [columns]="columns"
          [pageSize]="pageSize"
          (actionClicked)="actionClicked($event)"
          (searchChange)="searchChange($event)"
          (filtersChange)="filtersChange($event)"
          (addRow)="addRow($event)"
          (removeRow)="removeRow($event)"
          (nestedAddRow)="nestedAddRow($event)"
          (nestedRemoveRow)="nestedRemoveRow($event)"
        ></ds-data-grid>
      </div>
    `,
  }),
};

export const Empty: Story = {
  args: {
    title: 'Sem Dados',
    subtitle: 'Nenhum registo encontrado no sistema',
    data: [],
    columns: mockColumns,
  },
};

export const Expandable: Story = {
  args: {
    title: 'Projetos Detalhados',
    subtitle: 'Exemplo de expansão com tabelas aninhadas',
    data: [
      {
        id: 'PRJ-1', client: 'Alpha Corp', status: 'Ativo',
        tasks: [{ desc: 'UI Design', hours: '40h' }, { desc: 'Frontend Dev', hours: '120h' }]
      },
      {
        id: 'PRJ-2', client: 'Beta Systems', status: 'Pendente',
        tasks: [{ desc: 'Backend Dev', hours: '60h' }]
      }
    ],
    columns: [
      { id: 'id', label: 'ID', key: 'id', width: '100px' },
      { id: 'client', label: 'Cliente', key: 'client', width: '1fr' },
      { id: 'status', label: 'Status', key: 'status', width: '120px' }
    ],
    nestedConfig: {
      dataKey: 'tasks',
      columns: [
        { id: 'desc', label: 'Tarefa', key: 'desc' },
        { id: 'hours', label: 'Esforço', key: 'hours' }
      ]
    },
    pageSize: 5,
  },
};
export const MultiLevel: Story = {
  args: {
    title: 'Hierarquia de Organizações',
    subtitle: 'Navegação por múltiplos níveis de dados (Organizações > Grupos > Subgrupos > Entidades > Utilizadores)',
    data: [
      {
        id: 'ORG-1',
        nome: 'Trevvo Global',
        groups: [
          {
            id: 'GRP-1',
            nome: 'Operações Europa',
            subgroups: [
              {
                id: 'SUB-1',
                nome: 'Portugal & Espanha',
                entities: [
                  {
                    id: 'ENT-1',
                    nome: 'Logística Lisboa',
                    users: [
                      { id: 'USR-1', nome: 'Ana Silva', role: 'Admin' },
                      { id: 'USR-2', nome: 'Pedro Santos', role: 'Operador' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    columns: [
      { id: 'id', label: 'ID', key: 'id', width: '100px' },
      { id: 'nome', label: 'Organização', key: 'nome', width: '1fr' }
    ],
    nestedConfig: {
      dataKey: 'groups',
      columns: [
        { id: 'id', label: 'ID', key: 'id' },
        { id: 'nome', label: 'Grupo de Entidades', key: 'nome' }
      ],
      nestedConfig: {
        dataKey: 'subgroups',
        columns: [
          { id: 'id', label: 'ID', key: 'id' },
          { id: 'nome', label: 'Subgrupo', key: 'nome' }
        ],
        nestedConfig: {
          dataKey: 'entities',
          columns: [
            { id: 'id', label: 'ID', key: 'id' },
            { id: 'nome', label: 'Entidade', key: 'nome' }
          ],
          nestedConfig: {
            dataKey: 'users',
            columns: [
              { id: 'id', label: 'ID', key: 'id' },
              { id: 'nome', label: 'Utilizador', key: 'nome' },
              { id: 'role', label: 'Cargo', key: 'role' }
            ]
          }
        }
      }
    },
    pageSize: 5
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="h-[90vh] w-full bg-slate-50 p-4 lg:p-10">
        <ds-data-grid 
          [title]="title" 
          [subtitle]="subtitle" 
          [data]="data"
          [columns]="columns"
          [nestedConfig]="nestedConfig"
          [pageSize]="pageSize"
          (actionClicked)="actionClicked($event)"
          (searchChange)="searchChange($event)"
          (filtersChange)="filtersChange($event)"
          (addRow)="addRow($event)"
          (removeRow)="removeRow($event)"
          (nestedAddRow)="nestedAddRow($event)"
          (nestedRemoveRow)="nestedRemoveRow($event)"
        ></ds-data-grid>
      </div>
    `,
  }),
};

export const WithForm: Story = {
  args: {
    ...Expandable.args,
    title: 'DataGrid com Formulário Hierárquico',
    subtitle: 'Clique no ícone de adicionar na linha para abrir o editor do formulário.'
  },
  render: (args) => ({
    props: {
      ...args,
      onNestedAdd: (event: { parentRow: DataGridRecord }) => {
        console.log('Parent Row selected:', event.parentRow);
        alert(`Abrindo formulário para adicionar item em: ${event.parentRow['client'] || event.parentRow['desc'] || event.parentRow['id']}`);
      }
    },
    template: `
      <div class="h-[90vh] w-full bg-slate-50 p-4 lg:p-10 space-y-8">
        <ds-data-grid 
          [title]="title" 
          [subtitle]="subtitle" 
          [data]="data" 
          [columns]="columns"
          [nestedConfig]="nestedConfig"
          (nestedAddRow)="onNestedAdd($event)"
        ></ds-data-grid>

        <div class="p-8 bg-white rounded-[32px] border border-gray-light shadow-sm">
          <h4 class="text-xs font-black uppercase tracking-widest text-gray-medium mb-6">Preview do Form Component Isolado</h4>
          <ds-nested-datagrid-form 
            [columns]="nestedConfig.columns"
            [nestedConfig]="nestedConfig.nestedConfig"
          ></ds-nested-datagrid-form>
        </div>
      </div>
    `,
  }),
};
