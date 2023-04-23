import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, HostListener, Input, Output, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export const RANGE_VALUE_ACCESOR = {
    provide: NG_VALUE_ACCESSOR,
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => MdbRangeComponent),
    multi: true,
};
export class MdbRangeComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.min = 0;
        this.max = 100;
        this.rangeValueChange = new EventEmitter();
        this.visibility = false;
        // Control Value Accessor Methods
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get default() {
        return this._default;
    }
    set default(value) {
        this._default = value;
    }
    onchange(event) {
        this.onChange(event.target.value);
    }
    onInput() {
        this.rangeValueChange.emit({ value: this.value });
        this.focusRangeInput();
    }
    ngAfterViewInit() {
        this.thumbPositionUpdate();
    }
    focusRangeInput() {
        this.input.nativeElement.focus();
        this.visibility = true;
    }
    blurRangeInput() {
        this.input.nativeElement.blur();
        this.visibility = false;
    }
    thumbPositionUpdate() {
        const rangeInput = this.input.nativeElement;
        const inputValue = rangeInput.value;
        const minValue = rangeInput.min ? rangeInput.min : 0;
        const maxValue = rangeInput.max ? rangeInput.max : 100;
        const newValue = Number(((inputValue - minValue) * 100) / (maxValue - minValue));
        this.value = inputValue;
        this.thumbStyle = { left: `calc(${newValue}% + (${8 - newValue * 0.15}px))` };
    }
    writeValue(value) {
        this.value = value;
        this._cdRef.markForCheck();
        setTimeout(() => {
            this.thumbPositionUpdate();
        }, 0);
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
MdbRangeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRangeComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbRangeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbRangeComponent, selector: "mdb-range", inputs: { id: "id", required: "required", name: "name", value: "value", disabled: "disabled", label: "label", min: "min", max: "max", step: "step", default: "default", defaultRangeCounterClass: "defaultRangeCounterClass" }, outputs: { rangeValueChange: "rangeValueChange" }, host: { listeners: { "change": "onchange($event)", "input": "onInput()" } }, providers: [RANGE_VALUE_ACCESOR], viewQueries: [{ propertyName: "input", first: true, predicate: ["input"], descendants: true }, { propertyName: "thumb", first: true, predicate: ["thumb"], descendants: true }, { propertyName: "thumbValue", first: true, predicate: ["thumbValue"], descendants: true }], ngImport: i0, template: "<label for=\"id\" class=\"form-label\">{{ label }}</label>\n<div class=\"range\">\n  <input\n    #input\n    [name]=\"name\"\n    type=\"range\"\n    [disabled]=\"disabled\"\n    [id]=\"id\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [value]=\"value\"\n    class=\"form-range\"\n    min=\"0\"\n    max=\"5\"\n    [id]=\"id\"\n    (input)=\"thumbPositionUpdate()\"\n    (blur)=\"blurRangeInput()\"\n    (mousedown)=\"focusRangeInput()\"\n    (mouseup)=\"blurRangeInput()\"\n    (touchstart)=\"focusRangeInput()\"\n    (touchend)=\"blurRangeInput()\"\n  />\n  <span #thumb class=\"thumb\" [ngStyle]=\"thumbStyle\" [ngClass]=\"{ 'thumb-active': this.visibility }\">\n    <span #thumbValue class=\"thumb-value\">{{ value }}</span>\n  </span>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRangeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-range', changeDetection: ChangeDetectionStrategy.OnPush, providers: [RANGE_VALUE_ACCESOR], template: "<label for=\"id\" class=\"form-label\">{{ label }}</label>\n<div class=\"range\">\n  <input\n    #input\n    [name]=\"name\"\n    type=\"range\"\n    [disabled]=\"disabled\"\n    [id]=\"id\"\n    [min]=\"min\"\n    [max]=\"max\"\n    [step]=\"step\"\n    [value]=\"value\"\n    class=\"form-range\"\n    min=\"0\"\n    max=\"5\"\n    [id]=\"id\"\n    (input)=\"thumbPositionUpdate()\"\n    (blur)=\"blurRangeInput()\"\n    (mousedown)=\"focusRangeInput()\"\n    (mouseup)=\"blurRangeInput()\"\n    (touchstart)=\"focusRangeInput()\"\n    (touchend)=\"blurRangeInput()\"\n  />\n  <span #thumb class=\"thumb\" [ngStyle]=\"thumbStyle\" [ngClass]=\"{ 'thumb-active': this.visibility }\">\n    <span #thumbValue class=\"thumb-value\">{{ value }}</span>\n  </span>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { input: [{
                type: ViewChild,
                args: ['input']
            }], thumb: [{
                type: ViewChild,
                args: ['thumb']
            }], thumbValue: [{
                type: ViewChild,
                args: ['thumbValue']
            }], id: [{
                type: Input
            }], required: [{
                type: Input
            }], name: [{
                type: Input
            }], value: [{
                type: Input
            }], disabled: [{
                type: Input
            }], label: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], step: [{
                type: Input
            }], default: [{
                type: Input
            }], defaultRangeCounterClass: [{
                type: Input
            }], rangeValueChange: [{
                type: Output
            }], onchange: [{
                type: HostListener,
                args: ['change', ['$event']]
            }], onInput: [{
                type: HostListener,
                args: ['input']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L3JhbmdlL3JhbmdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9yYW5nZS9yYW5nZS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLHFCQUFxQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDNUUsT0FBTyxFQUVMLHVCQUF1QixFQUV2QixTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFFekUsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQVE7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQix5RkFBeUY7SUFDekYsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFPRixNQUFNLE9BQU8saUJBQWlCO0lBaUQ1QixZQUFvQixNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQTdCcEMsUUFBRyxHQUFHLENBQUMsQ0FBQztRQUNSLFFBQUcsR0FBRyxHQUFHLENBQUM7UUFjVCxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTlDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUF1QzFCLGlDQUFpQztRQUNqQyxhQUFRLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUMxQixjQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBN0IyQixDQUFDO0lBdkNqRCxJQUNJ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QUFTOytCQUNFLFdBQVcsbUJBRUosdUJBQXVCLENBQUMsTUFBTSxhQUNwQyxDQUFDLG1CQUFtQixDQUFDO3dHQUdaLEtBQUs7c0JBQXhCLFNBQVM7dUJBQUMsT0FBTztnQkFDRSxLQUFLO3NCQUF4QixTQUFTO3VCQUFDLE9BQU87Z0JBQ08sVUFBVTtzQkFBbEMsU0FBUzt1QkFBQyxZQUFZO2dCQUVkLEVBQUU7c0JBQVYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBR0YsUUFBUTtzQkFEWCxLQUFLO2dCQVNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFHRixPQUFPO3NCQURWLEtBQUs7Z0JBU0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUVJLGdCQUFnQjtzQkFBekIsTUFBTTtnQkFLNkIsUUFBUTtzQkFBM0MsWUFBWTt1QkFBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBSVgsT0FBTztzQkFBN0IsWUFBWTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQm9vbGVhbklucHV0LCBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgUkFOR0VfVkFMVUVfQUNDRVNPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTWRiUmFuZ2VDb21wb25lbnQpLFxuICBtdWx0aTogdHJ1ZSxcbn07XG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdtZGItcmFuZ2UnLFxuICB0ZW1wbGF0ZVVybDogJ3JhbmdlLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHByb3ZpZGVyczogW1JBTkdFX1ZBTFVFX0FDQ0VTT1JdLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJSYW5nZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBBZnRlclZpZXdJbml0IHtcbiAgQFZpZXdDaGlsZCgnaW5wdXQnKSBpbnB1dDogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndGh1bWInKSB0aHVtYjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgndGh1bWJWYWx1ZScpIHRodW1iVmFsdWU6IEVsZW1lbnRSZWY7XG5cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgcmVxdWlyZWQ6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgdmFsdWU6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIHNldCBkaXNhYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2Rpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgfVxuICBwcml2YXRlIF9kaXNhYmxlZDogYm9vbGVhbjtcblxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBtaW4gPSAwO1xuICBASW5wdXQoKSBtYXggPSAxMDA7XG4gIEBJbnB1dCgpIHN0ZXA6IG51bWJlcjtcblxuICBASW5wdXQoKVxuICBnZXQgZGVmYXVsdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGVmYXVsdDtcbiAgfVxuICBzZXQgZGVmYXVsdCh2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2RlZmF1bHQgPSB2YWx1ZTtcbiAgfVxuICBwcml2YXRlIF9kZWZhdWx0OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpIGRlZmF1bHRSYW5nZUNvdW50ZXJDbGFzczogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSByYW5nZVZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgcHVibGljIHZpc2liaWxpdHkgPSBmYWxzZTtcbiAgcHVibGljIHRodW1iU3R5bGU6IGFueTtcblxuICBASG9zdExpc3RlbmVyKCdjaGFuZ2UnLCBbJyRldmVudCddKSBvbmNoYW5nZShldmVudDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZShldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignaW5wdXQnKSBvbklucHV0KCk6IHZvaWQge1xuICAgIHRoaXMucmFuZ2VWYWx1ZUNoYW5nZS5lbWl0KHsgdmFsdWU6IHRoaXMudmFsdWUgfSk7XG4gICAgdGhpcy5mb2N1c1JhbmdlSW5wdXQoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy50aHVtYlBvc2l0aW9uVXBkYXRlKCk7XG4gIH1cblxuICBmb2N1c1JhbmdlSW5wdXQoKTogdm9pZCB7XG4gICAgdGhpcy5pbnB1dC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgdGhpcy52aXNpYmlsaXR5ID0gdHJ1ZTtcbiAgfVxuXG4gIGJsdXJSYW5nZUlucHV0KCk6IHZvaWQge1xuICAgIHRoaXMuaW5wdXQubmF0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgdGhpcy52aXNpYmlsaXR5ID0gZmFsc2U7XG4gIH1cblxuICB0aHVtYlBvc2l0aW9uVXBkYXRlKCk6IHZvaWQge1xuICAgIGNvbnN0IHJhbmdlSW5wdXQgPSB0aGlzLmlucHV0Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgaW5wdXRWYWx1ZSA9IHJhbmdlSW5wdXQudmFsdWU7XG4gICAgY29uc3QgbWluVmFsdWUgPSByYW5nZUlucHV0Lm1pbiA/IHJhbmdlSW5wdXQubWluIDogMDtcbiAgICBjb25zdCBtYXhWYWx1ZSA9IHJhbmdlSW5wdXQubWF4ID8gcmFuZ2VJbnB1dC5tYXggOiAxMDA7XG4gICAgY29uc3QgbmV3VmFsdWUgPSBOdW1iZXIoKChpbnB1dFZhbHVlIC0gbWluVmFsdWUpICogMTAwKSAvIChtYXhWYWx1ZSAtIG1pblZhbHVlKSk7XG5cbiAgICB0aGlzLnZhbHVlID0gaW5wdXRWYWx1ZTtcbiAgICB0aGlzLnRodW1iU3R5bGUgPSB7IGxlZnQ6IGBjYWxjKCR7bmV3VmFsdWV9JSArICgkezggLSBuZXdWYWx1ZSAqIDAuMTV9cHgpKWAgfTtcbiAgfVxuXG4gIC8vIENvbnRyb2wgVmFsdWUgQWNjZXNzb3IgTWV0aG9kc1xuICBvbkNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xuICBvblRvdWNoZWQgPSAoKSA9PiB7fTtcblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50aHVtYlBvc2l0aW9uVXBkYXRlKCk7XG4gICAgfSwgMCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGVmYXVsdDogQm9vbGVhbklucHV0O1xuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZGlzYWJsZWQ6IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxsYWJlbCBmb3I9XCJpZFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPnt7IGxhYmVsIH19PC9sYWJlbD5cbjxkaXYgY2xhc3M9XCJyYW5nZVwiPlxuICA8aW5wdXRcbiAgICAjaW5wdXRcbiAgICBbbmFtZV09XCJuYW1lXCJcbiAgICB0eXBlPVwicmFuZ2VcIlxuICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgW2lkXT1cImlkXCJcbiAgICBbbWluXT1cIm1pblwiXG4gICAgW21heF09XCJtYXhcIlxuICAgIFtzdGVwXT1cInN0ZXBcIlxuICAgIFt2YWx1ZV09XCJ2YWx1ZVwiXG4gICAgY2xhc3M9XCJmb3JtLXJhbmdlXCJcbiAgICBtaW49XCIwXCJcbiAgICBtYXg9XCI1XCJcbiAgICBbaWRdPVwiaWRcIlxuICAgIChpbnB1dCk9XCJ0aHVtYlBvc2l0aW9uVXBkYXRlKClcIlxuICAgIChibHVyKT1cImJsdXJSYW5nZUlucHV0KClcIlxuICAgIChtb3VzZWRvd24pPVwiZm9jdXNSYW5nZUlucHV0KClcIlxuICAgIChtb3VzZXVwKT1cImJsdXJSYW5nZUlucHV0KClcIlxuICAgICh0b3VjaHN0YXJ0KT1cImZvY3VzUmFuZ2VJbnB1dCgpXCJcbiAgICAodG91Y2hlbmQpPVwiYmx1clJhbmdlSW5wdXQoKVwiXG4gIC8+XG4gIDxzcGFuICN0aHVtYiBjbGFzcz1cInRodW1iXCIgW25nU3R5bGVdPVwidGh1bWJTdHlsZVwiIFtuZ0NsYXNzXT1cInsgJ3RodW1iLWFjdGl2ZSc6IHRoaXMudmlzaWJpbGl0eSB9XCI+XG4gICAgPHNwYW4gI3RodW1iVmFsdWUgY2xhc3M9XCJ0aHVtYi12YWx1ZVwiPnt7IHZhbHVlIH19PC9zcGFuPlxuICA8L3NwYW4+XG48L2Rpdj5cbiJdfQ==