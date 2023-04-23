import { Directive, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export const MDB_TAB_TITLE = new InjectionToken('MdbTabTitleDirective');
export class MdbTabTitleDirective {
    constructor(template) {
        this.template = template;
    }
}
MdbTabTitleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbTabTitleDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbTabTitleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbTabTitleDirective, selector: "[mdbTabTitle]", providers: [{ provide: MDB_TAB_TITLE, useExisting: MdbTabTitleDirective }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbTabTitleDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTabTitle]',
                    providers: [{ provide: MDB_TAB_TITLE, useExisting: MdbTabTitleDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLXRpdGxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC90YWJzL3RhYi10aXRsZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQWUsTUFBTSxlQUFlLENBQUM7O0FBRXZFLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBdUIsc0JBQXNCLENBQUMsQ0FBQztBQU85RixNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQW1CLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQzs7aUhBRHRDLG9CQUFvQjtxR0FBcEIsb0JBQW9CLHdDQUZwQixDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQzsyRkFFL0Qsb0JBQW9CO2tCQUxoQyxTQUFTO21CQUFDO29CQUNULDhEQUE4RDtvQkFDOUQsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLHNCQUFzQixFQUFFLENBQUM7aUJBQzNFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3Rpb25Ub2tlbiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IE1EQl9UQUJfVElUTEUgPSBuZXcgSW5qZWN0aW9uVG9rZW48TWRiVGFiVGl0bGVEaXJlY3RpdmU+KCdNZGJUYWJUaXRsZURpcmVjdGl2ZScpO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiVGFiVGl0bGVdJyxcbiAgcHJvdmlkZXJzOiBbeyBwcm92aWRlOiBNREJfVEFCX1RJVExFLCB1c2VFeGlzdGluZzogTWRiVGFiVGl0bGVEaXJlY3RpdmUgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRhYlRpdGxlRGlyZWN0aXZlIHtcbiAgY29uc3RydWN0b3IocHVibGljIHRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+KSB7fVxufVxuIl19