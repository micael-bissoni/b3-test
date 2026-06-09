import { render, screen, fireEvent } from '@testing-library/angular';
import { CreateAccountFormComponent } from './create-account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { describe, it, expect, vi } from 'vitest';

describe('CreateAccountFormComponent', () => {
  const renderForm = async () => {
    return await render(CreateAccountFormComponent, {
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
    });
  };

  it('should render all input fields', async () => {
    await renderForm();
    expect(screen.getByLabelText(/organisms.createAccount.name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/organisms.createAccount.email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/organisms.createAccount.password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/organisms.createAccount.confirmPassword/i)).toBeInTheDocument();
  });

  it('should show error when passwords do not match', async () => {
    await renderForm();
    
    const passwordInput = screen.getByLabelText(/organisms.createAccount.password/i) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(/organisms.createAccount.confirmPassword/i) as HTMLInputElement;

    fireEvent.input(passwordInput, { target: { value: 'password123' } });
    fireEvent.input(confirmPasswordInput, { target: { value: 'password456' } });
    fireEvent.blur(confirmPasswordInput);

    expect(screen.getByText(/organisms.createAccount.errors.passwordsDontMatch/i)).toBeInTheDocument();
  });

  it('should emit onCreateAccount when form is valid and submitted', async () => {
    const onCreateAccountSpy = vi.fn();
    const result = await render(CreateAccountFormComponent, {
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      on: {
        onCreateAccount: onCreateAccountSpy
      }
    });

    fireEvent.input(screen.getByLabelText(/organisms.createAccount.name/i), { target: { value: 'John Doe' } });
    fireEvent.input(screen.getByLabelText(/organisms.createAccount.email/i), { target: { value: 'john@example.com' } });
    fireEvent.input(screen.getByLabelText(/organisms.createAccount.password/i), { target: { value: 'password123' } });
    fireEvent.input(screen.getByLabelText(/organisms.createAccount.confirmPassword/i), { target: { value: 'password123' } });

    const submitBtn = screen.getByRole('button');
    fireEvent.click(submitBtn);

    expect(onCreateAccountSpy).toHaveBeenCalled();
  });

  it('should disable button when isSubmitting is true', async () => {
    await render(CreateAccountFormComponent, {
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
      componentInputs: {
        isSubmitting: true
      }
    });

    const submitBtn = screen.getByRole('button');
    expect(submitBtn).toBeDisabled();
    expect(screen.getByText(/organisms.createAccount.loadingBtn/i)).toBeInTheDocument();
  });
});
