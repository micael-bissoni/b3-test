import type { Meta, StoryObj } from '@storybook/angular';
import { StatCardComponent } from './stat-card.component';

const meta: Meta<StatCardComponent> = {
  title: 'Molecules/StatCard',
  component: StatCardComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    icon: { control: 'text' },
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'flat', 'outline'],
    },
    trendDirection: {
      control: 'select',
      options: ['up', 'down', 'neutral'],
    },
  },
};

export default meta;
type Story = StoryObj<StatCardComponent>;

export const Default: Story = {
  args: {
    label: 'Total Revenue',
    value: '$432,190',
    icon: 'chart-bar',
    trendValue: '+12.5%',
    trendDirection: 'up',
    trendLabel: 'from last month',
  },
};

export const NegativeTrend: Story = {
  args: {
    label: 'Active Users',
    value: '2,400',
    icon: 'user-group',
    trendValue: '-4.2%',
    trendDirection: 'down',
    trendLabel: 'from last week',
    iconColorClass: 'text-warning',
    iconBgClass: 'bg-warning/10',
  },
};

export const Simple: Story = {
  args: {
    label: 'Bounce Rate',
    value: '24.8%',
    variant: 'flat',
  },
};
