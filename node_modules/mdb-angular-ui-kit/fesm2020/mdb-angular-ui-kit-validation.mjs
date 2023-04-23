import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { Directive, Input, Component, HostBinding, NgModule } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

class MdbValidateDirective {
    constructor(renderer, _elementRef) {
        this.renderer = renderer;
        this._elementRef = _elementRef;
        this._validate = true;
        this._validateSuccess = true;
        this._validateError = true;
    }
    get mdbValidate() {
        return this._mdbValidate;
    }
    set mdbValidate(value) {
        this._mdbValidate = coerceBooleanProperty(value);
    }
    get validate() {
        return this._validate;
    }
    set validate(value) {
        this._validate = coerceBooleanProperty(value);
        this.updateErrorClass();
        this.updateSuccessClass();
    }
    get validateSuccess() {
        return this._validateSuccess;
    }
    set validateSuccess(value) {
        this._validateSuccess = coerceBooleanProperty(value);
        this.updateSuccessClass();
    }
    get validateError() {
        return this._validateError;
    }
    set validateError(value) {
        this._validateError = coerceBooleanProperty(value);
        this.updateErrorClass();
        this.updateSuccessClass();
    }
    updateSuccessClass() {
        if (this.validate && this.validateSuccess) {
            this.renderer.addClass(this._elementRef.nativeElement, 'validate-success');
        }
        else {
            this.renderer.removeClass(this._elementRef.nativeElement, 'validate-success');
        }
    }
    updateErrorClass() {
        if (this.validate && this.validateError) {
            this.renderer.addClass(this._elementRef.nativeElement, 'validate-error');
        }
        else {
            this.renderer.removeClass(this._elementRef.nativeElement, 'validate-error');
        }
    }
    ngOnInit() {
        this.updateSuccessClass();
        this.updateErrorClass();
    }
}
MdbValidateDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbValidateDirective, deps: [{ token: i0.Renderer2 }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbValidateDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbValidateDirective, selector: "[mdbValidate]", inputs: { mdbValidate: "mdbValidate", validate: "validate", validateSuccess: "validateSuccess", validateError: "validateError" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbValidateDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbValidate]',
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i0.ElementRef }]; }, propDecorators: { mdbValidate: [{
                type: Input
            }], validate: [{
                type: Input
            }], validateSuccess: [{
                type: Input
            }], validateError: [{
                type: Input
            }] } });

let defaultIdNumber$1 = 0;
// eslint-disable-next-line @angular-eslint/component-class-suffix
class MdbErrorDirective {
    constructor(_elementRef, renderer) {
        this._elementRef = _elementRef;
        this.renderer = renderer;
        this.id = `mdb-error-${defaultIdNumber$1++}`;
        this.errorMsg = true;
        this.messageId = this.id;
        this._destroy$ = new Subject();
    }
    _getClosestEl(el, selector) {
        for (; el && el !== document; el = el.parentNode) {
            if (el.matches && el.matches(selector)) {
                return el;
            }
        }
        return null;
    }
    ngOnInit() {
        const textarea = this._getClosestEl(this._elementRef.nativeElement, 'textarea');
        if (textarea) {
            let height = textarea.offsetHeight + 4 + 'px';
            this.renderer.setStyle(this._elementRef.nativeElement, 'top', height);
            fromEvent(textarea, 'keyup')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                height = textarea.offsetHeight + 4 + 'px';
                this.renderer.setStyle(this._elementRef.nativeElement, 'top', height);
            });
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
MdbErrorDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbErrorDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
MdbErrorDirective.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbErrorDirective, selector: "mdb-error", inputs: { id: "id" }, host: { properties: { "class.error-message": "this.errorMsg", "attr.id": "this.messageId" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbErrorDirective, decorators: [{
            type: Component,
            args: [{
                    selector: 'mdb-error',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { id: [{
                type: Input
            }], errorMsg: [{
                type: HostBinding,
                args: ['class.error-message']
            }], messageId: [{
                type: HostBinding,
                args: ['attr.id']
            }] } });

let defaultIdNumber = 0;
// eslint-disable-next-line @angular-eslint/component-class-suffix
class MdbSuccessDirective {
    constructor(_elementRef, renderer) {
        this._elementRef = _elementRef;
        this.renderer = renderer;
        this.id = `mdb-success-${defaultIdNumber++}`;
        this.successMsg = true;
        this.messageId = this.id;
        this._destroy$ = new Subject();
    }
    _getClosestEl(el, selector) {
        for (; el && el !== document; el = el.parentNode) {
            if (el.matches && el.matches(selector)) {
                return el;
            }
        }
        return null;
    }
    ngOnInit() {
        const textarea = this._getClosestEl(this._elementRef.nativeElement, 'textarea');
        if (textarea) {
            let height = textarea.offsetHeight + 4 + 'px';
            this.renderer.setStyle(this._elementRef.nativeElement, 'top', height);
            fromEvent(textarea, 'keyup')
                .pipe(takeUntil(this._destroy$))
                .subscribe(() => {
                height = textarea.offsetHeight + 4 + 'px';
                this.renderer.setStyle(this._elementRef.nativeElement, 'top', height);
            });
        }
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
}
MdbSuccessDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbSuccessDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
MdbSuccessDirective.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbSuccessDirective, selector: "mdb-success", inputs: { id: "id" }, host: { properties: { "class.success-message": "this.successMsg", "attr.id": "this.messageId" } }, ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbSuccessDirective, decorators: [{
            type: Component,
            args: [{
                    selector: 'mdb-success',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { id: [{
                type: Input
            }], successMsg: [{
                type: HostBinding,
                args: ['class.success-message']
            }], messageId: [{
                type: HostBinding,
                args: ['attr.id']
            }] } });

class MdbValidationModule {
}
MdbValidationModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbValidationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbValidationModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: MdbValidationModule, declarations: [MdbErrorDirective, MdbSuccessDirective, MdbValidateDirective], imports: [CommonModule], exports: [MdbErrorDirective, MdbSuccessDirective, MdbValidateDirective] });
MdbValidationModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbValidationModule, imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbValidationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [MdbErrorDirective, MdbSuccessDirective, MdbValidateDirective],
                    exports: [MdbErrorDirective, MdbSuccessDirective, MdbValidateDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbErrorDirective, MdbSuccessDirective, MdbValidateDirective, MdbValidationModule };
//# sourceMappingURL=mdb-angular-ui-kit-validation.mjs.map
//# sourceMappingURL=mdb-angular-ui-kit-validation.mjs.map
