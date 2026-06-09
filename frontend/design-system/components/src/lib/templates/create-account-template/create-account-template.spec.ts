import { render, screen } from '@testing-library/angular';
import { CreateAccountTemplateComponent } from './create-account-template.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CreateAccountFormComponent } from '../../organisms/create-account-form/create-account-form.component';
import { describe, it, expect } from 'vitest';

describe('CreateAccountTemplateComponent', () => {
  it('should render the template with the create account form', async () => {
    await render(CreateAccountTemplateComponent, {
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), CreateAccountFormComponent],
    });

    expect(screen.getByText(/templates.createAccount.welcome/i)).toBeDefined();
    expect(screen.getByRole('form')).toBeDefined();
  });

  it('should render brand content on desktop', async () => {
    await render(CreateAccountTemplateComponent, {
      imports: [ReactiveFormsModule, TranslateModule.forRoot(), CreateAccountFormComponent],
    });
    
    expect(screen.getByText(/templates.createAccount.brandTitle/i)).toBeDefined();
  });
});
