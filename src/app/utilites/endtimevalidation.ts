import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function endDateNotBeforeStartDateValidator(startControlName: string, endControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): { [key: string]: any } | null => {
    const startControl = formGroup.get(startControlName);
    const endControl = formGroup.get(endControlName);
    if (startControl != null && endControl != null) {
      const startDate = new Date(startControl.value);
      const endDate = new Date(endControl.value);
      if (endDate < startDate) {
        return { endDateNotBeforeStartDate: true };
      }
    }
    return null;
  };
}
