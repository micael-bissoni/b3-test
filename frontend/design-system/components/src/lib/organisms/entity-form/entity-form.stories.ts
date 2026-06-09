import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EntityFormComponent } from './entity-form.component';
import { type SelectOption } from '../../atoms/select/select.component';
import { Component, ContentChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ds-entity-form-wrapper',
  standalone: true,
  imports: [EntityFormComponent, CommonModule],
  template: `
    <ng-content></ng-content>
  `
})
class EntityFormWrapperComponent implements AfterViewInit {
  @ContentChild(EntityFormComponent) entityFormRef?: EntityFormComponent;
  @Input() entityTypeOptions: SelectOption[] = [];
  @Input() parentOptions: SelectOption[] = [];
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  ngAfterViewInit() {
    setTimeout(() => {
      this.entityFormRef?.entityForm.get('parentId')?.disable();
    });
  }
}

const entityTypeOptions: SelectOption[] = [
  { label: 'organisms.entityForm.types.lab', value: 'Laboratório' },
  { label: 'organisms.entityForm.types.ware', value: 'Armazenista' },
  { label: 'organisms.entityForm.types.pharm', value: 'Farmácia' }
];

const parentOptions: SelectOption[] = [
  { label: 'Grupo Lusíadas', value: '1' },
  { label: 'CUF', value: '2' },
  { label: 'Luz Saúde', value: '3' }
];

const meta: Meta<EntityFormComponent> = {
  title: 'Organisms/EntityForm',
  component: EntityFormComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
      ],
    }),
    moduleMetadata({
      imports: [CommonModule, ReactiveFormsModule, FormsModule, TranslateModule],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSave: { action: 'onSave' },
    onCancel: { action: 'onCancel' },
  },
  args: {
    entityTypeOptions,
    parentOptions
  }
};

export default meta;
type Story = StoryObj<EntityFormComponent>;

export const Default: Story = {
  render: (args) => ({
    props: args,
  }),
};

export const Prefilled: Story = {
  render: (args) => ({
    props: args,
    template: `
      <ds-entity-form 
        [entityTypeOptions]="entityTypeOptions"
        [parentOptions]="parentOptions"
        [ngModel]="entityData" 
        (onSave)="onSave($event)" 
        (onCancel)="onCancel()">
      </ds-entity-form>
    `,
  }),
  args: {
    // @ts-ignore - ngModel is handled by CVA
    entityData: {
      eik: 'LAB-772',
      type: 'Laboratório',
      name: 'Laboratório Central de Análises',
      parentId: '2',
      vat: '253634020',
      isActive: true,
      logo: 'https://placehold.co/400x400?text=LAB'
    }
  }
};

export const EntityMaster: Story = {
  decorators: [
    moduleMetadata({
      imports: [EntityFormWrapperComponent],
    }),
  ],
  render: (args) => ({
    props: args,
    template: `
      <ds-entity-form-wrapper>
        <ds-entity-form 
          [parentOptions]="parentOptions"
          [entityTypeOptions]="entityTypeOptions"
          [ngModel]="entityData" 
          (onSave)="onSave($event)" 
          (onCancel)="onCancel()">
        </ds-entity-form>
      </ds-entity-form-wrapper>
    `,
  }),
  args: {
    // @ts-ignore - ngModel is handled by CVA
    entityData: {
      eik: 'LAB-772',
      type: 'Laboratório',
      name: 'Laboratório Central de Análises',
      vat: '253634020',
      isActive: true,
      logo: 'https://placehold.co/400x400?text=LAB'
    }
  }
};
