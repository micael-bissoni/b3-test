import type { Meta, StoryObj } from '@storybook/angular';
import { SearchBarComponent } from './search-bar.component';

const meta: Meta<SearchBarComponent> = {
  title: 'Molecules/SearchBar',
  component: SearchBarComponent,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<SearchBarComponent>;

export const Default: Story = {
  args: {
    placeholder: 'Pesquisa inteligente...',
    value: '',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Pesquisar...',
    value: 'Lisboa',
  },
};
