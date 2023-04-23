import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators{

     static MatchValidator(control: AbstractControl):void {
        const password: string = control.get("password")?.value; 
        const confirmPassword: string = control.get("confirmPassword")?.value;
        if (password !== confirmPassword) 
            control.get("confirmPassword")?.setErrors({ mismatch: true });
     }
}