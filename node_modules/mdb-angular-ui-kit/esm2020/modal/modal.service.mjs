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
            hasBackdrop: modalConfig.nonInvasive ? false : modalConfig.backdrop,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21kYi1hbmd1bGFyLXVpLWtpdC9tb2RhbC9tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBVyxhQUFhLEVBQWMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsZUFBZSxFQUFpQixjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUVMLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUVSLFdBQVcsR0FDWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2hELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3pFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUM7OztBQUcxQyxNQUFNLE9BQU8sZUFBZTtJQUMxQixZQUM0QixTQUFTLEVBQzNCLFFBQWlCLEVBQ2pCLFNBQW1CLEVBQ25CLElBQThCO1FBSFosY0FBUyxHQUFULFNBQVMsQ0FBQTtRQUMzQixhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsU0FBSSxHQUFKLElBQUksQ0FBMEI7SUFDckMsQ0FBQztJQUVKLElBQUksQ0FDRixzQkFBeUQsRUFDekQsTUFBMEI7UUFFMUIsTUFBTSxhQUFhLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUMzQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMs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a0JBRWhCLFFBQVE7Z0hBRlAsZUFBZTsyRkFBZixlQUFlO2tCQUQzQixVQUFVOzswQkFHTixNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPdmVybGF5LCBPdmVybGF5Q29uZmlnLCBPdmVybGF5UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL292ZXJsYXknO1xuaW1wb3J0IHsgQ29tcG9uZW50UG9ydGFsLCBDb21wb25lbnRUeXBlLCBUZW1wbGF0ZVBvcnRhbCB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9wb3J0YWwnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBJbmplY3QsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBTdGF0aWNQcm92aWRlcixcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBNZGJNb2RhbENvbmZpZyB9IGZyb20gJy4vbW9kYWwtY29uZmlnJztcbmltcG9ydCB7IE1kYk1vZGFsQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi9tb2RhbC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IE1kYk1vZGFsUmVmIH0gZnJvbSAnLi9tb2RhbC1yZWYnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWRiTW9kYWxTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQsXG4gICAgcHJpdmF0ZSBfb3ZlcmxheTogT3ZlcmxheSxcbiAgICBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBfY2ZyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXJcbiAgKSB7fVxuXG4gIG9wZW48VCwgRCA9IGFueT4oXG4gICAgY29tcG9uZW50T3JUZW1wbGF0ZVJlZjogQ29tcG9uZW50VHlwZTxUPiB8IFRlbXBsYXRlUmVmPFQ+LFxuICAgIGNvbmZpZz86IE1kYk1vZGFsQ29uZmlnPEQ+XG4gICk6IE1kYk1vZGFsUmVmPFQ+IHtcbiAgICBjb25zdCBkZWZhdWx0Q29uZmlnID0gbmV3IE1kYk1vZGFsQ29uZmlnKCk7XG4gICAgY29uZmlnID0gY29uZmlnID8gT2JqZWN0LmFzc2lnbihkZWZhdWx0Q29uZmlnLCBjb25maWcpIDogZGVmYXVsdENvbmZpZztcblxuICAgIGNvbnN0IG92ZXJsYXlSZWYgPSB0aGlzLl9jcmVhdGVPdmVybGF5KGNvbmZpZyk7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fY3JlYXRlQ29udGFpbmVyKG92ZXJsYXlSZWYsIGNvbmZpZyk7XG4gICAgY29uc3QgbW9kYWxSZWYgPSB0aGlzLl9jcmVhdGVDb250ZW50KGNvbXBvbmVudE9yVGVtcGxhdGVSZWYsIGNvbnRhaW5lciwgb3ZlcmxheVJlZiwgY29uZmlnKTtcblxuICAgIHRoaXMuX3JlZ2lzdGVyTGlzdGVuZXJzPFQ+KG1vZGFsUmVmLCBjb25maWcsIGNvbnRhaW5lcik7XG5cbiAgICByZXR1cm4gbW9kYWxSZWY7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVPdmVybGF5KGNvbmZpZzogTWRiTW9kYWxDb25maWcpOiBPdmVybGF5UmVmIHtcbiAgICBjb25zdCBvdmVybGF5Q29uZmlnID0gdGhpcy5fZ2V0T3ZlcmxheUNvbmZpZyhjb25maWcpO1xuICAgIHJldHVybiB0aGlzLl9vdmVybGF5LmNyZWF0ZShvdmVybGF5Q29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE92ZXJsYXlDb25maWcobW9kYWxDb25maWc6IE1kYk1vZGFsQ29uZmlnKTogT3ZlcmxheUNvbmZpZyB7XG4gICAgY29uc3QgY29uZmlnID0gbmV3IE92ZXJsYXlDb25maWcoe1xuICAgICAgcG9zaXRpb25TdHJhdGVneTogdGhpcy5fb3ZlcmxheS5wb3NpdGlvbigpLmdsb2JhbCgpLFxuICAgICAgc2Nyb2xsU3RyYXRlZ3k6IHRoaXMuX292ZXJsYXkuc2Nyb2xsU3RyYXRlZ2llcy5ub29wKCksXG4gICAgICBoYXNCYWNrZHJvcDogbW9kYWxDb25maWcubm9uSW52YXNpdmUgPyBmYWxzZSA6IG1vZGFsQ29uZmlnLmJhY2tkcm9wLFxuICAgICAgYmFja2Ryb3BDbGFzczogJ21kYi1iYWNrZHJvcCcsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gY29uZmlnO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ29udGFpbmVyKFxuICAgIG92ZXJsYXlSZWY6IE92ZXJsYXlSZWYsXG4gICAgY29uZmlnOiBNZGJNb2RhbENvbmZpZ1xuICApOiBNZGJNb2RhbENvbnRhaW5lckNvbXBvbmVudCB7XG4gICAgY29uc3QgcG9ydGFsID0gbmV3IENvbXBvbmVudFBvcnRhbChNZGJNb2RhbENvbnRhaW5lckNvbXBvbmVudCwgbnVsbCwgdGhpcy5faW5qZWN0b3IsIHRoaXMuX2Nmcik7XG4gICAgY29uc3QgY29udGFpbmVyUmVmID0gb3ZlcmxheVJlZi5hdHRhY2gocG9ydGFsKTtcbiAgICBjb250YWluZXJSZWYuaW5zdGFuY2UuX2NvbmZpZyA9IGNvbmZpZztcbiAgICByZXR1cm4gY29udGFpbmVyUmVmLmluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlQ29udGVudDxUPihcbiAgICBjb21wb25lbnRPclRlbXBsYXRlOiBDb21wb25lbnRUeXBlPFQ+IHwgVGVtcGxhdGVSZWY8VD4sXG4gICAgY29udGFpbmVyOiBNZGJNb2RhbENvbnRhaW5lckNvbXBvbmVudCxcbiAgICBvdmVybGF5UmVmOiBPdmVybGF5UmVmLFxuICAgIGNvbmZpZzogTWRiTW9kYWxDb25maWdcbiAgKTogTWRiTW9kYWxSZWY8VD4ge1xuICAgIGNvbnN0IG1vZGFsUmVmID0gbmV3IE1kYk1vZGFsUmVmKG92ZXJsYXlSZWYsIGNvbnRhaW5lcik7XG5cbiAgICBpZiAoY29tcG9uZW50T3JUZW1wbGF0ZSBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICBjb250YWluZXIuYXR0YWNoVGVtcGxhdGVQb3J0YWwoXG4gICAgICAgIG5ldyBUZW1wbGF0ZVBvcnRhbDxUPihjb21wb25lbnRPclRlbXBsYXRlLCBudWxsLCB7XG4gICAgICAgICAgJGltcGxpY2l0OiBjb25maWcuZGF0YSxcbiAgICAgICAgICBtb2RhbFJlZixcbiAgICAgICAgfSBhcyBhbnkpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBpbmplY3RvciA9IHRoaXMuX2NyZWF0ZUluamVjdG9yPFQ+KGNvbmZpZywgbW9kYWxSZWYsIGNvbnRhaW5lcik7XG4gICAgICBjb25zdCBjb250ZW50UmVmID0gY29udGFpbmVyLmF0dGFjaENvbXBvbmVudFBvcnRhbDxUPihcbiAgICAgICAgbmV3IENvbXBvbmVudFBvcnRhbChjb21wb25lbnRPclRlbXBsYXRlLCBjb25maWcudmlld0NvbnRhaW5lclJlZiwgaW5qZWN0b3IpXG4gICAgICApO1xuXG4gICAgICBpZiAoY29uZmlnLmRhdGEpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihjb250ZW50UmVmLmluc3RhbmNlLCB7IC4uLmNvbmZpZy5kYXRhIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtb2RhbFJlZjtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZUluamVjdG9yPFQ+KFxuICAgIGNvbmZpZzogTWRiTW9kYWxDb25maWcsXG4gICAgbW9kYWxSZWY6IE1kYk1vZGFsUmVmPFQ+LFxuICAgIGNvbnRhaW5lcjogTWRiTW9kYWxDb250YWluZXJDb21wb25lbnRcbiAgKTogSW5qZWN0b3Ige1xuICAgIGNvbnN0IHVzZXJJbmplY3RvciA9IGNvbmZpZyAmJiBjb25maWcudmlld0NvbnRhaW5lclJlZiAmJiBjb25maWcudmlld0NvbnRhaW5lclJlZi5pbmplY3RvcjtcblxuICAgIC8vIFRoZSBkaWFsb2cgY29udGFpbmVyIHNob3VsZCBiZSBwcm92aWRlZCBhcyB0aGUgZGlhbG9nIGNvbnRhaW5lciBhbmQgdGhlIGRpYWxvZydzXG4gICAgLy8gY29udGVudCBhcmUgY3JlYXRlZCBvdXQgb2YgdGhlIHNhbWUgYFZpZXdDb250YWluZXJSZWZgIGFuZCBhcyBzdWNoLCBhcmUgc2libGluZ3NcbiAgICAvLyBmb3IgaW5qZWN0b3IgcHVycG9zZXMuIFRvIGFsbG93IHRoZSBoaWVyYXJjaHkgdGhhdCBpcyBleHBlY3RlZCwgdGhlIGRpYWxvZ1xuICAgIC8vIGNvbnRhaW5lciBpcyBleHBsaWNpdGx5IHByb3ZpZGVkIGluIHRoZSBpbmplY3Rvci5cbiAgICBjb25zdCBwcm92aWRlcnM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gICAgICB7IHByb3ZpZGU6IE1kYk1vZGFsQ29udGFpbmVyQ29tcG9uZW50LCB1c2VWYWx1ZTogY29udGFpbmVyIH0sXG4gICAgICB7IHByb3ZpZGU6IE1kYk1vZGFsUmVmLCB1c2VWYWx1ZTogbW9kYWxSZWYgfSxcbiAgICBdO1xuXG4gICAgcmV0dXJuIEluamVjdG9yLmNyZWF0ZSh7IHBhcmVudDogdXNlckluamVjdG9yIHx8IHRoaXMuX2luamVjdG9yLCBwcm92aWRlcnMgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZWdpc3Rlckxpc3RlbmVyczxUPihcbiAgICBtb2RhbFJlZjogTWRiTW9kYWxSZWY8VD4sXG4gICAgY29uZmlnOiBNZGJNb2RhbENvbmZpZyxcbiAgICBjb250YWluZXI6IE1kYk1vZGFsQ29udGFpbmVyQ29tcG9uZW50XG4gICk6IHZvaWQge1xuICAgIGNvbnRhaW5lci5iYWNrZHJvcENsaWNrJC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBtb2RhbFJlZi5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKGNvbmZpZy5rZXlib2FyZCkge1xuICAgICAgZnJvbUV2ZW50KGNvbnRhaW5lci5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAna2V5ZG93bicpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcigoZXZlbnQ6IEtleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBldmVudC5rZXkgPT09ICdFc2NhcGUnO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIHRha2UoMSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBtb2RhbFJlZi5jbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==