//manager.ts
import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Design System',
    // brandImage: "/logo.png",
    brandTarget: '_self',
  }),
});
