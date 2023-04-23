import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Injector, TemplateRef, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { MdbModalConfig } from './modal-config';
import { MdbModalContainerComponent } from './modal-container.component';
import { MdbModalRef } from './modal-ref';
import * as i0 from "@angular/core";
import * as i1 from "@angular/cdk/overlay";
export class MdbModalService {
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
                Object.assign(contentRef.instance, { ...config.data });
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
MdbModalService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalService, deps: [{ token: DOCUMENT }, { token: i1.Overlay }, { token: i0.Injector }, { token: i0.ComponentFactoryResolver }], target: i0.ɵɵFactoryTarget.Injectable });
MdbModalService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbModalService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.Overlay }, { type: i0.Injector }, { type: i0.ComponentFactoryResolver }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9tb2RhbC9tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBVyxhQUFhLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFpQixjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUVMLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUVSLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQUcxQyxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUM0QixTQUFTLEVBQzNCLFFBQWlCLEVBQ2pCLFNBQW1CLEVBQ25CLElBQThCO1FBSFosY0FBUyxHQUFULFNBQVMsQ0FBQTtRQUMzQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBMEI7SUFDckMsQ0FBQztJQUVKLElBQUksQ0FDRixzQkFBeUQsRUFDekQsTUFBMEI7UUFFMUIsTUFBTSxhQUFhLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUMzQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMs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R04sTUFBTTsyQkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT3ZlcmxheSwgT3ZlcmxheUNvbmZpZywgT3ZlcmxheVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9vdmVybGF5JztcbmltcG9ydCB7IENvbXBvbmVudFBvcnRhbCwgQ29tcG9uZW50VHlwZSwgVGVtcGxhdGVQb3J0YWwgfSBmcm9tICdAYW5ndWxhci9jZGsvcG9ydGFsJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgSW5qZWN0LFxuICBJbmplY3RhYmxlLFxuICBJbmplY3RvcixcbiAgU3RhdGljUHJvdmlkZXIsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgTWRiTW9kYWxDb25maWcgfSBmcm9tICcuL21vZGFsLWNvbmZpZyc7XG5pbXBvcnQgeyBNZGJNb2RhbENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vbW9kYWwtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZGJNb2RhbFJlZiB9IGZyb20gJy4vbW9kYWwtcmVmJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1kYk1vZGFsU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50LFxuICAgIHByaXZhdGUgX292ZXJsYXk6IE92ZXJsYXksXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgX2NmcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyXG4gICkge31cblxuICBvcGVuPFQsIEQgPSBhbnk+KFxuICAgIGNvbXBvbmVudE9yVGVtcGxhdGVSZWY6IENvbXBvbmVudFR5cGU8VD4gfCBUZW1wbGF0ZVJlZjxUPixcbiAgICBjb25maWc/OiBNZGJNb2RhbENvbmZpZzxEPlxuICApOiBNZGJNb2RhbFJlZjxUPiB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IG5ldyBNZGJNb2RhbENvbmZpZygpO1xuICAgIGNvbmZpZyA9IGNvbmZpZyA/IE9iamVjdC5hc3NpZ24oZGVmYXVsdENvbmZpZywgY29uZmlnKSA6IGRlZmF1bHRDb25maWc7XG5cbiAgICBjb25zdCBvdmVybGF5UmVmID0gdGhpcy5fY3JlYXRlT3ZlcmxheShjb25maWcpO1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuX2NyZWF0ZUNvbnRhaW5lcihvdmVybGF5UmVmLCBjb25maWcpO1xuICAgIGNvbnN0IG1vZGFsUmVmID0gdGhpcy5fY3JlYXRlQ29udGVudChjb21wb25lbnRPclRlbXBsYXRlUmVmLCBjb250YWluZXIsIG92ZXJsYXlSZWYsIGNvbmZpZyk7XG5cbiAgICB0aGlzLl9yZWdpc3Rlckxpc3RlbmVyczxUPihtb2RhbFJlZiwgY29uZmlnLCBjb250YWluZXIpO1xuXG4gICAgcmV0dXJuIG1vZGFsUmVmO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlT3ZlcmxheShjb25maWc6IE1kYk1vZGFsQ29uZmlnKTogT3ZlcmxheVJlZiB7XG4gICAgY29uc3Qgb3ZlcmxheUNvbmZpZyA9IHRoaXMuX2dldE92ZXJsYXlDb25maWcoY29uZmlnKTtcbiAgICByZXR1cm4gdGhpcy5fb3ZlcmxheS5jcmVhdGUob3ZlcmxheUNvbmZpZyk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRPdmVybGF5Q29uZmlnKG1vZGFsQ29uZmlnOiBNZGJNb2RhbENvbmZpZyk6IE92ZXJsYXlDb25maWcge1xuICAgIGNvbnN0IGNvbmZpZyA9IG5ldyBPdmVybGF5Q29uZmlnKHtcbiAgICAgIHBvc2l0aW9uU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkucG9zaXRpb24oKS5nbG9iYWwoKSxcbiAgICAgIHNjcm9sbFN0cmF0ZWd5OiB0aGlzLl9vdmVybGF5LnNjcm9sbFN0cmF0ZWdpZXMubm9vcCgpLFxuICAgICAgaGFzQmFja2Ryb3A6IG1vZGFsQ29uZmlnLmJhY2tkcm9wLFxuICAgICAgYmFja2Ryb3BDbGFzczogJ21kYi1iYWNrZHJvcCcsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ29udGFpbmVyKFxuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgY29uZmlnOiBNZGJNb2RhbENvbmZpZ1xuICApOiBNZGJNb2RhbENvbnRhaW5lckNvbXBvbmVudCB7XG4gICAgY29uc3QgcG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChNZGJNb2RhbENvbnRhaW5lckNvbXBvbmVudCwgbnVsbCwgdGhpcy5faW5qZWN0b3IsIHRoaXMuX2Nmcik7XG4gICAgY29uc3QgY29udGFpbmVyUmVmID0gb3ZlcmxheVJlZi5hdHRhY2gocG9ydGFsKTtcbiAgICBjb250YWluZXJSZWYuaW5zdGFuY2UuX2NvbmZpZyA9IGNvbmZpZztcbiAgICByZXR1cm4gY29udGFpbmVyUmVmLmluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ29udGVudDxUPihcbiAgICBjb21wb25lbnRPclRlbXBsYXRlOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgY29udGFpbmVyOiBNZGJNb2RhbENvbnRhaW5lckNvbXBvbmVudCxcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmLFxuICAgIGNvbmZpZzogTWRiTW9kYWxDb25maWdcbiAgKTogTWRiTW9kYWxSZWY8VD4ge1xuICAgIGNvbnN0IG1vZGFsUmVmID0gbmV3IE1kYk1vZGFsUmVmKG92ZXJsYXlSZWYsIGNvbnRhaW5lcik7XG5cbiAgICBpZiAoY29tcG9uZW50T3JUZW1wbGF0ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICBjb250YWluZXIuYXR0YWNoVGVtcGxhdGVQb3J0YWwoXG4gICAgICAgIG5ldyBUZW1wbGF0ZVBvcnRhbDxUPihjb21wb25lbnRPclRlbXBsYXRlLCBudWxsLCB7XG4gICAgICAgICAgJGltcGxpY2l0OiBjb25maWcuZGF0YSxcbiAgICAgICAgICBtb2RhbFJlZixcbiAgICAgICAgfSBhcyBhbnkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmplY3RvciA9IHRoaXMuX2NyZWF0ZUluamVjdG9yPFQ+KGNvbmZpZywgbW9kYWxSZWYsIGNvbnRhaW5lcik7XG4gICAgICBjb25zdCBjb250ZW50UmVmID0gY29udGFpbmVyLmF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihcbiAgICAgICAgbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRPclRlbXBsYXRlLCBjb25maWcudmlld0NvbnRhaW5lclJlZiwgaW5qZWN0b3IpXG4gICAgICApO1xuXG4gICAgICBpZiAoY29uZmlnLmRhdGEpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjb250ZW50UmVmLmluc3RhbmNlLCB7IC4uLmNvbmZpZy5kYXRhIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtb2RhbFJlZjtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUluamVjdG9yPFQ+KFxuICAgIGNvbmZpZzogTWRiTW9kYWxDb25maWcsXG4gICAgbW9kYWxSZWY6IE1kYk1vZGFsUmVmPFQ+LFxuICAgIGNvbnRhaW5lcjogTWRiTW9kYWxDb250YWluZXJDb21wb25lbnRcbiAgKTogSW5qZWN0b3Ige1xuICAgIGNvbnN0IHVzZXJJbmplY3RvciA9IGNvbmZpZyAmJiBjb25maWcudmlld0NvbnRhaW5lclJlZiAmJiBjb25maWcudmlld0NvbnRhaW5lclJlZi5pbmplY3RvcjtcblxuICAgIC8vIFRoZSBkaWFsb2cgY29udGFpbmVyIHNob3VsZCBiZSBwcm92aWRlZCBhcyB0aGUgZGlhbG9nIGNvbnRhaW5lciBhbmQgdGhlIGRpYWxvZydzXG4gICAgLy8gY29udGVudCBhcmUgY3JlYXRlZCBvdXQgb2YgdGhlIHNhbWUgYFZpZXdDb250YWluZXJSZWZgIGFuZCBhcyBzdWNoLCBhcmUgc2libGluZ3NcbiAgICAvLyBmb3IgaW5qZWN0b3IgcHVycG9zZXMuIFRvIGFsbG93IHRoZSBoaWVyYXJjaHkgdGhhdCBpcyBleHBlY3RlZCwgdGhlIGRpYWxvZ1xuICAgIC8vIGNvbnRhaW5lciBpcyBleHBsaWNpdGx5IHByb3ZpZGVkIGluIHRoZSBpbmplY3Rvci5cbiAgICBjb25zdCBwcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gICAgICB7IHByb3ZpZGU6IE1kYk1vZGFsQ29udGFpbmVyQ29tcG9uZW50LCB1c2VWYWx1ZTogY29udGFpbmVyIH0sXG4gICAgICB7IHByb3ZpZGU6IE1kYk1vZGFsUmVmLCB1c2VWYWx1ZTogbW9kYWxSZWYgfSxcbiAgICBdO1xuXG4gICAgcmV0dXJuIEluamVjdG9yLmNyZWF0ZSh7IHBhcmVudDogdXNlckluamVjdG9yIHx8IHRoaXMuX2luamVjdG9yLCBwcm92aWRlcnMgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZWdpc3Rlckxpc3RlbmVyczxUPihcbiAgICBtb2RhbFJlZjogTWRiTW9kYWxSZWY8VD4sXG4gICAgY29uZmlnOiBNZGJNb2RhbENvbmZpZyxcbiAgICBjb250YWluZXI6IE1kYk1vZGFsQ29udGFpbmVyQ29tcG9uZW50XG4gICk6IHZvaWQge1xuICAgIGNvbnRhaW5lci5iYWNrZHJvcENsaWNrJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBtb2RhbFJlZi5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKGNvbmZpZy5rZXlib2FyZCkge1xuICAgICAgZnJvbUV2ZW50KGNvbnRhaW5lci5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBldmVudC5rZXkgPT09ICdFc2NhcGUnO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBtb2RhbFJlZi5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==