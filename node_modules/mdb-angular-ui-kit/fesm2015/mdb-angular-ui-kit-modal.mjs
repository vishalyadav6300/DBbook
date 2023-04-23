import { Subject, fromEvent } from 'rxjs';
import * as i2 from '@angular/cdk/portal';
import { CdkPortalOutlet, ComponentPortal, TemplatePortal, PortalModule } from '@angular/cdk/portal';
import * as i0 from '@angular/core';
import { Component, ChangeDetectionStrategy, Inject, ViewChild, HostBinding, TemplateRef, Injector, Injectable, NgModule } from '@angular/core';
import { filter, takeUntil, take } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import * as i1 from '@angular/cdk/a11y';
import * as i1$1 from '@angular/cdk/overlay';
import { OverlayConfig, OverlayModule } from '@angular/cdk/overlay';

/* eslint-disable @typescript-eslint/no-inferrable-types */
class MdbModalConfig {
    constructor() {
        this.animation = true;
        this.backdrop = true;
        this.ignoreBackdropClick = false;
        this.keyboard = true;
        this.modalClass = '';
        this.containerClass = '';
        this.data = null;
    }
}

class MdbModalRef {
    constructor(_overlayRef, _container) {
        this._overlayRef = _overlayRef;
        this._container = _container;
        this.onClose$ = new Subject();
        this.onClose = this.onClose$.asObservable();
    }
    close(message) {
        this._container._close();
        setTimeout(() => {
            this._container._restoreScrollbar();
            this.onClose$.next(message);
            this.onClose$.complete();
            this._overlayRef.detach();
            this._overlayRef.dispose();
        }, this._container.MODAL_TRANSITION);
    }
}

class MdbModalContainerComponent {
    constructor(_document, _elementRef, _renderer, _focusTrapFactory) {
        this._document = _document;
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._focusTrapFactory = _focusTrapFactory;
        this._destroy$ = new Subject();
        this.backdropClick$ = new Subject();
        this.BACKDROP_TRANSITION = 150;
        this.MODAL_TRANSITION = 200;
        this.modal = true;
    }
    get hasAnimation() {
        return this._config.animation;
    }
    ngOnInit() {
        this._updateContainerClass();
        this._renderer.setStyle(this._elementRef.nativeElement, 'display', 'block');
        this._previouslyFocusedElement = this._document.activeElement;
        this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
        if (this._config.animation) {
            setTimeout(() => {
                this._renderer.addClass(this._elementRef.nativeElement, 'show');
                setTimeout(() => {
                    this._focusTrap.focusInitialElementWhenReady();
                }, this.MODAL_TRANSITION);
            }, this.BACKDROP_TRANSITION);
        }
        else {
            this._focusTrap.focusInitialElementWhenReady();
        }
    }
    ngAfterViewInit() {
        const widthWithVerticalScroll = this._document.body.offsetWidth;
        this._renderer.addClass(this._document.body, 'modal-open');
        const widthWithoutVerticalScroll = this._document.body.offsetWidth;
        this._renderer.setStyle(this._document.body, 'padding-right', `${widthWithoutVerticalScroll - widthWithVerticalScroll}px`);
        if (!this._config.ignoreBackdropClick) {
            fromEvent(this._elementRef.nativeElement, 'mousedown')
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
        this._previouslyFocusedElement.focus();
        this._focusTrap.destroy();
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
            this._renderer.addClass(this._elementRef.nativeElement, containerClass);
        });
    }
    _close() {
        if (this._config.animation) {
            this._renderer.removeClass(this._elementRef.nativeElement, 'show');
        }
        // Pause iframe/video when closing modal
        const iframeElements = Array.from(this._elementRef.nativeElement.querySelectorAll('iframe'));
        const videoElements = Array.from(this._elementRef.nativeElement.querySelectorAll('video'));
        iframeElements.forEach((iframe) => {
            const srcAttribute = iframe.getAttribute('src');
            this._renderer.setAttribute(iframe, 'src', srcAttribute);
        });
        videoElements.forEach((video) => {
            video.pause();
        });
    }
    _restoreScrollbar() {
        this._renderer.removeClass(this._document.body, 'modal-open');
        this._renderer.removeStyle(this._document.body, 'padding-right');
    }
    attachComponentPortal(portal) {
        return this._portalOutlet.attachComponentPortal(portal);
    }
    attachTemplatePortal(portal) {
        return this._portalOutlet.attachTemplatePortal(portal);
    }
}
MdbModalContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalContainerComponent, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.ConfigurableFocusTrapFactory }], target: i0.ɵɵFactoryTarget.Component });
MdbModalContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbModalContainerComponent, selector: "mdb-modal-container", host: { properties: { "class.modal": "this.modal", "class.fade": "this.hasAnimation" } }, viewQueries: [{ propertyName: "_portalOutlet", first: true, predicate: CdkPortalOutlet, descendants: true, static: true }, { propertyName: "modalDialog", first: true, predicate: ["dialog"], descendants: true, static: true }], ngImport: i0, template: "<div #dialog [class]=\"'modal-dialog' + (_config.modalClass ? ' ' + _config.modalClass : '')\">\n  <div class=\"modal-content\">\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i2.CdkPortalOutlet, selector: "[cdkPortalOutlet]", inputs: ["cdkPortalOutlet"], outputs: ["attached"], exportAs: ["cdkPortalOutlet"] }], changeDetection: i0.ChangeDetectionStrategy.Default });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-modal-container', changeDetection: ChangeDetectionStrategy.Default, template: "<div #dialog [class]=\"'modal-dialog' + (_config.modalClass ? ' ' + _config.modalClass : '')\">\n  <div class=\"modal-content\">\n    <ng-template cdkPortalOutlet></ng-template>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.ConfigurableFocusTrapFactory }];
    }, propDecorators: { _portalOutlet: [{
                type: ViewChild,
                args: [CdkPortalOutlet, { static: true }]
            }], modalDialog: [{
                type: ViewChild,
                args: ['dialog', { static: true }]
            }], modal: [{
                type: HostBinding,
                args: ['class.modal']
            }], hasAnimation: [{
                type: HostBinding,
                args: ['class.fade']
            }] } });

class MdbModalService {
    constructor(_document, _overlay, _injector, _cfr) {
        this._document = _document;
        this._overlay = _overlay;
        this._injector = _injector;
        this._cfr = _cfr;
    }
    open(componentOrTemplateRef, config) {
        const defaultConfig = new MdbModalConfig();
        config = config ? Object.assign(defaultConfig, config) : defaultConfig;
        const overlayRef = this._createOverlay(config);
        const container = this._createContainer(overlayRef, config);
        const modalRef = this._createContent(componentOrTemplateRef, container, overlayRef, config);
        this._registerListeners(modalRef, config, container);
        return modalRef;
    }
    _createOverlay(config) {
        const overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    }
    _getOverlayConfig(modalConfig) {
        const config = new OverlayConfig({
            positionStrategy: this._overlay.position().global(),
            scrollStrategy: this._overlay.scrollStrategies.noop(),
            hasBackdrop: modalConfig.backdrop,
            backdropClass: 'mdb-backdrop',
        });
        return config;
    }
    _createContainer(overlayRef, config) {
        const portal = new ComponentPortal(MdbModalContainerComponent, null, this._injector, this._cfr);
        const containerRef = overlayRef.attach(portal);
        containerRef.instance._config = config;
        return containerRef.instance;
    }
    _createContent(componentOrTemplate, container, overlayRef, config) {
        const modalRef = new MdbModalRef(overlayRef, container);
        if (componentOrTemplate instanceof TemplateRef) {
            container.attachTemplatePortal(new TemplatePortal(componentOrTemplate, null, {
                $implicit: config.data,
                modalRef,
            }));
        }
        else {
            const injector = this._createInjector(config, modalRef, container);
            const contentRef = container.attachComponentPortal(new ComponentPortal(componentOrTemplate, config.viewContainerRef, injector));
            if (config.data) {
                Object.assign(contentRef.instance, Object.assign({}, config.data));
            }
        }
        return modalRef;
    }
    _createInjector(config, modalRef, container) {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        // The dialog container should be provided as the dialog container and the dialog's
        // content are created out of the same `ViewContainerRef` and as such, are siblings
        // for injector purposes. To allow the hierarchy that is expected, the dialog
        // container is explicitly provided in the injector.
        const providers = [
            { provide: MdbModalContainerComponent, useValue: container },
            { provide: MdbModalRef, useValue: modalRef },
        ];
        return Injector.create({ parent: userInjector || this._injector, providers });
    }
    _registerListeners(modalRef, config, container) {
        container.backdropClick$.pipe(take(1)).subscribe(() => {
            modalRef.close();
        });
        if (config.keyboard) {
            fromEvent(container._elementRef.nativeElement, 'keydown')
                .pipe(filter((event) => {
                return event.key === 'Escape';
            }), take(1))
                .subscribe(() => {
                modalRef.close();
            });
        }
    }
}
MdbModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalService, deps: [{ token: DOCUMENT }, { token: i1$1.Overlay }, { token: i0.Injector }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
MdbModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalService, decorators: [{
            type: Injectable
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i1$1.Overlay }, { type: i0.Injector }, { type: i0.ComponentFactoryResolver }];
    } });

class MdbModalModule {
}
MdbModalModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbModalModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: MdbModalModule, declarations: [MdbModalContainerComponent], imports: [OverlayModule, PortalModule], exports: [MdbModalContainerComponent] });
MdbModalModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalModule, providers: [MdbModalService], imports: [OverlayModule, PortalModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [OverlayModule, PortalModule],
                    exports: [MdbModalContainerComponent],
                    declarations: [MdbModalContainerComponent],
                    providers: [MdbModalService],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbModalConfig, MdbModalContainerComponent, MdbModalModule, MdbModalRef, MdbModalService };
//# sourceMappingURL=mdb-angular-ui-kit-modal.mjs.map
//# sourceMappingURL=mdb-angular-ui-kit-modal.mjs.map
