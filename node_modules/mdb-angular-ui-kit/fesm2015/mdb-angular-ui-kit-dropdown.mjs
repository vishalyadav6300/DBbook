import * as i0 from '@angular/core';
import { Directive, EventEmitter, ElementRef, Component, ChangeDetectionStrategy, ViewChild, ContentChild, Input, Output, NgModule } from '@angular/core';
import * as i1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i2 from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

class MdbDropdownToggleDirective {
    constructor() { }
}
MdbDropdownToggleDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbDropdownToggleDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MdbDropdownToggleDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbDropdownToggleDirective, selector: "[mdbDropdownToggle]", exportAs: ["mdbDropdownToggle"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbDropdownToggleDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[mdbDropdownToggle]',
                    exportAs: 'mdbDropdownToggle',
                }]
        }], ctorParameters: function () { return []; } });

// eslint-disable-next-line @angular-eslint/component-class-suffix
class MdbDropdownMenuDirective {
    constructor() { }
}
MdbDropdownMenuDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbDropdownMenuDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
MdbDropdownMenuDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbDropdownMenuDirective, selector: "[mdbDropdownMenu]", exportAs: ["mdbDropdownMenu"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbDropdownMenuDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbDropdownMenu]',
                    exportAs: 'mdbDropdownMenu',
                }]
        }], ctorParameters: function () { return []; } });

// eslint-disable-next-line @angular-eslint/component-class-suffix
class MdbDropdownDirective {
    constructor(_overlay, _overlayPositionBuilder, _elementRef, _vcr, _breakpointObserver, _cdRef) {
        this._overlay = _overlay;
        this._overlayPositionBuilder = _overlayPositionBuilder;
        this._elementRef = _elementRef;
        this._vcr = _vcr;
        this._breakpointObserver = _breakpointObserver;
        this._cdRef = _cdRef;
        this._animation = true;
        this.offset = 0;
        this.closeOnOutsideClick = true;
        this.closeOnItemClick = true;
        this.closeOnEsc = true;
        this.withPush = false;
        this.dropdownShow = new EventEmitter();
        this.dropdownShown = new EventEmitter();
        this.dropdownHide = new EventEmitter();
        this.dropdownHidden = new EventEmitter();
        this._open = false;
        this._breakpoints = {
            isSm: this._breakpointObserver.isMatched('(min-width: 576px)'),
            isMd: this._breakpointObserver.isMatched('(min-width: 768px)'),
            isLg: this._breakpointObserver.isMatched('(min-width: 992px)'),
            isXl: this._breakpointObserver.isMatched('(min-width: 1200px)'),
            isXxl: this._breakpointObserver.isMatched('(min-width: 1400px)'),
        };
        this._destroy$ = new Subject();
        this._animationState = 'hidden';
    }
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = coerceBooleanProperty(value);
    }
    ngAfterContentInit() {
        this._bindDropdownToggleClick();
    }
    ngOnDestroy() {
        if (this._overlayRef) {
            this._overlayRef.detach();
            this._overlayRef.dispose();
        }
        this._destroy$.next();
        this._destroy$.complete();
    }
    _bindDropdownToggleClick() {
        fromEvent(this._dropdownToggle.nativeElement, 'click')
            .pipe(takeUntil(this._destroy$))
            .subscribe(() => this.toggle());
    }
    _createOverlayConfig() {
        return new OverlayConfig({
            hasBackdrop: false,
            scrollStrategy: this._overlay.scrollStrategies.reposition(),
            positionStrategy: this._createPositionStrategy(),
        });
    }
    _createOverlay() {
        this._overlayRef = this._overlay.create(this._createOverlayConfig());
    }
    _createPositionStrategy() {
        const positionStrategy = this._overlayPositionBuilder
            .flexibleConnectedTo(this._dropdownToggle)
            .withPositions(this._getPosition())
            .withFlexibleDimensions(false)
            .withPush(this.withPush);
        return positionStrategy;
    }
    _getPosition() {
        this._isDropUp = this._elementRef.nativeElement.classList.contains('dropup');
        this._isDropStart = this._elementRef.nativeElement.classList.contains('dropstart');
        this._isDropEnd = this._elementRef.nativeElement.classList.contains('dropend');
        this._isDropdownMenuEnd =
            this._dropdownMenu.nativeElement.classList.contains('dropdown-menu-end');
        this._xPosition = this._isDropdownMenuEnd ? 'end' : 'start';
        const regex = new RegExp(/dropdown-menu-(sm|md|lg|xl|xxl)-(start|end)/, 'g');
        const responsiveClass = this._dropdownMenu.nativeElement.className.match(regex);
        if (responsiveClass) {
            this._subscribeBrakpoints();
            const positionRegex = new RegExp(/start|end/, 'g');
            const breakpointRegex = new RegExp(/(sm|md|lg|xl|xxl)/, 'g');
            const dropdownPosition = positionRegex.exec(responsiveClass)[0];
            const breakpoint = breakpointRegex.exec(responsiveClass)[0];
            switch (true) {
                case breakpoint === 'xxl' && this._breakpoints.isXxl:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'xl' && this._breakpoints.isXl:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'lg' && this._breakpoints.isLg:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'md' && this._breakpoints.isMd:
                    this._xPosition = dropdownPosition;
                    break;
                case breakpoint === 'sm' && this._breakpoints.isSm:
                    this._xPosition = dropdownPosition;
                    break;
                default:
                    break;
            }
        }
        let position;
        const positionDropup = {
            originX: this._xPosition,
            originY: 'top',
            overlayX: this._xPosition,
            overlayY: 'bottom',
            offsetY: -this.offset,
        };
        const positionDropdown = {
            originX: this._xPosition,
            originY: 'bottom',
            overlayX: this._xPosition,
            overlayY: 'top',
            offsetY: this.offset,
        };
        const positionDropstart = {
            originX: 'start',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'top',
            offsetX: this.offset,
        };
        const positionDropend = {
            originX: 'end',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'top',
            offsetX: -this.offset,
        };
        switch (true) {
            case this._isDropEnd:
                position = [positionDropend, positionDropstart];
                break;
            case this._isDropStart:
                position = [positionDropstart, positionDropend];
                break;
            case this._isDropUp:
                position = [positionDropup, positionDropdown];
                break;
            default:
                position = [positionDropdown, positionDropup];
                break;
        }
        return position;
    }
    _listenToEscKeyup(overlayRef) {
        return fromEvent(document, 'keyup').pipe(filter((event) => event.key === 'Escape'), takeUntil(overlayRef.detachments()));
    }
    _listenToClick(overlayRef, origin) {
        return fromEvent(document, 'click').pipe(filter((event) => {
            const target = event.target;
            const isInsideMenu = this._dropdownMenu.nativeElement.contains(target);
            const notTogglerIcon = !this._dropdownToggle.nativeElement.contains(target);
            const notCustomContent = !isInsideMenu || (target.classList && target.classList.contains('dropdown-item'));
            const notOrigin = target !== origin;
            return notOrigin && notTogglerIcon && notCustomContent;
        }), takeUntil(overlayRef.detachments()));
    }
    onAnimationEnd(event) {
        if (event.fromState === 'visible' && event.toState === 'hidden') {
            this._overlayRef.detach();
            this._open = false;
            this.dropdownHidden.emit(this);
        }
        if (event.fromState === 'hidden' && event.toState === 'visible') {
            this.dropdownShown.emit(this);
        }
    }
    _subscribeBrakpoints() {
        const brakpoints = [
            '(min-width: 576px)',
            '(min-width: 768px)',
            '(min-width: 992px)',
            '(min-width: 1200px)',
            '(min-width: 1400px)',
        ];
        this._breakpointSubscription = this._breakpointObserver
            .observe(brakpoints)
            .pipe(takeUntil(this._destroy$))
            .subscribe((result) => {
            Object.keys(this._breakpoints).forEach((key, index) => {
                const brakpointValue = brakpoints[index];
                const newBreakpoint = result.breakpoints[brakpointValue];
                const isBreakpointChanged = newBreakpoint !== this._breakpoints[key];
                if (!isBreakpointChanged) {
                    return;
                }
                this._breakpoints[key] = newBreakpoint;
                if (this._open) {
                    this._overlayRef.updatePositionStrategy(this._createPositionStrategy());
                }
            });
        });
    }
    show() {
        this._cdRef.markForCheck();
        if (this._open) {
            return;
        }
        if (!this._overlayRef) {
            this._createOverlay();
        }
        this._portal = new TemplatePortal(this._template, this._vcr);
        this.dropdownShow.emit(this);
        this._open = true;
        this._overlayRef.attach(this._portal);
        this._listenToEscKeyup(this._overlayRef).subscribe((isEsc) => {
            if (isEsc && this.closeOnEsc) {
                this.hide();
            }
        });
        this._overlayRef
            .keydownEvents()
            .pipe(takeUntil(this._overlayRef.detachments()))
            .subscribe((event) => {
            this._handleKeyboardNavigation(event);
        });
        this._listenToClick(this._overlayRef, this._dropdownToggle.nativeElement).subscribe((event) => {
            const target = event.target;
            const isDropdownItem = target.classList && target.classList.contains('dropdown-item');
            if (this.closeOnItemClick && isDropdownItem) {
                this.hide();
                return;
            }
            if (this.closeOnOutsideClick && !isDropdownItem) {
                this.hide();
                return;
            }
        });
        this._animationState = 'visible';
    }
    _handleKeyboardNavigation(event) {
        const items = Array.from(this._dropdownMenu.nativeElement.querySelectorAll('.dropdown-item'));
        const key = event.key;
        const activeElement = this._dropdownMenu.nativeElement.ownerDocument.activeElement;
        if (items.length === 0) {
            return;
        }
        let index = items.indexOf(activeElement);
        switch (key) {
            case 'ArrowDown':
                event.preventDefault();
                index = Math.min(index + 1, items.length - 1);
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (index === -1) {
                    index = items.length - 1;
                    break;
                }
                index = Math.max(index - 1, 0);
                break;
        }
        const nextActiveElement = items[index];
        if (nextActiveElement) {
            nextActiveElement.focus();
        }
    }
    hide() {
        this._cdRef.markForCheck();
        if (!this._open) {
            return;
        }
        this.dropdownHide.emit(this);
        this._animationState = 'hidden';
    }
    toggle() {
        this._cdRef.markForCheck();
        if (this._open) {
            this.hide();
        }
        else {
            this.show();
        }
    }
}
MdbDropdownDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbDropdownDirective, deps: [{ token: i1.Overlay }, { token: i1.OverlayPositionBuilder }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i2.BreakpointObserver }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbDropdownDirective.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbDropdownDirective, selector: "[mdbDropdown]", inputs: { animation: "animation", offset: "offset", closeOnOutsideClick: "closeOnOutsideClick", closeOnItemClick: "closeOnItemClick", closeOnEsc: "closeOnEsc", withPush: "withPush" }, outputs: { dropdownShow: "dropdownShow", dropdownShown: "dropdownShown", dropdownHide: "dropdownHide", dropdownHidden: "dropdownHidden" }, queries: [{ propertyName: "_dropdownToggle", first: true, predicate: MdbDropdownToggleDirective, descendants: true, read: ElementRef }, { propertyName: "_dropdownMenu", first: true, predicate: MdbDropdownMenuDirective, descendants: true, read: ElementRef }], viewQueries: [{ propertyName: "_template", first: true, predicate: ["dropdownTemplate"], descendants: true }], ngImport: i0, template: "<ng-content></ng-content>\n<ng-content select=\".dropdown-toggle\"></ng-content>\n<ng-template #dropdownTemplate>\n  <div [@fade]=\"_animationState\" (@fade.done)=\"onAnimationEnd($event)\" [@.disabled]=\"!animation\">\n    <ng-content select=\".dropdown-menu\"></ng-content>\n  </div>\n</ng-template>\n", animations: [
        trigger('fade', [
            state('visible', style({ opacity: 1 })),
            state('hidden', style({ opacity: 0 })),
            transition('visible => hidden', animate('150ms linear')),
            transition('hidden => visible', [style({ opacity: 0 }), animate('150ms linear')]),
        ]),
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbDropdownDirective, decorators: [{
            type: Component,
            args: [{ selector: '[mdbDropdown]', changeDetection: ChangeDetectionStrategy.OnPush, animations: [
                        trigger('fade', [
                            state('visible', style({ opacity: 1 })),
                            state('hidden', style({ opacity: 0 })),
                            transition('visible => hidden', animate('150ms linear')),
                            transition('hidden => visible', [style({ opacity: 0 }), animate('150ms linear')]),
                        ]),
                    ], template: "<ng-content></ng-content>\n<ng-content select=\".dropdown-toggle\"></ng-content>\n<ng-template #dropdownTemplate>\n  <div [@fade]=\"_animationState\" (@fade.done)=\"onAnimationEnd($event)\" [@.disabled]=\"!animation\">\n    <ng-content select=\".dropdown-menu\"></ng-content>\n  </div>\n</ng-template>\n" }]
        }], ctorParameters: function () { return [{ type: i1.Overlay }, { type: i1.OverlayPositionBuilder }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i2.BreakpointObserver }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _template: [{
                type: ViewChild,
                args: ['dropdownTemplate']
            }], _dropdownToggle: [{
                type: ContentChild,
                args: [MdbDropdownToggleDirective, { read: ElementRef }]
            }], _dropdownMenu: [{
                type: ContentChild,
                args: [MdbDropdownMenuDirective, { read: ElementRef }]
            }], animation: [{
                type: Input
            }], offset: [{
                type: Input
            }], closeOnOutsideClick: [{
                type: Input
            }], closeOnItemClick: [{
                type: Input
            }], closeOnEsc: [{
                type: Input
            }], withPush: [{
                type: Input
            }], dropdownShow: [{
                type: Output
            }], dropdownShown: [{
                type: Output
            }], dropdownHide: [{
                type: Output
            }], dropdownHidden: [{
                type: Output
            }] } });

class MdbDropdownModule {
}
MdbDropdownModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbDropdownModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbDropdownModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: MdbDropdownModule, declarations: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective], imports: [CommonModule, OverlayModule], exports: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective] });
MdbDropdownModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbDropdownModule, imports: [CommonModule, OverlayModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbDropdownModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, OverlayModule],
                    declarations: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective],
                    exports: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbDropdownDirective, MdbDropdownMenuDirective, MdbDropdownModule, MdbDropdownToggleDirective };
//# sourceMappingURL=mdb-angular-ui-kit-dropdown.mjs.map
//# sourceMappingURL=mdb-angular-ui-kit-dropdown.mjs.map
