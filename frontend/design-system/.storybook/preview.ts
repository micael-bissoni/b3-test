import { type Preview } from '@storybook/angular';
import { brands } from '@trevvo/design-system/tokens';

import '@angular/common/locales/global/en';
import '@angular/common/locales/global/pt';
import '@angular/common/locales/global/es';
import { decorators } from './decorator';

const brandItems = Object.keys(brands).map(key => ({
    value: key,
    title: key.charAt(0).toUpperCase() + key.slice(1),
}));

const preview: Preview = {
    tags: ['autodocs'],
    globalTypes: {
        theme: {
            description: 'Global color mode',
            defaultValue: 'light',
            toolbar: {
                title: 'Mode',
                icon: 'circlehollow',
                items: [
                    { value: 'light', icon: 'circlehollow', title: 'Light Mode' },
                    { value: 'dark', icon: 'circle', title: 'Dark Mode' },
                ],
                dynamicTitle: true,
            },
        },
        brand: {
            description: 'Global brand theme',
            defaultValue: 'base',
            toolbar: {
                title: 'Brand',
                icon: 'paintbrush',
                items: brandItems,
                dynamicTitle: true,
            },
        },
        locale: {
            description: 'Internationalization locale',
            defaultValue: 'en-GB',
            toolbar: {
                title: 'Language',
                icon: 'globe',
                items: [
                    { value: 'en-GB', right: '🇬🇧', title: 'English' },
                    { value: 'pt-BR', right: '🇵🇹', title: 'Português' },
                    { value: 'es-ES', right: '🇪🇸', title: 'Español' },
                ],
                dynamicTitle: true,
            },
        },
        currency: {
            description: 'Currency for price displays',
            defaultValue: 'BRL',
            toolbar: {
                title: 'Currency',
                icon: 'credit',
                items: [
                    { value: 'GBP', right: '£', title: 'GBP' },
                    { value: 'BRL', right: 'R$', title: 'BRL' },
                ],
                dynamicTitle: true,
            },
        },
    },
    parameters: {
        docs: {
            toc: true, // Enable Table of Contents
            source: {
                type: 'dynamic', // Show dynamic source code
            },
        },
        options: {
            storySort: {
                order: ['Design System', 'Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages', ['Introduction', 'Foundations', '*'], '*'],
            },
        },
    },
    decorators
};


export default preview;
