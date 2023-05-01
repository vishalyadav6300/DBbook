import { AbstractControl, ValidatorFn } from '@angular/forms';

export function previousValueValidator(previousValue: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const selectedValue = control.value;
    return selectedValue === previousValue ? {'previousValueSelected': {value: selectedValue}} : null;
  };
}