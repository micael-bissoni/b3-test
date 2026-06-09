import type { Meta, StoryObj } from '@storybook/angular';
import { ChartComponent } from './chart.component';

const meta: Meta<ChartComponent> = {
  title: 'Atoms/Chart',
  component: ChartComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['bar', 'line', 'pie', 'doughnut', 'radar', 'polarArea'],
    },
  },
};

export default meta;
type Story = StoryObj<ChartComponent>;

export const Bar: Story = {
  args: {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
  },
};

export const Line: Story = {
  args: {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [65, 59, 80, 81, 56, 55],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
  },
};

export const Pie: Story = {
  args: {
    type: 'pie',
    data: {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          label: 'Votes',
          data: [12, 19, 3],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
        },
      ],
    },
  },
};

export const Radar: Story = {
  args: {
    type: 'radar',
    data: {
      labels: [
        'Speed',
        'Reliability',
        'Comfort',
        'Safety',
        'Efficiency',
        'Aesthetics',
      ],
      datasets: [
        {
          label: 'Product A',
          data: [85, 90, 75, 95, 80, 70],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
        },
        {
          label: 'Product B',
          data: [65, 75, 90, 80, 95, 85],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
        },
      ],
    },
    options: {
      scales: {
        r: {
          min: 0,
          max: 100,
          beginAtZero: true,
        },
      },
    },
  },
};

export const Mixed: Story = {
  args: {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          type: 'line',
          label: 'Trend',
          data: [15, 25, 20, 35, 30, 45],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
          tension: 0.4,
          order: 1,
        },
        {
          type: 'bar',
          label: 'Monthly Volume',
          data: [10, 20, 30, 40, 35, 50],
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1,
          order: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  },
};
