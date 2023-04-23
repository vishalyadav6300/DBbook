import * as i0 from '@angular/core';
import { InjectionToken, Directive, EventEmitter, TemplateRef, Component, ChangeDetectionStrategy, ContentChild, ViewChild, Input, Output, HostBinding, ContentChildren, NgModule } from '@angular/core';
import { startWith, switchMap } from 'rxjs/operators';
import { Subject, merge } from 'rxjs';
import * as i2 from 'mdb-angular-ui-kit/collapse';
import { MdbCollapseDirective, MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

const MDB_ACCORDION_ITEM_BODY = new InjectionToken('MdbAccordionItemBodyDirective');
class MdbAccordionItemBodyDirective {
    constructor(template) {
        this.template = template;
    }
}
MdbAccordionItemBodyDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionItemBodyDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbAccordionItemBodyDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbAccordionItemBodyDirective, selector: "[mdbAccordionItemBody]", providers: [{ provide: MDB_ACCORDION_ITEM_BODY, useExisting: MdbAccordionItemBodyDirective }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionItemBodyDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbAccordionItemBody]',
                    providers: [{ provide: MDB_ACCORDION_ITEM_BODY, useExisting: MdbAccordionItemBodyDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

const MDB_ACCORDION_ITEM_HEADER = new InjectionToken('MdbAccordionItemHeaderDirective');
class MdbAccordionItemHeaderDirective {
    constructor(template) {
        this.template = template;
    }
}
MdbAccordionItemHeaderDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionItemHeaderDirective, deps: [{ token: i0.TemplateRef }], target: i0.ɵɵFactoryTarget.Directive });
MdbAccordionItemHeaderDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.2", type: MdbAccordionItemHeaderDirective, selector: "[mdbAccordionItemHeader]", providers: [{ provide: MDB_ACCORDION_ITEM_HEADER, useExisting: MdbAccordionItemHeaderDirective }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionItemHeaderDirective, decorators: [{
            type: Directive,
            args: [{
                    // eslint-disable-next-line @angular-eslint/directive-selector
                    selector: '[mdbAccordionItemHeader]',
                    providers: [{ provide: MDB_ACCORDION_ITEM_HEADER, useExisting: MdbAccordionItemHeaderDirective }],
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }]; } });

let uniqueHeaderId = 0;
let uniqueId = 0;
class MdbAccordionItemComponent {
    constructor(_cdRef) {
        this._cdRef = _cdRef;
        this.id = `mdb-accordion-item-${uniqueId++}`;
        this._headerId = `mdb-accordion-item-header-${uniqueHeaderId++}`;
        this._isInitialized = false;
        this._shouldOpenOnInit = false;
        this.itemShow = new EventEmitter();
        this.itemShown = new EventEmitter();
        this.itemHide = new EventEmitter();
        this.itemHidden = new EventEmitter();
        this.accordionItem = true;
        this.accordionItemDisplayBlock = true;
        this.show$ = new Subject();
        this._collapsed = true;
        this._addCollapsedClass = true;
    }
    set collapsed(value) {
        if (!this._isInitialized) {
            if (!value) {
                this._shouldOpenOnInit = true;
            }
            return;
        }
        if (value) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    ngOnInit() {
        this._isInitialized = true;
        if (this._shouldOpenOnInit) {
            this.show();
        }
    }
    toggle() {
        this.collapse.toggle();
    }
    show() {
        this.collapse.show();
        this._cdRef.markForCheck();
    }
    hide() {
        this.collapse.hide();
        this._cdRef.markForCheck();
    }
    onShow() {
        this._addCollapsedClass = false;
        this.itemShow.emit(this);
        this.show$.next(this);
    }
    onHide() {
        this._addCollapsedClass = true;
        this.itemHide.emit(this);
    }
    onShown() {
        this._collapsed = false;
        this.itemShown.emit(this);
    }
    onHidden() {
        this._collapsed = true;
        this.itemHidden.emit(this);
    }
}
MdbAccordionItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionItemComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
MdbAccordionItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbAccordionItemComponent, selector: "mdb-accordion-item", inputs: { header: "header", collapsed: "collapsed", id: "id" }, outputs: { itemShow: "itemShow", itemShown: "itemShown", itemHide: "itemHide", itemHidden: "itemHidden" }, host: { properties: { "class.accordion-item": "this.accordionItem", "class.d-block": "this.accordionItemDisplayBlock" } }, queries: [{ propertyName: "_headerTemplate", first: true, predicate: MDB_ACCORDION_ITEM_HEADER, descendants: true, read: TemplateRef, static: true }, { propertyName: "_bodyTemplate", first: true, predicate: MDB_ACCORDION_ITEM_BODY, descendants: true, read: TemplateRef, static: true }], viewQueries: [{ propertyName: "collapse", first: true, predicate: MdbCollapseDirective, descendants: true, static: true }], ngImport: i0, template: "<h2 class=\"accordion-header\" [id]=\"_headerId\">\n  <button\n    class=\"accordion-button\"\n    type=\"button\"\n    [attr.aria-expanded]=\"!_collapsed\"\n    [attr.aria-controls]=\"id\"\n    [class.collapsed]=\"_addCollapsedClass\"\n    (click)=\"toggle()\"\n  >\n    {{ header }}\n    <ng-template *ngIf=\"_headerTemplate\" [ngTemplateOutlet]=\"_headerTemplate\"></ng-template>\n  </button>\n</h2>\n<div\n  mdbCollapse\n  (collapseShow)=\"onShow()\"\n  (collapseHide)=\"onHide()\"\n  (collapseShown)=\"onShown()\"\n  (collapseHidden)=\"onHidden()\"\n  [attr.id]=\"id\"\n  [attr.aria-labelledby]=\"_headerId\"\n>\n  <div class=\"accordion-body\">\n    <ng-template *ngIf=\"_bodyTemplate\" [ngTemplateOutlet]=\"_bodyTemplate\"></ng-template>\n  </div>\n</div>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.MdbCollapseDirective, selector: "[mdbCollapse]", inputs: ["collapsed"], outputs: ["collapseShow", "collapseShown", "collapseHide", "collapseHidden"], exportAs: ["mdbCollapse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionItemComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-accordion-item', changeDetection: ChangeDetectionStrategy.OnPush, template: "<h2 class=\"accordion-header\" [id]=\"_headerId\">\n  <button\n    class=\"accordion-button\"\n    type=\"button\"\n    [attr.aria-expanded]=\"!_collapsed\"\n    [attr.aria-controls]=\"id\"\n    [class.collapsed]=\"_addCollapsedClass\"\n    (click)=\"toggle()\"\n  >\n    {{ header }}\n    <ng-template *ngIf=\"_headerTemplate\" [ngTemplateOutlet]=\"_headerTemplate\"></ng-template>\n  </button>\n</h2>\n<div\n  mdbCollapse\n  (collapseShow)=\"onShow()\"\n  (collapseHide)=\"onHide()\"\n  (collapseShown)=\"onShown()\"\n  (collapseHidden)=\"onHidden()\"\n  [attr.id]=\"id\"\n  [attr.aria-labelledby]=\"_headerId\"\n>\n  <div class=\"accordion-body\">\n    <ng-template *ngIf=\"_bodyTemplate\" [ngTemplateOutlet]=\"_bodyTemplate\"></ng-template>\n  </div>\n</div>\n" }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { _headerTemplate: [{
                type: ContentChild,
                args: [MDB_ACCORDION_ITEM_HEADER, { read: TemplateRef, static: true }]
            }], _bodyTemplate: [{
                type: ContentChild,
                args: [MDB_ACCORDION_ITEM_BODY, { read: TemplateRef, static: true }]
            }], collapse: [{
                type: ViewChild,
                args: [MdbCollapseDirective, { static: true }]
            }], header: [{
                type: Input
            }], collapsed: [{
                type: Input
            }], id: [{
                type: Input
            }], itemShow: [{
                type: Output
            }], itemShown: [{
                type: Output
            }], itemHide: [{
                type: Output
            }], itemHidden: [{
                type: Output
            }], accordionItem: [{
                type: HostBinding,
                args: ['class.accordion-item']
            }], accordionItemDisplayBlock: [{
                type: HostBinding,
                args: ['class.d-block']
            }] } });

class MdbAccordionComponent {
    constructor() {
        this._borderless = false;
        this._flush = false;
        this._multiple = false;
        this.accordion = true;
    }
    get borderless() {
        return this._borderless;
    }
    set borderless(value) {
        this._borderless = coerceBooleanProperty(value);
    }
    get flush() {
        return this._flush;
    }
    set flush(value) {
        this._flush = coerceBooleanProperty(value);
    }
    get multiple() {
        return this._multiple;
    }
    set multiple(value) {
        this._multiple = coerceBooleanProperty(value);
    }
    get addBorderlessClass() {
        return this.borderless;
    }
    get addFlushClass() {
        return this.flush;
    }
    ngAfterContentInit() {
        this.items.changes
            .pipe(startWith(this.items), switchMap((items) => {
            return merge(...items.map((item) => item.show$));
        }))
            .subscribe((clickedItem) => this._handleMultipleItems(clickedItem));
    }
    _handleMultipleItems(clickedItem) {
        if (!this.multiple) {
            const itemsToClose = this.items.filter((item) => item !== clickedItem && !item._collapsed);
            itemsToClose.forEach((item) => item.hide());
        }
    }
}
MdbAccordionComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
MdbAccordionComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.0.2", type: MdbAccordionComponent, selector: "mdb-accordion", inputs: { borderless: "borderless", flush: "flush", multiple: "multiple" }, host: { properties: { "class.accordion": "this.accordion", "class.accordion-borderless": "this.addBorderlessClass", "class.accordion-flush": "this.addFlushClass" } }, queries: [{ propertyName: "items", predicate: MdbAccordionItemComponent }], ngImport: i0, template: "<ng-content></ng-content>\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionComponent, decorators: [{
            type: Component,
            args: [{ selector: 'mdb-accordion', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-content></ng-content>\n" }]
        }], ctorParameters: function () { return []; }, propDecorators: { items: [{
                type: ContentChildren,
                args: [MdbAccordionItemComponent]
            }], borderless: [{
                type: Input
            }], flush: [{
                type: Input
            }], multiple: [{
                type: Input
            }], accordion: [{
                type: HostBinding,
                args: ['class.accordion']
            }], addBorderlessClass: [{
                type: HostBinding,
                args: ['class.accordion-borderless']
            }], addFlushClass: [{
                type: HostBinding,
                args: ['class.accordion-flush']
            }] } });

class MdbAccordionModule {
}
MdbAccordionModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
MdbAccordionModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionModule, declarations: [MdbAccordionComponent,
        MdbAccordionItemComponent,
        MdbAccordionItemHeaderDirective,
        MdbAccordionItemBodyDirective], imports: [CommonModule, MdbCollapseModule], exports: [MdbAccordionComponent,
        MdbAccordionItemComponent,
        MdbAccordionItemHeaderDirective,
        MdbAccordionItemBodyDirective] });
MdbAccordionModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionModule, imports: [CommonModule, MdbCollapseModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MdbAccordionModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        MdbAccordionComponent,
                        MdbAccordionItemComponent,
                        MdbAccordionItemHeaderDirective,
                        MdbAccordionItemBodyDirective,
                    ],
                    imports: [CommonModule, MdbCollapseModule],
                    exports: [
                        MdbAccordionComponent,
                        MdbAccordionItemComponent,
                        MdbAccordionItemHeaderDirective,
                        MdbAccordionItemBodyDirective,
                    ],
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { MdbAccordionComponent, MdbAccordionItemBodyDirective, MdbAccordionItemComponent, MdbAccordionItemHeaderDirective, MdbAccordionModule };
//# sourceMappingURL=mdb-angular-ui-kit-accordion.mjs.map
//# sourceMappingURL=mdb-angular-ui-kit-accordion.mjs.map
