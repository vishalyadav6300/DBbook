import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from '@angular/core';
import { Directive, Input, HostBinding, forwardRef, ContentChildren, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { Subject, from } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

class MdbRadioDirective {
    constructor() {
        this._checked = false;
        this._value = null;
        this._disabled = false;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get checked() {
        return this._checked;
    }
    set checked(value) {
        this._checked = coerceBooleanProperty(value);
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }
    get isDisabled() {
        return this._disabled;
    }
    get isChecked() {
        return this._checked;
    }
    get nameAttr() {
        return this.name;
    }
    _updateName(value) {
        this._name = value;
    }
    _updateChecked(value) {
        this._checked = value;
    }
    _updateDisabledState(value) {
        this._disabled = value;
    }
}
MdbRadioDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRadioDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MdbRadioDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbRadioDirective, selector: "[mdbRadio]", inputs: { name: "name", checked: "checked", value: "value", disabled: "disabled" }, host: { properties: { "disabled": "this.isDisabled", "checked": "this.isChecked", "attr.name": "this.nameAttr" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRadioDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbRadio]',
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { name: [{
                type: Input
            }], checked: [{
                type: Input,
                args: ['checked']
            }], value: [{
                type: Input,
                args: ['value']
            }], disabled: [{
                type: Input,
                args: ['disabled']
            }], isDisabled: [{
                type: HostBinding,
                args: ['disabled']
            }], isChecked: [{
                type: HostBinding,
                args: ['checked']
            }], nameAttr: [{
                type: HostBinding,
                args: ['attr.name']
            }] } });

const MDB_RADIO_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
    useExisting: forwardRef(() => MdbRadioGroupDirective),
    multi: true,
};
class MdbRadioGroupDirective {
    constructor() {
        this._disabled = false;
        this._destroy$ = new Subject();
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        if (this.radios) {
            this._updateChecked();
        }
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
        if (this.radios) {
            this._updateNames();
        }
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        this._disabled = disabled;
        if (this.radios) {
            this._updateDisabled();
        }
    }
    ngAfterContentInit() {
        this._updateNames();
        this._updateDisabled();
        this.radios.changes
            .pipe(startWith(this.radios), switchMap((radios) => from(Promise.resolve(radios))), takeUntil(this._destroy$))
            .subscribe(() => this._updateRadiosState());
    }
    ngOnDestroy() {
        this._destroy$.next();
        this._destroy$.complete();
    }
    _updateRadiosState() {
        this._updateNames();
        this._updateChecked();
        this._updateDisabled();
    }
    _updateNames() {
        this.radios.forEach((radio) => radio._updateName(this.name));
    }
    _updateChecked() {
        this.radios.forEach((radio) => {
            const isChecked = radio.value === this._value;
            radio._updateChecked(isChecked);
        });
    }
    _updateDisabled() {
        this.radios.forEach((radio) => radio._updateDisabledState(this._disabled));
    }
    // Control value accessor methods
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this._disabled = isDisabled;
        this._updateDisabled();
    }
    writeValue(value) {
        this.value = value;
    }
}
MdbRadioGroupDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRadioGroupDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MdbRadioGroupDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbRadioGroupDirective, selector: "[mdbRadioGroup]", inputs: { value: "value", name: "name", disabled: "disabled" }, providers: [MDB_RADIO_GROUP_VALUE_ACCESSOR], queries: [{ propertyName: "radios", predicate: MdbRadioDirective, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRadioGroupDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbRadioGroup]',
                    providers: [MDB_RADIO_GROUP_VALUE_ACCESSOR],
                }]
        }], propDecorators: { radios: [{
                type: ContentChildren,
                args: [MdbRadioDirective, { descendants: true }]
            }], value: [{
                type: Input
            }], name: [{
                type: Input
            }], disabled: [{
                type: Input
            }] } });

class MdbRadioModule {
}
MdbRadioModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRadioModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbRadioModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: MdbRadioModule, declarations: [MdbRadioDirective, MdbRadioGroupDirective], imports: [CommonModule, FormsModule], exports: [MdbRadioDirective, MdbRadioGroupDirective] });
MdbRadioModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRadioModule, imports: [CommonModule, FormsModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbRadioModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [MdbRadioDirective, MdbRadioGroupDirective],
                    exports: [MdbRadioDirective, MdbRadioGroupDirective],
                    imports: [CommonModule, FormsModule],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MDB_RADIO_GROUP_VALUE_ACCESSOR, MdbRadioDirective, MdbRadioGroupDirective, MdbRadioModule };
//# sourceMappingURL=mdb-angular-ui-kit-radio.mjs.map
//# sourceMappingURL=mdb-angular-ui-kit-radio.mjs.map
