import type { Meta, StoryObj } from '@storybook/angular';
import { ToastComponent } from './toast.component';

const meta: Meta<ToastComponent> = {
  title: 'Molecules/Toast',
  component: ToastComponent,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<ToastComponent>;

export const Success: Story = {
  args: {
    type: 'success',
    title: 'Success!',
    message: 'Your changes have been saved successfully.',
    duration: 0,
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    title: 'Error Occurred',
    message: 'Something went wrong while processing your request.',
    duration: 0,
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Attention Needed',
    message: 'Your subscription is about to expire.',
    duration: 0,
  },
};

export const Info: Story = {
  args: {
    type: 'info',
    title: 'Did you know?',
    message: 'You can now customize your dashboard layout.',
    duration: 0,
  },
};

export const NoTitle: Story = {
  args: {
    type: 'info',
    message: 'Simple message without a title.',
    duration: 0,
  },
};
