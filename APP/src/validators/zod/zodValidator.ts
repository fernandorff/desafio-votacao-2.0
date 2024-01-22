import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ZodError} from 'zod';

export function zodValidator(schema: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    try {
      schema.parse(control.value);
      return null;
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages: string[] = error.errors.map((err) => err.message);
        return {zodError: errorMessages};
      }
      return null;
    }
  };
}
