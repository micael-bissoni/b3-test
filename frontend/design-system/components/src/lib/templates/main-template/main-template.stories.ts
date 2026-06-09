import { type Meta, type StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MainTemplateComponent } from './main-template.component';
import { TranslatePipe } from '@ngx-translate/core';
import { DataGridComponent } from '../../organisms';
import * as DataGridStories from '../../organisms/data-grid/data-grid.stories';

const meta: Meta<MainTemplateComponent> = {
  title: 'Templates/MainTemplate',
  component: MainTemplateComponent,
  tags: ['autodocs'],
  argTypes: {
    appName: { control: 'text' },
    title: { control: 'text' },
    navigationItems: { control: 'object' },
    selectedCount: { control: 'number' },
    user: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<MainTemplateComponent>;

/**
 * Story demonstrating the full template capability using modern inputs.
 * These inputs support internationalization through the TranslatePipe.
 */
export const Empty: Story = {
  args: {
    appName: 'TREVVO',
    title: 'Dashboard Overview',
    user: {
      firstName: 'Micael',
      lastName: 'Bissoni',
      avatarSrc: '',
    },
    navigationItems: [
      { id: '1', label: 'templates.mainTemplate.regions', icon: 'location-on', route: '/regions' },
      { id: '2', label: 'templates.mainTemplate.entities', icon: 'corporate-fare', route: '/entities' },
      { id: '3', label: 'templates.mainTemplate.users', icon: 'management', route: '/users' },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <ds-main-template 
        [appName]="appName" 
        [title]="title" 
        [user]="user" 
        [navigationItems]="navigationItems"
      >
      <div class="flex justify-center items-center w-full h-full text-secondary">{{ 'common.empty' | translate }}</div>
      </ds-main-template>
    `,
  }),
};

export const Datagrid: Story = {
  decorators: [
    moduleMetadata({
      imports: [DataGridComponent],
    })
  ],
  args: {
    appName: 'TREVVO',
    title: 'Dashboard Overview',
    user: {
      firstName: 'Micael',
      lastName: 'Bissoni',
      avatarSrc: '',
    },
    navigationItems: [
      { id: '1', label: 'templates.mainTemplate.regions', icon: 'location-on', route: '/regions' },
      { id: '2', label: 'templates.mainTemplate.entities', icon: 'corporate-fare', route: '/entities' },
      { id: '3', label: 'templates.mainTemplate.users', icon: 'management', route: '/users' },
    ],
  },
  render: (args) => ({
    props: {
      ...args,
      dataGridTitle: DataGridStories.Default.args?.title,
      dataGridActionLabel: DataGridStories.Default.args?.actionLabel,
      dataGridSubtitle: DataGridStories.Default.args?.subtitle,
      dataGridColumns: DataGridStories.Default.args?.columns,
      dataGridData: DataGridStories.Default.args?.data,
      dataGridPageSize: DataGridStories.Default.args?.pageSize,
    },
    template: `
      <ds-main-template 
        [appName]="appName" 
        [title]="title" 
        [user]="user" 
        [navigationItems]="navigationItems"
      >
        <ds-data-grid 
          [title]="dataGridTitle" 
          [subtitle]="dataGridSubtitle" 
          [actionLabel]="dataGridActionLabel"
          [data]="dataGridData"
          [columns]="dataGridColumns"
          [pageSize]="dataGridPageSize"
        ></ds-data-grid>
      </ds-main-template>
    `,
  }),
};