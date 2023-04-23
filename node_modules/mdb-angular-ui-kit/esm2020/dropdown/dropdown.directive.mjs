import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { OverlayConfig, } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ContentChild } from '@angular/core';
import { MdbDropdownToggleDirective } from './dropdown-toggle.directive';
import { MdbDropdownMenuDirective } from './dropdown-menu.directive';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
import * as i2 from "@angular/cdk/layout";
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class MdbDropdownDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2Ryb3Bkb3duL2Ryb3Bkb3duLmRpcmVjdGl2ZS50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9kcm9wZG93bi9kcm9wZG93bi5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4sU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFJTCxhQUFhLEdBR2QsTUFBTSxzQkFBc0IsQ0FBQztBQUM5QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLFNBQVMsRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdDLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFrQixNQUFNLHFCQUFxQixDQUFDO0FBRWpHLE9BQU8sRUFBZ0IscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7OztBQWdCNUUsa0VBQWtFO0FBQ2xFLE1BQU0sT0FBTyxvQkFBb0I7SUErQy9CLFlBQ1UsUUFBaUIsRUFDakIsdUJBQStDLEVBQy9DLFdBQXVCLEVBQ3ZCLElBQXNCLEVBQ3RCLG1C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LENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzt5QkFDbEYsQ0FBQztxQkFDSDs0UEFJOEIsU0FBUztzQkFBdkMsU0FBUzt1QkFBQyxrQkFBa0I7Z0JBQ21DLGVBQWU7c0JBQTlFLFlBQVk7dUJBQUMsMEJBQTBCLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUNBLGFBQWE7c0JBQTFFLFlBQVk7dUJBQUMsd0JBQXdCLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFO2dCQUd4RCxTQUFTO3NCQURaLEtBQUs7Z0JBU0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUVJLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFDRyxZQUFZO3NCQUFyQixNQUFNO2dCQUNHLGNBQWM7c0JBQXZCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ29ubmVjdGVkUG9zaXRpb24sXG4gIEZsZXhpYmxlQ29ubmVjdGVkUG9zaXRpb25TdHJhdGVneSxcbiAgT3ZlcmxheSxcbiAgT3ZlcmxheUNvbmZpZyxcbiAgT3ZlcmxheVBvc2l0aW9uQnVpbGRlcixcbiAgT3ZlcmxheVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBDb250ZW50Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYkRyb3Bkb3duVG9nZ2xlRGlyZWN0aXZlIH0gZnJvbSAnLi9kcm9wZG93bi10b2dnbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IE1kYkRyb3Bkb3duTWVudURpcmVjdGl2ZSB9IGZyb20gJy4vZHJvcGRvd24tbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgYW5pbWF0ZSwgc3RhdGUsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyLCBBbmltYXRpb25FdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQnJlYWtwb2ludE9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBCb29sZWFuSW5wdXQsIGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5cbkBDb21wb25lbnQoe1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ1ttZGJEcm9wZG93bl0nLFxuICB0ZW1wbGF0ZVVybDogJ2Ryb3Bkb3duLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdmYWRlJywgW1xuICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpLFxuICAgICAgc3RhdGUoJ2hpZGRlbicsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gICAgICB0cmFuc2l0aW9uKCd2aXNpYmxlID0+IGhpZGRlbicsIGFuaW1hdGUoJzE1MG1zIGxpbmVhcicpKSxcbiAgICAgIHRyYW5zaXRpb24oJ2hpZGRlbiA9PiB2aXNpYmxlJywgW3N0eWxlKHsgb3BhY2l0eTogMCB9KSwgYW5pbWF0ZSgnMTUwbXMgbGluZWFyJyldKSxcbiAgICBdKSxcbiAgXSxcbn0pXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L2NvbXBvbmVudC1jbGFzcy1zdWZmaXhcbmV4cG9ydCBjbGFzcyBNZGJEcm9wZG93bkRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgQWZ0ZXJDb250ZW50SW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2Ryb3Bkb3duVGVtcGxhdGUnKSBfdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG4gIEBDb250ZW50Q2hpbGQoTWRiRHJvcGRvd25Ub2dnbGVEaXJlY3RpdmUsIHsgcmVhZDogRWxlbWVudFJlZiB9KSBfZHJvcGRvd25Ub2dnbGU6IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGQoTWRiRHJvcGRvd25NZW51RGlyZWN0aXZlLCB7IHJlYWQ6IEVsZW1lbnRSZWYgfSkgX2Ryb3Bkb3duTWVudTogRWxlbWVudFJlZjtcblxuICBASW5wdXQoKVxuICBnZXQgYW5pbWF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9hbmltYXRpb247XG4gIH1cbiAgc2V0IGFuaW1hdGlvbih2YWx1ZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2FuaW1hdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gIH1cbiAgcHJpdmF0ZSBfYW5pbWF0aW9uID0gdHJ1ZTtcblxuICBASW5wdXQoKSBvZmZzZXQgPSAwO1xuICBASW5wdXQoKSBjbG9zZU9uT3V0c2lkZUNsaWNrID0gdHJ1ZTtcbiAgQElucHV0KCkgY2xvc2VPbkl0ZW1DbGljayA9IHRydWU7XG4gIEBJbnB1dCgpIGNsb3NlT25Fc2MgPSB0cnVlO1xuICBASW5wdXQoKSB3aXRoUHVzaCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBkcm9wZG93blNob3c6IEV2ZW50RW1pdHRlcjxNZGJEcm9wZG93bkRpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkcm9wZG93blNob3duOiBFdmVudEVtaXR0ZXI8TWRiRHJvcGRvd25EaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZHJvcGRvd25IaWRlOiBFdmVudEVtaXR0ZXI8TWRiRHJvcGRvd25EaXJlY3RpdmU+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZHJvcGRvd25IaWRkZW46IEV2ZW50RW1pdHRlcjxNZGJEcm9wZG93bkRpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBfb3ZlcmxheVJlZjogT3ZlcmxheVJlZjtcbiAgcHJpdmF0ZSBfcG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDtcbiAgcHJpdmF0ZSBfb3BlbiA9IGZhbHNlO1xuICBwcml2YXRlIF9pc0Ryb3BVcDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNEcm9wU3RhcnQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX2lzRHJvcEVuZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBfaXNEcm9wZG93bk1lbnVFbmQ6IGJvb2xlYW47XG4gIHByaXZhdGUgX3hQb3NpdGlvbjogc3RyaW5nO1xuXG4gIHByaXZhdGUgX2JyZWFrcG9pbnRzID0ge1xuICAgIGlzU206IHRoaXMuX2JyZWFrcG9pbnRPYnNlcnZlci5pc01hdGNoZWQoJyhtaW4td2lkdGg6IDU3NnB4KScpLFxuICAgIGlzTWQ6IHRoaXMuX2JyZWFrcG9pbnRPYnNlcnZlci5pc01hdGNoZWQoJyhtaW4td2lkdGg6IDc2OHB4KScpLFxuICAgIGlzTGc6IHRoaXMuX2JyZWFrcG9pbnRPYnNlcnZlci5pc01hdGNoZWQoJyhtaW4td2lkdGg6IDk5MnB4KScpLFxuICAgIGlzWGw6IHRoaXMuX2JyZWFrcG9pbnRPYnNlcnZlci5pc01hdGNoZWQoJyhtaW4td2lkdGg6IDEyMDBweCknKSxcbiAgICBpc1h4bDogdGhpcy5fYnJlYWtwb2ludE9ic2VydmVyLmlzTWF0Y2hlZCgnKG1pbi13aWR0aDogMTQwMHB4KScpLFxuICB9O1xuXG4gIHJlYWRvbmx5IF9kZXN0cm95JDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgX2JyZWFrcG9pbnRTdWJzY3JpcHRpb246IGFueTtcbiAgX2FuaW1hdGlvblN0YXRlID0gJ2hpZGRlbic7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcml2YXRlIF9vdmVybGF5UG9zaXRpb25CdWlsZGVyOiBPdmVybGF5UG9zaXRpb25CdWlsZGVyLFxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfdmNyOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgX2JyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyLFxuICAgIHByaXZhdGUgX2NkUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHt9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2JpbmREcm9wZG93blRvZ2dsZUNsaWNrKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fb3ZlcmxheVJlZi5kZXRhY2goKTtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGlzcG9zZSgpO1xuICAgIH1cblxuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYmluZERyb3Bkb3duVG9nZ2xlQ2xpY2soKTogdm9pZCB7XG4gICAgZnJvbUV2ZW50KHRoaXMuX2Ryb3Bkb3duVG9nZ2xlLm5hdGl2ZUVsZW1lbnQsICdjbGljaycpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnRvZ2dsZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZU92ZXJsYXlDb25maWcoKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgcmV0dXJuIG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIGhhc0JhY2tkcm9wOiBmYWxzZSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMucmVwb3NpdGlvbigpLFxuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fY3JlYXRlUG9zaXRpb25TdHJhdGVneSgpLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheSgpOiB2b2lkIHtcbiAgICB0aGlzLl9vdmVybGF5UmVmID0gdGhpcy5fb3ZlcmxheS5jcmVhdGUodGhpcy5fY3JlYXRlT3ZlcmxheUNvbmZpZygpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVBvc2l0aW9uU3RyYXRlZ3koKTogRmxleGlibGVDb25uZWN0ZWRQb3NpdGlvblN0cmF0ZWd5IHtcbiAgICBjb25zdCBwb3NpdGlvblN0cmF0ZWd5ID0gdGhpcy5fb3ZlcmxheVBvc2l0aW9uQnVpbGRlclxuICAgICAgLmZsZXhpYmxlQ29ubmVjdGVkVG8odGhpcy5fZHJvcGRvd25Ub2dnbGUpXG4gICAgICAud2l0aFBvc2l0aW9ucyh0aGlzLl9nZXRQb3NpdGlvbigpKVxuICAgICAgLndpdGhGbGV4aWJsZURpbWVuc2lvbnMoZmFsc2UpXG4gICAgICAud2l0aFB1c2godGhpcy53aXRoUHVzaCk7XG5cbiAgICByZXR1cm4gcG9zaXRpb25TdHJhdGVneTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBvc2l0aW9uKCk6IENvbm5lY3RlZFBvc2l0aW9uW10ge1xuICAgIHRoaXMuX2lzRHJvcFVwID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZHJvcHVwJyk7XG4gICAgdGhpcy5faXNEcm9wU3RhcnQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wc3RhcnQnKTtcbiAgICB0aGlzLl9pc0Ryb3BFbmQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZW5kJyk7XG4gICAgdGhpcy5faXNEcm9wZG93bk1lbnVFbmQgPVxuICAgICAgdGhpcy5fZHJvcGRvd25NZW51Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1tZW51LWVuZCcpO1xuICAgIHRoaXMuX3hQb3NpdGlvbiA9IHRoaXMuX2lzRHJvcGRvd25NZW51RW5kID8gJ2VuZCcgOiAnc3RhcnQnO1xuXG4gICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKC9kcm9wZG93bi1tZW51LShzbXxtZHxsZ3x4bHx4eGwpLShzdGFydHxlbmQpLywgJ2cnKTtcblxuICAgIGNvbnN0IHJlc3BvbnNpdmVDbGFzcyA9IHRoaXMuX2Ryb3Bkb3duTWVudS5uYXRpdmVFbGVtZW50LmNsYXNzTmFtZS5tYXRjaChyZWdleCk7XG5cbiAgICBpZiAocmVzcG9uc2l2ZUNsYXNzKSB7XG4gICAgICB0aGlzLl9zdWJzY3JpYmVCcmFrcG9pbnRzKCk7XG5cbiAgICAgIGNvbnN0IHBvc2l0aW9uUmVnZXggPSBuZXcgUmVnRXhwKC9zdGFydHxlbmQvLCAnZycpO1xuICAgICAgY29uc3QgYnJlYWtwb2ludFJlZ2V4ID0gbmV3IFJlZ0V4cCgvKHNtfG1kfGxnfHhsfHh4bCkvLCAnZycpO1xuXG4gICAgICBjb25zdCBkcm9wZG93blBvc2l0aW9uID0gcG9zaXRpb25SZWdleC5leGVjKHJlc3BvbnNpdmVDbGFzcylbMF07XG4gICAgICBjb25zdCBicmVha3BvaW50ID0gYnJlYWtwb2ludFJlZ2V4LmV4ZWMocmVzcG9uc2l2ZUNsYXNzKVswXTtcblxuICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgIGNhc2UgYnJlYWtwb2ludCA9PT0gJ3h4bCcgJiYgdGhpcy5fYnJlYWtwb2ludHMuaXNYeGw6XG4gICAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gZHJvcGRvd25Qb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBicmVha3BvaW50ID09PSAneGwnICYmIHRoaXMuX2JyZWFrcG9pbnRzLmlzWGw6XG4gICAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gZHJvcGRvd25Qb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBicmVha3BvaW50ID09PSAnbGcnICYmIHRoaXMuX2JyZWFrcG9pbnRzLmlzTGc6XG4gICAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gZHJvcGRvd25Qb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBicmVha3BvaW50ID09PSAnbWQnICYmIHRoaXMuX2JyZWFrcG9pbnRzLmlzTWQ6XG4gICAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gZHJvcGRvd25Qb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBicmVha3BvaW50ID09PSAnc20nICYmIHRoaXMuX2JyZWFrcG9pbnRzLmlzU206XG4gICAgICAgICAgdGhpcy5feFBvc2l0aW9uID0gZHJvcGRvd25Qb3NpdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcG9zaXRpb247XG5cbiAgICBjb25zdCBwb3NpdGlvbkRyb3B1cCA9IHtcbiAgICAgIG9yaWdpblg6IHRoaXMuX3hQb3NpdGlvbixcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6IHRoaXMuX3hQb3NpdGlvbixcbiAgICAgIG92ZXJsYXlZOiAnYm90dG9tJyxcbiAgICAgIG9mZnNldFk6IC10aGlzLm9mZnNldCxcbiAgICB9O1xuXG4gICAgY29uc3QgcG9zaXRpb25Ecm9wZG93biA9IHtcbiAgICAgIG9yaWdpblg6IHRoaXMuX3hQb3NpdGlvbixcbiAgICAgIG9yaWdpblk6ICdib3R0b20nLFxuICAgICAgb3ZlcmxheVg6IHRoaXMuX3hQb3NpdGlvbixcbiAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgIG9mZnNldFk6IHRoaXMub2Zmc2V0LFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvbkRyb3BzdGFydCA9IHtcbiAgICAgIG9yaWdpblg6ICdzdGFydCcsXG4gICAgICBvcmlnaW5ZOiAndG9wJyxcbiAgICAgIG92ZXJsYXlYOiAnZW5kJyxcbiAgICAgIG92ZXJsYXlZOiAndG9wJyxcbiAgICAgIG9mZnNldFg6IHRoaXMub2Zmc2V0LFxuICAgIH07XG5cbiAgICBjb25zdCBwb3NpdGlvbkRyb3BlbmQgPSB7XG4gICAgICBvcmlnaW5YOiAnZW5kJyxcbiAgICAgIG9yaWdpblk6ICd0b3AnLFxuICAgICAgb3ZlcmxheVg6ICdzdGFydCcsXG4gICAgICBvdmVybGF5WTogJ3RvcCcsXG4gICAgICBvZmZzZXRYOiAtdGhpcy5vZmZzZXQsXG4gICAgfTtcblxuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgY2FzZSB0aGlzLl9pc0Ryb3BFbmQ6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uRHJvcGVuZCwgcG9zaXRpb25Ecm9wc3RhcnRdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5faXNEcm9wU3RhcnQ6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uRHJvcHN0YXJ0LCBwb3NpdGlvbkRyb3BlbmRdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdGhpcy5faXNEcm9wVXA6XG4gICAgICAgIHBvc2l0aW9uID0gW3Bvc2l0aW9uRHJvcHVwLCBwb3NpdGlvbkRyb3Bkb3duXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwb3NpdGlvbiA9IFtwb3NpdGlvbkRyb3Bkb3duLCBwb3NpdGlvbkRyb3B1cF07XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlblRvRXNjS2V5dXAob3ZlcmxheVJlZjogT3ZlcmxheVJlZik6IE9ic2VydmFibGU8S2V5Ym9hcmRFdmVudD4ge1xuICAgIHJldHVybiBmcm9tRXZlbnQoZG9jdW1lbnQsICdrZXl1cCcpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiBldmVudC5rZXkgPT09ICdFc2NhcGUnKSxcbiAgICAgIHRha2VVbnRpbChvdmVybGF5UmVmLmRldGFjaG1lbnRzKCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlblRvQ2xpY2sob3ZlcmxheVJlZjogT3ZlcmxheVJlZiwgb3JpZ2luOiBIVE1MRWxlbWVudCk6IE9ic2VydmFibGU8TW91c2VFdmVudD4ge1xuICAgIHJldHVybiBmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICBmaWx0ZXIoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgY29uc3QgaXNJbnNpZGVNZW51ID0gdGhpcy5fZHJvcGRvd25NZW51Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0KTtcbiAgICAgICAgY29uc3Qgbm90VG9nZ2xlckljb24gPSAhdGhpcy5fZHJvcGRvd25Ub2dnbGUubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICBjb25zdCBub3RDdXN0b21Db250ZW50ID1cbiAgICAgICAgICAhaXNJbnNpZGVNZW51IHx8ICh0YXJnZXQuY2xhc3NMaXN0ICYmIHRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2Ryb3Bkb3duLWl0ZW0nKSk7XG4gICAgICAgIGNvbnN0IG5vdE9yaWdpbiA9IHRhcmdldCAhPT0gb3JpZ2luO1xuICAgICAgICByZXR1cm4gbm90T3JpZ2luICYmIG5vdFRvZ2dsZXJJY29uICYmIG5vdEN1c3RvbUNvbnRlbnQ7XG4gICAgICB9KSxcbiAgICAgIHRha2VVbnRpbChvdmVybGF5UmVmLmRldGFjaG1lbnRzKCkpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkFuaW1hdGlvbkVuZChldmVudDogQW5pbWF0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuZnJvbVN0YXRlID09PSAndmlzaWJsZScgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgIHRoaXMuX292ZXJsYXlSZWYuZGV0YWNoKCk7XG4gICAgICB0aGlzLl9vcGVuID0gZmFsc2U7XG4gICAgICB0aGlzLmRyb3Bkb3duSGlkZGVuLmVtaXQodGhpcyk7XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LmZyb21TdGF0ZSA9PT0gJ2hpZGRlbicgJiYgZXZlbnQudG9TdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICB0aGlzLmRyb3Bkb3duU2hvd24uZW1pdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zdWJzY3JpYmVCcmFrcG9pbnRzKCk6IHZvaWQge1xuICAgIGNvbnN0IGJyYWtwb2ludHMgPSBbXG4gICAgICAnKG1pbi13aWR0aDogNTc2cHgpJyxcbiAgICAgICcobWluLXdpZHRoOiA3NjhweCknLFxuICAgICAgJyhtaW4td2lkdGg6IDk5MnB4KScsXG4gICAgICAnKG1pbi13aWR0aDogMTIwMHB4KScsXG4gICAgICAnKG1pbi13aWR0aDogMTQwMHB4KScsXG4gICAgXTtcblxuICAgIHRoaXMuX2JyZWFrcG9pbnRTdWJzY3JpcHRpb24gPSB0aGlzLl9icmVha3BvaW50T2JzZXJ2ZXJcbiAgICAgIC5vYnNlcnZlKGJyYWtwb2ludHMpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5fZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2JyZWFrcG9pbnRzKS5mb3JFYWNoKChrZXksIGluZGV4KSA9PiB7XG4gICAgICAgICAgY29uc3QgYnJha3BvaW50VmFsdWUgPSBicmFrcG9pbnRzW2luZGV4XTtcbiAgICAgICAgICBjb25zdCBuZXdCcmVha3BvaW50ID0gcmVzdWx0LmJyZWFrcG9pbnRzW2JyYWtwb2ludFZhbHVlXTtcbiAgICAgICAgICBjb25zdCBpc0JyZWFrcG9pbnRDaGFuZ2VkID0gbmV3QnJlYWtwb2ludCAhPT0gdGhpcy5fYnJlYWtwb2ludHNba2V5XTtcblxuICAgICAgICAgIGlmICghaXNCcmVha3BvaW50Q2hhbmdlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2JyZWFrcG9pbnRzW2tleV0gPSBuZXdCcmVha3BvaW50O1xuXG4gICAgICAgICAgaWYgKHRoaXMuX29wZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX292ZXJsYXlSZWYudXBkYXRlUG9zaXRpb25TdHJhdGVneSh0aGlzLl9jcmVhdGVQb3NpdGlvblN0cmF0ZWd5KCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHNob3coKTogdm9pZCB7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5fb3ZlcmxheVJlZikge1xuICAgICAgdGhpcy5fY3JlYXRlT3ZlcmxheSgpO1xuICAgIH1cblxuICAgIHRoaXMuX3BvcnRhbCA9IG5ldyBUZW1wbGF0ZVBvcnRhbCh0aGlzLl90ZW1wbGF0ZSwgdGhpcy5fdmNyKTtcblxuICAgIHRoaXMuZHJvcGRvd25TaG93LmVtaXQodGhpcyk7XG5cbiAgICB0aGlzLl9vcGVuID0gdHJ1ZTtcbiAgICB0aGlzLl9vdmVybGF5UmVmLmF0dGFjaCh0aGlzLl9wb3J0YWwpO1xuXG4gICAgdGhpcy5fbGlzdGVuVG9Fc2NLZXl1cCh0aGlzLl9vdmVybGF5UmVmKS5zdWJzY3JpYmUoKGlzRXNjKSA9PiB7XG4gICAgICBpZiAoaXNFc2MgJiYgdGhpcy5jbG9zZU9uRXNjKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5fb3ZlcmxheVJlZlxuICAgICAgLmtleWRvd25FdmVudHMoKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuX292ZXJsYXlSZWYuZGV0YWNobWVudHMoKSkpXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICB0aGlzLl9oYW5kbGVLZXlib2FyZE5hdmlnYXRpb24oZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLl9saXN0ZW5Ub0NsaWNrKHRoaXMuX292ZXJsYXlSZWYsIHRoaXMuX2Ryb3Bkb3duVG9nZ2xlLm5hdGl2ZUVsZW1lbnQpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcbiAgICAgIGNvbnN0IGlzRHJvcGRvd25JdGVtID0gdGFyZ2V0LmNsYXNzTGlzdCAmJiB0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkcm9wZG93bi1pdGVtJyk7XG5cbiAgICAgIGlmICh0aGlzLmNsb3NlT25JdGVtQ2xpY2sgJiYgaXNEcm9wZG93bkl0ZW0pIHtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNsb3NlT25PdXRzaWRlQ2xpY2sgJiYgIWlzRHJvcGRvd25JdGVtKSB7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLl9hbmltYXRpb25TdGF0ZSA9ICd2aXNpYmxlJztcbiAgfVxuXG4gIHByaXZhdGUgX2hhbmRsZUtleWJvYXJkTmF2aWdhdGlvbihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGNvbnN0IGl0ZW1zOiBIVE1MRWxlbWVudFtdID0gQXJyYXkuZnJvbShcbiAgICAgIHRoaXMuX2Ryb3Bkb3duTWVudS5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wZG93bi1pdGVtJylcbiAgICApO1xuICAgIGNvbnN0IGtleSA9IGV2ZW50LmtleTtcbiAgICBjb25zdCBhY3RpdmVFbGVtZW50ID0gdGhpcy5fZHJvcGRvd25NZW51Lm5hdGl2ZUVsZW1lbnQub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuXG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBpbmRleCA9IGl0ZW1zLmluZGV4T2YoYWN0aXZlRWxlbWVudCk7XG5cbiAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpbmRleCA9IE1hdGgubWluKGluZGV4ICsgMSwgaXRlbXMubGVuZ3RoIC0gMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgICAgIGluZGV4ID0gaXRlbXMubGVuZ3RoIC0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpbmRleCA9IE1hdGgubWF4KGluZGV4IC0gMSwgMCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IG5leHRBY3RpdmVFbGVtZW50OiBIVE1MRWxlbWVudCA9IGl0ZW1zW2luZGV4XTtcblxuICAgIGlmIChuZXh0QWN0aXZlRWxlbWVudCkge1xuICAgICAgbmV4dEFjdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBoaWRlKCk6IHZvaWQge1xuICAgIHRoaXMuX2NkUmVmLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgaWYgKCF0aGlzLl9vcGVuKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5kcm9wZG93bkhpZGUuZW1pdCh0aGlzKTtcblxuICAgIHRoaXMuX2FuaW1hdGlvblN0YXRlID0gJ2hpZGRlbic7XG4gIH1cblxuICB0b2dnbGUoKTogdm9pZCB7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG5cbiAgICBpZiAodGhpcy5fb3Blbikge1xuICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2hvdygpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9hbmltYXRpb246IEJvb2xlYW5JbnB1dDtcbn1cbiIsIjxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjxuZy1jb250ZW50IHNlbGVjdD1cIi5kcm9wZG93bi10b2dnbGVcIj48L25nLWNvbnRlbnQ+XG48bmctdGVtcGxhdGUgI2Ryb3Bkb3duVGVtcGxhdGU+XG4gIDxkaXYgW0BmYWRlXT1cIl9hbmltYXRpb25TdGF0ZVwiIChAZmFkZS5kb25lKT1cIm9uQW5pbWF0aW9uRW5kKCRldmVudClcIiBbQC5kaXNhYmxlZF09XCIhYW5pbWF0aW9uXCI+XG4gICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiLmRyb3Bkb3duLW1lbnVcIj48L25nLWNvbnRlbnQ+XG4gIDwvZGl2PlxuPC9uZy10ZW1wbGF0ZT5cbiJdfQ==