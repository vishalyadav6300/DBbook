import * as i0 from '@angular/core';
import { Directive, Inject, Input, HostBinding, HostListener, Injectable, EventEmitter, Component, ContentChildren, Output, NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

class MdbScrollspyLinkDirective {
    constructor(cdRef, document) {
        this.cdRef = cdRef;
        this.document = document;
        this._scrollIntoView = true;
        this.scrollspyLink = true;
        this.active = false;
    }
    get scrollIntoView() {
        return this._scrollIntoView;
    }
    set scrollIntoView(value) {
        this._scrollIntoView = value;
    }
    get section() {
        return this._section;
    }
    set section(value) {
        if (value) {
            this._section = value;
        }
    }
    get id() {
        return this._id;
    }
    set id(newId) {
        if (newId) {
            this._id = newId;
        }
    }
    onClick() {
        if (this.section && this.scrollIntoView === true) {
            this.section.scrollIntoView();
        }
    }
    detectChanges() {
        this.cdRef.detectChanges();
    }
    assignSectionToId() {
        this.section = this.document.documentElement.querySelector(`#${this.id}`);
    }
    ngOnInit() {
        this.assignSectionToId();
    }
}
MdbScrollspyLinkDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyLinkDirective, deps: [{ token: i0.ChangeDetectorRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Directive });
MdbScrollspyLinkDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbScrollspyLinkDirective, selector: "[mdbScrollspyLink]", inputs: { scrollIntoView: "scrollIntoView", id: ["mdbScrollspyLink", "id"] }, host: { listeners: { "click": "onClick()" }, properties: { "class.scrollspy-link": "this.scrollspyLink", "class.active": "this.active" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyLinkDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbScrollspyLink]',
                }]
        }], ctorParameters: function () {
        return [{ type: i0.ChangeDetectorRef }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }];
    }, propDecorators: { scrollIntoView: [{
                type: Input
            }], id: [{
                type: Input,
                args: ['mdbScrollspyLink']
            }], scrollspyLink: [{
                type: HostBinding,
                args: ['class.scrollspy-link']
            }], active: [{
                type: HostBinding,
                args: ['class.active']
            }], onClick: [{
                type: HostListener,
                args: ['click', []]
            }] } });

class MdbScrollspyService {
    constructor() {
        this.scrollSpys = [];
        this.activeSubject = new Subject();
        this.active$ = this.activeSubject;
    }
    addScrollspy(scrollSpy) {
        this.scrollSpys.push(scrollSpy);
    }
    removeScrollspy(scrollSpyId) {
        const scrollSpyIndex = this.scrollSpys.findIndex((spy) => {
            return spy.id === scrollSpyId;
        });
        this.scrollSpys.splice(scrollSpyIndex, 1);
    }
    updateActiveState(scrollSpyId, activeLinkId) {
        const scrollSpy = this.scrollSpys.find((spy) => {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        const activeLink = scrollSpy.links.find((link) => {
            return link.id === activeLinkId;
        });
        this.setActiveLink(activeLink);
    }
    removeActiveState(scrollSpyId, activeLinkId) {
        const scrollSpy = this.scrollSpys.find((spy) => {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        const activeLink = scrollSpy.links.find((link) => {
            return link.id === activeLinkId;
        });
        if (!activeLink) {
            return;
        }
        activeLink.active = false;
        activeLink.detectChanges();
    }
    setActiveLink(activeLink) {
        if (activeLink) {
            activeLink.active = true;
            activeLink.detectChanges();
            this.activeSubject.next(activeLink);
        }
    }
    removeActiveLinks(scrollSpyId) {
        const scrollSpy = this.scrollSpys.find((spy) => {
            return spy.id === scrollSpyId;
        });
        if (!scrollSpy) {
            return;
        }
        scrollSpy.links.forEach((link) => {
            link.active = false;
            link.detectChanges();
        });
    }
}
MdbScrollspyService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
MdbScrollspyService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyService, decorators: [{
            type: Injectable
        }] });

// eslint-disable-next-line @angular-eslint/component-class-suffix
class MdbScrollspyDirective {
    constructor(scrollSpyService) {
        this.scrollSpyService = scrollSpyService;
        this._destroy$ = new Subject();
        this.activeLinkChange = new EventEmitter();
    }
    get id() {
        return this._id;
    }
    set id(newId) {
        if (newId) {
            this._id = newId;
        }
    }
    ngOnInit() {
        this.activeSub = this.scrollSpyService.active$
            .pipe(takeUntil(this._destroy$), distinctUntilChanged())
            .subscribe((activeLink) => {
            this.activeLinkChange.emit(activeLink);
        });
    }
    ngAfterContentInit() {
        this.scrollSpyService.addScrollspy({ id: this.id, links: this.links });
    }
    ngOnDestroy() {
        this.scrollSpyService.removeScrollspy(this.id);
        this._destroy$.next();
        this._destroy$.complete();
    }
}
MdbScrollspyDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyDirective, deps: [{ token: MdbScrollspyService }], target: i0.ɵɵFactoryTarget.Component });
MdbScrollspyDirective.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbScrollspyDirective, selector: "[mdbScrollspy]", inputs: { id: ["mdbScrollspy", "id"] }, outputs: { activeLinkChange: "activeLinkChange" }, queries: [{ propertyName: "links", predicate: MdbScrollspyLinkDirective, descendants: true }], ngImport: i0, template: '<ng-content></ng-content>', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyDirective, decorators: [{
            type: Component,
            args: [{
                    // eslint-disable-next-line @angular-eslint/component-selector
                    selector: '[mdbScrollspy]',
                    template: '<ng-content></ng-content>',
                }]
        }], ctorParameters: function () { return [{ type: MdbScrollspyService }]; }, propDecorators: { links: [{
                type: ContentChildren,
                args: [MdbScrollspyLinkDirective, { descendants: true }]
            }], id: [{
                type: Input,
                args: ['mdbScrollspy']
            }], activeLinkChange: [{
                type: Output
            }] } });

// eslint-disable-next-line @angular-eslint/directive-class-suffix
class MdbScrollspyElementDirective {
    constructor(_elementRef, renderer, ngZone, scrollSpyService) {
        this._elementRef = _elementRef;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.scrollSpyService = scrollSpyService;
        this.offset = 0;
    }
    get host() {
        return this._elementRef.nativeElement;
    }
    get scrollSpyId() {
        return this._scrollSpyId;
    }
    set scrollSpyId(newId) {
        if (newId) {
            this._scrollSpyId = newId;
        }
    }
    isElementInViewport() {
        const scrollTop = this.container.scrollTop;
        const elTop = this.host.offsetTop - this.offset;
        const elHeight = this.host.offsetHeight;
        return scrollTop >= elTop && scrollTop < elTop + elHeight;
    }
    updateActiveState(scrollSpyId, id) {
        if (this.isElementInViewport()) {
            this.scrollSpyService.removeActiveLinks(scrollSpyId);
            this.scrollSpyService.updateActiveState(scrollSpyId, id);
        }
    }
    onScroll() {
        this.updateActiveState(this.scrollSpyId, this.id);
    }
    listenToScroll() {
        this.renderer.listen(this.container, 'scroll', () => {
            this.onScroll();
        });
    }
    ngOnInit() {
        this.id = this.host.id;
        if (!this.container) {
            this.container = this._getClosestEl(this.host, '.scrollspy-container');
        }
        this.renderer.setStyle(this.container, 'position', 'relative');
        this.ngZone.runOutsideAngular(this.listenToScroll.bind(this));
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.updateActiveState(this.scrollSpyId, this.id);
        }, 0);
    }
    _getClosestEl(el, selector) {
        for (; el && el !== document; el = el.parentNode) {
            if (el.matches && el.matches(selector)) {
                return el;
            }
        }
        return null;
    }
}
MdbScrollspyElementDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyElementDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: MdbScrollspyService }], target: i0.ɵɵFactoryTarget.Directive });
MdbScrollspyElementDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbScrollspyElementDirective, selector: "[mdbScrollspyElement]", inputs: { container: "container", scrollSpyId: ["mdbScrollspyElement", "scrollSpyId"], offset: "offset" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyElementDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbScrollspyElement]',
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: MdbScrollspyService }]; }, propDecorators: { container: [{
                type: Input
            }], scrollSpyId: [{
                type: Input,
                args: ['mdbScrollspyElement']
            }], offset: [{
                type: Input
            }] } });

class MdbScrollspyWindowDirective {
    constructor(document, el, renderer, ngZone, scrollSpyService) {
        this.document = document;
        this.el = el;
        this.renderer = renderer;
        this.ngZone = ngZone;
        this.scrollSpyService = scrollSpyService;
        this.offset = 0;
    }
    get scrollSpyId() {
        return this._scrollSpyId;
    }
    set scrollSpyId(newId) {
        if (newId) {
            this._scrollSpyId = newId;
        }
    }
    isElementInViewport() {
        const scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
        const elHeight = this.el.nativeElement.offsetHeight;
        const elTop = this.el.nativeElement.offsetTop - this.offset;
        const elBottom = elTop + elHeight;
        return scrollTop >= elTop && scrollTop <= elBottom;
    }
    updateActiveState(scrollSpyId, id) {
        if (this.isElementInViewport()) {
            this.scrollSpyService.updateActiveState(scrollSpyId, id);
        }
        else {
            this.scrollSpyService.removeActiveState(scrollSpyId, id);
        }
    }
    onScroll() {
        this.updateActiveState(this.scrollSpyId, this.id);
    }
    listenToScroll() {
        this.renderer.listen(window, 'scroll', () => {
            this.onScroll();
        });
    }
    ngOnInit() {
        this.id = this.el.nativeElement.id;
        this.ngZone.runOutsideAngular(this.listenToScroll.bind(this));
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.updateActiveState(this.scrollSpyId, this.id);
        }, 0);
    }
}
MdbScrollspyWindowDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyWindowDirective, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i0.NgZone }, { token: MdbScrollspyService }], target: i0.ɵɵFactoryTarget.Directive });
MdbScrollspyWindowDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbScrollspyWindowDirective, selector: "[mdbScrollspyWindow]", inputs: { scrollSpyId: ["mdbScrollspyWindow", "scrollSpyId"], offset: "offset" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyWindowDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbScrollspyWindow]',
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DOCUMENT]
                    }] }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i0.NgZone }, { type: MdbScrollspyService }];
    }, propDecorators: { scrollSpyId: [{
                type: Input,
                args: ['mdbScrollspyWindow']
            }], offset: [{
                type: Input
            }] } });

class MdbScrollspyModule {
}
MdbScrollspyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbScrollspyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyModule, declarations: [MdbScrollspyDirective,
        MdbScrollspyLinkDirective,
        MdbScrollspyElementDirective,
        MdbScrollspyWindowDirective], exports: [MdbScrollspyDirective,
        MdbScrollspyLinkDirective,
        MdbScrollspyElementDirective,
        MdbScrollspyWindowDirective] });
MdbScrollspyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyModule, providers: [MdbScrollspyService] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbScrollspyModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MdbScrollspyDirective,
                        MdbScrollspyLinkDirective,
                        MdbScrollspyElementDirective,
                        MdbScrollspyWindowDirective,
                    ],
                    exports: [
                        MdbScrollspyDirective,
                        MdbScrollspyLinkDirective,
                        MdbScrollspyElementDirective,
                        MdbScrollspyWindowDirective,
                    ],
                    providers: [MdbScrollspyService],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbScrollspyDirective, MdbScrollspyElementDirective, MdbScrollspyLinkDirective, MdbScrollspyModule, MdbScrollspyService, MdbScrollspyWindowDirective };
//# sourceMappingURL=mdb-angular-ui-kit-scrollspy.mjs.map
//# sourceMappingURL=mdb-angular-ui-kit-scrollspy.mjs.map
