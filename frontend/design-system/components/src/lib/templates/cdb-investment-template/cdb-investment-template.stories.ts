import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CdbInvestmentTemplateComponent } from './cdb-investment-template.component';
import { CdbFormComponent } from '../../organisms/cdb-form/cdb-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ButtonComponent } from '../../atoms/button/button.component';

const meta: Meta<CdbInvestmentTemplateComponent> = {
  title: 'Templates/CdbTemplate',
  component: CdbInvestmentTemplateComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CdbFormComponent, ReactiveFormsModule, IconComponent, ButtonComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<CdbInvestmentTemplateComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-cdb-investment-template>
        <ds-cdb-form></ds-cdb-form>
      </ds-cdb-investment-template>
    `,
  }),
};
