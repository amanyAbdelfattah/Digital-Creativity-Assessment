import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const PasswordMatchingValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const password_confirmation = control.get('password_confirmation');

  return password?.value === password_confirmation?.value ? null : { notMatched: true };
};
