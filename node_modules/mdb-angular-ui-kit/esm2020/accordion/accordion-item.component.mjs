import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, HostBinding, Input, Output, TemplateRef, ViewChild, } from '@angular/core';
import { MdbCollapseDirective } from 'mdb-angular-ui-kit/collapse';
import { Subject } from 'rxjs';
import { MDB_ACCORDION_ITEM_BODY } from './accordion-item-content.directive';
import { MDB_ACCORDION_ITEM_HEADER } from './accordion-item-header.directive';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "mdb-angular-ui-kit/collapse";
let uniqueHeaderId = 0;
let uniqueId = 0;
export class MdbAccordionItemComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWRiLWFuZ3VsYXItdWkta2l0L2FjY29yZGlvbi9hY2NvcmRpb24taXRlbS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tZGItYW5ndWxhci11aS1raXQvYWNjb3JkaW9uL2FjY29yZGlvbi1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osV0FBVyxFQUNYLEtBQUssRUFFTCxNQUFNLEVBQ04sV0FBVyxFQUNYLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9CLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBRTlFLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUN2QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFPakIsTUFBTSxPQUFPLHlCQUF5QjtJQXNEcEMsWUFBb0IsTUFBeUI7UUFBekIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUE1QnBDLE9BQUUsR0FBRyxzQkFBc0IsUUFBUSxFQUFFLEVBQUUsQ0FBQztRQUVqRCxjQUFTLEdBQUcsNkJBQTZCLGNBQWMsRUFBRSxFQUFFLENBQUM7UUFFcEQsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBRXhCLGFBQVEsR0FBNEMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN2RSxjQUFTLEdBQTRDLElBQUksWUFB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O2dCQUVGLFNBQVM7c0JBRFosS0FBSztnQkFnQkcsRUFBRTtzQkFBVixLQUFLO2dCQU9JLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csU0FBUztzQkFBbEIsTUFBTTtnQkFDRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU07Z0JBRThCLGFBQWE7c0JBQWpELFdBQVc7dUJBQUMsc0JBQXNCO2dCQUNMLHlCQUF5QjtzQkFBdEQsV0FBVzt1QkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0QmluZGluZyxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1kYkNvbGxhcHNlRGlyZWN0aXZlIH0gZnJvbSAnbWRiLWFuZ3VsYXItdWkta2l0L2NvbGxhcHNlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IE1EQl9BQ0NPUkRJT05fSVRFTV9CT0RZIH0gZnJvbSAnLi9hY2NvcmRpb24taXRlbS1jb250ZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBNREJfQUNDT1JESU9OX0lURU1fSEVBREVSIH0gZnJvbSAnLi9hY2NvcmRpb24taXRlbS1oZWFkZXIuZGlyZWN0aXZlJztcblxubGV0IHVuaXF1ZUhlYWRlcklkID0gMDtcbmxldCB1bmlxdWVJZCA9IDA7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21kYi1hY2NvcmRpb24taXRlbScsXG4gIHRlbXBsYXRlVXJsOiAnLi9hY2NvcmRpb24taXRlbS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQENvbnRlbnRDaGlsZChNREJfQUNDT1JESU9OX0lURU1fSEVBREVSLCB7IHJlYWQ6IFRlbXBsYXRlUmVmLCBzdGF0aWM6IHRydWUgfSlcbiAgX2hlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBDb250ZW50Q2hpbGQoTURCX0FDQ09SRElPTl9JVEVNX0JPRFksIHsgcmVhZDogVGVtcGxhdGVSZWYsIHN0YXRpYzogdHJ1ZSB9KVxuICBfYm9keVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIEBWaWV3Q2hpbGQoTWRiQ29sbGFwc2VEaXJlY3RpdmUsIHsgc3RhdGljOiB0cnVlIH0pIGNvbGxhcHNlOiBNZGJDb2xsYXBzZURpcmVjdGl2ZTtcblxuICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2V0IGNvbGxhcHNlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgIGlmICghdGhpcy5faXNJbml0aWFsaXplZCkge1xuICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICB0aGlzLl9zaG91bGRPcGVuT25Jbml0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBASW5wdXQoKSBpZCA9IGBtZGItYWNjb3JkaW9uLWl0ZW0tJHt1bmlxdWVJZCsrfWA7XG5cbiAgX2hlYWRlcklkID0gYG1kYi1hY2NvcmRpb24taXRlbS1oZWFkZXItJHt1bmlxdWVIZWFkZXJJZCsrfWA7XG5cbiAgcHJpdmF0ZSBfaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuICBwcml2YXRlIF9zaG91bGRPcGVuT25Jbml0ID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGl0ZW1TaG93OiBFdmVudEVtaXR0ZXI8TWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBpdGVtU2hvd246IEV2ZW50RW1pdHRlcjxNZGJBY2NvcmRpb25JdGVtQ29tcG9uZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGl0ZW1IaWRlOiBFdmVudEVtaXR0ZXI8TWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBpdGVtSGlkZGVuOiBFdmVudEVtaXR0ZXI8TWRiQWNjb3JkaW9uSXRlbUNvbXBvbmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5hY2NvcmRpb24taXRlbScpIGFjY29yZGlvbkl0ZW0gPSB0cnVlO1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmQtYmxvY2snKSBhY2NvcmRpb25JdGVtRGlzcGxheUJsb2NrID0gdHJ1ZTtcblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pc0luaXRpYWxpemVkID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLl9zaG91bGRPcGVuT25Jbml0KSB7XG4gICAgICB0aGlzLnNob3coKTtcbiAgICB9XG4gIH1cblxuICBzaG93JCA9IG5ldyBTdWJqZWN0PE1kYkFjY29yZGlvbkl0ZW1Db21wb25lbnQ+KCk7XG5cbiAgX2NvbGxhcHNlZCA9IHRydWU7XG4gIF9hZGRDb2xsYXBzZWRDbGFzcyA9IHRydWU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuXG4gIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbGxhcHNlLnRvZ2dsZSgpO1xuICB9XG5cbiAgc2hvdygpOiB2b2lkIHtcbiAgICB0aGlzLmNvbGxhcHNlLnNob3coKTtcbiAgICB0aGlzLl9jZFJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5jb2xsYXBzZS5oaWRlKCk7XG4gICAgdGhpcy5fY2RSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvblNob3coKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29sbGFwc2VkQ2xhc3MgPSBmYWxzZTtcbiAgICB0aGlzLml0ZW1TaG93LmVtaXQodGhpcyk7XG5cbiAgICB0aGlzLnNob3ckLm5leHQodGhpcyk7XG4gIH1cblxuICBvbkhpZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkQ29sbGFwc2VkQ2xhc3MgPSB0cnVlO1xuICAgIHRoaXMuaXRlbUhpZGUuZW1pdCh0aGlzKTtcbiAgfVxuXG4gIG9uU2hvd24oKTogdm9pZCB7XG4gICAgdGhpcy5fY29sbGFwc2VkID0gZmFsc2U7XG4gICAgdGhpcy5pdGVtU2hvd24uZW1pdCh0aGlzKTtcbiAgfVxuXG4gIG9uSGlkZGVuKCk6IHZvaWQge1xuICAgIHRoaXMuX2NvbGxhcHNlZCA9IHRydWU7XG4gICAgdGhpcy5pdGVtSGlkZGVuLmVtaXQodGhpcyk7XG4gIH1cbn1cbiIsIjxoMiBjbGFzcz1cImFjY29yZGlvbi1oZWFkZXJcIiBbaWRdPVwiX2hlYWRlcklkXCI+XG4gIDxidXR0b25cbiAgICBjbGFzcz1cImFjY29yZGlvbi1idXR0b25cIlxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwiIV9jb2xsYXBzZWRcIlxuICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiaWRcIlxuICAgIFtjbGFzcy5jb2xsYXBzZWRdPVwiX2FkZENvbGxhcHNlZENsYXNzXCJcbiAgICAoY2xpY2spPVwidG9nZ2xlKClcIlxuICA+XG4gICAge3sgaGVhZGVyIH19XG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiX2hlYWRlclRlbXBsYXRlXCIgW25nVGVtcGxhdGVPdXRsZXRdPVwiX2hlYWRlclRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgPC9idXR0b24+XG48L2gyPlxuPGRpdlxuICBtZGJDb2xsYXBzZVxuICAoY29sbGFwc2VTaG93KT1cIm9uU2hvdygpXCJcbiAgKGNvbGxhcHNlSGlkZSk9XCJvbkhpZGUoKVwiXG4gIChjb2xsYXBzZVNob3duKT1cIm9uU2hvd24oKVwiXG4gIChjb2xsYXBzZUhpZGRlbik9XCJvbkhpZGRlbigpXCJcbiAgW2F0dHIuaWRdPVwiaWRcIlxuICBbYXR0ci5hcmlhLWxhYmVsbGVkYnldPVwiX2hlYWRlcklkXCJcbj5cbiAgPGRpdiBjbGFzcz1cImFjY29yZGlvbi1ib2R5XCI+XG4gICAgPG5nLXRlbXBsYXRlICpuZ0lmPVwiX2JvZHlUZW1wbGF0ZVwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIl9ib2R5VGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19