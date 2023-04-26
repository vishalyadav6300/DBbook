import { CdkPortalOutlet } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, HostBinding, HostListener, Inject, ViewChild, } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/a11y";
import * as i2 from "@angular/common";
import * as i3 from "@angular/cdk/portal";
// width below which, according to css rules, modal position changes - modal gets position relative instead of absolute.
const MODAL_CSS_BREAKPOINT = 992;
const MODAL_OPEN_CLASS = 'modal-open';
const NON_INVASIVE_CLASS = 'modal-non-invasive-open';
const NON_INVASIVE_SHOW_CLASS = 'modal-non-invasive-show';
export class MdbModalContainerComponent {
    constructor(_document, _elementRef, _renderer, _focusTrapFactory, _ngZone) {
        this._document = _document;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._focusTrapFactory = _focusTrapFactory;
        this._ngZone = _ngZone;
        this._destroy$ = new Subject();
        this.backdropClick$ = new Subject();
        this.BACKDROP_TRANSITION = 150;
        this.MODAL_TRANSITION = 200;
        this.NON_INVASIVE_TRANSITION = 450;
        this.modal = true;
        this._isScrollable = false;
        this._isBottomRight = false;
        this._isBottomLeft = false;
        this._isTopRight = false;
        this._isTopLeft = false;
        this._isSideTopModal = false;
        this._isSideBottomModal = false;
        this._isSideModal = false;
        this._isModalBottom = false;
        this._topOffset = 0;
        this._leftOffset = 0;
        this._rightOffset = 0;
        this._bottomOffset = 0;
    }
    get hasAnimation() {
        return this._config.animation;
    }
    onWindowResize() {
        this._ngZone.runOutsideAngular(() => {
            if (this._config.nonInvasive) {
                this._handleWindowResize();
            }
        });
    }
    get host() {
        return this._elementRef.nativeElement;
    }
    ngOnInit() {
        this._updateContainerClass();
        this._renderer.setStyle(this.host, 'display', 'block');
        if (!this._config.nonInvasive) {
            this._focusTrap = this._focusTrapFactory.create(this.host);
            this._previouslyFocusedElement = this._document.activeElement;
        }
        if (this._config.animation) {
            setTimeout(() => {
                this._renderer.addClass(this.host, 'show');
                setTimeout(() => {
                    this._focusTrap?.focusInitialElementWhenReady();
                }, this.MODAL_TRANSITION);
            }, this.BACKDROP_TRANSITION);
        }
        else {
            this._focusTrap?.focusInitialElementWhenReady();
        }
    }
    ngAfterViewInit() {
        const widthWithVerticalScroll = this._document.body.offsetWidth;
        this._renderer.addClass(this._document.body, MODAL_OPEN_CLASS);
        if (this._config.nonInvasive) {
            this._renderer.addClass(this._document.body, NON_INVASIVE_CLASS);
            setTimeout(() => {
                this._onNonInvasiveModalShown();
            }, this.NON_INVASIVE_TRANSITION);
        }
        if (!this._config.nonInvasive) {
            this._renderer.setStyle(this._document.body, 'overflow', 'hidden');
        }
        const widthWithoutVerticalScroll = this._document.body.offsetWidth;
        if (!this._config.nonInvasive) {
            this._renderer.setStyle(this._document.body, 'padding-right', `${widthWithoutVerticalScroll - widthWithVerticalScroll}px`);
        }
        if (!this._config.ignoreBackdropClick && !this._config.nonInvasive) {
            fromEvent(this.host, 'mousedown')
                .pipe(filter((event) => {
                const target = event.target;
                const dialog = this.modalDialog.nativeElement;
                const notDialog = target !== dialog;
                const notDialogContent = !dialog.contains(target);
                return notDialog && notDialogContent;
            }), takeUntil(this._destroy$))
                .subscribe((event) => {
                this.backdropClick$.next(event);
            });
        }
    }
    ngOnDestroy() {
        this._previouslyFocusedElement?.focus();
        this._focusTrap?.destroy();
        this._destroy$.next();
        this._destroy$.complete();
    }
    _updateContainerClass() {
        if (this._config.containerClass === '' ||
            (this._config.containerClass.length && this._config.containerClass.length === 0)) {
            return;
        }
        const containerClasses = this._config.containerClass.split(' ');
        containerClasses.forEach((containerClass) => {
            this._renderer.addClass(this.host, containerClass);
        });
    }
    _onNonInvasiveModalShown() {
        this._isScrollable = this._config.modalClass.includes('modal-dialog-scrollable');
        this._isBottomRight = this._config.modalClass.includes('modal-bottom-right');
        this._isBottomLeft = this._config.modalClass.includes('modal-bottom-left');
        this._isTopRight = this._config.modalClass.includes('modal-top-right');
        this._isTopLeft = this._config.modalClass.includes('modal-top-left');
        this._isModalBottom = this._config.modalClass.includes('modal-bottom');
        this._isSideTopModal = this._isTopLeft || this._isTopRight;
        this._isSideBottomModal = this._isBottomLeft || this._isBottomRight;
        this._isSideModal = this._isSideTopModal || this._isSideBottomModal;
        this._modalContentRect = this.modalContent.nativeElement.getBoundingClientRect();
        this._modalContentComputedStyles = window.getComputedStyle(this.modalContent.nativeElement);
        this._modalDialogComputedStyles = window.getComputedStyle(this.modalDialog.nativeElement);
        this._topOffset = parseInt(this._modalDialogComputedStyles.top, 0);
        this._leftOffset = parseInt(this._modalDialogComputedStyles.left, 0);
        this._rightOffset = parseInt(this._modalDialogComputedStyles.right, 0);
        this._bottomOffset = parseInt(this._modalDialogComputedStyles.bottom, 0);
        this._renderer.addClass(this.host, NON_INVASIVE_SHOW_CLASS);
        this._setNonInvasiveStyles();
    }
    _setNonInvasiveStyles(leftOffset = 0, topOffset = 0) {
        const isAboveBreakpoint = window.innerWidth >= MODAL_CSS_BREAKPOINT;
        this._renderer.setStyle(this.host, 'left', `${this._modalContentRect.left + leftOffset}px`);
        this._renderer.setStyle(this.host, 'width', this._modalContentComputedStyles.width);
        if (!this._isScrollable) {
            // If the modal content is not long enough to require scroll shrink the modal wrapper to
            // the height of modal content so other elements on site are clickable outside modal
            this._renderer.setStyle(this.host, 'height', this._modalContentComputedStyles.height);
            this._renderer.setStyle(this.host, 'display', '');
        }
        if (isAboveBreakpoint) {
            if (this._isSideBottomModal || this._isModalBottom) {
                // Force modal to correct bottom placement. It's needed because modal host has position
                // fixed and fixed height.
                this._renderer.setStyle(this.host, 'top', `${this._modalContentRect.top + topOffset}px`);
            }
            if (this._isSideModal) {
                // Enable horizontal scrolling when the content is wider than the modal's fixed width
                this._renderer.setStyle(this.host, 'overflowX', 'auto');
            }
        }
    }
    _onNonInvasiveModalHidden() {
        this._renderer.removeClass(this.host, NON_INVASIVE_SHOW_CLASS);
        this._resetNonInvasiveStyles();
        this._removeNonInvasiveClass();
    }
    _resetNonInvasiveStyles() {
        this._renderer.setStyle(this.host, 'left', '');
        this._renderer.setStyle(this.host, 'top', '');
        this._renderer.setStyle(this.host, 'height', '');
        this._renderer.setStyle(this.host, 'width', '');
        if (!this._isScrollable) {
            this._renderer.setStyle(this.host, 'display', '');
        }
        if (this._isSideModal) {
            this._renderer.setStyle(this.host, 'overflowX', '');
        }
    }
    _removeNonInvasiveClass() {
        const isOtherModalOpen = this._document.body.querySelector('.modal.show.modal-non-invasive-show');
        if (!isOtherModalOpen) {
            this._renderer.removeClass(this._document.body, NON_INVASIVE_CLASS);
        }
        else {
            this._renderer.addClass(this._document.body, MODAL_OPEN_CLASS);
        }
    }
    _handleWindowResize() {
        const modalContent = this.host.querySelector('.modal-content');
        this._resetNonInvasiveStyles();
        this._modalContentRect = modalContent.getBoundingClientRect();
        this._modalContentComputedStyles = window.getComputedStyle(modalContent);
        if (this._isSideTopModal || this._isSideBottomModal) {
            let sideOffset = 0;
            let topOffset = 0;
            if (this._isBottomRight || this._isBottomLeft) {
                topOffset = -this._bottomOffset;
            }
            if (this._isBottomRight || this._isTopRight) {
                sideOffset = -this._rightOffset;
            }
            if (this._isBottomLeft || this._isTopLeft) {
                sideOffset = this._leftOffset;
            }
            this._setNonInvasiveStyles(sideOffset, topOffset);
        }
        else {
            this._setNonInvasiveStyles();
        }
    }
    _close() {
        if (this._config.animation) {
            this._renderer.removeClass(this.host, 'show');
        }
        // Pause iframe/video when closing modal
        const iframeElements = Array.from(this.host.querySelectorAll('iframe'));
        const videoElements = Array.from(this.host.querySelectorAll('video'));
        iframeElements.forEach((iframe) => {
            const srcAttribute = iframe.getAttribute('src');
            this._renderer.setAttribute(iframe, 'src', srcAttribute);
        });
        videoElements.forEach((video) => {
            video.pause();
        });
    }
    _restoreScrollbar() {
        this._renderer.removeClass(this._document.body, MODAL_OPEN_CLASS);
        this._renderer.removeStyle(this._document.body, 'overflow');
        this._renderer.removeStyle(this._document.body, 'padding-right');
    }
    attachComponentPortal(portal) {
        return this._portalOutlet.attachComponentPortal(portal);
    }
    attachTemplatePortal(portal) {
        return this._portalOutlet.attachTemplatePortal(portal);
    }
}
MdbModalContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalContainerComponent, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.ConfigurableFocusTrapFactory }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Component });
MdbModalContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbModalContainerComponent, selector: "mdb-modal-container", host: { listeners: { "window:resize": "onWindowResize($event)" }, properties: { "class.modal": "this.modal", "class.fade": "this.hasAnimation" } }, viewQueries: [{ propertyName: "_portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }, { propertyName: "modalDialog", first: true, predicate: ["dialog"], descendants: true, static: true }, { propertyName: "modalContent", first: true, predicate: ["content"], descendants: true, static: true }], ngImport: i0, template: "<div #dialog [class]=\"'modal-dialog' + (_config.modalClass ? ' ' + _config.modalClass : '')\">\n  <div\n    #content\n    class=\"modal-content\"\n    [ngClass]=\"{ 'rounded-0': _config.modalClass.includes('modal-frame') }\"\n  >\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i3.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.Default });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-modal-container', changeDetection: ChangeDetectionStrategy.Default, template: "<div #dialog [class]=\"'modal-dialog' + (_config.modalClass ? ' ' + _config.modalClass : '')\">\n  <div\n    #content\n    class=\"modal-content\"\n    [ngClass]=\"{ 'rounded-0': _config.modalClass.includes('modal-frame') }\"\n  >\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.ConfigurableFocusTrapFactory }, { type: i0.NgZone }]; }, propDecorators: { _portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }], modalDialog: [{
                type: ViewChild,
                args: ['dialog', { static: true }]
            }], modalContent: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }], modal: [{
                type: HostBinding,
                args: ['class.modal']
            }], hasAnimation: [{
                type: HostBinding,
                args: ['class.fade']
            }], onWindowResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9tb2RhbC9tb2RhbC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L21vZGFsL21vZGFsLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFtQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZGLE9BQU8sRUFFTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUlULFdBQVcsRUFDWCxZQUFZLEVBQ1osTUFBTSxFQUtOLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFFM0Msd0hBQXdIO0FBQ3hILE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDO0FBQ2pDLE1BQU0sZ0JBQWdCLEdBQUcsWUFBWSxDQUFDO0FBQ3RDLE1BQU0sa0JBQWtCLEdBQUcseUJBQXlCLENBQUM7QUFDckQsTUFBTSx1QkFBdUIsR0FBRyx5QkFBeUIsQ0FBQztBQU8xRCxNQUFNLE9BQU8sMEJBQTBCO0lBcURyQyxZQUM0QixTQUFTLEVBQzVCLFdBQXVCLEVBQ3RCLFNBQW9CLEVBQ3BCLGlCQUErQyxFQUMvQyxPQUFlO1FBSkcsY0FBUyxHQUFULFNBQVMsQ0FBQTtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUN0QixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBOEI7UUFDL0Ms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QyxRQUFRLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO2dCQUNHLFlBQVk7c0JBQW5ELFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtnQkFjVixLQUFLO3NCQUFoQyxXQUFXO3VCQUFDLGFBQWE7Z0JBRXRCLFlBQVk7c0JBRGYsV0FBVzt1QkFBQyxZQUFZO2dCQU16QixjQUFjO3NCQURiLFlBQVk7dUJBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2RrUG9ydGFsT3V0bGV0LCBDb21wb25lbnRQb3J0YWwsIFRlbXBsYXRlUG9ydGFsIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL3BvcnRhbCc7XG5pbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBDb21wb25lbnRSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSG9zdEJpbmRpbmcsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5qZWN0LFxuICBOZ1pvbmUsXG4gIE9uRGVzdHJveSxcbiAgT25Jbml0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZGJNb2RhbENvbmZpZyB9IGZyb20gJy4vbW9kYWwtY29uZmlnJztcbmltcG9ydCB7IENvbmZpZ3VyYWJsZUZvY3VzVHJhcEZhY3RvcnksIENvbmZpZ3VyYWJsZUZvY3VzVHJhcCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGZyb21FdmVudCwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbi8vIHdpZHRoIGJlbG93IHdoaWNoLCBhY2NvcmRpbmcgdG8gY3NzIHJ1bGVzLCBtb2RhbCBwb3NpdGlvbiBjaGFuZ2VzIC0gbW9kYWwgZ2V0cyBwb3NpdGlvbiByZWxhdGl2ZSBpbnN0ZWFkIG9mIGFic29sdXRlLlxuY29uc3QgTU9EQUxfQ1NTX0JSRUFLUE9JTlQgPSA5OTI7XG5jb25zdCBNT0RBTF9PUEVOX0NMQVNTID0gJ21vZGFsLW9wZW4nO1xuY29uc3QgTk9OX0lOVkFTSVZFX0NMQVNTID0gJ21vZGFsLW5vbi1pbnZhc2l2ZS1vcGVuJztcbmNvbnN0IE5PTl9JTlZBU0lWRV9TSE9XX0NMQVNTID0gJ21vZGFsLW5vbi1pbnZhc2l2ZS1zaG93JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWRiLW1vZGFsLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlVXJsOiAnbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5EZWZhdWx0LFxufSlcbmV4cG9ydCBjbGFzcyBNZGJNb2RhbENvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZChDZGtQb3J0YWxPdXRsZXQsIHsgc3RhdGljOiB0cnVlIH0pIF9wb3J0YWxPdXRsZXQ6IENka1BvcnRhbE91dGxldDtcbiAgQFZpZXdDaGlsZCgnZGlhbG9nJywgeyBzdGF0aWM6IHRydWUgfSkgbW9kYWxEaWFsb2c6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSBtb2RhbENvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcmVhZG9ubHkgX2Rlc3Ryb3kkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcbiAgcmVhZG9ubHkgYmFja2Ryb3BDbGljayQ6IFN1YmplY3Q8TW91c2VFdmVudD4gPSBuZXcgU3ViamVjdDxNb3VzZUV2ZW50PigpO1xuXG4gIF9jb25maWc6IE1kYk1vZGFsQ29uZmlnO1xuXG4gIEJBQ0tEUk9QX1RSQU5TSVRJT04gPSAxNTA7XG4gIE1PREFMX1RSQU5TSVRJT04gPSAyMDA7XG4gIE5PTl9JTlZBU0lWRV9UUkFOU0lUSU9OID0gNDUwO1xuXG4gIHByaXZhdGUgX3ByZXZpb3VzbHlGb2N1c2VkRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2ZvY3VzVHJhcDogQ29uZmlndXJhYmxlRm9jdXNUcmFwO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MubW9kYWwnKSBtb2RhbCA9IHRydWU7XG4gIEBIb3N0QmluZGluZygnY2xhc3MuZmFkZScpXG4gIGdldCBoYXNBbmltYXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5hbmltYXRpb247XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJywgWyckZXZlbnQnXSlcbiAgb25XaW5kb3dSZXNpemUoKSB7XG4gICAgdGhpcy5fbmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLl9jb25maWcubm9uSW52YXNpdmUpIHtcbiAgICAgICAgdGhpcy5faGFuZGxlV2luZG93UmVzaXplKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXQgaG9zdCgpOiBIVE1MRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzU2Nyb2xsYWJsZSA9IGZhbHNlO1xuICBwcml2YXRlIF9pc0JvdHRvbVJpZ2h0ID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzQm90dG9tTGVmdCA9IGZhbHNlO1xuICBwcml2YXRlIF9pc1RvcFJpZ2h0ID0gZmFsc2U7XG4gIHByaXZhdGUgX2lzVG9wTGVmdCA9IGZhbHNlO1xuICBwcml2YXRlIF9pc1NpZGVUb3BNb2RhbCA9IGZhbHNlO1xuICBwcml2YXRlIF9pc1NpZGVCb3R0b21Nb2RhbCA9IGZhbHNlO1xuICBwcml2YXRlIF9pc1NpZGVNb2RhbCA9IGZhbHNlO1xuICBwcml2YXRlIF9pc01vZGFsQm90dG9tID0gZmFsc2U7XG4gIHByaXZhdGUgX21vZGFsQ29udGVudFJlY3Q6IG51bGwgfCBET01SZWN0UmVhZE9ubHk7XG4gIHByaXZhdGUgX21vZGFsQ29udGVudENvbXB1dGVkU3R5bGVzOiBudWxsIHwgQ1NTU3R5bGVEZWNsYXJhdGlvbjtcbiAgcHJpdmF0ZSBfbW9kYWxEaWFsb2dDb21wdXRlZFN0eWxlczogbnVsbCB8IENTU1N0eWxlRGVjbGFyYXRpb247XG4gIHByaXZhdGUgX3RvcE9mZnNldCA9IDA7XG4gIHByaXZhdGUgX2xlZnRPZmZzZXQgPSAwO1xuICBwcml2YXRlIF9yaWdodE9mZnNldCA9IDA7XG4gIHByaXZhdGUgX2JvdHRvbU9mZnNldCA9IDA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQsXG4gICAgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfZm9jdXNUcmFwRmFjdG9yeTogQ29uZmlndXJhYmxlRm9jdXNUcmFwRmFjdG9yeSxcbiAgICBwcml2YXRlIF9uZ1pvbmU6IE5nWm9uZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlQ29udGFpbmVyQ2xhc3MoKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG5cbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5ub25JbnZhc2l2ZSkge1xuICAgICAgdGhpcy5fZm9jdXNUcmFwID0gdGhpcy5fZm9jdXNUcmFwRmFjdG9yeS5jcmVhdGUodGhpcy5ob3N0KTtcbiAgICAgIHRoaXMuX3ByZXZpb3VzbHlGb2N1c2VkRWxlbWVudCA9IHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3QsICdzaG93Jyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fZm9jdXNUcmFwPy5mb2N1c0luaXRpYWxFbGVtZW50V2hlblJlYWR5KCk7XG4gICAgICAgIH0sIHRoaXMuTU9EQUxfVFJBTlNJVElPTik7XG4gICAgICB9LCB0aGlzLkJBQ0tEUk9QX1RSQU5TSVRJT04pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9mb2N1c1RyYXA/LmZvY3VzSW5pdGlhbEVsZW1lbnRXaGVuUmVhZHkoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgY29uc3Qgd2lkdGhXaXRoVmVydGljYWxTY3JvbGwgPSB0aGlzLl9kb2N1bWVudC5ib2R5Lm9mZnNldFdpZHRoO1xuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2RvY3VtZW50LmJvZHksIE1PREFMX09QRU5fQ0xBU1MpO1xuXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5ub25JbnZhc2l2ZSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgTk9OX0lOVkFTSVZFX0NMQVNTKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9vbk5vbkludmFzaXZlTW9kYWxTaG93bigpO1xuICAgICAgfSwgdGhpcy5OT05fSU5WQVNJVkVfVFJBTlNJVElPTik7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jb25maWcubm9uSW52YXNpdmUpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX2RvY3VtZW50LmJvZHksICdvdmVyZmxvdycsICdoaWRkZW4nKTtcbiAgICB9XG5cbiAgICBjb25zdCB3aWR0aFdpdGhvdXRWZXJ0aWNhbFNjcm9sbCA9IHRoaXMuX2RvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGg7XG5cbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5ub25JbnZhc2l2ZSkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuX2RvY3VtZW50LmJvZHksXG4gICAgICAgICdwYWRkaW5nLXJpZ2h0JyxcbiAgICAgICAgYCR7d2lkdGhXaXRob3V0VmVydGljYWxTY3JvbGwgLSB3aWR0aFdpdGhWZXJ0aWNhbFNjcm9sbH1weGBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9jb25maWcuaWdub3JlQmFja2Ryb3BDbGljayAmJiAhdGhpcy5fY29uZmlnLm5vbkludmFzaXZlKSB7XG4gICAgICBmcm9tRXZlbnQodGhpcy5ob3N0LCAnbW91c2Vkb3duJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgZGlhbG9nID0gdGhpcy5tb2RhbERpYWxvZy5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgY29uc3Qgbm90RGlhbG9nID0gdGFyZ2V0ICE9PSBkaWFsb2c7XG4gICAgICAgICAgICBjb25zdCBub3REaWFsb2dDb250ZW50ID0gIWRpYWxvZy5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICAgICAgcmV0dXJuIG5vdERpYWxvZyAmJiBub3REaWFsb2dDb250ZW50O1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9kZXN0cm95JClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuYmFja2Ryb3BDbGljayQubmV4dChldmVudCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3ByZXZpb3VzbHlGb2N1c2VkRWxlbWVudD8uZm9jdXMoKTtcbiAgICB0aGlzLl9mb2N1c1RyYXA/LmRlc3Ryb3koKTtcblxuICAgIHRoaXMuX2Rlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLl9kZXN0cm95JC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlQ29udGFpbmVyQ2xhc3MoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5fY29uZmlnLmNvbnRhaW5lckNsYXNzID09PSAnJyB8fFxuICAgICAgKHRoaXMuX2NvbmZpZy5jb250YWluZXJDbGFzcy5sZW5ndGggJiYgdGhpcy5fY29uZmlnLmNvbnRhaW5lckNsYXNzLmxlbmd0aCA9PT0gMClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb250YWluZXJDbGFzc2VzID0gdGhpcy5fY29uZmlnLmNvbnRhaW5lckNsYXNzLnNwbGl0KCcgJyk7XG5cbiAgICBjb250YWluZXJDbGFzc2VzLmZvckVhY2goKGNvbnRhaW5lckNsYXNzKSA9PiB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmhvc3QsIGNvbnRhaW5lckNsYXNzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX29uTm9uSW52YXNpdmVNb2RhbFNob3duKCkge1xuICAgIHRoaXMuX2lzU2Nyb2xsYWJsZSA9IHRoaXMuX2NvbmZpZy5tb2RhbENsYXNzLmluY2x1ZGVzKCdtb2RhbC1kaWFsb2ctc2Nyb2xsYWJsZScpO1xuICAgIHRoaXMuX2lzQm90dG9tUmlnaHQgPSB0aGlzLl9jb25maWcubW9kYWxDbGFzcy5pbmNsdWRlcygnbW9kYWwtYm90dG9tLXJpZ2h0Jyk7XG4gICAgdGhpcy5faXNCb3R0b21MZWZ0ID0gdGhpcy5fY29uZmlnLm1vZGFsQ2xhc3MuaW5jbHVkZXMoJ21vZGFsLWJvdHRvbS1sZWZ0Jyk7XG4gICAgdGhpcy5faXNUb3BSaWdodCA9IHRoaXMuX2NvbmZpZy5tb2RhbENsYXNzLmluY2x1ZGVzKCdtb2RhbC10b3AtcmlnaHQnKTtcbiAgICB0aGlzLl9pc1RvcExlZnQgPSB0aGlzLl9jb25maWcubW9kYWxDbGFzcy5pbmNsdWRlcygnbW9kYWwtdG9wLWxlZnQnKTtcbiAgICB0aGlzLl9pc01vZGFsQm90dG9tID0gdGhpcy5fY29uZmlnLm1vZGFsQ2xhc3MuaW5jbHVkZXMoJ21vZGFsLWJvdHRvbScpO1xuICAgIHRoaXMuX2lzU2lkZVRvcE1vZGFsID0gdGhpcy5faXNUb3BMZWZ0IHx8IHRoaXMuX2lzVG9wUmlnaHQ7XG4gICAgdGhpcy5faXNTaWRlQm90dG9tTW9kYWwgPSB0aGlzLl9pc0JvdHRvbUxlZnQgfHwgdGhpcy5faXNCb3R0b21SaWdodDtcbiAgICB0aGlzLl9pc1NpZGVNb2RhbCA9IHRoaXMuX2lzU2lkZVRvcE1vZGFsIHx8IHRoaXMuX2lzU2lkZUJvdHRvbU1vZGFsO1xuICAgIHRoaXMuX21vZGFsQ29udGVudFJlY3QgPSB0aGlzLm1vZGFsQ29udGVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHRoaXMuX21vZGFsQ29udGVudENvbXB1dGVkU3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5tb2RhbENvbnRlbnQubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5fbW9kYWxEaWFsb2dDb21wdXRlZFN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMubW9kYWxEaWFsb2cubmF0aXZlRWxlbWVudCk7XG4gICAgdGhpcy5fdG9wT2Zmc2V0ID0gcGFyc2VJbnQodGhpcy5fbW9kYWxEaWFsb2dDb21wdXRlZFN0eWxlcy50b3AsIDApO1xuICAgIHRoaXMuX2xlZnRPZmZzZXQgPSBwYXJzZUludCh0aGlzLl9tb2RhbERpYWxvZ0NvbXB1dGVkU3R5bGVzLmxlZnQsIDApO1xuICAgIHRoaXMuX3JpZ2h0T2Zmc2V0ID0gcGFyc2VJbnQodGhpcy5fbW9kYWxEaWFsb2dDb21wdXRlZFN0eWxlcy5yaWdodCwgMCk7XG4gICAgdGhpcy5fYm90dG9tT2Zmc2V0ID0gcGFyc2VJbnQodGhpcy5fbW9kYWxEaWFsb2dDb21wdXRlZFN0eWxlcy5ib3R0b20sIDApO1xuXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5ob3N0LCBOT05fSU5WQVNJVkVfU0hPV19DTEFTUyk7XG4gICAgdGhpcy5fc2V0Tm9uSW52YXNpdmVTdHlsZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldE5vbkludmFzaXZlU3R5bGVzKGxlZnRPZmZzZXQgPSAwLCB0b3BPZmZzZXQgPSAwKSB7XG4gICAgY29uc3QgaXNBYm92ZUJyZWFrcG9pbnQgPSB3aW5kb3cuaW5uZXJXaWR0aCA+PSBNT0RBTF9DU1NfQlJFQUtQT0lOVDtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdsZWZ0JywgYCR7dGhpcy5fbW9kYWxDb250ZW50UmVjdC5sZWZ0ICsgbGVmdE9mZnNldH1weGApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ3dpZHRoJywgdGhpcy5fbW9kYWxDb250ZW50Q29tcHV0ZWRTdHlsZXMud2lkdGgpO1xuXG4gICAgaWYgKCF0aGlzLl9pc1Njcm9sbGFibGUpIHtcbiAgICAgIC8vIElmIHRoZSBtb2RhbCBjb250ZW50IGlzIG5vdCBsb25nIGVub3VnaCB0byByZXF1aXJlIHNjcm9sbCBzaHJpbmsgdGhlIG1vZGFsIHdyYXBwZXIgdG9cbiAgICAgIC8vIHRoZSBoZWlnaHQgb2YgbW9kYWwgY29udGVudCBzbyBvdGhlciBlbGVtZW50cyBvbiBzaXRlIGFyZSBjbGlja2FibGUgb3V0c2lkZSBtb2RhbFxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAnaGVpZ2h0JywgdGhpcy5fbW9kYWxDb250ZW50Q29tcHV0ZWRTdHlsZXMuaGVpZ2h0KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2Rpc3BsYXknLCAnJyk7XG4gICAgfVxuXG4gICAgaWYgKGlzQWJvdmVCcmVha3BvaW50KSB7XG4gICAgICBpZiAodGhpcy5faXNTaWRlQm90dG9tTW9kYWwgfHwgdGhpcy5faXNNb2RhbEJvdHRvbSkge1xuICAgICAgICAvLyBGb3JjZSBtb2RhbCB0byBjb3JyZWN0IGJvdHRvbSBwbGFjZW1lbnQuIEl0J3MgbmVlZGVkIGJlY2F1c2UgbW9kYWwgaG9zdCBoYXMgcG9zaXRpb25cbiAgICAgICAgLy8gZml4ZWQgYW5kIGZpeGVkIGhlaWdodC5cbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAndG9wJywgYCR7dGhpcy5fbW9kYWxDb250ZW50UmVjdC50b3AgKyB0b3BPZmZzZXR9cHhgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2lzU2lkZU1vZGFsKSB7XG4gICAgICAgIC8vIEVuYWJsZSBob3Jpem9udGFsIHNjcm9sbGluZyB3aGVuIHRoZSBjb250ZW50IGlzIHdpZGVyIHRoYW4gdGhlIG1vZGFsJ3MgZml4ZWQgd2lkdGhcbiAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAnb3ZlcmZsb3dYJywgJ2F1dG8nKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfb25Ob25JbnZhc2l2ZU1vZGFsSGlkZGVuKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuaG9zdCwgTk9OX0lOVkFTSVZFX1NIT1dfQ0xBU1MpO1xuICAgIHRoaXMuX3Jlc2V0Tm9uSW52YXNpdmVTdHlsZXMoKTtcbiAgICB0aGlzLl9yZW1vdmVOb25JbnZhc2l2ZUNsYXNzKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldE5vbkludmFzaXZlU3R5bGVzKCkge1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2xlZnQnLCAnJyk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAndG9wJywgJycpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuaG9zdCwgJ2hlaWdodCcsICcnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICd3aWR0aCcsICcnKTtcblxuICAgIGlmICghdGhpcy5faXNTY3JvbGxhYmxlKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmhvc3QsICdkaXNwbGF5JywgJycpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9pc1NpZGVNb2RhbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ob3N0LCAnb3ZlcmZsb3dYJywgJycpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vbkludmFzaXZlQ2xhc3MoKSB7XG4gICAgY29uc3QgaXNPdGhlck1vZGFsT3BlbiA9IHRoaXMuX2RvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihcbiAgICAgICcubW9kYWwuc2hvdy5tb2RhbC1ub24taW52YXNpdmUtc2hvdydcbiAgICApO1xuICAgIGlmICghaXNPdGhlck1vZGFsT3Blbikge1xuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgTk9OX0lOVkFTSVZFX0NMQVNTKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZG9jdW1lbnQuYm9keSwgTU9EQUxfT1BFTl9DTEFTUyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaGFuZGxlV2luZG93UmVzaXplKCkge1xuICAgIGNvbnN0IG1vZGFsQ29udGVudCA9IHRoaXMuaG9zdC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29udGVudCcpO1xuICAgIHRoaXMuX3Jlc2V0Tm9uSW52YXNpdmVTdHlsZXMoKTtcblxuICAgIHRoaXMuX21vZGFsQ29udGVudFJlY3QgPSBtb2RhbENvbnRlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgdGhpcy5fbW9kYWxDb250ZW50Q29tcHV0ZWRTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShtb2RhbENvbnRlbnQpO1xuXG4gICAgaWYgKHRoaXMuX2lzU2lkZVRvcE1vZGFsIHx8IHRoaXMuX2lzU2lkZUJvdHRvbU1vZGFsKSB7XG4gICAgICBsZXQgc2lkZU9mZnNldCA9IDA7XG4gICAgICBsZXQgdG9wT2Zmc2V0ID0gMDtcbiAgICAgIGlmICh0aGlzLl9pc0JvdHRvbVJpZ2h0IHx8IHRoaXMuX2lzQm90dG9tTGVmdCkge1xuICAgICAgICB0b3BPZmZzZXQgPSAtdGhpcy5fYm90dG9tT2Zmc2V0O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2lzQm90dG9tUmlnaHQgfHwgdGhpcy5faXNUb3BSaWdodCkge1xuICAgICAgICBzaWRlT2Zmc2V0ID0gLXRoaXMuX3JpZ2h0T2Zmc2V0O1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuX2lzQm90dG9tTGVmdCB8fCB0aGlzLl9pc1RvcExlZnQpIHtcbiAgICAgICAgc2lkZU9mZnNldCA9IHRoaXMuX2xlZnRPZmZzZXQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NldE5vbkludmFzaXZlU3R5bGVzKHNpZGVPZmZzZXQsIHRvcE9mZnNldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NldE5vbkludmFzaXZlU3R5bGVzKCk7XG4gICAgfVxuICB9XG5cbiAgX2Nsb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jb25maWcuYW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmhvc3QsICdzaG93Jyk7XG4gICAgfVxuXG4gICAgLy8gUGF1c2UgaWZyYW1lL3ZpZGVvIHdoZW4gY2xvc2luZyBtb2RhbFxuICAgIGNvbnN0IGlmcmFtZUVsZW1lbnRzID0gQXJyYXkuZnJvbSh0aGlzLmhvc3QucXVlcnlTZWxlY3RvckFsbCgnaWZyYW1lJykpO1xuICAgIGNvbnN0IHZpZGVvRWxlbWVudHMgPSBBcnJheS5mcm9tKHRoaXMuaG9zdC5xdWVyeVNlbGVjdG9yQWxsKCd2aWRlbycpKTtcblxuICAgIGlmcmFtZUVsZW1lbnRzLmZvckVhY2goKGlmcmFtZTogSFRNTElGcmFtZUVsZW1lbnQpID0+IHtcbiAgICAgIGNvbnN0IHNyY0F0dHJpYnV0ZTogYW55ID0gaWZyYW1lLmdldEF0dHJpYnV0ZSgnc3JjJyk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUoaWZyYW1lLCAnc3JjJywgc3JjQXR0cmlidXRlKTtcbiAgICB9KTtcblxuICAgIHZpZGVvRWxlbWVudHMuZm9yRWFjaCgodmlkZW86IEhUTUxWaWRlb0VsZW1lbnQpID0+IHtcbiAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgfSk7XG4gIH1cblxuICBfcmVzdG9yZVNjcm9sbGJhcigpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLl9kb2N1bWVudC5ib2R5LCBNT0RBTF9PUEVOX0NMQVNTKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9kb2N1bWVudC5ib2R5LCAnb3ZlcmZsb3cnKTtcbiAgICB0aGlzLl9yZW5kZXJlci5yZW1vdmVTdHlsZSh0aGlzLl9kb2N1bWVudC5ib2R5LCAncGFkZGluZy1yaWdodCcpO1xuICB9XG5cbiAgYXR0YWNoQ29tcG9uZW50UG9ydGFsPFQ+KHBvcnRhbDogQ29tcG9uZW50UG9ydGFsPFQ+KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcG9ydGFsT3V0bGV0LmF0dGFjaENvbXBvbmVudFBvcnRhbChwb3J0YWwpO1xuICB9XG5cbiAgYXR0YWNoVGVtcGxhdGVQb3J0YWw8Qz4ocG9ydGFsOiBUZW1wbGF0ZVBvcnRhbDxDPik6IEVtYmVkZGVkVmlld1JlZjxDPiB7XG4gICAgcmV0dXJuIHRoaXMuX3BvcnRhbE91dGxldC5hdHRhY2hUZW1wbGF0ZVBvcnRhbChwb3J0YWwpO1xuICB9XG59XG4iLCI8ZGl2ICNkaWFsb2cgW2NsYXNzXT1cIidtb2RhbC1kaWFsb2cnICsgKF9jb25maWcubW9kYWxDbGFzcyA/ICcgJyArIF9jb25maWcubW9kYWxDbGFzcyA6ICcnKVwiPlxuICA8ZGl2XG4gICAgI2NvbnRlbnRcbiAgICBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIlxuICAgIFtuZ0NsYXNzXT1cInsgJ3JvdW5kZWQtMCc6IF9jb25maWcubW9kYWxDbGFzcy5pbmNsdWRlcygnbW9kYWwtZnJhbWUnKSB9XCJcbiAgPlxuICAgIDxuZy10ZW1wbGF0ZSBjZGtQb3J0YWxPdXRsZXQ+PC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==