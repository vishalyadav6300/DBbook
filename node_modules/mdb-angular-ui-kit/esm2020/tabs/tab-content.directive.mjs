import { Directive, InjectionToken } from '@angular/core';
import * as i0 from "@angular/core";
export const MDB_TAB_CONTENT = new InjectionToken('MdbTabContentDirective');
export class MdbTabContentDirective {
    constructor(template) {
        this.template = template;
    }
}
MdbTabContentDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbTabContentDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbTabContentDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbTabContentDirective, selector: "[mdbTabContent]", providers: [{ provide: MDB_TAB_CONTENT, useExisting: MdbTabContentDirective }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbTabContentDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbTabContent]',
                    providers: [{ provide: MDB_TAB_CONTENT, useExisting: MdbTabContentDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWNvbnRlbnQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3RhYnMvdGFiLWNvbnRlbnQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFlLE1BQU0sZUFBZSxDQUFDOztBQUV2RSxNQUFNLENBQUMsTUFBTSxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQXlCLHdCQUF3QixDQUFDLENBQUM7QUFPcEcsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUFtQixRQUEwQjtRQUExQixhQUFRLEdBQVIsUUFBUSxDQUFrQjtJQUFHLENBQUM7O21IQUR0QyxzQkFBc0I7dUdBQXRCLHNCQUFzQiwwQ0FGdEIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLHNCQUFzQixFQUFFLENBQUM7MkZBRW5FLHNCQUFzQjtrQkFMbEMsU0FBUzttQkFBQztvQkFDVCw4REFBOEQ7b0JBQzlELFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLHdCQUF3QixFQUFFLENBQUM7aUJBQy9FIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbmplY3Rpb25Ub2tlbiwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGNvbnN0IE1EQl9UQUJfQ09OVEVOVCA9IG5ldyBJbmplY3Rpb25Ub2tlbjxNZGJUYWJDb250ZW50RGlyZWN0aXZlPignTWRiVGFiQ29udGVudERpcmVjdGl2ZScpO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiVGFiQ29udGVudF0nLFxuICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IE1EQl9UQUJfQ09OVEVOVCwgdXNlRXhpc3Rpbmc6IE1kYlRhYkNvbnRlbnREaXJlY3RpdmUgfV0sXG59KVxuZXhwb3J0IGNsYXNzIE1kYlRhYkNvbnRlbnREaXJlY3RpdmUge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4pIHt9XG59XG4iXX0=