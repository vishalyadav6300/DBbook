import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, HostBinding, HostListener, Input, Optional, Self, } from '@angular/core';
import { Subject } from 'rxjs';
import { MdbAbstractFormControl } from './form-control';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/cdk/text-field";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbInputDirective {
    constructor(_elementRef, _renderer, _ngControl, _autofill) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._ngControl = _ngControl;
        this._autofill = _autofill;
        this.stateChanges = new Subject();
        this._focused = false;
        this._autofilled = false;
        this._color = '';
        this._disabled = false;
        this._readonly = false;
    }
    ngAfterViewInit() {
        this._color = getComputedStyle(this._elementRef.nativeElement).color;
        if (this._elementRef.nativeElement.type === 'date') {
            this._updateTextColorForDateType();
        }
        this._autofill.monitor(this.input).subscribe((event) => {
            this._autofilled = event.isAutofilled;
            this.stateChanges.next();
        });
    }
    get disabled() {
        if (this._ngControl && this._ngControl.disabled !== null) {
            return this._ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get readonly() {
        return this._readonly;
    }
    set readonly(value) {
        if (value) {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'readonly', '');
        }
        else {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'readonly');
        }
        this._readonly = coerceBooleanProperty(value);
    }
    get value() {
        return this._elementRef.nativeElement.value;
    }
    set value(value) {
        if (value !== this.value) {
            this._elementRef.nativeElement.value = value;
            this._value = value;
            this.stateChanges.next();
        }
    }
    _updateTextColorForDateType() {
        const actualColor = getComputedStyle(this._elementRef.nativeElement).color;
        this._color = actualColor !== 'rgba(0, 0, 0, 0)' ? actualColor : this._color;
        const color = this.labelActive ? this._color : `transparent`;
        this._renderer.setStyle(this._elementRef.nativeElement, 'color', color);
    }
    _onFocus() {
        this._focused = true;
        if (this._elementRef.nativeElement.type === 'date') {
            this._updateTextColorForDateType();
        }
        this.stateChanges.next();
    }
    _onBlur() {
        this._focused = false;
        if (this._elementRef.nativeElement.type === 'date') {
            this._updateTextColorForDateType();
        }
        this.stateChanges.next();
    }
    ngDoCheck() {
        const value = this._elementRef.nativeElement.value;
        if (this._currentNativeValue !== value) {
            this._currentNativeValue = value;
            this.stateChanges.next();
        }
    }
    get hasValue() {
        return this._elementRef.nativeElement.value !== '';
    }
    get focused() {
        return this._focused;
    }
    get autofilled() {
        return this._autofilled;
    }
    get input() {
        return this._elementRef.nativeElement;
    }
    get labelActive() {
        return this.focused || this.hasValue || this.autofilled;
    }
    ngOnDestroy() {
        this._autofill.stopMonitoring(this.input);
    }
}
MdbInputDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbInputDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.NgControl, optional: true, self: true }, { token: i2.AutofillMonitor }], target: i0.ɵɵFactoryTarget.Directive });
MdbInputDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbInputDirective, selector: "[mdbInput]", inputs: { disabled: "disabled", readonly: "readonly", value: "value" }, host: { listeners: { "focus": "_onFocus()", "blur": "_onBlur()" }, properties: { "disabled": "this.disabled" } }, providers: [{ provide: MdbAbstractFormControl, useExisting: MdbInputDirective }], exportAs: ["mdbInput"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbInputDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbInput]',
                    exportAs: 'mdbInput',
                    providers: [{ provide: MdbAbstractFormControl, useExisting: MdbInputDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.NgControl, decorators: [{
                    type: Optional
                }, {
                    type: Self
                }] }, { type: i2.AutofillMonitor }]; }, propDecorators: { disabled: [{
                type: HostBinding,
                args: ['disabled']
            }, {
                type: Input,
                args: ['disabled']
            }], readonly: [{
                type: Input,
                args: ['readonly']
            }], value: [{
                type: Input
            }], _onFocus: [{
                type: HostListener,
                args: ['focus']
            }], _onBlur: [{
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Zvcm1zL2lucHV0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUVMLFNBQVMsRUFHVCxXQUFXLEVBQ1gsWUFBWSxFQUNaLEtBQUssRUFFTCxRQUFRLEVBRVIsSUFBSSxHQUNMLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDL0IsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFTeEQsa0VBQWtFO0FBQ2xFLE1BQU0sT0FBTyxpQkFBaUI7SUFHNUIsWUFDVSxXQUF1QixFQUN2QixTQUFvQixFQUNBLFVBQXFCLEVBQ3pDLFNBQTBCO1FBSDFCLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDQSxlQUFVLEdBQVYsVUFBVSxDQUFXO1FBQ3pDLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBRzNCLGlCQUFZLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7UUFFbkQsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNqQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBMkJaLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFjbEIsY0FBUyxHQUFHLEtBQUssQ0FBQztJQS9DdkIsQ0FBQztJQVFKLGVBQWU7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3JFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNsRCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztTQUNwQztRQUVELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFvQixFQUFFLEVBQUU7WUFDcEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQ3RDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBSUQsSUFFSSxRQUFRO1FBQ1YsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUN4RCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUdELElBQ0ksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBYztRQUN6QixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUM3RTthQUFNO1lBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDNUU7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFHRCxJQUNJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUM5QyxDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFHTywyQkFBMkI7UUFDakMsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDM0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLEtBQUssa0JBQWtCLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUU3RSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7UUFFN0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFHRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1lBQ2xELElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBR0QsT0FBTztRQUNMLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUNsRCxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztTQUNwQztRQUNELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFNBQVM7UUFDUCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDbkQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUssS0FBSyxFQUFFO1lBQ3RDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssS0FBSyxFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzFELENBQUM7SUFLRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7OzhHQWxJVSxpQkFBaUI7a0dBQWpCLGlCQUFpQiwrTkFIakIsQ0FBQyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsQ0FBQzsyRkFHckUsaUJBQWlCO2tCQVA3QixTQUFTO21CQUFDO29CQUNULDhEQUE4RDtvQkFDOUQsUUFBUSxFQUFFLFlBQVk7b0JBQ3RCLFFBQVEsRUFBRSxVQUFVO29CQUNwQixTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxXQUFXLG1CQUFtQixFQUFFLENBQUM7aUJBQ2pGOzswQkFRSSxRQUFROzswQkFBSSxJQUFJOzBFQTBCZixRQUFRO3NCQUZYLFdBQVc7dUJBQUMsVUFBVTs7c0JBQ3RCLEtBQUs7dUJBQUMsVUFBVTtnQkFhYixRQUFRO3NCQURYLEtBQUs7dUJBQUMsVUFBVTtnQkFlYixLQUFLO3NCQURSLEtBQUs7Z0JBdUJOLFFBQVE7c0JBRFAsWUFBWTt1QkFBQyxPQUFPO2dCQVVyQixPQUFPO3NCQUROLFlBQVk7dUJBQUMsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRG9DaGVjayxcbiAgRWxlbWVudFJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3B0aW9uYWwsXG4gIFJlbmRlcmVyMixcbiAgU2VsZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBNZGJBYnN0cmFjdEZvcm1Db250cm9sIH0gZnJvbSAnLi9mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHsgQXV0b2ZpbGxFdmVudCwgQXV0b2ZpbGxNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3RleHQtZmllbGQnO1xuXG5ARGlyZWN0aXZlKHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9kaXJlY3RpdmUtc2VsZWN0b3JcbiAgc2VsZWN0b3I6ICdbbWRiSW5wdXRdJyxcbiAgZXhwb3J0QXM6ICdtZGJJbnB1dCcsXG4gIHByb3ZpZGVyczogW3sgcHJvdmlkZTogTWRiQWJzdHJhY3RGb3JtQ29udHJvbCwgdXNlRXhpc3Rpbmc6IE1kYklucHV0RGlyZWN0aXZlIH1dLFxufSlcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE1kYklucHV0RGlyZWN0aXZlXG4gIGltcGxlbWVudHMgTWRiQWJzdHJhY3RGb3JtQ29udHJvbDxhbnk+LCBEb0NoZWNrLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3lcbntcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHJpdmF0ZSBfbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgcHJpdmF0ZSBfYXV0b2ZpbGw6IEF1dG9maWxsTW9uaXRvclxuICApIHt9XG5cbiAgcmVhZG9ubHkgc3RhdGVDaGFuZ2VzOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9mb2N1c2VkID0gZmFsc2U7XG4gIHByaXZhdGUgX2F1dG9maWxsZWQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY29sb3IgPSAnJztcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5fY29sb3IgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCkuY29sb3I7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50eXBlID09PSAnZGF0ZScpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVRleHRDb2xvckZvckRhdGVUeXBlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXV0b2ZpbGwubW9uaXRvcih0aGlzLmlucHV0KS5zdWJzY3JpYmUoKGV2ZW50OiBBdXRvZmlsbEV2ZW50KSA9PiB7XG4gICAgICB0aGlzLl9hdXRvZmlsbGVkID0gZXZlbnQuaXNBdXRvZmlsbGVkO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudE5hdGl2ZVZhbHVlOiBhbnk7XG5cbiAgQEhvc3RCaW5kaW5nKCdkaXNhYmxlZCcpXG4gIEBJbnB1dCgnZGlzYWJsZWQnKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX25nQ29udHJvbCAmJiB0aGlzLl9uZ0NvbnRyb2wuZGlzYWJsZWQgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9uZ0NvbnRyb2wuZGlzYWJsZWQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcblxuICBASW5wdXQoJ3JlYWRvbmx5JylcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBzZXQgcmVhZG9ubHkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdyZWFkb25seScsICcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3JlYWRvbmx5Jyk7XG4gICAgfVxuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpXG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMudmFsdWUpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcblxuICBwcml2YXRlIF91cGRhdGVUZXh0Q29sb3JGb3JEYXRlVHlwZSgpIHtcbiAgICBjb25zdCBhY3R1YWxDb2xvciA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KS5jb2xvcjtcbiAgICB0aGlzLl9jb2xvciA9IGFjdHVhbENvbG9yICE9PSAncmdiYSgwLCAwLCAwLCAwKScgPyBhY3R1YWxDb2xvciA6IHRoaXMuX2NvbG9yO1xuXG4gICAgY29uc3QgY29sb3IgPSB0aGlzLmxhYmVsQWN0aXZlID8gdGhpcy5fY29sb3IgOiBgdHJhbnNwYXJlbnRgO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnY29sb3InLCBjb2xvcik7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXG4gIF9vbkZvY3VzKCk6IHZvaWQge1xuICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuICAgIGlmICh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICB0aGlzLl91cGRhdGVUZXh0Q29sb3JGb3JEYXRlVHlwZSgpO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdibHVyJylcbiAgX29uQmx1cigpOiB2b2lkIHtcbiAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC50eXBlID09PSAnZGF0ZScpIHtcbiAgICAgIHRoaXMuX3VwZGF0ZVRleHRDb2xvckZvckRhdGVUeXBlKCk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpOiB2b2lkIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICBpZiAodGhpcy5fY3VycmVudE5hdGl2ZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fY3VycmVudE5hdGl2ZVZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGhhc1ZhbHVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQudmFsdWUgIT09ICcnO1xuICB9XG5cbiAgZ2V0IGZvY3VzZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7XG4gIH1cblxuICBnZXQgYXV0b2ZpbGxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYXV0b2ZpbGxlZDtcbiAgfVxuXG4gIGdldCBpbnB1dCgpOiBIVE1MSW5wdXRFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgZ2V0IGxhYmVsQWN0aXZlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZvY3VzZWQgfHwgdGhpcy5oYXNWYWx1ZSB8fCB0aGlzLmF1dG9maWxsZWQ7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbiAgc3RhdGljIG5nQWNjZXB0SW5wdXRUeXBlX3JlYWRvbmx5OiBCb29sZWFuSW5wdXQ7XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fYXV0b2ZpbGwuc3RvcE1vbml0b3JpbmcodGhpcy5pbnB1dCk7XG4gIH1cbn1cbiJdfQ==