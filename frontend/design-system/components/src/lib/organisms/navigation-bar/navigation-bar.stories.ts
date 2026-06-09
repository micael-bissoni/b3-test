import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NavigationBarComponent } from './navigation-bar.component';
import { NavigationBarItemComponent } from '../../molecules/navigation-bar-item/navigation-bar-item.component';
import { TranslatePipe } from '@ngx-translate/core';
import { userEvent, within } from '@storybook/testing-library';
import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'ds-blank-cmp',
  standalone: true,
  template: `<div>Blank</div>`,
})
class BlankCmp { }

@Component({
  selector: 'ds-simple-cmp',
  standalone: true,
  template: `<div>Simple</div>`,
})
class SimpleCmp { }

const meta: Meta<NavigationBarComponent> = {
  title: 'Organisms/NavigationBar',
  component: NavigationBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'regions', component: SimpleCmp },
          { path: 'entities', component: SimpleCmp },
          { path: 'users', component: SimpleCmp },
          { path: '', redirectTo: 'regions', pathMatch: 'full' }
        ]),
        NavigationBarItemComponent, TranslatePipe],
    }),
  ],
  argTypes: {
    selectedCount: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<NavigationBarComponent>;

export const Default: Story = {
  args: {
    selectedCount: 0,
    navigationItems: [
      { id: '1', label: 'common.navigation.dashboard', icon: 'management', route: '/customerService' },
      { id: '2', label: 'common.navigation.hierarchy', icon: 'corporate-fare', route: '/customerService/hierarchy' },
      { id: '3', label: 'common.navigation.profiles', icon: 'management', route: '/customerService/profiles' },
      { id: '4', label: 'common.navigation.team', icon: 'management', route: '/customerService/team' },
      { id: '5', label: 'common.navigation.compliance', icon: 'check-circle', route: '/customerService/compliance' }
    ],
    appName: 'TREVVO',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId('navbar-add-button');
    await userEvent.click(button);
  }
};

export const WithActiveRoute: Story = {
  decorators: [
    moduleMetadata({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'regions', component: SimpleCmp },
          { path: 'entities', component: SimpleCmp },
          { path: 'users', component: SimpleCmp },
          { path: '', redirectTo: 'regions', pathMatch: 'full' }
        ]),
      ],
    }),
  ],
  args: {
    selectedCount: 3,
    navigationItems: [
      { id: '1', label: 'templates.mainTemplate.regions', icon: 'location-on', route: '/regions' },
      { id: '2', label: 'templates.mainTemplate.entities', icon: 'corporate-fare', route: '/entities' },
      { id: '3', label: 'templates.mainTemplate.users', icon: 'management', route: '/users' },
    ],
    appName: 'TREVVO',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByTestId('navigation-bar-item');
    if (items.length > 0) {
      const button = items[0].querySelector('button');
      if (button) {
        await userEvent.click(button);
      }
    }
  }
};

export const CustomerService: Story = {
  args: {
    selectedCount: 0,
    navigationItems: [
      { id: '1', label: 'common.navigation.dashboard', icon: 'management', route: '/customerService' },
      { id: '2', label: 'common.navigation.hierarchy', icon: 'corporate-fare', route: '/customerService/hierarchy' },
      { id: '3', label: 'common.navigation.profiles', icon: 'management', route: '/customerService/profiles' },
      { id: '4', label: 'common.navigation.team', icon: 'management', route: '/customerService/team' },
      { id: '5', label: 'common.navigation.compliance', icon: 'check-circle', route: '/customerService/compliance' }
    ],
    appName: 'TREVVO',
  }
};

