import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export function dateNotBeforeTodayValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedDate = new Date(control.value);
    const today = new Date();

    if (selectedDate < today) {
      return { dateNotBeforeToday: true };
    }

    return null;
  };
}